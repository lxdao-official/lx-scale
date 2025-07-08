export default {
    severity: {
        minimal: '无/最低程度',
        mild_depression: '轻度抑郁',
        moderate_depression: '中度抑郁',
        moderately_severe_depression: '中重度抑郁',
        severe_depression: '重度抑郁',
    },
    labels: {
        high_score_item_count: '高分项目数',
    },
    clinical: {
        major_depression_criteria: '主要抑郁发作的筛查标准',
    },
    questions: {
        0: '对事情提不起兴趣或没有愉快感',
        1: '感到心情低落、沮丧或绝望',
        2: '入睡困难、睡眠不稳或睡眠过多',
        3: '感觉疲倦或没有活力',
        4: '食欲不振或吃太多',
        5: '觉得自己很糟或觉得自己很失败',
        6: '对事情很难集中注意力',
        7: '动作或说话速度缓慢，或者很焦躁',
        8: '有伤害自己或死掉的念头',
    },
    recommendations: {
        minimal: '继续保持良好的心理健康习惯',
        mild: '考虑生活方式调整和自我护理',
        moderate: '考虑寻求专业帮助和治疗',
        severe: '立即寻求专业帮助',
    },
} as const;
