const fs = require("fs");
const path = require("path");
const portalData = require("../data/portal-data.js");
const { normalizeNews } = require("./normalize-news.js");

const outputDir = path.join(__dirname, "..", "reports");

function beijingDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll("/", "-");
}

function topNewsItems(limit = 5) {
  const newsById = new Map(portalData.news.map((item) => [item.id, item]));
  return normalizeNews()
    .slice(0, limit)
    .map((item) => newsById.get(item.id));
}

function sectionList(items) {
  return items.map(([title, body]) => `- **${title}**：${body}`).join("\n");
}

function newsList(items) {
  return items
    .map((item, index) => {
      const vendors = item.vendors.join("、");
      const tags = item.tags.map((tag) => `#${tag}`).join(" ");
      return [
        `${index + 1}. **${item.title}**`,
        `   - 来源：${item.source} / ${item.time} / ${item.region} / ${vendors}`,
        `   - 摘要：${item.summary}`,
        `   - 影响：${item.impact}`,
        `   - 标签：${tags}`,
      ].join("\n");
    })
    .join("\n\n");
}

function categorySummary() {
  const counts = portalData.news.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(portalData.categoryProfiles)
    .map((category) => `- ${category}：${counts[category] || 0} 条`)
    .join("\n");
}

function buildReport(dateLabel = beijingDateLabel()) {
  const topItems = topNewsItems();

  return [
    `# 华为中国电信系统部每日情报简报`,
    "",
    `- 日期：${dateLabel}`,
    `- 刷新时间：北京时间 08:00`,
    `- 情报数量：${portalData.news.length} 条`,
    "",
    "## 今日必看 Top 5",
    "",
    newsList(topItems),
    "",
    "## 影响判断",
    "",
    sectionList(portalData.dailyBriefing.impacts),
    "",
    "## 风险预警",
    "",
    sectionList(portalData.dailyBriefing.risks),
    "",
    "## 机会建议",
    "",
    sectionList(portalData.dailyBriefing.opportunities),
    "",
    "## 八大板块覆盖",
    "",
    categorySummary(),
    "",
  ].join("\n");
}

function writeReport() {
  const dateLabel = beijingDateLabel();
  const report = buildReport(dateLabel);
  const outputPath = path.join(outputDir, `${dateLabel}-daily-report.md`);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, report, "utf8");

  return outputPath;
}

if (require.main === module) {
  const outputPath = writeReport();
  console.log(`Daily report generated: ${outputPath}`);
}

module.exports = {
  buildReport,
  writeReport,
};
