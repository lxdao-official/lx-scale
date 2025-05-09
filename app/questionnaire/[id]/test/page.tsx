"use client"

import { notFound } from "next/navigation";
import { questionnaires } from "@/constants/questionnaires";
import { QuestionnaireTest } from "@/components/questionnaire/QuestionnaireTest";

interface QuestionnaireTestPageProps {
    params: {
        id: string;
    };
}

export default function QuestionnaireTestPage({ params }: QuestionnaireTestPageProps) {
    const { id } = params;

    // 从问卷数据中获取指定id的量表
    const questionnaire = questionnaires.find(q => q.id === id);

    // 如果找不到数据，显示404页面
    if (!questionnaire) {
        return notFound();
    }

    return (
        <QuestionnaireTest
            questionnaire={questionnaire}
            id={id}
        />
    );
}