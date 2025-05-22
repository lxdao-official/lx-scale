'use client';
import { notFound } from 'next/navigation';
import {
  questionnaires,
  Questionnaire as ConstantQuestionnaire,
} from '@/constants/questionnaires';
import { QuestionnaireTest } from '@/components/questionnaire/test/QuestionnaireTest';
import { useScopedI18n } from '@/locales/client';

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
async function adaptQuestionnaire(
  questionnaire: ConstantQuestionnaire,
  id: string,
  t: (key: string) => string
): Promise<ComponentQuestionnaire> {
  if (!questionnaire.questions) {
    return {
      id: questionnaire.id,
      title: questionnaire.title,
      factorMapping: questionnaire.factorMapping,
    };
  }

  // 创建适配后的questions数组
  const adaptedQuestions = questionnaire.questions.map((q, index) => ({
    id: index + 1,
    content: q.content,
    factors: q.factors,
    options:
      id === 'depression'
        ? [
            {
              value: '1',
              text: t('depressionOption1'),
            },
            { value: '2', text: t('depressionOption2') },
            { value: '3', text: t('depressionOption3') },
            { value: '4', text: t('depressionOption4') },
          ]
        : [
            {
              value: '1',
              text: t('defaultOption1'),
            },
            { value: '2', text: t('defaultOption2') },
            { value: '3', text: t('defaultOption3') },
            { value: '4', text: t('defaultOption4') },
            { value: '5', text: t('defaultOption5') },
          ],
  }));

  // 返回适配后的问卷对象
  return {
    id: questionnaire.id,
    title: questionnaire.title,
    questions: adaptedQuestions,
    factorMapping: questionnaire.factorMapping,
  };
}

import { use } from 'react';

export default function QuestionnaireTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useScopedI18n('app.questionnaire.survey');
  const { id } = use(params);

  // 从问卷数据中获取指定id的量表
  const questionnaire = questionnaires.find((q) => q.id === id);

  // 如果找不到数据，显示404页面
  if (!questionnaire) {
    return notFound();
  }

  // 适配问卷数据格式
  const adaptedQuestionnaire = adaptQuestionnaire(questionnaire, id, t);

  return <QuestionnaireTest questionnaire={adaptedQuestionnaire} id={id} />;
}
