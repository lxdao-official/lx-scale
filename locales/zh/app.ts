export default {
    questionnaire: {
        page: {
            title: '问卷详情',
            introduction: '简介',
            questionCount: '问题数',
            evaluationTime: '测评时间',
            instructions: '测试说明',
            scoringMethod: '评分方法',
            dimensions: '维度说明',
            notes: '注意事项',
            references: '参考资料',
            startSurvey: '开始测评',
        },
        survey: {
            depressionOption1: '没有或很少时间',
            depressionOption2: '小部分时间',
            depressionOption3: '相当多时间',
            depressionOption4: '绝大部分或全部时间',
            defaultOption1: '没有',
            defaultOption2: '很轻',
            defaultOption3: '中等',
            defaultOption4: '偏重',
            defaultOption5: '严重',
        },
        result: {
            resultNotFoundTitle: '结果未找到',
            resultNotFoundDesc: '无法获取您的测评结果，请重新完成测评。',
            retryTest: '重新测评',
        },
    },
} as const;
