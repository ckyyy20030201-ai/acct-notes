/*
 * 講義目錄（登記簿）
 * - 首頁列表、上一篇/下一篇、講義頁資訊列都由這裡產生
 * - 陣列順序 = 教學順序；新講義加在最後面
 * - 欄位說明請見 CLAUDE.md 第 4.2 節
 */
window.LESSONS = [
  {
    id: "01",
    slug: "01-accounting-equation",
    title: "會計恆等式",
    unit: "第一單元：會計基礎",
    level: "入門",
    minutes: 8,
    summary: "資產＝負債＋權益：所有交易都逃不出這條式子。",
    tags: ["資產", "負債", "權益", "交易分析"]
  },
  {
    id: "02",
    slug: "02-debit-credit",
    title: "借貸法則與分錄",
    unit: "第一單元：會計基礎",
    level: "入門",
    minutes: 10,
    summary: "借方、貸方不是增加減少，一次搞懂記帳的規則。",
    tags: ["借方", "貸方", "分錄", "T字帳"]
  },
  {
    id: "03",
    slug: "03-trial-balance",
    title: "試算表",
    unit: "第一單元：會計基礎",
    level: "入門",
    minutes: 8,
    summary: "把所有帳戶餘額列成一張表，檢查借貸是否相等。",
    tags: ["試算表", "分類帳", "過帳", "記帳錯誤"]
  },
  {
    id: "04",
    slug: "04-adjusting-entries",
    title: "期末調整分錄",
    unit: "第一單元：會計基礎",
    level: "基礎",
    minutes: 14,
    summary: "應計基礎下，月底用品、折舊、利息的調整一次搞懂。",
    tags: ["調整分錄", "應計基礎", "遞延", "應計"]
  },
  {
    id: "05",
    slug: "05-inventory-fifo",
    title: "存貨成本：先進先出法",
    unit: "第二單元：資產",
    level: "基礎",
    minutes: 10,
    summary: "先買進的先賣出：算出銷貨成本與期末存貨。",
    tags: ["存貨", "FIFO", "銷貨成本", "永續盤存制"]
  }
];
