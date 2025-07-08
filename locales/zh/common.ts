export default {
    severity: {
        normal: '正常',
        mild: '轻度',
        moderate: '中度',
        severe: '重度',
        minimal: '最低程度',
        extremely_severe: '极重度',
    },
    labels: {
        total_score: '总分',
        severity_level: '严重程度',
        result_interpretation: '结果解释',
        professional_advice: '专业建议',
        evaluation_result: '评估结果',
        high_score_items: '高分项目',
        needs_attention: '需要关注',
    },
    crisis: {
        emergency_alert: '紧急提醒',
        suicide_risk: '自杀风险',
        hotline_contact: '请立即联系心理危机干预热线',
        immediate_actions: '需要立即采取行动',
        professional_help: '立即寻求专业帮助',
    },
    disclaimers: {
        screening_tool: '这是一个筛查工具',
        not_diagnostic: '结果不构成诊断',
        consult_professional: '请咨询专业人士',
    },
    advice: {
        maintain_good_state: '保持良好心理状态',
        self_management: '自我管理策略',
        professional_treatment: '建议专业治疗',
        lifestyle_management: '生活方式管理',
        social_support: '社会支持',
    },
} as const;
