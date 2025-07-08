export default {
    severity: {
        mild_depression: 'Mild Depression',
        moderate_depression: 'Moderate Depression',
        severe_depression: 'Severe Depression',
    },
    labels: {
        raw_total_score: 'Raw Total Score',
        standard_score: 'Standard Score',
        depression_level: 'Depression Level',
    },
    clinical: {
        scale_description: 'Scale Description',
        scoring_method: 'Scoring Method',
        positive_scoring_items: 'Positive Scoring Items',
        reverse_scoring_items: 'Reverse Scoring Items',
    },
    interpretation: {
        normal: 'No significant depressive symptoms',
        mild: 'You may have mild depressive symptoms',
        moderate: 'You may have moderate depressive symptoms',
        severe: 'You may have severe depressive symptoms',
    },
} as const;
