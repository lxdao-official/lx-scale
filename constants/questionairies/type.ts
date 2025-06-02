export interface Questionnaire {
    id: string;
    title: string;
    description: string;
    tags: string[];
    time: string;
    details?: {
        introduction?: string;
        questionCount?: string;
        evaluationTime?: string;
        instructions?: string;
        scoringMethod?: string[];
        dimensions?: Array<{ name: string; description: string }>;
        notes?: string[];
        references?: Array<{ text: string; url: string }>;
        resultInterpretation?: {
            normal: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            mild: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            moderate: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            severe: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            extreme?: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
        };
    };
    questions?: {
        content: string;
        factors?: string[];
        options?: { value: string; text: string }[];
    }[];
    factorMapping?: {
        [key: string]: number[];
    };
}