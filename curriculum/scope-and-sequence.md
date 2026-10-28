# Scope & Sequence（教学大纲）

> 依据：Ethan 在 **NSW** 入读 Kindergarten，学校执行 NESA 的 **NSW English K–2** 与 **Mathematics K–2** 课程（与 Australian Curriculum v9 Foundation 基本对应）、NSW 公立学校的 **Year 1 Phonics Screening Check**，以及 EYLF v2.0。
> 下表的课程代码是 Australian Curriculum v9 的写法；NSW 课程有自己的结果编号，开学后对照 NESA 官网补充。
> NESA 代码（ENE-… / MAE-…）与每个技能的**最低 / 典型 / 最高**入学标准见 PRD-001 §8.1 和 `research/04-school-entry-standards/`。
> 每个技能"家长怎么教"见 [`parent-guide.md`](parent-guide.md)（由 `npm run docs` 从游戏代码生成）。
> 课程代码来自研究资料的转述，**需对照 ACARA 官网原文核实**（见 `research/02-best-practices/findings.md`）。
> 状态：✅ 已有游戏覆盖 · 🟡 部分覆盖 · ⬜ 未覆盖（PRD-001 中的计划版本）

## English

| # | 技能 | 课程参考 | 游戏 | 状态 | 计划 |
|---|---|---|---|---|---|
| E1 | 认识 26 个大写字母（名称） | AC9EFLY11 | Find the Letter L1–2, ABC Explorer | ✅ | — |
| E2 | 认识小写字母、大小写配对 | AC9EFLY11 | Big & Little, Find the Letter L3 | ✅ | — |
| E3 | **每个字母最常见的音（phoneme）** | AC9EFLY11 | Letter Sounds, ABC Explorer | 🟡 | 游戏已上线；音质取决于家长是否录音 |
| E4 | 押韵识别 | AC9EFLY09 | Rhyme Time | ✅ | — |
| E5 | 首音识别 | AC9EFLY09 | First Letter（目前问"哪个字母"） | 🟡 | v0.2 改为音素版本（/d/ dog） |
| E6 | **口头拼读 blend / 拆音 segment** | AC9EFLY10 | — | ⬜ | v0.2 Sound Blender |
| E7 | **读写 CVC 单词**（cat, dog, sun） | AC9EFLY12 | — | ⬜ | v0.3 Sound Builder |
| E8 | 高频词：可拼读词 vs tricky words | AC9EFLY14 | Sight Words（混合） | 🟡 | v0.2 拆分 |
| E9 | 字母书写（起笔点、笔顺，NSW Foundation Style） | Handwriting（代码待核实） | Trace Letters（自由描红） | 🟡 | P0：起笔点 + 箭头 |
| E10 | 会写 / 拼自己的名字 | EYLF | Spell My Name | ✅ | — |
| E11 | 听读连贯小故事 | ENE-RECOM-01、ENE-UARL-01 | — | ⬜ | v0.3 Dino Stories（离线生成 + 审核） |
| E12 | 口语表达与词汇（讲述、复述、提问） | ENE-OLC-01、ENE-VOCAB-01 | — | ⬜ | F-62 Tell Dino |
| E13 | 印刷概念（拿书、翻页、从左到右） | ENE-PRINT-01 | — | ⬜ | 家长清单（F-60） |
| E14 | 拍音节 | ENE-PHOAW-01 | — | ⬜ | F-63 |
| E15 | 常见 digraph（sh ch th ck…）、拼读假词 | ENE-PHOKW-01 | — | ⬜ | F-63（Year 1 Phonics Check 铺垫） |

**字母教学顺序**（synthetic phonics 行业惯例，非官方规定）：s a t p i n → m d g o c k → ck e u r → h b f l → j v w x → y z qu …
请向孩子即将入读的学校确认使用的 phonics 项目与书写字体（各州 Foundation 字体不同）。

## Mathematics

| # | 技能 | 课程参考 | 游戏 | 状态 | 计划 |
|---|---|---|---|---|---|
| M1 | 点数到 20、一一对应、基数原则 | AC9MFN01 | Count It!, Number Explorer | ✅ | — |
| M2 | 认读数字 0–20 | AC9MFN01 | Find the Number | ✅ | — |
| M3 | **数感 subitising（≤5 一眼看出）** | AC9MFN02 | — | ⬜ | v0.2 Quick Look |
| M4 | 数序：前一个 / 后一个 | AC9MFN01 | What's Next? | ✅ | — |
| M5 | 比较多少 | AC9MFN01 | More or Less | ✅ | — |
| M6 | **10 以内分解组合（part-part-whole、凑 10）** | AC9MFN04 | — | ⬜ | v0.3 Make 10 |
| M7 | 10 以内加减（情境） | AC9MFN04 | Add & Take Away | ✅ | — |
| M8 | 形状（2D）与颜色 | Space（代码待核实） | Shapes | ✅ | — |
| M9 | 重复规律 | Algebra（代码待核实） | Patterns | ✅ | — |
| M10 | 测量比较（长短、轻重） | Measurement（代码待核实） | — | ⬜ | v0.4 |
| M12 | 3D 物体与位置、方向 | MAE-3DS-01、MAE-GM-01 | — | ⬜ | F-63 |
| M13 | 数据：分类、简单图表 | MAE-DATA-01（需核实） | — | ⬜ | F-64 |
| M11 | 书写数字 0–20 | Handwriting / Number | Write Numbers | 🟡 | 已上线自由描红；P0：起笔点 + 箭头 |

## 全人发展（英文、数学之外）

> 依据 AEDC 五大领域与 NSW 2024 版 K–6 新大纲（2027 年起实施）。优先级见 PRD-001 §8.2。

| # | 领域 | 框架 | 形式 | 计划 |
|---|---|---|---|---|
| W1 | 学校日常与自理（上厕所、饭盒、recess / lunch、书包） | AEDC 身体健康；学校入学清单 | 混合 + 陪玩卡 | F-61 Kindy Ready（入学前） |
| W2 | 情绪认识与自我调节 | AEDC 情绪成熟度；PDHPE PHE-SMI-01 | 混合 + 陪玩卡 | F-61 |
| W3 | 社交（轮流、分享、求助） | AEDC 社交能力 | 线下为主 | F-61 陪玩卡 |
| W4 | 科学：生物、材料、运动；提问与观察 | Science & Technology K–6 STE-SCI-01、STE-PQU-01 | App + 家庭实验 | F-64 |
| W5 | 音乐：节拍、快慢高低 | Creative Arts K–6 | App + 跟唱 | F-65 |
| W6 | 动作技能、健康与安全 | PDHPE K–6 | 线下为主 | F-66 |
| W7 | 家庭、社区、以前和现在 | HSIE K–6 HSE-HIS-01、HSE-GEO-01 | 混合 | 2027 Term 3–4 |
