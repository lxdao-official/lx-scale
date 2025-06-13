import useGetLang from "./useGetLang";
import { questionnairesEn } from "@/questionairies/en";
import { questionnairesZh } from "@/questionairies/zh";

export function useQuestionnaire() {
    const lang = useGetLang();
    const questionnaires = lang === 'zh' ? questionnairesZh : questionnairesEn;
    return questionnaires;
}