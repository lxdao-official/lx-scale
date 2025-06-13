export interface CalculatedResults {
    totalScore: number;
    factorScores: { [key: string]: number };
    positiveItemCount: number;
    positiveItemAverage: number;
    isSevere: boolean;
    severity?: string;
}

export interface CalculatedResults {
    totalScore: number;
    factorScores: { [key: string]: number };
    positiveItemCount: number;
    positiveItemAverage: number;
    isSevere: boolean;
    severity?: string;
}

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
    calculateResults: (answers: { [key: number]: string }) => CalculatedResults;
}
