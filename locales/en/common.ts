export default {
    severity: {
        normal: 'Normal',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe',
        minimal: 'Minimal',
        extremely_severe: 'Extremely Severe',
    },
    labels: {
        total_score: 'Total Score',
        severity_level: 'Severity Level',
        result_interpretation: 'Result Interpretation',
        professional_advice: 'Professional Advice',
        evaluation_result: 'Evaluation Result',
        high_score_items: 'High Score Items',
        needs_attention: 'Needs Attention',
    },
    crisis: {
        emergency_alert: 'Emergency Alert',
        suicide_risk: 'Suicide Risk',
        hotline_contact: 'Please immediately contact a mental health crisis hotline',
        immediate_actions: 'Immediate Actions Needed',
        professional_help: 'Seek professional help immediately',
    },
    disclaimers: {
        screening_tool: 'This is a screening tool',
        not_diagnostic: 'Results are not diagnostic',
        consult_professional: 'Please consult a professional',
    },
    advice: {
        maintain_good_state: 'Maintain good mental state',
        self_management: 'Self-management strategies',
        professional_treatment: 'Professional treatment recommended',
        lifestyle_management: 'Lifestyle management',
        social_support: 'Social support',
    },
} as const;
