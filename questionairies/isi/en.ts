import { Questionnaire } from "@/types";

export const isi: Questionnaire = {
    id: "isi",
    title: "ISI Insomnia Severity Index",
    description: "Assessment of insomnia severity and impact on daily life",
    tags: ["Insomnia", "Sleep Quality", "Self-assessment"],
    time: "2-3 minutes",
    details: {
        introduction: "The Insomnia Severity Index (ISI) is a brief, effective self-report questionnaire used to assess the severity of insomnia. The scale consists of 7 items that can quickly evaluate the impact of insomnia on an individual's daily functioning, and is widely used in clinical and research settings for insomnia assessment.",
        questionCount: "7 items",
        evaluationTime: "Usually 2-3 minutes",
        instructions: "Please rate your sleep situation over the past two weeks by selecting the option that best describes your actual situation. Each question has different scoring criteria.",
        scoringMethod: [
            "Total Score: Sum of all 7 items, range 0-28 points",
            "Severity: 0-7 = no clinically significant insomnia, 8-14 = subthreshold insomnia, 15-21 = moderate insomnia, 22-28 = severe insomnia",
            "Clinical significance: Total score ≥8 suggests insomnia problems, ≥15 recommends seeking professional help"
        ],
        dimensions: [
            { name: "Sleep Onset Difficulty", description: "Prolonged time needed to fall asleep after going to bed" },
            { name: "Sleep Maintenance Difficulty", description: "Frequent awakenings and difficulty returning to sleep" },
            { name: "Early Morning Awakening", description: "Waking earlier than desired and unable to return to sleep" },
            { name: "Sleep Satisfaction", description: "Overall satisfaction with current sleep pattern" },
            { name: "Daytime Functioning", description: "Impact of insomnia on daytime quality of life and functioning" },
            { name: "Others' Observation", description: "Degree to which others notice your sleep problems" },
            { name: "Worry Level", description: "Level of worry and distress about current sleep problems" }
        ],
        notes: [
            "This scale is suitable for assessing insomnia problems in adults",
            "If total score ≥15, consultation with a sleep specialist is recommended",
            "This scale is for screening purposes only and cannot replace professional diagnosis"
        ],
        references: [
            {
                text: "Bastien, C. H., Vallières, A., & Morin, C. M. (2001). Validation of the Insomnia Severity Index as an outcome measure for insomnia research. Sleep medicine, 2(4), 297-307.",
                url: "https://pubmed.ncbi.nlm.nih.gov/11438246/"
            }
        ]
    },
    questions: [
        { id: 1, content: "Severity of difficulty falling asleep" },
        { id: 2, content: "Severity of difficulty staying asleep" },
        { id: 3, content: "Severity of early morning awakening problems" },
        { id: 4, content: "How satisfied are you with your current sleep pattern?" },
        { id: 5, content: "To what extent do you consider your sleep problem to interfere with your daily functioning?" },
        { id: 6, content: "How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?" },
        { id: 7, content: "How worried/distressed are you about your current sleep problem?" }
    ],
    renderOptions: (id: number) => {
        switch (id) {
            case 1:
            case 2:
            case 3:
                return [
                    { id: 1, content: "None", value: "0" },
                    { id: 2, content: "Mild", value: "1" },
                    { id: 3, content: "Moderate", value: "2" },
                    { id: 4, content: "Severe", value: "3" },
                    { id: 5, content: "Very severe", value: "4" }
                ];
            case 4:
                return [
                    { id: 1, content: "Very satisfied", value: "0" },
                    { id: 2, content: "Satisfied", value: "1" },
                    { id: 3, content: "Moderately satisfied", value: "2" },
                    { id: 4, content: "Dissatisfied", value: "3" },
                    { id: 5, content: "Very dissatisfied", value: "4" }
                ];
            case 5:
            case 6:
            case 7:
                return [
                    { id: 1, content: "Not at all", value: "0" },
                    { id: 2, content: "A little", value: "1" },
                    { id: 3, content: "Somewhat", value: "2" },
                    { id: 4, content: "Much", value: "3" },
                    { id: 5, content: "Very much", value: "4" }
                ];
            default:
                return [
                    { id: 1, content: "None", value: "0" },
                    { id: 2, content: "Mild", value: "1" },
                    { id: 3, content: "Moderate", value: "2" },
                    { id: 4, content: "Severe", value: "3" },
                    { id: 5, content: "Very severe", value: "4" }
                ];
        }
    }
};