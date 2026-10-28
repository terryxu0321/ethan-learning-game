# 游戏设计审查（按 Ethan 现在的阶段）

> 日期：2026-10-28 · 依据：PRD-001 §8.1 入学标准、`research/02`、`research/04`、家长反馈（Ethan 认读走在书写前面，**还没有开始系统学单词**，最近对写字母和数字很有兴趣）。
> 下次审查：开学后（2027 Term 1 第 5 周，Best Start 评估之后），或家长清单更新时。

## 审查原则

读写能力有一条公认的发展顺序。游戏应该跟着这条顺序走，不能跳级：

1. **听**（语音意识）：押韵、拍音节、听出第一个音。**不需要认字**，是入学前最该打好的基础。
2. **字母**：字母名 → 字母音。
3. **拼读**：把 2–3 个音拼成一个词（c-a-t → cat）。这是 Kindergarten 年中到年末的内容。
4. **读词和句子**：高频词、可解码小书。这是 Kindergarten 年末的"最高"档。

所以判断一个游戏是否超纲，看的是它**要求孩子做什么**，而不是题目里有没有单词。押韵游戏里有单词，但孩子只需要**听**，所以不超纲。

## 结论一览

| 游戏 | 练什么 | 对应入学标准 | 对 Ethan 现在 | 结论与调整（已实施 ✅） |
|---|---|---|---|---|
| ABC Explorer | 字母名、字母音 | 最低→典型 | 合适 | 保持 |
| Letter Sounds | 字母音 | 典型（s a t p i n） | 合适，**最重要** | 保持；请家长先录前 6 个音 |
| Find the Letter | 字母名辨认 | 典型→最高 | 合适（认读较好，可从 L2 开始） | 保持 |
| Big & Little | 大小写配对 | 典型→最高 | 合适 | 保持 |
| Rhyme Time | 押韵（听） | 典型 | **不超纲**：这是"听"的游戏 | ✅ 新增 L1"两个词押不押韵？👍/👎"（最简单的形式）；L1–L2 **不再显示单词**，只看图听音；L3 才显示单词 |
| First Letter | 首音 → 字母 | 典型 | 需要先知道几个字母音 | ✅ L1 先读单词再播放第一个音作提示；单词**答对后才显示**；排在 Letter Sounds 之后 |
| Spell My Name | 拼自己的名字 | 最低→典型 | 合适，入学重点 | 保持 |
| Trace Letters | 字母书写 | 典型 | 合适，正好对上书写兴趣 | ✅ 改为 L1 名字里的字母**按名字的写法**（E 大写，t h a n 小写）→ L2 小写 → L3 大写（Kindergarten 先教小写） |
| Sight Words | 整词认读 | **最高（Kindergarten 年末）** | **偏早**：还没开始学单词 | ✅ 标为"Kindergarten+ 进阶"，排到英文最后；建议 Letter Sounds 到 2 级后再玩 |
| Number Explorer | 数字和数量 0–20 | 最低→最高 | 合适 | 保持 |
| Count It! | 点数 | 最低→最高 | 合适 | 保持 |
| Find the Number | 认数字 0–20 | 典型→最高 | 合适 | 保持 |
| Write Numbers | 写数字 | 典型 | 合适，对上书写兴趣 | 保持 |
| What's Next? | 数序 | 典型→最高 | 合适 | 保持 |
| More or Less | 比较 | 最低→典型 | 合适 | 保持 |
| Shapes | 形状、颜色 | 最低→典型 | 合适 | 保持 |
| Patterns | 规律 | 典型→最高 | 合适 | 保持 |
| Add & Take Away | 10 以内加减 | 典型→最高 | L1（和 ≤ 5）合适；L3 减法偏难 | 保持，排到数学最后 |
| Kindy Ready ×4 | 学校日常、情绪、自控 | 最低→典型 | 合适，入学前最有时效性 | 新上线 |

## 还缺的（按优先级）

1. **拍音节**（语音意识，最低→典型）：比押韵更简单的"听"游戏。→ 下一个要做的英文游戏。
2. ~~Quick Look 速视~~ ✅ 已上线（F-25）。
3. **Sound Blender 口头拼读**：在 Letter Sounds 达到 2 级后开放。
4. **Make 10**：数学最高档，开学后再做。

## 难度顺序与解锁（2026-10-28 起）

每个科目里的游戏按难度排好（代码中的 `GAME_ORDER`，清单见 `curriculum/games.md`）。前面的游戏都拿到 👑 皇冠，才开放下一个；自由探索类游戏始终开放。

- **English**：Find the Letter → Big & Little → Spell My Name → Rhyme Time → Trace Letters → Letter Sounds → First Letter → Sight Words（进阶）
- **Math**：Count It! → Shapes → Find the Number → Quick Look → More or Less → Write Numbers → Patterns → What's Next? → Add & Take Away
- **Kindy Ready**：My School Day → School Smarts → Feelings → Dino Says
- **中文**：找汉字 → 字和图

排序理由：先认字形（字母名、大小写），再"听"（押韵），再写，再学字母音和首音（需要前面的基础），最后读词。数学先数和形状，再数字符号、速视和比较，最后是规律、数序和加减。

**皇冠规则**：在最高级一局一次答对 ≥ 80% → 👑。拿到皇冠的游戏变成"复习"（每局 3 题，优先出该复习的内容），不会消失。
**家长控制**：家长页可以关闭"按顺序解锁"，或在游戏表格里勾选 👑，让孩子跳过已经会的游戏（Ethan 认读较好，Find the Letter、Big & Little 可以直接打勾）。

## 关于"等级"的使用建议

- 家长可以在家长页的游戏表格里手动设置等级。Ethan 认读较好：Find the Letter、Big & Little 可以从 L2 开始；Rhyme Time、First Letter 建议从 L1 开始。
- 系统会根据一次答对率自动升降级，学习报告里的"常错的内容"会自动多练。
