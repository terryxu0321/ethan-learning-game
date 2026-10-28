# 0003 多设备同步（电脑、iPad、手机）
- 状态：**已采纳并实现**（2026-10-28，`apps/web/js/sync.js`）。✅ 2026-10-28 电脑浏览器登录同步成功；iPad / 手机待验证。
- 日期：2026-10-28

## 背景
家长希望在电脑、iPad、手机上使用并保持进度同步。目前所有数据（进度、学习者模型、入学清单、字母音录音）只存在单个浏览器里（localStorage + IndexedDB），见 ADR-0001。
2026-10-28 已上线"导出 / 导入进度"作为临时的手动同步和备份方式。

## 方案对比
| | A. Firebase（推荐） | B. Supabase | C. 只用导出 / 导入 |
|---|---|---|---|
| 登录 | Google 账号一键登录 | 邮箱魔法链接 | 无 |
| 离线后自动同步 | ✅ Firestore 自带离线缓存和同步 | 需要自己写 | ❌ 手动 |
| 录音同步 | 存在 Firestore 文档里（免费方案可用） | Supabase Storage | 文件里带着 |
| 数据位置 | 可选 **澳洲悉尼区域（australia-southeast1）** | 可选 Sydney 区域 | 只在设备上 |
| 费用 | 免费额度（Spark）足够一个家庭使用 | 免费额度；长时间不用项目会暂停 | 免费 |
| 能否继续纯静态托管 | ✅ 不需要自己的服务器 | ✅ | ✅ |
| 需要家长做的 | 创建 Firebase 项目，把网页配置发给开发者 | 创建 Supabase 项目 | 无 |

## 决定（提议）
采用 **A. Firebase**：
- 家长用 Google 账号登录（只在家长页）；孩子端不需要登录。
- Firestore 数据结构：`families/{uid}/profiles/{profileId}` 存 `Store.data`；录音以 base64 存在 `families/{uid}/sounds/{letter}`（每个约 20–40 KB，远小于 1 MB 文档上限）。
  不用 Cloud Storage：新建的 Storage 存储桶需要升级到付费的 Blaze 方案，Firestore 在免费的 Spark 方案里就够用。
- 安全规则：只有登录的家长本人能读写自己的数据。
- 合并策略：设备离线练习后再联网时，学习记录按"取并集、计数取最大"合并，设置按"最后修改的为准"，避免两台设备的进度互相覆盖。
- 未登录时一切照旧，只存在本机。

## 实现说明
- Firebase JS SDK 10.12.2 从 gstatic CDN 按需加载（只有开启同步的设备才加载）；测试时从 `node_modules/firebase` 提供同一版本的文件。
- 文档：`families/{uid}/profiles/main` = `{ json: JSON.stringify(Store.data), updatedAt }`（用 JSON 字符串避免 Firestore 字段名限制）；录音 `families/{uid}/sounds/{letter}` = `{ data: dataURL }`。
- 合并（`Sync.merge`）：星星取最大、贴纸取并集、每个题目项取练习次数更多的那份、每天的统计取较大的一份、游戏等级跟随玩得更多的设备；名字 / 设置 / 入学清单 / 手动等级按 `prefsUpdated`（家长最后修改时间）取新的。
- 已知限制：同一天在两台设备上都练习时，当天的分钟数取较大的一份而不是相加；在 iPad"添加到主屏幕"的 App 里，Google 登录弹窗可能受限，如遇问题先在 Safari 里登录使用。

## 后果
- 好：多设备自动同步、自动备份；换设备不再丢进度。
- 代价：孩子的学习数据会存到云端（家长自己的 Google 项目里）。需要更新 `company/policies/privacy.md`，只上传学习数据和录音，不加分析统计和广告 SDK。Firebase 的网页配置是公开的，安全靠访问规则保证。
- 引入第一个外部 SDK（Firebase JS SDK，从 gstatic CDN 加载），会增加页面体积，并依赖 Google 服务。
