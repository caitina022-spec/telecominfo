const fs = require("fs");
const path = require("path");
const sourceConfig = require("../data/source-config.js");

const outputDir = path.join(__dirname, "..", "reports");
const defaultTimeoutMs = 15000;
const defaultRequestDelayMs = 5500;

function parseArgs(argv) {
  return argv.reduce(
    (acc, arg) => {
      if (arg.startsWith("--limit=")) acc.limit = Number(arg.split("=")[1]);
      if (arg.startsWith("--max-records=")) acc.maxRecordsPerQuery = Number(arg.split("=")[1]);
      if (arg.startsWith("--timeout=")) acc.timeoutMs = Number(arg.split("=")[1]);
      if (arg.startsWith("--delay=")) acc.requestDelayMs = Number(arg.split("=")[1]);
      if (arg.startsWith("--provider=")) acc.provider = arg.split("=")[1];
      if (arg === "--allow-empty") acc.allowEmpty = true;
      return acc;
    },
    {
      limit: Number.POSITIVE_INFINITY,
      maxRecordsPerQuery: sourceConfig.webSearch.maxRecordsPerQuery || 8,
      timeoutMs: defaultTimeoutMs,
      requestDelayMs: defaultRequestDelayMs,
      provider: process.env.SERPAPI_API_KEY ? "serpapi" : process.env.BING_SEARCH_API_KEY ? "bing" : sourceConfig.webSearch.provider,
      allowEmpty: false,
    },
  );
}

function gdeltUrl(searchQuery, maxRecords) {
  const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
  url.searchParams.set("query", searchQuery.query);
  url.searchParams.set("mode", "ArtList");
  url.searchParams.set("format", "json");
  url.searchParams.set("sort", "hybridrel");
  url.searchParams.set("maxrecords", String(maxRecords));
  url.searchParams.set("timespan", `${sourceConfig.webSearch.lookbackDays || 2}d`);
  return url.toString();
}

function bingUrl(searchQuery, maxRecords) {
  const url = new URL("https://api.bing.microsoft.com/v7.0/news/search");
  url.searchParams.set("q", searchQuery.query);
  url.searchParams.set("count", String(maxRecords));
  url.searchParams.set("mkt", "zh-CN");
  url.searchParams.set("sortBy", "Date");
  return url.toString();
}

function serpApiUrl(searchQuery, maxRecords) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_news");
  url.searchParams.set("q", searchQuery.query);
  url.searchParams.set("api_key", process.env.SERPAPI_API_KEY);
  url.searchParams.set("num", String(maxRecords));
  return url.toString();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 telecominfo-web-search/0.1",
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status}: ${body.slice(0, 120).replace(/\s+/g, " ")}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchBingJson(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 telecominfo-web-search/0.1",
        accept: "application/json",
        "Ocp-Apim-Subscription-Key": process.env.BING_SEARCH_API_KEY,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status}: ${body.slice(0, 120).replace(/\s+/g, " ")}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonWithRetry(url, options) {
  try {
    return await fetchJson(url, options.timeoutMs);
  } catch (error) {
    if (!error.message.includes("HTTP 429")) throw error;
    await wait(options.requestDelayMs);
    return fetchJson(url, options.timeoutMs);
  }
}

function articleDate(article) {
  if (article.seendate) {
    const parsed = new Date(article.seendate);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return new Date().toISOString();
}

function articleRegion(article) {
  if (article.sourceCountry) return article.sourceCountry;
  if (article.domain?.endsWith(".cn")) return "中国";
  return "全球";
}

function toRawItem(article, searchQuery, index) {
  const title = article.title || article.url || `${searchQuery.name} 搜索结果`;
  const body = [article.title, article.sourceCommonName, article.domain, searchQuery.name, searchQuery.query].filter(Boolean).join("。");

  return {
    id: `raw-search-${searchQuery.id}-${index}-${Buffer.from(title).toString("hex").slice(0, 12)}`,
    title,
    sourceName: article.sourceCommonName || article.domain || "GDELT",
    sourceUrl: article.url,
    publishedAt: articleDate(article),
    region: articleRegion(article),
    body,
    categoryBias: searchQuery.categoryBias,
  };
}

function bingResultToRawItem(article, searchQuery, index) {
  const sourceName = article.provider?.[0]?.name || "Bing News";

  return {
    id: `raw-bing-${searchQuery.id}-${index}-${Buffer.from(article.name || article.url || "").toString("hex").slice(0, 12)}`,
    title: article.name || `${searchQuery.name} 搜索结果`,
    sourceName,
    sourceUrl: article.url,
    publishedAt: article.datePublished || new Date().toISOString(),
    region: "全球",
    body: [article.description, sourceName, searchQuery.name, searchQuery.query].filter(Boolean).join("。"),
    categoryBias: searchQuery.categoryBias,
  };
}

function serpApiResultToRawItem(article, searchQuery, index) {
  const sourceName = article.source || "Google News";

  return {
    id: `raw-serpapi-${searchQuery.id}-${index}-${Buffer.from(article.title || article.link || "").toString("hex").slice(0, 12)}`,
    title: article.title || `${searchQuery.name} 搜索结果`,
    sourceName,
    sourceUrl: article.link,
    publishedAt: article.date || new Date().toISOString(),
    region: "全球",
    body: [article.snippet, sourceName, searchQuery.name, searchQuery.query].filter(Boolean).join("。"),
    categoryBias: searchQuery.categoryBias,
  };
}

function dedupeRawItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.sourceUrl || `${item.title}-${item.sourceName}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function searchWebNews(options = {}) {
  const timeoutMs = options.timeoutMs || defaultTimeoutMs;
  const requestDelayMs = options.requestDelayMs || defaultRequestDelayMs;
  const maxRecordsPerQuery = options.maxRecordsPerQuery || sourceConfig.webSearch.maxRecordsPerQuery || 8;
  const provider = options.provider || sourceConfig.webSearch.provider || "gdelt";
  const queries = sourceConfig.webSearch.queries.slice(0, options.limit || Number.POSITIVE_INFINITY);
  const rawItems = [];
  const failures = [];

  for (const searchQuery of queries) {
    try {
      let articles = [];

      if (provider === "bing") {
        if (!process.env.BING_SEARCH_API_KEY) throw new Error("BING_SEARCH_API_KEY is not set.");
        const payload = await fetchBingJson(bingUrl(searchQuery, maxRecordsPerQuery), timeoutMs);
        articles = Array.isArray(payload.value) ? payload.value : [];
        rawItems.push(...articles.map((article, index) => bingResultToRawItem(article, searchQuery, index)));
      } else if (provider === "serpapi") {
        if (!process.env.SERPAPI_API_KEY) throw new Error("SERPAPI_API_KEY is not set.");
        const payload = await fetchJson(serpApiUrl(searchQuery, maxRecordsPerQuery), timeoutMs);
        articles = Array.isArray(payload.news_results) ? payload.news_results : [];
        rawItems.push(...articles.map((article, index) => serpApiResultToRawItem(article, searchQuery, index)));
      } else {
        const payload = await fetchJsonWithRetry(gdeltUrl(searchQuery, maxRecordsPerQuery), { timeoutMs, requestDelayMs });
        articles = Array.isArray(payload.articles) ? payload.articles : [];
        rawItems.push(...articles.map((article, index) => toRawItem(article, searchQuery, index)));
      }

      console.log(`Searched ${searchQuery.name} via ${provider}: ${articles.length} result(s)`);
    } catch (error) {
      failures.push({ query: searchQuery.id, name: searchQuery.name, provider, error: error.message });
      console.warn(`Skipped ${searchQuery.name}: ${error.message}`);
    }

    if (provider === "gdelt") {
      await wait(requestDelayMs);
    }
  }

  return {
    rawItems: dedupeRawItems(rawItems),
    failures,
  };
}

async function writeWebSearchNews(options = {}) {
  const { rawItems, failures } = await searchWebNews(options);
  const outputPath = path.join(outputDir, "searched-raw-news.json");
  const failurePath = path.join(outputDir, "search-failures.json");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(rawItems, null, 2)}\n`, "utf8");
  fs.writeFileSync(failurePath, `${JSON.stringify(failures, null, 2)}\n`, "utf8");

  if (rawItems.length === 0 && !options.allowEmpty) {
    throw new Error(`No web search results were fetched. Failure log: ${failurePath}`);
  }

  return { outputPath, failurePath, count: rawItems.length, failureCount: failures.length };
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2));
  writeWebSearchNews(args)
    .then(({ outputPath, failurePath, count, failureCount }) => {
      console.log(`Web search raw news generated: ${outputPath}`);
      console.log(`Fetched ${count} result(s), ${failureCount} failure(s). Failure log: ${failurePath}`);
    })
    .catch((error) => {
      console.error(`Web search failed: ${error.message}`);
      process.exit(1);
    });
}

module.exports = {
  searchWebNews,
  writeWebSearchNews,
};
