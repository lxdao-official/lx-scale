import useGetLang from "./useGetLang";
import { questionnairesEn } from "@/questionairies/en";
import { questionnairesZh } from "@/questionairies/zh";

export function useQuestionnaire(id?: string) {
    const lang = useGetLang();
    const questionnaires = lang === 'zh' ? questionnairesZh : questionnairesEn;
    if (!id) return questionnaires;
    const questionnaire = questionnaires.find((q) => q.id === id);
    return questionnaire;
}