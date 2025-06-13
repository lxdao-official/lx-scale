export interface QuestionType {
    id: number;
    content: string;
    options: Option[];
    factors?: string[];
}


export interface Option {
    id: number;
    content: string;
    value: string;
}

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
    renderOptions: (id: number) => Option[];
}
