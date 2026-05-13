const { detailNavItems, news: detailNews, detailContent, categoryProfiles } = window.portalData;

const levelClass = {
  高: "level-high",
  中: "level-medium",
  低: "level-low",
};

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sourceLink(item) {
  if (!item.sourceUrl) return escapeHtml(item.source);
  return `<a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.source)} · 打开原文</a>`;
}

function tagList(tags) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    type: params.get("type") || "telecom",
    value: params.get("value") || "中国电信今日动态",
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
  if (type === "item") {
    const item = detailNews.find((newsItem) => newsItem.id === value) || detailNews[0];
    return {
      eyebrow: "Intelligence Detail",
      title: item.title,
      summary: item.summary,
      item,
      items: buildItemAnalysis(item),
      actions: buildItemActions(item),
      related: detailNews.filter((newsItem) => newsItem.category === item.category && newsItem.id !== item.id).slice(0, 4),
      meta: [
        ["频道类型", "单条情报"],
        ["情报板块", item.category],
        ["重要级别", item.level],
        ["来源", item.source],
      ],
    };
  }

  if (type === "category") {
    const profile = categoryProfiles[value] || {};
    return {
      eyebrow: "Intelligence Category",
      title: value,
      summary: profile.description || "按专题聚合相关情报、重点判断和建议动作。",
      items: detailNews
        .filter((item) => item.category === value)
        .map((item) => `${item.title}：${item.summary}`),
      actions: profile.actions || ["筛选高优情报", "沉淀客户材料", "同步相关部门"],
      related: detailNews.filter((item) => item.category === value),
    };
  }

  const bucket = detailContent[type] || detailContent.telecom;
  const content = bucket[value] || Object.values(bucket)[0];
  return {
    eyebrow: content.eyebrow,
    title: value,
    summary: content.summary,
    items: content.items,
    actions: content.actions,
    related: relatedNews(type, value),
    meta: [
      ["频道类型", typeLabel(type)],
      ["当前主题", value],
      ["更新节奏", "随日报同步"],
    ],
  };
}

function buildItemAnalysis(item) {
  const vendors = item.vendors.join("、");
  const channels = item.channels.join("、");
  return [
    {
      title: "核心摘要",
      body: item.summary,
      extra: `来源：${item.source} / ${item.time} / ${item.region}`,
    },
    {
      title: "为什么重要",
      body: item.why,
      extra: `命中板块：${item.category}；涉及厂商/主体：${vendors}`,
    },
    {
      title: "对中国电信/华为的影响",
      body: item.impact,
      extra: `建议关注部门：${channels}`,
    },
    {
      title: "客户经营启示",
      body: customerImplication(item),
      extra: `优先级：${item.level}`,
    },
    {
      title: "建议跟进问题",
      body: followUpQuestions(item).join("；"),
      extra: `标签：${item.tags.join("、")}`,
    },
  ];
}

function customerImplication(item) {
  if (item.category === "舆情和负面信息") {
    return "优先判断事件是否涉及重点省份、重点客户或高传播平台，必要时形成服务风险日报条目和回应口径。";
  }
  if (item.category.includes("AI") || item.tags.some((tag) => tag.includes("大模型") || tag.includes("智算"))) {
    return "适合转化为云、网、算、模一体化客户交流话题，重点判断是否能带出天翼云、星辰大模型或昇腾生态机会。";
  }
  if (item.category.includes("设备商") || item.tags.some((tag) => tag.includes("5G") || tag.includes("核心网"))) {
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
    `是否需要为${item.channels[0] || "相关团队"}准备一页客户交流材料`,
  ];

  if (item.vendors.length > 0) {
    questions.push(`是否要补充${item.vendors[0]}与华为方案的对比`);
  }

  return questions;
}

function buildItemActions(item) {
  const baseActions = item.channels.map((channel) => ({
    title: `${channel}跟进`,
    body: `围绕${item.category}整理客户影响、机会点和风险项。`,
  }));

  return [
    ...baseActions,
    {
      title: "材料沉淀",
      body: "将核心摘要、客户经营启示和原文链接沉淀到日报或专题资料库。",
    },
  ];
}

function relatedNews(type, value) {
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
  $("#detailMeta").innerHTML = (detail.meta || [
    ["频道类型", typeLabel(type)],
    ["当前主题", detail.title],
    ["更新节奏", "随日报同步"],
  ])
    .map(([label, valueText]) => `<span><strong>${label}</strong>${valueText}</span>`)
    .join("");

  if (type === "item" && detail.item) {
    $("#detailMeta").insertAdjacentHTML(
      "beforeend",
      `<span><strong>原文链接</strong>${sourceLink(detail.item)}</span>`,
    );
  }

  $("#detailItems").innerHTML = detail.items
    .map(
      (item) => `
        <article class="detail-item">
          <strong>${escapeHtml(typeof item === "string" ? item.split("：")[0] : item.title)}</strong>
          <p>${escapeHtml(typeof item === "string" ? (item.includes("：") ? item.split("：").slice(1).join("：") : item) : item.body)}</p>
          ${typeof item === "string" || !item.extra ? "" : `<small>${escapeHtml(item.extra)}</small>`}
          ${typeof item === "string" || !item.tags ? "" : `<div class="tag-row">${tagList(item.tags)}</div>`}
        </article>
      `,
    )
    .join("");

  $("#detailActions").innerHTML = detail.actions
    .map((action) => {
      const title = typeof action === "string" ? action : action.title;
      const body = typeof action === "string" ? "建议进入日常跟踪和客户材料沉淀。" : action.body;
      return `<div class="mini-item"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></div>`;
    })
    .join("");

  $("#relatedCount").textContent = `${detail.related.length} 条相关`;
  $("#relatedNews").innerHTML = detail.related.length
    ? detail.related.map(relatedCard).join("")
    : `<div class="empty-state">暂无相关情报，后续接入真实数据后自动补齐。</div>`;
}

function typeLabel(type) {
  return {
    item: "单条情报",
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
      <div class="news-meta">${item.category} / ${item.vendors.join("、")}</div>
      <p>${item.summary}</p>
      ${item.sourceUrl ? `<a class="source-link" href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">打开原文</a>` : ""}
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
