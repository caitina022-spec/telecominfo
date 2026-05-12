const fs = require("fs");
const path = require("path");
const sourceConfig = require("../data/source-config.js");

const outputDir = path.join(__dirname, "..", "reports");
const defaultTimeoutMs = 12000;

function parseArgs(argv) {
  return argv.reduce(
    (acc, arg) => {
      if (arg.startsWith("--limit=")) acc.limit = Number(arg.split("=")[1]);
      if (arg.startsWith("--timeout=")) acc.timeoutMs = Number(arg.split("=")[1]);
      if (arg === "--allow-empty") acc.allowEmpty = true;
      return acc;
    },
    { limit: Number.POSITIVE_INFINITY, timeoutMs: defaultTimeoutMs, allowEmpty: false },
  );
}

function allSources() {
  return sourceConfig.sourceGroups.flatMap((group) =>
    group.sources.map((source) => ({
      ...source,
      groupId: group.id,
      groupName: group.name,
      categories: group.categories,
      trustLevel: group.trustLevel,
    })),
  );
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function cleanText(text = "") {
  return decodeEntities(text.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(href, baseUrl) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return baseUrl;
  }
}

function pickMeta(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${name}["'][^>]*>`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return cleanText(match[1]);
  }

  return "";
}

function pageTitle(html) {
  return cleanText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function signalTerms() {
  return [
    ...sourceConfig.scoringRules.highPrioritySignals,
    ...sourceConfig.scoringRules.mediumPrioritySignals,
    ...sourceConfig.scoringRules.negativeSignals,
    ...sourceConfig.sourceGroups.flatMap((group) => group.sources.flatMap((source) => source.vendors)),
  ];
}

function extractLinks(html, baseUrl) {
  const terms = signalTerms();
  const links = [];
  const pattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null && links.length < 80) {
    const title = cleanText(match[2]);
    const href = absoluteUrl(match[1], baseUrl);
    const score = terms.filter((term) => title.includes(term)).length;

    if (title.length >= 8 && href.startsWith("http")) {
      links.push({ title, href, score });
    }
  }

  return links.sort((a, b) => b.score - a.score || b.title.length - a.title.length);
}

async function fetchHtml(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 telecominfo-intelligence-bot/0.1",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function sourceToRawItem(source, html) {
  const title = pageTitle(html) || `${source.name} 最新动态`;
  const description = pickMeta(html, "description") || pickMeta(html, "og:description");
  const links = extractLinks(html, source.homepage);
  const bestLink = links[0];
  const finalTitle = bestLink?.score > 0 ? bestLink.title : title;
  const bodyParts = [description, bestLink?.title, source.vendors.join("、"), source.groupName].filter(Boolean);

  return {
    id: `raw-live-${source.groupId}-${source.name}`.replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]+/g, "-"),
    title: finalTitle,
    sourceName: source.name,
    sourceUrl: bestLink?.href || source.homepage,
    publishedAt: new Date().toISOString(),
    region: source.categories.includes("全球宏观热点") || source.groupId.includes("global") ? "全球" : "中国",
    body: bodyParts.join("。"),
  };
}

async function fetchLiveNews(options = {}) {
  const timeoutMs = options.timeoutMs || defaultTimeoutMs;
  const sources = allSources().slice(0, options.limit || Number.POSITIVE_INFINITY);
  const rawItems = [];
  const failures = [];

  for (const source of sources) {
    try {
      const html = await fetchHtml(source.homepage, timeoutMs);
      rawItems.push(sourceToRawItem(source, html));
      console.log(`Fetched ${source.name}`);
    } catch (error) {
      failures.push({ source: source.name, url: source.homepage, error: error.message });
      console.warn(`Skipped ${source.name}: ${error.message}`);
    }
  }

  return { rawItems, failures };
}

async function writeLiveNews(options = {}) {
  const { rawItems, failures } = await fetchLiveNews(options);
  const outputPath = path.join(outputDir, "fetched-raw-news.json");
  const failurePath = path.join(outputDir, "fetch-failures.json");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(rawItems, null, 2)}\n`, "utf8");
  fs.writeFileSync(failurePath, `${JSON.stringify(failures, null, 2)}\n`, "utf8");

  if (rawItems.length === 0 && !options.allowEmpty) {
    throw new Error(`No live sources were fetched. Failure log: ${failurePath}`);
  }

  return { outputPath, failurePath, count: rawItems.length, failureCount: failures.length };
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2));
  writeLiveNews(args)
    .then(({ outputPath, failurePath, count, failureCount }) => {
      console.log(`Live raw news generated: ${outputPath}`);
      console.log(`Fetched ${count} source(s), ${failureCount} failure(s). Failure log: ${failurePath}`);
    })
    .catch((error) => {
      console.error(`Live fetch failed: ${error.message}`);
      process.exit(1);
    });
}

module.exports = {
  fetchLiveNews,
  writeLiveNews,
};
