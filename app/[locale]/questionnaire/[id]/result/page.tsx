'use client';

import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, use } from 'react';
import { Button } from '@/components/ui/button';
import { Questionnaire } from '@/types';
import Link from 'next/link';
import { ResultContainer } from '@/components/questionnaire/result/public/ResultContainer';
import { Recommendations } from '@/components/questionnaire/result/public/Recommendations';
import { AnswerList } from '@/components/questionnaire/result/public/AnswerList';
import { decompressFromEncodedURIComponent as decompress } from 'lz-string';
import { ResultAnalysis } from '@/components/questionnaire/result/analysis/ResultAnalysis';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { useScopedI18n } from '@/locales/client';

export default function QuestionnaireResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const t = useScopedI18n('app.questionnaire.result');

  // 从问卷数据中获取指定id的量表
  const questionnaire = useQuestionnaire(id) as Questionnaire;

  // 从本地存储或URL参数加载结果
  useEffect(() => {
    // 如果找不到问卷，则不执行后续逻辑
    if (!questionnaire || !questionnaire.details) {
      return;
    }

    // 从 URL 读取参数
    const encodedAnswers = searchParams.get('ans');

    // 解压答案（如果存在）
    let answersArray: string[] = [];
    if (encodedAnswers) {
      const raw = decompress(encodedAnswers) || '';
      answersArray = raw.split('');
      console.log('answersArray', answersArray);
    }

    // 保存到 state 供渲染 AnswerList
    setDecodedAnswers(answersArray);

    setLoading(false);
  }, [id, searchParams, questionnaire]);

  // 存储解码后的答案
  const [decodedAnswers, setDecodedAnswers] = useState<string[]>([]);
  // 对话限制状态
  const [isChatLimitReached, setIsChatLimitReached] = useState(false);

  // 根据已解码答案构造 问题-选项 文本 kv 对，用于 AI
  const questionnaireResults: Record<string, string> = useMemo(() => {
    if (!questionnaire) return {};
    const obj: Record<string, string> = {};
    questionnaire.questions.forEach((q, idx) => {
      const val = decodedAnswers[idx];
      if (val === undefined) return;
      const option = questionnaire.renderOptions(q.id).find(
        (o) => String(o.value) === String(val)
      );
      obj[q.content] = option ? option.content : String(val);
    });
    return obj;
  }, [decodedAnswers, questionnaire]);

  // 如果找不到数据，显示404页面
  if (!questionnaire || !questionnaire.details) {
    return notFound();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!decodedAnswers) {
    return (
      <div className="flex justify-center items-center min-h-screen  md:p-4 p-2">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg md:p-8 p-4 border">
          <h1 className="text-2xl font-bold mb-6">
            {questionnaire.title} - {t('resultNotFoundTitle')}
          </h1>
          <p className="text-gray-700 mb-6">{t('resultNotFoundDesc')}</p>
          <Button>
            <Link href={`/questionnaire/${id}/survey`}>{t('retryTest')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ResultContainer 
      title={questionnaire.title} 
      id={id}
      questionnaire={questionnaire}
      answers={decodedAnswers}
      questionnaireResults={questionnaireResults}
      isChatLimitReached={isChatLimitReached}
    >
      <AnswerList
        questions={questionnaire.questions}
        answers={decodedAnswers}
        renderOptions={questionnaire.renderOptions}
      />
      <ResultAnalysis questionnaireId={id} answers={decodedAnswers} />

      <Recommendations
        questionnaireId={id}
        questionnaireResults={questionnaireResults}
        onChatLimitReached={setIsChatLimitReached}
      />
    </ResultContainer>
  );
}
