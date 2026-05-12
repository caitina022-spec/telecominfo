const { categories, navItems, news, specialTopics } = window.portalData;

function detailUrl(type, value) {
  return `./detail.html?type=${encodeURIComponent(type)}&value=${encodeURIComponent(value)}`;
}

let selectedCategory = "全部";
let selectedPriority = "全部";
let query = "";

const levelClass = {
  高: "level-high",
  中: "level-medium",
  低: "level-low",
};

const $ = (selector) => document.querySelector(selector);

function setToday() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  $("#todayLabel").textContent = formatter.format(now).replaceAll("/", "-");
}

function renderNav() {
  $("#navList").innerHTML = navItems
    .map(
      ([id, label, path]) => `
        <a class="nav-link" href="#${id}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" /></svg>
          <span>${label}</span>
        </a>
      `,
    )
    .join("");
}

function renderTabs() {
  $("#categoryTabs").innerHTML = categories
    .map((category) => buttonTemplate(category, selectedCategory === category, "category"))
    .join("");

  $("#priorityTabs").innerHTML = ["全部", "高", "中", "低"]
    .map((priority) => buttonTemplate(priority, selectedPriority === priority, "priority"))
    .join("");
}

function buttonTemplate(label, active, type) {
  return `<button class="tab-button ${active ? "active" : ""}" data-${type}="${label}">${label}</button>`;
}

function renderDaily() {
  const topItems = news.filter((item) => item.level === "高").slice(0, 5);
  $("#topFive").innerHTML = topItems
    .map(
      (item, index) => `
        <article class="top-item">
          <span class="rank">${index + 1}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          </div>
          ${levelBadge(item.level)}
        </article>
      `,
    )
    .join("");

  renderMiniList("#impactList", [
    ["智算建设窗口打开", "中国电信智算、云网融合和行业AI项目将成为近期客户经营高频议题。"],
    ["AI从模型竞争转入工作流竞争", "服务商动态显示智能体、客服、运维和企业助手正在成为运营商AI落地抓手。"],
    ["5G-A与边缘能力需要场景牵引", "AI终端、低空经济和行业大模型都在把连接、边缘和云拉成一体化需求。"],
  ]);

  renderMiniList("#riskList", [
    ["客户服务舆情", "宽带体验、套餐解释和客服响应需要持续监测，避免局部事件外溢。"],
    ["政策合规变化", "AI监管和数据跨境规则可能影响政企AI与云服务部署口径。"],
    ["友商标杆挤压", "海外5G-A、核心网和智算案例会被客户用于路线比较，需要提前准备材料。"],
  ]);

  renderMiniList("#opportunityList", [
    ["中国电信智算中心", "打包昇腾、数据中心网络、云服务和运维服务的组合方案。"],
    ["行业AI解决方案", "围绕金融、制造、政务形成专线、云和算力一体化话题。"],
    ["AI终端连接入口", "把AI眼镜、AI手机、家庭终端转化为5G、固网和边缘AI机会。"],
  ]);
}

function renderMiniList(selector, items) {
  $(selector).innerHTML = items
    .map(
      ([title, body]) => `
        <div class="mini-item">
          <strong>${title}</strong>
          <p>${body}</p>
        </div>
      `,
    )
    .join("");
}

function renderTelecomFocus() {
  const focus = [
    ["中国电信今日动态", "优先沉淀集团战略、天翼云、星辰大模型、云网融合、5G-A与政企业务新闻。"],
    ["经营数据与CAPEX", "跟踪财报、资本开支、政企收入、云收入和重点省份经营变化。"],
    ["近期高层交流", "记录集团领导讲话、展会发布、生态合作和客户高层互动。"],
    ["负面舆情与服务风险", "按风险等级、传播范围、涉及地区和建议口径进行闭环跟踪。"],
  ];

  $("#telecomFocus").innerHTML = focus
    .map(
      ([title, body]) => `
        <a class="focus-card card-link" href="${detailUrl("telecom", title)}">
          <strong>${title}</strong>
          <p>${body}</p>
        </a>
      `,
    )
    .join("");
}

function renderSpecials() {
  $("#specialGrid").innerHTML = specialTopics
    .map(
      (topic) => `
        <a class="special-card card-link" href="${detailUrl("special", topic.title)}">
          <strong>${topic.title}</strong>
          <div class="tag-row">
            ${topic.items.map((item) => `<span class="tag">${item}</span>`).join("")}
          </div>
        </a>
      `,
    )
    .join("");
}

function renderTrends() {
  const keywordCounts = countTerms(news.flatMap((item) => item.tags));
  const topKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const maxKeyword = Math.max(...topKeywords.map(([, count]) => count));

  $("#keywordChart").innerHTML = topKeywords
    .map(
      ([keyword, count]) => `
        <div class="bar-row">
          <span>${keyword}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${(count / maxKeyword) * 100}%"></div></div>
          <strong>${count}</strong>
        </div>
      `,
    )
    .join("");

  const vendorCounts = countTerms(news.flatMap((item) => item.vendors));
  const topVendors = Object.entries(vendorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  $("#vendorRank").innerHTML = topVendors
    .map(
      ([vendor, count], index) => `
        <div class="vendor-row">
          <strong>${index + 1}. ${vendor}</strong>
          <span>${count} 条相关</span>
        </div>
      `,
    )
    .join("");
}

function countTerms(terms) {
  return terms.reduce((acc, term) => {
    acc[term] = (acc[term] || 0) + 1;
    return acc;
  }, {});
}

function getFilteredNews() {
  const normalizedQuery = query.trim().toLowerCase();

  return news.filter((item) => {
    const categoryMatch = selectedCategory === "全部" || item.category === selectedCategory;
    const priorityMatch = selectedPriority === "全部" || item.level === selectedPriority;
    const haystack = [
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
    ]
      .join(" ")
      .toLowerCase();
    const queryMatch = !normalizedQuery || haystack.includes(normalizedQuery);

    return categoryMatch && priorityMatch && queryMatch;
  });
}

function renderNews() {
  const filteredNews = getFilteredNews();
  $("#resultCount").textContent = `${filteredNews.length} 条情报`;

  if (filteredNews.length === 0) {
    $("#newsGrid").innerHTML = `<div class="empty-state">没有匹配的情报，换一个关键词或筛选条件试试。</div>`;
    return;
  }

  $("#newsGrid").innerHTML = filteredNews.map(newsCardTemplate).join("");
}

function newsCardTemplate(item) {
  return `
    <a class="news-card card-link" href="${detailUrl("category", item.category)}">
      <div class="news-card-header">
        <h3>${item.title}</h3>
        ${levelBadge(item.level)}
      </div>
      <div class="news-meta">
        ${item.source} / ${item.time} / ${item.region} / ${item.vendors.join("、")}
      </div>
      <p>${item.summary}</p>
      <div class="analysis-block">
        <strong>为什么重要</strong>
        <p>${item.why}</p>
      </div>
      <div class="analysis-block">
        <strong>对中国电信/华为的影响</strong>
        <p>${item.impact}</p>
      </div>
      <div class="tag-row">
        ${item.channels.map((channel) => `<span class="tag">${channel}</span>`).join("")}
        ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </a>
  `;
}

function levelBadge(level) {
  return `<span class="level-badge ${levelClass[level]}">${level}</span>`;
}

function bindEvents() {
  $("#categoryTabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    selectedCategory = button.dataset.category;
    renderTabs();
    renderNews();
  });

  $("#priorityTabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-priority]");
    if (!button) return;
    selectedPriority = button.dataset.priority;
    renderTabs();
    renderNews();
  });

  $("#searchInput").addEventListener("input", (event) => {
    query = event.target.value;
    renderNews();
  });

  $("#shareButton").addEventListener("click", async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showToast("分享链接已复制");
    } catch {
      showToast("当前浏览器不支持自动复制");
    }
  });

  $("#copyBriefButton").addEventListener("click", async () => {
    const brief = buildDailyBrief();
    try {
      await navigator.clipboard.writeText(brief);
      showToast("日报文本已复制");
    } catch {
      showToast("当前浏览器不支持自动复制");
    }
  });
}

function buildDailyBrief() {
  const highItems = news.filter((item) => item.level === "高").slice(0, 5);
  const lines = [
    `华为中国电信系统部每日情报简报 ${$("#todayLabel").textContent} 08:00`,
    "",
    "今日必看：",
    ...highItems.map((item, index) => `${index + 1}. ${item.title}｜${item.summary}`),
    "",
    "风险预警：",
    "- 客户服务舆情：宽带体验、套餐解释和客服响应需要持续监测。",
    "- 政策合规变化：AI监管和数据跨境规则可能影响政企AI与云服务部署。",
    "- 友商标杆挤压：5G-A、核心网和智算案例需要提前准备对比材料。",
    "",
    "建议行动：",
    "- 客户线：识别中国电信项目线索和高层议题。",
    "- 算力：跟踪智算中心、国产芯片、液冷和互联。",
    "- Marketing：提炼AI、智算、5G-A对外客户话题。",
  ];

  return lines.join("\n");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function boot() {
  setToday();
  renderNav();
  renderTabs();
  renderDaily();
  renderTelecomFocus();
  renderSpecials();
  renderTrends();
  renderNews();
  bindEvents();
}

boot();
