const sourceConfig = {
  refresh: {
    timezone: "Asia/Shanghai",
    dailyRunTime: "08:00",
    dedupeWindowHours: 72,
  },
  sourceGroups: [
    {
      id: "operators-cn",
      name: "国内运营商官方动态",
      trustLevel: "official",
      cadence: "daily",
      categories: ["运营商动态", "中国电信专区", "舆情和负面信息"],
      sources: [
        { name: "中国电信", homepage: "https://www.chinatelecom.com.cn", vendors: ["中国电信", "天翼云", "星辰大模型"] },
        { name: "中国移动", homepage: "https://www.chinamobileltd.com", vendors: ["中国移动", "九天"] },
        { name: "中国联通", homepage: "https://www.chinaunicom.com.cn", vendors: ["中国联通", "元景"] },
      ],
    },
    {
      id: "operators-global",
      name: "海外运营商动态",
      trustLevel: "official",
      cadence: "daily",
      categories: ["运营商动态", "CT设备商动态", "AI服务商动态"],
      sources: [
        { name: "Orange", homepage: "https://www.orange.com", vendors: ["Orange"] },
        { name: "Deutsche Telekom", homepage: "https://www.telekom.com", vendors: ["DT", "Deutsche Telekom"] },
        { name: "Telefonica", homepage: "https://www.telefonica.com", vendors: ["Telefonica"] },
        { name: "Vodafone", homepage: "https://www.vodafone.com", vendors: ["Vodafone"] },
        { name: "SK Telecom", homepage: "https://www.sktelecom.com", vendors: ["SKT", "SK Telecom"] },
        { name: "KT", homepage: "https://corp.kt.com", vendors: ["KT"] },
        { name: "STC", homepage: "https://www.stc.com.sa", vendors: ["STC"] },
        { name: "Zain", homepage: "https://www.zain.com", vendors: ["ZAIN", "Zain"] },
      ],
    },
    {
      id: "ai-model-providers",
      name: "AI服务商与大模型动态",
      trustLevel: "official-and-media",
      cadence: "daily",
      categories: ["AI服务商动态", "其他行业热点"],
      sources: [
        { name: "OpenAI", homepage: "https://openai.com/news", vendors: ["OpenAI"] },
        { name: "Google AI", homepage: "https://blog.google/technology/ai", vendors: ["Google", "Gemini"] },
        { name: "Anthropic", homepage: "https://www.anthropic.com/news", vendors: ["Anthropic"] },
        { name: "Meta AI", homepage: "https://ai.meta.com/blog", vendors: ["Meta", "Llama"] },
        { name: "DeepSeek", homepage: "https://www.deepseek.com", vendors: ["DeepSeek"] },
        { name: "阿里云", homepage: "https://www.aliyun.com", vendors: ["阿里", "通义千问"] },
        { name: "腾讯云", homepage: "https://cloud.tencent.com", vendors: ["腾讯", "混元"] },
        { name: "百度智能云", homepage: "https://cloud.baidu.com", vendors: ["百度", "文心"] },
        { name: "月之暗面", homepage: "https://www.moonshot.cn", vendors: ["Kimi", "月之暗面"] },
        { name: "字节跳动火山引擎", homepage: "https://www.volcengine.com", vendors: ["字节跳动", "豆包"] },
        { name: "智谱AI", homepage: "https://www.zhipuai.cn", vendors: ["智谱"] },
      ],
    },
    {
      id: "compute-and-ct-vendors",
      name: "IT/CT设备商动态",
      trustLevel: "official-and-media",
      cadence: "daily",
      categories: ["AI/算力设备商动态", "CT设备商动态"],
      sources: [
        { name: "NVIDIA", homepage: "https://www.nvidia.com/en-us/about-nvidia/newsroom", vendors: ["NVIDIA"] },
        { name: "AMD", homepage: "https://www.amd.com/en/newsroom", vendors: ["AMD"] },
        { name: "华为", homepage: "https://www.huawei.com/cn/news", vendors: ["华为", "昇腾"] },
        { name: "中兴通讯", homepage: "https://www.zte.com.cn", vendors: ["中兴", "中兴珠峰"] },
        { name: "Ericsson", homepage: "https://www.ericsson.com/en/newsroom", vendors: ["Ericsson"] },
        { name: "Nokia", homepage: "https://www.nokia.com/about-us/newsroom", vendors: ["Nokia"] },
        { name: "Cisco", homepage: "https://newsroom.cisco.com", vendors: ["Cisco"] },
        { name: "Ciena", homepage: "https://www.ciena.com/about/newsroom", vendors: ["Ciena"] },
      ],
    },
    {
      id: "macro-policy-and-events",
      name: "宏观政策与展会",
      trustLevel: "official-and-media",
      cadence: "daily",
      categories: ["全球宏观热点", "其他行业热点"],
      sources: [
        { name: "工信部", homepage: "https://www.miit.gov.cn", vendors: ["工信部"] },
        { name: "国家数据局", homepage: "https://www.nda.gov.cn", vendors: ["国家数据局"] },
        { name: "GSMA", homepage: "https://www.gsma.com/newsroom", vendors: ["GSMA", "MWC"] },
        { name: "WAIC", homepage: "https://www.worldaic.com.cn", vendors: ["WAIC"] },
      ],
    },
  ],
  scoringRules: {
    highPrioritySignals: ["中国电信", "天翼云", "星辰", "智算中心", "云网融合", "5G-A", "CAPEX", "舆情", "监管"],
    mediumPrioritySignals: ["运营商AI", "大模型", "智能体", "核心网", "全光网", "AI终端", "液冷", "国产算力"],
    negativeSignals: ["投诉", "故障", "处罚", "泄露", "中断", "负面", "风险"],
  },
};

if (typeof window !== "undefined") {
  window.sourceConfig = sourceConfig;
}

if (typeof module !== "undefined") {
  module.exports = sourceConfig;
}
