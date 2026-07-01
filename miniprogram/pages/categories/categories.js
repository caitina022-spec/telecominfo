const { categories, categoryProfiles, news } = require("../../data/portal-data");

Page({
  data: {
    categories: [],
    activeCategory: "",
    activeProfile: null,
    filteredNews: []
  },

  onLoad() {
    const categoryCards = categories.map((name) => ({
      name,
      count: news.filter((item) => item.category === name).length,
      description: categoryProfiles[name].description
    }));
    const activeCategory = categories[0];

    this.setData({
      categories: categoryCards,
      activeCategory,
      activeProfile: categoryProfiles[activeCategory],
      filteredNews: this.newsFor(activeCategory)
    });
  },

  newsFor(category) {
    return news
      .filter((item) => item.category === category)
      .map((item) => ({
        ...item,
        levelClass: `level-${item.level === "高" ? "high" : item.level === "中" ? "medium" : "low"}`
      }));
  },

  switchCategory(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      activeCategory: name,
      activeProfile: categoryProfiles[name],
      filteredNews: this.newsFor(name)
    });
  },

  openDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});
