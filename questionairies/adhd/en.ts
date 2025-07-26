import { Questionnaire } from "@/types";

export const adhd: Questionnaire = {
    id: "adhd",
    title: "ADHD Self-Report Scale (ASRS-v1.1)",
    description: "Assessment of attention deficit hyperactivity disorder symptoms in adults",
    tags: ["ADHD", "Attention", "Self-assessment"],
    time: "5-10 minutes",
    details: {
        introduction: "The Adult ADHD Self-Report Scale (ASRS-v1.1) Symptom Checklist was developed in conjunction with the World Health Organization (WHO), and the Workgroup on Adult ADHD that included the following team of psychiatrists and researchers. This scale is designed to assess the frequency of ADHD symptoms in adults based on DSM-IV criteria. Please answer the questions below, rating each item according to how you have felt and conducted yourself over the past 6 months.",
        questionCount: "18 items",
        evaluationTime: "About 5-10 minutes",
        instructions: "For each question, please select the response that best describes how you have felt and conducted yourself over the past 6 months.",
        scoringMethod: [
            "Each question is scored from 0 to 4 points (Never=0, Rarely=1, Sometimes=2, Often=3, Very Often=4).",
            "Part A (Questions 1-6): Screening questions, 4 or more positive responses suggest ADHD symptoms.",
            "Part B (Questions 7-18): Additional symptom assessment.",
            "Total score range: 0-72 points.",
            "Higher scores indicate more severe ADHD symptoms."
        ],
        dimensions: [
            { name: "Inattention", description: "Difficulty sustaining attention, following instructions, and organizing tasks." },
            { name: "Hyperactivity", description: "Excessive motor activity, restlessness, and difficulty sitting still." },
            { name: "Impulsivity", description: "Acting without thinking, interrupting others, and difficulty waiting." }
        ],
        notes: [
            "This scale is a screening tool and does not provide a diagnosis of ADHD.",
            "If you score high on this scale, consider consulting with a healthcare professional for proper evaluation.",
            "ADHD symptoms must be present before age 7 and cause impairment in multiple settings for a diagnosis."
        ],
        references: [
            {
                text: "Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S., Hiripi, E., ... & Walters, E. E. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population. Psychological Medicine, 35(2), 245-256.",
                url: "https://www.hcp.med.harvard.edu/ncs/asrs.php"
            }
        ]
    },
    questions: [
        { id: 1, content: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?" },
        { id: 2, content: "How often do you have difficulty getting things in order when you have to do a task that requires organization?" },
        { id: 3, content: "How often do you have problems remembering appointments or obligations?" },
        { id: 4, content: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?" },
        { id: 5, content: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?" },
        { id: 6, content: "How often do you feel overly active and compelled to do things, like you were driven by a motor?" },
        { id: 7, content: "How often do you make careless mistakes when you have to work on a boring or difficult project?" },
        { id: 8, content: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?" },
        { id: 9, content: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?" },
        { id: 10, content: "How often do you misplace or have difficulty finding things at home or at work?" },
        { id: 11, content: "How often are you distracted by activity or noise around you?" },
        { id: 12, content: "How often do you leave your seat in meetings or other situations where you are expected to remain seated?" },
        { id: 13, content: "How often do you feel restless or fidgety?" },
        { id: 14, content: "How often do you have difficulty unwinding and relaxing when you have time to yourself?" },
        { id: 15, content: "How often do you find yourself talking too much when you are in social situations?" },
        { id: 16, content: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?" },
        { id: 17, content: "How often do you have difficulty waiting your turn in situations when turn taking is required?" },
        { id: 18, content: "How often do you interrupt others when they are busy?" }
    ],
    renderOptions: (id: number) => {
        return [
            { id: 1, content: 'Never', value: '0' },
            { id: 2, content: 'Rarely', value: '1' },
            { id: 3, content: 'Sometimes', value: '2' },
            { id: 4, content: 'Often', value: '3' },
            { id: 5, content: 'Very Often', value: '4' },
        ];
    }
};