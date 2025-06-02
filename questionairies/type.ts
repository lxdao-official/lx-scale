export interface Questionnaire {
    id: string;
    title: string;
    description: string;
    tags: string[];
    time: string;
    details: {
        introduction: string;
        questionCount: string;
        evaluationTime: string;
        instructions: string;
        scoringMethod: string[];
        dimensions: Array<{ name: string; description: string }>;
        notes: string[];
        references: Array<{ text: string; url: string }>;
    };
    questions: {
        id: number;
        content: string;
    }[];
}