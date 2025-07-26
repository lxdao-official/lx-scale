import { Questionnaire } from "@/types";

export const gd: Questionnaire = {
    id: "gd",
    title: "Gender Dysphoria Questionnaire (GDQ)",
    description: "Assessment of gender dysphoria experiences and feelings",
    tags: ["Gender", "Identity", "Self-assessment"],
    time: "10-15 minutes",
    details: {
        introduction: "The Gender Dysphoria Questionnaire is designed to assess experiences and feelings related to gender identity. Gender dysphoria refers to the distress that may accompany the incongruence between one's experienced or expressed gender and one's assigned gender. This questionnaire is intended for self-reflection and educational purposes. Please answer honestly based on your personal experiences and feelings.",
        questionCount: "27 items",
        evaluationTime: "About 10-15 minutes",
        instructions: "Please read each statement carefully and select the response that best describes your experience or feelings. There are no right or wrong answers.",
        scoringMethod: [
            "Each question is scored from 1 to 7 points (Disagree=1, Slightly Disagree=2, Somewhat Disagree=3, Neither=4, Somewhat Agree=5, Slightly Agree=6, Agree=7).",
            "Total score range: 27-189 points.",
            "Higher scores may indicate greater gender dysphoria experiences.",
            "This is not a diagnostic tool and should not be used for clinical diagnosis."
        ],
        dimensions: [
            { name: "Gender Identity", description: "Feelings about one's internal sense of gender." },
            { name: "Social Gender Role", description: "Comfort with social expectations and roles based on assigned gender." },
            { name: "Physical Dysphoria", description: "Feelings about physical characteristics and body." },
            { name: "Gender Expression", description: "Comfort with expressing gender in various ways." }
        ],
        notes: [
            "This questionnaire is for educational and self-reflection purposes only.",
            "It is not a substitute for professional evaluation or diagnosis.",
            "If you are experiencing distress related to gender identity, consider speaking with a qualified mental health professional.",
            "Gender identity is a complex and personal experience that varies greatly among individuals."
        ],
        references: [
            {
                text: "American Psychological Association. (2015). Guidelines for psychological practice with transgender and gender nonconforming people. American Psychologist, 70(9), 832-864.",
                url: "https://www.apa.org/practice/guidelines/transgender.pdf"
            }
        ]
    },
    questions: [
        { id: 1, content: "I feel comfortable with my assigned gender at birth." },
        { id: 2, content: "I wish I had been born as a different gender." },
        { id: 3, content: "I feel like my body matches my gender identity." },
        { id: 4, content: "I have fantasized about being a different gender." },
        { id: 5, content: "I am comfortable using bathrooms designated for my assigned gender." },
        { id: 6, content: "I feel distressed when people refer to me by my assigned gender." },
        { id: 7, content: "I enjoy activities typically associated with my assigned gender." },
        { id: 8, content: "I feel more comfortable when presenting as a different gender." },
        { id: 9, content: "I am satisfied with my current physical appearance." },
        { id: 10, content: "I have considered medical transition (hormones/surgery)." },
        { id: 11, content: "I feel comfortable wearing clothes typical for my assigned gender." },
        { id: 12, content: "I prefer when others see me as a different gender than assigned." },
        { id: 13, content: "I feel at home in my body." },
        { id: 14, content: "I have experimented with different gender expressions." },
        { id: 15, content: "I feel comfortable with my voice." },
        { id: 16, content: "I wish I could change certain physical characteristics." },
        { id: 17, content: "I identify strongly with my assigned gender." },
        { id: 18, content: "I have felt envious of people of a different gender." },
        { id: 19, content: "I am comfortable with how others perceive my gender." },
        { id: 20, content: "I have felt disconnected from my assigned gender since childhood." },
        { id: 21, content: "I feel comfortable in single-gender spaces for my assigned gender." },
        { id: 22, content: "I have wished to wake up as a different gender." },
        { id: 23, content: "I feel my gender identity is stable and consistent." },
        { id: 24, content: "I have felt confused about my gender identity." },
        { id: 25, content: "I am comfortable with my name and pronouns." },
        { id: 26, content: "I have experienced distress related to gender expectations." },
        { id: 27, content: "I feel authentic when expressing my true gender identity." }
    ],
    renderOptions: (id: number) => {
        return [
            { id: 1, content: 'Disagree', value: '1' },
            { id: 2, content: 'Slightly Disagree', value: '2' },
            { id: 3, content: 'Somewhat Disagree', value: '3' },
            { id: 4, content: 'Neither', value: '4' },
            { id: 5, content: 'Somewhat Agree', value: '5' },
            { id: 6, content: 'Slightly Agree', value: '6' },
            { id: 7, content: 'Agree', value: '7' },
        ];
    }
};