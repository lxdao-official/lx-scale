export default {
    severity: {
        mild_depression: '轻度抑郁',
        moderate_depression: '中度抑郁',
        severe_depression: '重度抑郁',
    },
    labels: {
        raw_total_score: '原始总分',
        standard_score: '标准分',
        depression_level: '抑郁程度',
    },
    clinical: {
        scale_description: '量表说明',
        scoring_method: '计分方式',
        positive_scoring_items: '正向计分项目',
        reverse_scoring_items: '反向计分项目',
    },
    interpretation: {
        normal: '无明显抑郁症状',
        mild: '您可能存在轻度抑郁症状',
        moderate: '您可能存在中度抑郁症状',
        severe: '您可能存在重度抑郁症状',
    },
} as const;
