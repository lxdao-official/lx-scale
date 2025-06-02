
import { questionnairesEn } from "./en";
import { questionnairesZh } from "./zh";

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


export const getQuestionnairesByLocale = (locale: string) => {
    switch (locale) {
        case 'zh':
            return questionnairesZh;
        default:
            return questionnairesEn;
    }
};