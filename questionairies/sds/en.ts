import { Questionnaire } from "@/types";

export const sds: Questionnaire = {
    id: "sds",
    title: "SDS Self-Rating Depression Scale",
    description: "Assessment of the severity of depressive symptoms",
    tags: ["Depression", "Self-assessment", "Screening"],
    time: "5-10 minutes",
    details: {
        introduction: "The Self-Rating Depression Scale (SDS) was developed by Zung in 1965 to assess the severity of depressive symptoms. The scale consists of 20 items covering emotional, somatic, psychomotor, and psychological aspects of depression. It is simple to use and suitable as a screening tool for depression.",
        questionCount: "20 items",
        evaluationTime: "Usually 5-10 minutes",
        instructions: "Please rate how you have been feeling during the past week. Choose the option that best describes your situation. Each question has four choices: A little of the time, Some of the time, Good part of the time, Most of the time.",
        scoringMethod: [
            "Total Score: Sum of all 20 items, then multiply by 1.25 to get the standard score",
            "Positive items: 1, 3, 4, 7, 8, 9, 10, 13, 15, 19 (scored normally)",
            "Negative items: 2, 5, 6, 11, 12, 14, 16, 17, 18, 20 (reverse scored)",
            "Severity: Standard score 53-62 = mild depression, 63-72 = moderate depression, 73+ = severe depression"
        ],
        dimensions: [
            { name: "Emotional Symptoms", description: "Low mood, sadness, hopelessness and other emotional experiences" },
            { name: "Somatic Symptoms", description: "Loss of appetite, sleep disorders, fatigue and other physical symptoms" },
            { name: "Psychomotor Symptoms", description: "Slow movements, sluggish thinking, poor concentration" },
            { name: "Psychological Symptoms", description: "Low self-esteem, guilt, helplessness and other psychological experiences" }
        ],
        notes: [
            "This scale is suitable for adults with depressive symptoms",
            "If the standard score exceeds 53, professional help is recommended",
            "This scale is for screening purposes only and cannot replace professional diagnosis"
        ],
        references: [
            {
                text: "Zung, W. W. (1965). A self-rating depression scale. Archives of general psychiatry, 12(1), 63-70.",
                url: "https://jamanetwork.com/journals/jamapsychiatry/article-abstract/487993"
            }
        ]
    },
    questions: [
        { id: 1, content: "I feel down-hearted and blue" },
        { id: 2, content: "Morning is when I feel the best" },
        { id: 3, content: "I have crying spells or feel like it" },
        { id: 4, content: "I have trouble sleeping at night" },
        { id: 5, content: "I eat as much as I used to" },
        { id: 6, content: "I still enjoy sex" },
        { id: 7, content: "I notice that I am losing weight" },
        { id: 8, content: "I have trouble with constipation" },
        { id: 9, content: "My heart beats faster than usual" },
        { id: 10, content: "I get tired for no reason" },
        { id: 11, content: "My mind is as clear as it used to be" },
        { id: 12, content: "I find it easy to do the things I used to" },
        { id: 13, content: "I am restless and can't keep still" },
        { id: 14, content: "I feel hopeful about the future" },
        { id: 15, content: "I am more irritable than usual" },
        { id: 16, content: "I find it easy to make decisions" },
        { id: 17, content: "I feel that I am useful and needed" },
        { id: 18, content: "My life is pretty full" },
        { id: 19, content: "I feel that others would be better off if I were dead" },
        { id: 20, content: "I still enjoy the things I used to do" }
    ],
    renderOptions: () => [
        { id: 1, content: "A little of the time", value: "1" },
        { id: 2, content: "Some of the time", value: "2" },
        { id: 3, content: "Good part of the time", value: "3" },
        { id: 4, content: "Most of the time", value: "4" }
    ]
};