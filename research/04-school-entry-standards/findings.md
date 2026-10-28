# 04 NSW Kindergarten 入学 English / Maths 标准（最低 vs 最高）

> 检索日期：2026-10-28。本轮 WebFetch 和 curl 都被沙箱网络策略拦截，所有结论只来自**搜索结果摘要**，没有读过原文全文。凡是只有二手来源支持、或者摘要不完整的内容，都标为"需核实"。写进 PRD 之前，请打开 [S7][S8][S13][S14][S15] 原文核对代码和措辞。来源编号见 [`sources.md`](sources.md)。

## 1. 摘要

- **NSW 官方不要求孩子入学前会读写。** NSW DoE 家长材料说，孩子入学前不需要掌握特定技能，也没有任何读写要求 [S32]。Best Start 评估"不需要准备，答不出也不用担心" [S2]。学校的说法是"让学校为孩子做好准备" [S34]。所以本项目的"最低标准"是"入学时处于 on track"，不是"已经会读"。
- **入学后的第一个检查点是 Best Start Kindergarten。** 它是 Kindergarten 前 5 周内的一对一访谈，读写和数学各约 20 分钟，结果记录到 National Literacy and Numeracy Learning Progressions 的 indicator 上 [S1][S3]。考的内容包括：写自己的名字，认字母、字母音和熟悉的单词，听完短故事后回忆细节，点数物体，小数目加减，重复规律 [S3]。
- **最低线（floor）的来源是 AEDC。** AEDC 的 Language & cognitive skills 领域考察"读写与数学的兴趣和技能，以及记忆" [S26]。分数高于 2009 年基线第 25 百分位算 on track，低于第 10 百分位算 developmentally vulnerable [S24]。NSW 2024 年在该领域的 vulnerable 比例为 7.0%，on track 比例为 83.1%（需核实）[S26]。
- **最高线（ceiling）的来源是 NESA 2022 Early Stage 1（ES1）结果**，也就是 Kindergarten 结束时应该达到的水平 [S13][S14]。英语方面：掌握单字母 grapheme–phoneme 对应和常见 digraph，能解码和拼写 VC/CVC，能流畅朗读 decodable texts，会写全部大小写字母，能写出包含两个相关想法的简单句 [S16]。数学方面：数到至少 20 能认读和表示，10 以内的部分–整体关系，用合并、分开、比较做加减，重复规律和等分，2D/3D 形状、位置和长度比较等 [S14][S16][S18]。
- **再下一个里程碑是 Year 1 Phonics Screening Check**（Year 1 第 3 学期第 4–6 周）。共 40 个词，其中 20 个是假词，≥28/40 达到预期。2025 年全 NSW 达标率为 64% [S21][S22]。
- **对产品的含义：** 先把"入学最低线"做扎实，主要是口语、听故事、押韵/音节、名字、字母名和部分字母音、数到 20、点数到 10、认数字到 10。然后让有余力的孩子逐步接近 ES1 天花板。不要超出 ES1，以免和学校的 phonics 顺序冲突。

## 2. 标准体系说明（各框架之间的关系）

| 框架 | 性质 | 在本项目里的角色 |
|---|---|---|
| **EYLF V2.0**（0–5 岁，学前机构）[S31] | 不按年龄设具体指标。Outcome 5 "Children are effective communicators" 中的 5.4 是"begin to understand how symbols and pattern systems work"。Outcome 4 讲学习品质、问题解决、迁移 | 定方向：入学前以游戏和口语为主，没有分数线 |
| **AEDC**（全国人口普查式测量，每 3 年一次，由 Kindergarten 老师在入学第一年填写）[S24–S27] | 5 个领域中与本项目相关的两个：① Language & cognitive skills（school-based），子领域为 basic literacy、advanced literacy、basic numeracy、interest in literacy/numeracy & memory；② Communication skills & general knowledge（口语、讲故事、一般常识）。阈值：<P10 = vulnerable，P10–25 = at risk，>P25 = on track（基线为 2009 年）| **最低标准**：达到 on track 即可，相当于同龄人底部 25% 以上 |
| **Best Start Kindergarten**（NSW 公立学校，入学前 5 周）[S1–S6] | 一对一访谈，结果映射到 Learning Progressions 的 indicator，在 PLAN2 中记录。独立学校和天主教学校可以选择参加 [S6] | 入学"起点诊断"。本项目的入学检测题型可以参照它的任务类型 |
| **National Literacy / Numeracy Learning Progressions V3**（ACARA）[S7][S8] | 不分年级的发展序列。sub-element 加数字表示 level（如 PhA1、PKW3、CPr2、QuN1），同一 level 内的 indicator 没有先后顺序 | 统一的"刻度尺"：floor 和 ceiling 都用 level 表示 |
| **NESA English K–10 / Mathematics K–10 Syllabus（2022）Early Stage 1** [S13][S14] | 法定课程。ES1 = Kindergarten 全年，结果是年末预期 | **最高标准**：入学前最多做到这里 |
| **Year 1 Phonics Screening Check** [S21][S22] | Year 1 中段的 phonics 解码检查 | 下一个里程碑，不是入学要求 |

> 注：本项目的 `curriculum/scope-and-sequence.md` 原先只写 Australian Curriculum v9 代码（AC9EFLY…）。NSW 学校实际用的是 NESA 代码（ENE-…/MAE-…），已补一列。

## 3. English 入学标准表

说明：最低 = 入学时应达到（AEDC on track 加上 Best Start 能完成基础任务）；典型 = 多数上过 preschool 的 5 岁孩子；最高 = ES1 年末结果（再往上就超出 Kindergarten 了）。Progression level 和年级的对应关系没有找到官方明确表述，属于根据 indicator 内容的**推断（需核实）**。

| 技能 | 最低标准（入学时应达到） | 典型水平 | 最高标准（≈ Kindergarten 结束 / ES1） | 对应 progression / syllabus code | 来源 |
|---|---|---|---|---|---|
| 口语与词汇 | 能用短语或简单句谈论熟悉的人、物和事；能听懂并执行简单指令（SpK1 层次） | 用完整句子讲经历；能提问；日常 Tier 1 词汇够用 | 能和熟悉的同伴、成人有效交流，遵守轮流说话等交际规范；在熟悉语境中理解并使用 Tier 1 和 Tier 2 词汇 | SpK1→SpK2–SpK3、InT1–InT3、LiS2–LiS4（旧 ES1 映射）；ENE-OLC-01、ENE-VOCAB-01 | [S7][S10][S13][S15] |
| 听力理解 | 能安静听完一本短绘本，并说出 1–2 个细节（Best Start 有"听短书后回忆细节"任务） | 能复述故事主要情节，能回答"谁、做了什么" | 能理解朗读的文本，用背景知识和词汇知识理解句间联系；能对文学作品作出回应 | LiS1–LiS2、UnT1–UnT2（需核实）；ENE-RECOM-01、ENE-UARL-01 | [S3][S7][S16] |
| 语音意识（押韵 / 音节 / 首音） | 会跟唱儿歌和童谣，能接上熟悉的句子（PhA1） | 能判断押韵（在最多 4 个单音节词里找出押韵词），能拍音节，能把首音和韵（onset–rime）合成词（PhA2）；Best Start 有类似 "map, tap 再说一个押韵词" 的题（需核实） | 能拼合和拆分 2–3 个音素的单音节词，能识别首音素和尾音素（PhA3）；部分孩子能处理 4 个音素（PhA4）。ENE-PHOAW-01 要求"identifies, blends, segments and manipulates phonological units" | PhA1→PhA2（入学）→PhA3–PhA4（年末，需核实）；ENE-PHOAW-01 | [S4][S7][S10][S17] |
| 字母–音对应（phonic knowledge） | 没有硬性要求。能认出环境中的字母和单词即可（PKW1） | 知道部分字母的常见音（常见的是 s a t p i n 一类） | 掌握全部单字母 grapheme 的常见音，以及**常见 digraph**；能用来解码和拼写（PKW3 起） | PKW1→PKW3；ENE-PHOKW-01 | [S7][S16][S17] |
| 字母名 | 认识一部分字母（EDI 类工具的条目是"能认出至少 10 个字母"，但澳洲 AvEDI 的原文需核实） | 多数大写字母，部分小写字母 | 26 个字母大小写都能识别（为 HANDW 和 PHOKW 的前提；NESA 没有单独列"字母名"结果，需核实） | PKW1–PKW2 | [S28][S13] |
| 印刷概念（concepts of print） | 知道怎么拿书、翻页；知道字表达意思 | 能指出字和图的区别，知道单词之间有空格 | 能从左到右、从上到下跟踪文字，能识别印刷的视觉和空间特征 | PKW2（识别图、字、词间空格、数字）；ENE-PRINT-01 | [S7][S13] |
| 阅读（CVC 解码、视觉词） | 能认出自己的名字（PKW2）；能认出一些环境中的熟悉词（标签、路牌） | 认识几个高频词（I、a、the…），能读几个 CVC 词 | 能拼读已教过 grapheme 的 VC 和 CVC 词（如 at、bat）；能自动、流畅地朗读 decodable texts；能读已教的高频词，包括 tricky words（需核实） | PKW2→PKW3–PKW4；ENE-REFLU-01、ENE-RECOM-01 | [S7][S16][S17] |
| 写作（名字、字母、早期拼写） | 能写出自己的名字（可以不规范）。Best Start 有写名字的任务 | 名字写得基本规范，首字母大写；能写几个字母；会"假装写"或用首字母表示一个词 | 能写出至少包含**两个相关想法**和正确简单句的短文；能运用语音、正字法和词素策略拼写已教的熟悉词和高频词 | CrT1→CrT2–CrT3（需核实）；ENE-CWT-01、ENE-SPELL-01 | [S3][S7][S16] |
| 书写 / 精细动作 | 会握笔（不要求三指握）；能画线条和简单图形 | 三指握笔逐渐形成；能临摹大部分字母 | 能写出**全部小写和大写字母**（NSW Foundation Style 的起笔和笔顺） | ENE-HANDW-01 | [S16] |

## 4. Maths 入学标准表

| 技能 | 最低标准（入学时应达到） | 典型水平 | 最高标准（≈ ES1 年末） | 对应 progression / syllabus code | 来源 |
|---|---|---|---|---|---|
| 数数序列（唱数） | 能在儿歌中或被要求时说出数词（CPr1）；能从 1 唱数到 10 左右 | 能唱数到 20（EDI 条目"能数到 20"） | 能顺数到至少 30，从 20 以内任意数倒数，说出前一个和后一个数（数字 30 和 20 来自二手资料，需核实） | CPr1→CPr2；MAE-RWN-01 | [S8][S18][S28] |
| 一一对应与基数 | 能点数 5 个以内的物体；pre-counting 阶段能辨别约 3 个以内的小集合 | 点数 10 个以内，知道"最后一个数就是总数"，能跟踪已数和未数的物体 | 能在 20 以内的集合中稳定点数，理解数表示数量 | CPr2→CPr3（需核实）；MAE-RWN-01 | [S8][S12] |
| 速视（subitising） | 不点数就能认出 3 以内的数量（QuN1 改编版写作"少于 4"） | 认出 4–5 个点和骰子点型 | 能速认 1–5 的点型和规则排列；progression 中有"识别骰子或多米诺上 6 以内的标准排列" | QuN1→QuN2；CPr 中的 subitise indicator；MAE-RWN-01 | [S8][S11][S19] |
| 数字认读与书写 | 认出 1–5 的数字（EDI 条目是"认识 1–10"，按 on track 算可放在典型一栏） | 认读 0–10，能写其中一部分 | 能读写、表示**至少 0–20**的数（数字、实物、图片） | QuN1–QuN2（需核实）；MAE-RWN-02 | [S14][S28] |
| 比较 | 能比较两个小集合谁多谁少（明显差异） | 能说出 10 以内哪个数大，"多 1""少 1" | 能比较和排序 20 以内的数与集合 | QuN1；MAE-RWN-01/02 | [S11][S14] |
| 分解与组合（part–part–whole） | 无硬性要求 | 能把 5 分成两部分 | 能表示 **10 以内**的部分与整体关系 | AdS1–AdS2（需核实）；MAE-CSQ-02 | [S14] |
| 简单加减 | 能在实物情境里理解"再来 1 个""拿走 1 个" | 用实物或手指做 5 以内的加减（Best Start 考"小数目加减"） | 通过合并、分开、比较集合来建模加减，并说出理由（10 以内为主） | AdS1→AdS2（需核实）；MAE-CSQ-01 | [S3][S14] |
| 规律 | 能跟着做简单的 AB 重复规律 | 能识别并延续 AB、AAB 规律（Best Start 考重复规律） | 能识别、描述、延续重复规律；能通过分享和点数形成相等的组 | NPA1（需核实）；MAE-FG-01、MAE-FG-02 | [S3][S14] |
| 形状与位置 | 认出圆、方、三角 | 能说出常见 2D 形状的名称和特征（边、角）；知道上下、里外、前后 | 能分类、描述、命名并制作 2D 形状（三角形、圆、正方形、长方形）；能操作和分类 3D 物体；能描述位置，给出和执行简单方向指令 | MAE-2DS-01、MAE-3DS-01、MAE-GM-01 | [S14][S18] |
| 测量 | 会用长/短、大/小、重/轻等词 | 能直接比较两个物体的长短或轻重 | 能用日常语言描述和比较长度、距离；能比较面积、容量、质量（具体是哪个 NSM 编号需核实） | MAE-GM-02、MAE-NSM-01（需核实） | [S14][S18] |
| 数据 | 无 | 能按颜色或类别分类 | 能参与收集数据，并解读用实物做成的数据展示 | MAE-DATA-01（编号需核实） | [S14][S18] |

## 5. Year 1 Phonics Check 与后续里程碑

| 时间点 | 检查 | 内容 | 标准 |
|---|---|---|---|
| Kindergarten 第 1–5 周 | Best Start Kindergarten [S1][S3] | 读写与数学一对一访谈，结果记录到 progression indicator | 不评分、不分等级，用来安排教学 |
| 入学第一年（每 3 年一次） | AEDC [S24][S26] | 老师填写的人口层面指标 | on track 为 >P25；vulnerable 为 <P10 |
| Kindergarten 结束 | NESA ES1 结果 [S13][S14] | 见上面两张表 | 学校报告按 A–E 或描述性等级（具体格式需向学校确认） |
| **Year 1 第 3 学期第 4–6 周** | **Year 1 Phonics Screening Check** [S21][S22] | 40 个词（20 个真词、20 个假词），由老师一对一听读。假词用来检验是否会拼读，而不是靠记忆 | **≥28/40 达到预期**。2025 年 NSW 公立学校 64% 达标（2024 年 60%，2023 年 59%，2022 年 55%），平均 28.5 分 |
| Year 1–2 | NESA Stage 1（EN1-PHOKW-01 等：vowel digraph、trigraph 等扩展 phonics） | — | — |
| Year 3（转入独立学校那一年） | NAPLAN | AEDC 的 Language & cognitive 领域和 Year 3 NAPLAN 关联最强 [S30] | — |

对本项目的意义：Phonics Check 考的是"单字母和 digraph 的拼读能力能否迁移到没见过的词上"。所以 ES1 天花板中的"blend CVC，包括假词"才是最有长期价值的能力，比多背几个 sight words 更重要。

## 6. 对本项目的建议

**6.1 怎么测 floor 和 ceiling（两层）**
1. **家长清单（离线，约 5 分钟）**：覆盖 app 难以测量的行，包括口语和词汇、听故事复述、握笔和写名字、拿书和翻页、执行两步指令。每行三档："还没有 / 有时 / 稳定"。
2. **app 内入学检测（"入学体检"，约 10 分钟，分两次）**：题型参照 Best Start 的任务类型 [S3]，但不要用"考试"包装。
   - English：押韵判断、拍音节、首音（音素版）、听音选字母（s a t p i n m d g o c k）、读自己的名字、读 3 个 CVC 词、读 3 个假词（为 Phonics Check 做铺垫）。
   - Maths：唱数（家长打分）、点数 1–10、速视 1–5（闪现 1 秒）、认数字 0–20、比较多少、5 和 10 的分解、AB/AAB 规律。
3. **判定方式**：每行按"最低 / 典型 / 最高"三档显示。只有**低于最低**的行进入"优先练习"。达到最高的行标为"已达 ES1 年末水平，不再加难度"，并提示家长"入学后学校会系统教学"。
4. 每 4–6 周复测一次，把结果写进家长页面的进度条。不要给孩子展示分数。

**6.2 现有游戏与本表各行的对应**

| 本表行 | 现有游戏（guide.js id） | 覆盖到哪一档 |
|---|---|---|
| 字母名 | abc-explore、letter-find、case-match | 最高（大小写全部） |
| 字母–音 | letter-sounds、abc-explore | 典型→最高（单字母）；**没有 digraph** |
| 语音意识：押韵 | rhyme | 典型（PhA2） |
| 语音意识：首音 | first-letter（目前问的是字母名而不是音素） | 典型，需要改成音素版（E5） |
| 写名字 | my-name、trace | 最低→典型 |
| 书写 | trace（自由描红） | 典型；缺起笔点和笔顺（E9 P0） |
| 阅读：视觉词 | sight-words | 典型；需拆分可拼读词和 tricky words（E8） |
| 数数和点数 | count、number-explore | 最低→典型（到 20） |
| 数字认读 | number-find | 最高（0–20） |
| 数字书写 | trace-numbers | 典型 |
| 前一个 / 后一个 | whats-next | 典型→最高的一部分 |
| 比较 | more-less | 典型 |
| 加减 | add | 典型→最高（10 以内） |
| 规律 | patterns | 最高（AB、AAB、ABC 等重复规律） |
| 形状 | shapes | 典型（只有 2D，没有 3D 和位置） |

**6.3 缺口（按优先级）**
1. **音素拼读和拆音（E6）以及 CVC 读写（E7）**：这是 ES1 天花板的核心，也直接对应 Phonics Check。建议做 Sound Blender，加入假词（alien words）。
2. **听力理解和口语（E11，以及新增的"口语与词汇"行）**：Best Start 和 AEDC Communication 领域都会考，app 完全空白。可以做"听故事回答问题"，配合家长清单。
3. **速视（M3）、10 以内分解（M6）**：ES1 有对应结果（MAE-RWN-01、MAE-CSQ-02），app 未覆盖。
4. **音节拍击**（PhA2）：新增一个小游戏。
5. **常见 digraph（sh ch th ck 等）**：ES1 的 ENE-PHOKW-01 包含常见 digraph，目前 letter-sounds 只有单字母。
6. **倒数、数到 30**（需核实）、**通过分享形成相等的组**（MAE-FG-02）、**3D 物体和位置**（MAE-3DS-01、MAE-GM-01）、**测量（M10）**、**数据**：优先级低，可以先放进家长清单作为线下活动。
7. **印刷概念**：放进家长清单（拿书、指读）。
8. 在 scope-and-sequence.md 中补一列 NESA 代码，并把 "CoP" 之类不存在的代码改正为 CPr、QuN 等。

**6.4 原则**
- 天花板 = ES1。入学前不教 vowel digraph 和 trigraph（那是 Stage 1 的内容），以免和学校的 phonics 顺序冲突。字母顺序请向学校确认（scope 文档已有提示）。
- 计划从 Year 3 转独立学校。独立学校不一定参加 Best Start [S6]，但都遵循 NESA 课程，所以表里以 NESA 代码为准。

## 7. 不确定事项

1. **原文未读。** 所有代码和措辞都来自搜索摘要。特别需要核实的有：ENE-RECOM-01、ENE-REFLU-01、ENE-CWT-01、ENE-SPELL-01 的完整措辞（来自出版商对照表 [S16]）；MAE-NSM 和 MAE-DATA 的具体编号；MAE-GM-01 和 GM-02 的分工。
2. **ES1 "顺数到 30""从 20 倒数"** 只在商业对照表中出现 [S18]。旧 2012 大纲 MAe-4NA 写的是"counts to 30"。2022 版的官方内容需核实。
3. **速视范围**：官方课堂资源用的是 1–5 [S19]，旧草案写的是"最多 7"[S20]。最终大纲措辞未见。
4. **Progression level 与"入学 / 年末"的对应**（如入学 ≈ PhA1–PhA2、PKW1–PKW2、CPr1–CPr2，年末 ≈ PhA3–PhA4、PKW3–PKW4）是根据 indicator 内容推断的，没有找到官方明确的对照。唯一官方映射来自旧 2012 大纲的 ES1 Speaking and listening 页面（LiS2–LiS4、InT1–InT3、SpK2–SpK3、PhA1）[S10]，那是为旧大纲写的。
5. **Best Start 现行版本映射到哪些 sub-element 和 level** 没有找到（官方页面无法访问）。旧版 Best Start 用的是 NSW Literacy/Numeracy Continuum，已被 progression 取代。
6. **AEDC 澳洲版（AvEDI）条目原文**未见。"能认出至少 10 个字母""能数到 20""认识 1–10"来自加拿大 EDI 或其他工具 [S28]，澳洲版可能不同。NSW 2024 年的 7.0%、8.7%、83.1% 来自截断的摘要，需打开 [S26] 核对。
7. **"common digraphs" 具体包含哪些**（sh、ch、th、ck、ng、qu？）需看 ES1 内容原文。
8. **许可**：NSW DoE、ACARA、AEDC 资料的 CC BY 4.0 状态均需在文件上核实。NESA 大纲为 © NESA，只引用不转载。
9. 没有检索到 Raising Children Network 的入学准备页面，也没有引用。
