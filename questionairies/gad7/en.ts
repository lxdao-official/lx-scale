import { Questionnaire } from "@/types";

export const gad7: Questionnaire = {
    id: "gad7",
    title: "GAD-7 Generalized Anxiety Disorder Scale",
    description: "Assessment of the severity of generalized anxiety disorder symptoms",
    tags: ["Anxiety", "Self-assessment", "Screening"],
    time: "2-5 minutes",
    details: {
        introduction: "The Generalized Anxiety Disorder 7-item scale (GAD-7) is a simple and effective screening tool for anxiety disorders. The scale consists of 7 items that can quickly assess the severity of anxiety symptoms in individuals over the past two weeks. GAD-7 is widely used in clinical and research settings with good reliability and validity.",
        questionCount: "7 items",
        evaluationTime: "Usually 2-5 minutes",
        instructions: "Please rate how often you have been bothered by each of the following problems over the past 2 weeks. Choose the option that best describes your situation. Each question has four choices: Not at all, Several days, More than half the days, Nearly every day.",
        scoringMethod: [
            "Total Score: Sum of all 7 items, range 0-21 points",
            "Scoring: Not at all=0, Several days=1, More than half the days=2, Nearly every day=3",
            "Severity: 0-4 = minimal anxiety, 5-9 = mild anxiety, 10-14 = moderate anxiety, 15-21 = severe anxiety"
        ],
        dimensions: [
            { name: "Worry Level", description: "Frequency and intensity of excessive worry about different things" },
            { name: "Control Ability", description: "Ability to control or stop worrying" },
            { name: "Physical Symptoms", description: "Restlessness, fatigue and other physical manifestations" },
            { name: "Attention", description: "Difficulty concentrating" },
            { name: "Irritability", description: "Easily annoyed or irritable" },
            { name: "Muscle Tension", description: "Muscle tension, aches or soreness" },
            { name: "Sleep Problems", description: "Trouble falling asleep, staying asleep, or restless sleep" }
        ],
        notes: [
            "This scale is suitable for screening anxiety symptoms in adults",
            "If total score ≥10, professional evaluation is recommended",
            "This scale is for screening purposes only and cannot replace professional diagnosis"
        ],
        references: [
            {
                text: "Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: the GAD-7. Archives of internal medicine, 166(10), 1092-1097.",
                url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326"
            }
        ]
    },
    questions: [
        { id: 1, content: "Feeling nervous, anxious, or on edge" },
        { id: 2, content: "Not being able to stop or control worrying" },
        { id: 3, content: "Worrying too much about different things" },
        { id: 4, content: "Trouble relaxing" },
        { id: 5, content: "Being so restless that it's hard to sit still" },
        { id: 6, content: "Becoming easily annoyed or irritable" },
        { id: 7, content: "Feeling afraid as if something awful might happen" }
    ],
    renderOptions: () => [
        { id: 1, content: "Not at all", value: "0" },
        { id: 2, content: "Several days", value: "1" },
        { id: 3, content: "More than half the days", value: "2" },
        { id: 4, content: "Nearly every day", value: "3" }
    ]
};