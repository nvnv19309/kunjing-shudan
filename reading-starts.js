// 每主题的编选起点；不改变书目排序，明确读法优先于默认建议。
const READING_STARTS = {
  anxiety: { bookId: 'b03', reason: '想先读轻一点的内容，可从日常的自我关怀练习开始。' },
  procrastination: { bookId: 'b07', reason: '先了解环境与行动门槛怎样影响习惯，再选一件小事尝试。' },
  career: { bookId: 'b12', reason: '从多个未来方案和小规模探索入手，适合还没确定方向时阅读。' },
  relationship: { bookId: 'b14', reason: '先从一次具体对话开始，了解怎样表达感受、需要和请求。' },
  learning: { bookId: 'b18', reason: '先了解回忆与复习怎样安排，再带着一门课程检验理解。' },
  mood: { bookId: 'b24', reason: '精力有限时，可以先跟着咨询故事理解感受，不急着做练习。' },
  self: { bookId: 'b63', reason: '从一个具体的自我评价开始，了解内在批评与需要表达。' },
  personality: { bookId: 'b61', reason: '先了解情绪与人际互动的技能练习，不急着给自己下定义。' },
  money: { bookId: 'b40', reason: '从金钱判断中的日常故事入手，了解欲望、运气和风险。' },
  meaning: { bookId: 'b65', reason: '先读价值与行动的讨论，思考此刻愿意把时间投入什么。' },
  health: { bookId: 'b67', reason: '先了解就医中的沟通与不确定性，准备想和医生讨论的问题。' },
  family: { bookId: 'b51', reason: '从具体的施压、内疚和界限入手，辨认让自己困扰的互动。' },
  sensitivity: { bookId: 'b03', reason: '先了解怎样回应犯错后的自责，可以按自己的节奏选读练习。' },
  couple: { bookId: 'b57', reason: '先了解亲密需求与互动方式，阅读时留意具体情境。' },
  breakup: { bookId: 'b24', reason: '读不进理论时，先用一个咨询故事接近难以说清的感受。' },
  emotion_management: { bookId: 'b61', reason: '想找具体方法，可先了解分步的情绪调节练习，一次选一项。' },
  connection: { bookId: 'b16', reason: '先从咨询故事了解失落与需要怎样被说出来、被理解。' }
};
