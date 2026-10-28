# 合规清单 Compliance Tracker

> 状态：启动期。只服务自己的孩子时风险很低；**一旦开放给其他家庭或上架，P0 必须全部完成**。
> 研究依据见 `research/01-ai-solutions/` 与 `research/02-best-practices/`。本清单不构成法律意见，上架前请咨询专业律师。

| 优先级 | 事项 | 适用 | 状态 |
|---|---|---|---|
| P0 | 隐私政策（面向家长，用简单语言），说明收集什么、存在哪里、怎么删除 | 全部 | ⬜ 草案见 `policies/privacy.md` |
| P0 | 澳洲 Privacy Act 1988 / APPs；关注 OAIC 正在制定的 Children's Online Privacy Code | 澳洲 | ⬜ |
| P0 | 美国 COPPA（如有美国用户）：收集 13 岁以下儿童个人信息前需可验证的家长同意 | 美国 | ⬜ |
| P0 | 儿童界面无广告、无外链、无内购；家长区有家长验证（已实现乘法题门槛） | 全部 | ✅ |
| P1 | 英国 Age Appropriate Design Code（如进入英国） | 英国 | ⬜ |
| P1 | App Store Kids Category / Google Play Designed for Families 要求（如做原生 App） | 上架 | ⬜ |
| P1 | 引入 AI / LLM 前：数据不用于训练、内容安全评测通过、家长可关闭 | AI 功能 | ⬜ 见 `ai/safety/` |
| P2 | 无障碍（WCAG 2.2 AA 的相关部分：对比度、字号、减少动态效果） | 全部 | 🟡 已支持减少动态效果 |
| P2 | 商标检索：产品名 / 角色名 | 商业化 | ⬜ |
| P1 | 云同步（Firebase）：数据位于悉尼、仅家长本人可访问、无分析 SDK；隐私政策已更新 | 已开启同步的设备 | ✅ 家庭自用；对外发布前需重新评估 |
