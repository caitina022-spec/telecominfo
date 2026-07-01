# 资讯速览小程序

这是“中国电信系统部情报门户”的微信小程序 MVP 版本。

## 当前页面

- `pages/index`：今日日报、Top 5、影响判断、风险预警、机会建议
- `pages/categories`：八大情报板块和板块内情报
- `pages/detail`：单条情报详情、深度分析、复制原文链接

## 本地预览

1. 打开微信开发者工具
2. 导入本仓库根目录
3. 如果没有正式 AppID，可以选择测试号/游客模式
4. 确认 `project.config.json` 的 `miniprogramRoot` 为 `miniprogram/`

## 发布前需要

- 注册微信小程序账号
- 将 `project.config.json` 里的 `appid` 替换为正式 AppID
- 如果后续要从服务器实时拉取日报，需要在微信公众平台配置合法请求域名
- 原文链接目前采用“复制链接”方式，避免 web-view 业务域名备案限制
