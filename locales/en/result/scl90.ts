export default {
    factors: {
        somatization: 'Somatization',
        obsessive: 'Obsessive-Compulsive',
        interpersonal: 'Interpersonal Sensitivity',
        depression: 'Depression',
        anxiety: 'Anxiety',
        hostility: 'Hostility',
        phobic: 'Phobic Anxiety',
        paranoid: 'Paranoid Ideation',
        psychotic: 'Psychoticism',
        other: 'Other',
    },
    labels: {
        overall_assessment: 'Overall Assessment',
        positive_item_count: 'Positive Item Count',
        positive_symptom_average: 'Positive Symptom Average',
        factor_analysis: 'Factor Analysis',
    },
    clinical: {
        rating_criteria: 'Rating Criteria',
        judgment_criteria: 'Judgment Criteria',
        rating_scale: '1 = Not at all | 2 = A little bit | 3 = Moderately | 4 = Quite a bit | 5 = Extremely',
        total_score_criteria: 'Total score ≥ 160 or positive items ≥ 43: Suggests possible psychological problems',
        factor_score_2: 'Factor score ≥ 2: This factor is abnormal and needs attention',
        factor_score_3: 'Factor score ≥ 3: This factor is severely abnormal, professional help recommended',
    },
    warnings: {
        severe_condition: 'Your symptoms may indicate a serious condition. Please seek professional help immediately.',
        unknown_level: 'Unknown',
    },
    description: {
        total_score: 'Total score reflects overall psychological distress level',
        positive_items: 'Number of items rated above "not at all"',
        positive_average: 'Average score of positive items',
    },
    interpretation: {
        normal: 'Your psychological state is within normal range',
        mild: 'You may have mild psychological symptoms',
        moderate: 'You may have moderate psychological symptoms',
        severe: 'You may have severe psychological symptoms',
    },
} as const;
