import { Questionnaire } from "@/types";

export const dass21: Questionnaire = {
    id: "dass21",
    title: "DASS-21 Depression Anxiety Stress Scales",
    description: "Comprehensive scale assessing depression, anxiety, and stress dimensions",
    tags: ["Depression", "Anxiety", "Stress", "Comprehensive Assessment"],
    time: "5-8 minutes",
    details: {
        introduction: "The Depression Anxiety Stress Scales-21 (DASS-21) is a self-report scale designed to measure the three related negative emotional states of depression, anxiety and stress. The scale consists of 21 items, with 7 items for each dimension. DASS-21 effectively differentiates between depression, anxiety, and stress, and is widely used in clinical and research settings.",
        questionCount: "21 items",
        evaluationTime: "Usually 5-8 minutes",
        instructions: "Please read each statement and select the option that indicates how much the statement applied to you over the past week. Each question has four choices: 0=Did not apply to me at all, 1=Applied to me to some degree, 2=Applied to me to a considerable degree, 3=Applied to me very much.",
        scoringMethod: [
            "Subscale scoring: Depression, Anxiety, Stress each have 7 items, 0-3 points each",
            "Subscale scores are multiplied by 2 for comparison with DASS-42",
            "Depression subscale: Normal 0-9, Mild 10-13, Moderate 14-20, Severe 21-27, Extremely severe 28+",
            "Anxiety subscale: Normal 0-7, Mild 8-9, Moderate 10-14, Severe 15-19, Extremely severe 20+",
            "Stress subscale: Normal 0-14, Mild 15-18, Moderate 19-25, Severe 26-33, Extremely severe 34+"
        ],
        dimensions: [
            { name: "Depression", description: "Low mood, hopelessness, meaninglessness, self-deprecation, lack of interest or involvement, anhedonia, inertia" },
            { name: "Anxiety", description: "Autonomic arousal, muscle tension, situational anxiety and subjective experience of anxious affect" },
            { name: "Stress", description: "Persistent state of overarousal, irritability, over-reactivity, impatience, difficulty relaxing, nervousness, easily agitated" }
        ],
        notes: [
            "This scale is suitable for assessing emotional states in adults",
            "If any dimension scores high, professional psychological help is recommended",
            "This scale is for screening purposes only and cannot replace professional diagnosis"
        ],
        references: [
            {
                text: "Lovibond, S. H., & Lovibond, P. F. (1995). Manual for the Depression Anxiety Stress Scales. Psychology Foundation.",
                url: "https://www.psychology.org.au"
            }
        ]
    },
    questions: [
        // Depression dimension (3, 5, 10, 13, 16, 17, 21)
        // Anxiety dimension (2, 4, 7, 9, 15, 19, 20)
        // Stress dimension (1, 6, 8, 11, 12, 14, 18)
        { id: 1, content: "I found it hard to wind down" },
        { id: 2, content: "I was aware of dryness of my mouth" },
        { id: 3, content: "I couldn't seem to experience any positive feeling at all" },
        { id: 4, content: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness)" },
        { id: 5, content: "I found it difficult to work up the initiative to do things" },
        { id: 6, content: "I tended to over-react to situations" },
        { id: 7, content: "I experienced trembling (e.g., in the hands)" },
        { id: 8, content: "I felt that I was using a lot of nervous energy" },
        { id: 9, content: "I was worried about situations in which I might panic and make a fool of myself" },
        { id: 10, content: "I felt that I had nothing to look forward to" },
        { id: 11, content: "I found myself getting agitated" },
        { id: 12, content: "I found it difficult to relax" },
        { id: 13, content: "I felt down-hearted and blue" },
        { id: 14, content: "I was intolerant of anything that kept me from getting on with what I was doing" },
        { id: 15, content: "I felt I was close to panic" },
        { id: 16, content: "I was unable to become enthusiastic about anything" },
        { id: 17, content: "I felt I wasn't worth much as a person" },
        { id: 18, content: "I felt that I was rather touchy" },
        { id: 19, content: "I was aware of the action of my heart in the absence of physical exertion" },
        { id: 20, content: "I felt scared without any good reason" },
        { id: 21, content: "I felt that life was meaningless" }
    ],
    renderOptions: () => [
        { id: 1, content: "Did not apply to me at all", value: "0" },
        { id: 2, content: "Applied to me to some degree", value: "1" },
        { id: 3, content: "Applied to me to a considerable degree", value: "2" },
        { id: 4, content: "Applied to me very much", value: "3" }
    ]
};