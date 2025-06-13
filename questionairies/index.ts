
import { questionnairesEn } from "./en";
import { questionnairesZh } from "./zh";

export const getQuestionnairesByLocale = (locale: string) => {
    switch (locale) {
        case 'zh':
            return questionnairesZh;
        default:
            return questionnairesEn;
    }
};