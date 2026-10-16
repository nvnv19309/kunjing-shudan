// === 困境书单 — 应用逻辑 ===

(function() {
  "use strict";

  // 输入框原始提示语（未命中时会被换掉，返回时要还原）
  var PLACEHOLDER_DEFAULT = "例如：总是拖延，明知道有 deadline 还是刷手机……";

  // 当前状态
  var state = {
    currentTopic: null,
    answers: {}       // { 题号字符串: { index: 选项下标, text: 选项文字 } }
  };

  // === 本地使用日志 ===
  // 为什么只存本地：硬约束 1 是纯前端、无后端、无账号。所以埋点不上传任何服务器，
  // 数据留在用户自己的浏览器里，页脚可以导出 / 清除——这也顺便成了一个隐私卖点。
  // 日志的用途：看哪些主题被点得多、哪些输入没命中，用真实数据决定下一轮补哪个主题的词。
  var LOG_KEY = "kunjing_log";
  var LOG_MAX = 500;   // 只留最近 500 条，避免无限膨胀

  function readLog() {
    try {
      var arr = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];   // 隐私模式 / 配额满 / file:// 受限：日志是辅助功能，静默放弃
    }
  }

  function writeLog(arr) {
    try {
      if (arr.length > LOG_MAX) arr = arr.slice(arr.length - LOG_MAX);
      localStorage.setItem(LOG_KEY, JSON.stringify(arr));
    } catch (e) { /* 同上 */ }
    refreshLogCount();
  }

  function logEvent(evt) {
    evt.t = new Date().toISOString();
    var arr = readLog();
    arr.push(evt);
    writeLog(arr);
  }

  function exportLog() {
    var blob = new Blob([JSON.stringify(readLog(), null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "kunjing-log-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function clearLog() {
    try { localStorage.removeItem(LOG_KEY); } catch (e) { /* 同上 */ }
    refreshLogCount();
  }

  function refreshLogCount() {
    var counter = document.getElementById("log-count");
    if (counter) counter.textContent = String(readLog().length);
  }

  function bindLogPanel() {
    var toggle = document.getElementById("log-toggle");
    var panel = document.getElementById("log-panel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      var open = panel.style.display === "inline-block";
      panel.style.display = open ? "none" : "inline-block";
      toggle.setAttribute("aria-expanded", String(!open));
      if (!open) refreshLogCount();
    });
    document.getElementById("log-export").addEventListener("click", exportLog);
    document.getElementById("log-clear").addEventListener("click", clearLog);
    refreshLogCount();
  }

  // === 初始化 ===
  // 所有事件监听都在这里绑一次。教训：以前把监听写在 renderQuestions() 里，
  // 而容器 #question-list 是常驻元素（只换 innerHTML 不换元素），
  // 结果每换一个主题就多挂一个 click 监听器（实测 1→2→3→4→5）。
  function init() {
    renderTopicGrid();
    bindInputEvents();
    bindGridEvents();
    bindQuestionEvents();
    bindHintEvents();
    bindLogPanel();
    document.querySelector("[data-home-link]").addEventListener("click", function(e) {
      e.preventDefault();
      window.goBack("input");
      document.getElementById("topics").scrollIntoView();
    });
  }

  // === 渲染主题卡片 ===
  function renderTopicGrid() {
    var grid = document.getElementById("topic-grid");
    var html = "";
    TOPIC_GROUPS.forEach(function(group) {
      html += '<section class="topic-group" aria-labelledby="group-' + group.key + '">' +
        '<div class="group-heading"><span>' + group.label + '</span><h3 id="group-' + group.key + '">' + group.title +
        '</h3><p>' + group.desc + '</p></div><div class="topic-cards">';
      TOPIC_LIST.filter(function(topic) { return BOOKS_DATA[topic.key].group === group.key; }).forEach(function(topic) {
        html += '<button type="button" class="topic-card" data-topic="' + topic.key + '">' +
          '<span class="topic-icon" aria-hidden="true">' + topic.icon + '</span><span>' +
          '<span class="topic-name">' + escapeHtml(topic.title) + '</span>' +
          '<span class="topic-description">' + escapeHtml(BOOKS_DATA[topic.key].short) + '</span></span>' +
          '<span class="topic-arrow" aria-hidden="true">↗</span></button>';
      });
      html += "</div></section>";
    });
    grid.innerHTML = html;
  }

  // === 主题卡片点击（事件委托，只绑一次）===
  function bindGridEvents() {
    document.getElementById("topic-grid").addEventListener("click", function(e) {
      var card = e.target.closest(".topic-card");
      if (!card) return;
      var key = card.getAttribute("data-topic");
      if (key) {
        clearHint();
        logEvent({ type: "card", topic: key });
        selectTopic(key);
      }
    });
  }

  // === 绑定输入搜索 ===
  function bindInputEvents() {
    var input = document.getElementById("user-input");
    document.getElementById("search-form").addEventListener("submit", function(e) {
      e.preventDefault();
      handleSearch(input.value);
    });

    // 重新开始输入时收起候选提示，把 placeholder 还原
    input.addEventListener("input", function() {
      if (input.value) clearHint();
    });
  }

  // === 处理搜索 ===
  function handleSearch(text) {
    text = (text || "").trim();
    if (!text) return;

    var matchedTopic = matchTopic(text);
    logEvent({
      type: "search",
      q: text,
      topic: matchedTopic || null,
      nomatch: !matchedTopic
    });

    if (matchedTopic) {
      clearHint();
      selectTopic(matchedTopic);
    } else {
      showNoMatch(text);
    }
  }

  // === 给所有主题打分并排序 ===
  // 与 AGENTS.md §6.1 一一对应：
  //   ① 大小写归一 + 去重（数据里 ASCII 关键词可能大小写混写，如 BPD / bpd）
  //   ② 去冗余：同主题内，被本主题另一个更长命中词包含的词不重复计分
  //      （否则「晚上睡不着」会同时命中「睡不着」和「睡」，白得 1 分）
  //   ③ 排序：命中数多者胜 → 命中的最长关键词更长者胜（说法越具体越优先）
  //      → 仍相同则按 BOOKS_DATA 的键顺序（先出现的主题胜，保证结果可复现）
  function scoreTopics(text) {
    var lower = text.toLowerCase();

    var scored = Object.keys(BOOKS_DATA).map(function(key, order) {
      var seen = [];
      BOOKS_DATA[key].keywords.forEach(function(kw) {
        var k = kw.toLowerCase();
        if (lower.indexOf(k) !== -1 && seen.indexOf(k) === -1) {
          seen.push(k);
        }
      });

      var kept = seen.filter(function(w) {
        return !seen.some(function(other) {
          return other !== w && other.length > w.length && other.indexOf(w) !== -1;
        });
      });

      var longest = 0;
      kept.forEach(function(w) {
        if (w.length > longest) longest = w.length;
      });

      return { key: key, order: order, score: kept.length, longest: longest, hits: kept };
    });

    scored.sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      if (b.longest !== a.longest) return b.longest - a.longest;
      return a.order - b.order;
    });

    return scored;
  }

  // === 取最高分主题（分值为 0 视为未命中）===
  function matchTopic(text) {
    var top = scoreTopics(text)[0];
    return top && top.score > 0 ? top.key : null;
  }

  // === 未命中：给出最接近的候选，而不是只丢一句"没找到" ===
  // 注意：能走到这里，说明所有主题的关键词得分都是 0（有一个 >0 就已经命中了），
  // 所以不能拿关键词得分当候选排序依据 —— 那必然是空列表。
  // 这里用「二元组重合度」算相似度：它只用来**猜**，用户点了才跳转，
  // 不存在"静默给错结果"的风险。
  function bigrams(s) {
    var out = [];
    for (var i = 0; i < s.length - 1; i++) {
      out.push(s.substr(i, 2));
    }
    return out;
  }

  function similarTopics(text, limit) {
    var queryBi = bigrams(text.toLowerCase());
    if (!queryBi.length) return [];

    return Object.keys(BOOKS_DATA).map(function(key) {
      var pool = BOOKS_DATA[key].title + BOOKS_DATA[key].keywords.join("");
      var poolSet = {};
      bigrams(pool.toLowerCase()).forEach(function(b) {
        poolSet[b] = 1;
      });
      var hit = 0;
      queryBi.forEach(function(b) {
        if (poolSet[b]) hit++;
      });
      return { key: key, score: hit / queryBi.length };
    }).filter(function(t) {
      return t.score > 0;
    }).sort(function(a, b) {
      return b.score - a.score;
    }).slice(0, limit);
  }

  function showNoMatch(text) {
    var input = document.getElementById("user-input");
    input.value = "";
    input.placeholder = "没找到完全匹配的主题，试试换种说法，或直接选下面👇";

    var candidates = similarTopics(text, 3);

    var hint = document.getElementById("match-hint");
    var html;
    if (candidates.length) {
      html = '<span class="hint-label">没有完全对上。你说的更接近这几个？点一下直接看</span>';
      candidates.forEach(function(t) {
        html += '<button type="button" class="hint-chip" data-topic="' + t.key + '">' +
          BOOKS_DATA[t.key].icon + " " + BOOKS_DATA[t.key].title + "</button>";
      });
    } else {
      html = '<span class="hint-label">没听出是哪一类困境，直接选一个吧 👇</span>';
    }
    hint.innerHTML = html;
    hint.style.display = "block";

    // 记下这次没命中 + 最接近的 3 个：这是"该补哪个主题的词"最直接的数据来源
    logEvent({ type: "nomatch", q: text, top: candidates.map(function(t) { return t.key; }) });

    // 高亮主题区域
    var grid = document.getElementById("topic-grid");
    grid.style.animation = "none";
    setTimeout(function() {
      grid.style.animation = "pulse 0.5s ease";
    }, 10);
  }

  // === 候选按钮点击（只绑一次）===
  function bindHintEvents() {
    document.getElementById("match-hint").addEventListener("click", function(e) {
      var chip = e.target.closest(".hint-chip");
      if (!chip) return;
      var key = chip.getAttribute("data-topic");
      // 候选被点中 = 没命中的输入其实属于这个主题 —— 补词最可靠的信号
      logEvent({ type: "chip", topic: key });
      clearHint();
      selectTopic(key);
    });
  }

  // === 收起候选提示并还原 placeholder ===
  function clearHint() {
    var hint = document.getElementById("match-hint");
    if (hint) {
      hint.innerHTML = "";
      hint.style.display = "none";
    }
    var input = document.getElementById("user-input");
    if (input) input.placeholder = PLACEHOLDER_DEFAULT;
  }

  // === 选择主题 → 进入补充问题 ===
  function selectTopic(key) {
    state.currentTopic = key;
    state.answers = {};

    var topic = BOOKS_DATA[key];

    // 如果没有补充问题，直接展示结果
    if (!topic.questions || topic.questions.length === 0) {
      showResult(key);
      return;
    }

    renderQuestions(topic);
    switchStep("question");
  }

  // === 渲染补充问题 ===
  function renderQuestions(topic) {
    document.getElementById("question-title").textContent = topic.title + " · 补充一下";

    var list = document.getElementById("question-list");
    var html = "";
    topic.questions.forEach(function(q, qi) {
      html += '<div class="question-item">';
      html += '<div class="question-text">' + q.text + "</div>";
      html += '<div class="option-list" role="group" aria-label="' + escapeHtml(q.text) + '">';
      q.options.forEach(function(opt, oi) {
        html += '<button type="button" class="option-item" aria-pressed="false" data-q="' + qi + '" data-opt="' + oi + '">' + escapeHtml(opt) + "</button>";
      });
      html += "</div></div>";
    });
    list.innerHTML = html;

    // 重置按钮状态
    var btn = document.getElementById("btn-to-result");
    btn.disabled = true;
    btn.onclick = null;
  }

  // === 选项点击（事件委托，只绑一次）===
  function bindQuestionEvents() {
    document.getElementById("question-list").addEventListener("click", function(e) {
      var opt = e.target.closest(".option-item");
      if (!opt) return;

      var qi = opt.getAttribute("data-q");
      var oi = parseInt(opt.getAttribute("data-opt"), 10);

      // 取消同组选中
      var sameGroup = this.querySelectorAll('.option-item[data-q="' + qi + '"]');
      for (var i = 0; i < sameGroup.length; i++) {
        sameGroup[i].classList.remove("selected");
        sameGroup[i].setAttribute("aria-pressed", "false");
      }
      opt.classList.add("selected");
      opt.setAttribute("aria-pressed", "true");

      // 记下标与文字：下标用于查 optionHints / escalateFrom，文字用于结果页回显
      state.answers[qi] = { index: oi, text: opt.textContent };

      // 全部答完才解锁
      var total = (BOOKS_DATA[state.currentTopic].questions || []).length;
      var btn = document.getElementById("btn-to-result");
      btn.disabled = Object.keys(state.answers).length < total;
      if (!btn.disabled) {
        btn.onclick = function() {
          showResult(state.currentTopic);
        };
      }
    });
  }

  // === 展示书单结果 ===
  function showResult(key) {
    var topic = BOOKS_DATA[key];
    var questions = topic.questions || [];

    document.getElementById("result-title").textContent = "关于" + topic.title + "，推荐这些书";
    document.getElementById("result-intro").textContent = topic.intro;
    document.getElementById("reading-guide").innerHTML = '<strong>可以这样开始读</strong><p>' +
      escapeHtml(topic.readingTip) + '</p><p class="guide-boundary">' + escapeHtml(topic.boundary) + '</p>';

    // --- ① 回显用户的选择，让补充问题不再是单向输入 ---
    renderAnswerEcho(questions);

    // --- ② 按答案决定两个书区的先后 ---
    // optionHints 在数据里显式写死（'classic' / 'popular' / null），
    // 不在 JS 里猜语义——猜语义等于再叠一层脆弱的关键词匹配。
    var hint = null;
    var firstAnswer = state.answers["0"];
    if (firstAnswer && questions[0] && questions[0].optionHints) {
      hint = questions[0].optionHints[firstAnswer.index] || null;
    }
    orderSections(hint);

    // --- ③ 风险提示（含按答案升级）---
    renderWarning(topic, questions);

    // 渲染书单
    renderBooks("classic-list", topic.classic);
    renderBooks("popular-list", topic.popular);

    logEvent({ type: "result", topic: key, answers: state.answers });

    switchStep("result");
  }

  // 把用户的选择读出来放在结果页顶部
  function renderAnswerEcho(questions) {
    var echo = document.getElementById("answer-echo");
    if (!questions.length) {
      echo.style.display = "none";
      return;
    }
    var html = "";
    questions.forEach(function(q, qi) {
      var answer = state.answers[String(qi)];
      html += '<span class="echo-item">' + escapeHtml(q.text.replace(/[？?]\s*$/, "")) + "：" +
        "<strong>" + escapeHtml(answer ? answer.text : "未选择") + "</strong></span>";
    });
    echo.innerHTML = html;
    echo.style.display = "block";
  }

  // 两个书区的先后：hint 为 "popular" 时把「近年热门」提到前面
  function orderSections(hint) {
    var secClassic = document.getElementById("section-classic");
    var secPopular = document.getElementById("section-popular");
    if (hint === "popular") {
      secClassic.parentNode.insertBefore(secPopular, secClassic);
    } else {
      secClassic.parentNode.insertBefore(secClassic, secPopular);
    }
  }

  // 风险提示：主题本身要提示就显示；用户答案命中 escalateFrom 时再加一段更强的引导
  function renderWarning(topic, questions) {
    var box = document.getElementById("warning-box");
    var extra = document.getElementById("warning-extra");

    box.style.display = topic.warning ? "block" : "none";

    var escalated = false;
    questions.forEach(function(q, qi) {
      var answer = state.answers[String(qi)];
      if (answer && typeof q.escalateFrom === "number" && answer.index >= q.escalateFrom) {
        escalated = true;
      }
    });
    extra.style.display = escalated ? "block" : "none";
  }

  // === 渲染书籍卡片 ===
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderBooks(containerId, books) {
    var container = document.getElementById(containerId);
    var html = "";
    books.forEach(function(book) {
      var diffClass = book.difficulty === "入门" ? "badge-easy" :
                      book.difficulty === "进阶" ? "badge-mid" : "badge-hard";
      html += '<article class="book-card">';
      html += '<div class="book-header">';
      html += '<div>';
      html += '<span class="book-format">' + escapeHtml(book.format) + '</span>';
      html += '<h4 class="book-title">' + escapeHtml(book.title) + '</h4>';
      html += '<div class="book-author">' + escapeHtml(book.author) + '</div>';
      html += "</div>";
      html += '<span class="badge ' + diffClass + '">' + book.difficulty + "</span>";
      html += "</div>";
      html += '<p class="book-desc">' + escapeHtml(book.desc) + '</p>';
      html += '<div class="book-reason"><strong>为什么推荐</strong>' + escapeHtml(book.reason) + '</div>';
      html += '<div class="book-caveat"><strong>阅读时留意</strong>' + escapeHtml(book.caveat) + '</div>';
      html += '<details class="book-meta"><summary>书目、评分与来源</summary>';
      html += '<p>' + escapeHtml(book.edition || "具体版本与出版年份待复核，请以所读版本版权页为准。") + '</p>';
      if (book.source) {
        html += '<p><a class="source-link" href="' + escapeHtml(book.source.url) + '" target="_blank" rel="noopener">' + escapeHtml(book.source.label) + ' ↗</a><br>' +
          escapeHtml(book.source.scope) + ' · 核对于 ' + escapeHtml(book.source.checkedAt) + '</p>';
      } else {
        html += '<p>书目版本来源待逐项复核；下方链接用于检索，不代表已核实。</p>';
      }
      // 旧分数保留在数据中供复核；只有具备条目链接与日期的分数才展示。
      html += '<p class="book-ratings">';
      [["douban", "豆瓣"], ["goodreads", "Goodreads"]].forEach(function(platform) {
        var proof = (book.ratingSources || {})[platform[0]];
        var value = book[platform[0]];
        if (proof && proof.url && proof.checkedAt && value && value !== "—") {
          html += '<a class="rating-tag rating-' + platform[0] + '" href="' + escapeHtml(proof.url) + '" target="_blank" rel="noopener">' +
            platform[1] + ' ' + escapeHtml(value) + '</a><span>（' + escapeHtml(proof.checkedAt) + '）</span> ';
        } else {
          html += '<span class="rating-tag rating-' + platform[0] + '">' + platform[1] + ' 待核实</span>';
        }
      });
      html += '</p><a class="source-link" href="https://search.douban.com/book/subject_search?search_text=' + encodeURIComponent(book.title + ' ' + book.author) + '" target="_blank" rel="noopener">豆瓣检索 ↗</a>';
      html += '<a class="source-link" href="https://www.goodreads.com/search?q=' + encodeURIComponent(book.title + ' ' + book.author) + '" target="_blank" rel="noopener">Goodreads 检索 ↗</a></details>';
      // 微信读书链接
      var wereadUrl = "https://weread.qq.com/#search/" + encodeURIComponent(book.title);
      html += '<div class="book-links"><a class="weread-btn" href="' + wereadUrl + '" target="_blank" rel="noopener">在微信读书搜索 ↗</a><span>可读版本以平台为准</span></div>';
      html += '</article>';
    });
    container.innerHTML = html;
  }

  // === 步骤切换 ===
  function switchStep(name) {
    var steps = document.querySelectorAll(".step");
    steps.forEach(function(s) {
      s.classList.remove("active");
    });
    document.getElementById("step-" + name).classList.add("active");
    var heading = name === "question" ? "question-title" : name === "result" ? "result-title" : "user-input";
    document.getElementById(heading).focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  // === 返回：顺带把状态清干净（原来返回后 answers 还留着上一次的选择）===
  window.goBack = function(target) {
    if (target === "input") {
      state.currentTopic = null;
      state.answers = {};
      var btn = document.getElementById("btn-to-result");
      if (btn) {
        btn.disabled = true;
        btn.onclick = null;
      }
      var echo = document.getElementById("answer-echo");
      if (echo) echo.style.display = "none";
      clearHint();
    }
    switchStep(target);
  };

  // === 启动 ===
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
