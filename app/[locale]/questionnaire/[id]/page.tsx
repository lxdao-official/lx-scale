'use client';
import { notFound } from 'next/navigation';
import { useCurrentLocale } from '@/locales/client';

import { use } from 'react';
import { Questionnaire } from '@/components/questionnaire/test/QuestionnaireTest';
import { getQuestionnairesByLocale } from '@/questionairies';

export default function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 获取当前语言/地区设置
  const currentLocale = useCurrentLocale();
  // 从问卷数据中获取指定id的量表
  const questionnaire = getQuestionnairesByLocale(currentLocale).find((q) => q.id === id);

  // 如果找不到数据，显示404页面
  if (!questionnaire) {
    return notFound();
  }

  return <Questionnaire questionnaire={questionnaire} id={id} />;
}
