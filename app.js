// 困境书单：输入优先、可选阅读偏好与共享书籍目录。
(function() {
  "use strict";
  var state = { currentTopic: null, preference: "all", catalogTopic: "all", catalogAudience: "general", referenceAudience: "general", catalogReturn: "input", failedQuery: "", origin: "input", searchQuery: "", automaticTopic: null, searchTopics: [], retainedWarning: false, bookIndex: 0 };
  var carouselMedia;
  var guideReturn = null;
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


  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function link(url, label, cls) {
    return '<a class="' + (cls || 'source-link') + '" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + ' ↗</a>';
  }
  function switchStep(name, restore) {
    document.querySelectorAll('.step').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById('step-' + name).classList.add('active');
    if (name === 'result') moveBook(state.bookIndex, false);
    if (restore) {
      if (restore.trigger.isConnected) restore.trigger.focus({ preventScroll: true });
      window.scrollTo({ top: restore.scrollTop, behavior: 'instant' });
      return;
    }
    var focus = name === 'input' ? 'user-input' : name === 'catalog' ? 'catalog-title' : name === 'book-guide' ? 'guide-title' : 'result-title';
    document.getElementById(focus).focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  window.goBack = function(name) { switchStep(name); };
  function handleSearch(text) {
    text = (text || '').trim();
    if (!text) {
      document.getElementById('search-status').textContent = '可以先写一句困扰，也可以选择下方的“先逛书单”。';
      document.getElementById('user-input').focus();
      return;
    }
    document.getElementById('search-status').textContent = '';
    var key = matchTopic(text);
    state.searchQuery = text; state.automaticTopic = key;
    state.searchTopics = scoreTopics(text).filter(function(t) { return t.score > 0; });
    state.retainedWarning = false;
    logEvent({ type: 'search', q: text, topic: key, nomatch: !key });
    if (key) showResult(key, 'input');
    else openCatalog(text);
  }
  function renderFilters() {
    var options = '';
    TOPIC_GROUPS.forEach(function(group) {
      options += '<optgroup label="' + escapeHtml(group.title) + '">';
      TOPIC_LIST.filter(function(t) { return BOOKS_DATA[t.key].group === group.key; }).forEach(function(t) {
        options += '<option value="' + t.key + '">' + escapeHtml(t.title) + '</option>';
      });
      options += '</optgroup>';
    });
    document.getElementById('catalog-topic-select').innerHTML = '<option value="all">全部书籍</option>' + options;
    document.getElementById('topic-select').innerHTML = options;
  }
  function openCatalog(failedQuery) {
    state.catalogTopic = 'all';
    state.catalogAudience = 'general'; state.catalogReturn = 'input';
    state.failedQuery = failedQuery || '';
    var notice = document.getElementById('catalog-notice');
    var hint = document.getElementById('match-hint');
    hint.innerHTML = '';
    notice.hidden = !failedQuery;
    if (failedQuery) {
      document.getElementById('failed-query').textContent = failedQuery;
      var candidates = similarTopics(failedQuery, 3);
      candidates.forEach(function(t) {
        var button = document.createElement('button');
        button.type = 'button'; button.className = 'hint-chip';
        button.dataset.topic = t.key; button.textContent = BOOKS_DATA[t.key].title;
        hint.appendChild(button);
      });
      logEvent({ type: 'nomatch', q: failedQuery, top: candidates.map(function(t) { return t.key; }) });
    }
    renderCatalog();
    switchStep('catalog');
    logEvent({ type: 'catalog', reason: failedQuery ? 'nomatch' : 'browse' });
  }
  function renderCatalog() {
    var key = state.catalogTopic;
    var professional = state.catalogAudience === 'professional';
    document.getElementById('catalog-notice').hidden = professional || !state.failedQuery;
    var references = PROFESSIONAL_READING.reduce(function(ids, group) { return ids.concat(group.bookIds); }, []);
    var ids = professional ? references : Object.keys(BOOK_CATALOG).filter(function(id) {
      var b = BOOK_CATALOG[id];
      return b.audience === state.catalogAudience && (professional || key === 'all' || b.topics.indexOf(key) !== -1);
    });
    document.querySelectorAll('[data-audience]').forEach(function(b) { b.setAttribute('aria-pressed', String(b.dataset.audience === state.catalogAudience)); });
    document.getElementById('catalog-filters').hidden = professional;
    document.getElementById('professional-intro').hidden = !professional;
    document.getElementById('catalog-back').textContent = state.catalogReturn === 'result' ? '← 返回刚才的推荐' : '← 回到困境输入';
    document.getElementById('catalog-topic-select').value = key;
    document.getElementById('catalog-count').textContent = ids.length + ' 本书' + (professional ? ' · 专业参考' : key === 'all' ? ' · 日常阅读 · 同书去重' : ' · ' + BOOKS_DATA[key].title);
    var warning = document.getElementById('catalog-warning');
    warning.hidden = !(professional || key !== 'all' && BOOKS_DATA[key].warning);
    var refs = ids.map(function(id) { return { bookId: id }; });
    if (professional) PROFESSIONAL_READING.forEach(function(group) {
      refs.find(function(r) { return r.bookId === group.bookIds[0]; }).groupTitle = group.title;
    });
    renderClinicalNotice('catalog-clinical', refs);
    renderBooks('catalog-list', refs, professional || key === 'all' ? null : key);
  }
  function renderClinicalNotice(containerId, references) {
    var notice = document.getElementById(containerId);
    notice.hidden = !references.some(function(r) { return BOOK_CATALOG[r.bookId].clinicalContext; });
    if (!notice.hidden) notice.innerHTML = '<strong>阅读中的共鸣，不等于诊断。</strong><p>人格障碍等诊断需要由具备相应诊断资质的专业人员综合评估，请不要凭书中描述、关键词或自测给自己或他人下结论。诊断也不能定义一个人的全部。</p>';
  }
  function showResult(key, origin, keepContext) {
    if (!keepContext) {
      state.preference = 'all'; state.origin = origin || 'catalog';
      document.getElementById('reading-preference-details').open = false;
      document.getElementById('reading-guide').open = false;
      if (state.origin !== 'input') {
        state.searchQuery = state.failedQuery; state.automaticTopic = null; state.searchTopics = [];
        state.retainedWarning = false;
      }
    }
    state.currentTopic = key;
    state.catalogReturn = 'input';
    var topic = BOOKS_DATA[key];
    document.getElementById('result-title').textContent = topic.title;
    document.getElementById('result-intro').textContent = topic.intro;
    document.getElementById('query-echo').textContent = state.searchQuery ? '你写下的困扰：' + state.searchQuery : '你选择的主题：' + topic.title;
    document.getElementById('reading-guide-body').innerHTML = '<strong>可以这样开始读</strong><p>' + escapeHtml(topic.readingTip) + '</p><p class="guide-boundary">' + escapeHtml(topic.boundary) + '</p>';
    state.retainedWarning = state.retainedWarning || !!topic.warning;
    document.getElementById('warning-box').hidden = !state.retainedWarning;
    document.getElementById('topic-select').value = key;
    var alternatives = state.searchTopics.filter(function(t) { return t.key !== key; }).slice(0, 3);
    document.getElementById('related-directions').hidden = !alternatives.length;
    document.getElementById('related-topic-buttons').innerHTML = alternatives.map(function(t) {
      return '<button type="button" class="hint-chip" data-result-topic="' + t.key + '">' + escapeHtml(BOOKS_DATA[t.key].title) + '</button>';
    }).join('');
    document.getElementById('direction-status').textContent = '';
    var professionalCount = PROFESSIONAL_READING.reduce(function(ids, group) { return ids.concat(group.bookIds); }, []).filter(function(id) { return BOOK_CATALOG[id].topics.indexOf(key) !== -1; }).length;
    var professionalLink = document.getElementById('result-professional-link');
    professionalLink.hidden = !professionalCount;
    professionalLink.textContent = '查看专业书架 →';
    renderResultBooks();
    logEvent({ type: 'result', topic: key, preference: state.preference });
    if (!keepContext) switchStep('result');
  }
  function changeResultTopic(key) {
    if (!BOOKS_DATA[key] || key === state.currentTopic) return;
    var previous = state.currentTopic;
    showResult(key, state.origin, true);
    document.getElementById('direction-status').textContent = '已切换到“' + BOOKS_DATA[key].title + '”，保留你的输入与阅读偏好。';
    logEvent({ type: 'topic_change', automaticTopic: state.automaticTopic, from: previous, topic: key });
  }
  function renderResultBooks() {
    var topic = BOOKS_DATA[state.currentTopic];
    var books = topic.classic.concat(topic.popular).filter(function(b) { return BOOK_CATALOG[b.bookId].audience === 'general'; }).map(function(b, order) { return { bookId: b.bookId, reason: b.reason, order: order }; });
    // Explicit editorial tags prioritize individual books; the topic matcher stays unchanged.
    if (state.preference !== 'all') books.sort(function(a, b) {
      return Number(BOOK_CATALOG[b.bookId].goals.indexOf(state.preference) !== -1) - Number(BOOK_CATALOG[a.bookId].goals.indexOf(state.preference) !== -1) || a.order - b.order;
    });
    document.querySelectorAll('[data-preference]').forEach(function(b) { b.setAttribute('aria-pressed', String(b.dataset.preference === state.preference)); });
    var matches = books.filter(function(b) { return BOOK_CATALOG[b.bookId].goals.indexOf(state.preference) !== -1; }).length;
    document.getElementById('preference-status').textContent = state.preference === 'all' ? '' : matches ? '已将符合阅读偏好的 ' + matches + ' 本书排在前面，其他推荐仍然保留。' : '这个主题暂没有符合该偏好的书，保留全部推荐。';
    document.getElementById('preference-status').hidden = state.preference === 'all';
    var selected = document.querySelector('[data-preference="' + state.preference + '"]');
    document.getElementById('preference-title').textContent = '调整读法' + (state.preference === 'all' ? '' : ' · ' + selected.textContent);
    renderClinicalNotice('result-clinical', books);
    renderBooks('result-list', books, state.currentTopic);
    state.bookIndex = 0;
    moveBook(0, false);
  }
  function updateBookNavigation() {
    var list = document.getElementById('result-list');
    var count = list.querySelectorAll('.book-card').length;
    var mobile = carouselMedia && carouselMedia.matches;
    document.getElementById('book-navigation').hidden = !mobile || !count;
    if (mobile) list.setAttribute('tabindex', '0');
    else list.removeAttribute('tabindex');
    document.getElementById('book-previous').disabled = state.bookIndex === 0;
    document.getElementById('book-next').disabled = state.bookIndex >= count - 1;
    document.getElementById('book-position').textContent = '第 ' + (state.bookIndex + 1) + ' / ' + count + ' 本';
  }
  function moveBook(index, animate) {
    var list = document.getElementById('result-list');
    var cards = list.querySelectorAll('.book-card');
    if (!cards.length) return;
    index = Math.max(0, Math.min(cards.length - 1, index));
    if (!animate) state.bookIndex = index;
    updateBookNavigation();
    if (!carouselMedia || !carouselMedia.matches) return;
    list.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
  }
  function ratingHtml(platform, rating) {
    var label = platform === 'douban' ? '豆瓣' : 'Goodreads';
    var scale = platform === 'douban' ? '10' : '5';
    var content;
    if (rating.status === 'verified') {
      content = link(rating.url, label + ' ' + rating.value + ' / ' + scale, 'rating-value');
      content += '<span class="rating-note">' + rating.count.toLocaleString('zh-CN') + ' 人评价</span>';
    } else {
      var status = rating.status === 'unavailable' ? '暂无评分' : rating.status === 'not_found' ? '未找到对应条目' : '尚未核实';
      content = '<span class="rating-value">' + label + ' · ' + status + '</span>';
      if (rating.url) content += link(rating.url, '查看平台条目');
    }
    return '<div class="rating-block rating-' + platform + '">' + content + '</div>';
  }
  function getBookGuide(bookId) {
    var guide = typeof BOOK_GUIDES !== 'undefined' && BOOK_GUIDES[bookId];
    return guide && BOOK_CATALOG[bookId] && guide.edition.isbn === BOOK_CATALOG[bookId].edition.isbn && Array.isArray(guide.toc) ? guide : null;
  }
  function guideEntries(nodes) {
    return nodes.map(function(node) {
      var title = '<span data-toc-id="' + escapeHtml(node.id) + '">' + escapeHtml(node.title) + '</span>';
      if (node.kind === 'part') return '<section class="guide-part"><h3>' + title + '</h3>' + guideEntries(node.children) + '</section>';
      if (node.kind === 'chapter') return '<details class="guide-chapter"><summary>' + title + '</summary><div class="chapter-body"><p class="chapter-summary"><strong>本章主旨</strong>' + escapeHtml(node.summary) + '</p><h4>本章小节</h4><ul class="guide-sections">' + guideEntries(node.children) + '</ul></div></details>';
      if (node.kind === 'section') return '<li>' + title + '</li>';
      return '<p class="guide-reference">' + title + '</p>';
    }).join('');
  }
  function openBookGuide(bookId, trigger) {
    var guide = getBookGuide(bookId);
    if (!guide) return;
    var b = BOOK_CATALOG[bookId];
    guideReturn = { step: document.querySelector('.step.active').id.replace('step-', ''), trigger: trigger, scrollTop: window.scrollY, bookIndex: state.bookIndex };
    document.getElementById('guide-title').textContent = b.title;
    document.getElementById('guide-author').textContent = b.author;
    document.getElementById('guide-edition').textContent = guide.edition.publisher + ' · ' + guide.edition.publishedAt + '年版 · ' + guide.edition.translator + ' 译 · ISBN ' + guide.edition.isbn;
    var cover = document.getElementById('guide-cover');
    cover.hidden = false; cover.nextElementSibling.hidden = true;
    cover.alt = '《' + b.title + '》所据版本封面'; cover.src = b.cover.src;
    document.getElementById('guide-caveat').textContent = b.caveat;
    document.getElementById('guide-toc').innerHTML = guideEntries(guide.toc);
    renderClinicalNotice('guide-clinical', [{ bookId: bookId }]);
    switchStep('book-guide');
  }
  function closeBookGuide() {
    if (!guideReturn) return;
    var restore = guideReturn;
    guideReturn = null;
    state.bookIndex = restore.bookIndex;
    switchStep(restore.step, restore);
  }
  function renderBooks(containerId, references, topicKey) {
    var html = '';
    references.forEach(function(ref) {
      var b = BOOK_CATALOG[ref.bookId];
      if (ref.groupTitle) html += '<h3 class="reference-heading">' + escapeHtml(ref.groupTitle) + '</h3>';
      var edition = b.edition;
      var guide = getBookGuide(ref.bookId);
      var guideAction = ' data-book-guide="' + escapeHtml(ref.bookId) + '"';
      var reason = ref.reason || b.reason;
      if (topicKey && !ref.reason) {
        var placement = BOOKS_DATA[topicKey].classic.concat(BOOKS_DATA[topicKey].popular).find(function(p) { return p.bookId === ref.bookId; });
        if (placement) reason = placement.reason;
      }
      html += '<article class="book-card" data-book-id="' + ref.bookId + '"><div class="book-header">';
      html += (guide ? '<button type="button" class="cover-frame guide-cover-button"' + guideAction + ' aria-label="阅读《' + escapeHtml(b.title) + '》目录与章节导读">' : '<div class="cover-frame">') + (b.cover ? '<img class="book-cover" src="' + escapeHtml(b.cover.src) + '" alt="《' + escapeHtml(edition.title) + '》所选版本封面" width="150" height="210" loading="lazy" decoding="async">' : '') + '<span class="cover-fallback"' + (b.cover ? ' hidden' : '') + '>封面暂缺</span>' + (guide ? '</button>' : '</div>');
      html += '<div class="book-heading"><h3 class="book-title">' + (guide ? '<button type="button" class="guide-title-button"' + guideAction + '>' + escapeHtml(b.title) + '</button>' : escapeHtml(b.title)) + '</h3>';
      if (b.clinicalContext) html += '<p class="clinical-label">涉及诊断概念 · 不用于自我诊断</p>';
      html += '<p class="book-author">' + escapeHtml(b.author) + '</p></div><div class="book-meta"><span class="badge">' + escapeHtml(b.difficulty) + '</span><span class="book-format">' + escapeHtml(b.format) + '</span><span class="book-edition">' + escapeHtml([edition.publisher, edition.publishedAt].filter(Boolean).join(' · ')) + '</span></div></div>';
      html += '<div class="book-ratings">' + ratingHtml('douban', b.ratings.douban) + ratingHtml('goodreads', b.ratings.goodreads) + '</div>';
      html += '<div class="book-desc"><strong>一句话介绍</strong><p>' + escapeHtml(b.summary) + '</p>' + '</div>';
      html += '<div class="book-reason"><strong>为什么推荐</strong>' + escapeHtml(reason) + '</div><div class="book-caveat"><strong>阅读局限</strong>' + escapeHtml(b.caveat);
      (b.caveatSources || []).forEach(function(s) { html += link(s.url, s.label); });
      html += '</div>';
      if (containerId === 'catalog-list') html += '<p class="book-topics">' + (b.audience === 'professional' ? '相关阅读主题：' : '适合的处境：') + b.topics.map(function(k) { return '<button type="button" class="topic-link" data-topic="' + k + '">' + escapeHtml(BOOKS_DATA[k].title) + '</button>'; }).join('、') + '</p>';
      html += '<div class="book-sources">' + link(b.synopsis.url, '内容来源') + link(edition.url, '版本/封面');
      html += '<details class="book-provenance"><summary>版本详情</summary><p>ISBN ' + escapeHtml(edition.isbn || '待核实') + '</p><p>' + escapeHtml(edition.selectionNote) + '</p></details></div>';
      html += '<div class="book-links">' + link('https://weread.qq.com/#search/' + encodeURIComponent(b.title), '微信读书搜索', 'weread-btn') + (guide ? '<button type="button" class="guide-link"' + guideAction + '>目录与章节导读 →</button>' : '') + '</div></article>';
    });
    var container = document.getElementById(containerId);
    container.innerHTML = html;
    container.querySelectorAll('img.book-cover').forEach(function(img) {
      img.addEventListener('error', function() { img.hidden = true; img.nextElementSibling.hidden = false; });
    });
  }
  function init() {
    renderFilters(); bindLogPanel();
    document.getElementById('guide-back').addEventListener('click', closeBookGuide);
    document.getElementById('guide-cover').addEventListener('error', function() { this.hidden = true; this.nextElementSibling.hidden = false; });
    carouselMedia = window.matchMedia('(max-width: 760px)');
    var resultList = document.getElementById('result-list');
    document.getElementById('book-previous').addEventListener('click', function() { moveBook(state.bookIndex - 1, true); });
    document.getElementById('book-next').addEventListener('click', function() { moveBook(state.bookIndex + 1, true); });
    resultList.addEventListener('scroll', function() {
      if (!carouselMedia.matches || !document.getElementById('step-result').classList.contains('active')) return;
      var cards = resultList.querySelectorAll('.book-card');
      var closest = state.bookIndex, distance = Infinity;
      cards.forEach(function(card, index) {
        var delta = Math.abs(card.offsetLeft - cards[0].offsetLeft - resultList.scrollLeft);
        if (delta < distance) { distance = delta; closest = index; }
      });
      if (closest !== state.bookIndex) { state.bookIndex = closest; updateBookNavigation(); }
    });
    resultList.addEventListener('keydown', function(e) {
      if (!carouselMedia.matches || e.target !== resultList || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'Tab' && !e.shiftKey) {
        var firstLink = resultList.children[state.bookIndex].querySelector('button, a');
        e.preventDefault(); firstLink.focus(); return;
      }
      var index = e.key === 'ArrowLeft' ? state.bookIndex - 1 : e.key === 'ArrowRight' ? state.bookIndex + 1 : e.key === 'Home' ? 0 : e.key === 'End' ? resultList.children.length - 1 : null;
      if (index !== null) { e.preventDefault(); moveBook(index, true); }
    });
    resultList.addEventListener('focusin', function(e) {
      var card = e.target.closest('.book-card');
      if (card && carouselMedia.matches) moveBook(Array.prototype.indexOf.call(resultList.children, card), false);
    });
    var lastWidth = window.innerWidth;
    window.addEventListener('resize', function() {
      if (window.innerWidth !== lastWidth) { lastWidth = window.innerWidth; moveBook(state.bookIndex, false); }
    });
    document.querySelector('[data-editorial-link]').addEventListener('click', function() { document.getElementById('editorial').open = true; });
    document.getElementById('search-form').addEventListener('submit', function(e) { e.preventDefault(); handleSearch(document.getElementById('user-input').value); });
    document.getElementById('user-input').addEventListener('input', function() { document.getElementById('search-status').textContent = ''; });
    document.querySelectorAll('[data-catalog-link]').forEach(function(b) { b.addEventListener('click', function(e) { e.preventDefault(); openCatalog(); }); });
    document.getElementById('result-back').addEventListener('click', function() { switchStep(state.origin); });
    document.getElementById('catalog-back').addEventListener('click', function() {
      var target = state.catalogReturn;
      if (target === 'result') {
        state.catalogAudience = state.referenceAudience; state.catalogReturn = 'input'; renderCatalog();
      }
      switchStep(target);
    });
    document.getElementById('catalog-audiences').addEventListener('click', function(e) {
      var b = e.target.closest('[data-audience]');
      if (!b) return;
      state.catalogAudience = b.dataset.audience; renderCatalog();
      logEvent({ type: 'audience', audience: state.catalogAudience });
    });
    document.getElementById('result-professional-link').addEventListener('click', function() {
      state.referenceAudience = state.catalogAudience;
      state.catalogAudience = 'professional'; state.catalogReturn = 'result';
      renderCatalog(); switchStep('catalog');
      logEvent({ type: 'catalog', reason: 'professional' });
    });
    document.getElementById('catalog-topic-select').addEventListener('change', function(e) {
      state.catalogTopic = e.target.value; renderCatalog();
      logEvent({ type: 'filter', topic: state.catalogTopic });
    });
    document.getElementById('reading-preferences').addEventListener('click', function(e) {
      var b = e.target.closest('[data-preference]');
      if (!b) return;
      state.preference = b.dataset.preference; renderResultBooks();
      logEvent({ type: 'preference', topic: state.currentTopic, preference: state.preference });
    });
    document.getElementById('topic-select').addEventListener('change', function(e) { changeResultTopic(e.target.value); });
    document.getElementById('related-topic-buttons').addEventListener('click', function(e) {
      var b = e.target.closest('[data-result-topic]');
      if (b) { changeResultTopic(b.dataset.resultTopic); document.getElementById('topic-select').focus(); }
    });
    document.getElementById('main').addEventListener('click', function(e) {
      var guide = e.target.closest('[data-book-guide]');
      if (guide) { openBookGuide(guide.dataset.bookGuide, guide); return; }
      var b = e.target.closest('[data-topic]');
      if (b) {
        logEvent({ type: 'card', topic: b.dataset.topic });
        showResult(b.dataset.topic, 'catalog');
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
