import { Questionnaire } from "@/types";

export const phq9: Questionnaire = {
    id: "phq9",
    title: "PHQ-9 Patient Health Questionnaire",
    description: "Assessment of the severity and frequency of depressive symptoms",
    tags: ["Depression", "Self-assessment", "Screening"],
    time: "3-5 minutes",
    details: {
        introduction: "The Patient Health Questionnaire-9 (PHQ-9) is a widely used screening and assessment tool for depression. The questionnaire consists of 9 items based on the depression symptom criteria in DSM-IV diagnostic standards. PHQ-9 can not only be used to screen for depression but also assess the severity of depressive symptoms and treatment effectiveness.",
        questionCount: "9 items",
        evaluationTime: "Usually 3-5 minutes",
        instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems? Choose the option that best describes your situation. Each question has four choices: Not at all, Several days, More than half the days, Nearly every day.",
        scoringMethod: [
            "Total Score: Sum of all 9 items, range 0-27 points",
            "Scoring: Not at all=0, Several days=1, More than half the days=2, Nearly every day=3",
            "Severity: 0-4 = minimal/none, 5-9 = mild, 10-14 = moderate, 15-19 = moderately severe, 20-27 = severe depression"
        ],
        dimensions: [
            { name: "Loss of Interest", description: "Little interest or pleasure in doing things" },
            { name: "Depressed Mood", description: "Feeling down, depressed, or hopeless" },
            { name: "Sleep Problems", description: "Trouble falling or staying asleep, or sleeping too much" },
            { name: "Fatigue", description: "Feeling tired or having little energy" },
            { name: "Appetite Changes", description: "Poor appetite or overeating" },
            { name: "Self-Worth", description: "Feeling bad about yourself or that you are a failure" },
            { name: "Concentration", description: "Trouble concentrating on things" },
            { name: "Psychomotor", description: "Moving or speaking slowly, or being fidgety/restless" },
            { name: "Self-Harm Thoughts", description: "Thoughts of being better off dead or hurting yourself" }
        ],
        notes: [
            "This scale is suitable for screening and assessing depressive symptoms in adults",
            "If total score ≥10, professional evaluation is recommended",
            "If item 9 (self-harm thoughts) scores ≥1, immediate professional help is needed",
            "This scale is for screening purposes only and cannot replace professional diagnosis"
        ],
        references: [
            {
                text: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9: validity of a brief depression severity measure. Journal of general internal medicine, 16(9), 606-613.",
                url: "https://link.springer.com/article/10.1046/j.1525-1497.2001.016009606.x"
            }
        ]
    },
    questions: [
        { id: 1, content: "Little interest or pleasure in doing things" },
        { id: 2, content: "Feeling down, depressed, or hopeless" },
        { id: 3, content: "Trouble falling or staying asleep, or sleeping too much" },
        { id: 4, content: "Feeling tired or having little energy" },
        { id: 5, content: "Poor appetite or overeating" },
        { id: 6, content: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
        { id: 7, content: "Trouble concentrating on things, such as reading the newspaper or watching television" },
        { id: 8, content: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
        { id: 9, content: "Thoughts that you would be better off dead or of hurting yourself in some way" }
    ],
    renderOptions: () => [
        { id: 1, content: "Not at all", value: "0" },
        { id: 2, content: "Several days", value: "1" },
        { id: 3, content: "More than half the days", value: "2" },
        { id: 4, content: "Nearly every day", value: "3" }
    ]
};