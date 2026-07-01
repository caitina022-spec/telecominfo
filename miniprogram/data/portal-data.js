const categories = [
  "全球宏观热点",
  "AI服务商动态",
  "AI产品商品",
  "AI/算力设备商动态",
  "CT设备商动态",
  "运营商动态",
  "舆情和负面信息",
  "其他行业热点"
];

const categoryProfiles = {
  全球宏观热点: {
    description: "政策、国际热点、趋势和营商环境变化，帮助团队理解外部大势和客户投资背景。",
    actions: ["识别影响客户投资的政策变化", "标注可用于客户交流的趋势判断", "沉淀宏观背景材料"]
  },
  AI服务商动态: {
    description: "跟踪国内外大模型、智能体和运营商大模型动态，关注能力变化和行业落地。",
    actions: ["跟踪关键模型能力变化", "对比星辰大模型行业优势", "标注算力和云平台机会"]
  },
  AI产品商品: {
    description: "聚焦AI眼镜、AI手机、AI玩具、人形机器人等端侧产品和连接机会。",
    actions: ["评估端云协同和连接需求", "联动无线、固网和算力频道", "沉淀AI终端场景素材"]
  },
  "AI/算力设备商动态": {
    description: "跟踪GPU、国产AI芯片、液冷服务器、智算集群和云厂商算力基础设施。",
    actions: ["维护算力生态图谱", "跟踪国产替代和液冷趋势", "识别天翼云与智算中心机会"]
  },
  CT设备商动态: {
    description: "关注无线、核心网、固网、光网络和传统通信设备商的产品与合同。",
    actions: ["维护友商项目清单", "准备技术路线对比", "标注无线、核心网、固网影响"]
  },
  运营商动态: {
    description: "覆盖国内外运营商战略、网络建设、AI应用、云和政企业务变化。",
    actions: ["筛选中国电信可借鉴案例", "沉淀海外运营商AI和网络智能化标杆", "标注客户线跟进点"]
  },
  舆情和负面信息: {
    description: "关注通信、AI、中国电信相关的负面舆情、监管和服务风险。",
    actions: ["按风险等级进入日报", "同步服务和客户线", "准备回应口径和改进建议"]
  },
  其他行业热点: {
    description: "跟踪AI赋能金融、制造、广告、游戏、影视等传统行业的变化。",
    actions: ["识别政企行业AI机会", "转化为云网算一体化话题", "沉淀行业案例"]
  }
};

const dailyBriefing = {
  impacts: [
    ["智算建设窗口打开", "中国电信智算、云网融合和行业AI项目将成为近期客户经营高频议题。"],
    ["AI从模型竞争转入工作流竞争", "智能体、客服、运维和企业助手正在成为运营商AI落地抓手。"],
    ["5G-A与边缘能力需要场景牵引", "AI终端、低空经济和行业大模型正在拉动连接、边缘和云一体化需求。"]
  ],
  risks: [
    ["客户服务舆情", "宽带体验、套餐解释和客服响应需要持续监测。"],
    ["政策合规变化", "AI监管和数据跨境规则可能影响政企AI与云服务部署口径。"],
    ["友商标杆挤压", "海外5G-A、核心网和智算案例需要提前准备对比材料。"]
  ],
  opportunities: [
    ["中国电信智算中心", "打包昇腾、数据中心网络、云服务和运维服务的组合方案。"],
    ["行业AI解决方案", "围绕金融、制造、政务形成专线、云和算力一体化话题。"],
    ["AI终端连接入口", "把AI眼镜、AI手机、家庭终端转化为5G、固网和边缘AI机会。"]
  ]
};

const news = [
  {
    id: "ct-cloud-network-intelligence",
    title: "中国电信发布新一轮云网融合与智算中心建设动向",
    category: "运营商动态",
    source: "运营商官网",
    sourceUrl: "https://www.chinatelecom.com.cn",
    time: "07:35",
    region: "中国",
    vendors: ["中国电信", "天翼云"],
    summary: "围绕智算、云网融合、政企行业场景释放新一轮建设信号。",
    why: "直接关联系统部客户经营节奏，适合形成客户交流材料和项目线索。",
    impact: "华为可围绕昇腾、数据中心网络、云服务和5G-A能力组织组合方案。",
    channels: ["客户线", "算力", "服务"],
    tags: ["中国电信", "智算中心", "云网融合", "CAPEX"],
    level: "高"
  },
  {
    id: "telecom-service-sentiment-risk",
    title: "通信服务投诉在社交平台扩散，网络体验与客服响应成为舆情焦点",
    category: "舆情和负面信息",
    source: "舆情监测",
    sourceUrl: "https://www.chinatelecom.com.cn",
    time: "05:05",
    region: "中国",
    vendors: ["中国电信", "运营商"],
    summary: "个别地区用户围绕宽带体验、套餐解释和客服处理效率集中讨论。",
    why: "虽未形成重大事件，但可能影响客户经营和服务改进议题。",
    impact: "建议服务和客户线跟踪传播范围，准备网络体验优化与客服AI辅助方案。",
    channels: ["服务", "客户线", "Marketing"],
    tags: ["客户投诉", "宽带体验", "客服", "风险预警"],
    level: "高"
  },
  {
    id: "operator-foundation-model-competition",
    title: "三大运营商大模型进入行业应用比拼阶段",
    category: "AI服务商动态",
    source: "行业媒体",
    sourceUrl: "https://www.chinatelecom.com.cn",
    time: "03:20",
    region: "中国",
    vendors: ["中国电信", "中国移动", "中国联通"],
    summary: "星辰、九天、元景等运营商大模型持续面向政务、客服、网络运维和行业智能化拓展。",
    why: "运营商AI能力正在从内部提效工具转为政企市场竞争资产。",
    impact: "系统部需要跟踪中国电信星辰差异化，结合云、网、算力形成闭环方案。",
    channels: ["客户线", "算力", "服务", "Marketing"],
    tags: ["星辰", "九天", "元景", "行业大模型"],
    level: "高"
  },
  {
    id: "multimodal-agent-models",
    title: "新一代多模态模型强化实时语音与智能体能力",
    category: "AI服务商动态",
    source: "公司Blog",
    sourceUrl: "https://openai.com/news",
    time: "06:50",
    region: "美国",
    vendors: ["OpenAI", "Google", "Anthropic"],
    summary: "大模型能力继续向低延迟、多模态、工具调用和企业工作流渗透。",
    why: "模型形态变化会牵引运营商AI平台、数据治理和算力服务重构。",
    impact: "星辰大模型需突出行业知识、可信部署和云网协同优势。",
    channels: ["Marketing", "客户线", "算力"],
    tags: ["大模型", "智能体", "多模态", "API"],
    level: "高"
  },
  {
    id: "domestic-ai-chip-liquid-cooling",
    title: "国产AI芯片和液冷服务器供给加速，智算集群成本成为竞争焦点",
    category: "AI/算力设备商动态",
    source: "科技媒体",
    sourceUrl: "https://www.huawei.com/cn/news",
    time: "06:20",
    region: "中国",
    vendors: ["寒武纪", "海光", "昇腾", "曙光"],
    summary: "国产算力生态围绕训练、推理、液冷和集群互联持续发力。",
    why: "算力供给结构变化会影响运营商智算采购和国产化路线。",
    impact: "华为需要在昇腾生态、云服务、网络互联和能效指标上保持组合竞争力。",
    channels: ["算力", "客户线", "Marketing"],
    tags: ["国产算力", "液冷", "智算集群", "推理成本"],
    level: "高"
  },
  {
    id: "ai-glasses-phone-edge",
    title: "AI眼镜与AI手机新品密集预热，端云协同需求升温",
    category: "AI产品商品",
    source: "消费电子媒体",
    sourceUrl: "https://www.huawei.com/cn/news",
    time: "06:05",
    region: "全球",
    vendors: ["Meta", "小米", "Rokid", "华为"],
    summary: "AI终端从单点功能转向全天候助手，强调语音、视觉和低功耗连接。",
    why: "终端普及可能带动5G套餐、家庭入口、边缘AI和云服务需求。",
    impact: "可面向中国电信包装AI终端连接套餐、家庭智能入口和边缘推理场景。",
    channels: ["无线", "固网", "算力", "Marketing"],
    tags: ["AI眼镜", "AI手机", "边缘AI", "5G"],
    level: "中"
  }
];

module.exports = {
  categories,
  categoryProfiles,
  dailyBriefing,
  news
};
