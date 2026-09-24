# 困境书单 — 项目交接文档

> 给接手这个项目的 agent / 开发者看的说明书。读完这一份，就能独立改内容、发版本。

---

## 1. 这是什么

**困境书单**：用户用一句话描述自己当下的困境（焦虑、拖延、职业迷茫、原生家庭创伤……），
产品匹配到对应主题，先问 1 个补充问题，再给出书单——**经典书**（提供深层理解框架）+ **近年热门书**（低门槛入门），
每本书标注阅读难度、豆瓣评分、Goodreads 评分、推荐理由，并附微信读书搜索链接。

定位：**TRAE AI 创造力大赛参赛作品**。纯前端、无后端、无账号、无数据库，静态托管。

---

## 2. 仓库与线上地址

| 项 | 值 |
|---|---|
| GitHub 仓库 | `https://github.com/nvnv19309/kunjing-shudan`（public，默认分支 `main`） |
| 线上地址 | `https://nvnv19309.github.io/kunjing-shudan/` |
| 托管方式 | GitHub Pages，source = `main` 分支 `/` 根目录 |
| 部署状态 | built（推送 `main` 后自动构建，约 1 分钟生效） |

⚠️ **注意**：仓库根目录直接放应用文件（`index.html` / `app.js` / `books-data.js` / `style.css`），
所以线上地址是仓库根路径。**不要在仓库里再套一层目录**，否则 Pages 会 404。

---

## 3. 文件地图

### 3.1 线上应用（真正要维护的东西）

工作区源码目录：`kunjing-shudan-app/`（**这是唯一的编辑入口**）

| 文件 | 行数 | 职责 |
|---|---|---|
| `index.html` | 106 | 页面骨架：三个步骤（输入 → 补充问题 → 结果）、风险提示框、难度图例、页脚免责声明 |
| `books-data.js` | 831 | **核心数据库**：14 个主题、62 本书、`TOPIC_LIST` 生成 |
| `app.js` | 248 | 交互逻辑：主题卡片渲染、关键词匹配、问答流程、书卡渲染、步骤切换 |
| `style.css` | 506 | 视觉系统：暖色系（暖米色背景 + 奶油白卡片 + 鼠尾草绿主色 + 暖琥珀强调），衬线标题 |
| `.gitattributes` | 3 | 换行符规范：`* text=auto eol=lf`，仓库与检出统一 LF。**不要删**，删了会重新出现 CRLF 幽灵 diff |

### 3.2 参赛展示页（一般不用动）

| 路径 | 说明 |
|---|---|
| `kunjing-shudan/kunjing-shudan.html` | 565 行，单页长文报名页。含「创意名称与介绍 / 目标用户及痛点 / 产品核心逻辑 / 推荐标准 / 价值与意义 / 报名话题帖内容 / 内容来源」7 个板块 |
| `kunjing-shudan/_shared/fonts/` | 展示页内嵌字体（InstrumentSans、JetBrainsMono） |
| `kunjing-shudan.zip` | 展示页的打包产物 |
| `TRAE_AI创造力大赛_最终创意内容.docx` | 参赛创意内容的 Word 稿 |

---

## 4. 数据 Schema（改内容必读）

`books-data.js` 结构：

```js
const BOOKS_DATA = {
  <topicKey>: {                  // 英文 key，如 anxiety / mood / family
    title: "焦虑与压力",          // 主题中文名，显示在卡片上
    icon: "💔",                   // 卡片 emoji
    keywords: ["焦虑", "压力", ...],  // 用于匹配用户输入，越多越准
    questions: [                  // 补充问题；可为空数组 []，为空则跳过第二步
      { id: "need", text: "你现在更需要什么？", options: ["理解焦虑本身", "缓解方法", "两者都要"] }
    ],
    warning: true,                // 可选。严重议题必须加，见第 5 节
    classic: [ /* book */ ],      // 经典书
    popular: [ /* book */ ]       // 近年热门书
  }
};

// 主题列表自动生成 —— 卡片顺序 = BOOKS_DATA 的键顺序
const TOPIC_LIST = Object.keys(BOOKS_DATA).map(key => ({
  key, title: BOOKS_DATA[key].title, icon: BOOKS_DATA[key].icon
}));
```

单本书结构：

```js
{
  title: "焦虑的意义",
  author: "罗洛·梅",
  year: 1950,
  difficulty: "进阶",        // 只能是 "入门" / "进阶" / "较难"
  douban: "8.6",            // 字符串，不是数字
  goodreads: "4.24",        // 字符串，不是数字
  desc: "存在主义心理学经典……",   // 这是什么书（客观描述）
  reason: "如果你想从根本上理解……" // 为什么推荐给你（第二人称，贴近用户处境）
}
```

**写 `reason` 的调性**：不要复述 `desc`，要说"如果你正处在 X 状态，这本书能给你 Y"。
现有数据全部是第二人称、口语化、避免说教的写法，保持一致。

---

## 5. 硬约束（不可违反）

1. **全免费**：托管只用 GitHub Pages，不引入付费服务、后端、数据库、账号系统。
2. **严重心理议题必须加 `warning: true`**：
   页面会显示风险提示框，引导用户联系心理援助热线（全国 24 小时：400-161-9995）或就医。
   当前 4 个主题已启用：`mood`（情绪低落与抑郁倾向）、`personality`（人格障碍与自我怀疑）、
   `health`（健康焦虑与就医恐惧）、`family`（原生家庭与童年创伤）。
   **新增任何涉及抑郁、自伤、人格障碍、创伤、成瘾、进食障碍的主题，都必须加这个字段。**
3. **免责声明不可删除**：页脚"书籍不能替代专业帮助"、结果页风险提示框，都必须保留。
4. **评分必须真实**：豆瓣分与 Goodreads 分要与实际平台一致，**不得编造**。数据以书籍条目为准。
5. **纯前端约束**：不引入构建工具、npm 依赖、框架。原生 HTML/CSS/JS，`<script>` 直引。

---

## 6. 推荐逻辑（`app.js`）

1. **主题卡片点击** → `selectTopic(key)`
2. **文字输入** → `matchTopic(text)`：把输入转小写，遍历所有主题的 `keywords` 做 `indexOf` 命中计数，
   得分最高者胜出（**只有 > 0 才算匹配**）。命中多个主题时取命中关键词数最多的那个。
3. **未命中** → `showNoMatch()`：改 placeholder 提示 + 主题区域 pulse 动画，不跳转。
4. **补充问题** → `renderQuestions()` 渲染选项，全部答完才解锁「查看推荐」按钮。
5. **结果页** → `renderBooks()` 渲染书卡；`difficulty` 映射到样式：
   `入门 → badge-easy`、`进阶 → badge-mid`、`其余 → badge-hard`。
6. **微信读书链接**：`https://weread.qq.com/#search/<书名>`，`encodeURIComponent` 编码后拼 URL。

> 匹配是**朴素关键词计数**，没有分词、没有语义。所以用户输入里出现了 `keywords` 中的词才算命中。
> 如果发现某类困境匹配不到，**优先补 `keywords`，而不是改匹配算法**。

---

## 7. 怎么改、怎么发版

工作区目录**不是** git 仓库，线上内容在 GitHub。标准流程：

```powershell
# 1) 在 kunjing-shudan-app/ 里改文件（唯一编辑入口）

# 2) 拉一份仓库副本（临时目录，每次重新克隆最稳）
git clone https://github.com/nvnv19309/kunjing-shudan.git "$env:TEMP\kunjing-sync"

# 3) 把改好的文件覆盖进去
Copy-Item "<工作区>\kunjing-shudan-app\*" "$env:TEMP\kunjing-sync\" -Force

# 4) 确认差异无误后提交（git 身份未全局配置，需用 -c 内联指定）
git -C "$env:TEMP\kunjing-sync" -c user.name="nvnv19309" -c user.email="nvnv19309@users.noreply.github.com" add -A
git -C "$env:TEMP\kunjing-sync" -c user.name="nvnv19309" -c user.email="nvnv19309@users.noreply.github.com" commit -m "描述这次改了什么"
git -C "$env:TEMP\kunjing-sync" push origin main

# 5) 验证
git -C "$env:TEMP\kunjing-sync" rev-list --left-right --count HEAD...origin/main   # 应输出 0  0
```

**发版前自查**：
- 推送前用 `Compare-Object` 或去空白后比对，确认工作区与仓库内容一致（历史上踩过"以为没推，其实只是行尾 CRLF 差异"的坑）。
  仓库已加 `.gitattributes`（`* text=auto eol=lf`），git 会自动把 CRLF 归一化为 LF 后入库，这类幽灵 diff 已从根源消除；
  如果 `git status` 又出现莫名其妙的整文件修改，先检查 `.gitattributes` 是否还在。
- 推送后等约 1 分钟，再开线上地址确认。
- `books-data.js` 是纯数据文件，语法错误会导致整个页面白屏——改完用 node 加载一次验证：
  ```powershell
  node -e "const fs=require('fs');let s=fs.readFileSync('books-data.js','utf8').replace('const BOOKS_DATA','globalThis.BOOKS_DATA');eval(s);console.log('themes='+Object.keys(BOOKS_DATA).length)"
  ```

---

## 8. 当前数据统计（截至 2026-09-24）

- **主题数**：14
- **书籍总数**：62（经典书 30 + 近年热门 32）
- **难度分布**：入门 32 / 进阶 24 / 较难 6
- **出版年份跨度**：1932 – 2025
- **预警主题**：4 个（`mood` / `personality` / `health` / `family`）
- **评分完整性**：62 本全部有豆瓣分与 Goodreads 分（无缺失）

主题清单（顺序即页面卡片顺序）：

| # | key | 主题 | 经典/热门 | 关键词数 | 预警 |
|---|---|---|---|---|---|
| 1 | `anxiety` | 焦虑与压力 | 2 / 2 | 20 | |
| 2 | `procrastination` | 拖延与执行力 | 1 / 2 | 10 | |
| 3 | `career` | 职业迷茫与选择 | 2 / 2 | 10 | |
| 4 | `relationship` | 人际关系与社交 | 2 / 2 | 10 | |
| 5 | `learning` | 学习方法与效率 | 2 / 2 | 10 | |
| 6 | `mood` | 情绪低落与抑郁倾向 | 3 / 4 | 32 | ✅ |
| 7 | `self` | 自我认知与成长 | 2 / 2 | 10 | |
| 8 | `personality` | 人格障碍与自我怀疑 | 4 / 4 | 36 | ✅ |
| 9 | `money` | 金钱与现实困境 | 2 / 2 | 22 | |
| 10 | `meaning` | 人生意义与虚无感 | 2 / 2 | 10 | |
| 11 | `health` | 健康焦虑与就医恐惧 | 2 / 2 | 27 | ✅ |
| 12 | `family` | 原生家庭与童年创伤 | 2 / 2 | 30 | ✅ |
| 13 | `sensitivity` | 高敏感与完美主义 | 2 / 2 | 22 | |
| 14 | `breakup` | 失恋与情感创伤 | 2 / 2 | 21 | |

> 有 5 本书跨主题复用（如《被讨厌的勇气》同时出现在 `relationship` / `self` / `sensitivity`），
> 这是**有意为之**——同一本书能对应不同困境入口，不视为重复。

---

## 9. 代码整洁度与体积基线

### 9.1 体积基线（清理死代码后实测）

| 文件 | 原始 | gzip | 占传输量 |
|---|---|---|---|
| `books-data.js` | 37,635 B | 11,989 B | 61% |
| `style.css` | 10,481 B | 3,152 B | 16% |
| `app.js` | 7,340 B | 2,571 B | 13% |
| `index.html` | 4,247 B | 1,824 B | 9% |
| **合计** | **59,703 B** | **19,536 B** | 100% |

GitHub Pages 自动走 gzip 传输，**真实传输体积以 gzip 列为准（约 19.5 KB）**。
要重新测量，用 `System.IO.Compression.GZipStream` 压一遍再取长度即可，别只看原始字节数。

### 9.2 「压缩代码」已评估过，结论：不做 minify

实测过全量 minify（去注释 + 压空白后重新 gzip）的收益：

| 项 | 数值 |
|---|---|
| minify 后 gzip 合计 | 17,677 B |
| 相比现状节省 | **2,176 B（11%）** |
| 代价 | `books-data.js` 变成不可读 —— 它占传输量 61%，且是后续加书、改推荐理由时唯一要动的文件 |

**结论：不值得，不要再试。** 为了 11% 的传输收益牺牲内容可维护性，与"项目价值在内容质量、不在技术"的定位直接冲突。
根因是 gzip 已经把缩进和重复空白压得很干净，minify 的边际收益极小。

**如果将来真要减传输体积**，唯一有实质效果的方案是**按主题拆包按需加载**：
`books-data.js` 独占 61% 传输量，拆成 14 个主题文件后，首屏只需加载主题列表（约 1 KB），
点选主题时再异步加载该主题数据。代价是要改架构、维护 14+ 个数据文件。

### 9.3 死代码现状：已清空

| 类别 | 数量 | 状态 |
|---|---|---|
| CSS class | 53 | 全部被 `index.html` / `app.js` 引用 |
| CSS 变量 | 19 | 定义与 `var()` 引用 **1:1 完全对应**，无死变量 |
| JS 函数 | 12 | 全部被调用，无死函数 |
| HTML id | 13 | 全部被 JS 引用（`step-input` / `step-question` / `step-result` 由 `"step-" + name` 拼接引用） |
| `@keyframes` | 2（`pulse` / `fadeIn`） | 均在使用 |

> 本轮清理移除了 6 个从未被 `var()` 引用的变量：
> `--bg-deep`、`--border-soft`、`--brand-soft-strong`、`--accent-soft`、`--warning`、`--shadow-lg`。

**维护约定**：
- 新增 CSS 变量就要用，定义了不用等于死代码。
- **删变量前必须确认全站没有 `var(--xxx)` 引用**——否则样式会静默失效（浏览器不报错，只是颜色/阴影丢失，很难排查）。
- 扫描死代码时注意两个坑：`@import` 的字体 URL 会被误判成 CSS class（`googleapis` / `com`），
  而 `step-input` 这类由字符串拼接的 id 会被误判成未引用。都是假阳性。

---

## 10. 已知缺口 / 下一步可做

1. **主题覆盖仍偏"情绪与关系"**：成瘾、进食障碍、职场霸凌、亲子关系（已为人父母视角）等高频困境尚未覆盖。
2. **`keywords` 密度不均**：`mood` / `personality` 有 30+ 个关键词，而 `procrastination` / `career` / `learning` 等只有 10 个，
   口语化说法（如"提不起劲""学不进去"）容易漏匹配。**补关键词是性价比最高的改动。**
3. **无收藏 / 无分享**：目前没有"把书单存下来"的能力，用户看完即走。
4. **无埋点**：不知道哪些主题被点得多，无法用数据决定下一步补哪个主题。
5. **主题卡片为平铺网格**：14 个主题在小屏上需要滚动，可考虑分组（情绪 / 关系 / 成长 / 现实）。

---

## 11. 修改速查

| 想做的事 | 改哪里 |
|---|---|
| 新增一个困境主题 | `books-data.js` 加一个 key（`title` / `icon` / `keywords` / `questions` / `classic` / `popular`）；涉及严重议题记得 `warning: true`。**卡片会自动出现，无需改 HTML** |
| 给某主题加书 | 在对应 `classic` 或 `popular` 数组里加 book 对象 |
| 某个说法匹配不到 | 往对应主题的 `keywords` 里加口语化说法 |
| 调整配色 / 字体 | `style.css` 顶部 `:root` 的 CSS 变量（已有注释说明每个颜色的意图） |
| 改风险提示文案 / 热线号码 | `index.html` 的 `#warning-box` |
| 改免责声明 | `index.html` 的 `.site-footer` |
| 改推荐理由的措辞 | `books-data.js` 各 book 的 `reason` 字段 |

---

## 12. 交接给下一位的注意事项

- **改数据前先备份**：`books-data.js` 是单文件数据库，一个逗号错误整站白屏。
- **不要重构成框架**：这个项目的价值在**内容质量**（书选得对不对、理由写得贴不贴心），不在技术。
  引入 React / 构建工具只会增加维护成本，收益为零。
- **内容调性 = 产品本身**：温暖、不说教、第二人称、承认困境的真实性。
  新增内容的文字质量，直接决定这个产品好不好用。
- **优先引导求助，而非卖书**：涉及严重心理议题时，求助引导永远排在推荐书单前面。