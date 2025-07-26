import { Questionnaire } from "@/types";

export const adhd: Questionnaire = {
    id: "adhd",
    title: "成人ADHD自评量表 (ASRS-v1.1)",
    description: "评估成人注意力缺陷多动障碍症状",
    tags: ["ADHD", "注意力", "自我评估"],
    time: "5-10分钟",
    details: {
        introduction: "成人ADHD自评量表(ASRS-v1.1)症状检查表是与世界卫生组织(WHO)以及包括以下精神科医生和研究人员团队的成人ADHD工作组合作开发的。该量表旨在根据DSM-IV标准评估成人ADHD症状的频率。请回答以下问题，根据您在过去6个月中的感受和行为表现对每个项目进行评分。",
        questionCount: "18个项目",
        evaluationTime: "约5-10分钟",
        instructions: "对于每个问题，请选择最能描述您在过去6个月中感受和行为表现的回答。",
        scoringMethod: [
            "每个问题评分为0-4分（从不=0，很少=1，有时=2，经常=3，非常频繁=4）。",
            "A部分（问题1-6）：筛查问题，4个或更多阳性回答提示ADHD症状。",
            "B部分（问题7-18）：额外症状评估。",
            "总分范围：0-72分。",
            "分数越高表示ADHD症状越严重。"
        ],
        dimensions: [
            { name: "注意力不集中", description: "难以维持注意力、遵循指示和组织任务。" },
            { name: "多动", description: "过度的运动活动、坐立不安、难以静坐。" },
            { name: "冲动", description: "不经思考就行动、打断他人、难以等待。" }
        ],
        notes: [
            "此量表是筛查工具，不能提供ADHD诊断。",
            "如果您在此量表上得分较高，请考虑咨询医疗专业人员进行适当评估。",
            "ADHD症状必须在7岁前出现，并在多个环境中造成功能损害才能诊断。"
        ],
        references: [
            {
                text: "Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S., Hiripi, E., ... & Walters, E. E. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population. Psychological Medicine, 35(2), 245-256.",
                url: "https://www.hcp.med.harvard.edu/ncs/asrs.php"
            }
        ]
    },
    questions: [
        { id: 1, content: "在完成其中最艰难的部分之后，您在处理某一项目的最后细节时是否常常有困难？" },
        { id: 2, content: "您在完成具有组织性质的任务时，是否时常有困难把事情整理安排好？" },
        { id: 3, content: "您是否时常有困难记住约会或应做的事？" },
        { id: 4, content: "如果一件事需要多动脑筋，您是否常常躲避或推延开始做它？" },
        { id: 5, content: "如果您不得不长时间坐下，您是否常常蠕动不安或者手脚动个不停？" },
        { id: 6, content: "您是否时常感到过度活跃，强迫自己做事，就像上了发条的机器？" },
        { id: 7, content: "当您必须处理无聊或困难的项目时，是否常常犯粗心的错误？" },
        { id: 8, content: "当您在做无聊或重复性工作时，是否常常难以保持注意力？" },
        { id: 9, content: "即使别人直接和您说话，您是否常常难以集中注意力听他们说什么？" },
        { id: 10, content: "您是否常常在家里或工作中放错地方或难以找到东西？" },
        { id: 11, content: "您是否常常被周围的活动或噪音分散注意力？" },
        { id: 12, content: "在会议或其他预期您保持坐着的情况下，您是否常常离开座位？" },
        { id: 13, content: "您是否常常感到不安或坐立不安？" },
        { id: 14, content: "当您有时间放松时，是否常常难以放松和休息？" },
        { id: 15, content: "在社交场合，您是否常常发现自己说话太多？" },
        { id: 16, content: "在对话中，您是否常常在对方说完之前就抢着说完他们的句子？" },
        { id: 17, content: "在需要排队等候的情况下，您是否常常难以等待轮到您？" },
        { id: 18, content: "当别人忙碌时，您是否常常打断他们？" }
    ],
    renderOptions: (id: number) => {
        return [
            { id: 1, content: '从不', value: '0' },
            { id: 2, content: '很少', value: '1' },
            { id: 3, content: '有时', value: '2' },
            { id: 4, content: '经常', value: '3' },
            { id: 5, content: '非常频繁', value: '4' },
        ];
    }
};