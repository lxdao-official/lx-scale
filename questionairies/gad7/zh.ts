import { Questionnaire } from "@/types";

export const gad7: Questionnaire = {
    id: "gad7",
    title: "GAD-7广泛性焦虑量表",
    description: "评估广泛性焦虑症状的严重程度",
    tags: ["焦虑", "自评量表", "筛查"],
    time: "2-5分钟",
    details: {
        introduction: "广泛性焦虑量表（Generalized Anxiety Disorder 7-item scale, GAD-7）是一个简单、有效的焦虑症筛查工具。该量表由7个项目组成，能够快速评估个体在过去两周内的焦虑症状严重程度。GAD-7被广泛用于临床和研究中，具有良好的信效度。",
        questionCount: "7个项目",
        evaluationTime: "通常为2-5分钟",
        instructions: "请根据您在过去两周内的实际感受，选择最符合您情况的选项。每个问题都有四个选择：完全没有、好几天、一半以上的天数、几乎每天。",
        scoringMethod: [
            "总分：将7个项目得分相加，范围0-21分",
            "计分方式：完全没有=0分，好几天=1分，一半以上的天数=2分，几乎每天=3分",
            "严重程度：0-4分为最低水平，5-9分为轻度，10-14分为中度，15-21分为重度焦虑"
        ],
        dimensions: [
            { name: "担心程度", description: "过度担心不同事情的频率和强度" },
            { name: "控制能力", description: "控制或停止担心的能力" },
            { name: "身体症状", description: "坐立不安、易疲劳等身体表现" },
            { name: "注意力", description: "注意力集中困难" },
            { name: "易激惹", description: "容易烦躁或易怒" },
            { name: "肌肉紧张", description: "肌肉紧张、疼痛或酸痛" },
            { name: "睡眠问题", description: "入睡困难、睡眠不安或睡眠不足" }
        ],
        notes: [
            "该量表适用于成年人焦虑症状筛查",
            "如果总分≥10分，建议寻求专业心理医生的评估",
            "该量表仅供筛查使用，不能替代专业诊断"
        ],
        references: [
            {
                text: "Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of internal medicine, 166(10), 1092-1097.",
                url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326"
            }
        ]
    },
    questions: [
        { id: 1, content: "感到紧张、担心或焦虑" },
        { id: 2, content: "无法停止或控制担心" },
        { id: 3, content: "对各种各样的事情担心过多" },
        { id: 4, content: "很难放松下来" },
        { id: 5, content: "坐立不安，难以静坐" },
        { id: 6, content: "变得容易烦恼或易怒" },
        { id: 7, content: "感到好像有什么可怕的事情会发生" }
    ],
    renderOptions: () => [
        { id: 1, content: "完全没有", value: "0" },
        { id: 2, content: "好几天", value: "1" },
        { id: 3, content: "一半以上的天数", value: "2" },
        { id: 4, content: "几乎每天", value: "3" }
    ]
};