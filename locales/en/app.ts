export default {
    questionnaire: {
        page: {
            title: 'Questionnaire Details',
            introduction: 'Introduction',
            questionCount: 'Number of Questions',
            evaluationTime: 'Evaluation Time',
            instructions: 'Test Instructions',
            scoringMethod: 'Scoring Method',
            dimensions: 'Dimension Explanation',
            notes: 'Notes',
            references: 'References',
            startSurvey: 'Start Assessment',
        },
        survey: {
            depressionOption1: 'None or rarely',
            depressionOption2: 'A small portion of the time',
            depressionOption3: 'A significant amount of time',
            depressionOption4: 'Most or all of the time',
            defaultOption1: 'None',
            defaultOption2: 'Very mild',
            defaultOption3: 'Moderate',
            defaultOption4: 'Relatively severe',
            defaultOption5: 'Severe',
        },
        result: {
            resultNotFoundTitle: 'Result Not Found',
            resultNotFoundDesc: 'Your assessment result could not be retrieved. Please complete the assessment again.',
            retryTest: 'Retake Assessment',
        },
    },
} as const;
