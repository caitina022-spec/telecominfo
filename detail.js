const { detailNavItems, news: detailNews, detailContent, categoryDescriptions, categoryActions } = window.portalData;

const levelClass = {
  高: "level-high",
  中: "level-medium",
  低: "level-low",
};

const $ = (selector) => document.querySelector(selector);

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

  const bucket = detailContent[type] || detailContent.telecom;
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
