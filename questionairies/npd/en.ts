import { Questionnaire } from "@/types";

export const npd: Questionnaire = {
    id: "npd",
    title: "Narcissistic Personality Inventory (NPI-16)",
    description: "Assessment of narcissistic personality traits and characteristics",
    tags: ["Personality", "Narcissism", "Self-assessment"],
    time: "5-10 minutes",
    details: {
        introduction: "The Narcissistic Personality Inventory (NPI-16) is a psychological instrument designed to measure narcissistic traits in non-clinical populations. This shortened version consists of 16 forced-choice items that assess various aspects of narcissistic personality characteristics. Please note that this is a research tool for understanding personality traits and is not intended for clinical diagnosis.",
        questionCount: "16 items",
        evaluationTime: "About 5-10 minutes",
        instructions: "For each pair of statements below, choose the one that you feel best describes you or comes closest to describing your feelings about yourself.",
        scoringMethod: [
            "Each question offers two choices - select the one that best describes you.",
            "Narcissistic responses are scored as 1 point, non-narcissistic responses as 0 points.",
            "Total score range: 0-16 points.",
            "Higher scores indicate more narcissistic traits.",
            "Average scores typically range from 2-8 in general population."
        ],
        dimensions: [
            { name: "Leadership/Authority", description: "Desire to lead and have authority over others." },
            { name: "Grandiose Exhibitionism", description: "Need for attention and admiration from others." },
            { name: "Entitlement", description: "Belief that one deserves special treatment and privileges." }
        ],
        notes: [
            "This inventory measures narcissistic traits on a continuum, not a clinical disorder.",
            "Narcissistic traits exist in everyone to some degree and can be adaptive in certain contexts.",
            "High scores do not necessarily indicate a personality disorder.",
            "This tool is for educational and research purposes only, not for clinical diagnosis."
        ],
        references: [
            {
                text: "Ames, D. R., Rose, P., & Anderson, C. P. (2006). The NPI-16 as a short measure of narcissism. Journal of Research in Personality, 40(4), 440-450.",
                url: "https://doi.org/10.1016/j.jrp.2005.03.002"
            }
        ]
    },
    questions: [
        { id: 1, content: "Choose the statement that best describes you:" },
        { id: 2, content: "Choose the statement that best describes you:" },
        { id: 3, content: "Choose the statement that best describes you:" },
        { id: 4, content: "Choose the statement that best describes you:" },
        { id: 5, content: "Choose the statement that best describes you:" },
        { id: 6, content: "Choose the statement that best describes you:" },
        { id: 7, content: "Choose the statement that best describes you:" },
        { id: 8, content: "Choose the statement that best describes you:" },
        { id: 9, content: "Choose the statement that best describes you:" },
        { id: 10, content: "Choose the statement that best describes you:" },
        { id: 11, content: "Choose the statement that best describes you:" },
        { id: 12, content: "Choose the statement that best describes you:" },
        { id: 13, content: "Choose the statement that best describes you:" },
        { id: 14, content: "Choose the statement that best describes you:" },
        { id: 15, content: "Choose the statement that best describes you:" },
        { id: 16, content: "Choose the statement that best describes you:" }
    ],
    renderOptions: (id: number) => {
        const optionPairs = [
            [
                { id: 1, content: "I have a natural talent for influencing people.", value: "1" },
                { id: 2, content: "I am not good at influencing people.", value: "0" }
            ],
            [
                { id: 1, content: "Modesty doesn't become me.", value: "1" },
                { id: 2, content: "Modesty becomes me.", value: "0" }
            ],
            [
                { id: 1, content: "I would do almost anything on a dare.", value: "1" },
                { id: 2, content: "I tend to be a fairly cautious person.", value: "0" }
            ],
            [
                { id: 1, content: "When people compliment me I sometimes get embarrassed.", value: "0" },
                { id: 2, content: "I know that I am good because everybody keeps telling me so.", value: "1" }
            ],
            [
                { id: 1, content: "The thought of ruling the world frightens the hell out of me.", value: "0" },
                { id: 2, content: "If I ruled the world it would be a better place.", value: "1" }
            ],
            [
                { id: 1, content: "I can usually talk my way out of anything.", value: "1" },
                { id: 2, content: "I try to accept the consequences of my behavior.", value: "0" }
            ],
            [
                { id: 1, content: "I prefer to blend in with the crowd.", value: "0" },
                { id: 2, content: "I like to be the center of attention.", value: "1" }
            ],
            [
                { id: 1, content: "I will be a success.", value: "1" },
                { id: 2, content: "I am not too concerned about success.", value: "0" }
            ],
            [
                { id: 1, content: "I am no better or worse than most people.", value: "0" },
                { id: 2, content: "I think I am a special person.", value: "1" }
            ],
            [
                { id: 1, content: "I am not sure if I would make a good leader.", value: "0" },
                { id: 2, content: "I see myself as a good leader.", value: "1" }
            ],
            [
                { id: 1, content: "I am assertive.", value: "1" },
                { id: 2, content: "I wish I were more assertive.", value: "0" }
            ],
            [
                { id: 1, content: "I like to have authority over other people.", value: "1" },
                { id: 2, content: "I don't mind following orders.", value: "0" }
            ],
            [
                { id: 1, content: "I find it easy to manipulate people.", value: "1" },
                { id: 2, content: "I don't like it when I find myself manipulating people.", value: "0" }
            ],
            [
                { id: 1, content: "I insist upon getting the respect that is due me.", value: "1" },
                { id: 2, content: "I usually get the respect that I deserve.", value: "0" }
            ],
            [
                { id: 1, content: "I don't particularly like to show off my body.", value: "0" },
                { id: 2, content: "I like to show off my body.", value: "1" }
            ],
            [
                { id: 1, content: "I can read people like a book.", value: "1" },
                { id: 2, content: "People are sometimes hard to understand.", value: "0" }
            ]
        ];

        return optionPairs[id - 1] || [];
    }
};