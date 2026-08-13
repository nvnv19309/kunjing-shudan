// === 困境书单 — 应用逻辑 ===

(function() {
  "use strict";

  // 当前状态
  var state = {
    currentTopic: null,
    answers: {}
  };

  // === 初始化 ===
  function init() {
    renderTopicGrid();
    bindInputEvents();
  }

  // === 渲染主题卡片 ===
  function renderTopicGrid() {
    var grid = document.getElementById("topic-grid");
    var html = "";
    TOPIC_LIST.forEach(function(topic) {
      html += '<div class="topic-card" data-topic="' + topic.key + '">' +
        '<span class="topic-icon">' + topic.icon + "</span>" +
        '<span class="topic-name">' + topic.title + "</span>" +
        "</div>";
    });
    grid.innerHTML = html;

    // 事件委托：在父容器上绑定点击
    grid.addEventListener("click", function(e) {
      var card = e.target.closest(".topic-card");
      if (card) {
        var key = card.getAttribute("data-topic");
        if (key) selectTopic(key);
      }
    });
  }

  // === 绑定输入搜索 ===
  function bindInputEvents() {
    var input = document.getElementById("user-input");
    var btn = document.getElementById("btn-search");

    btn.addEventListener("click", function() {
      handleSearch(input.value);
    });

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        handleSearch(input.value);
      }
    });
  }

  // === 处理搜索 ===
  function handleSearch(text) {
    text = text.trim();
    if (!text) return;

    // 关键词匹配
    var matchedTopic = matchTopic(text);
    if (matchedTopic) {
      selectTopic(matchedTopic);
    } else {
      // 未匹配到，显示提示
      showNoMatch();
    }
  }

  // === 关键词匹配主题 ===
  function matchTopic(text) {
    text = text.toLowerCase();
    var bestMatch = null;
    var bestScore = 0;

    Object.keys(BOOKS_DATA).forEach(function(key) {
      var topic = BOOKS_DATA[key];
      var score = 0;
      topic.keywords.forEach(function(kw) {
        if (text.indexOf(kw) !== -1) {
          score += 1;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = key;
      }
    });

    return bestScore > 0 ? bestMatch : null;
  }

  // === 未匹配提示 ===
  function showNoMatch() {
    var input = document.getElementById("user-input");
    input.placeholder = "没找到完全匹配的主题，试试直接选择下方主题～";
    input.value = "";

    // 高亮主题区域
    var grid = document.getElementById("topic-grid");
    grid.style.animation = "none";
    setTimeout(function() {
      grid.style.animation = "pulse 0.5s ease";
    }, 10);
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

    // 渲染补充问题
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
      html += '<div class="option-list">';
      q.options.forEach(function(opt, oi) {
        html += '<button type="button" class="option-item" data-q="' + qi + '" data-opt="' + oi + '">' + opt + "</button>";
      });
      html += "</div></div>";
    });
    list.innerHTML = html;

    // 事件委托：在父容器上绑定选项点击
    list.addEventListener("click", function(e) {
      var opt = e.target.closest(".option-item");
      if (!opt) return;
      var qi = opt.getAttribute("data-q");
      // 取消同组选中
      var sameGroup = list.querySelectorAll('.option-item[data-q="' + qi + '"]');
      for (var i = 0; i < sameGroup.length; i++) {
        sameGroup[i].classList.remove("selected");
      }
      opt.classList.add("selected");
      state.answers[qi] = opt.textContent;

      // 检查是否全部回答
      checkAllAnswered(topic.questions.length);
    });

    // 重置按钮状态
    document.getElementById("btn-to-result").disabled = true;
  }

  // === 检查是否全部回答 ===
  function checkAllAnswered(total) {
    var answered = Object.keys(state.answers).length;
    var btn = document.getElementById("btn-to-result");
    btn.disabled = answered < total;

    if (!btn.disabled) {
      btn.onclick = function() {
        showResult(state.currentTopic);
      };
    }
  }

  // === 展示书单结果 ===
  function showResult(key) {
    var topic = BOOKS_DATA[key];

    // 标题
    document.getElementById("result-title").textContent = "关于" + topic.title + "，推荐这些书";

    // 风险提示
    var warning = document.getElementById("warning-box");
    warning.style.display = topic.warning ? "block" : "none";

    // 渲染经典书
    renderBooks("classic-list", topic.classic);

    // 渲染热门书
    renderBooks("popular-list", topic.popular);

    switchStep("result");
  }

  // === 渲染书籍卡片 ===
  function renderBooks(containerId, books) {
    var container = document.getElementById(containerId);
    var html = "";
    books.forEach(function(book) {
      var diffClass = book.difficulty === "入门" ? "badge-easy" :
                      book.difficulty === "进阶" ? "badge-mid" : "badge-hard";
      html += '<div class="book-card">';
      html += '<div class="book-header">';
      html += '<div>';
      html += '<div class="book-title">' + book.title + "</div>";
      html += '<div class="book-author">' + book.author + " · " + book.year + "年</div>";
      html += "</div>";
      html += '<span class="badge ' + diffClass + '">' + book.difficulty + "</span>";
      html += "</div>";
      // 评分
      html += '<div class="book-ratings">';
      html += '<span class="rating-tag rating-douban">豆瓣 ' + (book.douban || "—") + "</span>";
      html += '<span class="rating-tag rating-goodreads">Goodreads ' + (book.goodreads || "—") + "</span>";
      html += "</div>";
      html += '<div class="book-desc">' + book.desc + "</div>";
      html += '<div class="book-reason">为什么推荐：' + book.reason + "</div>";
      // 微信读书链接
      var wereadUrl = "https://weread.qq.com/#search/" + encodeURIComponent(book.title);
      html += '<a class="weread-btn" href="' + wereadUrl + '" target="_blank" rel="noopener">在微信读书搜索</a>';
      html += "</div>";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // === 返回 ===
  window.goBack = function(target) {
    switchStep(target);
  };

  // === 启动 ===
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
