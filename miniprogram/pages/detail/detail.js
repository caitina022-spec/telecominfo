const { news } = require("../../data/portal-data");
const { analysisItems } = require("../../utils/analysis");

Page({
  data: {
    item: null,
    levelClass: "",
    analysis: []
  },

  onLoad(options) {
    const item = news.find((entry) => entry.id === options.id) || news[0];
    const levelClass = `level-${item.level === "高" ? "high" : item.level === "中" ? "medium" : "low"}`;

    this.setData({
      item,
      levelClass,
      analysis: analysisItems(item)
    });

    wx.setNavigationBarTitle({
      title: "情报详情"
    });
  },

  copySourceUrl() {
    const { item } = this.data;
    if (!item || !item.sourceUrl) {
      wx.showToast({
        title: "暂无原文链接",
        icon: "none"
      });
      return;
    }

    wx.setClipboardData({
      data: item.sourceUrl,
      success: () => {
        wx.showToast({
          title: "原文链接已复制",
          icon: "success"
        });
      }
    });
  }
});
