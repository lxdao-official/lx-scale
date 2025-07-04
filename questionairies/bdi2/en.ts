import { Questionnaire } from "@/types";

export const bdi2: Questionnaire = {
    id: "bdi2",
    title: "BDI-II Beck Depression Inventory",
    description: "Gold standard tool for depression symptom assessment",
    tags: ["Depression", "Self-assessment", "Clinical Assessment"],
    time: "5-10 minutes",
    details: {
        introduction: "The Beck Depression Inventory-II (BDI-II) is one of the most widely used instruments for screening and assessing depression severity. The scale consists of 21 items, each describing a specific symptom of depression, designed based on DSM-IV diagnostic criteria for depression. BDI-II has excellent reliability and validity and is considered the gold standard for depression symptom assessment.",
        questionCount: "21 items",
        evaluationTime: "Usually 5-10 minutes",
        instructions: "This questionnaire consists of 21 groups of statements. Please read each group of statements carefully, then pick out the one statement in each group that best describes the way you have been feeling during the past two weeks, including today. Each group is rated from 0 to 3 in order of increasing severity.",
        scoringMethod: [
            "Total Score: Sum of all 21 items, range 0-63 points",
            "Severity: 0-13 = minimal/no depression, 14-19 = mild depression, 20-28 = moderate depression, 29-63 = severe depression",
            "Clinical significance: Score ≥14 suggests further evaluation needed, ≥29 indicates severe depression requiring immediate attention"
        ],
        dimensions: [
            { name: "Emotional Symptoms", description: "Sadness, hopelessness, crying, irritability and other emotional manifestations" },
            { name: "Cognitive Symptoms", description: "Self-criticism, guilt, indecisiveness, concentration problems" },
            { name: "Somatic Symptoms", description: "Fatigue, sleep problems, appetite changes, loss of sexual interest" },
            { name: "Behavioral Symptoms", description: "Social withdrawal, loss of interest, decreased work ability" }
        ],
        notes: [
            "This scale is suitable for adolescents aged 13 and above and adults",
            "If total score ≥29 or suicidal ideation present, immediate professional help is needed",
            "This scale is for screening purposes only and cannot replace professional diagnosis"
        ],
        references: [
            {
                text: "Beck, A. T., Steer, R. A., & Brown, G. K. (1996). Manual for the Beck Depression Inventory-II. San Antonio, TX: Psychological Corporation.",
                url: "https://www.pearsonassessments.com"
            }
        ]
    },
    questions: [
        { id: 1, content: "Sadness" },
        { id: 2, content: "Pessimism" },
        { id: 3, content: "Past Failure" },
        { id: 4, content: "Loss of Pleasure" },
        { id: 5, content: "Guilty Feelings" },
        { id: 6, content: "Punishment Feelings" },
        { id: 7, content: "Self-Dislike" },
        { id: 8, content: "Self-Criticalness" },
        { id: 9, content: "Suicidal Thoughts or Wishes" },
        { id: 10, content: "Crying" },
        { id: 11, content: "Agitation" },
        { id: 12, content: "Loss of Interest" },
        { id: 13, content: "Indecisiveness" },
        { id: 14, content: "Worthlessness" },
        { id: 15, content: "Loss of Energy" },
        { id: 16, content: "Changes in Sleeping Pattern" },
        { id: 17, content: "Irritability" },
        { id: 18, content: "Changes in Appetite" },
        { id: 19, content: "Concentration Difficulty" },
        { id: 20, content: "Tiredness or Fatigue" },
        { id: 21, content: "Loss of Interest in Sex" }
    ],
    renderOptions: (id: number) => {
        // Return different options based on different items
        switch (id) {
            case 1: // Sadness
                return [
                    { id: 1, content: "I do not feel sad", value: "0" },
                    { id: 2, content: "I feel sad much of the time", value: "1" },
                    { id: 3, content: "I am sad all the time", value: "2" },
                    { id: 4, content: "I am so sad or unhappy that I can't stand it", value: "3" }
                ];
            case 2: // Pessimism
                return [
                    { id: 1, content: "I am not discouraged about my future", value: "0" },
                    { id: 2, content: "I feel more discouraged about my future than I used to", value: "1" },
                    { id: 3, content: "I do not expect things to work out for me", value: "2" },
                    { id: 4, content: "I feel my future is hopeless and will only get worse", value: "3" }
                ];
            case 9: // Suicidal Thoughts or Wishes
                return [
                    { id: 1, content: "I don't have any thoughts of killing myself", value: "0" },
                    { id: 2, content: "I have thoughts of killing myself, but I would not carry them out", value: "1" },
                    { id: 3, content: "I would like to kill myself", value: "2" },
                    { id: 4, content: "I would kill myself if I had the chance", value: "3" }
                ];
            default:
                // Generic option template
                return [
                    { id: 1, content: "No symptoms", value: "0" },
                    { id: 2, content: "Mild", value: "1" },
                    { id: 3, content: "Moderate", value: "2" },
                    { id: 4, content: "Severe", value: "3" }
                ];
        }
    }
};