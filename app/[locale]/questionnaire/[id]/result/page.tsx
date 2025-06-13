'use client';

import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Questionnaire } from '@/types';
import Link from 'next/link';
import { ResultContainer } from '@/components/questionnaire/result/public/ResultContainer';
import { ResultScore } from '@/components/questionnaire/result/public/ResultScore';
import { ResultInterpretation } from '@/components/questionnaire/result/public/ResultInterpretation';
// import { FactorAnalysis } from '@/components/questionnaire/result/public/FactorAnalysis';
import { Recommendations } from '@/components/questionnaire/result/public/Recommendations';
import { AnswerList } from '@/components/questionnaire/result/public/AnswerList';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { decompressFromEncodedURIComponent as decompress } from 'lz-string';

interface ResultsData {
  totalScore: number;
  factorScores: { [key: string]: number };
  positiveItemCount: number;
  positiveItemAverage: number;
  isSevere: boolean;
}
import { use } from 'react';
import { getQuestionnairesByLocale } from '@/questionairies';

export default function QuestionnaireResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const locale = useCurrentLocale();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useScopedI18n('app.questionnaire.result');

  // 从问卷数据中获取指定id的量表
  const questionnaire = getQuestionnairesByLocale(locale).find(
    (q) => q.id === id
  ) as Questionnaire;

  // 从本地存储或URL参数加载结果
  useEffect(() => {
    // 如果找不到问卷，则不执行后续逻辑
    if (!questionnaire || !questionnaire.details) {
      return;
    }

    // 从 URL 读取参数
    const scoreFromUrl = searchParams.get('score');
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

    // 目前只用 totalScore，其余字段占位
    setResults({
      totalScore: parseInt(scoreFromUrl || '0'),
      factorScores: {},
      positiveItemCount: 0,
      positiveItemAverage: 0,
      isSevere: parseInt(scoreFromUrl || '0') > 160,
    });

    // 若后续需要，可在此处使用 answersArray 进行进一步分析

    setLoading(false);
  }, [id, searchParams, questionnaire]);

  // 存储解码后的答案
  const [decodedAnswers, setDecodedAnswers] = useState<string[]>([]);

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

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen  md:p-4 p-2">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg md:p-8 p-4 border">
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
    <ResultContainer title={questionnaire.title} id={id}>
      <ResultScore totalScore={results.totalScore} questionnaireId={id} />

      <ResultInterpretation results={results} questionnaireId={id} />

      <AnswerList 
        questions={questionnaire.questions} 
        answers={decodedAnswers} 
        renderOptions={questionnaire.renderOptions}
      />

      <Recommendations
        questionnaireId={id}
        questionnaireResults={questionnaireResults}
      />
    </ResultContainer>
  );
}
