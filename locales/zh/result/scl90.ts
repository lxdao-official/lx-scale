export default {
    factors: {
        somatization: '躯体化',
        obsessive: '强迫症状',
        interpersonal: '人际关系敏感',
        depression: '抑郁',
        anxiety: '焦虑',
        hostility: '敌对',
        phobic: '恐怖',
        paranoid: '偏执',
        psychotic: '精神病性',
        other: '其他',
    },
    labels: {
        overall_assessment: '总体评估',
        positive_item_count: '阳性项目数',
        positive_symptom_average: '阳性症状均分',
        factor_analysis: '因子分析',
    },
    clinical: {
        rating_criteria: '评分标准',
        judgment_criteria: '判断标准',
    },
    warnings: {
        severe_condition: '您的症状可能表明存在严重问题，请立即寻求专业帮助。',
    },
    description: {
        total_score: '总分反映整体心理困扰水平',
        positive_items: '评分高于"没有"的项目数量',
        positive_average: '阳性项目的平均分',
    },
    interpretation: {
        normal: '您的心理状态处于正常范围',
        mild: '您可能存在轻度心理症状',
        moderate: '您可能存在中度心理症状',
        severe: '您可能存在重度心理症状',
    },
} as const;
