# 游戏清单 Game Catalog

> 本文件由 `npm run docs` 从代码（`apps/web/js/games.js`、`guide.js`）自动生成，**始终与 App 一致**。共 26 个游戏。
> PRD 功能编号见 `product/prd/PRD-001-learning-land.md` §6；技能编号见 `scope-and-sequence.md`。

## 🔤 English
| 顺序 | 游戏 | 中文名 | id | 等级 | 技能 | PRD |
|---|---|---|---|---|---|---|
| 1 | 🔤 ABC Explorer | 字母探索（自由玩） | `abc-explore` | 自由玩 | E1 E2 E3 | F-01 |
| 2 | 🔍 Find the Letter | 听音找字母（大写→小写） | `letter-find` | L1：看到并听到大写字母，从 3 个里找<br>L2：只听，从 4 个里找（含易混字母）<br>L3：只听，找小写字母 | E1 E2 | F-02 |
| 3 | 🅰️ Big & Little | 大小写配对 | `case-match` | L1：大写找小写（3 个选项）<br>L2：4 个选项，含易混字母<br>L3：小写找大写 | E2 | F-03 |
| 4 | 📛 Spell My Name | 拼写自己的名字 | `my-name` | L1：有浅色提示<br>L2：有提示，多两个干扰字母<br>L3：没有提示 | E10 | F-08 |
| 5 | 🎵 Rhyme Time | 押韵（语音意识） | `rhyme` | L1：听两个词，判断押不押韵（👍 / 👎）<br>L2：从 3 张图里找押韵的（不显示文字）<br>L3：4 张图，显示单词（进阶） | E4 | F-05 |
| 6 | ✏️ Trace Letters | 描红写字母 | `trace` | L1：名字里的字母，按名字的写法（E 大写，t h a n 小写）<br>L2：小写字母（学校先教小写）<br>L3：大写字母 | E9 E10 | F-07 / F-34 |
| 7 | 👂 Letter Sounds | 字母音（自然拼读） | `letter-sounds` | L1：s a t p i n<br>L2：再加 m d g o c k<br>L3：全部 26 个字母 | E3 | F-20 |
| 8 | 🐶 First Letter | 首字母发音（自然拼读） | `first-letter` | L1：先读单词，再提示第一个音，3 个选项<br>L2：只读单词，4 个选项，含易混字母<br>L3：选小写字母 | E5 E3 | F-04 / F-21 |
| 9 | 📖 Sight Words（进阶） | 高频词认读（进阶） | `sight-words` | L1：最常用的 10 个词<br>L2：20 个词<br>L3：全部，选项更相似 | E8 | F-06 / F-24 |

## 🔢 Math
| 顺序 | 游戏 | 中文名 | id | 等级 | 技能 | PRD |
|---|---|---|---|---|---|---|
| 1 | 🔢 Number Explorer | 数字探索（自由玩） | `number-explore` | 自由玩 | M1 M2 | F-09 |
| 2 | 🍎 Count It! | 点数（1–20） | `count` | L1：1–5<br>L2：3–10<br>L3：10–20 | M1 | F-09 |
| 3 | 🔺 Shapes | 认识形状和颜色 | `shapes` | L1：4 种基本形状<br>L2：8 种形状<br>L3：颜色 + 形状一起（the red triangle） | M8 | F-09 |
| 4 | 🔟 Find the Number | 认识数字 0–20 | `number-find` | L1：1–10（看着找）<br>L2：0–20（只听）<br>L3：11–19，含 13/31 这类干扰 | M2 | F-09 |
| 5 | 👀 Quick Look | 一眼看出多少（速视） | `quick-look` | L1：1–3 个，骰子点型，显示 2 秒<br>L2：1–5 个，骰子或散点，显示 1.5 秒<br>L3：5–10 个，十格图（"5 和几"） | M3 | F-25 |
| 6 | ⚖️ More or Less | 比较多少 | `more-less` | L1：相差 3 个以上，只问"多"<br>L2：相差 2 个以上，问多或少<br>L3：只差 1 个 | M5 | F-09 |
| 7 | ✍️ Write Numbers | 描写数字 | `trace-numbers` | L1：1–5<br>L2：0–9<br>L3：10–20 | M11 M2 | F-29 |
| 8 | 🔴 Patterns | 找规律 | `patterns` | L1：AB（红蓝红蓝）<br>L2：AAB、ABB<br>L3：ABC、AABB | M9 | F-09 |
| 9 | ➡️ What's Next? | 数序：前一个/后一个 | `whats-next` | L1：1–10 的后一个数<br>L2：0–20 的后一个数<br>L3：加入"前一个数" | M4 | F-09 |
| 10 | ➕ Add & Take Away | 10以内加减法 | `add` | L1：和 ≤ 5<br>L2：和 ≤ 10<br>L3：加入"拿走"（减法） | M7 M6 | F-09 |

## 🎒 Kindy Ready
| 顺序 | 游戏 | 中文名 | id | 等级 | 技能 | PRD |
|---|---|---|---|---|---|---|
| 1 | 🏫 My School Day | 学校一天的顺序 | `school-day` | L1：3 个步骤排序<br>L2：4 个步骤<br>L3：5 个步骤 | W1 | F-61 |
| 2 | 🎒 School Smarts | 在学校怎么做 | `school-smarts` | L1：最常见的 7 个情境<br>L2：全部 14 个情境 | W1 W3 | F-61 |
| 3 | 😊 Feelings | 认识情绪与平静方法 | `feelings` | L1：认情绪脸<br>L2：故事里的人会有什么感受<br>L3：生气或难过时，什么方法能帮助平静 | W2 | F-61 |
| 4 | 🦖 Dino Says | 听指令与自控（Dino 说） | `dino-says` | L1：有图片提示（🦖💬 = Dino 说了，🤫 = 没说）<br>L2：只听声音<br>L3：只听声音，4 个选项，等待时间更短 | W2 W3 | F-61 |

## 🀄 中文
| 顺序 | 游戏 | 中文名 | id | 等级 | 技能 | PRD |
|---|---|---|---|---|---|---|
| 1 | 🀄 汉字探索 | 认汉字（自由玩） | `hanzi-explore` | 自由玩 | C1 | F-67 |
| 2 | 🔎 找汉字 | 听音找汉字 | `hanzi-find` | L1：象形字，有图片提示，3 个选项<br>L2：加入数字和上下大小，只听声音<br>L3：全部 40 个字，4 个选项 | C1 | F-67 |
| 3 | 🖼️ 字和图 | 看字选图（真正的认读） | `hanzi-match` | L1：象形字，3 张图<br>L2：加入数字和方向<br>L3：全部 40 个字，4 张图 | C2 | F-67 |
