import { Questionnaire } from "@/types";

export const isi: Questionnaire = {
    id: "isi",
    title: "ISI失眠严重程度指数",
    description: "评估失眠问题的严重程度和对生活的影响",
    tags: ["失眠", "睡眠质量", "自评量表"],
    time: "2-3分钟",
    details: {
        introduction: "失眠严重程度指数（Insomnia Severity Index, ISI）是一个简短、有效的自评量表，用于评估失眠的严重程度。该量表由7个项目组成，能够快速评估失眠对个体日常功能的影响程度，是临床和研究中广泛使用的失眠评估工具。",
        questionCount: "7个项目",
        evaluationTime: "通常为2-3分钟",
        instructions: "请根据您最近两周的睡眠情况，选择最符合您实际情况的选项。每个问题都有不同的评分标准。",
        scoringMethod: [
            "总分：将7个项目得分相加，范围0-28分",
            "严重程度：0-7分为无临床意义失眠，8-14分为亚临床失眠，15-21分为中度失眠，22-28分为重度失眠",
            "临床意义：总分≥8分提示存在失眠问题，≥15分建议寻求专业帮助"
        ],
        dimensions: [
            { name: "入睡困难", description: "从上床到入睡所需时间的延长" },
            { name: "维持睡眠困难", description: "夜间醒来次数和再次入睡的困难" },
            { name: "早醒", description: "比期望时间更早醒来且无法再次入睡" },
            { name: "睡眠满意度", description: "对目前睡眠模式的整体满意程度" },
            { name: "日间功能", description: "失眠对日间生活质量和功能的影响" },
            { name: "他人观察", description: "他人对您睡眠问题的注意程度" },
            { name: "担心程度", description: "对当前睡眠问题的担心和痛苦程度" }
        ],
        notes: [
            "该量表适用于成年人失眠问题评估",
            "如果总分≥15分，建议咨询睡眠专科医生",
            "该量表仅供筛查使用，不能替代专业诊断"
        ],
        references: [
            {
                text: "Bastien, C. H., Vallières, A., & Morin, C. M. (2001). Validation of the Insomnia Severity Index as an outcome measure for insomnia research. Sleep medicine, 2(4), 297-307.",
                url: "https://pubmed.ncbi.nlm.nih.gov/11438246/"
            }
        ]
    },
    questions: [
        { id: 1, content: "入睡困难的严重程度" },
        { id: 2, content: "维持睡眠困难的严重程度" },
        { id: 3, content: "早醒问题的严重程度" },
        { id: 4, content: "您对目前睡眠模式的满意度如何？" },
        { id: 5, content: "您认为您的睡眠问题在多大程度上干扰了您的日常功能？" },
        { id: 6, content: "其他人在多大程度上注意到您的睡眠问题对您生活质量的影响？" },
        { id: 7, content: "您对目前睡眠问题的担心或痛苦程度如何？" }
    ],
    renderOptions: (id: number) => {
        switch (id) {
            case 1:
            case 2:
            case 3:
                return [
                    { id: 1, content: "无", value: "0" },
                    { id: 2, content: "轻度", value: "1" },
                    { id: 3, content: "中度", value: "2" },
                    { id: 4, content: "重度", value: "3" },
                    { id: 5, content: "极重度", value: "4" }
                ];
            case 4:
                return [
                    { id: 1, content: "非常满意", value: "0" },
                    { id: 2, content: "满意", value: "1" },
                    { id: 3, content: "一般满意", value: "2" },
                    { id: 4, content: "不满意", value: "3" },
                    { id: 5, content: "非常不满意", value: "4" }
                ];
            case 5:
            case 6:
            case 7:
                return [
                    { id: 1, content: "完全不", value: "0" },
                    { id: 2, content: "轻微", value: "1" },
                    { id: 3, content: "有些", value: "2" },
                    { id: 4, content: "很多", value: "3" },
                    { id: 5, content: "非常多", value: "4" }
                ];
            default:
                return [
                    { id: 1, content: "无", value: "0" },
                    { id: 2, content: "轻度", value: "1" },
                    { id: 3, content: "中度", value: "2" },
                    { id: 4, content: "重度", value: "3" },
                    { id: 5, content: "极重度", value: "4" }
                ];
        }
    }
};