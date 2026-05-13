const fs = require("fs");
const path = require("path");
const portalData = require("../data/portal-data.js");
const sourceConfig = require("../data/source-config.js");

const outputDir = path.join(__dirname, "..", process.env.PIPELINE_OUTPUT_DIR || "reports");

const levelBaseScores = {
  高: 65,
  中: 42,
  低: 24,
};

function textForScoring(item) {
  return [
    item.title,
    item.category,
    item.source,
    item.region,
    item.summary,
    item.why,
    item.impact,
    ...item.vendors,
    ...item.channels,
    ...item.tags,
  ].join(" ");
}

function countHits(text, signals) {
  return signals.filter((signal) => text.includes(signal)).length;
}

function scoreItem(item) {
  const text = textForScoring(item);
  const highHits = countHits(text, sourceConfig.scoringRules.highPrioritySignals);
  const mediumHits = countHits(text, sourceConfig.scoringRules.mediumPrioritySignals);
  const negativeHits = countHits(text, sourceConfig.scoringRules.negativeSignals);
  const score = levelBaseScores[item.level] + highHits * 6 + mediumHits * 3 + negativeHits * 5;

  return Math.min(score, 100);
}

function inferSourceGroups(item) {
  return sourceConfig.sourceGroups
    .filter((group) => {
      const categoryMatch = group.categories.includes(item.category);
      const vendorMatch = group.sources.some((source) => source.vendors.some((vendor) => item.vendors.includes(vendor)));
      return categoryMatch || vendorMatch;
    })
    .map((group) => group.id);
}

function normalizeItem(item) {
  const score = scoreItem(item);

  return {
    id: item.id,
    title: item.title,
    category: item.category,
    priority: item.level,
    score,
    source: {
      name: item.source,
      region: item.region,
      time: item.time,
      sourceGroups: inferSourceGroups(item),
    },
    entities: {
      vendors: item.vendors,
      channels: item.channels,
      tags: item.tags,
    },
    summary: item.summary,
    analysis: {
      why: item.why,
      impact: item.impact,
    },
  };
}

function normalizeNews(news = portalData.news) {
  return news.map(normalizeItem).sort((a, b) => b.score - a.score || a.source.time.localeCompare(b.source.time));
}

function writeNormalizedNews() {
  const outputPath = path.join(outputDir, "normalized-news.json");
  const normalized = normalizeNews();

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");

  return outputPath;
}

if (require.main === module) {
  const outputPath = writeNormalizedNews();
  console.log(`Normalized news generated: ${outputPath}`);
}

module.exports = {
  normalizeNews,
  normalizeItem,
  scoreItem,
  writeNormalizedNews,
};
