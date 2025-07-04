import { Questionnaire } from "@/types";

export const phq9: Questionnaire = {
    id: "phq9",
    title: "PHQ-9患者健康问卷",
    description: "评估抑郁症状的严重程度和频率",
    tags: ["抑郁", "自评量表", "筛查"],
    time: "3-5分钟",
    details: {
        introduction: "患者健康问卷-9（Patient Health Questionnaire-9, PHQ-9）是一个广泛使用的抑郁症筛查和评估工具。该问卷由9个项目组成，基于DSM-IV诊断标准中的抑郁症症状标准设计。PHQ-9不仅可以用于筛查抑郁症，还可以评估抑郁症状的严重程度和治疗效果。",
        questionCount: "9个项目",
        evaluationTime: "通常为3-5分钟",
        instructions: "请根据您在过去两周内的实际感受，选择最符合您情况的选项。每个问题都有四个选择：完全没有、好几天、一半以上的天数、几乎每天。",
        scoringMethod: [
            "总分：将9个项目得分相加，范围0-27分",
            "计分方式：完全没有=0分，好几天=1分，一半以上的天数=2分，几乎每天=3分",
            "严重程度：0-4分为无/最低程度，5-9分为轻度，10-14分为中度，15-19分为中重度，20-27分为重度抑郁"
        ],
        dimensions: [
            { name: "兴趣丧失", description: "对活动失去兴趣或快感" },
            { name: "情绪低落", description: "感到沮丧、抑郁或绝望" },
            { name: "睡眠问题", description: "入睡困难、睡眠不安或睡眠过多" },
            { name: "疲劳感", description: "感到疲倦或没有活力" },
            { name: "食欲改变", description: "食欲不振或吃得过多" },
            { name: "自我评价", description: "对自己感到不满或认为自己让家人失望" },
            { name: "注意力", description: "注意力集中困难" },
            { name: "精神运动", description: "动作或说话缓慢，或坐立不安" },
            { name: "自伤想法", description: "有伤害自己或自杀的想法" }
        ],
        notes: [
            "该量表适用于成年人抑郁症状筛查和严重程度评估",
            "如果总分≥10分，建议寻求专业心理医生的评估",
            "如果第9题（自伤想法）得分≥1分，需要立即寻求专业帮助",
            "该量表仅供筛查使用，不能替代专业诊断"
        ],
        references: [
            {
                text: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9: validity of a brief depression severity measure. Journal of general internal medicine, 16(9), 606-613.",
                url: "https://link.springer.com/article/10.1046/j.1525-1497.2001.016009606.x"
            }
        ]
    },
    questions: [
        { id: 1, content: "做事时提不起劲或没有兴趣" },
        { id: 2, content: "感到心情低落、沮丧或绝望" },
        { id: 3, content: "入睡困难、睡不安稳或睡眠过多" },
        { id: 4, content: "感觉疲倦或没有活力" },
        { id: 5, content: "食欲不振或吃太多" },
        { id: 6, content: "觉得自己很糟糕，或觉得自己很失败，或让自己或家人失望" },
        { id: 7, content: "对事物专注有困难，例如阅读报纸或看电视时" },
        { id: 8, content: "动作或说话速度缓慢到别人已经察觉？或正好相反——比平时更加烦躁或坐立不安，动来动去" },
        { id: 9, content: "有不如死掉或用某种方式伤害自己的念头" }
    ],
    renderOptions: () => [
        { id: 1, content: "完全没有", value: "0" },
        { id: 2, content: "好几天", value: "1" },
        { id: 3, content: "一半以上的天数", value: "2" },
        { id: 4, content: "几乎每天", value: "3" }
    ]
};