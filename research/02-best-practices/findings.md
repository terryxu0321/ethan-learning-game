# 早期学习游戏平台最佳实践调研（3–7 岁，英文读写 + 数学）

> 对象：Ethan's Learning Land（`apps/web/`）。检索日期 2026-10-28。[S#] 对应 [`sources.md`](sources.md)。
> **局限**：本次研究只能用网页搜索，不能打开网页原文。要点来自官方页面、论文摘要和可信的二手报道；标"需核实"的地方请查原文。

## 摘要
1. **读写须按 systematic synthetic phonics**：AC v9 Foundation 要求知道每个字母最常见的音、口头 blend/segment、读写 CVC [S11]；Year 1 Phonics Check 围绕此能力 [S10]。本项目几乎只教**字母名**，无 phoneme、无拼读——最大差距。
2. **数学按发展进程**：subitizing(≤5)→有意义计数(一一对应/基数)→比较→数字符号→part-part-whole/加减 [S8][S12][S6]。缺独立 subitizing 与 10 的分解。
3. **Four Pillars**：active、engaged、meaningful、socially interactive，并有明确学习目标 [S1]；热门 app 普遍得分低，免费 app 因干扰更低 [S2]。本项目干净，但 meaningful/social 偏弱。
4. **间隔复习优于集中练习**（3 岁、5–7 岁均有证据）[S4]；本项目无跨天复习。
5. **奖励应信息性**：预期性、与完成挂钩的有形奖励可削弱内在动机，具体正面反馈可增强 [S5]。
6. **屏幕时间**：WHO 与澳洲 24h 指南：3–5 岁久坐屏幕 ≤1 小时/天、越少越好 [S15][S16]；5–12 岁娱乐屏幕 ≤2 小时（不含学习）[S17]；AAP 强调 co-view/co-play [S18][S19][S20]。建议每次 10–15 分钟+自然结束点。
7. **伦理底线已达标**：无广告/内购/第三方分析、本地存储、家长 gate，符合 Apple Kids、Google Families、UK Children's Code 核心要求 [S24][S25][S29]；约 4/5 儿童 app 含操纵性设计 [S31]，应把"零 dark pattern"写成原则。
8. **标杆共同点**：清晰课程序列（TYMTR 对应 Letters and Sounds Phase 2–5 [S32]、Reading Eggs 课程地图与定级 [S34]）、角色叙事、家长报告与线下延伸、短课/离线/免费无广告（Duolingo ABC、Khan Kids）[S33][S35]。

## 1. 学习科学原则
- **Four Pillars** [S1][S2]：主动心智投入而非单纯点击；专注学习目标、减少无关动画音效；与生活经验相连；与家长/同伴互动。
- **读写**：WWC K–3 指南——语音意识并连接字母、解码与词结构、写与认词、每天读连贯文本 [S7]。AC v9（代码需核实）[S11]：AC9EFLY09 押韵/音节/音素；AC9EFLY10 口头 blend/segment；AC9EFLY11 大小写字母及最常见音；AC9EFLY12 读写 CVC；AC9EFLY14 部分高频词（and, my, is, the, go）。字母名+音联合教学对学音略有帮助，但必须显式教音 [S3]。SSP 做法：可拼读高频词（am, at, it, in, on, can, up, big, mum, dad）走拼读，仅 tricky words 整词记（TYMTR First Steps 只含 6 个 tricky words [S32]）；字母按分组序列（常见 s a t p i n…，行业惯例非官方规定）。
- **数学**：WWC 建议一按发展进程教数与运算 [S8]；计数五原则，5–6 岁仍在发展 [S6]；AC9MFN01 0–20、AC9MFN02 subitise ≤5、AC9MFN04 ≤10 分解组合（需核实）[S12]；PBS KIDS RCT：游戏+动手材料+成人支持才有效，仅设备无同等收益 [S36]。
- **记忆与反馈**：spacing 提升记忆与泛化 [S4]；"卡住时支持"是 Common Sense 评级维度 [S27]；正面信息性反馈增强内在动机 [S5]。未找到针对 5 岁儿童检索练习的专门研究。

## 2. 儿童UX设计规范
| 主题 | 要点 | 来源 |
|---|---|---|
| 年龄 | 3–5 岁为前阅读者，语音为主 | [S21] |
| 指令 | 清楚具体，利用已有心智模型 | [S21] |
| 手势 | 点大目标易，拖拽/精细手势难 | [S21][S22] |
| 尺寸 | 4–5 岁对 16px 目标准确率低；鼠标研究建议 ≥1cm；WCAG 24px(AA)/44px(AAA) 为成人下限 | [S22][S23] |
| 非读者 | 指令全语音、可重听、图像辅助 | [S21][S35] |
| 干扰 | 无关增强功能降低 engagement | [S2] |
| Dark patterns | 不用倒计时、"明天回来领奖"、角色失望诱导、伪装广告 | [S30][S31] |
| 奖励 | 信息性反馈为主 | [S5] |
| 卡住 | 逐级提示与示范 | [S27] |
| 会话 | 短会话+自然结束点（TYMTR 以每周 20 分钟估进度） | [S16][S32] |
| 可及性 | 目标尺寸、reduced-motion、不只靠颜色 | [S23] |

## 3. 屏幕时间与健康指南
| 指南 | 年龄 | 屏幕 | 其他 |
|---|---|---|---|
| WHO 2019 [S15] | 3–4 | 久坐屏幕 ≤1h，越少越好 | ≥180 分钟活动（≥60 分钟中高强度）；10–13h 睡眠（需核实） |
| 澳洲 24h Early Years [S16] | 3–5 | ≤1h，越少越好 | 不被约束 >1h；久坐时阅读/唱歌/拼图/讲故事 |
| 澳洲 24h 5–17 [S17] | 5–12 | 娱乐 ≤2h（不含学习） | ≥60 分钟中高强度；9–11h 睡眠 |
| AAP 2016 [S18] | 2–5 | 约 1h 高质量内容 | 共同观看 |
| AAP 5 Cs [S19] | 分龄 | 无单一数字 | Child, Content, Calm, Crowding out, Communication |
| JME [S20] | — | — | 为亲子对话而设计 |

含义：按 ≤1h 保守处理；每次 10–15 分钟、每天 1–2 次；结束画面正面引导去做线下活动。

## 4. 行业标准与伦理
| 标准 | 要求 | 现状 |
|---|---|---|
| Apple §1.3 [S24] | 无第三方广告/分析；不传第三方；外链/购买在 gate 后 | ✅ |
| Google Families/Teacher Approved [S25] | 合规；适龄、体验质量、enrichment、delight | ✅ 可自评 |
| kidSAFE [S26] | 安全规则+COPPA 隐私规则 | ✅ 不收集数据 |
| Common Sense [S27] | Pedagogy、Engagement、Support | ⚠️ Support 弱 |
| UNICEF/LEGO RITEC [S28] | 8 个福祉维度（competence、emotional regulation、empowerment…） | ⚠️ 加自主与休息设计 |
| UK Children's Code [S29] | 最大利益、默认高隐私、数据最小化、禁 nudge | ✅；⚠️ 避免"集齐全部" |
| OAIC 儿童隐私 Code 草案 2026 [S14] | 最大利益；15 岁以下家长同意 | ✅ 纯本地；加云同步需评估 |
| 操纵设计研究 [S30][S31] | 约 4/5 app 含 dark pattern | ✅ 写成原则 |

## 5. 标杆产品分析
| 产品 | 课程 | 角色 | 奖励 | 家长 | 模式 | 借鉴 |
|---|---|---|---|---|---|---|
| Teach Your Monster to Read [S32] | Letters and Sounds Phase 2–5；31 个字母-音、CVC、6 个 tricky words，约 7 周×20 分钟 | 教自己的怪兽 | 装扮道具 | 进度账号 | 免费无广告 | SSP 序列；孩子当"老师" |
| Khan Academy Kids [S33] | 2–8 岁自适应 | Kodi 等 | 收集物品 | 家长/教师端 | 免费无广告 | 小样本 RCT 语音意识提升（Khan 资助） |
| Reading Eggs/Mathseeds [S34] | 分龄产品线、定级、课程地图、Fast Phonics 为 SSP、对齐澳洲课程 | 卡通世界 | 金蛋 | 报告+打印练习 | 订阅 | 定级、地图可视化 |
| Duolingo ABC [S35] | 700+ 短课；逐词高亮故事 | 品牌角色 | 迷你游戏 | — | 免费无广告、离线 | 短课、连贯文本 |
| PBS KIDS [S36] | 节目角色游戏 | 节目角色 | 轻量 | 线下活动 | 免费 | 游戏+线下+成人 |
| Lingokids [S37] | 宣称 650+ 目标 | Billy & Cowy | 等级 | 面板+线下建议 | 订阅 | 来源可靠性低 |
| Starfall | 未获可靠资料 | — | — | — | — | 待调研 |

## 6. 对照本项目的差距分析与改进清单
（基于 `apps/web/js/games.js`、`app.js`、`data.js`、`css/style.css`；P0 课程核心，P1 明显提升，P2 优化）

| # | 实践 | 现状 | 建议 | 优先级 |
|---|---|---|---|---|
| 1 | 教字母最常见的音 [S11][S7] | ABC Explorer/Find the Letter/Big & Little 只读字母名；TTS 难发孤立音素 | 录制澳洲口音 phoneme 音频；"A says /a/, apple"；听音找字母 | P0 |
| 2 | blend/segment、CVC [S10][S11] | 无 | 新增 Sound Blender（/c/-/a/-/t/→选图）与 Sound Builder（听词拼 CVC） | P0 |
| 3 | 系统性字母顺序 | pick(LETTERS) 随机 26 字母 | 分组解锁 s a t p i n → m d g o c k… | P1 |
| 4 | 首音示例体现常见音 | I=ice cream（长音）、X=fox（尾音）；问"哪个字母" | I 改 igloo/insect；语音改"/d/… dog starts with /d/" | P1 |
| 5 | 高频词分 tricky/decodable [S11][S32] | SIGHT_WORDS 混合并整词认读 | 拆分，可拼读词并入拼读游戏 | P1 |
| 6 | 间隔复习 [S4] | 仅按单局正确率升降；不记具体错项 | 记录逐项掌握度；每局混入 20–30% 旧题/错题（Leitner） | P1 |
| 7 | 卡住时逐级支持 [S27] | 错了禁用选项+"Try again"，无限试错 | 1 错重播；2 错高亮/放慢示范；3 错示范答案再点 | P1 |
| 8 | Subitizing ≤5 [S8][S12] | Count It! 逐个点数，无"一眼看" | Quick Look：点阵/骰子/十格闪现 1–2 秒 | P1 |
| 9 | 会话时长与休息 [S15][S16][S19] | 无计时；"最近 7 天"统计局数非分钟 | 记分钟；约 15 分钟温和结束画面；家长可设；无倒计时压力 | P1 |
| 10 | 信息性奖励 [S5][S29] | 每局必得星+贴纸；"Collect all the stickers!" | 贴纸挂钩"学会新技能"；去掉集齐号召；表扬具体化 | P2 |
| 11 | Meaningful [S1] | 有拼名字、emoji；无角色故事 | 🦖 陪伴角色+旅程；加家人、澳洲动物、Kindy 日常词 | P2 |
| 12 | Co-play [S18][S20][S36] | 家长页有陪玩建议 | 每局结束给 1 条线下延伸活动；亲子双人模式 | P2 |
| 13 | Part-part-whole [S12] | 有加减，无凑 10 | Make 10/Number Bonds 十格补空 | P2 |
| 14 | 连贯文本 [S7][S35] | 无 | 解锁可解码小故事，逐词高亮 | P2 |
| 15 | 入门定级 [S34] | 全从 L1 起 | 3–5 题快速定级或家长设定 | P2 |
| 16 | 课程对齐家长报告 | 按游戏显示等级/正确率 | 按 AC v9 技能显示已掌握/练习中+下一步 | P2 |
| 17 | 书写笔顺 | 自由描红 | 起笔点+箭头；用学校所在州 Foundation 字体（需确认） | P2 |
| 18 | 目标尺寸 [S22][S23] | .choice ≥120px（窄屏 92px）✅ | 保持；检查小按钮 | — |
| 19 | 语音优先 [S21] | 全程 TTS+🔊 重播 ✅ | TTS 不可用时录音兜底 | — |
| 20 | 无广告/内购/追踪 [S24][S25][S29][S31] | ✅；乘法 gate ✅ | 写入原则（已写入 `company/policies/child-safety.md`）；云同步按 OAIC 评估 | — |
| 21 | Reduced motion [S23] | ✅ `style.css` 已有 `prefers-reduced-motion` 媒体查询（研究 Agent 原判为缺失，已人工核对更正） | 保持 | — |
| 22 | 自主选择（RITEC）[S28] | 自由选科目/游戏、两个自由探索 ✅ | 可加"今日推荐"不强制 | — |

## 7. 未尽事项
- ACARA 代码来自 QCAA/SCSA/商业对齐文件，需核实官方原文。
- WHO/卫生部/UNICEF/ICO 许可为惯例推断未核实，raw/ 未存原文。
- NN/G 报告付费未读；Starfall 无可靠资料；TYMTR 无独立 RCT。
- 学校所用 phonics 项目与书写字体因校而异，建议家长向学校确认（推断性建议）。
