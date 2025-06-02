import { Questionnaire } from "../type";

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
        resultInterpretation: {
            normal: {
                explanation: "经过测验您【正常】，希望您继续保持良好的心情。",
                suggestions: ["保持健康的生活方式", "注意心理卫生", "积极参与社交活动"],
                range: "0-7分"
            },
            mild: {
                explanation: "经过检测您有【轻微强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                suggestions: ["学习简单的放松技术", "尝试正念冥想", "了解强迫症的知识", "如果症状持续，考虑寻求专业咨询"],
                range: "8-15分"
            },
            moderate: {
                explanation: "经过检测您有【中度强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                suggestions: ["建议寻求专业心理咨询", "学习认知行为疗法技术", "规律生活，保持充足睡眠", "告知亲友您的情况以获得支持"],
                range: "16-23分"
            },
            severe: {
                explanation: "经过检测您有【严重强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                suggestions: ["强烈建议立即寻求专业精神科或心理健康专家帮助", "可能需要药物治疗和心理治疗相结合", "建立支持系统", "避免过度压力和刺激"],
                range: "24-31分"
            },
            extreme: {
                explanation: "经过检测您有【极严重强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                suggestions: ["需要立即的专业医疗干预", "可能需要住院治疗", "综合治疗方案包括药物、心理治疗和支持性照顾", "家人需了解病情并提供密切支持"],
                range: "32-40分"
            }
        },
        notes: [
            "评估应在安静、不受干扰的环境中进行，确保测试者舒适和隐私。",
            "需要明确区分强迫症状与其他精神障碍症状。",
            "评估时应考虑症状的变化和波动，建议定期重复评估以监测变化。"
        ],
        references: [
            {
                text: "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006-1011.",
                url: "https://www.example.com/yale-brown-ocd-scale-1989"
            },
            {
                text: "张明园, 朱佳. (2015). 精神科评定量表手册(第三版). 长沙: 湖南科学技术出版社.",
                url: "https://www.example.com/psychiatric-rating-scales-2015"
            }
        ]
    },
    questions: [
        {
            content: "一天之中，强迫性意念占据您多少时间？",
            options: [
                { value: "0", text: "0小时，分数:0" },
                { value: "1", text: "0-1小时，分数:1" },
                { value: "2", text: "1-3小时，分数:2" },
                { value: "3", text: "3-8小时，分数:3" },
                { value: "4", text: "8小时以上，分数:4" }
            ]
        },
        {
            content: "强迫性意念，对您日常生活或工作的影响程度？",
            options: [
                { value: "0", text: "没有影响，分数:0" },
                { value: "1", text: "轻微影响，分数:1" },
                { value: "2", text: "中度影响，分数:2" },
                { value: "3", text: "严重影响，分数:3" },
                { value: "4", text: "完全无法工作/从事日常生活，分数:4" }
            ]
        },
        {
            content: "强迫性意念发生时，对您造成多大的困扰？",
            options: [
                { value: "0", text: "没有困扰，分数:0" },
                { value: "1", text: "轻微，分数:1" },
                { value: "2", text: "中等，分数:2" },
                { value: "3", text: "严重，分数:3" },
                { value: "4", text: "非常严重，一直持续痛苦，分数:4" }
            ]
        },
        {
            content: "强迫性意念发生时，您会在多少方面去抗拒它？",
            options: [
                { value: "0", text: "尽全力抗拒，分数:0" },
                { value: "1", text: "经常大部分强迫意念，分数:1" },
                { value: "2", text: "抗拒部分强迫意念，分数:2" },
                { value: "3", text: "会屈服，但不情愿，分数:3" },
                { value: "4", text: "心甘情愿不抗拒，分数:4" }
            ]
        },
        {
            content: "您可以控制您的强迫性意念？",
            options: [
                { value: "0", text: "完全可以，分数:0" },
                { value: "1", text: "大部分可以，分数:1" },
                { value: "2", text: "通常可以，分数:2" },
                { value: "3", text: "很难控制，分数:3" },
                { value: "4", text: "无法控制，分数:4" }
            ]
        },
        {
            content: "一天之中，强迫行为占据您多少时间？",
            options: [
                { value: "0", text: "0小时，分数:0" },
                { value: "1", text: "0-1小时，分数:1" },
                { value: "2", text: "1-3小时，分数:2" },
                { value: "3", text: "3-8小时，分数:3" },
                { value: "4", text: "8小时以上，分数:4" }
            ]
        },
        {
            content: "强迫行为，对您日常生活或工作的影响程度？",
            options: [
                { value: "0", text: "没有影响，分数:0" },
                { value: "1", text: "轻微影响，分数:1" },
                { value: "2", text: "中度影响，分数:2" },
                { value: "3", text: "严重影响，分数:3" },
                { value: "4", text: "完全无法工作/从事日常生活，分数:4" }
            ]
        },
        {
            content: "强迫行为发生时，对您造成多大的困扰？",
            options: [
                { value: "0", text: "没有困扰，分数:0" },
                { value: "1", text: "轻微，分数:1" },
                { value: "2", text: "中等，分数:2" },
                { value: "3", text: "严重，分数:3" },
                { value: "4", text: "非常严重，一直持续痛苦，分数:4" }
            ]
        },
        {
            content: "当强迫行为发生时，您会在多少方面去抗拒它？",
            options: [
                { value: "0", text: "尽全力抗拒，分数:0" },
                { value: "1", text: "经常大部分强迫行为，分数:1" },
                { value: "2", text: "抗拒部分强迫行为，分数:2" },
                { value: "3", text: "会屈服，但不情愿，分数:3" },
                { value: "4", text: "心甘情愿不抗拒，分数:4" }
            ]
        },
        {
            content: "您可以控制您的强迫行为吗？",
            options: [
                { value: "0", text: "完全可以，分数:0" },
                { value: "1", text: "大部分可以，分数:1" },
                { value: "2", text: "通常可以，分数:2" },
                { value: "3", text: "很难控制，分数:3" },
                { value: "4", text: "无法控制，分数:4" }
            ]
        }
    ]
}