"use client"

import { notFound } from "next/navigation";
import { questionnaires, Questionnaire as ConstantQuestionnaire } from "@/constants/questionnaires";
import { QuestionnaireTest } from "@/components/questionnaire/QuestionnaireTest";

// 组件需要的问卷接口
interface ComponentQuestionnaire {
    id: string;
    title: string;
    questions?: {
        id: number;
        content: string;
        options: { value: string; text: string }[];
        factors?: string[];
    }[];
    factorMapping?: { [key: string]: number[] };
}

// 适配器函数，将constants中的问题格式转换为组件需要的格式
function adaptQuestionnaire(questionnaire: ConstantQuestionnaire, id: string): ComponentQuestionnaire {
    if (!questionnaire.questions) {
        return {
            id: questionnaire.id,
            title: questionnaire.title,
            factorMapping: questionnaire.factorMapping
        };
    }

    // 创建适配后的questions数组
    const adaptedQuestions = questionnaire.questions.map((q, index) => ({
        id: index + 1,
        content: q.content,
        factors: q.factors,
        options: id === "depression"
            ? [
                { value: "1", text: "没有或很少时间" },
                { value: "2", text: "小部分时间" },
                { value: "3", text: "相当多时间" },
                { value: "4", text: "绝大部分或全部时间" }
            ]
            : [
                { value: "1", text: "没有" },
                { value: "2", text: "很轻" },
                { value: "3", text: "中等" },
                { value: "4", text: "偏重" },
                { value: "5", text: "严重" }
            ]
    }));

    // 返回适配后的问卷对象
    return {
        id: questionnaire.id,
        title: questionnaire.title,
        questions: adaptedQuestions,
        factorMapping: questionnaire.factorMapping
    };
}

export default function QuestionnaireTestPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // 从问卷数据中获取指定id的量表
    const questionnaire = questionnaires.find(q => q.id === id);

    // 如果找不到数据，显示404页面
    if (!questionnaire) {
        return notFound();
    }

    // 适配问卷数据格式
    const adaptedQuestionnaire = adaptQuestionnaire(questionnaire, id);

    return (
        <QuestionnaireTest
            questionnaire={adaptedQuestionnaire}
            id={id}
        />
    );
}