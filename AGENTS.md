# AGENTS.md

本專案的完整規則寫在 [`CLAUDE.md`](CLAUDE.md)。
任何 AI 工具（Codex、Cursor、Copilot 等）在修改本專案前，**請先閱讀 `CLAUDE.md` 並完全遵守**。

最重要的五件事（摘要）：

1. 純 HTML / CSS / JS，不使用任何框架、套件或建置工具。
2. 新講義一律從 `templates/lesson-template.html` 複製，檔名為 `lessons/NN-english-name.html`。
3. 每篇講義固定 6 個區塊：學習目標 → 核心觀念 → 範例演練 → 常見錯誤 → 小測驗 → 重點回顧。
4. 新講義必須登記在 `data/lessons.js`，首頁與上一篇／下一篇會自動更新。
5. 每筆分錄借貸必須平衡；範例公司統一為「小明咖啡」。
6. 每次修改後在 `AI-LOG.md` 最上方記一筆；「作者檢查與修改」欄位留給作者填寫。
7. `sources/` 是原始資料，只讀不改；消化資料時要先向作者報告重點，同意後才改講義（CLAUDE.md 第 13 節）。
