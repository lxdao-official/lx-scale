import { Questionnaire } from "@/types";

export const ocd: Questionnaire = {
    id: "ocd",
    title: "Yale-Brown强迫症状量表",
    description: "评估强迫症状及其严重程度",
    tags: ["强迫", "自评量表", "简便"],
    time: "5-10分钟",
    details: {
        introduction: "耶鲁-布朗强迫症量表（Yale-Brown Obsessive Compulsive Scale, Y-BOCS）是由美国古德曼等人根据DSM-III-R诊断标准制定的专门测定强迫症状严重程度的量表，是临床上使用的评定强迫症的主要量表之一。整个量表共10个项目，用于反映测试者的强迫思维和强迫行为，下面请根据最近一周的情绪进行选择。",
        questionCount: "10个核心项目",
        evaluationTime: "通常为5-10分钟",
        instructions: "Y-BOCS量表包含10个项目，分别评估强迫观念(1-5题)和强迫行为(6-10题)的严重程度。每个项目按0-4分5级评分，0分表示无症状，4分表示极重症状。",
        scoringMethod: [
            "总分：将10个核心项目得分相加，范围0-40分。",
            "分量表分：强迫观念分量表(1-5题)和强迫行为分量表(6-10题)各0-20分。",
            "严重程度判断：总分0-7分为正常；8-15分为轻微强迫症状；16-23分为中度强迫症状；24-31分为严重强迫症状；32-40分为极严重强迫症状。"
        ],
        dimensions: [
            { name: "强迫观念时间", description: "评估患者每天被强迫观念占据的时间。" },
            { name: "强迫观念干扰", description: "评估强迫观念对患者社会功能和日常活动的干扰程度。" },
            { name: "强迫观念痛苦", description: "评估强迫观念引起的焦虑或痛苦程度。" },
            { name: "抵抗强迫观念", description: "评估患者抵抗强迫观念的努力程度。" },
            { name: "控制强迫观念", description: "评估患者对强迫观念的控制能力。" },
            { name: "强迫行为时间", description: "评估患者每天花在强迫行为上的时间。" },
            { name: "强迫行为干扰", description: "评估强迫行为对患者社会功能和日常活动的干扰程度。" },
            { name: "强迫行为痛苦", description: "评估如果阻止强迫行为会引起的焦虑程度。" },
            { name: "抵抗强迫行为", description: "评估患者抵抗强迫行为的努力程度。" },
            { name: "控制强迫行为", description: "评估患者对强迫行为的控制能力。" }
        ],
        notes: [
            "评估应在安静、不受干扰的环境中进行，确保测试者舒适和隐私。",
            "需要明确区分强迫症状与其他精神障碍症状。",
            "评估时应考虑症状的变化和波动，建议定期重复评估以监测变化。"
        ],
        references: [
            {
                text: "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006-1011.",
                url: "https://osf.io/tn2vg/download"
            }
        ]
    },
    questions: [
        {
            id: 1,
            content: "一天之中，强迫性意念占据您多少时间？",
        },
        {
            id: 2,
            content: "强迫性意念，对您日常生活或工作的影响程度？",
        },
        {
            id: 3,
            content: "强迫性意念发生时，对您造成多大的困扰？",
        },
        {
            id: 4,
            content: "强迫性意念发生时，您会在多少方面去抗拒它？",
        },
        {
            id: 5,
            content: "您可以控制您的强迫性意念？",
        },
        {
            id: 6,
            content: "一天之中，强迫行为占据您多少时间？",
        },
        {
            id: 7,
            content: "强迫行为，对您日常生活或工作的影响程度？",
        },
        {
            id: 8,
            content: "强迫行为发生时，对您造成多大的困扰？",
        },
        {
            id: 9,
            content: "当强迫行为发生时，您会在多少方面去抗拒它？",
        },
        {
            id: 10,
            content: "您可以控制您的强迫行为吗？",
        }
    ],
    // Return different options for different questions based on the official Chinese version of the Y-BOCS scale
    renderOptions: (id: number) => {
        // General severity (time ratio/impact/distress)
        const severityOptions = [
            { id: 1, content: '无', value: '0' },
            { id: 2, content: '轻度', value: '1' },
            { id: 3, content: '中度', value: '2' },
            { id: 4, content: '重度', value: '3' },
            { id: 5, content: '极重度', value: '4' },
        ];

        // Resistance level (questions 4 & 9)
        const resistanceOptions = [
            { id: 1, content: '总能抵抗', value: '0' },
            { id: 2, content: '大部分时间能抵抗', value: '1' },
            { id: 3, content: '有时能抵抗', value: '2' },
            { id: 4, content: '很少能抵抗', value: '3' },
            { id: 5, content: '完全无法抵抗', value: '4' },
        ];

        // Control ability (questions 5 & 10)
        const controlOptions = [
            { id: 1, content: '完全可以控制', value: '0' },
            { id: 2, content: '大部分时间可以控制', value: '1' },
            { id: 3, content: '有时可以控制', value: '2' },
            { id: 4, content: '很少可以控制', value: '3' },
            { id: 5, content: '完全不能控制', value: '4' },
        ];

        switch (id) {
            case 4:
            case 9:
                return resistanceOptions;
            case 5:
            case 10:
                return controlOptions;
            default:
                return severityOptions;
        }
    }
}