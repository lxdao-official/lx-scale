import { Questionnaire } from "@/types";

export const pss10: Questionnaire = {
    id: "pss10",
    title: "PSS-10 Perceived Stress Scale",
    description: "Assessment of individual's subjective perception of stress in life",
    tags: ["Stress", "Self-assessment", "Mental Health"],
    time: "3-5 minutes",
    details: {
        introduction: "The Perceived Stress Scale-10 (PSS-10) is a widely used psychological stress assessment tool. The scale consists of 10 items that primarily assess an individual's perception of stress from life events over the past month. PSS-10 does not measure specific stressors, but rather measures an individual's subjective experience of stress and perceived coping ability.",
        questionCount: "10 items",
        evaluationTime: "Usually 3-5 minutes",
        instructions: "Please rate how often you felt or thought a certain way during the past month. Choose the option that best describes your situation. Each question has five choices: Never, Almost never, Sometimes, Fairly often, Very often.",
        scoringMethod: [
            "Total Score: Sum of all 10 items, range 0-40 points",
            "Positive items: 1, 2, 3, 6, 9, 10 (scored normally)",
            "Negative items: 4, 5, 7, 8 (reverse scored)",
            "Severity: Higher scores indicate greater perceived stress"
        ],
        dimensions: [
            { name: "Stress Perception", description: "Perception of unpredictability and uncontrollability in life" },
            { name: "Coping Ability", description: "Confidence in one's ability to cope and control situations" },
            { name: "Stress Overload", description: "Feeling that life demands exceed coping abilities" },
            { name: "Emotional Response", description: "Emotional reactions to stressful situations" }
        ],
        notes: [
            "This scale is suitable for assessing stress perception levels in adults",
            "PSS-10 scores do not have absolute cutoff values and need comprehensive analysis",
            "Persistent high stress perception may affect physical and mental health"
        ],
        references: [
            {
                text: "Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of health and social behavior, 385-396.",
                url: "https://www.jstor.org/stable/2136404"
            }
        ]
    },
    questions: [
        { id: 1, content: "How often have you been upset because of something that happened unexpectedly?" },
        { id: 2, content: "How often have you felt that you were unable to control the important things in your life?" },
        { id: 3, content: "How often have you felt nervous and stressed?" },
        { id: 4, content: "How often have you felt confident about your ability to handle your personal problems?" },
        { id: 5, content: "How often have you felt that things were going your way?" },
        { id: 6, content: "How often have you found that you could not cope with all the things that you had to do?" },
        { id: 7, content: "How often have you been able to control irritations in your life?" },
        { id: 8, content: "How often have you felt that you were on top of things?" },
        { id: 9, content: "How often have you been angered because of things that were outside of your control?" },
        { id: 10, content: "How often have you felt difficulties were piling up so high that you could not overcome them?" }
    ],
    renderOptions: () => [
        { id: 1, content: "Never", value: "0" },
        { id: 2, content: "Almost never", value: "1" },
        { id: 3, content: "Sometimes", value: "2" },
        { id: 4, content: "Fairly often", value: "3" },
        { id: 5, content: "Very often", value: "4" }
    ]
};