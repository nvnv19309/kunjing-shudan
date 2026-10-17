// 困境书单：主题与书目均可直接编辑，无构建或线上API。
// classic / popular 只保留历史分组兼容；前台合并展示并按可选阅读用途排序。
// 评分为所列日期核对的页面快照，不能当作实时分数；summary为编辑概括；synopsis仅保留原文短摘录作为来源记录。
const TOPIC_GROUPS = [
  {
    "key": "emotion",
    "label": "01 / FEEL",
    "title": "情绪与自我",
    "desc": "理解感受，留一点余地"
  },
  {
    "key": "relations",
    "label": "02 / CONNECT",
    "title": "关系与边界",
    "desc": "在靠近与独立之间"
  },
  {
    "key": "growth",
    "label": "03 / GROW",
    "title": "行动与方向",
    "desc": "把下一步变得具体"
  },
  {
    "key": "life",
    "label": "04 / LIVE",
    "title": "现实与生活",
    "desc": "面对生活的复杂性"
  }
];

const BOOKS_DATA = {
  "anxiety": {
    "group": "emotion",
    "short": "给紧绷的心一点空间",
    "intro": "担心、反复思考和身体紧绷，可能让日常生活变得吃力。这里提供理解焦虑的不同视角，也留一个不必努力分析自己的故事入口。",
    "readingTip": "想理解概念，可选择“理解原因”再挑一本；只想轻一点，可以先读故事。每次尝试一个练习即可。",
    "boundary": "阅读不能判断焦虑是否达到诊断标准。若困扰持续影响生活，可与专业人员讨论。",
    "title": "焦虑与压力",
    "icon": "💔",
    "keywords": [
      "焦虑",
      "压力",
      "紧张",
      "不安",
      "心慌",
      "担心",
      "害怕",
      "恐惧",
      "内耗",
      "精神内耗",
      "想太多",
      "脑子停不下来",
      "社恐",
      "社交恐惧",
      "社交焦虑",
      "过度思考",
      "反刍",
      "胡思乱想",
      "提心吊胆",
      "怕出事",
      "不自在",
      "坐立不安",
      "心跳加速",
      "最坏的结果",
      "紧绷",
      "放松不下来",
      "忧心"
    ],
    "classic": [
      {
        "bookId": "b01",
        "reason": "如果你想理解自己在担心什么，可以借它整理焦虑背后的价值与不确定性。"
      }
    ],
    "popular": [
      {
        "bookId": "b03",
        "reason": "如果焦虑之外还伴随自责，可以从一个短练习开始，看看如何回应当下的困难。"
      },
      {
        "bookId": "b04",
        "reason": "如果现在读不进心理学术语，可以通过人物的经历给自己的感受留一点空间。"
      },
      {
        "bookId": "b60",
        "reason": "如果担忧总在脑中打转，可以记录一个具体情境，练习区分事实、想法和感受。"
      }
    ]
  },
  "procrastination": {
    "group": "growth",
    "short": "把开始变得小一点",
    "intro": "拖延可能与任务不清、害怕失败、疲惫或注意力分散有关。这里把理解原因与整理行动放在一起，避免把困难都归为不自律。",
    "readingTip": "先选一个正在拖着的任务。整理法适合厘清下一步，心理视角适合观察反复卡住的地方。",
    "boundary": "方法并非对所有人有效。持续疲惫、注意力困难或情绪低落，也值得从生活条件和健康角度了解。",
    "title": "拖延与执行力",
    "icon": "⏰",
    "keywords": [
      "拖延",
      "拖延症",
      "懒",
      "执行力",
      "完不成",
      "赶deadline",
      "明天再做",
      "分心",
      "刷手机",
      "提不起劲",
      "做不下去",
      "明天开始",
      "一直没动",
      "不想开始",
      "没执行",
      "刷视频",
      "启动不了",
      "截止日期",
      "flag",
      "自律",
      "时间管理",
      "自控力",
      "管不住自己"
    ],
    "classic": [
      {
        "bookId": "b05",
        "reason": "如果你卡在事情太多、不知从何开始，可以先尝试把一件待办改写为下一步动作。"
      },
      {
        "bookId": "b06",
        "reason": "如果你反复因为怕做不好而不开始，可以用书中的问题辨认自己在回避什么。"
      }
    ],
    "popular": [
      {
        "bookId": "b07",
        "reason": "如果你知道要做什么却很难开始，可以试着减少一个动作的阻力，而不是只靠意志力。"
      },
      {
        "bookId": "b62",
        "reason": "如果你因担心做不好而迟迟不开始，可以从一个允许不够完美的小实验开始。"
      }
    ]
  },
  "career": {
    "group": "growth",
    "short": "方向可以边试边找",
    "intro": "职业选择既关乎兴趣与能力，也受收入、机会和照护责任限制。这些书提供梳理与试验工具，不预设每个人都有同样的选择空间。",
    "readingTip": "带着一个现实选择读：列出你能承受的成本，再试一个小规模探索。",
    "boundary": "作者的行业经验和时代背景未必适用于你。重大职业决定还需要具体的信息与现实安排。",
    "title": "职业迷茫与选择",
    "icon": "🧭",
    "keywords": [
      "换工作",
      "职业",
      "迷茫",
      "不知道做什么",
      "职业规划",
      "跳槽",
      "转行",
      "工作没意义",
      "职场",
      "升职",
      "加班",
      "看不到希望",
      "熬日子",
      "换个方向",
      "上班",
      "同龄人",
      "辞职",
      "找工作"
    ],
    "classic": [
      {
        "bookId": "b66",
        "reason": "如果你纠结的不只是做什么工作，还有什么值得长期投入，可以借书中的问题梳理满意感、重要关系与日常取舍。"
      }
    ],
    "popular": [
      {
        "bookId": "b12",
        "reason": "如果你一直等待唯一正确的方向，可以先设计两个低成本的小试验。"
      }
    ]
  },
  "relationship": {
    "group": "relations",
    "short": "说出需要，也听见彼此",
    "intro": "沟通、孤独与人际边界没有一种通用解法。这组书分别提供研究综述、沟通框架和咨询故事。",
    "readingTip": "想练习表达，可先读沟通框架；想理解关系的复杂性，可以读教材或咨询叙事。",
    "boundary": "沟通技巧需要双方有基本的尊重与安全。在控制、威胁或暴力关系中，安全支持比沟通练习更优先。",
    "title": "人际关系与社交",
    "icon": "🤝",
    "keywords": [
      "人际",
      "社交",
      "朋友",
      "沟通",
      "相处",
      "吵架",
      "不合群",
      "讨好",
      "配合不来",
      "没朋友",
      "同事",
      "怕说错",
      "融不进去",
      "说不出口",
      "交往"
    ],
    "classic": [
      {
        "bookId": "b13",
        "reason": "如果你希望系统理解互动，而不只依靠一个流行标签，可以按问题挑选章节。"
      },
      {
        "bookId": "b14",
        "reason": "如果你容易把委屈说成指责，可以用框架先整理一次对话中自己的需要。"
      }
    ],
    "popular": [
      {
        "bookId": "b15",
        "reason": "如果你常被别人的期待牵着走，可以把其中的观点当作一次重新提问的机会。"
      },
      {
        "bookId": "b16",
        "reason": "如果你对咨询有好奇或顾虑，可以借故事了解其中可能出现的谈话与关系。"
      }
    ]
  },
  "learning": {
    "group": "growth",
    "short": "找到适合任务的学习法",
    "intro": "记得住、能理解与会应用，是不同的学习目标。这组书从记忆研究、阅读和笔记实践提供观察工具。",
    "readingTip": "先明确目标：考试回忆、概念理解，还是写作输出；选择相应方法，再用实际表现检查效果。",
    "boundary": "学习方法不能脱离科目、基础与时间条件。短视频里的效率承诺也不应成为评价自己的标准。",
    "title": "学习方法与效率",
    "icon": "📚",
    "keywords": [
      "学习",
      "效率",
      "专注",
      "记忆",
      "考试",
      "读书",
      "学不会",
      "记不住",
      "注意力",
      "考研",
      "学不进去",
      "走神",
      "静不下心",
      "集中不了",
      "考完就忘",
      "效率低",
      "学东西",
      "学得慢",
      "看不进去",
      "学习计划",
      "听不进去"
    ],
    "classic": [
      {
        "bookId": "b17",
        "reason": "如果你读完常觉得没有抓住重点，可以先学着给一章内容提出自己的问题。"
      },
      {
        "bookId": "b18",
        "reason": "如果你常用重读检查自己学会没有，可以试着合上材料回忆，再用反馈纠正。"
      },
      {
        "bookId": "b68",
        "reason": "如果你想了解注意、记忆和技能学习的研究依据，而不仅是收集学习技巧，可以选读相应章节，并留意实验任务与真实学习情境的差别。"
      }
    ],
    "popular": [
      {
        "bookId": "b19",
        "reason": "如果你觉得某门课怎么都学不进去，可以挑一个具体任务尝试书中的练习安排。"
      },
      {
        "bookId": "b20",
        "reason": "如果你积累很多摘抄却难以写作，可以先把一条摘抄改写成自己的说明并建立一个关联。"
      }
    ]
  },
  "mood": {
    "group": "emotion",
    "short": "低落时，也可以慢慢来",
    "intro": "低落与睡不好常会一起出现，但原因不止一种。这组书提供情绪记录、心理咨询叙事和睡眠知识，不把所有困扰归为同一个诊断。",
    "readingTip": "先选自己读得下去的部分。做情绪练习时，可以只记录一件具体的事情，不必强迫自己积极。",
    "boundary": "睡眠知识书不等于失眠治疗。持续失眠、明显低落或功能受影响时，请优先寻求专业帮助。",
    "title": "情绪低落与睡眠困扰",
    "icon": "🌧️",
    "keywords": [
      "抑郁",
      "低落",
      "不开心",
      "没动力",
      "悲伤",
      "想哭",
      "空虚",
      "绝望",
      "活着没意思",
      "消沉",
      "失眠",
      "睡眠",
      "睡眠障碍",
      "睡不着",
      "入睡困难",
      "睡不好",
      "早醒",
      "睡很少",
      "睡不够",
      "熬夜",
      "多梦",
      "浅眠",
      "睡眠质量",
      "少觉",
      "没睡好",
      "睡得少",
      "睡不踏实",
      "梦多",
      "嗜睡",
      "黑白颠倒",
      "作息",
      "什么都不想干",
      "不想说话",
      "没什么意思",
      "没兴趣",
      "空空的",
      "什么都不想做",
      "不想动",
      "不感兴趣",
      "眼泪",
      "没劲",
      "崩溃",
      "不想面对"
    ],
    "classic": [
      {
        "bookId": "b21",
        "reason": "如果你常在一次挫折后否定自己，可以借练习区分事件、想法与感受。"
      },
      {
        "bookId": "b22",
        "reason": "如果你想理解睡眠的作用，可以按兴趣阅读，不必把每段风险描述套到自己身上。"
      },
      {
        "bookId": "b23",
        "reason": "如果你反复被同一段想法拉走，可以了解怎样留意它，而不是立刻与它争辩。"
      }
    ],
    "popular": [
      {
        "bookId": "b24",
        "reason": "如果你只想先读一个故事，可以跟着人物看看难以说出的感受如何进入对话。"
      },
      {
        "bookId": "b16",
        "reason": "如果你对咨询有好奇或顾虑，可以借故事了解其中可能出现的谈话与关系。"
      },
      {
        "bookId": "b26",
        "reason": "如果你想跳出“情绪只是失控”的理解，可以比较这套理论如何解释一个具体经历。"
      },
      {
        "bookId": "b60",
        "reason": "如果你想梳理低落时反复出现的自我评价，可以从一个工作表开始；不必等完成练习后才寻求帮助。"
      },
      {
        "bookId": "b64",
        "reason": "如果你越担心失眠越清醒，可以先记录作息与睡前思维，再与专业人员讨论适合自己的调整。"
      }
    ],
    "warning": true
  },
  "self": {
    "group": "emotion",
    "short": "重新认识自己的方式",
    "intro": "理解性格、自我评价与个人选择，可以从不同理论和生活经验出发。它们提供观察角度，不负责给你一个固定的人格答案。",
    "readingTip": "先记录一个反复困扰你的场景，再带着问题读；比较不同作者如何解释它。",
    "boundary": "不要用一个概念概括全部的自己，也不必接受所有作者的价值判断。",
    "title": "自我认知与成长",
    "icon": "🌱",
    "keywords": [
      "自己",
      "成长",
      "自卑",
      "自信",
      "性格",
      "内向",
      "认识自己",
      "改变自己",
      "讨好型",
      "存在感",
      "了解自己",
      "想要什么",
      "不如别人",
      "真实的自我"
    ],
    "classic": [
      {
        "bookId": "b27",
        "reason": "如果你常以不足评价自己，可以借它观察自己怎样理解困难和与他人的联系。"
      },
      {
        "bookId": "b28",
        "reason": "如果你希望更系统地理解人与人的差异，可以先选一个理论，再看相关研究如何检验它。"
      }
    ],
    "popular": [
      {
        "bookId": "b29",
        "reason": "如果你担心自己的性格限制了选择，可以观察哪些情境容许你采取不同的行动。"
      },
      {
        "bookId": "b15",
        "reason": "如果你常被别人的期待牵着走，可以把其中的观点当作一次重新提问的机会。"
      },
      {
        "bookId": "b63",
        "reason": "如果你经常把一次失误变成对整个人的否定，可以从识别内在批评、建立平衡评价开始。"
      }
    ]
  },
  "personality": {
    "group": "emotion",
    "short": "理解波动，不急着贴标签",
    "intro": "情绪波动、关系反复与不真实感可能有不同来源。这里先提供理解体验、练习技巧与寻找支持的读物，不根据你的输入确认任何诊断。",
    "readingTip": "可以先从情绪调节技巧或求助资源开始。涉及BPD的读物是了解概念与支持方式的材料，阅读后的共鸣不是诊断；临床理论和诊断手册另放在专业参考区。",
    "boundary": "不要根据关键词、伴侣行为或阅读后的共鸣诊断人格障碍或创伤。持续或明显的不真实感值得接受专业评估。",
    "title": "情绪波动与关系困扰",
    "icon": "🧩",
    "keywords": [
      "BPD",
      "bpd",
      "边缘型人格",
      "人格障碍",
      "NPD",
      "npd",
      "自恋",
      "自恋型人格",
      "自恋者",
      "narcissist",
      "narcissism",
      "ASPD",
      "反社会人格",
      "回避型人格",
      "依赖型人格",
      "自我怀疑",
      "亲密关系不稳定",
      "CPTSD",
      "复杂性创伤",
      "分裂",
      "非黑即白",
      "害怕被抛弃",
      "解离",
      "人格解体",
      "不真实感",
      "不真实",
      "像在做梦",
      "脱离身体",
      "灵魂出窍",
      "煤气灯",
      "gaslighting",
      "情感操控",
      "解离症状",
      "现实解体",
      "被冷落",
      "冷淡",
      "被反复操控",
      "被丢下",
      "被利用",
      "一会儿觉得",
      "过山车",
      "爱和恨",
      "怕被抛弃"
    ],
    "classic": [
      {
        "bookId": "b32",
        "reason": "如果你正在寻求或接受帮助，可以从治疗选择与支持资源部分了解能向专业人员问什么。"
      }
    ],
    "popular": [
      {
        "bookId": "b34",
        "reason": "如果你想了解创伤为何可能影响日常体验，可以从与你有关的章节开始。"
      },
      {
        "bookId": "b35",
        "reason": "如果你想整理成长经历带来的反复感受，可以把其中建议作为与支持者讨论的线索。"
      },
      {
        "bookId": "b36",
        "reason": "如果你正在支持一个有明确相关需要的人，可以借它思考自己的需要和可承受的帮助。"
      },
      {
        "bookId": "b61",
        "reason": "如果情绪强烈、冲突后很难平复，可以先了解承受痛苦和人际效能的具体技巧；需要这些技巧不等于患有BPD。"
      },
      {
        "bookId": "b51",
        "reason": "如果你反复感到被内疚或义务推着走，可以关注具体互动、需要和安全边界，不必先给对方确定某种人格标签。"
      }
    ],
    "warning": true
  },
  "money": {
    "group": "life",
    "short": "在现实里找回一点掌握感",
    "intro": "钱的困扰既有行为和观念的一面，也有收入与负担的现实限制。这里提供财务阅读入口，不把经济困难解释为个人心态问题。",
    "readingTip": "先分清你需要的是预算知识、债务支持，还是理解消费行为。阅读案例时留意其国家、年代和风险前提。",
    "boundary": "本书单不提供个性化投资建议，不推荐产品。债务和法律问题需要结合所在地的合格专业意见。",
    "title": "金钱与现实困境",
    "icon": "💰",
    "keywords": [
      "金钱",
      "钱",
      "财务",
      "理财",
      "贫穷",
      "负债",
      "贷款",
      "存钱",
      "花钱",
      "消费",
      "工资低",
      "没钱",
      "经济压力",
      "房贷",
      "车贷",
      "收入",
      "支出",
      "破产",
      "财务自由",
      "财务焦虑",
      "穷",
      "月光",
      "欠信用卡",
      "存不下钱",
      "算钱",
      "一花钱就后悔",
      "经济状况",
      "账单",
      "开销"
    ],
    "classic": [
      {
        "bookId": "b38",
        "reason": "如果你从未整理自己的现金流，可以把它作为提出基础问题的起点。"
      },
      {
        "bookId": "b39",
        "reason": "如果你容易用消费水平判断财务状况，可以借它重新区分收入、支出与净资产。"
      }
    ],
    "popular": [
      {
        "bookId": "b40",
        "reason": "如果你常在消费或投资后后悔，可以留意自己在追求什么、能承受什么。"
      },
      {
        "bookId": "b41",
        "reason": "如果你觉得财务术语难以接近，可以借故事先认识预算与目标这些基本问题。"
      }
    ]
  },
  "meaning": {
    "warning": true,
    "group": "life",
    "short": "允许暂时没有答案",
    "intro": "关于意义的问题可以被慢慢思考。这组书包含回忆、哲学与人生设计，不要求你从别人的经历中得到同一个答案。",
    "readingTip": "想思考可读哲学，想行动可试人生设计；当你很疲惫时，也可以先休息或找人聊聊。",
    "boundary": "部分文本涉及死亡、集中营或自杀的哲学讨论，状态不适合时可跳过。若伴随持续绝望或自伤念头，优先求助。",
    "title": "人生意义与虚无感",
    "icon": "🌌",
    "keywords": [
      "意义",
      "虚无",
      "活着为了什么",
      "迷茫",
      "存在",
      "无意义",
      "空虚",
      "找不到方向",
      "人生",
      "索然无味",
      "毫无意义",
      "就这样了",
      "为了什么",
      "有什么劲",
      "没什么价值"
    ],
    "classic": [
      {
        "bookId": "b42",
        "reason": "如果你想接触一种理解意义的视角，可以从作者的经历与提问出发。"
      },
      {
        "bookId": "b43",
        "reason": "如果你希望认真思考重复与无意义感，可以把它当作与一种哲学立场的对话。"
      }
    ],
    "popular": [
      {
        "bookId": "b12",
        "reason": "如果你一直等待唯一正确的方向，可以先设计两个低成本的小试验。"
      },
      {
        "bookId": "b65",
        "reason": "如果你越要求自己快乐、越感到空虚，可以借价值探索寻找愿意投入的行动，允许不舒服暂时存在。"
      }
    ]
  },
  "health": {
    "group": "life",
    "short": "面对不确定，也照顾自己",
    "intro": "担心检查、害怕坏消息或有过不好的就医经历，都可能让就医变难。本组以医疗叙事为主，不是专门治疗健康焦虑的方案。",
    "readingTip": "先看简介与内容提醒，再决定是否阅读。也可以把想问医生的问题写下来，请可信任的人陪同就医。",
    "boundary": "多本书涉及重病、死亡与医疗差错，可能加重担忧；不舒服时可以不读。阅读不应代替检查或延迟必要就医。",
    "title": "健康焦虑与就医恐惧",
    "icon": "🏥",
    "keywords": [
      "医院",
      "看病",
      "害怕去医院",
      "不敢去医院",
      "检查",
      "体检",
      "确诊",
      "看病恐惧",
      "医生",
      "住院",
      "手术",
      "害怕生病",
      "健康焦虑",
      "疑病",
      "觉得自己有病",
      "怕死",
      "不敢体检",
      "害怕检查结果",
      "讳疾忌医",
      "怕去医院",
      "身体不舒服",
      "不敢看医生",
      "有毛病",
      "觉得有病",
      "身体有毛病",
      "不舒服",
      "不敢去检查",
      "得了大病",
      "怀疑是癌症",
      "越搜越害怕",
      "查出问题",
      "检查报告",
      "突然生病",
      "重病"
    ],
    "classic": [
      {
        "bookId": "b45",
        "reason": "如果你希望理解医疗决策中的价值取舍，可以留意人物如何表达自己在意的事。"
      },
      {
        "bookId": "b67",
        "reason": "如果你不知道就诊时该怎么描述症状、询问检查或讨论方案，可以从书中的就医情境了解医生如何思考，再准备自己的问题。"
      },
      {
        "bookId": "b69",
        "reason": "如果你想系统理解压力、健康行为和求医过程之间的联系，可以从研究方法、医疗服务或慢性疾病适应章节开始，而不必从头通读。"
      }
    ],
    "popular": [
      {
        "bookId": "b47",
        "reason": "如果你愿意接触患病者的个人视角，可以借它理解医疗选择之外的需要。"
      },
      {
        "bookId": "b48",
        "reason": "如果你想更了解医生如何面对复杂情况，可以从故事里整理想在就诊时询问的问题。"
      }
    ],
    "warning": true
  },
  "family": {
    "group": "relations",
    "short": "看见经历，练习边界",
    "intro": "家庭经历会影响我们理解关系的方式。阅读可以帮助整理经历、表达感受和思考边界，不要求你原谅或与家人和解。",
    "readingTip": "可以从一段与你相近的经历开始；如果阅读让你难以承受，先停下来，寻找可信任的人或专业支持。",
    "boundary": "书中案例与解释不是你家庭的完整事实。涉及持续控制或暴力时，不必独自处理。",
    "title": "原生家庭与童年创伤",
    "icon": "🏠",
    "keywords": [
      "原生家庭",
      "童年",
      "父母",
      "家暴",
      "家庭创伤",
      "童年创伤",
      "父亲",
      "母亲",
      "控制型父母",
      "有毒的父母",
      "情感勒索",
      "家人",
      "家庭关系",
      "缺爱",
      "被忽视",
      "被控制",
      "亲子关系",
      "偏心",
      "重男轻女",
      "打骂",
      "父母控制",
      "原生",
      "家人不理解",
      "家会伤人",
      "否定我",
      "打压",
      "PUA",
      "情感操控",
      "家庭",
      "控制欲",
      "阴影",
      "跟父母",
      "家里的事",
      "好好爱过",
      "干涉",
      "妈妈"
    ],
    "classic": [
      {
        "bookId": "b49",
        "reason": "如果家庭互动总让你自责，可以借案例辨认具体行为，思考自己需要哪些支持。"
      },
      {
        "bookId": "b50",
        "reason": "如果你更容易理解中文语境的家庭故事，可以把案例当作整理经历的起点。"
      }
    ],
    "popular": [
      {
        "bookId": "b51",
        "reason": "如果你很难拒绝家人的要求，可以留意具体压力如何出现，再思考可表达的界限。"
      },
      {
        "bookId": "b52",
        "reason": "如果你的感受常被“为你好”否定，可以借阅读区分照顾、要求与伤害。"
      }
    ],
    "warning": true
  },
  "sensitivity": {
    "group": "emotion",
    "short": "不必一直做到最好",
    "intro": "这里关注对评价的在意、自我苛责和完美要求。敏感的体验是真实的，但一个流行标签未必能解释你的全部处境。",
    "readingTip": "优先挑与当前困扰相近的章节，留意一个能够降低自我要求的小调整。",
    "boundary": "高敏感和多向思考等流行概念不等于医学诊断，也不应替代对持续困扰的评估。",
    "title": "高敏感与完美主义",
    "icon": "🦋",
    "keywords": [
      "高敏感",
      "敏感",
      "HSP",
      "完美主义",
      "完美",
      "容貌焦虑",
      "身材焦虑",
      "不够好",
      "自我苛责",
      "自我批评",
      "讨好型",
      "太在意别人",
      "脆弱",
      "敏感体质",
      "多愁善感",
      "害怕批评",
      "要求太高",
      "不允许自己犯错",
      "对自己不满意",
      "容貌",
      "外貌焦虑",
      "觉得自己不够好",
      "太敏感",
      "怕被批评",
      "自我攻击",
      "别人的情绪",
      "对自己要求",
      "自责",
      "语气",
      "影响情绪",
      "批评",
      "做到最好"
    ],
    "classic": [
      {
        "bookId": "b54",
        "reason": "如果你认为必须表现完美才能被接纳，可以借它观察自己对犯错的要求。"
      }
    ],
    "popular": [
      {
        "bookId": "b15",
        "reason": "如果你常被别人的期待牵着走，可以把其中的观点当作一次重新提问的机会。"
      },
      {
        "bookId": "b62",
        "reason": "如果过高的标准让你长期紧绷，可以观察这些标准带来的代价，再尝试更有弹性的要求。"
      },
      {
        "bookId": "b63",
        "reason": "如果他人的评价很容易变成自我否定，可以练习辨认内在批评和表达自己的需要。"
      },
      {
        "bookId": "b03",
        "reason": "如果你在犯错后很难善待自己，可以选一项自我关怀练习，按舒服的节奏尝试。"
      }
    ]
  },
  "couple": {
    "group": "relations",
    "short": "在靠近与离开之间",
    "intro": "这组书帮助你观察互动、需要与边界。没有一本书能替你决定一段关系要不要继续。",
    "readingTip": "先区分你想理解的是沟通、依恋需要，还是关系的基本安全；带着具体问题读，比给对方分类更有帮助。",
    "boundary": "依恋风格不是固定命运。遇到威胁、控制或暴力时，优先考虑安全与现实支持。",
    "title": "亲密关系与去留",
    "icon": "⚖️",
    "keywords": [
      "分手",
      "想分手",
      "该不该分手",
      "要不要分手",
      "还要不要继续",
      "冷战",
      "异地",
      "在一起",
      "合不合适",
      "感情变淡",
      "不爱他",
      "不爱她",
      "没感觉了",
      "亲密关系",
      "恋爱"
    ],
    "classic": [
      {
        "bookId": "b13",
        "reason": "如果你希望系统理解互动，而不只依靠一个流行标签，可以按问题挑选章节。"
      },
      {
        "bookId": "b56",
        "reason": "如果你想检视日常相处，可以和对方在愿意的情况下挑一个具体练习。"
      }
    ],
    "popular": [
      {
        "bookId": "b57",
        "reason": "如果你常在靠近与退缩之间拉扯，可以先用它描述需要，再看双方是否能回应。"
      },
      {
        "bookId": "b58",
        "reason": "如果你反复回想一段关系，可以借书中的问题整理具体经历，而不急着归咎于自己。"
      }
    ]
  },
  "breakup": {
    "group": "relations",
    "short": "为失去留一点时间",
    "intro": "分开后的难过、自我怀疑与反复想念，不必被催着结束。这组书提供理解关系与陪伴情绪的不同入口。",
    "readingTip": "读不进理论时可以先选故事；读到让你难受的段落，可以跳过。阅读不必成为另一项恢复任务。",
    "boundary": "书不会保证挽回关系或消除痛苦。若悲伤持续影响生活，或无法保证自身安全，请优先求助。",
    "title": "失恋与情感创伤",
    "icon": "🥀",
    "warning": true,
    "keywords": [
      "失恋",
      "分手",
      "被甩",
      "挽回",
      "前任",
      "忘不掉",
      "走不出来",
      "情伤",
      "恋爱脑",
      "被抛弃",
      "感情受伤",
      "被背叛",
      "出轨",
      "劈腿",
      "单恋",
      "暗恋",
      "放不下",
      "忘不了",
      "放不下前任",
      "被绿",
      "分手后",
      "表白被拒",
      "被拒",
      "分开",
      "抛下",
      "复合",
      "跟我分手",
      "重新在一起",
      "天天想他"
    ],
    "classic": [
      {
        "bookId": "b58",
        "reason": "如果你反复回想一段关系，可以借书中的问题整理具体经历，而不急着归咎于自己。"
      },
      {
        "bookId": "b13",
        "reason": "如果你希望系统理解互动，而不只依靠一个流行标签，可以按问题挑选章节。"
      }
    ],
    "popular": [
      {
        "bookId": "b24",
        "reason": "如果你只想先读一个故事，可以跟着人物看看难以说出的感受如何进入对话。"
      },
      {
        "bookId": "b60",
        "reason": "如果分手后总把原因归结为自己不够好，可以借工作表检视这些自我评价，而不必强迫自己立刻释怀。"
      }
    ]
  },
  "emotion_management": {
    "group": "emotion",
    "short": "理解感受，练习回应",
    "title": "情绪管理",
    "icon": "🌿",
    "intro": "烦躁、生气或情绪起伏时，可以先了解自己的反应，再尝试记录、暂停与表达需要。这组书关注日常情绪调节，不根据一句描述判断原因或诊断。",
    "readingTip": "想找具体方法，可以先选“尝试方法”；想了解概念，再读《情绪》。每次选一项练习，不必要求自己立刻平静。",
    "boundary": "管理情绪不等于压抑感受，也不意味着容忍伤害。若困扰持续影响生活，可以寻求专业支持；不必等读完书才求助。",
    "keywords": [
      "烦躁",
      "心烦",
      "易怒",
      "生气",
      "发脾气",
      "脾气大",
      "脾气不好",
      "火气大",
      "暴躁",
      "愤怒",
      "情绪管理",
      "管理情绪",
      "情绪调节",
      "调节情绪",
      "控制情绪",
      "平复情绪",
      "情绪不稳定",
      "情绪失控",
      "情绪波动",
      "稳定情绪",
      "控制不住脾气",
      "控制不住情绪",
      "控制不住发脾气",
      "容易发火",
      "容易生气",
      "一点就炸",
      "情绪起伏",
      "不想再发脾气"
    ],
    "classic": [
      {
        "bookId": "b61",
        "reason": "如果烦躁或怒气来得很快，可以从承受痛苦和情绪调节的一项技巧开始，尝试给反应留一点空间；需要这些技巧不等于患有BPD。"
      },
      {
        "bookId": "b60",
        "reason": "如果一件小事后情绪久久下不来，可以记录情境、想法、感受与行动，观察它们怎样相互影响。"
      }
    ],
    "popular": [
      {
        "bookId": "b03",
        "reason": "如果烦躁之后又责怪自己，可以选一个简短的自我关怀练习，按自己的节奏尝试，不必把情绪变成新的过错。"
      },
      {
        "bookId": "b26",
        "reason": "如果你想理解情绪如何形成，可以把书中的理论与具体经历对照，不把任何一种解释当作定论。"
      }
    ]
  },
  "connection": {
    "group": "relations",
    "short": "让感受被听见",
    "title": "孤独与被爱感",
    "icon": "🫂",
    "intro": "觉得没人爱自己，可能包含孤独、失落、被忽视或对自身价值的怀疑。这里从理解需要、寻找联结和回应自责出发，不凭一句话推断家庭经历或人格诊断。",
    "readingTip": "想先得到陪伴，可以从咨询故事读起；想尝试练习，可选自我关怀或自尊。准备深入了解关系时，再选读《亲密关系》的相关章节。",
    "boundary": "感到不被爱不等于你不值得被爱，也不能仅凭阅读判断他人的心意。阅读不能代替现实中的支持；若关系中存在持续伤害，应同时关注具体行为、处境与安全。",
    "keywords": [
      "没人爱我",
      "没有人爱我",
      "没人喜欢我",
      "没有人喜欢我",
      "没人关心我",
      "没有人关心我",
      "没人在乎我",
      "没有人在乎我",
      "不值得被爱",
      "不配被爱",
      "不被爱",
      "想被爱",
      "渴望被爱",
      "缺少陪伴",
      "没人陪我",
      "没有人陪我",
      "没人需要我",
      "没有人需要我",
      "没有归属感",
      "孤单",
      "孤独",
      "孤独感",
      "被孤立",
      "被遗忘"
    ],
    "classic": [
      {
        "bookId": "b16",
        "reason": "如果你觉得自己的难过无人理解，可以先读人物如何把失落与需要说出来；它提供故事中的陪伴，不替你判断现实中谁爱你。"
      },
      {
        "bookId": "b03",
        "reason": "如果感到不被爱时又开始责怪自己，可以从一个简短练习尝试回应痛苦；关怀自己不意味着独自承担关系中的所有问题。"
      }
    ],
    "popular": [
      {
        "bookId": "b63",
        "reason": "如果你把别人的疏远理解成“我不值得被爱”，可以观察内在批评，练习区分一次互动与对整个人的评价，同时看见真实的关系处境。"
      },
      {
        "bookId": "b13",
        "reason": "如果你想更深入理解归属、亲密需求和关系互动，可以选读相关章节；群体研究不能证明某个人是否爱你。"
      }
    ]
  }
};

const BOOK_CATALOG = {
  "b01": {
    "title": "焦虑的意义",
    "originalTitle": "The Meaning Of Anxiety",
    "aliases": [],
    "author": "罗洛·梅",
    "format": "心理学理论",
    "difficulty": "进阶",
    "reason": "如果你想理解自己在担心什么，可以借它整理焦虑背后的价值与不确定性。",
    "goals": [
      "understand"
    ],
    "caveat": "原作形成于20世纪中期，存在主义论述和当时的临床案例需要放回时代背景；它不是当代焦虑障碍的诊疗指南。",
    "topics": [
      "anxiety"
    ],
    "edition": {
      "title": "焦虑的意义",
      "language": "zh",
      "publisher": "广西师范大学出版社",
      "publishedAt": "2010-11",
      "isbn": "9787549500635",
      "url": "https://book.douban.com/subject/5361804/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b01.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s4539787.jpg",
      "url": "https://book.douban.com/subject/5361804/"
    },
    "synopsis": {
      "text": "作者检视了不同的焦虑理论，从哲学、生物学、心理学…",
      "url": "https://book.douban.com/subject/5361804/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 870,
        "url": "https://book.douban.com/subject/5361804/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Meaning of Anxiety",
        "url": "https://www.goodreads.com/book/show/22253782",
        "value": "4.22",
        "count": 796,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "罗洛·梅结合哲学、心理学与临床案例，梳理不同焦虑理论，讨论焦虑与自由、文化和创造的关系，以及正常焦虑与神经症性焦虑的区别。"
  },
  "b03": {
    "title": "静观自我关怀:勇敢爱自己的51项练习",
    "originalTitle": "",
    "aliases": [
      "静观自我关怀"
    ],
    "author": "克里斯汀·内夫 / 克里斯托弗·杰默",
    "format": "自助与练习",
    "difficulty": "入门",
    "reason": "如果焦虑之外还伴随自责，可以从一个短练习开始，看看如何回应当下的困难。",
    "goals": [
      "practice"
    ],
    "caveat": "这是练习手册，并非所有人都适合立即进行内观。唤起创伤记忆或明显不适时可以停止；完成练习也不意味着能够替代专业评估。",
    "topics": [
      "anxiety",
      "sensitivity",
      "emotion_management",
      "connection"
    ],
    "edition": {
      "title": "静观自我关怀:勇敢爱自己的51项练习",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2020-10",
      "isbn": "9787111661047",
      "url": "https://book.douban.com/subject/35219793/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b03.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s35349270.jpg",
      "url": "https://book.douban.com/subject/35219793/"
    },
    "synopsis": {
      "text": "你如何对待一个深陷困境的朋友，就如何对待自己，这…",
      "url": "https://book.douban.com/subject/35219793/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.7",
        "count": 317,
        "url": "https://book.douban.com/subject/35219793/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Mindful Self-Compassion Workbook by Kristin Neff | Goodreads",
        "url": "https://www.goodreads.com/book/show/42389207",
        "value": "4.46",
        "count": 1550,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "这本练习手册以正念、自我友善和共同人性为基础，通过分章说明、冥想与日常练习，介绍如何回应痛苦、内在批评和人际关系中的困难。"
  },
  "b04": {
    "title": "焦虑的人",
    "originalTitle": "FOLK MED ÅNGEST",
    "aliases": [],
    "author": "弗雷德里克·巴克曼",
    "format": "小说",
    "difficulty": "入门",
    "reason": "如果现在读不进心理学术语，可以通过人物的经历给自己的感受留一点空间。",
    "goals": [
      "story"
    ],
    "caveat": "这是以瑞典社会为背景的小说，有自杀与失落情节；人物获得的转机属于叙事安排，不能作为焦虑治疗效果的证据。",
    "topics": [
      "anxiety"
    ],
    "edition": {
      "title": "焦虑的人",
      "language": "zh",
      "publisher": "天津人民出版社",
      "publishedAt": "2021-8",
      "isbn": "9787201175133",
      "url": "https://book.douban.com/subject/35539713/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b04.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s33951431.jpg",
      "url": "https://book.douban.com/subject/35539713/"
    },
    "synopsis": {
      "text": "究竟是何种程度的无奈和绝望，迫使一个中年人在新年…",
      "url": "https://book.douban.com/subject/35539713/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.5",
        "count": 23591,
        "url": "https://book.douban.com/subject/35539713/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Anxious People",
        "url": "https://www.goodreads.com/book/show/56767313",
        "value": "4.16",
        "count": 891315,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "一场失败的银行抢劫把劫匪与一群看房者困在公寓，这部小说借警察讯问和人物交错的经历，写出普通人在婚姻、家庭与生活压力中的脆弱和牵挂。"
  },
  "b05": {
    "title": "搞定",
    "originalTitle": "Getting Things Done: The Art of Stress-Free Productivity",
    "aliases": [
      "搞定：无压工作的艺术"
    ],
    "author": "戴维·艾伦",
    "format": "行动方法",
    "difficulty": "进阶",
    "reason": "如果你卡在事情太多、不知从何开始，可以先尝试把一件待办改写为下一步动作。",
    "goals": [
      "practice"
    ],
    "caveat": "所选旧版早于如今的协作工具和工作环境；任务收集与复盘也需要时间，不能解决超额工作量、资源不足或管理制度问题。",
    "topics": [
      "procrastination"
    ],
    "edition": {
      "title": "搞定",
      "language": "zh",
      "publisher": "中信出版社",
      "publishedAt": "2010-6",
      "isbn": "9787508618944",
      "url": "https://book.douban.com/subject/4849382/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b05.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s6123366.jpg",
      "url": "https://book.douban.com/subject/4849382/"
    },
    "synopsis": {
      "text": "在今天这个信息量和工作量倍增的世界，一些老的工作…",
      "url": "https://book.douban.com/subject/4849382/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.2",
        "count": 3172,
        "url": "https://book.douban.com/subject/4849382/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Getting Things Done: The Art of Stress-Free Productivity by David Allen | Goodreads",
        "url": "https://www.goodreads.com/book/show/22521573",
        "value": "4.00",
        "count": 170905,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "戴维·艾伦介绍收集、明确、组织、回顾与行动的事务管理流程，通过清单、项目和下一步行动的安排，说明如何整理工作与生活中的待办事项。"
  },
  "b06": {
    "title": "拖延心理学",
    "originalTitle": "Procrastination: Why You Do It, What To Do About It Now",
    "aliases": [],
    "author": "简·博克 / 莱诺拉·袁",
    "format": "心理教育",
    "difficulty": "进阶",
    "reason": "如果你反复因为怕做不好而不开始，可以用书中的问题辨认自己在回避什么。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "以咨询经验和自助练习为主，不能用书中的解释判断拖延一定源于某种心理冲突；持续的注意、情绪或睡眠问题需要另行评估。",
    "topics": [
      "procrastination"
    ],
    "edition": {
      "title": "拖延心理学",
      "language": "zh",
      "publisher": "中国人民大学出版社",
      "publishedAt": "2009-12",
      "isbn": "9787300113906",
      "url": "https://book.douban.com/subject/4180711/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b06.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s4355925.jpg",
      "url": "https://book.douban.com/subject/4180711/"
    },
    "synopsis": {
      "text": "从学生到科学家，从秘书到总裁，从家庭主妇到销售员…",
      "url": "https://book.douban.com/subject/4180711/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.2",
        "count": 20012,
        "url": "https://book.douban.com/subject/4180711/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Procrastination",
        "url": "https://www.goodreads.com/book/show/1759271",
        "value": "3.95",
        "count": 2393,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "两位心理学家结合咨询和工作坊经验，讨论拖延与失败恐惧、控制感、时间观念及关系的联系，并提供观察拖延模式和安排任务的练习。"
  },
  "b07": {
    "title": "掌控习惯",
    "originalTitle": "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    "aliases": [],
    "author": "詹姆斯·克利尔",
    "format": "行动方法",
    "difficulty": "入门",
    "reason": "如果你知道要做什么却很难开始，可以试着减少一个动作的阻力，而不是只靠意志力。",
    "goals": [
      "practice"
    ],
    "caveat": "案例和习惯法则是实践启发，不是适用于每个人的因果定律；轮班、照护负担和健康限制会改变可执行的条件。",
    "topics": [
      "procrastination"
    ],
    "edition": {
      "title": "掌控习惯",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2019-7",
      "isbn": "9787559632265",
      "url": "https://book.douban.com/subject/34326931/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b07.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s33565235.jpg",
      "url": "https://book.douban.com/subject/34326931/"
    },
    "synopsis": {
      "text": "习惯形成需要4步：提示→渴求→反应→奖赏。提示触…",
      "url": "https://book.douban.com/subject/34326931/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.8",
        "count": 15701,
        "url": "https://book.douban.com/subject/34326931/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Atomic Habits by James Clear | Goodreads",
        "url": "https://www.goodreads.com/book/show/131118782",
        "value": "4.31",
        "count": 1419802,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "作者以提示、渴求、反应和奖赏解释习惯循环，结合个人故事与行为研究，介绍通过调整环境、行动门槛和反馈来建立或改变日常习惯的方法。"
  },
  "b12": {
    "title": "斯坦福大学人生设计课",
    "originalTitle": "Designing Your Life: How to Build a Well-Lived, Joyful Life",
    "aliases": [
      "斯坦福人生设计课"
    ],
    "author": "比尔·伯内特 / 戴夫·伊万斯",
    "format": "探索与练习",
    "difficulty": "入门",
    "reason": "如果你一直等待唯一正确的方向，可以先设计两个低成本的小试验。",
    "goals": [
      "practice"
    ],
    "caveat": "原型探索与访谈需要时间、人脉或试错空间；美国高校和就业环境中的做法，应结合自身经济条件及当地机会调整。",
    "topics": [
      "career",
      "meaning"
    ],
    "edition": {
      "title": "斯坦福大学人生设计课",
      "language": "zh",
      "publisher": "中信出版社",
      "publishedAt": "2017-12-20",
      "isbn": "9787508677835",
      "url": "https://book.douban.com/subject/27601926/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b12.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s29639731.jpg",
      "url": "https://book.douban.com/subject/27601926/"
    },
    "synopsis": {
      "text": "人生并不存在唯一的最优解，人生也不可能被完美规划…",
      "url": "https://book.douban.com/subject/27601926/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.7",
        "count": 5173,
        "url": "https://book.douban.com/subject/27601926/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Designing Your Life by Bill Burnett | Goodreads",
        "url": "https://www.goodreads.com/book/show/26046334",
        "value": "3.90",
        "count": 23631,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "两位人生设计课程教师把设计思维用于生活与职业探索，以工作观、生活观、多个未来方案及原型访谈等练习，介绍在尝试中修订方向的过程。"
  },
  "b13": {
    "title": "亲密关系（第6版）",
    "originalTitle": "Intimate Relationship",
    "aliases": [
      "亲密关系"
    ],
    "author": "罗兰·米勒",
    "format": "研究综述 / 教材",
    "difficulty": "较难",
    "reason": "如果你希望系统理解互动，而不只依靠一个流行标签，可以按问题挑选章节。",
    "goals": [
      "understand"
    ],
    "caveat": "所选为第6版教材，研究综述不包含其后全部进展；群体层面的关系规律不能直接预测某个人或判定一段关系的去留。",
    "topics": [
      "relationship",
      "couple",
      "breakup",
      "connection"
    ],
    "edition": {
      "title": "亲密关系（第6版）",
      "language": "zh",
      "publisher": "人民邮电出版社",
      "publishedAt": "2015-6",
      "isbn": "9787115390578",
      "url": "https://book.douban.com/subject/26585065/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b13.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s34340992.jpg",
      "url": "https://book.douban.com/subject/26585065/"
    },
    "synopsis": {
      "text": "亲密关系与泛泛之交有什么区别？大丈夫与小女子真的…",
      "url": "https://book.douban.com/subject/26585065/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.2",
        "count": 32921,
        "url": "https://book.douban.com/subject/26585065/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Intimate Relationships by Rowland S. Miller | Goodreads",
        "url": "https://www.goodreads.com/book/show/25639797",
        "value": "4.28",
        "count": 882,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "这部社会心理学教材综合亲密关系研究，围绕吸引、依恋、沟通、权力、冲突与关系变化展开，结合实验、调查和生活实例解释人与人如何相处。"
  },
  "b14": {
    "title": "非暴力沟通",
    "originalTitle": "Nonviolent Communication: A Language of Life",
    "aliases": [],
    "author": "马歇尔·卢森堡",
    "format": "沟通框架",
    "difficulty": "入门",
    "reason": "如果你容易把委屈说成指责，可以用框架先整理一次对话中自己的需要。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "沟通步骤需要双方有基本的安全与合作空间；遭受胁迫、暴力或权力压迫时，措辞技巧不能代替保护和外部支持。",
    "topics": [
      "relationship"
    ],
    "edition": {
      "title": "非暴力沟通",
      "language": "zh",
      "publisher": "华夏出版社",
      "publishedAt": "2009-1",
      "isbn": "9787508051000",
      "url": "https://book.douban.com/subject/3533221/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b14.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29710777.jpg",
      "url": "https://book.douban.com/subject/3533221/"
    },
    "synopsis": {
      "text": "作为一个遵纪守法的好人，也许我们从来没有想过和“…",
      "url": "https://book.douban.com/subject/3533221/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.4",
        "count": 75295,
        "url": "https://book.douban.com/subject/3533221/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Nonviolent Communication: A Language of Compassion by Marshall B. Rosenberg | Goodreads",
        "url": "https://www.goodreads.com/book/show/71733",
        "value": "4.32",
        "count": 52210,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "马歇尔·卢森堡结合沟通案例，介绍区分观察与评价、表达感受和需要、提出具体请求的方式，并讨论倾听、愤怒及冲突中的相互理解。"
  },
  "b15": {
    "title": "被讨厌的勇气",
    "originalTitle": "嫌われる勇気：自己啓発の源流「アドラー」の教え",
    "aliases": [],
    "author": "岸见一郎 / 古贺史健",
    "format": "心理学思想 / 对话",
    "difficulty": "入门",
    "reason": "如果你常被别人的期待牵着走，可以把其中的观点当作一次重新提问的机会。",
    "goals": [
      "understand"
    ],
    "caveat": "以阿德勒思想展开的哲学对话带有鲜明立场，不是创伤研究综述；其中强调个人选择的论述，不应理解为受害者应为遭遇负责。",
    "topics": [
      "relationship",
      "self",
      "sensitivity"
    ],
    "edition": {
      "title": "被讨厌的勇气",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2015-4",
      "isbn": "9787111495482",
      "url": "https://book.douban.com/subject/26369699/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b15.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s33828853.jpg",
      "url": "https://book.douban.com/subject/26369699/"
    },
    "synopsis": {
      "text": "「被讨厌的勇气」并不是要去吸引被讨厌的负向能量，…",
      "url": "https://book.douban.com/subject/26369699/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.5",
        "count": 148283,
        "url": "https://book.douban.com/subject/26369699/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Courage to be Disliked by Ichiro Kishimi | Goodreads",
        "url": "https://www.goodreads.com/book/show/43973038",
        "value": "3.90",
        "count": 163976,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "本书以哲人与青年的对话介绍阿德勒心理学，围绕自卑、人际关系、课题分离与共同体感觉，讨论个人怎样理解过去、选择行动和面对他人评价。"
  },
  "b16": {
    "title": "也许你该找个人聊聊",
    "originalTitle": "Maybe You Should Talk to Someone",
    "aliases": [],
    "author": "洛莉·戈特利布",
    "format": "心理咨询叙事",
    "difficulty": "入门",
    "reason": "如果你对咨询有好奇或顾虑，可以借故事了解其中可能出现的谈话与关系。",
    "goals": [
      "story",
      "understand"
    ],
    "caveat": "属于治疗师叙事与个人经验，人物经过写作处理；美国心理咨询的流程和资源不等于各地现实，也不能保证你会得到同样的咨询经历。",
    "topics": [
      "relationship",
      "mood",
      "connection"
    ],
    "edition": {
      "title": "也许你该找个人聊聊",
      "language": "zh",
      "publisher": "上海文化出版社",
      "publishedAt": "2021-7-28",
      "isbn": "9787553522838",
      "url": "https://book.douban.com/subject/35481512/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b16.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s33944153.jpg",
      "url": "https://book.douban.com/subject/35481512/"
    },
    "synopsis": {
      "text": "这是一位心理治疗师的回忆录，讲述了发生在诊室中的…",
      "url": "https://book.douban.com/subject/35481512/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 64942,
        "url": "https://book.douban.com/subject/35481512/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Maybe You Should Talk to Someone: A Therapist, Her Therapist, and Our Lives Revealed by Lori Gottlieb | Goodreads",
        "url": "https://www.goodreads.com/book/show/44645030",
        "value": "4.36",
        "count": 427675,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "一位心理治疗师交织书写来访者的咨询经历与自己接受治疗的过程，以回忆录呈现失落、亲密、疾病和改变，也记录治疗关系中的困惑与觉察。"
  },
  "b17": {
    "title": "如何阅读一本书",
    "originalTitle": "How to Read a Book: The Classic Guide to Intelligent Reading",
    "aliases": [],
    "author": "莫提默·艾德勒 / 查尔斯·范多伦",
    "format": "阅读方法",
    "difficulty": "进阶",
    "reason": "如果你读完常觉得没有抓住重点，可以先学着给一章内容提出自己的问题。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "侧重严肃论说类书籍和西方经典的分析阅读；小说、工具书、数字信息与休闲阅读不必全部照同一套步骤完成。",
    "topics": [
      "learning"
    ],
    "edition": {
      "title": "如何阅读一本书",
      "language": "zh",
      "publisher": "商务印书馆",
      "publishedAt": "2004-1",
      "isbn": "9787100040945",
      "url": "https://book.douban.com/subject/1013208/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b17.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s1670978.jpg",
      "url": "https://book.douban.com/subject/1013208/"
    },
    "synopsis": {
      "text": "每本书的封面之下都有一套自己的骨架，作为一个分析…",
      "url": "https://book.douban.com/subject/1013208/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 81474,
        "url": "https://book.douban.com/subject/1013208/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "How to Read a Book",
        "url": "https://www.goodreads.com/book/show/461901",
        "value": "3.98",
        "count": 29152,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "本书把阅读分为基础、检视、分析和主题阅读，说明如何辨认一本书的结构、论点与论证，并讨论文学、历史、科学及哲学作品的不同读法。"
  },
  "b18": {
    "title": "认知天性",
    "originalTitle": "Make It Stick: The Science of Successful Learning",
    "aliases": [],
    "author": "彼得·布朗 / 亨利·罗迪格三世 / 马克·麦克丹尼尔",
    "format": "学习科学科普",
    "difficulty": "进阶",
    "reason": "如果你常用重读检查自己学会没有，可以试着合上材料回忆，再用反馈纠正。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "书中的学习研究涉及特定任务和实验条件；检索练习、间隔等原则应用到不同学科时，仍需检验理解与实际表现，不能只追求记住。",
    "topics": [
      "learning"
    ],
    "edition": {
      "title": "认知天性",
      "language": "zh",
      "publisher": "中信出版社",
      "publishedAt": "2018-10",
      "isbn": "9787508694672",
      "url": "https://book.douban.com/subject/30353486/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b18.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29897337.jpg",
      "url": "https://book.douban.com/subject/30353486/"
    },
    "synopsis": {
      "text": "哪些 “良性干扰”能提升学习效果 / 别在无法克…",
      "url": "https://book.douban.com/subject/30353486/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.8",
        "count": 8041,
        "url": "https://book.douban.com/subject/30353486/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Make It Stick: The Science of Successful Learning by Peter C. Brown | Goodreads",
        "url": "https://www.goodreads.com/book/show/18770267",
        "value": "4.15",
        "count": 23979,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "三位作者结合认知心理学研究和学习案例，讨论检索练习、间隔学习、交错练习与知识迁移，解释熟悉感为何可能与真正掌握知识并不一致。"
  },
  "b19": {
    "title": "学习之道",
    "originalTitle": "A Mind for Numbers: How to Excel at Math and Science (Even If You Flunked Algebra)",
    "aliases": [],
    "author": "芭芭拉·奥克利",
    "format": "学习方法",
    "difficulty": "入门",
    "reason": "如果你觉得某门课怎么都学不进去，可以挑一个具体任务尝试书中的练习安排。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "以数学和科学学习为主要场景；对学习状态的说明是通俗模型，不应当作神经机制的完整解释，也不能替代学科教学与练习反馈。",
    "topics": [
      "learning"
    ],
    "edition": {
      "title": "学习之道",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2016-11",
      "isbn": "9787111552062",
      "url": "https://book.douban.com/subject/26895988/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b19.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s29105126.jpg",
      "url": "https://book.douban.com/subject/26895988/"
    },
    "synopsis": {
      "text": "本书从脑科学和心理学的研究出发，跨学科解读学习的…",
      "url": "https://book.douban.com/subject/26895988/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.8",
        "count": 5781,
        "url": "https://book.douban.com/subject/26895988/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "A Mind for Numbers: How to Excel at Math and Science by Barbara Oakley | Goodreads",
        "url": "https://www.goodreads.com/book/show/23732793",
        "value": "4.19",
        "count": 22557,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "芭芭拉·奥克利结合自身学习经历与认知研究，介绍专注和发散思考、分块、回忆与练习等方法，重点讨论数学和科学学习中的理解与记忆。"
  },
  "b20": {
    "title": "卡片笔记写作法",
    "originalTitle": "How to Take Smart Notes",
    "aliases": [],
    "author": "申克·阿伦斯",
    "format": "写作与笔记",
    "difficulty": "进阶",
    "reason": "如果你积累很多摘抄却难以写作，可以先把一条摘抄改写成自己的说明并建立一个关联。",
    "goals": [
      "practice"
    ],
    "caveat": "主要服务长期阅读、写作与知识积累；卡片和链接本身不保证产出，短期考试或简单任务未必值得建立整套笔记系统。",
    "topics": [
      "learning"
    ],
    "edition": {
      "title": "卡片笔记写作法",
      "language": "zh",
      "publisher": "人民邮电出版社",
      "publishedAt": "2021-7",
      "isbn": "9787115564672",
      "url": "https://book.douban.com/subject/35503571/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b20.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s33927783.jpg",
      "url": "https://book.douban.com/subject/35503571/"
    },
    "synopsis": {
      "text": "详细解释了卡片盒笔记写作法的工作原理和具体写作方…",
      "url": "https://book.douban.com/subject/35503571/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.7",
        "count": 9498,
        "url": "https://book.douban.com/subject/35503571/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "How to Take Smart Notes",
        "url": "https://www.goodreads.com/book/show/34507927",
        "value": "4.06",
        "count": 14585,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "作者介绍以卢曼笔记实践为参照的卡片笔记法，说明如何记录阅读、用自己的话形成永久笔记并建立连接，把知识积累与论证写作结合起来。"
  },
  "b21": {
    "title": "伯恩斯新情绪疗法",
    "originalTitle": "Feeling good: the new mood therapy",
    "aliases": [],
    "author": "大卫·伯恩斯",
    "format": "自助与练习",
    "difficulty": "进阶",
    "reason": "如果你常在一次挫折后否定自己，可以借练习区分事件、想法与感受。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "自助认知练习和书中量表不等于诊断，也不是所有抑郁经历都能仅靠改变想法缓解；严重或持续困扰应由专业人员评估。",
    "topics": [
      "mood"
    ],
    "edition": {
      "title": "伯恩斯新情绪疗法",
      "language": "zh",
      "publisher": "中国城市出版社",
      "publishedAt": "2011-1",
      "isbn": "9787507423655",
      "url": "https://book.douban.com/subject/5980113/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b21.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s27184468.jpg",
      "url": "https://book.douban.com/subject/5980113/"
    },
    "synopsis": {
      "text": "你是否总感到焦虑、抑郁、内疚、自卑、孤独、挫折、…",
      "url": "https://book.douban.com/subject/5980113/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 6207,
        "url": "https://book.douban.com/subject/5980113/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Feeling Good by David D. Burns | Goodreads",
        "url": "https://www.goodreads.com/book/show/10345040",
        "value": "4.06",
        "count": 34653,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "戴维·伯恩斯以认知疗法为框架，结合案例、情绪记录和练习，讨论负性思维、自我评价及拖延等问题，并介绍检视想法与安排活动的方法。"
  },
  "b22": {
    "title": "我们为什么要睡觉？",
    "originalTitle": "Why We Sleep: Unlocking the Power of Sleep and Dreams",
    "aliases": [
      "我们为什么要睡觉"
    ],
    "author": "马修·沃克",
    "format": "睡眠科普",
    "difficulty": "进阶",
    "reason": "如果你想理解睡眠的作用，可以按兴趣阅读，不必把每段风险描述套到自己身上。",
    "goals": [
      "understand"
    ],
    "caveat": "属于睡眠科学的通俗叙述，群体统计不能用来预测个人会患什么病；不必把某一晚或某个睡眠时长当成健康成败的判决。",
    "topics": [
      "mood"
    ],
    "edition": {
      "title": "我们为什么要睡觉？",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2021-3",
      "isbn": "9787559648600",
      "url": "https://book.douban.com/subject/35332778/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b22.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s34204162.jpg",
      "url": "https://book.douban.com/subject/35332778/"
    },
    "synopsis": {
      "text": "为什么要睡觉，睡不好有什么坏处，怎么睡个好觉，一…",
      "url": "https://book.douban.com/subject/35332778/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.4",
        "count": 11610,
        "url": "https://book.douban.com/subject/35332778/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Why We Sleep",
        "url": "https://www.goodreads.com/book/show/36234689",
        "value": "4.36",
        "count": 238606,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "马修·沃克以睡眠研究和案例介绍睡眠阶段、昼夜节律与梦，讨论睡眠同记忆、情绪及身体健康的联系，以及咖啡因、作息和社会环境的影响。"
  },
  "b23": {
    "title": "改善情绪的正念疗法",
    "originalTitle": "The Mindful Way Through Depression: Freeing Yourself from Chronic Unhappiness",
    "aliases": [],
    "author": "马克·威廉姆斯 / 约翰·蒂斯代尔 / 辛德尔·西格尔 / 乔·卡巴金",
    "format": "自助与练习",
    "difficulty": "进阶",
    "reason": "如果你反复被同一段想法拉走，可以了解怎样留意它，而不是立刻与它争辩。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "包含持续训练安排，阅读与练习需要投入；急性重度低落或练习使痛苦加剧时，不应把完成课程当作获得帮助的前提。",
    "topics": [
      "mood"
    ],
    "edition": {
      "title": "改善情绪的正念疗法",
      "language": "zh",
      "publisher": "中国人民大学出版社",
      "publishedAt": "2009-10",
      "isbn": "9787300109213",
      "url": "https://book.douban.com/subject/4062809/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b23.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s3998713.jpg",
      "url": "https://book.douban.com/subject/4062809/"
    },
    "synopsis": {
      "text": "本书中所介绍的冥想训练可以帮助你以一种全新的方式…",
      "url": "https://book.douban.com/subject/4062809/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.9",
        "count": 1736,
        "url": "https://book.douban.com/subject/4062809/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Mindful Way through Depression: Freeing Yourself from Chronic Unhappiness by J. Mark G. Williams | Goodreads",
        "url": "https://www.goodreads.com/book/show/2936666",
        "value": "4.00",
        "count": 9193,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "这本正念练习读物讨论低落情绪、反刍与抑郁复发的联系，以身体觉察、呼吸和日常活动练习，介绍观察想法与感受而不急于作出反应的方式。"
  },
  "b24": {
    "title": "蛤蟆先生去看心理医生",
    "originalTitle": "Counselling For Toads: A Psychological Adventure",
    "aliases": [],
    "author": "罗伯特·德韦尔",
    "format": "心理咨询寓言",
    "difficulty": "入门",
    "reason": "如果你只想先读一个故事，可以跟着人物看看难以说出的感受如何进入对话。",
    "goals": [
      "story",
      "understand"
    ],
    "caveat": "这是借虚构人物讲解心理咨询的寓言，主要采用沟通分析视角；短篇故事压缩了咨询过程，不代表所有流派和真实疗程。",
    "topics": [
      "mood",
      "breakup"
    ],
    "edition": {
      "title": "蛤蟆先生去看心理医生",
      "language": "zh",
      "publisher": "天津人民出版社",
      "publishedAt": "2020-8-1",
      "isbn": "9787201161693",
      "url": "https://book.douban.com/subject/35143790/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b24.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s33941998.jpg",
      "url": "https://book.douban.com/subject/35143790/"
    },
    "synopsis": {
      "text": "蛤蟆先生一向爱笑爱闹，如今却一反常态地郁郁寡欢，…",
      "url": "https://book.douban.com/subject/35143790/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 196225,
        "url": "https://book.douban.com/subject/35143790/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Counselling for Toads: A Psychological Adventure by Robert De Board | Goodreads",
        "url": "https://www.goodreads.com/book/show/16524360",
        "value": "4.28",
        "count": 5822,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "这部寓言式心理咨询故事借蛤蟆与苍鹭的十次会谈，介绍沟通分析中的自我状态和人生脚本，讲述蛤蟆如何回顾童年、理解情绪与人际互动。"
  },
  "b26": {
    "title": "情绪",
    "originalTitle": "How Emotions Are Made",
    "aliases": [],
    "author": "莉莎·费德曼·巴瑞特",
    "format": "情绪科学科普",
    "difficulty": "进阶",
    "reason": "如果你想跳出“情绪只是失控”的理解，可以比较这套理论如何解释一个具体经历。",
    "goals": [
      "understand"
    ],
    "caveat": "主要介绍作者的情绪建构理论，带有明确理论立场；读它有助比较不同解释，但不应把单一理论当作情绪科学的全部共识。",
    "topics": [
      "mood",
      "emotion_management"
    ],
    "edition": {
      "title": "情绪",
      "language": "zh",
      "publisher": "中信出版社",
      "publishedAt": "2019-2",
      "isbn": "9787508697857",
      "url": "https://book.douban.com/subject/30443490/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b26.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s31459215.jpg",
      "url": "https://book.douban.com/subject/30443490/"
    },
    "synopsis": {
      "text": "每一天，我们都会带着情绪醒来，也会带着情绪入睡。…",
      "url": "https://book.douban.com/subject/30443490/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.0",
        "count": 1574,
        "url": "https://book.douban.com/subject/30443490/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "How Emotions Are Made: The Secret Life of the Brain by Lisa Feldman Barrett | Goodreads",
        "url": "https://www.goodreads.com/book/show/57892970",
        "value": "4.09",
        "count": 13870,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "莉莎·费尔德曼·巴瑞特以实验、脑科学研究和生活案例阐述情绪建构理论，讨论身体感觉、概念、预测与文化如何参与形成不同的情绪体验。"
  },
  "b27": {
    "title": "自卑与超越",
    "originalTitle": "What Life Should Mean to You",
    "aliases": [],
    "author": "阿尔弗雷德·阿德勒",
    "format": "心理学理论",
    "difficulty": "进阶",
    "reason": "如果你常以不足评价自己，可以借它观察自己怎样理解困难和与他人的联系。",
    "goals": [
      "understand"
    ],
    "caveat": "原作属于20世纪早期的个体心理学，家庭角色、性别与社会规范带有当时背景；其中概括不能直接用来解释现代每个人的成长经历。",
    "topics": [
      "self"
    ],
    "edition": {
      "title": "自卑与超越",
      "language": "zh",
      "publisher": "汕头大学出版社",
      "publishedAt": "2010-6",
      "isbn": "9787811203714",
      "url": "https://book.douban.com/subject/3389960/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b27.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s4441345.jpg",
      "url": "https://book.douban.com/subject/3389960/"
    },
    "synopsis": {
      "text": "他的心理学观点不仅适用于父母和子女间的关系，而且…",
      "url": "https://book.douban.com/subject/3389960/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.5",
        "count": 14520,
        "url": "https://book.douban.com/subject/3389960/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "What Life Could Mean to You by Alfred Adler | Goodreads",
        "url": "https://www.goodreads.com/book/show/30755547",
        "value": "3.84",
        "count": 2380,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "阿德勒从个体心理学出发，借案例讨论自卑感、生活风格、童年经验与社会兴趣，并把职业、友谊和爱情作为理解个人生活方式的重要问题。"
  },
  "b28": {
    "title": "人格心理学",
    "originalTitle": "",
    "aliases": [],
    "author": "杰里·伯格",
    "format": "研究综述 / 教材",
    "difficulty": "较难",
    "reason": "如果你希望更系统地理解人与人的差异，可以先选一个理论，再看相关研究如何检验它。",
    "goals": [
      "understand"
    ],
    "caveat": "这是一部有阅读门槛的教材；所选旧版未覆盖此后全部研究，人格维度与流派的介绍也不能用来给自己或他人作临床诊断。",
    "topics": [
      "self"
    ],
    "edition": {
      "title": "人格心理学",
      "language": "zh",
      "publisher": "中国轻工业出版社",
      "publishedAt": "2010-3",
      "isbn": "9787501973422",
      "url": "https://book.douban.com/subject/4244803/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b28.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s4396931.jpg",
      "url": "https://book.douban.com/subject/4244803/"
    },
    "synopsis": {
      "text": "本书围绕精神分析理论、特质理论、生物学流派、行为…",
      "url": "https://book.douban.com/subject/4244803/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.9",
        "count": 1690,
        "url": "https://book.douban.com/subject/4244803/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Personality by Jerry M. Burger | Goodreads",
        "url": "https://www.goodreads.com/book/show/20805158",
        "value": "4.08",
        "count": 273,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "这部人格心理学教材系统介绍精神分析、特质、生物学、行为主义、人本主义和认知等取向，结合研究与案例比较它们对人格差异的解释。"
  },
  "b29": {
    "title": "突破天性",
    "originalTitle": "Me，Myself，and Us",
    "aliases": [],
    "author": "布莱恩·利特尔",
    "format": "人格科学科普",
    "difficulty": "进阶",
    "reason": "如果你担心自己的性格限制了选择，可以观察哪些情境容许你采取不同的行动。",
    "goals": [
      "understand"
    ],
    "caveat": "以人格研究和案例解释个体差异，不能据此断言职业适配或人生轨迹；“突破天性”不意味着可以无限忽略疲劳、环境与能力边界。",
    "topics": [
      "self"
    ],
    "edition": {
      "title": "突破天性",
      "language": "zh",
      "publisher": "浙江人民出版社",
      "publishedAt": "2018-9-15",
      "isbn": "9787213088711",
      "url": "https://book.douban.com/subject/30325723/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b29.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29869100.jpg",
      "url": "https://book.douban.com/subject/30325723/"
    },
    "synopsis": {
      "text": "● 你是否认为自己是某种性格的人？你是不是坚信大…",
      "url": "https://book.douban.com/subject/30325723/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.9",
        "count": 502,
        "url": "https://book.douban.com/subject/30325723/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Me, Myself, and Us: The Science of Personality and the Art of Well-Being by Brian Little | Goodreads",
        "url": "https://www.goodreads.com/book/show/25898237",
        "value": "3.91",
        "count": 1572,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "人格心理学家布赖恩·利特尔结合研究、案例和个人项目，讨论稳定特质与情境、自由特质的关系，呈现人在性格倾向之外行动和改变的可能。"
  },
  "b31": {
    "title": "精神障碍诊断与统计手册(第5版)(DSM-5)",
    "originalTitle": "Diagnostic and Statistical Manual of Mental Disorders, DSM-5, 5th Edition",
    "aliases": [
      "精神障碍诊断与统计手册（第五版）"
    ],
    "author": "美国精神医学学会",
    "format": "专业参考",
    "difficulty": "较难",
    "reason": "如果你有专业学习需求，可以查阅这个历史版本的分类，并对照现行更新资料理解变化。",
    "goals": [
      "understand"
    ],
    "caveat": "这是供专业人员使用的分类与诊断参考，所选DSM-5不是其后的DSM-5-TR及更新文本；不能对照条目自行确诊或评价伴侣。",
    "caveatSources": [
      {
        "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/updates-to-dsm/updates-to-dsm-5-tr-criteria-text",
        "label": "APA：DSM-5-TR更新说明"
      }
    ],
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "精神障碍诊断与统计手册(第5版)(DSM-5)",
      "language": "zh",
      "publisher": "北京大学出版社",
      "publishedAt": "2015-7",
      "isbn": "9787301258125",
      "url": "https://book.douban.com/subject/26603084/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b31.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s34567276.jpg",
      "url": "https://book.douban.com/subject/26603084/"
    },
    "synopsis": {
      "text": "美国精神病学会的《精神障碍诊断及统计手册》（DS…",
      "url": "https://book.douban.com/subject/26603084/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.3",
        "count": 395,
        "url": "https://book.douban.com/subject/26603084/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Diagnostic and Statistical Manual of Mental Disorders DSM-5 by American Psychiatric Association | Goodreads",
        "url": "https://www.goodreads.com/book/show/40651539",
        "value": "4.16",
        "count": 4293,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "professional",
    "clinicalContext": true,
    "summary": "这是美国精神医学学会第五版精神障碍分类与诊断参考手册，按类别列出诊断标准、相关特征及鉴别要点，主要面向受过专业训练的临床人员。"
  },
  "b32": {
    "title": "边缘型人格障碍生存指南",
    "originalTitle": "",
    "aliases": [],
    "author": "亚历山大·查普曼 / 金·格拉茨",
    "format": "心理教育 / 自助",
    "difficulty": "进阶",
    "reason": "如果你正在寻求或接受帮助，可以从治疗选择与支持资源部分了解能向专业人员问什么。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "围绕已识别的BPD问题讲解应对，内容和医疗资源带有出版时期与地区背景；不是确诊工具，读者也不必因为部分描述相似就接受这个标签。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "边缘型人格障碍生存指南",
      "language": "zh",
      "publisher": "北京大学医学出版社",
      "publishedAt": "2016-6-1",
      "isbn": "9787565913730",
      "url": "https://book.douban.com/subject/26943184/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b32.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s29243686.jpg",
      "url": "https://book.douban.com/subject/26943184/"
    },
    "synopsis": {
      "text": "第一部分提供了BPD的一般信息和数据信息…",
      "url": "https://www.sinobook.com.cn/book/newsdetail.cfm?iCntno=17711",
      "label": "北京大学医学出版社供稿的同ISBN版本简介",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.5",
        "count": 231,
        "url": "https://book.douban.com/subject/26943184/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Borderline Personality Disorder Survival Guide: Everything You Need to Know About Living with BPD by Alexander L. Chapman | Goodreads",
        "url": "https://www.goodreads.com/book/show/2097142",
        "value": "3.98",
        "count": 1151,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "这本面向边缘型人格障碍相关读者的心理教育读物，介绍诊断概念、可能的形成因素、治疗选择和情绪应对，并讨论寻求支持与维持关系的问题。"
  },
  "b33": {
    "title": "萦绕不安的自我",
    "originalTitle": "The Haunted Self: Structural Dissociation and the Treatment of Chronic Traumatization",
    "aliases": [],
    "author": "翁·范德哈特 / 艾尔玛·奈恩胡斯 / 凯西·斯蒂尔",
    "format": "专业理论",
    "difficulty": "较难",
    "reason": "如果你已有相关学习基础，可以把它作为了解特定创伤理论的参考。",
    "goals": [
      "understand"
    ],
    "caveat": "这是以结构性分离理论为主线的专业著作，术语密集且涉及创伤材料；一种理论模型不等于所有创伤经历的解释，也不适合自行套用治疗技术。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "萦绕不安的自我",
      "language": "zh",
      "publisher": "商务印书馆",
      "publishedAt": "2020-9",
      "isbn": "9787100177740",
      "url": "https://book.douban.com/subject/35238408/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b33.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s34771868.jpg",
      "url": "https://book.douban.com/subject/35238408/"
    },
    "synopsis": {
      "text": "本书阐释如何为长期心理创伤幸存者提供有效的心理治…",
      "url": "https://book.douban.com/subject/35238408/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.3",
        "count": 381,
        "url": "https://book.douban.com/subject/35238408/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Haunted Self: Structural Dissociation and the Treatment of Chronic Traumatization by Onno van der Hart | Goodreads",
        "url": "https://www.goodreads.com/book/show/23510920",
        "value": "4.42",
        "count": 417,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "professional",
    "clinicalContext": true,
    "summary": "这部临床专著阐述作者提出的人格结构解离理论，结合创伤文献与治疗经验，介绍长期创伤相关问题的概念化及分阶段治疗，面向专业读者。"
  },
  "b34": {
    "title": "身体从未忘记",
    "originalTitle": "The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma",
    "aliases": [],
    "author": "贝塞尔·范德科尔克",
    "format": "创伤科普 / 临床叙事",
    "difficulty": "进阶",
    "reason": "如果你想了解创伤为何可能影响日常体验，可以从与你有关的章节开始。",
    "goals": [
      "understand"
    ],
    "caveat": "创伤案例可能引起强烈情绪，书中介绍多种干预并不意味着它们证据强度相同；理解身体反应不等于能靠阅读自行完成创伤治疗。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "身体从未忘记",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2016-3",
      "isbn": "9787111532637",
      "url": "https://book.douban.com/subject/26796536/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b34.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s28731910.jpg",
      "url": "https://book.douban.com/subject/26796536/"
    },
    "synopsis": {
      "text": "本书是一部深入探讨心理创伤及其治疗的杰作。 通过…",
      "url": "https://book.douban.com/subject/26796536/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 6209,
        "url": "https://book.douban.com/subject/26796536/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma by Bessel van der Kolk | Goodreads",
        "url": "https://www.goodreads.com/book/show/29914879",
        "value": "4.33",
        "count": 312807,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "贝塞尔·范德考克结合临床经历、创伤研究与个案，讨论创伤对身体、记忆和关系的影响，并介绍心理、药物及身体取向等不同干预思路。"
  },
  "b35": {
    "title": "不原谅也没关系",
    "originalTitle": "Complex PTSD: From Surviving to Thriving",
    "aliases": [],
    "author": "皮特·沃克",
    "format": "创伤自助",
    "difficulty": "入门",
    "reason": "如果你想整理成长经历带来的反复感受，可以把其中建议作为与支持者讨论的线索。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "主要来自作者的临床经验和自助框架；“四种反应”等归类可辅助反思，但不等于诊断标准，也不能替代对现实安全和支持条件的评估。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "不原谅也没关系",
      "language": "zh",
      "publisher": "北京科学技术出版社",
      "publishedAt": "2023-1-1",
      "isbn": "9787571425517",
      "url": "https://book.douban.com/subject/36132802/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b35.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s34343531.jpg",
      "url": "https://book.douban.com/subject/36132802/"
    },
    "synopsis": {
      "text": "创伤事件不仅仅包括偶发的、严重的刺激性事件（如战…",
      "url": "https://book.douban.com/subject/36132802/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.9",
        "count": 16958,
        "url": "https://book.douban.com/subject/36132802/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Complex PTSD: From Surviving to Thriving by Pete Walker | Goodreads",
        "url": "https://www.goodreads.com/book/show/60187330",
        "value": "4.53",
        "count": 15311,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "皮特·沃克结合临床经验与个人经历讨论复杂性创伤，介绍情绪闪回、内在批评、哀悼及关系困难，并提出面向日常生活的自我照顾思路。"
  },
  "b36": {
    "title": "与内心的恐惧对话",
    "originalTitle": "Stop Walking on Eggshells",
    "aliases": [
      "亲密的陌生人"
    ],
    "author": "保罗·梅森 / 兰迪·克雷格",
    "format": "关系支持 / 心理教育",
    "difficulty": "入门",
    "reason": "如果你正在支持一个有明确相关需要的人，可以借它思考自己的需要和可承受的帮助。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "主要从亲友如何应对BPD相关关系困难的角度写作，叙述视角有所偏重；设立边界不等于控制、惩罚对方或自行给对方确诊。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "与内心的恐惧对话",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2020-2",
      "isbn": "9787559635273",
      "url": "https://book.douban.com/subject/34979471/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b36.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s33596736.jpg",
      "url": "https://book.douban.com/subject/34979471/"
    },
    "synopsis": {
      "text": "本书是第一本写给边缘性人格障碍者亲友的疗愈之书，…",
      "url": "https://book.douban.com/subject/34979471/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 415,
        "url": "https://book.douban.com/subject/34979471/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Stop Walking on Eggshells by Paul T. Mason | Goodreads",
        "url": "https://www.goodreads.com/book/show/215053176",
        "value": "4.02",
        "count": 13657,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": true,
    "summary": "这本面向边缘型人格障碍者亲友的读物，结合案例介绍相关行为和关系困境，讨论沟通、界限与支持，也关注亲友自身的需要及安全。"
  },
  "b38": {
    "title": "富爸爸，穷爸爸",
    "originalTitle": "Rich Dad, Poor Dad",
    "aliases": [
      "富爸爸穷爸爸"
    ],
    "author": "罗伯特·T·清崎 / 莎伦·L·莱希特",
    "format": "财务观念 / 个人经验",
    "difficulty": "入门",
    "reason": "如果你从未整理自己的现金流，可以把它作为提出基础问题的起点。",
    "goals": [
      "understand"
    ],
    "caveat": "以个人叙事和美国资产、税务环境为主，不是适用于各地的投资教材；“资产”“负债”的通俗用法也不等同会计定义，不宜照搬负债或投资案例。",
    "topics": [
      "money"
    ],
    "edition": {
      "title": "富爸爸，穷爸爸",
      "language": "zh",
      "publisher": "世界图书出版公司",
      "publishedAt": "2000-09",
      "isbn": "9787506246743",
      "url": "https://book.douban.com/subject/1033778/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b38.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s11229869.jpg",
      "url": "https://book.douban.com/subject/1033778/"
    },
    "synopsis": {
      "text": "“富爸爸”的观念，即不要做金钱的奴隶，要让金钱为…",
      "url": "https://book.douban.com/subject/1033778/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 83482,
        "url": "https://book.douban.com/subject/1033778/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Rich Dad Poor Dad by Robert T. Kiyosaki | Goodreads",
        "url": "https://www.goodreads.com/book/show/27917357",
        "value": "4.08",
        "count": 766601,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "作者以两位父亲对金钱的不同看法组织个人叙事，介绍他对资产、负债、现金流和财务教育的理解，并以创业与投资故事阐述其财富观。"
  },
  "b39": {
    "title": "邻家的百万富翁",
    "originalTitle": "The Millionaire Next Door",
    "aliases": [],
    "author": "托马斯·斯坦利 / 威廉·丹科",
    "format": "财务调查 / 经验",
    "difficulty": "进阶",
    "reason": "如果你容易用消费水平判断财务状况，可以借它重新区分收入、支出与净资产。",
    "goals": [
      "understand"
    ],
    "caveat": "观察对象主要是特定年代的美国富裕家庭，存在样本和社会制度边界；描述富人的习惯，不能证明照做就能致富，也不能用来责备收入受限的人。",
    "topics": [
      "money"
    ],
    "edition": {
      "title": "邻家的百万富翁",
      "language": "zh",
      "publisher": "海南出版社",
      "publishedAt": "1998-08",
      "isbn": "9787806452110",
      "url": "https://book.douban.com/subject/1042567/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b39.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s1818237.jpg",
      "url": "https://book.douban.com/subject/1042567/"
    },
    "synopsis": {
      "text": "本书内容主要围绕着典型案例展开，并且常常采用正反…",
      "url": "https://book.douban.com/subject/1042567/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.4",
        "count": 1970,
        "url": "https://book.douban.com/subject/1042567/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Millionaire Next Door by Thomas J. Stanley | Goodreads",
        "url": "https://www.goodreads.com/book/show/50926504",
        "value": "4.06",
        "count": 139250,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "两位作者根据对美国富裕家庭的调查与访谈，以案例和统计描述其消费、储蓄、职业与家庭安排，讨论财富积累与外在富裕形象的差别。"
  },
  "b40": {
    "title": "金钱心理学",
    "originalTitle": "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
    "aliases": [],
    "author": "摩根·豪泽尔",
    "format": "财务行为 / 随笔",
    "difficulty": "入门",
    "reason": "如果你常在消费或投资后后悔，可以留意自己在追求什么、能承受什么。",
    "goals": [
      "understand"
    ],
    "caveat": "以故事说明金钱行为中的心理因素，并非系统的资产配置或风险测量方法；美国市场经历及个体案例不能保证未来收益。",
    "topics": [
      "money"
    ],
    "edition": {
      "title": "金钱心理学",
      "language": "zh",
      "publisher": "民主与建设出版社",
      "publishedAt": "2023-6",
      "isbn": "9787513941242",
      "url": "https://book.douban.com/subject/36415996/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b40.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s34540496.jpg",
      "url": "https://book.douban.com/subject/36415996/"
    },
    "synopsis": {
      "text": "一辈子做普通工作，靠什么积累巨额财富？ 对比高风…",
      "url": "https://book.douban.com/subject/36415996/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.2",
        "count": 17528,
        "url": "https://book.douban.com/subject/36415996/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Psychology of Money: Timeless lessons on wealth, greed, and happiness by Morgan Housel | Goodreads",
        "url": "https://www.goodreads.com/book/show/214299804",
        "value": "4.27",
        "count": 370052,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "摩根·豪泽尔通过历史轶事和人物故事，讨论运气、风险、时间、欲望与个人经历如何影响金钱决策，以及财富积累和守成中的行为差异。"
  },
  "b41": {
    "title": "小狗钱钱",
    "originalTitle": "Ein Hund Namens Money",
    "aliases": [],
    "author": "博多·舍费尔",
    "format": "财务启蒙 / 故事",
    "difficulty": "入门",
    "reason": "如果你觉得财务术语难以接近，可以借故事先认识预算与目标这些基本问题。",
    "goals": [
      "story",
      "practice"
    ],
    "caveat": "这是面向入门读者的理财童话，情节简化了家庭资源、市场风险与收入差异；储蓄故事不能替代对真实金融产品和风险的了解。",
    "topics": [
      "money"
    ],
    "edition": {
      "title": "小狗钱钱",
      "language": "zh",
      "publisher": "南海出版公司",
      "publishedAt": "2009-2-1",
      "isbn": "9787544243889",
      "url": "https://book.douban.com/subject/3576486/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b41.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s6530133.jpg",
      "url": "https://book.douban.com/subject/3576486/"
    },
    "synopsis": {
      "text": "《小狗钱钱》主要内容：吉娅是一个普通的12岁女孩…",
      "url": "https://book.douban.com/subject/3576486/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.1",
        "count": 55024,
        "url": "https://book.douban.com/subject/3576486/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "A Dog Called Money by Bodo Schäfer | Goodreads",
        "url": "https://www.goodreads.com/book/show/208493138",
        "value": "4.46",
        "count": 2877,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "这部理财童话讲述女孩吉娅与会说话的小狗钱钱的故事，通过她赚钱、储蓄及学习投资的经历，把目标、预算与金钱观融入儿童可读的情节。"
  },
  "b42": {
    "title": "活出生命的意义",
    "originalTitle": "Man's Search for Meaning",
    "aliases": [],
    "author": "维克多·弗兰克尔",
    "format": "回忆 / 意义探索",
    "difficulty": "入门",
    "reason": "如果你想接触一种理解意义的视角，可以从作者的经历与提问出发。",
    "goals": [
      "story",
      "understand"
    ],
    "caveat": "包含集中营经历与意义治疗观点，阅读可能沉重；寻找意义是一种可能的应对方式，不是对受苦者的要求，更不意味着苦难本身值得赞美。",
    "topics": [
      "meaning"
    ],
    "edition": {
      "title": "活出生命的意义",
      "language": "zh",
      "publisher": "华夏出版社",
      "publishedAt": "2010-6",
      "isbn": "9787508058993",
      "url": "https://book.douban.com/subject/5330333/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b42.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s6235123.jpg",
      "url": "https://book.douban.com/subject/5330333/"
    },
    "synopsis": {
      "text": "更将自己的经验与学术结合，开创了意义疗法，替人们…",
      "url": "https://book.douban.com/subject/5330333/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.5",
        "count": 29384,
        "url": "https://book.douban.com/subject/5330333/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Man's Search for Meaning by Viktor E. Frankl | Goodreads",
        "url": "https://www.goodreads.com/book/show/1044863",
        "value": "4.37",
        "count": 945681,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "维克多·弗兰克尔以集中营幸存经历为叙事起点，介绍意义疗法对自由、责任与生活意义的理解，讨论人在极端处境中如何回应自身的存在。"
  },
  "b43": {
    "title": "西西弗神话",
    "originalTitle": "Le Mythe de Sisyphe",
    "aliases": [],
    "author": "阿尔贝·加缪",
    "format": "哲学随笔",
    "difficulty": "较难",
    "reason": "如果你希望认真思考重复与无意义感，可以把它当作与一种哲学立场的对话。",
    "goals": [
      "understand"
    ],
    "caveat": "这是具有20世纪欧洲背景的哲学随笔，不是心理危机干预手册；讨论荒诞与自杀的段落可能沉重，处于危机中应先获得现实支持。",
    "topics": [
      "meaning"
    ],
    "edition": {
      "title": "西西弗神话",
      "language": "zh",
      "publisher": "上海译文出版社",
      "publishedAt": "2013-8",
      "isbn": "9787532761838",
      "url": "https://book.douban.com/subject/24257403/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b43.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s33556519.jpg",
      "url": "https://book.douban.com/subject/24257403/"
    },
    "synopsis": {
      "text": "他主张要在荒诞中奋起反抗，在绝望中坚持真理和正义…",
      "url": "https://book.douban.com/subject/24257403/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.8",
        "count": 20938,
        "url": "https://book.douban.com/subject/24257403/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Myth of Sisyphus by Albert Camus | Goodreads",
        "url": "https://www.goodreads.com/book/show/39947376",
        "value": "4.16",
        "count": 110732,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "加缪以西西弗的神话形象探讨人的意义诉求与世界沉默之间的荒诞，通过哲学论辩和文学分析，讨论反抗、自由及在有限生命中生活的态度。"
  },
  "b45": {
    "title": "最好的告别",
    "originalTitle": "Being Mortal: Medicine and What Matters in the End",
    "aliases": [],
    "author": "阿图·葛文德",
    "format": "医疗叙事",
    "difficulty": "进阶",
    "reason": "如果你希望理解医疗决策中的价值取舍，可以留意人物如何表达自己在意的事。",
    "goals": [
      "story",
      "understand"
    ],
    "caveat": "以美国医疗与养老经验为重要背景；保险、照护和临终决策的制度条件与其他地区不同，个案不能替代本人及家属与当地专业人员的讨论。",
    "topics": [
      "health"
    ],
    "edition": {
      "title": "最好的告别",
      "language": "zh",
      "publisher": "浙江人民出版社",
      "publishedAt": "2015-7-31",
      "isbn": "9787213067792",
      "url": "https://book.douban.com/subject/26576861/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b45.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s28260907.jpg",
      "url": "https://book.douban.com/subject/26576861/"
    },
    "synopsis": {
      "text": "当独立、自助的生活不能再维持时，我们该怎么办？在…",
      "url": "https://book.douban.com/subject/26576861/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 57839,
        "url": "https://book.douban.com/subject/26576861/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Being Mortal: Medicine and What Matters in the End by Atul Gawande | Goodreads",
        "url": "https://www.goodreads.com/book/show/25848382",
        "value": "4.49",
        "count": 226746,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "外科医生阿图·葛文德结合病人故事、家庭经历与养老调查，讨论衰老、失能和临终医疗，追问医学选择怎样容纳患者对尊严、关系与生活的重视。"
  },
  "b47": {
    "title": "当呼吸化为空气",
    "originalTitle": "When Breath Becomes Air",
    "aliases": [],
    "author": "保罗·卡拉尼什",
    "format": "疾病回忆录",
    "difficulty": "入门",
    "reason": "如果你愿意接触患病者的个人视角，可以借它理解医疗选择之外的需要。",
    "goals": [
      "story"
    ],
    "caveat": "这是医生个人的患病与生命回忆，包含死亡和丧失；个人选择和疾病进程无法概括他人的经历，也不是治疗方案或预后依据。",
    "topics": [
      "health"
    ],
    "edition": {
      "title": "当呼吸化为空气",
      "language": "zh",
      "publisher": "浙江文艺出版社",
      "publishedAt": "2016-11",
      "isbn": "9787533946562",
      "url": "https://book.douban.com/subject/26896859/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b47.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29423902.jpg",
      "url": "https://book.douban.com/subject/26896859/"
    },
    "synopsis": {
      "text": "自此，他开始以医生和患者的双重身份，记录自己的余…",
      "url": "https://book.douban.com/subject/26896859/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.9",
        "count": 35856,
        "url": "https://book.douban.com/subject/26896859/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "When Breath Becomes Air by Paul Kalanithi | Goodreads",
        "url": "https://www.goodreads.com/book/show/25613396",
        "value": "4.41",
        "count": 858479,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "神经外科医生保罗·卡拉尼什在确诊晚期肺癌后书写这部回忆录，以医生和患者的双重经历回望医学训练、家庭与死亡，思考有限生命中的价值。"
  },
  "b48": {
    "title": "医生的修炼",
    "originalTitle": "Complications : A Surgeon's Notes on an Imperfect Science",
    "aliases": [],
    "author": "阿图·葛文德",
    "format": "医疗叙事",
    "difficulty": "入门",
    "reason": "如果你想更了解医生如何面对复杂情况，可以从故事里整理想在就诊时询问的问题。",
    "goals": [
      "story",
      "understand"
    ],
    "caveat": "主要以美国外科训练中的故事讨论医学的不确定性，案例有年代与制度背景；无法据此判断具体医生水平或决定个人是否接受某项治疗。",
    "topics": [
      "health"
    ],
    "edition": {
      "title": "医生的修炼",
      "language": "zh",
      "publisher": "浙江人民出版社",
      "publishedAt": "2015-8",
      "isbn": "9787213067914",
      "url": "https://book.douban.com/subject/26579966/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b48.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s28283450.jpg",
      "url": "https://book.douban.com/subject/26579966/"
    },
    "synopsis": {
      "text": "新手医生阿图满怀抱负进入梦想中的白色巨塔，他将遇…",
      "url": "https://book.douban.com/subject/26579966/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.6",
        "count": 3567,
        "url": "https://book.douban.com/subject/26579966/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Complications: A Surgeon's Notes on an Imperfect Science by Atul Gawande | Goodreads",
        "url": "https://www.goodreads.com/book/show/818328",
        "value": "4.28",
        "count": 53680,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "阿图·葛文德通过外科行医经历、病例与医学调查，描写医生面对错误、复杂判断和无法解释的病情时的处境，讨论医疗的不确定性与职业责任。"
  },
  "b49": {
    "title": "原生家庭",
    "originalTitle": "Toxic Parents",
    "aliases": [
      "原生家庭：如何修补自己的性格缺陷"
    ],
    "author": "苏珊·福沃德 / 克雷格·巴克",
    "format": "家庭关系 / 自助",
    "difficulty": "进阶",
    "reason": "如果家庭互动总让你自责，可以借案例辨认具体行为，思考自己需要哪些支持。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "以家庭伤害和自助修复为视角，不涵盖家庭关系的全部面貌；书中的类型与案例不能替代对依赖关系、文化条件和现实安全的具体判断。",
    "topics": [
      "family"
    ],
    "edition": {
      "title": "原生家庭",
      "language": "zh",
      "publisher": "北京时代华文书局",
      "publishedAt": "2018-8",
      "isbn": "9787569918816",
      "url": "https://book.douban.com/subject/30199434/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b49.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29746097.jpg",
      "url": "https://book.douban.com/subject/30199434/"
    },
    "synopsis": {
      "text": "不健康的家庭体系，就像高速公路上的连环追尾，其恶…",
      "url": "https://book.douban.com/subject/30199434/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 18842,
        "url": "https://book.douban.com/subject/30199434/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Toxic Parents: Overcoming Their Hurtful Legacy and Reclaiming Your Life by Susan Forward | Goodreads",
        "url": "https://www.goodreads.com/book/show/103999",
        "value": "4.16",
        "count": 16648,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "苏珊·福沃德结合咨询案例讨论控制、羞辱、忽视与暴力等家庭互动，分析它们同成年生活的联系，并介绍表达感受、辨认责任和设立界限的思路。"
  },
  "b50": {
    "title": "为何家会伤人",
    "originalTitle": "",
    "aliases": [],
    "author": "武志红",
    "format": "家庭关系 / 临床随笔",
    "difficulty": "进阶",
    "reason": "如果你更容易理解中文语境的家庭故事，可以把案例当作整理经历的起点。",
    "goals": [
      "understand"
    ],
    "caveat": "所选早期版本是面向大众的家庭与成长专栏结集，以案例分析为主；精神分析式解释并非因果证明，不宜把所有当下困难都追溯成父母的责任。",
    "topics": [
      "family"
    ],
    "edition": {
      "title": "为何家会伤人",
      "language": "zh",
      "publisher": "世界图书出版公司",
      "publishedAt": "2007-5",
      "isbn": "9787506286725",
      "url": "https://book.douban.com/subject/2080764/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b50.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s28069478.jpg",
      "url": "https://book.douban.com/subject/2080764/"
    },
    "synopsis": {
      "text": "本书精选“健康·心理”专栏32篇阐述家庭教育与个…",
      "url": "https://book.douban.com/subject/2080764/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.1",
        "count": 8033,
        "url": "https://book.douban.com/subject/2080764/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "为何家会伤人 by 武志红 | Goodreads",
        "url": "https://www.goodreads.com/book/show/161876432",
        "value": "4.12",
        "count": 25,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "武志红围绕家庭教育和个人成长汇集心理随笔，以咨询及生活案例讨论亲子互动、情感需要与关系模式，呈现其对中国家庭问题的理解。"
  },
  "b51": {
    "title": "情感勒索",
    "originalTitle": "Emotional Blackmail：When the People in Your Life Use Fear, Obligation, and Guilt to Manipulate You",
    "aliases": [],
    "author": "苏珊·福沃德",
    "format": "关系边界 / 自助",
    "difficulty": "入门",
    "reason": "如果你很难拒绝家人的要求，可以留意具体压力如何出现，再思考可表达的界限。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "“情感勒索”是帮助识别互动的通俗框架，不是临床诊断；一次冲突不等于稳定的操纵模式，回应方式还要考虑权力差异和安全。",
    "topics": [
      "personality",
      "family"
    ],
    "edition": {
      "title": "情感勒索",
      "language": "zh",
      "publisher": "四川人民出版社",
      "publishedAt": "2018-10",
      "isbn": "9787220107665",
      "url": "https://book.douban.com/subject/30235060/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b51.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29780037.jpg",
      "url": "https://book.douban.com/subject/30235060/"
    },
    "synopsis": {
      "text": "情感勒索者利用恐惧感、责任感和罪恶感，控制了他们…",
      "url": "https://book.douban.com/subject/30235060/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.1",
        "count": 3654,
        "url": "https://book.douban.com/subject/30235060/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Emotional Blackmail by Susan Forward | Goodreads",
        "url": "https://www.goodreads.com/book/show/63265573",
        "value": "4.09",
        "count": 4339,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "苏珊·福沃德与唐娜·弗雷泽借家庭、伴侣和职场案例，分析以恐惧、责任及内疚施加压力的互动，介绍识别这种模式、表达立场与设立界限的方法。"
  },
  "b52": {
    "title": "为了你好",
    "originalTitle": "Am Anfang war Erziehung",
    "aliases": [],
    "author": "爱丽丝·米勒",
    "format": "家庭关系 / 历史论述",
    "difficulty": "进阶",
    "reason": "如果你的感受常被“为你好”否定，可以借阅读区分照顾、要求与伤害。",
    "goals": [
      "understand"
    ],
    "caveat": "结合历史人物与精神分析阐释养育中的伤害，解释带有理论立场；历史个案不能单独证明童年经验必然导致某种人格或行为。",
    "topics": [
      "family"
    ],
    "edition": {
      "title": "为了你好",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2024-7",
      "isbn": "9787559675828",
      "url": "https://book.douban.com/subject/36850961/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b52.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s34882553.jpg",
      "url": "https://book.douban.com/subject/36850961/"
    },
    "synopsis": {
      "text": "■ “骂你是让你长记性，这是为了你好！”“不打不…",
      "url": "https://book.douban.com/subject/36850961/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.1",
        "count": 187,
        "url": "https://book.douban.com/subject/36850961/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "For Your Own Good: Hidden Cruelty in Child-Rearing and the Roots of Violence by Alice Miller | Goodreads",
        "url": "https://www.goodreads.com/book/show/19119810",
        "value": "4.25",
        "count": 2304,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "爱丽丝·米勒借历史人物与个案批判以孩子利益为名的压制和暴力教育，从精神分析视角讨论童年经历与成年行为，以及暴力如何在代际间延续。"
  },
  "b54": {
    "title": "脆弱的力量",
    "originalTitle": "The Gifts of Imperfection",
    "aliases": [],
    "author": "布琳·布朗",
    "format": "自我接纳 / 大众心理",
    "difficulty": "进阶",
    "reason": "如果你认为必须表现完美才能被接纳，可以借它观察自己对犯错的要求。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "围绕脆弱、羞耻与勇气展开，案例具有美国文化背景；公开脆弱需要信任与安全，并不适用于所有家庭、职场和权力关系。",
    "topics": [
      "sensitivity"
    ],
    "edition": {
      "title": "脆弱的力量",
      "language": "zh",
      "publisher": "浙江人民出版社",
      "publishedAt": "2014-5",
      "isbn": "9787213060496",
      "url": "https://book.douban.com/subject/25880948/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b54.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s27275974.jpg",
      "url": "https://book.douban.com/subject/25880948/"
    },
    "synopsis": {
      "text": "我们常常困扰于那些负面的经历和情绪，如脆弱、羞耻…",
      "url": "https://book.douban.com/subject/25880948/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.1",
        "count": 894,
        "url": "https://book.douban.com/subject/25880948/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Gifts of Imperfection",
        "url": "https://www.goodreads.com/book/show/7015403",
        "value": "4.24",
        "count": 231410,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "布琳·布朗结合访谈研究与个人故事，围绕羞耻、脆弱、归属和不完美提出十项生活指引，讨论自我接纳、创造、休息与日常选择的关系。"
  },
  "b56": {
    "title": "幸福的婚姻",
    "originalTitle": "The Seven Principles for Making Marriage Work",
    "aliases": [],
    "author": "约翰·戈特曼 / 娜恩·西尔弗",
    "format": "关系方法",
    "difficulty": "入门",
    "reason": "如果你想检视日常相处，可以和对方在愿意的情况下挑一个具体练习。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "主要围绕婚姻互动与双方练习展开，案例和研究有样本与文化边界；关系暴力、胁迫或单方拒绝合作不能只靠沟通练习解决。",
    "topics": [
      "couple"
    ],
    "edition": {
      "title": "幸福的婚姻",
      "language": "zh",
      "publisher": "浙江人民出版社",
      "publishedAt": "2014-2",
      "isbn": "9787213058417",
      "url": "https://book.douban.com/subject/25833051/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b56.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s28338686.jpg",
      "url": "https://book.douban.com/subject/25833051/"
    },
    "synopsis": {
      "text": "书中戈特曼博士用大数据还原婚姻关系的真相，并总结…",
      "url": "https://book.douban.com/subject/25833051/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 2561,
        "url": "https://book.douban.com/subject/25833051/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Seven Principles for Making Marriage Work by John M. Gottman | Goodreads",
        "url": "https://www.goodreads.com/book/show/78671",
        "value": "4.26",
        "count": 37426,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "约翰·戈特曼与娜恩·西尔弗结合伴侣观察研究及案例，提出经营婚姻的七项原则，并以问答和练习讨论友谊、冲突、共同意义与关系修复。"
  },
  "b57": {
    "title": "关系的重建",
    "originalTitle": "",
    "aliases": [],
    "author": "阿米尔·莱文 / 蕾切尔·赫尔勒",
    "format": "依恋科普 / 关系方法",
    "difficulty": "入门",
    "reason": "如果你常在靠近与退缩之间拉扯，可以先用它描述需要，再看双方是否能回应。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "用依恋类型解释亲密关系，便于入门也会简化情境；依恋倾向不是固定身份，不能凭伴侣的一两次行为分类或代替去留判断。",
    "topics": [
      "couple"
    ],
    "edition": {
      "title": "关系的重建",
      "language": "zh",
      "publisher": "台海出版社",
      "publishedAt": "2018-9",
      "isbn": "9787516820308",
      "url": "https://book.douban.com/subject/30320071/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b57.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s34019776.jpg",
      "url": "https://book.douban.com/subject/30320071/"
    },
    "synopsis": {
      "text": "在《关系的重建》一书中，阿米尔·莱文与蕾切尔·赫…",
      "url": "https://book.douban.com/subject/30320071/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.8",
        "count": 2332,
        "url": "https://book.douban.com/subject/30320071/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Attached: The New Science of Adult Attachment and How It Can Help You Find—and Keep—Love by Amir Levine | Goodreads",
        "url": "https://www.goodreads.com/book/show/9547888",
        "value": "4.12",
        "count": 134014,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "两位作者以成人依恋理论解释亲密关系中的焦虑、回避与安全倾向，结合案例和沟通建议，讨论伴侣选择、亲密需求与冲突中的互动模式。"
  },
  "b58": {
    "title": "我们为什么不爱了",
    "originalTitle": "",
    "aliases": [],
    "author": "曹雪敏",
    "format": "关系科普",
    "difficulty": "进阶",
    "reason": "如果你反复回想一段关系，可以借书中的问题整理具体经历，而不急着归咎于自己。",
    "goals": [
      "understand",
      "story"
    ],
    "caveat": "属于作者对亲密关系及咨询经验的梳理，案例和论述不等于适用于所有伴侣的研究结论；无法仅凭书中的故事决定一段关系该不该结束。",
    "topics": [
      "couple",
      "breakup"
    ],
    "edition": {
      "title": "我们为什么不爱了",
      "language": "zh",
      "publisher": "上海三联书店",
      "publishedAt": "2025-9",
      "isbn": "9787542690029",
      "url": "https://book.douban.com/subject/37557543/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b58.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s35259569.jpg",
      "url": "https://book.douban.com/subject/37557543/"
    },
    "synopsis": {
      "text": "围绕爱与亲密关系中的12个议题，针对性地展开一次…",
      "url": "https://book.douban.com/subject/37557543/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 473,
        "url": "https://book.douban.com/subject/37557543/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "not_found",
        "checkedAt": "2026-10-17"
      }
    },
    "audience": "general",
    "clinicalContext": false,
    "summary": "曹雪敏结合咨询案例、文化故事与自身经历，围绕分手、背叛、性别和权力等议题讨论当代亲密关系，呈现失去关系后理解自己与重建生活的思路。"
  },
  "b60": {
    "title": "理智胜过情感（第二版）",
    "aliases": [
      "理智胜过情感"
    ],
    "author": "丹尼斯·格林伯格 / 克里斯提娜·A. 帕蒂斯凯",
    "originalTitle": "Mind Over Mood",
    "format": "认知行为练习",
    "difficulty": "进阶",
    "goals": [
      "understand",
      "practice"
    ],
    "topics": [
      "anxiety",
      "mood",
      "breakup",
      "emotion_management"
    ],
    "clinicalContext": true,
    "reason": "如果你想把反复出现的想法、情绪和行动分开梳理，可以用其中的工作表，从一个具体情境开始练习。",
    "caveat": "工作表需要时间和反复练习，量表不用于自行确诊。书名不意味着理智应压过感受，也不能把现实困境归结为想法错误；严重或持续的痛苦需要专业评估。",
    "caveatSources": [
      {
        "label": "Reading Well 心理健康阅读书目",
        "url": "https://oxfordhealth.nhs.uk/wp-content/uploads/sites/40/2025/02/Reading-well-for-mental-health.pdf"
      }
    ],
    "audience": "general",
    "edition": {
      "title": "理智胜过情感（第二版）",
      "language": "zh",
      "publisher": "中国轻工业出版社",
      "publishedAt": "2018-2",
      "isbn": "9787518416509",
      "url": "https://book.douban.com/subject/30132647/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b60.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29679650.jpg",
      "url": "https://book.douban.com/subject/30132647/"
    },
    "synopsis": {
      "text": "为读者们提供了一系列引导问题、提示和工作表…",
      "url": "https://book.douban.com/subject/30132647/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 273,
        "url": "https://book.douban.com/subject/30132647/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "3.96",
        "count": 5501,
        "url": "https://www.goodreads.com/book/show/25329836",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "Mind Over Mood"
      }
    },
    "summary": "这本认知行为练习手册以案例、引导问题和工作表介绍情境、想法、情绪与行为的联系，逐步说明如何记录体验、检视解释并尝试不同的行动。"
  },
  "b61": {
    "title": "辩证行为疗法",
    "aliases": [],
    "author": "马修·麦克凯 / 杰弗里·伍德 / 杰弗里·布兰特里",
    "originalTitle": "The Dialectical Behavior Therapy Skills Workbook",
    "format": "情绪调节练习",
    "difficulty": "进阶",
    "goals": [
      "practice"
    ],
    "topics": [
      "personality",
      "emotion_management"
    ],
    "clinicalContext": true,
    "reason": "如果情绪来得很强、关系冲突后很难平复，可以从承受痛苦或人际效能的一项技巧开始，观察它是否适合你。",
    "caveat": "这是技能练习书，不等同于完整的辩证行为治疗，也不用于确认BPD。所选2018年中文版早于英文第二版；遇到自伤风险、创伤反应或练习明显加重不适时，应先获得专业支持。",
    "audience": "general",
    "edition": {
      "title": "辩证行为疗法",
      "language": "zh",
      "publisher": "重庆大学出版社",
      "publishedAt": "2018-1",
      "isbn": "9787568909129",
      "url": "https://book.douban.com/subject/30312244/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b61.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29855890.jpg",
      "url": "https://book.douban.com/subject/30312244/"
    },
    "synopsis": {
      "text": "提前准备好应对技巧并希望其发挥作用…",
      "url": "https://book.douban.com/subject/30312244/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 313,
        "url": "https://book.douban.com/subject/30312244/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "4.26",
        "count": 5297,
        "url": "https://www.goodreads.com/book/show/10044055",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "The Dialectical Behavior Therapy Skills Workbook"
      }
    },
    "summary": "这本辩证行为疗法技能练习手册围绕正念、痛苦耐受、情绪调节和人际效能展开，配合案例与分步练习，介绍面对强烈情绪和互动困难的技巧。"
  },
  "b62": {
    "title": "克服完美主义",
    "aliases": [],
    "author": "罗兹·沙夫曼 / 莎拉·伊根 / 特蕾西·韦德",
    "originalTitle": "Overcoming Perfectionism",
    "format": "认知行为练习",
    "difficulty": "进阶",
    "goals": [
      "understand",
      "practice"
    ],
    "topics": [
      "procrastination",
      "sensitivity"
    ],
    "reason": "如果你因怕做不好而迟迟不开始，可以用其中的小实验，尝试调整对自己的要求，而不必先把自己变成一个完美的练习者。",
    "caveat": "适合处理僵硬标准带来的困扰，不是要求放弃认真或忽视真实的考核压力。所选中文版不包含其后英文修订版的全部内容；自助练习的负担和支持需求因人而异。",
    "caveatSources": [
      {
        "label": "作者团队的研究与资源说明",
        "url": "https://www.overcomingperfectionism.com/the-evidence"
      }
    ],
    "audience": "general",
    "clinicalContext": false,
    "edition": {
      "title": "克服完美主义",
      "language": "zh",
      "publisher": "上海社会科学院出版社",
      "publishedAt": "2018-6",
      "isbn": "9787552022087",
      "url": "https://book.douban.com/subject/30271066/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b62.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29816082.jpg",
      "url": "https://book.douban.com/subject/30271066/"
    },
    "synopsis": {
      "text": "打造一个个性化的、系统性的改变计划…",
      "url": "https://book.douban.com/subject/30271066/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.8",
        "count": 240,
        "url": "https://book.douban.com/subject/30271066/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "3.83",
        "count": 325,
        "url": "https://www.goodreads.com/book/show/49578411",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "Overcoming Perfectionism"
      }
    },
    "summary": "三位作者以认知行为方法讨论完美主义的维持机制，通过自我观察、思维检视与行为实验，介绍如何评估过高标准的代价并制定个人练习计划。"
  },
  "b63": {
    "title": "自尊（原书第4版）",
    "aliases": [
      "自尊"
    ],
    "author": "马修·麦凯 / 帕特里克·范宁",
    "originalTitle": "Self-Esteem: A Proven Program of Cognitive Techniques for Assessing, Improving, and Maintaining Your Self-Esteem",
    "format": "自尊与自我评价练习",
    "difficulty": "进阶",
    "goals": [
      "understand",
      "practice"
    ],
    "topics": [
      "self",
      "sensitivity",
      "connection"
    ],
    "reason": "如果你经常用苛刻的语言评价自己，可以从识别内在批评和表达需要的练习开始，寻找更具体、平衡的自我评价。",
    "caveat": "自尊不是给人分高低的标准，书中练习也不是诊断工具。工作条件、歧视、经济与关系中的伤害会真实影响自我感受；不能仅靠改变解释消除这些处境。",
    "audience": "general",
    "clinicalContext": false,
    "edition": {
      "title": "自尊（原书第4版）",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2018-12",
      "isbn": "9787111613275",
      "url": "https://book.douban.com/subject/30408726/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b63.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29960259.jpg",
      "url": "https://book.douban.com/subject/30408726/"
    },
    "synopsis": {
      "text": "与批判、退缩的想法拉开距离…",
      "url": "https://book.douban.com/subject/30408726/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.5",
        "count": 1130,
        "url": "https://book.douban.com/subject/30408726/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "4.05",
        "count": 2074,
        "url": "https://www.goodreads.com/book/show/180464",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "Self-Esteem: A Proven Program of Cognitive Techniques for Assessing, Improving, and Maintaining Your Self-Esteem"
      }
    },
    "summary": "这本自尊练习手册以认知方法讨论内在批评、信念与自我评价，结合情境分析和练习介绍表达需要、回应批评，以及与苛刻想法保持距离的方式。"
  },
  "b64": {
    "title": "睡出好情绪",
    "aliases": [],
    "author": "科琳·卡尼 / 雷切尔·曼博",
    "originalTitle": "Quiet Your Mind and Get to Sleep: Solutions to Insomnia for Those with Depression, Anxiety, or Chronic Pain",
    "format": "失眠认知行为练习",
    "difficulty": "进阶",
    "goals": [
      "understand",
      "practice"
    ],
    "topics": [
      "mood"
    ],
    "clinicalContext": true,
    "reason": "如果你越担心睡不好、越难放松，可以借睡眠日记了解自己的作息和睡前思维，再与专业人员讨论适合的调整。",
    "caveat": "中文版宣传简介将所有失眠归为情绪，属于过度概括；身体疾病、药物和其他睡眠障碍也可能参与。睡眠限制等练习需要个体评估，不应自行停药或强行减少睡眠；出现明显嗜睡或健康疑问时先就医。",
    "caveatSources": [
      {
        "label": "ABCT 原作书籍资料",
        "url": "https://www.abct.org/books/quiet-your-mind-and-get-to-sleep-solutions-to-insomnia-for-those-with-depression-anxiety-or-chronic-pain/"
      }
    ],
    "audience": "general",
    "edition": {
      "title": "睡出好情绪",
      "language": "zh",
      "publisher": "成都时代出版社",
      "publishedAt": "2020-7-1",
      "isbn": "9787546425979",
      "url": "https://book.douban.com/subject/35082936/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b64.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s33654630.jpg",
      "url": "https://book.douban.com/subject/35082936/"
    },
    "synopsis": {
      "text": "建立自己的睡眠日记、优化自己的睡眠模式…",
      "url": "https://book.douban.com/subject/35082936/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.2",
        "count": 95,
        "url": "https://book.douban.com/subject/35082936/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "3.91",
        "count": 350,
        "url": "https://www.goodreads.com/book/show/7177561",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "Quiet Your Mind and Get to Sleep: Solutions to Insomnia for Those with Depression, Anxiety, or Chronic Pain"
      }
    },
    "summary": "这本失眠认知行为练习读物关注伴随低落、焦虑或慢性疼痛的睡眠困难，通过睡眠日记、作息安排与思维记录，介绍识别和调整失眠维持因素的方法。"
  },
  "b65": {
    "title": "幸福的陷阱",
    "aliases": [],
    "author": "路斯·哈里斯",
    "originalTitle": "The Happiness Trap",
    "format": "接纳与价值行动练习",
    "difficulty": "入门",
    "goals": [
      "understand",
      "practice"
    ],
    "topics": [
      "meaning"
    ],
    "reason": "如果你因自己还不够快乐而更加难受，可以借其中的价值探索，寻找此刻愿意投入的一件小事，而不必先消除所有不舒服。",
    "caveat": "所选2018年中文版早于英文第二版，不能代表其后全部修订。接纳感受不等于忍受暴力、不公或放弃改变现实；阅读练习也不能保证每个人都获得相同效果。",
    "audience": "general",
    "clinicalContext": false,
    "edition": {
      "title": "幸福的陷阱",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2018-8-1",
      "isbn": "9787111605348",
      "url": "https://book.douban.com/subject/30310659/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b65.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s29889701.jpg",
      "url": "https://book.douban.com/subject/30310659/"
    },
    "synopsis": {
      "text": "以正念技术为基础的开创性新方法…",
      "url": "https://book.douban.com/subject/30310659/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.5",
        "count": 1519,
        "url": "https://book.douban.com/subject/30310659/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "4.13",
        "count": 22554,
        "url": "https://www.goodreads.com/book/show/3444633",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "The Happiness Trap"
      }
    },
    "summary": "路斯·哈里斯以接纳与承诺疗法为框架，结合比喻、案例和体验练习，介绍觉察想法、容纳感受、澄清价值与承诺行动，讨论追逐快乐带来的困境。"
  },
  "b66": {
    "title": "你要如何衡量你的人生",
    "aliases": [],
    "author": "克莱顿·克里斯坦森 / 詹姆斯·奥沃斯 / 凯伦·迪伦",
    "originalTitle": "How Will You Measure Your Life?",
    "format": "管理思想与人生选择",
    "difficulty": "入门",
    "goals": [
      "understand"
    ],
    "topics": [
      "career"
    ],
    "reason": "如果你纠结的不只是做什么工作，还有什么值得长期投入，可以借书中的问题梳理满意感、重要关系与日常取舍。",
    "caveat": "这是管理思想与个人经历的延伸，不是系统的求职指南。企业类比、哈佛商学院背景及作者的宗教价值观有适用边界，不能据此预测个人成败，也不能忽略经济条件、照护责任和就业环境。",
    "audience": "general",
    "clinicalContext": false,
    "caveatSources": [
      {
        "label": "作者团队：作品与写作背景",
        "url": "https://www.measureyourlife.com/about/"
      }
    ],
    "edition": {
      "title": "你要如何衡量你的人生",
      "language": "zh",
      "publisher": "吉林出版集团",
      "publishedAt": "2013-1-1",
      "isbn": "9787553411217",
      "url": "https://book.douban.com/subject/20434430/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b66.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s24561045.jpg",
      "url": "https://book.douban.com/subject/20434430/"
    },
    "synopsis": {
      "text": "2010年春，克里斯坦森为哈佛商学院毕业生发表了…",
      "url": "https://book.douban.com/subject/20434430/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.0",
        "count": 4609,
        "url": "https://book.douban.com/subject/20434430/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "4.05",
        "count": 38921,
        "url": "https://www.goodreads.com/book/show/13425570",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "How Will You Measure Your Life?"
      }
    },
    "summary": "作者将管理学中的动机、资源分配与战略取舍用于职业、家庭和人生选择，结合个人经历讨论怎样让日常行动与重视的价值保持一致。"
  },
  "b67": {
    "title": "医生，你在想什么",
    "aliases": [],
    "author": "王兴",
    "originalTitle": "",
    "format": "医疗科普与就医沟通",
    "difficulty": "入门",
    "goals": [
      "understand",
      "practice"
    ],
    "topics": [
      "health"
    ],
    "reason": "如果你不知道就诊时该怎么描述症状、询问检查或讨论方案，可以从书中的就医情境了解医生如何思考，再准备自己的问题。",
    "caveat": "主要来自医生视角和个案，不能代表所有科室、医院或患者经历，也不能保证避免误诊。书中的检查、治疗和用药讨论不能替代个体评估；遇到疑问应结合自身情况与接诊医生讨论。",
    "audience": "general",
    "clinicalContext": false,
    "caveatSources": [
      {
        "label": "上海译文出版社供稿：内容介绍",
        "url": "https://read.douban.com/ebook/439952366/"
      }
    ],
    "edition": {
      "title": "医生，你在想什么",
      "language": "zh",
      "publisher": "上海译文出版社",
      "publishedAt": "2023-6-20",
      "isbn": "9787532793013",
      "url": "https://book.douban.com/subject/36392716/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b67.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s34550176.jpg",
      "url": "https://book.douban.com/subject/36392716/"
    },
    "synopsis": {
      "text": "《医生，你在想什么》是医生、科普作家王兴继《病人…",
      "url": "https://book.douban.com/subject/36392716/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.2",
        "count": 1583,
        "url": "https://book.douban.com/subject/36392716/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "4.50",
        "count": 6,
        "url": "https://www.goodreads.com/book/show/195879492",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "医生，你在想什么"
      }
    },
    "summary": "一位临床医生围绕寻医、问诊、检查和治疗中的常见困惑，以案例解释医学思维、医患沟通与医疗选择，介绍疾病的不确定性和就医过程。"
  },
  "b68": {
    "title": "认知心理学及其启示",
    "aliases": [],
    "author": "约翰·R.安德森",
    "originalTitle": "Cognitive Psychology and Its Implications",
    "format": "认知心理学教材",
    "difficulty": "较难",
    "goals": [
      "understand"
    ],
    "topics": [
      "learning"
    ],
    "reason": "如果你想了解注意、记忆和技能学习的研究依据，而不仅是收集学习技巧，可以选读相应章节，并留意实验任务与真实学习情境的差别。",
    "caveat": "需要一定心理学与实验研究基础，适合选章深入阅读。所选2012年中文版对应第7版，已有第9版，不能代表此后的全部研究；实验室发现不直接等于个人学习效果，书中内容也不是学习障碍诊断依据。",
    "audience": "general",
    "clinicalContext": false,
    "caveatSources": [
      {
        "label": "Macmillan：原作及第9版修订资料",
        "url": "https://store.macmillanlearning.com/us/product/Cognitive-Psychology-and-Its-Implications/p/1319067115"
      }
    ],
    "edition": {
      "title": "认知心理学及其启示",
      "language": "zh",
      "publisher": "人民邮电出版社",
      "publishedAt": "2012-1-1",
      "isbn": "9787115266514",
      "url": "https://book.douban.com/subject/7067149/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多 · 第7版，非最新修订"
    },
    "cover": {
      "src": "assets/covers/b68.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s8859498.jpg",
      "url": "https://book.douban.com/subject/7067149/"
    },
    "synopsis": {
      "text": "《认知心理学及其启示(第7版)》自1980年第一…",
      "url": "https://book.douban.com/subject/7067149/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 624,
        "url": "https://book.douban.com/subject/7067149/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "3.81",
        "count": 238,
        "url": "https://www.goodreads.com/book/show/26095451",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "Cognitive Psychology and Its Implications"
      }
    },
    "summary": "这部认知心理学教材以实验研究解释知觉、注意、记忆、知识表征、问题解决与决策，并讨论这些机制在技能学习和日常生活中的应用。"
  },
  "b69": {
    "title": "健康心理学（第八版）（万千心理）",
    "aliases": [],
    "author": "Linda Brannon / Jess Feist / John A. Updegraff",
    "originalTitle": "Health Psychology: An Introduction to Behavior and Health",
    "format": "健康心理学教材",
    "difficulty": "较难",
    "goals": [
      "understand"
    ],
    "topics": [
      "health"
    ],
    "reason": "如果你想系统理解压力、健康行为和求医过程之间的联系，可以从研究方法、医疗服务或慢性疾病适应章节开始，而不必从头通读。",
    "caveat": "需要心理学及生物学基础；所选2016年中文版对应英文第8版，研究与医疗情境已有更新。部分案例及制度背景主要来自美国，相关不等于因果，不能把疾病归咎于患者的心态或生活方式，也不用于自行诊断或调整治疗。",
    "audience": "general",
    "clinicalContext": false,
    "caveatSources": [
      {
        "label": "Cengage：原作第8版出版资料",
        "url": "https://www.cengage.com/c/ebook-health-psychology-an-introduction-to-behavior-and-health-8e-brannon-feist-updegraff/9781285698557/"
      }
    ],
    "edition": {
      "title": "健康心理学（第八版）（万千心理）",
      "language": "zh",
      "publisher": "中国轻工业出版社",
      "publishedAt": "2016-12",
      "isbn": "9787518411214",
      "url": "https://book.douban.com/subject/26926105/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多 · 第8版，非最新修订"
    },
    "cover": {
      "src": "assets/covers/b69.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29188348.jpg",
      "url": "https://book.douban.com/subject/26926105/"
    },
    "synopsis": {
      "text": "健康这个概念在今天已经与一百年前有了很大的不同。…",
      "url": "https://book.douban.com/subject/26926105/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.9",
        "count": 22,
        "url": "https://book.douban.com/subject/26926105/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "status": "verified",
        "value": "3.77",
        "count": 105,
        "url": "https://www.goodreads.com/book/show/18099778",
        "checkedAt": "2026-10-17",
        "method": "public-page-snapshot",
        "title": "Health Psychology: An Introduction to Behavior and Health"
      }
    },
    "summary": "这部教材从生物、心理与社会因素出发，介绍健康行为、压力与疼痛、求医和治疗依从性，以研究和案例讨论慢性疾病的心理适应与健康促进。"
  },
  "b70": {
    "title": "社会心理学（第8版）",
    "aliases": [
      "社会心理学"
    ],
    "author": "戴维·迈尔斯",
    "originalTitle": "Social Psychology",
    "format": "社会心理学教材",
    "difficulty": "较难",
    "goals": [
      "understand"
    ],
    "topics": [
      "relationship",
      "self",
      "connection"
    ],
    "reason": "如果你想系统理解归因、态度、群体影响和人与人的联结，可以把这部教材作为研究入门，结合原始研究与后续复现资料阅读。",
    "caveat": "所选为2006年中文版第8版，远早于此后的复现讨论与修订；不能把经典实验都当作已确认的普遍定律。文化与样本限制需要具体辨别，群体结果也不能用来揣测一个人的动机或诊断关系。",
    "audience": "professional",
    "clinicalContext": false,
    "caveatSources": [
      {
        "label": "作者：现行修订版本资料",
        "url": "https://davidmyers.org/textbooks/social-psychology"
      }
    ],
    "edition": {
      "title": "社会心理学",
      "language": "zh",
      "publisher": "人民邮电出版社",
      "publishedAt": "2006-1",
      "isbn": "9787115138804",
      "url": "https://book.douban.com/subject/1476651/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品中文版候选中评价人数最多 · 第8版，非最新修订"
    },
    "cover": {
      "src": "assets/covers/b70.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s1670932.jpg",
      "url": "https://book.douban.com/subject/1476651/"
    },
    "synopsis": {
      "text": "《社会心理学》这本书被美国700多所大学或学院的…",
      "url": "https://book.douban.com/subject/1476651/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.0",
        "count": 29444,
        "url": "https://book.douban.com/subject/1476651/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "url": "https://www.goodreads.com/book/show/740224",
        "value": "4.02",
        "count": 1488,
        "method": "public-page-snapshot",
        "status": "verified",
        "checkedAt": "2026-10-17"
      }
    },
    "summary": "这部社会心理学教材结合研究与生活实例，介绍社会认知、态度与行为、群体影响及人际关系，讨论个体如何理解、影响他人并建立联系。"
  },
  "b71": {
    "title": "心理学研究方法（第7版）",
    "aliases": [
      "心理学研究方法"
    ],
    "author": "约翰·肖内西 / 尤金·泽克迈斯特 / 珍妮·泽克迈斯特",
    "originalTitle": "Research Methods in Psychology",
    "format": "研究方法教材",
    "difficulty": "较难",
    "goals": [
      "understand"
    ],
    "topics": [
      "learning"
    ],
    "reason": "如果你想判断一项心理学结论怎样得出，可以先学习研究设计、测量、伦理和结果解释，再回到具体论文检查结论的适用范围。",
    "caveat": "需要基础统计与研究设计知识，适合配合课程和真实论文阅读。所选为第7版旧教材，研究伦理、开放科学、报告规范与统计实践已有更新；Goodreads评分低于本站复核线，依据方法教学用途保留，不代表没有阅读困难。",
    "audience": "professional",
    "clinicalContext": false,
    "caveatSources": [
      {
        "label": "出版方供稿：内容与目录",
        "url": "https://www.dedao.cn/ebook/detail?id=EJmMZXq1b8qOpBlD69XAdP7LEGaKJWE1xBWxRnme5vrVzo4QMZYgNyk2jNA5467K"
      }
    ],
    "edition": {
      "title": "心理学研究方法",
      "language": "zh",
      "publisher": "人民邮电出版社",
      "publishedAt": "2010-4",
      "isbn": "9787115223265",
      "url": "https://book.douban.com/subject/4770564/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品中文版候选中评价人数最多 · 第7版，非最新修订"
    },
    "cover": {
      "src": "assets/covers/b71.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s4571105.jpg",
      "url": "https://book.douban.com/subject/4770564/"
    },
    "synopsis": {
      "text": "本书有着众多特色：第一，这本书已经出到第七版，从…",
      "url": "https://book.douban.com/subject/4770564/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.8",
        "count": 190,
        "url": "https://book.douban.com/subject/4770564/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "url": "https://www.goodreads.com/book/show/3641585",
        "value": "3.40",
        "count": 163,
        "method": "public-page-snapshot",
        "status": "verified",
        "checkedAt": "2026-10-17"
      }
    },
    "summary": "这部研究方法教材结合心理学实例，介绍科学方法与研究伦理、观察和调查、实验与准实验设计，以及数据分析、结果解释和研究报告写作。"
  },
  "b72": {
    "title": "认知疗法基础与应用（第2版）",
    "aliases": [
      "认知疗法基础与应用"
    ],
    "author": "朱迪丝·S.贝克",
    "originalTitle": "Cognitive Behavior Therapy: Basics and Beyond",
    "format": "心理治疗专业教材",
    "difficulty": "较难",
    "goals": [
      "understand"
    ],
    "topics": [
      "anxiety",
      "mood",
      "emotion_management"
    ],
    "reason": "如果你正在接受相关专业训练，可以借会谈示例学习个案概念化、合作关系与治疗结构，并在合格督导和现行专业规范下讨论如何应用。",
    "caveat": "这是面向专业学习者的治疗教材，不是自行诊断或替他人开展治疗的指南，阅读不能替代资格、训练与督导。所选2013年中文版对应第2版，已有第3版，治疗关系、正念与康复取向等修订须另行核对。",
    "audience": "professional",
    "clinicalContext": true,
    "caveatSources": [
      {
        "label": "Guilford：第3版修订边界",
        "url": "https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196/new-to-edition"
      }
    ],
    "edition": {
      "title": "认知疗法基础与应用",
      "language": "zh",
      "publisher": "中国轻工业出版社",
      "publishedAt": "2013-6",
      "isbn": "9787501990238",
      "url": "https://book.douban.com/subject/24532754/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品中文版候选中评价人数最多 · 第2版，非最新修订"
    },
    "cover": {
      "src": "assets/covers/b72.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s26638057.jpg",
      "url": "https://book.douban.com/subject/24532754/"
    },
    "synopsis": {
      "text": "《认知疗法基础与应用(第2版)》囊括了作者朱迪·…",
      "url": "https://book.douban.com/subject/24532754/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "9.2",
        "count": 824,
        "url": "https://book.douban.com/subject/24532754/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "url": "https://www.goodreads.com/book/show/72777109",
        "value": "4.22",
        "count": 3573,
        "method": "public-page-snapshot",
        "status": "verified",
        "checkedAt": "2026-10-17"
      }
    },
    "summary": "这部认知行为治疗教材以会谈示例与图表介绍个案概念化、治疗计划和会谈结构，并讨论自动思维、核心信念、行为激活及治疗中的常见困难。"
  }
};

const PROFESSIONAL_READING = [
  {
    "title": "基础教材与研究方法",
    "bookIds": [
      "b28",
      "b13",
      "b68",
      "b69",
      "b70",
      "b71"
    ]
  },
  {
    "title": "临床与治疗参考",
    "bookIds": [
      "b72",
      "b31",
      "b33"
    ]
  }
];

const TOPIC_LIST = Object.keys(BOOKS_DATA).map(key => ({ key, title: BOOKS_DATA[key].title, icon: BOOKS_DATA[key].icon }));
