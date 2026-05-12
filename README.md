# 中国电信系统部情报门户原型

这是一个纯静态 MVP 原型，面向“每日情报日报 + 情报专题门户”的产品方向。

## 打开方式

直接在浏览器打开 `index.html` 即可预览。

## 当前能力

- 今日日报摘要：Top 5、影响判断、风险预警、机会建议
- 一键复制日报文本，便于发到企业微信、飞书、邮件或群公告
- 八大情报板块：宏观、AI服务商、AI产品、AI/算力设备、CT设备、运营商、舆情、行业热点
- 中国电信专区：天翼云、星辰大模型、云网融合、5G-A、经营数据与舆情沉淀
- 专题沉淀区：WAIC/MWC等展会洞察、竞品图谱、资料库
- 可点击详情页：中国电信专区、专题洞察和情报卡片都可进入 `detail.html`
- 搜索和筛选：按关键词、厂商、标签、部门、重要级别过滤
- 热点趋势：关键词热度与厂商动态排行

## 内容维护

页面内容已经集中到 `data/portal-data.js`：

- `news`：日报和八大情报板块新闻
- `categoryProfiles`：八大情报板块的说明、建议动作、关键词和重点厂商词表
- `dailyBriefing`：今日日报里的影响判断、风险预警、机会建议
- `specialTopics`：专题洞察卡片
- `detailContent`：中国电信专区和专题详情页内容

每条 `news` 都有稳定 `id`，首页新闻卡片会进入单条情报详情页。后续接自动抓取或数据库时，建议继续使用这个 `id` 作为详情页和去重的基础字段。

`categoryProfiles` 可以作为后续自动抓取和AI分类的第一版词表：抓取服务先按关键词和重点厂商命中候选内容，再由AI摘要、分类和评分生成日报。

`data/source-config.js` 是后续自动抓取的来源配置，包含运营商、AI服务商、IT/CT设备商、宏观政策和展会来源，以及重要性评分信号。当前页面不会联网抓取，它只是为下一步后端/脚本接入准备统一入口。

`data/raw-news-sample.js` 是抓取结果样例，代表 RSS、官网或手工录入进来的原始新闻。`scripts/ingest-raw-news.js` 会把这些原始新闻转换成门户可用的新闻字段。

后续改内容优先改这个数据文件，`app.js` 和 `detail.js` 主要保留页面渲染逻辑。

## 本地检查

内容改完后可以运行：

```bash
node scripts/validate-data.js
node --check app.js
node --check detail.js
```

`scripts/validate-data.js` 会检查新闻 ID 是否重复、新闻分类是否存在、日报摘要、详情内容和抓取来源配置是否缺字段。后续接自动抓取时，也可以把它作为入库前的轻量校验。

需要生成一份本地 Markdown 日报时运行：

```bash
node scripts/generate-daily-report.js
```

脚本会在 `reports/` 目录下生成当天的 `YYYY-MM-DD-daily-report.md`，内容来自当前 `data/portal-data.js`。

需要查看标准化后的新闻结构和优先级评分时运行：

```bash
node scripts/normalize-news.js
```

脚本会在 `reports/normalized-news.json` 输出标准化 JSON，后续真实抓取脚本可以复用这个结构。

需要测试原始新闻入库转换时运行：

```bash
node scripts/ingest-raw-news.js
```

脚本会在 `reports/ingested-news.json` 输出已分类、打标签、补齐频道和优先级的候选新闻。

如果要转换一份外部原始新闻 JSON，可以参考 `templates/raw-news-input.example.json` 的格式，然后运行：

```bash
node scripts/ingest-raw-news.js path/to/raw-news.json
```

也可以直接运行完整日报流水线：

```bash
node scripts/run-daily-pipeline.js
```

它会依次完成数据校验、原始新闻转换、新闻标准化和 Markdown 日报生成。

## 后续接入自动化

建议服务端按以下链路接入：

```text
信息源抓取
→ 关键词和厂商词表过滤
→ 去重与可信源校验
→ AI摘要、分类、标签、重要性评分
→ 生成 08:00 日报
→ 写入数据库并刷新网页
→ 推送企业微信/飞书/邮件摘要
```

前端可以把 `data/portal-data.js` 里的示例 `news` 数据替换为接口返回，例如 `/api/daily?date=YYYY-MM-DD`。
