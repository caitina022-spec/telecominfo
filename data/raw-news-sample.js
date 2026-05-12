const rawNewsSample = [
  {
    id: "raw-ct-20260512-cloud-network",
    title: "中国电信推进云网融合与智算基础设施协同升级",
    sourceName: "中国电信官网",
    sourceUrl: "https://www.chinatelecom.com.cn",
    publishedAt: "2026-05-12T07:35:00+08:00",
    region: "中国",
    body: "中国电信围绕天翼云、智算中心、云网融合和政企行业应用推进基础设施升级，强调算网一体、5G-A和行业智能化服务。",
  },
  {
    id: "raw-ai-20260512-agent-workflow",
    title: "海外大模型厂商强化智能体和企业工作流能力",
    sourceName: "科技媒体",
    sourceUrl: "https://example.com/ai-agent-workflow",
    publishedAt: "2026-05-12T06:40:00+08:00",
    region: "美国",
    body: "OpenAI、Google Gemini 和 Anthropic 继续把大模型能力扩展到多模态、工具调用、企业助手和智能体工作流。",
  },
  {
    id: "raw-risk-20260512-broadband-service",
    title: "部分地区宽带体验和客服响应引发通信服务投诉",
    sourceName: "舆情监测",
    sourceUrl: "https://example.com/telecom-service-risk",
    publishedAt: "2026-05-12T05:10:00+08:00",
    region: "中国",
    body: "社交平台出现关于中国电信宽带体验、套餐解释和客服响应效率的讨论，涉及服务风险和负面舆情。",
  },
];

if (typeof window !== "undefined") {
  window.rawNewsSample = rawNewsSample;
}

if (typeof module !== "undefined") {
  module.exports = rawNewsSample;
}
