// import { useState } from 'react';
import { notFound } from 'next/navigation';
import { questionnaires } from '@/constants/questionnaires';
import TestPage from '@/components/questionnaire/TestPage';

interface QuestionnaireTestPageProps {
  params: {
    id: string;
  };
}

export default async function QuestionnaireTestPage({
  params,
}: QuestionnaireTestPageProps) {
  const { id } = params;

  if (!id) {
    return null;
  }
  // 从问卷数据中获取指定id的量表
  const questionnaire = questionnaires.find((q) => q.id === id);

  // 如果找不到数据，显示404页面
  if (!questionnaire) {
    return notFound();
  }

  // 这里只是一个占位，实际测试页面需要根据不同量表的具体问题和评分方式来实现
  return <TestPage id={id} />;
}
