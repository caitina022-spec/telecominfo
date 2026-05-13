const fs = require("fs");
const path = require("path");
const rawNewsSample = require("../data/raw-news-sample.js");
const portalData = require("../data/portal-data.js");
const sourceConfig = require("../data/source-config.js");
const { scoreItem } = require("./normalize-news.js");

const outputDir = path.join(__dirname, "..", "reports");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function rawText(rawItem) {
  return [rawItem.title, rawItem.sourceName, rawItem.region, rawItem.body].join(" ");
}

function countHits(text, terms) {
  return terms.filter((term) => text.includes(term)).length;
}

function inferCategory(rawItem) {
  const text = rawText(rawItem);
  const ranked = Object.entries(portalData.categoryProfiles)
    .map(([category, profile]) => {
      const keywordHits = countHits(text, profile.keywords || []);
      const vendorHits = countHits(text, profile.vendors || []);
      return {
        category,
        score: keywordHits * 2 + vendorHits,
      };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > 0 ? ranked[0].category : "全球宏观热点";
}

function inferVendors(rawItem, category) {
  const text = rawText(rawItem);
  const profileVendors = portalData.categoryProfiles[category]?.vendors || [];
  const sourceVendors = sourceConfig.sourceGroups.flatMap((group) => group.sources.flatMap((source) => source.vendors));
  const vendors = [...new Set([...profileVendors, ...sourceVendors].filter((vendor) => text.includes(vendor)))];

  return vendors.length > 0 ? vendors : [rawItem.sourceName];
}

function inferTags(rawItem, category) {
  const text = rawText(rawItem);
  const profile = portalData.categoryProfiles[category];
  const tags = [...new Set((profile?.keywords || []).filter((keyword) => text.includes(keyword)))];

  return tags.length > 0 ? tags.slice(0, 6) : [category];
}

function inferChannels(category, text) {
  const channelSignals = [
    ["算力", ["智算", "算力", "GPU", "液冷", "推理"]],
    ["客户线", ["政企", "客户", "行业", "运营商", "中国电信"]],
    ["服务", ["客服", "投诉", "故障", "服务", "舆情"]],
    ["Marketing", ["发布", "展会", "趋势", "对标", "大模型"]],
    ["无线", ["5G", "5G-A", "终端", "边缘"]],
    ["固网", ["宽带", "全光", "光网", "家庭"]],
    ["核心网", ["核心网", "网络自动化"]],
  ];

  const channels = channelSignals.filter(([, signals]) => signals.some((signal) => text.includes(signal))).map(([channel]) => channel);

  if (channels.length > 0) return [...new Set(channels)].slice(0, 4);
  if (category.includes("设备商")) return ["Marketing", "客户线"];
  return ["客户线", "Marketing"];
}

function inferLevel(item, rawItem) {
  const text = rawText(rawItem);
  const highHits = countHits(text, sourceConfig.scoringRules.highPrioritySignals);
  const negativeHits = countHits(text, sourceConfig.scoringRules.negativeSignals);

  if (highHits >= 2 || negativeHits >= 2) return "高";

  const score = scoreItem(item);
  if (score >= 75) return "高";
  if (score >= 48) return "中";
  return "低";
}

function summarize(rawItem) {
  return rawItem.body.length > 64 ? `${rawItem.body.slice(0, 64)}。` : rawItem.body;
}

function toPortalNews(rawItem) {
  const category = inferCategory(rawItem);
  const text = rawText(rawItem);
  const vendors = inferVendors(rawItem, category);
  const tags = inferTags(rawItem, category);
  const channels = inferChannels(category, text);
  const publishedAt = new Date(rawItem.publishedAt);
  const time = Number.isNaN(publishedAt.getTime())
    ? "08:00"
    : new Intl.DateTimeFormat("zh-CN", {
        timeZone: "Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(publishedAt);

  const item = {
    id: rawItem.id?.replace(/^raw-/, "") || slugify(rawItem.title),
    title: rawItem.title,
    category,
    source: rawItem.sourceName,
    time,
    region: rawItem.region || "全球",
    vendors,
    summary: summarize(rawItem),
    why: `命中${category}词表，适合进入系统部每日情报池。`,
    impact: "建议结合中国电信客户经营、云网算能力和相关部门动作进一步研判。",
    channels,
    tags,
    level: "低",
  };

  item.level = inferLevel(item, rawItem);
  return item;
}

function ingestRawNews(rawItems = rawNewsSample) {
  return rawItems.map(toPortalNews);
}

function readOneRawNewsInput(inputPath) {
  const resolvedPath = path.resolve(process.cwd(), inputPath);
  const raw = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));

  if (!Array.isArray(raw)) {
    throw new Error(`${inputPath} must be a JSON array.`);
  }

  return raw;
}

function readRawNewsInput(inputPaths) {
  if (!inputPaths || inputPaths.length === 0) return rawNewsSample;
  return inputPaths.flatMap(readOneRawNewsInput);
}

function writeIngestedNews(rawItems = rawNewsSample) {
  const outputPath = path.join(outputDir, "ingested-news.json");
  const ingested = ingestRawNews(rawItems);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(ingested, null, 2)}\n`, "utf8");

  return outputPath;
}

if (require.main === module) {
  try {
    const rawItems = readRawNewsInput(process.argv.slice(2));
    const outputPath = writeIngestedNews(rawItems);
    console.log(`Ingested news generated: ${outputPath}`);
  } catch (error) {
    console.error(`Raw news ingestion failed: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  ingestRawNews,
  toPortalNews,
  inferCategory,
  readRawNewsInput,
  writeIngestedNews,
};
