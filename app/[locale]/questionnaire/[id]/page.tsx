'use client';
import { notFound } from 'next/navigation';
import { questionnairesEn as questionnaires } from '@/questionairies/en';
import { questionnairesZh } from '@/questionairies/zh';
import { useCurrentLocale } from '@/locales/client';

import { use } from 'react';
import { Questionnaire } from '@/components/questionnaire/test/QuestionnaireTest';

export default function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 获取当前语言/地区设置
  const currentLocale = useCurrentLocale();

  // 根据当前语言选择对应版本的问卷数据的函数
  const getQuestionnairesByLocale = (locale: string) => {
    switch (locale) {
      case 'zh':
        return questionnairesZh;
      // 可以在这里添加更多语言支持
      // case 'fr':
      //   return questionnairesFr;
      default:
        return questionnaires; // 默认使用英文问卷
    }
  };

  // 从问卷数据中获取指定id的量表
  const questionnaire = getQuestionnairesByLocale(currentLocale).find((q) => q.id === id);

  // 如果找不到数据，显示404页面
  if (!questionnaire) {
    return notFound();
  }

  return <Questionnaire questionnaire={questionnaire} id={id} />;
}
