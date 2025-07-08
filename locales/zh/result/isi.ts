export default {
    title: 'ISI 失眠评估结果',
    severity: {
        no_insomnia: '无临床意义失眠',
        subthreshold: '亚临床失眠',
        moderate: '中度失眠',
        severe: '重度失眠',
    },
    labels: {
        total_score: '总分',
        high_score_items: '高分项目数',
        insomnia_level: '失眠程度',
        result_interpretation: '结果解释',
        scoring_criteria: 'ISI 评分标准',
        unknown: '未知',
    },
    scoring: {
        range_0_7: '• 0-7分：无临床意义失眠',
        range_8_14: '• 8-14分：亚临床失眠',
        range_15_21: '• 15-21分：中度失眠',
        range_22_28: '• 22-28分：重度失眠',
    },
    advice: {
        sleep_specialist_message: '建议咨询睡眠专科医生，寻求专业的睡眠治疗方案。',
    },
} as const;
