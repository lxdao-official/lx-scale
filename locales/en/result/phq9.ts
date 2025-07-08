export default {
    severity: {
        minimal: 'Minimal/None',
        mild_depression: 'Mild Depression',
        moderate_depression: 'Moderate Depression',
        moderately_severe_depression: 'Moderately Severe Depression',
        severe_depression: 'Severe Depression',
    },
    labels: {
        high_score_item_count: 'High Score Item Count',
    },
    clinical: {
        major_depression_criteria: 'Major Depression Screening Criteria',
    },
    questions: {
        0: 'Little interest or pleasure in doing things',
        1: 'Feeling down, depressed, or hopeless',
        2: 'Trouble falling or staying asleep, or sleeping too much',
        3: 'Feeling tired or having little energy',
        4: 'Poor appetite or overeating',
        5: 'Feeling bad about yourself or that you are a failure',
        6: 'Trouble concentrating on things',
        7: 'Moving or speaking slowly, or being fidgety',
        8: 'Thoughts that you would be better off dead or of hurting yourself',
    },
    recommendations: {
        minimal: 'Continue maintaining good mental health habits',
        mild: 'Consider lifestyle modifications and self-care',
        moderate: 'Consider professional help and therapy',
        severe: 'Seek immediate professional help',
    },
} as const;
