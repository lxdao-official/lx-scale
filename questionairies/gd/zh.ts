import { Questionnaire } from "@/types";

export const gd: Questionnaire = {
  id: "gd",
  title: "性别认知障碍问卷 (GDQ)",
  description: "评估性别认知障碍体验和感受",
  tags: ["性别", "认同", "自我评估"],
  time: "10-15分钟",
  details: {
    introduction:
      "性别认知障碍问卷旨在评估与性别认同相关的体验和感受。性别认知障碍是指可能伴随个人体验或表达的性别与其出生时指定性别不一致而产生的痛苦。此问卷用于自我反思和教育目的。请根据您的个人经历和感受诚实回答。",
    questionCount: "27个项目",
    evaluationTime: "约10-15分钟",
    instructions:
      "请仔细阅读每个陈述，选择最能描述您体验或感受的回答。没有对错之分。",
    scoringMethod: [
      "每个问题评分为1-7分（不同意=1，略微不同意=2，有些不同意=3，中性=4，有些同意=5，略微同意=6，同意=7）。",
      "总分范围：27-189分。",
      "分数越高可能表示更强的性别认知障碍体验。",
      "这不是诊断工具，不应用于临床诊断。",
    ],
    dimensions: [
      { name: "性别认同", description: "对个人内在性别感受的体验。" },
      {
        name: "社会性别角色",
        description: "对基于出生时指定性别的社会期望和角色的舒适度。",
      },
      { name: "身体性别焦虑", description: "对身体特征和体型的感受。" },
      { name: "性别表达", description: "以各种方式表达性别的舒适度。" },
    ],
    notes: [
      "此问卷仅用于教育和自我反思目的。",
      "它不能替代专业评估或诊断。",
      "如果您在性别认同方面感到痛苦，请考虑咨询合格的心理健康专业人员。",
      "性别认同是一个复杂而个人化的体验，在个体间差异很大。",
    ],
    references: [
      {
        text: "美国心理学会. (2015). 跨性别和性别非顺应者心理实践指南. 美国心理学家, 70(9), 832-864.",
        url: "https://www.apa.org/practice/guidelines/transgender.pdf",
      },
    ],
  },
  questions: [
    { id: 1, content: "我对出生时指定的性别感到舒适。" },
    { id: 2, content: "我希望自己出生时是不同的性别。" },
    { id: 3, content: "我觉得我的身体与我的性别认同相匹配。" },
    { id: 4, content: "我曾经幻想过成为不同的性别。" },
    { id: 5, content: "我对使用为我出生时指定性别设计的洗手间感到舒适。" },
    { id: 6, content: "当人们以我出生时指定的性别称呼我时，我感到痛苦。" },
    { id: 7, content: "我喜欢通常与我出生时指定性别相关的活动。" },
    { id: 8, content: "当我以不同性别的形象出现时，我感到更舒适。" },
    { id: 9, content: "我对目前的外貌感到满意。" },
    { id: 10, content: "我曾考虑过医学性别转换（激素/手术）。" },
    { id: 11, content: "我对穿着符合我出生时指定性别的典型服装感到舒适。" },
    { id: 12, content: "我更希望别人把我看作与出生时指定性别不同的性别。" },
    { id: 13, content: "我在自己的身体里感到自在。" },
    { id: 14, content: "我曾尝试过不同的性别表达方式。" },
    { id: 15, content: "我对自己的声音感到舒适。" },
    { id: 16, content: "我希望我能改变某些身体特征。" },
    { id: 17, content: "我强烈认同我出生时指定的性别。" },
    { id: 18, content: "我曾对不同性别的人感到羡慕。" },
    { id: 19, content: "我对别人如何感知我的性别感到舒适。" },
    { id: 20, content: "从童年开始，我就感到与我出生时指定的性别脱节。" },
    { id: 21, content: "我在为我出生时指定性别设置的单性别空间中感到舒适。" },
    { id: 22, content: "我曾希望醒来时是不同的性别。" },
    { id: 23, content: "我觉得我的性别认同是稳定和一致的。" },
    { id: 24, content: "我对自己的性别认同感到困惑。" },
    { id: 25, content: "我对自己的姓名和代词感到舒适。" },
    { id: 26, content: "我曾因性别期望而感到痛苦。" },
    { id: 27, content: "当我表达真实的性别认同时，我感到真实。" },
  ],
  renderOptions: (id: number) => {
    return [
      { id: 1, content: "不同意", value: "1" },
      { id: 2, content: "略微不同意", value: "2" },
      { id: 3, content: "有些不同意", value: "3" },
      { id: 4, content: "中性", value: "4" },
      { id: 5, content: "有些同意", value: "5" },
      { id: 6, content: "略微同意", value: "6" },
      { id: 7, content: "同意", value: "7" },
    ];
  },
};
