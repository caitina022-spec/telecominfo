function customerImplication(item) {
  if (item.category === "舆情和负面信息") {
    return "优先判断事件是否涉及重点省份、重点客户或高传播平台，必要时形成服务风险日报条目和回应口径。";
  }
  if (item.category.indexOf("AI") >= 0 || item.tags.some((tag) => tag.indexOf("大模型") >= 0 || tag.indexOf("智算") >= 0)) {
    return "适合转化为云、网、算、模一体化客户交流话题，重点判断是否能带出天翼云、星辰大模型或昇腾生态机会。";
  }
  if (item.category.indexOf("设备商") >= 0 || item.tags.some((tag) => tag.indexOf("5G") >= 0 || tag.indexOf("核心网") >= 0)) {
    return "适合进入竞品和技术路线对比材料，关注客户是否会用友商案例倒推建设节奏和指标要求。";
  }
  if (item.category === "运营商动态") {
    return "适合对照中国电信战略、网络建设和政企业务节奏，判断是否需要客户线准备高层交流材料。";
  }
  return "适合沉淀为趋势观察和客户交流素材，后续结合行业、区域和客户投资方向判断行动优先级。";
}

function followUpQuestions(item) {
  const questions = [
    `这条动态是否影响中国电信在${item.category}上的近期投入或口径`,
    `是否需要为${item.channels[0] || "相关团队"}准备一页客户交流材料`
  ];

  if (item.vendors.length > 0) {
    questions.push(`是否要补充${item.vendors[0]}与华为方案的对比`);
  }

  return questions;
}

function analysisItems(item) {
  return [
    {
      title: "核心摘要",
      body: item.summary,
      extra: `来源：${item.source} / ${item.time} / ${item.region}`
    },
    {
      title: "为什么重要",
      body: item.why,
      extra: `涉及主体：${item.vendors.join("、")}`
    },
    {
      title: "对中国电信/华为的影响",
      body: item.impact,
      extra: `建议关注部门：${item.channels.join("、")}`
    },
    {
      title: "客户经营启示",
      body: customerImplication(item),
      extra: `优先级：${item.level}`
    },
    {
      title: "建议跟进问题",
      body: followUpQuestions(item).join("；"),
      extra: `标签：${item.tags.join("、")}`
    }
  ];
}

module.exports = {
  analysisItems,
  customerImplication,
  followUpQuestions
};
