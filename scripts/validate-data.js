const portalData = require("../data/portal-data.js");
const sourceConfig = require("../data/source-config.js");

const requiredNewsFields = [
  "id",
  "title",
  "category",
  "source",
  "time",
  "region",
  "vendors",
  "summary",
  "why",
  "impact",
  "channels",
  "tags",
  "level",
];

const allowedLevels = new Set(["高", "中", "低"]);
const errors = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function validateCategoryProfiles() {
  const profiles = portalData.categoryProfiles || {};
  const categoryNames = Object.keys(profiles);

  assert(categoryNames.length === 8, `Expected 8 intelligence categories, found ${categoryNames.length}.`);

  categoryNames.forEach((category) => {
    const profile = profiles[category];
    assert(profile.description, `${category} is missing description.`);
    assert(Array.isArray(profile.actions) && profile.actions.length > 0, `${category} is missing actions.`);
    assert(Array.isArray(profile.keywords) && profile.keywords.length > 0, `${category} is missing keywords.`);
    assert(Array.isArray(profile.vendors) && profile.vendors.length > 0, `${category} is missing vendors.`);
  });
}

function validateNews() {
  const profiles = portalData.categoryProfiles || {};
  const ids = new Set();

  assert(Array.isArray(portalData.news) && portalData.news.length > 0, "news must be a non-empty array.");

  portalData.news.forEach((item, index) => {
    requiredNewsFields.forEach((field) => {
      assert(item[field] !== undefined && item[field] !== "", `news[${index}] is missing ${field}.`);
    });

    assert(!ids.has(item.id), `Duplicate news id: ${item.id}.`);
    ids.add(item.id);

    assert(profiles[item.category], `${item.id} uses unknown category: ${item.category}.`);
    assert(allowedLevels.has(item.level), `${item.id} uses invalid level: ${item.level}.`);
    assert(Array.isArray(item.vendors) && item.vendors.length > 0, `${item.id} must include at least one vendor.`);
    assert(Array.isArray(item.channels) && item.channels.length > 0, `${item.id} must include at least one channel.`);
    assert(Array.isArray(item.tags) && item.tags.length > 0, `${item.id} must include at least one tag.`);
    if (item.sourceUrl) {
      assert(/^https?:\/\//.test(item.sourceUrl), `${item.id} sourceUrl must be an HTTP(S) URL.`);
    }
  });
}

function validateDailyBriefing() {
  const briefing = portalData.dailyBriefing || {};

  ["impacts", "risks", "opportunities"].forEach((section) => {
    assert(Array.isArray(briefing[section]) && briefing[section].length > 0, `dailyBriefing.${section} must be non-empty.`);
    briefing[section]?.forEach((entry, index) => {
      assert(Array.isArray(entry) && entry.length === 2, `dailyBriefing.${section}[${index}] must be [title, body].`);
    });
  });
}

function validateDetailContent() {
  const detailContent = portalData.detailContent || {};

  ["telecom", "special"].forEach((bucketName) => {
    const bucket = detailContent[bucketName];
    assert(bucket && Object.keys(bucket).length > 0, `detailContent.${bucketName} must be non-empty.`);

    Object.entries(bucket || {}).forEach(([title, content]) => {
      assert(content.summary, `${bucketName}.${title} is missing summary.`);
      assert(Array.isArray(content.items) && content.items.length > 0, `${bucketName}.${title} is missing items.`);
      assert(Array.isArray(content.actions) && content.actions.length > 0, `${bucketName}.${title} is missing actions.`);
    });
  });
}

function validateSourceConfig() {
  assert(sourceConfig.refresh?.timezone === "Asia/Shanghai", "sourceConfig.refresh.timezone must be Asia/Shanghai.");
  assert(Array.isArray(sourceConfig.sourceGroups) && sourceConfig.sourceGroups.length > 0, "sourceConfig.sourceGroups must be non-empty.");

  const profiles = portalData.categoryProfiles || {};
  const sourceGroupIds = new Set();

  sourceConfig.sourceGroups.forEach((group, groupIndex) => {
    assert(group.id, `sourceGroups[${groupIndex}] is missing id.`);
    assert(!sourceGroupIds.has(group.id), `Duplicate source group id: ${group.id}.`);
    sourceGroupIds.add(group.id);

    assert(group.name, `${group.id} is missing name.`);
    assert(group.trustLevel, `${group.id} is missing trustLevel.`);
    assert(group.cadence, `${group.id} is missing cadence.`);
    assert(Array.isArray(group.categories) && group.categories.length > 0, `${group.id} must include categories.`);
    assert(Array.isArray(group.sources) && group.sources.length > 0, `${group.id} must include sources.`);

    group.categories.forEach((category) => {
      const isTelecomFocus = category === "中国电信专区";
      assert(profiles[category] || isTelecomFocus, `${group.id} references unknown category: ${category}.`);
    });

    group.sources.forEach((source, sourceIndex) => {
      assert(source.name, `${group.id}.sources[${sourceIndex}] is missing name.`);
      assert(/^https:\/\//.test(source.homepage || ""), `${group.id}.${source.name} homepage must be an HTTPS URL.`);
      assert(Array.isArray(source.vendors) && source.vendors.length > 0, `${group.id}.${source.name} must include vendors.`);
    });
  });

  ["highPrioritySignals", "mediumPrioritySignals", "negativeSignals"].forEach((ruleName) => {
    assert(
      Array.isArray(sourceConfig.scoringRules?.[ruleName]) && sourceConfig.scoringRules[ruleName].length > 0,
      `sourceConfig.scoringRules.${ruleName} must be non-empty.`,
    );
  });

  assert(Array.isArray(sourceConfig.webSearch?.queries) && sourceConfig.webSearch.queries.length > 0, "sourceConfig.webSearch.queries must be non-empty.");
  sourceConfig.webSearch.queries.forEach((query, index) => {
    assert(query.id, `webSearch.queries[${index}] is missing id.`);
    assert(query.name, `${query.id} is missing name.`);
    assert(query.query, `${query.id} is missing query.`);
    assert(profiles[query.categoryBias], `${query.id} references unknown categoryBias: ${query.categoryBias}.`);
  });
}

validateCategoryProfiles();
validateNews();
validateDailyBriefing();
validateDetailContent();
validateSourceConfig();

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Data validation passed: ${portalData.news.length} news items, ${Object.keys(portalData.categoryProfiles).length} categories, ${sourceConfig.sourceGroups.length} source groups.`,
);
