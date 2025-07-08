export default {
    title: 'ISI Insomnia Assessment Results',
    severity: {
        no_insomnia: 'No Clinically Significant Insomnia',
        subthreshold: 'Subthreshold Insomnia',
        moderate: 'Moderate Insomnia',
        severe: 'Severe Insomnia',
    },
    labels: {
        total_score: 'Total Score',
        high_score_items: 'High Score Items',
        insomnia_level: 'Insomnia Level',
        result_interpretation: 'Result Interpretation',
        scoring_criteria: 'ISI Scoring Criteria',
        unknown: 'Unknown',
    },
    scoring: {
        range_0_7: '• 0-7 points: No clinically significant insomnia',
        range_8_14: '• 8-14 points: Subthreshold insomnia',
        range_15_21: '• 15-21 points: Moderate insomnia',
        range_22_28: '• 22-28 points: Severe insomnia',
    },
    advice: {
        sleep_specialist_message: 'It is recommended to consult a sleep specialist for professional sleep treatment.',
    },
} as const;
