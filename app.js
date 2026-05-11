const categories = [
  "全部",
  "全球宏观热点",
  "AI服务商动态",
  "AI产品商品",
  "AI/算力设备商动态",
  "CT设备商动态",
  "运营商动态",
  "舆情和负面信息",
  "其他行业热点",
];

const navItems = [
  ["daily", "今日日报", "M5 12h14M12 5v14M19 12H5"],
  ["china-telecom", "中国电信专区", "M4 20V8l8-4 8 4v12M9 20v-6h6v6"],
  ["news-flow", "八大情报板块", "M4 6h16M4 12h16M4 18h16"],
  ["specials", "专题洞察", "M4 5h16v14H4zM8 9h8M8 13h8M8 17h5"],
  ["trends", "热点趋势", "M4 19V5M4 19h16M8 15l3-4 3 2 4-7"],
];

const news = [
  {
    title: "中国电信发布新一轮云网融合与智算中心建设动向",
    category: "运营商动态",
    source: "运营商官网",
    time: "07:35",
    region: "中国",
    vendors: ["中国电信", "天翼云"],
    summary: "围绕智算、云网融合、政企行业场景释放新一轮建设信号。",
    why: "直接关联系统部客户经营节奏，适合形成客户交流材料和项目线索。",
    impact: "华为可围绕昇腾、数据中心网络、云服务和5G-A能力组织组合方案。",
    channels: ["客户线", "算力", "服务"],
    tags: ["中国电信", "智算中心", "云网融合", "CAPEX"],
    level: "高",
  },
  {
    title: "海外主流运营商扩大AI客服与网络智能化投入",
    category: "运营商动态",
    source: "行业媒体",
    time: "07:10",
    region: "欧洲",
    vendors: ["Orange", "Vodafone"],
    summary: "运营商把生成式AI从客服试点推进到网络运维和企业服务。",
    why: "说明AI已进入运营商运营效率和政企收入两个主战场。",
    impact: "可作为中国电信星辰大模型、AIOps和政企AI方案的对标案例。",
    channels: ["Marketing", "客户线", "服务"],
    tags: ["运营商AI", "AIOps", "企业服务"],
    level: "高",
  },
  {
    title: "新一代多模态模型强化实时语音与智能体能力",
    category: "AI服务商动态",
    source: "公司Blog",
    time: "06:50",
    region: "美国",
    vendors: ["OpenAI", "Google", "Anthropic"],
    summary: "大模型能力继续向低延迟、多模态、工具调用和企业工作流渗透。",
    why: "模型形态变化会牵引运营商AI平台、数据治理和算力服务重构。",
    impact: "星辰大模型需突出行业知识、可信部署和云网协同优势。",
    channels: ["Marketing", "客户线", "算力"],
    tags: ["大模型", "智能体", "多模态", "API"],
    level: "高",
  },
  {
    title: "国产AI芯片和液冷服务器供给加速，智算集群成本成为竞争焦点",
    category: "AI/算力设备商动态",
    source: "科技媒体",
    time: "06:20",
    region: "中国",
    vendors: ["寒武纪", "海光", "昇腾", "曙光"],
    summary: "国产算力生态围绕训练、推理、液冷和集群互联持续发力。",
    why: "算力供给结构变化会影响运营商智算采购和国产化路线。",
    impact: "华为需要在昇腾生态、云服务、网络互联和能效指标上保持组合竞争力。",
    channels: ["算力", "客户线", "Marketing"],
    tags: ["国产算力", "液冷", "智算集群", "推理成本"],
    level: "高",
  },
  {
    title: "AI眼镜与AI手机新品密集预热，端云协同需求升温",
    category: "AI产品商品",
    source: "消费电子媒体",
    time: "06:05",
    region: "全球",
    vendors: ["Meta", "小米", "Rokid", "华为"],
    summary: "AI终端从单点功能转向全天候助手，强调语音、视觉和低功耗连接。",
    why: "终端普及可能带动5G套餐、家庭入口、边缘AI和云服务需求。",
    impact: "可面向中国电信包装AI终端连接套餐、家庭智能入口和边缘推理场景。",
    channels: ["无线", "固网", "算力", "Marketing"],
    tags: ["AI眼镜", "AI手机", "边缘AI", "5G"],
    level: "中",
  },
  {
    title: "海外设备商获得5G-A与核心网升级合同",
    category: "CT设备商动态",
    source: "公司Newsroom",
    time: "05:45",
    region: "中东",
    vendors: ["Nokia", "Ericsson"],
    summary: "海外运营商继续围绕5G-A、核心网云化和网络自动化进行升级。",
    why: "友商标杆项目会影响中国电信对技术路线和商业价值的判断。",
    impact: "无线、核心网和Marketing需准备5G-A商业案例与竞品对比材料。",
    channels: ["无线", "核心网", "Marketing"],
    tags: ["5G-A", "核心网", "网络自动化", "友商"],
    level: "中",
  },
  {
    title: "AI监管与数据跨境政策持续收紧，企业部署更重视可信与合规",
    category: "全球宏观热点",
    source: "政策网站",
    time: "05:30",
    region: "全球",
    vendors: ["监管机构"],
    summary: "多地更新AI治理、数据安全和跨境数据规则，对企业AI部署提出约束。",
    why: "政策变化会直接影响运营商政企AI、云和数据服务合规边界。",
    impact: "华为与中国电信的本地化、可信云和行业合规方案价值上升。",
    channels: ["Marketing", "客户线", "服务"],
    tags: ["AI监管", "数据安全", "跨境数据", "合规"],
    level: "中",
  },
  {
    title: "通信服务投诉在社交平台扩散，网络体验与客服响应成为舆情焦点",
    category: "舆情和负面信息",
    source: "舆情监测",
    time: "05:05",
    region: "中国",
    vendors: ["中国电信", "运营商"],
    summary: "个别地区用户围绕宽带体验、套餐解释和客服处理效率集中讨论。",
    why: "虽未形成重大事件，但可能影响客户经营和服务改进议题。",
    impact: "建议服务和客户线跟踪传播范围，准备网络体验优化与客服AI辅助方案。",
    channels: ["服务", "客户线", "Marketing"],
    tags: ["客户投诉", "宽带体验", "客服", "风险预警"],
    level: "高",
  },
  {
    title: "金融与制造企业加速落地行业大模型，专线、云和算力需求同步增长",
    category: "其他行业热点",
    source: "行业研究",
    time: "04:50",
    region: "中国",
    vendors: ["金融机构", "制造企业"],
    summary: "行业AI项目从试验走向生产，关注私有化部署、数据安全和推理成本。",
    why: "这是运营商政企收入和云网融合方案的重要增量场景。",
    impact: "可联合中国电信输出金融AI、制造AI专线和智算一体化解决方案。",
    channels: ["客户线", "算力", "固网"],
    tags: ["金融AI", "制造AI", "政企专线", "行业大模型"],
    level: "中",
  },
  {
    title: "低空经济试点扩大，通信感知一体与边缘算力成为基础设施议题",
    category: "全球宏观热点",
    source: "政府公告",
    time: "04:30",
    region: "中国",
    vendors: ["地方政府", "运营商"],
    summary: "地方低空经济政策密集出台，对网络覆盖、感知、调度和数据平台提出需求。",
    why: "低空经济把5G-A、边缘云、专网和行业平台拉到同一张方案图上。",
    impact: "无线、固网、算力可联动准备低空通信感知一体化客户话题。",
    channels: ["无线", "固网", "算力", "客户线"],
    tags: ["低空经济", "5G-A", "边缘云", "专网"],
    level: "中",
  },
  {
    title: "AI广告投放自动化继续压缩制作与投放周期",
    category: "其他行业热点",
    source: "科技媒体",
    time: "04:10",
    region: "美国",
    vendors: ["Meta", "Google"],
    summary: "广告平台把生成式AI用于素材生成、受众匹配和投放优化。",
    why: "传统行业数字化正从工具采购走向AI工作流重构。",
    impact: "适合转化为运营商云、边缘内容分发和行业AI解决方案话题。",
    channels: ["Marketing", "客户线"],
    tags: ["广告AI", "工作流", "云服务"],
    level: "低",
  },
  {
    title: "全光网与绿色节能成为新一轮网络升级高频关键词",
    category: "CT设备商动态",
    source: "行业媒体",
    time: "03:55",
    region: "中国",
    vendors: ["华为", "中兴", "烽火通信"],
    summary: "运营商和设备商围绕全光底座、园区网络和节能改造持续发布方案。",
    why: "网络节能与高品质连接会影响中国电信固网和政企专线建设。",
    impact: "固网、服务和客户线可梳理全光品质专线与绿色网络价值主张。",
    channels: ["固网", "服务", "客户线"],
    tags: ["全光网", "绿色节能", "政企网络"],
    level: "中",
  },
  {
    title: "MWC与WAIC议题前瞻集中指向AI原生网络和智能终端",
    category: "全球宏观热点",
    source: "展会观察",
    time: "03:35",
    region: "全球",
    vendors: ["GSMA", "WAIC", "运营商"],
    summary: "大会核心议题从连接能力展示转向AI原生网络、智能终端、算力底座和行业落地。",
    why: "展会是客户高层交流和对外叙事的重要窗口，需要提前储备观点。",
    impact: "Marketing可形成展会洞察包，客户线可准备中国电信高层交流话题。",
    channels: ["Marketing", "客户线", "无线", "算力"],
    tags: ["MWC", "WAIC", "展会洞察", "AI原生网络"],
    level: "中",
  },
  {
    title: "三大运营商大模型进入行业应用比拼阶段",
    category: "AI服务商动态",
    source: "行业媒体",
    time: "03:20",
    region: "中国",
    vendors: ["中国电信", "中国移动", "中国联通"],
    summary: "星辰、九天、元景等运营商大模型持续面向政务、客服、网络运维和行业智能化拓展。",
    why: "运营商AI能力正在从内部提效工具转为政企市场竞争资产。",
    impact: "系统部需要跟踪中国电信星辰差异化，结合云、网、算力形成闭环方案。",
    channels: ["客户线", "算力", "服务", "Marketing"],
    tags: ["星辰", "九天", "元景", "行业大模型"],
    level: "高",
  },
];

const specialTopics = [
  {
    title: "展会洞察",
    items: ["WAIC", "MWC", "世界互联网大会", "算力大会", "运营商大会"],
  },
  {
    title: "竞品与厂商图谱",
    items: ["AI服务商", "IT设备商", "CT设备商", "运营商AI平台", "AI终端"],
  },
  {
    title: "资料库",
    items: ["日报归档", "客户材料", "PPT素材", "政策文件"],
  },
];

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
