/*
 * 初會小教室 — 共用功能
 * 1. 產生頁首、頁尾
 * 2. 首頁：依 data/lessons.js 產生講義列表＋搜尋
 * 3. 講義頁：產生資訊列（單元／難度／時間）與上一篇/下一篇
 * 依賴：頁面需先載入 data/lessons.js；<body> 需有 data-root（與講義頁的 data-lesson）
 */
(function () {
  var SITE_NAME = "初會小教室";
  var lessons = window.LESSONS || [];
  var body = document.body;
  var root = body.dataset.root || ".";
  var currentSlug = body.dataset.lesson || null;

  function lessonUrl(slug) {
    return root + "/lessons/" + slug + ".html";
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function badgesHtml(lesson) {
    return (
      '<span class="badge level">' + escapeHtml(lesson.level) + "</span>" +
      '<span class="badge">約 ' + lesson.minutes + " 分鐘</span>" +
      lesson.tags.map(function (t) { return '<span class="badge">#' + escapeHtml(t) + "</span>"; }).join("")
    );
  }

  /* ---------- 頁首 / 頁尾 ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="inner">' +
      '<a class="brand" href="' + root + '/index.html"><span class="brand-mark">借</span>' + SITE_NAME + "</a>" +
      '<nav class="site-nav">' +
      '<a href="' + root + '/index.html#lessons">講義列表</a>' +
      '<a href="' + root + '/index.html#about">關於</a>' +
      "</nav></div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      "<p>" + SITE_NAME + "｜初級會計講義，由助教整理。目前共 " + lessons.length + " 篇。</p>" +
      "<p>內容僅供學習參考，考試與作業請以課本及授課老師規定為準。</p>";
  }

  /* ---------- 首頁：講義列表 ---------- */
  var list = document.getElementById("lesson-list");
  var search = document.getElementById("lesson-search");

  function renderList(keyword) {
    if (!list) return;
    var kw = (keyword || "").trim().toLowerCase();
    var filtered = lessons.filter(function (l) {
      if (!kw) return true;
      var hay = (l.title + " " + l.summary + " " + l.unit + " " + l.tags.join(" ")).toLowerCase();
      return hay.indexOf(kw) !== -1;
    });

    if (!filtered.length) {
      list.innerHTML = '<p class="empty">找不到符合「' + escapeHtml(keyword) + "」的講義。</p>";
      return;
    }

    // 依單元分組，保留 lessons.js 的順序
    var units = [];
    var groups = {};
    filtered.forEach(function (l) {
      if (!groups[l.unit]) { groups[l.unit] = []; units.push(l.unit); }
      groups[l.unit].push(l);
    });

    list.innerHTML = units.map(function (unit) {
      return (
        '<h2 class="unit-title">' + escapeHtml(unit) + "</h2>" +
        '<div class="lesson-grid">' +
        groups[unit].map(function (l) {
          return (
            '<a class="lesson-card" href="' + lessonUrl(l.slug) + '">' +
            '<span class="num">LESSON ' + escapeHtml(l.id) + "</span>" +
            "<h3>" + escapeHtml(l.title) + "</h3>" +
            "<p>" + escapeHtml(l.summary) + "</p>" +
            '<div class="badges">' + badgesHtml(l) + "</div>" +
            "</a>"
          );
        }).join("") +
        "</div>"
      );
    }).join("");
  }

  if (list) {
    renderList("");
    if (search) {
      search.addEventListener("input", function () { renderList(search.value); });
    }
  }

  /* ---------- 講義頁：資訊列與上一篇/下一篇 ---------- */
  if (currentSlug) {
    var index = -1;
    for (var i = 0; i < lessons.length; i++) {
      if (lessons[i].slug === currentSlug) { index = i; break; }
    }

    if (index === -1) {
      console.warn("[初會小教室] data/lessons.js 找不到 slug：" + currentSlug + "，請依 CLAUDE.md 第 8 節登記。");
      return;
    }

    var lesson = lessons[index];

    var crumb = document.getElementById("lesson-breadcrumb");
    if (crumb) {
      crumb.innerHTML =
        '<a href="' + root + '/index.html">首頁</a> ／ ' + escapeHtml(lesson.unit) + " ／ Lesson " + escapeHtml(lesson.id);
    }

    var meta = document.getElementById("lesson-meta");
    if (meta) meta.innerHTML = badgesHtml(lesson);

    var pager = document.getElementById("lesson-pager");
    if (pager) {
      var prev = lessons[index - 1];
      var next = lessons[index + 1];
      pager.className = "pager";
      pager.innerHTML =
        (prev
          ? '<a class="prev" href="' + lessonUrl(prev.slug) + '"><small>← 上一篇</small>' + escapeHtml(prev.title) + "</a>"
          : "<span></span>") +
        (next
          ? '<a class="next" href="' + lessonUrl(next.slug) + '"><small>下一篇 →</small>' + escapeHtml(next.title) + "</a>"
          : '<a class="next" href="' + root + '/index.html#lessons"><small>已經是最後一篇</small>回講義列表</a>');
    }
  }
})();
