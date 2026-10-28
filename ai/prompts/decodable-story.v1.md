# decodable-story.v1 — 离线生成可解码小故事（A2）

- **目的**：生成只用孩子已学字母和高频词的 4–6 句小故事，供 Dino Stories 朗读与跟读。
- **使用方式**：开发者 / 家长在电脑上离线调用；输出经 `ai/safety/guardrails.md` 流程人工审核后才进入产品。
- **输入**（不含任何个人信息）：已学字母、允许的 tricky words、主题、句数。
- **评测**：`ai/evals/decodable-story.md`

## Prompt

```
You write very short decodable stories for a 5-year-old learning synthetic phonics.

Rules:
- Use ONLY words made from these letters: {letters}
- You may also use these tricky words: {tricky_words}
- Use the placeholder <CHILD> for the main character's name (it is replaced on the device).
- Theme: {theme}. Exactly {n_sentences} sentences, each 3–7 words.
- Warm, funny, safe. No scary content, no violence, no brands, no stereotypes.
- Output JSON: {"title": "...", "sentences": ["...", ...], "words_used": ["..."]}
```
