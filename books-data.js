// 困境书单：主题与书目均可直接编辑，无构建或线上API。
// classic / popular 只保留历史分组兼容；前台合并展示并按可选阅读用途排序。
// 评分为所列日期核对的页面快照，不能当作实时分数；原文简介仅短摘录。
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
      "烦躁",
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
      },
      {
        "bookId": "b02",
        "reason": "如果你反复预想最坏结果，可以尝试观察想法如何影响感受，再挑一个练习。"
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
        "bookId": "b08",
        "reason": "如果一想到完整任务就退缩，可以试一个很小的开始，再观察它是否有帮助。"
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
        "bookId": "b09",
        "reason": "如果你不知道如何比较工作方向，可以先选一组练习梳理自己在意的条件。"
      },
      {
        "bookId": "b10",
        "reason": "如果你想把眼前的工作放进更长的时间里看，可以借它比较短期收入与长期积累。"
      }
    ],
    "popular": [
      {
        "bookId": "b11",
        "reason": "如果你的经历比较曲折，可以用它反思已有积累如何连接到下一种可能。"
      },
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
      "孤独",
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
        "bookId": "b25",
        "reason": "如果你想检视睡前习惯，可以选一个与环境或日程有关的小调整。"
      },
      {
        "bookId": "b26",
        "reason": "如果你想跳出“情绪只是失控”的理解，可以比较这套理论如何解释一个具体经历。"
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
      }
    ]
  },
  "personality": {
    "group": "emotion",
    "short": "理解波动，不急着贴标签",
    "intro": "情绪波动、关系反复与不真实感可能有不同来源。本组包含专业参考与大众读物，用于了解概念和求助路径，不用于确认自己或他人的诊断。",
    "readingTip": "如果主要想了解如何求助，可以先看自助指南的专业支持部分；DSM 和解离理论著作不是初次自我探索的必读书。",
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
      "情绪不稳定",
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
        "bookId": "b30",
        "reason": "如果你已经在与专业人员讨论相关问题，可以用它补充术语与求助知识。"
      },
      {
        "bookId": "b31",
        "reason": "如果你有专业学习需求，可以查阅概念与分类，并结合训练和其他资料理解。"
      },
      {
        "bookId": "b32",
        "reason": "如果你正在寻求或接受帮助，可以从治疗选择与支持资源部分了解能向专业人员问什么。"
      },
      {
        "bookId": "b33",
        "reason": "如果你已有相关学习基础，可以把它作为了解特定创伤理论的参考。"
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
        "bookId": "b37",
        "reason": "如果你正面对反复贬低或控制，可以把注意力放在具体行为、边界与可获得的支持。"
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
        "bookId": "b44",
        "reason": "如果你对灵性写作感兴趣，可以将它作为一种观察日常体验的个人视角。"
      },
      {
        "bookId": "b12",
        "reason": "如果你一直等待唯一正确的方向，可以先设计两个低成本的小试验。"
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
        "bookId": "b46",
        "reason": "如果你对医学与人的处境感兴趣，可以从病例叙事看到诊断之外的生活。"
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
      "不被爱",
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
        "bookId": "b53",
        "reason": "如果你常被刺激或他人情绪影响，可以留意哪些环境条件让自己更容易恢复。"
      },
      {
        "bookId": "b54",
        "reason": "如果你认为必须表现完美才能被接纳，可以借它观察自己对犯错的要求。"
      }
    ],
    "popular": [
      {
        "bookId": "b55",
        "reason": "如果你觉得脑中想法太多，可以把阅读当作整理体验的提示，而不是寻找身份认证。"
      },
      {
        "bookId": "b15",
        "reason": "如果你常被别人的期待牵着走，可以把其中的观点当作一次重新提问的机会。"
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
        "bookId": "b59",
        "reason": "如果你愿意接触这类写作，可以把肯定语当作可选择的自我表达方式。"
      },
      {
        "bookId": "b24",
        "reason": "如果你只想先读一个故事，可以跟着人物看看难以说出的感受如何进入对话。"
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
    }
  },
  "b02": {
    "title": "控制焦虑",
    "originalTitle": "",
    "aliases": [],
    "author": "阿尔伯特·埃利斯",
    "format": "自助与练习",
    "difficulty": "入门",
    "reason": "如果你反复预想最坏结果，可以尝试观察想法如何影响感受，再挑一个练习。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "主要沿用理性情绪行为疗法的解释框架，强调信念调整；现实中的经济压力、暴力和疾病并不只是想法造成的，不应把未能缓解归咎于自己。",
    "topics": [
      "anxiety"
    ],
    "edition": {
      "title": "控制焦虑",
      "language": "zh",
      "publisher": "机械工业出版社",
      "publishedAt": "2014-1",
      "isbn": "9787111450818",
      "url": "https://book.douban.com/subject/25805226/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b02.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s33491944.jpg",
      "url": "https://book.douban.com/subject/25805226/"
    },
    "synopsis": {
      "text": "你害怕在公开场合发言吗？ 你恐惧与陌生人或异性讲…",
      "url": "https://book.douban.com/subject/25805226/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.5",
        "count": 1226,
        "url": "https://book.douban.com/subject/25805226/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "How to Control Your Anxiety Before It Controls You",
        "url": "https://www.goodreads.com/book/show/7322755",
        "value": "3.79",
        "count": 713,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
      "anxiety"
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  "b08": {
    "title": "微习惯",
    "originalTitle": "Mini Habits: Smaller Habits, Bigger Results",
    "aliases": [],
    "author": "斯蒂芬·盖斯",
    "format": "行动方法",
    "difficulty": "入门",
    "reason": "如果一想到完整任务就退缩，可以试一个很小的开始，再观察它是否有帮助。",
    "goals": [
      "practice"
    ],
    "caveat": "适合把启动门槛变小，但微小行动不自动等于有效学习或工作成果；复杂任务仍需要反馈、资源和足够的练习。",
    "topics": [
      "procrastination"
    ],
    "edition": {
      "title": "微习惯",
      "language": "zh",
      "publisher": "江西人民出版社",
      "publishedAt": "2016-11",
      "isbn": "9787210086741",
      "url": "https://book.douban.com/subject/26877306/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b08.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s34408860.jpg",
      "url": "https://book.douban.com/subject/26877306/"
    },
    "synopsis": {
      "text": "1天1个俯卧撑 1天1页书 1天50字 每天只做…",
      "url": "https://book.douban.com/subject/26877306/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.7",
        "count": 14253,
        "url": "https://book.douban.com/subject/26877306/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Mini Habits",
        "url": "https://www.goodreads.com/book/show/20567918",
        "value": "4.00",
        "count": 8026,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
  },
  "b09": {
    "title": "你的降落伞是什么颜色",
    "originalTitle": "",
    "aliases": [],
    "author": "理查德·尼尔森·鲍利斯",
    "format": "职业探索",
    "difficulty": "入门",
    "reason": "如果你不知道如何比较工作方向，可以先选一组练习梳理自己在意的条件。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "所选版本的招聘渠道与就业案例已有年代和美国背景；行业准入、签证、招聘规则及劳动力市场须按所在地现状另查。",
    "topics": [
      "career"
    ],
    "edition": {
      "title": "你的降落伞是什么颜色",
      "language": "zh",
      "publisher": "中国华侨出版社",
      "publishedAt": "2014-11",
      "isbn": "9787511346544",
      "url": "https://book.douban.com/subject/26126225/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b09.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s27614099.jpg",
      "url": "https://book.douban.com/subject/26126225/"
    },
    "synopsis": {
      "text": "如果你正在求职或者打算跳槽，或是对自己的职业生涯…",
      "url": "https://book.douban.com/subject/26126225/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.3",
        "count": 979,
        "url": "https://book.douban.com/subject/26126225/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "What Color is Your Parachute?: A Practical Manual for Job-hunters and Career Changers by Richard Nelson Bolles | Goodreads",
        "url": "https://www.goodreads.com/book/show/130721288",
        "value": "3.71",
        "count": 17370,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
  },
  "b10": {
    "title": "远见",
    "originalTitle": "The Long View: Career Strategies to Start Strong, Reach High, and Go Far",
    "aliases": [],
    "author": "布莱恩·费瑟斯通豪",
    "format": "职业经验",
    "difficulty": "进阶",
    "reason": "如果你想把眼前的工作放进更长的时间里看，可以借它比较短期收入与长期积累。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "职业阶段模型主要来自企业管理者经验，不是每个人都能按同样节奏发展；它对非正式就业、照护中断与结构性限制的解释有限。",
    "topics": [
      "career"
    ],
    "edition": {
      "title": "远见",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2018-1",
      "isbn": "9787559612168",
      "url": "https://book.douban.com/subject/27609489/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b10.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s29699274.jpg",
      "url": "https://book.douban.com/subject/27609489/"
    },
    "synopsis": {
      "text": "什么是成功的职业生涯？ 成功的职业生涯不在于找到…",
      "url": "https://book.douban.com/subject/27609489/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.6",
        "count": 5837,
        "url": "https://book.douban.com/subject/27609489/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Long View: Career Strategies to Start Strong, Reach High and Go Far by Brian Fetherstonhaugh | Goodreads",
        "url": "https://www.goodreads.com/book/show/29403100",
        "value": "3.75",
        "count": 313,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
  },
  "b11": {
    "title": "非线性成长",
    "originalTitle": "",
    "aliases": [],
    "author": "黄有璨",
    "format": "职业经验",
    "difficulty": "进阶",
    "reason": "如果你的经历比较曲折，可以用它反思已有积累如何连接到下一种可能。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "较多案例依托中国互联网与商业环境，经验有行业和时期边界；不能把个别人的跃迁路径当作可复制的成长公式。",
    "topics": [
      "career"
    ],
    "edition": {
      "title": "非线性成长",
      "language": "zh",
      "publisher": "电子工业出版社",
      "publishedAt": "2020-10-1",
      "isbn": "9787121395123",
      "url": "https://book.douban.com/subject/35218970/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b11.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s33733115.jpg",
      "url": "https://book.douban.com/subject/35218970/"
    },
    "synopsis": {
      "text": "全书以作者总结出来的个人成长范式“非线性成长”为…",
      "url": "https://book.douban.com/subject/35218970/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.8",
        "count": 1254,
        "url": "https://book.douban.com/subject/35218970/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "非线性成长(不确定时代下的职业发展和商业通关策略)(精) by Huang You Can | Goodreads",
        "url": "https://www.goodreads.com/book/show/70714216",
        "value": "4.50",
        "count": 2,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    }
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
      "breakup"
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
    }
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
    }
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
    }
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
      "mood"
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  "b25": {
    "title": "睡眠革命",
    "originalTitle": "SLEEP:Redefine Your Rest,for Success in Work,Sport and Life",
    "aliases": [],
    "author": "尼克·利特尔黑尔斯",
    "format": "睡眠经验",
    "difficulty": "入门",
    "reason": "如果你想检视睡前习惯，可以选一个与环境或日程有关的小调整。",
    "goals": [
      "practice"
    ],
    "caveat": "建议来自运动员睡眠管理经验，固定周期与日程安排未必适合所有人；睡眠障碍、轮班和用药问题需要个别评估。",
    "topics": [
      "mood"
    ],
    "edition": {
      "title": "睡眠革命",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2017-6",
      "isbn": "9787550299658",
      "url": "https://book.douban.com/subject/27023900/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b25.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s29437927.jpg",
      "url": "https://book.douban.com/subject/27023900/"
    },
    "synopsis": {
      "text": "提出修复睡眠的七大关键指标，颠覆八小时健康睡眠的…",
      "url": "https://book.douban.com/subject/27023900/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.3",
        "count": 9275,
        "url": "https://book.douban.com/subject/27023900/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Sleep by Nick Littlehales | Goodreads",
        "url": "https://www.goodreads.com/book/show/111780198",
        "value": "3.82",
        "count": 3212,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
      "mood"
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
    }
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
    }
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
    }
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
    }
  },
  "b30": {
    "title": "边缘型人格障碍",
    "originalTitle": "I Hate You--Don't Leave Me",
    "aliases": [
      "我恨你，别离开我"
    ],
    "author": "杰罗尔德·克莱斯曼 / 霍尔·斯特劳斯",
    "format": "心理教育",
    "difficulty": "进阶",
    "reason": "如果你已经在与专业人员讨论相关问题，可以用它补充术语与求助知识。",
    "goals": [
      "understand"
    ],
    "caveat": "早期版本对边缘型人格的称谓、案例与治疗信息具有时代局限；原作标题中的强烈关系叙事不应被当成患者的统一形象，更不能据此给伴侣贴标签。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "边缘型人格障碍",
      "language": "zh",
      "publisher": "群言出版社",
      "publishedAt": "2012-3",
      "isbn": "9787802562974",
      "url": "https://book.douban.com/subject/10560212/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b30.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s9008718.jpg",
      "url": "https://book.douban.com/subject/10560212/"
    },
    "synopsis": {
      "text": "患者一般在下面几个方面有非常不稳定的表现：心情、…",
      "url": "https://book.douban.com/subject/10560212/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 244,
        "url": "https://book.douban.com/subject/10560212/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "I Hate You—Don't Leave Me by Jerold J. Kreisman | Goodreads",
        "url": "https://www.goodreads.com/book/show/22580201",
        "value": "3.78",
        "count": 16623,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    "reason": "如果你有专业学习需求，可以查阅概念与分类，并结合训练和其他资料理解。",
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  "b37": {
    "title": "不被支配",
    "originalTitle": "Becoming the Narcissist's Nightmare: How to Devalue and Discard the Narcissist While Supplying Yourself",
    "aliases": [
      "不被支配：自恋人格的识别与反制"
    ],
    "author": "沙希达·阿拉比",
    "format": "关系边界 / 自助",
    "difficulty": "入门",
    "reason": "如果你正面对反复贬低或控制，可以把注意力放在具体行为、边界与可获得的支持。",
    "goals": [
      "practice",
      "understand"
    ],
    "caveat": "采用幸存者视角和较强的对抗性语言；“自恋者”不等于经专业诊断的NPD，书中的识别清单不能代替评估，具体脱离策略也须考虑现实安全。",
    "topics": [
      "personality"
    ],
    "edition": {
      "title": "不被支配",
      "language": "zh",
      "publisher": "人民邮电出版社",
      "publishedAt": "2024-6",
      "isbn": "9787115645661",
      "url": "https://book.douban.com/subject/36923814/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b37.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s34885751.jpg",
      "url": "https://book.douban.com/subject/36923814/"
    },
    "synopsis": {
      "text": "你身边是否有这样的人？小心自恋型人格！ 自恋型人…",
      "url": "https://book.douban.com/subject/36923814/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.3",
        "count": 1187,
        "url": "https://book.douban.com/subject/36923814/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Becoming the Narcissist’s Nightmare: How to Devalue and Discard the Narcissist While Supplying Yourself by Shahida Arabi | Goodreads",
        "url": "https://www.goodreads.com/book/show/28696904",
        "value": "4.19",
        "count": 1518,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  "b44": {
    "title": "当下的力量（珍藏版）",
    "originalTitle": "The power of now",
    "aliases": [
      "当下的力量"
    ],
    "author": "埃克哈特·托利",
    "format": "灵性随笔",
    "difficulty": "入门",
    "reason": "如果你对灵性写作感兴趣，可以将它作为一种观察日常体验的个人视角。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "属于灵性自助著作，其“觉醒”等概念不等于经过验证的心理治疗；痛苦持续存在不代表你不够专注当下，也不应据此忽略现实问题。",
    "topics": [
      "meaning"
    ],
    "edition": {
      "title": "当下的力量（珍藏版）",
      "language": "zh",
      "publisher": "中信出版社",
      "publishedAt": "2013-7-1",
      "isbn": "9787508640099",
      "url": "https://book.douban.com/subject/24758481/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b44.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s26922429.jpg",
      "url": "https://book.douban.com/subject/24758481/"
    },
    "synopsis": {
      "text": "我们忘不掉过去，更担心未来。但实际上，我们只能活…",
      "url": "https://book.douban.com/subject/24758481/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.7",
        "count": 13367,
        "url": "https://book.douban.com/subject/24758481/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Power of Now: A Guide to Spiritual Enlightenment by Eckhart Tolle | Goodreads",
        "url": "https://www.goodreads.com/book/show/1369698",
        "value": "4.15",
        "count": 477123,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    }
  },
  "b46": {
    "title": "错把妻子当帽子",
    "originalTitle": "The Man Who Mistook His Wife for A Hat",
    "aliases": [],
    "author": "奥利弗·萨克斯",
    "format": "神经医学叙事",
    "difficulty": "进阶",
    "reason": "如果你对医学与人的处境感兴趣，可以从病例叙事看到诊断之外的生活。",
    "goals": [
      "story",
      "understand"
    ],
    "caveat": "收录较早时期的神经科个案，部分诊断措辞与解释有时代背景；罕见病例具有叙事吸引力，但不代表常见症状的概率或你的就医结论。",
    "topics": [
      "health"
    ],
    "edition": {
      "title": "错把妻子当帽子",
      "language": "zh",
      "publisher": "中信出版社",
      "publishedAt": "2010-5",
      "isbn": "9787508619910",
      "url": "https://book.douban.com/subject/4742971/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b46.svg",
      "source": "https://img2.doubanio.com/view/subject/l/public/s6160751.jpg",
      "url": "https://book.douban.com/subject/4742971/"
    },
    "synopsis": {
      "text": "本书诉说了24个神经失序患者神奇的遭遇和经历。他…",
      "url": "https://book.douban.com/subject/4742971/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.9",
        "count": 2201,
        "url": "https://book.douban.com/subject/4742971/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "The Man Who Mistook His Wife for a Hat by Oliver Sacks | Goodreads",
        "url": "https://www.goodreads.com/book/show/897651",
        "value": "4.04",
        "count": 254547,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  "b53": {
    "title": "高敏感是种天赋",
    "originalTitle": "Highly Sensitive People in an Insensitive World",
    "aliases": [],
    "author": "伊尔斯·桑德",
    "format": "大众心理自助",
    "difficulty": "入门",
    "reason": "如果你常被刺激或他人情绪影响，可以留意哪些环境条件让自己更容易恢复。",
    "goals": [
      "understand",
      "practice"
    ],
    "caveat": "“高敏感”在这里是理解自身体验的自助概念，不是诊断；把敏感称为天赋属于鼓励性表达，不代表每项困难都有同一个原因。",
    "topics": [
      "sensitivity"
    ],
    "edition": {
      "title": "高敏感是种天赋",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2017-9",
      "isbn": "9787559608710",
      "url": "https://book.douban.com/subject/27125070/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b53.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s29543736.jpg",
      "url": "https://book.douban.com/subject/27125070/"
    },
    "synopsis": {
      "text": "为什么常觉得自己事情做不好、在人前丢脸？ 大家都…",
      "url": "https://book.douban.com/subject/27125070/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "7.4",
        "count": 7901,
        "url": "https://book.douban.com/subject/27125070/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Highly Sensitive People in an Insensitive World",
        "url": "https://www.goodreads.com/book/show/29083645",
        "value": "3.70",
        "count": 2086,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    }
  },
  "b55": {
    "title": "多向思考者",
    "originalTitle": "Je pense trop：Comment canaliser ce mental envahissant",
    "aliases": [
      "多向思考者：高敏感人群的内心世界"
    ],
    "author": "克莉司德·布提可南",
    "format": "大众心理自助",
    "difficulty": "入门",
    "reason": "如果你觉得脑中想法太多，可以把阅读当作整理体验的提示，而不是寻找身份认证。",
    "goals": [
      "understand"
    ],
    "caveat": "作者以咨询经验归纳“多向思考者”，带有特定分类框架；与描述产生共鸣，不能证明自己具有高智商、某种神经特征或临床状况。",
    "topics": [
      "sensitivity"
    ],
    "edition": {
      "title": "多向思考者",
      "language": "zh",
      "publisher": "北京联合出版公司",
      "publishedAt": "2018-9",
      "isbn": "9787550266049",
      "url": "https://book.douban.com/subject/30337311/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b55.svg",
      "source": "https://img3.doubanio.com/view/subject/l/public/s35082229.jpg",
      "url": "https://book.douban.com/subject/30337311/"
    },
    "synopsis": {
      "text": "这是一本很有人文情怀的心理辅导书。法国“国民心理…",
      "url": "https://book.douban.com/subject/30337311/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.0",
        "count": 1120,
        "url": "https://book.douban.com/subject/30337311/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "Je pense trop : Comment canaliser ce mental envahissant by Christel Petitcollin | Goodreads",
        "url": "https://www.goodreads.com/book/show/32273824",
        "value": "3.23",
        "count": 6133,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
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
    }
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
    }
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
    }
  },
  "b59": {
    "title": "生命的重建",
    "originalTitle": "You Can Heal Your Life",
    "aliases": [],
    "author": "露易丝·海",
    "format": "灵性自助",
    "difficulty": "入门",
    "reason": "如果你愿意接触这类写作，可以把肯定语当作可选择的自我表达方式。",
    "goals": [
      "practice"
    ],
    "caveat": "属于灵性励志与自我肯定读物，书中的身心因果叙述不能当作医学证据。NCI指出，没有确凿证据证明积极或消极态度决定患癌或死于癌症的风险；疾病不应被归咎于患者的想法。",
    "caveatSources": [
      {
        "url": "https://www.cancer.gov/about-cancer/causes-prevention/risk/myths",
        "label": "NCI：态度与癌症风险的误解"
      }
    ],
    "topics": [
      "breakup"
    ],
    "edition": {
      "title": "生命的重建",
      "language": "zh",
      "publisher": "中国宇航出版社",
      "publishedAt": "2008-01-01",
      "isbn": "9787801445445",
      "url": "https://book.douban.com/subject/1105890/",
      "checkedAt": "2026-10-17",
      "selectionNote": "优先中文 · 本次可查同作品候选中评价人数最多"
    },
    "cover": {
      "src": "assets/covers/b59.svg",
      "source": "https://img9.doubanio.com/view/subject/l/public/s3009346.jpg",
      "url": "https://book.douban.com/subject/1105890/"
    },
    "synopsis": {
      "text": "露易丝·海在书中为我们揭示了追求身心和谐的心理模…",
      "url": "https://book.douban.com/subject/1105890/",
      "label": "所选版本内容简介原文节选",
      "checkedAt": "2026-10-17"
    },
    "ratings": {
      "douban": {
        "status": "verified",
        "value": "8.0",
        "count": 5365,
        "url": "https://book.douban.com/subject/1105890/",
        "checkedAt": "2026-10-17",
        "method": "public-book-page"
      },
      "goodreads": {
        "title": "You Can Heal Your Life by Louise L. Hay | Goodreads",
        "url": "https://www.goodreads.com/book/show/907306",
        "value": "4.15",
        "count": 87533,
        "checkedAt": "2026-10-17",
        "status": "verified",
        "method": "public-page-snapshot"
      }
    }
  }
};

const TOPIC_LIST = Object.keys(BOOKS_DATA).map(key => ({ key, title: BOOKS_DATA[key].title, icon: BOOKS_DATA[key].icon }));
