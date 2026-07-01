const { news, dailyBriefing } = require("../../data/portal-data");

Page({
  data: {
    today: "",
    topNews: [],
    impacts: [],
    risks: [],
    opportunities: []
  },

  onLoad() {
    const topNews = news
      .filter((item) => item.level === "高")
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
        levelClass: `level-${item.level === "高" ? "high" : item.level === "中" ? "medium" : "low"}`
      }));

    this.setData({
      today: this.todayLabel(),
      topNews,
      impacts: this.toNamedItems(dailyBriefing.impacts),
      risks: this.toNamedItems(dailyBriefing.risks),
      opportunities: this.toNamedItems(dailyBriefing.opportunities)
    });
  },

  todayLabel() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },

  toNamedItems(items) {
    return items.map(([title, body]) => ({ title, body }));
  },

  openDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});
