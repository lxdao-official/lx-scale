import { Questionnaire } from "../type";

export const ocd: Questionnaire = {
    id: "ocd",
    title: "Yale-Brown Obsessive Compulsive Scale",
    description: "Assessment of obsessive-compulsive symptoms and their severity",
    tags: ["Obsessive", "Self-assessment", "Simple"],
    time: "5-10 minutes",
    details: {
        introduction: "The Yale-Brown Obsessive Compulsive Scale (Y-BOCS) is a scale specifically designed by Goodman et al. from the United States according to the DSM-III-R diagnostic criteria to measure the severity of obsessive-compulsive symptoms, and is one of the main scales used clinically to assess obsessive-compulsive disorder. The entire scale consists of 10 items, used to reflect the test-taker's obsessive thoughts and compulsive behaviors. Please make selections based on your emotions over the past week.",
        questionCount: "10 core items",
        evaluationTime: "About 5-10 minutes",
        instructions: "The following questions ask about your obsessive-compulsive symptoms. Please select the option that best describes your situation over the past week.",
        scoringMethod: [
            "Each question scores from 0 to 4 points.",
            "0-7 points: Normal or subclinical state.",
            "8-15 points: Mild obsessive-compulsive symptoms.",
            "16-23 points: Moderate obsessive-compulsive symptoms.",
            "24-31 points: Severe obsessive-compulsive symptoms.",
            "32-40 points: Extreme obsessive-compulsive symptoms."
        ],
        dimensions: [
            { name: "Obsessive Thoughts", description: "Unwanted, intrusive, and distressing thoughts, images, or urges." },
            { name: "Compulsive Behaviors", description: "Repetitive behaviors or mental acts performed to reduce anxiety." }
        ],
        notes: [
            "This scale assesses the severity of obsessive-compulsive symptoms without diagnosing obsessive-compulsive disorder.",
            "If you have a high score, please consult a professional psychiatrist or psychologist for diagnosis and treatment."
        ],
        references: [
            {
                text: "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of general psychiatry, 46(11), 1006-1011.",
                url: "https://www.example.com/ybocs-1989"
            }
        ]
    },
    questions: [
        { id: 1, content: "How much time do you spend on obsessive thoughts?" },
        { id: 2, content: "How much do obsessive thoughts interfere with your social or work functioning?" },
        { id: 3, content: "How much distress do your obsessive thoughts cause you?" },
        { id: 4, content: "How much effort do you make to resist obsessive thoughts?" },
        { id: 5, content: "How much control do you have over your obsessive thoughts?" },
        { id: 6, content: "How much time do you spend performing compulsive behaviors?" },
        { id: 7, content: "How much do compulsive behaviors interfere with your social or work functioning?" },
        { id: 8, content: "How anxious would you become if prevented from performing compulsive behaviors?" },
        { id: 9, content: "How much effort do you make to resist compulsive behaviors?" },
        { id: 10, content: "How much control do you have over your compulsive behaviors?" }
    ],
    renderOptions: (id: number) => {
        switch (id) {
            default:
                return [
                    { id: 1, content: '从不', value: '0' },
                    { id: 2, content: '很少', value: '1' },
                    { id: 3, content: '有时', value: '2' },
                    { id: 4, content: '经常', value: '3' },
                    { id: 5, content: '总是', value: '4' },
                ];
        }
    }
};
