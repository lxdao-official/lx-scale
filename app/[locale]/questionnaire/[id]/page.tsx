'use client';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Questionnaire } from '@/components/questionnaire/test/QuestionnaireTest';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { Questionnaire as QuestionnaireType } from '@/types';

export default function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 从问卷数据中获取指定id的量表
  const questionnaire = useQuestionnaire(id);

  // 如果找不到数据，显示404页面
  if (!questionnaire) {
    return notFound();
  }

  return <Questionnaire questionnaire={questionnaire as QuestionnaireType} id={id} />;
}
