const detailNavItems = [
  ["index.html#daily", "今日日报", "M5 12h14M12 5v14M19 12H5"],
  ["index.html#china-telecom", "中国电信专区", "M4 20V8l8-4 8 4v12M9 20v-6h6v6"],
  ["index.html#news-flow", "八大情报板块", "M4 6h16M4 12h16M4 18h16"],
  ["index.html#departments", "部门频道", "M4 7h7v7H4zM13 7h7v7h-7zM4 16h7v4H4zM13 16h7v4h-7z"],
  ["index.html#specials", "专题洞察", "M4 5h16v14H4zM8 9h8M8 13h8M8 17h5"],
  ["index.html#trends", "热点趋势", "M4 19V5M4 19h16M8 15l3-4 3 2 4-7"],
];

const detailNews = [
  ["中国电信发布新一轮云网融合与智算中心建设动向", "运营商动态", "中国电信、天翼云", "客户线,算力,服务", "围绕智算、云网融合、政企行业场景释放新一轮建设信号。", "高"],
  ["海外主流运营商扩大AI客服与网络智能化投入", "运营商动态", "Orange、Vodafone", "Marketing,客户线,服务", "运营商把生成式AI从客服试点推进到网络运维和企业服务。", "高"],
  ["新一代多模态模型强化实时语音与智能体能力", "AI服务商动态", "OpenAI、Google、Anthropic", "Marketing,客户线,算力", "大模型能力继续向低延迟、多模态、工具调用和企业工作流渗透。", "高"],
  ["国产AI芯片和液冷服务器供给加速，智算集群成本成为竞争焦点", "AI/算力设备商动态", "寒武纪、海光、昇腾、曙光", "算力,客户线,Marketing", "国产算力生态围绕训练、推理、液冷和集群互联持续发力。", "高"],
  ["AI眼镜与AI手机新品密集预热，端云协同需求升温", "AI产品商品", "Meta、小米、Rokid、华为", "无线,固网,算力,Marketing", "AI终端从单点功能转向全天候助手，强调语音、视觉和低功耗连接。", "中"],
  ["海外设备商获得5G-A与核心网升级合同", "CT设备商动态", "Nokia、Ericsson", "无线,核心网,Marketing", "海外运营商继续围绕5G-A、核心网云化和网络自动化进行升级。", "中"],
  ["AI监管与数据跨境政策持续收紧，企业部署更重视可信与合规", "全球宏观热点", "监管机构", "Marketing,客户线,服务", "多地更新AI治理、数据安全和跨境数据规则，对企业AI部署提出约束。", "中"],
  ["通信服务投诉在社交平台扩散，网络体验与客服响应成为舆情焦点", "舆情和负面信息", "中国电信、运营商", "服务,客户线,Marketing", "个别地区用户围绕宽带体验、套餐解释和客服处理效率集中讨论。", "高"],
  ["金融与制造企业加速落地行业大模型，专线、云和算力需求同步增长", "其他行业热点", "金融机构、制造企业", "客户线,算力,固网", "行业AI项目从试验走向生产，关注私有化部署、数据安全和推理成本。", "中"],
  ["全光网与绿色节能成为新一轮网络升级高频关键词", "CT设备商动态", "华为、中兴、烽火通信", "固网,服务,客户线", "运营商和设备商围绕全光底座、园区网络和节能改造持续发布方案。", "中"],
  ["MWC与WAIC议题前瞻集中指向AI原生网络和智能终端", "全球宏观热点", "GSMA、WAIC、运营商", "Marketing,客户线,无线,算力", "大会核心议题从连接能力展示转向AI原生网络、智能终端、算力底座和行业落地。", "中"],
  ["三大运营商大模型进入行业应用比拼阶段", "AI服务商动态", "中国电信、中国移动、中国联通", "客户线,算力,服务,Marketing", "星辰、九天、元景等运营商大模型持续面向政务、客服、网络运维和行业智能化拓展。", "高"],
].map(([title, category, vendors, channels, summary, level]) => ({
  title,
  category,
  vendors,
  channels: channels.split(","),
  summary,
  level,
}));

const detailContent = {
  department: {
    Marketing: {
      eyebrow: "Department Channel",
      summary: "面向客户交流和市场材料的行业情报频道，沉淀趋势判断、竞品案例、展会观点和日报推送素材。",
      items: ["AI、智算、5G-A客户话题包", "友商标杆案例与对比材料", "展会洞察、传播口径和一页纸素材"],
      actions: ["每周整理3条可复用客户观点", "把高优情报转成客户拜访材料", "维护对外叙事标签和案例库"],
    },
    客户线: {
      eyebrow: "Department Channel",
      summary: "围绕中国电信集团、省公司和政企客户，识别高层议题、项目线索和客户痛点。",
      items: ["中国电信集团战略与省公司动态", "重点客户拜访纪要和高层交流", "政企云、算力、5G-A项目线索"],
      actions: ["按省份和客户群沉淀机会清单", "标注需要客户经理跟进的情报", "把舆情与服务风险同步到客户口径"],
    },
    无线: {
      eyebrow: "Department Channel",
      summary: "聚焦5G-A、低空经济、AI终端连接和海外无线竞品项目。",
      items: ["5G-A商用案例和频谱政策", "低空通信感知一体化场景", "AI终端、物联和边缘连接需求"],
      actions: ["沉淀5G-A价值场景", "跟踪Ericsson/Nokia无线项目", "准备无线方案差异化材料"],
    },
    核心网: {
      eyebrow: "Department Channel",
      summary: "跟踪核心网云化、自动化、网络安全和海外标杆合同。",
      items: ["5GC、IMS和核心网云化", "网络自动化与AI运维", "安全、可靠性和容灾能力"],
      actions: ["维护核心网演进路线材料", "梳理友商案例和客户疑问", "联动服务团队补充运维价值"],
    },
    固网: {
      eyebrow: "Department Channel",
      summary: "关注全光网、家庭入口、政企专线、宽带体验和绿色网络。",
      items: ["FTTR、PON和全光园区", "政企精品专线和云网融合", "宽带体验舆情和服务闭环"],
      actions: ["提炼全光品质专线价值", "跟踪宽带投诉和体验指标", "联合算力频道包装边缘云场景"],
    },
    服务: {
      eyebrow: "Department Channel",
      summary: "聚焦网络保障、客户体验、投诉舆情、AI客服和AIOps服务方案。",
      items: ["网络故障、投诉和负面舆情", "AI客服与AIOps案例", "重大项目交付和服务复盘"],
      actions: ["建立风险分级和闭环清单", "沉淀服务改进案例", "把高频问题转成客户沟通口径"],
    },
    算力: {
      eyebrow: "Department Channel",
      summary: "跟踪智算中心、国产芯片、液冷、集群互联、天翼云和星辰大模型机会。",
      items: ["智算中心建设和CAPEX动向", "国产AI芯片与液冷服务器", "云、网、算一体化方案"],
      actions: ["维护算力生态竞品图谱", "识别天翼云和星辰机会", "输出智算集群成本与能效观点"],
    },
  },
  telecom: {
    中国电信今日动态: {
      eyebrow: "China Telecom Focus",
      summary: "集中跟踪中国电信集团战略、天翼云、星辰大模型、云网融合、5G-A和政企业务新闻。",
      items: ["集团战略发布与重点会议", "天翼云、星辰大模型和云网融合新闻", "省公司与政企行业项目动态"],
      actions: ["标注和系统部相关的机会点", "沉淀可用于客户交流的官方表述", "把重点动态同步到日报Top 5候选池"],
    },
    经营数据与CAPEX: {
      eyebrow: "China Telecom Focus",
      summary: "跟踪财报、资本开支、政企收入、云收入和重点省份经营变化，用于判断客户投资方向。",
      items: ["季度财报和管理层口径", "CAPEX结构、云和算力投入", "政企收入、天翼云和行业解决方案变化"],
      actions: ["每季度更新经营摘要", "标注影响无线、固网、算力的投资方向", "沉淀客户交流数据页"],
    },
    近期高层交流: {
      eyebrow: "China Telecom Focus",
      summary: "记录近期集团领导讲话、客户高层拜访、展会发布、生态合作和省公司重点互动。",
      items: ["集团领导讲话和战略关键词", "客户高层拜访纪要和待跟进事项", "展会发布、生态合作和签约活动"],
      actions: ["形成高层议题追踪表", "为客户线准备拜访前情报", "把重要表达沉淀为交流话术"],
    },
    负面舆情与服务风险: {
      eyebrow: "China Telecom Focus",
      summary: "按风险等级、传播范围、涉及地区和建议口径跟踪中国电信相关服务与舆情风险。",
      items: ["网络体验、宽带和套餐投诉", "AI、数据安全和监管风险", "社交平台传播范围与风险等级"],
      actions: ["高风险事件进入日报风险预警", "同步服务和客户线准备回应口径", "沉淀风险复盘和改进建议"],
    },
  },
  special: {
    高层交流: {
      eyebrow: "Special Topic",
      summary: "沉淀集团战略讲话、客户拜访纪要、生态合作发布和省公司重点议题。",
      items: ["高层讲话摘要", "客户拜访纪要", "生态合作与签约", "省公司重点议题"],
      actions: ["按客户和时间归档", "提炼可复用交流观点", "标记需要后续跟进的机会"],
    },
    展会洞察: {
      eyebrow: "Special Topic",
      summary: "覆盖WAIC、MWC、世界互联网大会、算力大会和运营商大会的观点、竞品和客户议题。",
      items: ["大会主题和关键词", "运营商与设备商发布", "客户交流议题", "可复用PPT素材"],
      actions: ["展前准备观察清单", "展中沉淀每日洞察", "展后输出客户交流版总结"],
    },
    竞品与厂商图谱: {
      eyebrow: "Special Topic",
      summary: "整理AI服务商、IT设备商、CT设备商、运营商AI平台和AI终端厂商图谱。",
      items: ["AI服务商能力与模型动态", "IT/CT设备商合同和产品", "运营商AI平台对比", "AI终端与场景"],
      actions: ["按厂商维护动态卡片", "输出差异化对比", "标注可能影响中国电信采购的变化"],
    },
    资料库: {
      eyebrow: "Special Topic",
      summary: "集中归档日报、客户材料、PPT素材和政策文件，支持团队复用。",
      items: ["日报归档", "客户材料", "PPT素材", "政策文件"],
      actions: ["统一命名和标签", "按部门和专题归档", "保留可直接复用的摘要和图表"],
    },
  },
};

const categoryDescriptions = {
  全球宏观热点: "政策、国际热点、趋势和营商环境变化，帮助团队理解外部大势和客户投资背景。",
  AI服务商动态: "跟踪国内外大模型、智能体和运营商大模型动态，关注能力变化和行业落地。",
  AI产品商品: "聚焦AI眼镜、AI手机、AI玩具、人形机器人等端侧产品和连接机会。",
  "AI/算力设备商动态": "跟踪GPU、国产AI芯片、液冷服务器、智算集群和云厂商算力基础设施。",
  CT设备商动态: "关注无线、核心网、固网、光网络和传统通信设备商的产品与合同。",
  运营商动态: "覆盖国内外运营商战略、网络建设、AI应用、云和政企业务变化。",
  舆情和负面信息: "关注通信、AI、中国电信相关的负面舆情、监管和服务风险。",
  其他行业热点: "跟踪AI赋能金融、制造、广告、游戏、影视等传统行业的变化。",
};

const categoryActions = {
  全球宏观热点: ["识别影响客户投资的政策变化", "标注可用于客户交流的趋势判断", "沉淀宏观背景材料"],
  AI服务商动态: ["跟踪关键模型能力变化", "对比星辰大模型行业优势", "标注算力和云平台机会"],
  AI产品商品: ["评估端云协同和连接需求", "联动无线、固网和算力频道", "沉淀AI终端场景素材"],
  "AI/算力设备商动态": ["维护算力生态图谱", "跟踪国产替代和液冷趋势", "识别天翼云与智算中心机会"],
  CT设备商动态: ["维护友商项目清单", "准备技术路线对比", "标注无线、核心网、固网影响"],
  运营商动态: ["筛选中国电信可借鉴案例", "沉淀海外运营商AI和网络智能化标杆", "标注客户线跟进点"],
  舆情和负面信息: ["按风险等级进入日报", "同步服务和客户线", "准备回应口径和改进建议"],
  其他行业热点: ["识别政企行业AI机会", "转化为云网算一体化话题", "沉淀行业案例"],
};

const levelClass = {
  高: "level-high",
  中: "level-medium",
  低: "level-low",
};

const $ = (selector) => document.querySelector(selector);

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    type: params.get("type") || "department",
    value: params.get("value") || "Marketing",
  };
}

function renderDetailNav() {
  $("#detailNav").innerHTML = detailNavItems
    .map(
      ([href, label, path]) => `
        <a class="nav-link" href="./${href}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" /></svg>
          <span>${label}</span>
        </a>
      `,
    )
    .join("");
}

function getDetail(type, value) {
  if (type === "category") {
    return {
      eyebrow: "Intelligence Category",
      title: value,
      summary: categoryDescriptions[value] || "按专题聚合相关情报、重点判断和建议动作。",
      items: detailNews
        .filter((item) => item.category === value)
        .map((item) => `${item.title}：${item.summary}`),
      actions: categoryActions[value] || ["筛选高优情报", "沉淀客户材料", "同步相关部门"],
      related: detailNews.filter((item) => item.category === value),
    };
  }

  const bucket = detailContent[type] || detailContent.department;
  const content = bucket[value] || Object.values(bucket)[0];
  return {
    eyebrow: content.eyebrow,
    title: value,
    summary: content.summary,
    items: content.items,
    actions: content.actions,
    related: relatedNews(type, value),
  };
}

function relatedNews(type, value) {
  if (type === "department") {
    return detailNews.filter((item) => item.channels.includes(value));
  }
  if (type === "telecom") {
    return detailNews.filter((item) => item.title.includes("中国电信") || item.vendors.includes("中国电信"));
  }
  if (type === "special" && value === "展会洞察") {
    return detailNews.filter((item) => item.title.includes("MWC") || item.title.includes("WAIC"));
  }
  if (type === "special" && value === "竞品与厂商图谱") {
    return detailNews.filter((item) => item.category.includes("设备商") || item.category.includes("AI"));
  }
  return detailNews.slice(0, 4);
}

function renderDetail() {
  const { type, value } = getParams();
  const detail = getDetail(type, value);
  document.title = `${detail.title} - 中国电信系统部`;
  $("#detailEyebrow").textContent = detail.eyebrow;
  $("#detailTitle").textContent = detail.title;
  $("#detailSummary").textContent = detail.summary;
  $("#detailNavHint").textContent = detail.title;
  $("#primaryPanelTitle").textContent = type === "category" ? "重点情报" : "重点内容";
  $("#detailMeta").innerHTML = [
    ["频道类型", typeLabel(type)],
    ["当前主题", detail.title],
    ["更新节奏", "随日报同步"],
  ]
    .map(([label, valueText]) => `<span><strong>${label}</strong>${valueText}</span>`)
    .join("");

  $("#detailItems").innerHTML = detail.items
    .map(
      (item) => `
        <article class="detail-item">
          <strong>${item.split("：")[0]}</strong>
          <p>${item.includes("：") ? item.split("：").slice(1).join("：") : item}</p>
        </article>
      `,
    )
    .join("");

  $("#detailActions").innerHTML = detail.actions
    .map((action) => `<div class="mini-item"><strong>${action}</strong><p>建议进入日常跟踪和客户材料沉淀。</p></div>`)
    .join("");

  $("#relatedCount").textContent = `${detail.related.length} 条相关`;
  $("#relatedNews").innerHTML = detail.related.length
    ? detail.related.map(relatedCard).join("")
    : `<div class="empty-state">暂无相关情报，后续接入真实数据后自动补齐。</div>`;
}

function typeLabel(type) {
  return {
    department: "部门频道",
    telecom: "中国电信专区",
    special: "专题洞察",
    category: "情报板块",
  }[type] || "详情页";
}

function relatedCard(item) {
  return `
    <article class="news-card">
      <div class="news-card-header">
        <h3>${item.title}</h3>
        <span class="level-badge ${levelClass[item.level]}">${item.level}</span>
      </div>
      <div class="news-meta">${item.category} / ${item.vendors}</div>
      <p>${item.summary}</p>
      <div class="tag-row">
        ${item.channels.map((channel) => `<span class="tag">${channel}</span>`).join("")}
      </div>
    </article>
  `;
}

function boot() {
  renderDetailNav();
  renderDetail();
}

boot();
