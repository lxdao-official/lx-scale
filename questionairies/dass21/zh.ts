import { Questionnaire } from "@/types";

export const dass21: Questionnaire = {
    id: "dass21",
    title: "DASS-21抑郁焦虑压力量表",
    description: "同时评估抑郁、焦虑、压力三个维度的综合量表",
    tags: ["抑郁", "焦虑", "压力", "综合评估"],
    time: "5-8分钟",
    details: {
        introduction: "抑郁焦虑压力量表（Depression Anxiety Stress Scales-21, DASS-21）是一个用于测量抑郁、焦虑和压力三个相关负性情绪状态的自评量表。该量表由21个项目组成，每个维度各包含7个项目。DASS-21能够有效区分抑郁、焦虑和压力三种不同的情绪状态，在临床和研究中应用广泛。",
        questionCount: "21个项目",
        evaluationTime: "通常为5-8分钟",
        instructions: "请仔细阅读每个项目，根据您在过去一周的感受，选择最符合您情况的选项。每个问题都有四个选择：0=完全不符合，1=有时符合，2=经常符合，3=总是符合。",
        scoringMethod: [
            "分量表计分：抑郁、焦虑、压力各7题，每题0-3分",
            "分量表得分乘以2得到最终分数以便与DASS-42比较",
            "抑郁分量表：正常0-9，轻度10-13，中度14-20，重度21-27，极重度28+",
            "焦虑分量表：正常0-7，轻度8-9，中度10-14，重度15-19，极重度20+",
            "压力分量表：正常0-14，轻度15-18，中度19-25，重度26-33，极重度34+"
        ],
        dimensions: [
            { name: "抑郁", description: "情绪低落、绝望、生活缺乏意义、自我贬低、缺乏兴趣或参与感、快感缺失、无精打采" },
            { name: "焦虑", description: "自主神经系统的唤起、肌肉紧张、情境性焦虑和对焦虑体验的主观感受" },
            { name: "压力", description: "持续的紧张状态、易激惹、过度反应、不耐烦、难以放松、神经质、容易不安或激动" }
        ],
        notes: [
            "该量表适用于成年人的情绪状态评估",
            "如果任一维度得分较高，建议寻求专业心理帮助",
            "该量表仅供筛查使用，不能替代专业诊断"
        ],
        references: [
            {
                text: "Lovibond, S. H., & Lovibond, P. F. (1995). Manual for the Depression Anxiety Stress Scales. Psychology Foundation.",
                url: "https://www.psychology.org.au"
            }
        ]
    },
    questions: [
        // 抑郁维度 (1, 3, 5, 10, 13, 16, 17)
        { id: 1, content: "我发现很难让自己平静下来" },
        { id: 2, content: "我觉得嘴巴发干" },
        { id: 3, content: "我似乎无法体验到任何积极的情感" },
        { id: 4, content: "我遇到了呼吸困难（例如：过度快速的呼吸、喘不过气来）" },
        { id: 5, content: "我发现很难鼓起劲头去做事" },
        { id: 6, content: "我倾向于对事情反应过度" },
        { id: 7, content: "我遇到了颤抖的现象（例如：手颤抖）" },
        { id: 8, content: "我觉得我消耗了很多神经能量" },
        { id: 9, content: "我为一些可能令我恐慌和出丑的情况而担忧" },
        { id: 10, content: "我觉得自己没有什么可期待的" },
        { id: 11, content: "我发现自己变得激动" },
        { id: 12, content: "我发现很难放松" },
        { id: 13, content: "我感到忧愁和沮丧" },
        { id: 14, content: "当我被阻止做我想做的事情时，我无法忍受" },
        { id: 15, content: "我感到好像快要恐慌了" },
        { id: 16, content: "我对任何事情都不能热衷起来" },
        { id: 17, content: "我觉得自己不配做人" },
        { id: 18, content: "我发现我相当敏感" },
        { id: 19, content: "我发现，即使在没有体力活动的时候，我的心跳还是加快了" },
        { id: 20, content: "我无缘无故地感到害怕" },
        { id: 21, content: "我觉得生活没有意义" }
    ],
    renderOptions: () => [
        { id: 1, content: "完全不符合", value: "0" },
        { id: 2, content: "有时符合", value: "1" },
        { id: 3, content: "经常符合", value: "2" },
        { id: 4, content: "总是符合", value: "3" }
    ]
};