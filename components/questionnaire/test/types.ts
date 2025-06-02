import { questionnairesZh } from "@/questionairies/zh";
import { questionnairesEn } from "@/questionairies/en";

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
    options: { value: string; text: string }[];
    factors?: string[];
}

export const getQuestionnairesByLocale = (locale: string) => {
    switch (locale) {
        case 'zh':
            return questionnairesZh;
        default:
            return questionnairesEn;
    }
};
