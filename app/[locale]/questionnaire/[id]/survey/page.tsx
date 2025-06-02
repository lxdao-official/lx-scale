'use client';
import { notFound } from 'next/navigation';
import {
  questionnaires,
  questionnairesZh,
  Questionnaire as ConstantQuestionnaire,
} from '@/constants/questionairies/type';
import { QuestionnaireTest } from '@/components/questionnaire/test/QuestionnaireTest';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';

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

import { use } from 'react';

export default function QuestionnaireTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useScopedI18n('app.questionnaire.survey');
  // 为强迫症量表选项使用的翻译函数
  const tTest = useScopedI18n('component.questionnaire.test.QuestionnaireTest');
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

  function adaptQuestionnaire(
    questionnaire: ConstantQuestionnaire,
    id: string
  ):
    | ComponentQuestionnaire
    | {
      id: string;
      title: string;
      factorMapping?: { [key: string]: number[] };
    } {
    if (!questionnaire.questions) {
      return {
        id: questionnaire.id,
        title: questionnaire.title,
        factorMapping: questionnaire.factorMapping,
      };
    }

    // 生成选项的函数
    const generateOptions = (questionnaireId: string) => {
      switch (questionnaireId) {
        case 'depression':
          return [
            { value: '1', text: t('depressionOption1') },
            { value: '2', text: t('depressionOption2') },
            { value: '3', text: t('depressionOption3') },
            { value: '4', text: t('depressionOption4') },
          ];
        case 'obsessive':
          // 强迫症量表的选项 - 使用正确的翻译命名空间和函数
          return [
            { value: '0', text: tTest('ocdOption0') },
            { value: '1', text: tTest('ocdOption1') },
            { value: '2', text: tTest('ocdOption2') },
            { value: '3', text: tTest('ocdOption3') },
            { value: '4', text: tTest('ocdOption4') },
          ];
        default:
          // 默认选项
          return [
            { value: '1', text: t('defaultOption1') },
            { value: '2', text: t('defaultOption2') },
            { value: '3', text: t('defaultOption3') },
            { value: '4', text: t('defaultOption4') },
            { value: '5', text: t('defaultOption5') },
          ];
      }
    };

    // 创建适配后的questions数组
    const adaptedQuestions = questionnaire.questions.map((q, index) => ({
      id: index + 1,
      content: q.content,
      factors: q.factors,
      options: generateOptions(id),
    }));

    // 返回适配后的问卷对象
    return {
      id: questionnaire.id,
      title: questionnaire.title,
      questions: adaptedQuestions,
      factorMapping: questionnaire.factorMapping,
    };
  }
  // 适配问卷数据格式
  const adaptedQuestionnaire = adaptQuestionnaire(questionnaire, id);

  return <QuestionnaireTest questionnaire={adaptedQuestionnaire} id={id} />;
}
