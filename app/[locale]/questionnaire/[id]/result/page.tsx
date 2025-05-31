'use client';

import { notFound } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { questionnaires } from '@/constants/questionnaires';
import Link from 'next/link';
import { ResultContainer } from '@/components/questionnaire/result/public/ResultContainer';
import { ResultScore } from '@/components/questionnaire/result/public/ResultScore';
import { PositiveItemStats } from '@/components/questionnaire/result/private/PositiveItemStats';
import { ResultInterpretation } from '@/components/questionnaire/result/public/ResultInterpretation';
import { FactorAnalysis } from '@/components/questionnaire/result/public/FactorAnalysis';
import { DimensionsAnalysis } from '@/components/questionnaire/result/public/DimensionsAnalysis';
import { Recommendations } from '@/components/questionnaire/result/public/Recommendations';
import { useScopedI18n } from '@/locales/client';
import { useQuestionnaireStorage } from '@/hooks/useQuestionnaireStorage';

interface ResultsData {
  totalScore: number;
  factorScores: { [key: string]: number };
  positiveItemCount: number;
  positiveItemAverage: number;
  isSevere: boolean;
}

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  details?: {
    dimensions?: Array<{
      name: string;
      description: string;
    }>;
  };
  factorDescriptions?: { [key: string]: string };
  factorMapping?: { [key: string]: number[] };
  questions?: Question[];
}

interface Question {
  content: string;
  factors?: string[];
  options: Array<{ value: string; text: string }>;
}

import { use } from 'react';

export default function QuestionnaireResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useScopedI18n('app.questionnaire.result');
  const { savedData, isLoading: isStorageLoading } = useQuestionnaireStorage(id);

  // 从问卷数据中获取指定id的量表
  const questionnaire = questionnaires.find(
    (q) => q.id === id
  ) as Questionnaire;

  // 从本地存储或URL参数加载结果
  useEffect(() => {
    // 如果找不到问卷，则不执行后续逻辑
    if (!questionnaire || !questionnaire.details) {
      return;
    }

    // 如果正在加载存储数据，则等待
    if (isStorageLoading) return;

    // 尝试从URL参数中获取总分
    const scoreFromUrl = searchParams.get('score');

    // 如果本地存储中有结果，则使用存储的结果
    if (savedData?.results) {
      setResults(savedData.results);
    } else if (savedData?.answers) {
      // 如果有答案但没有结果，可以在这里重新计算结果
      // 这里可以添加重新计算结果的逻辑，如果需要的话
      console.log('Answers found but no results. Consider recalculating results.');
      
      // 如果有URL参数，则使用URL参数作为总分
      if (scoreFromUrl) {
        setResults({
          totalScore: parseInt(scoreFromUrl),
          factorScores: {},
          positiveItemCount: 0,
          positiveItemAverage: 0,
          isSevere: parseInt(scoreFromUrl) > 160,
        });
      }
    } else if (scoreFromUrl) {
      // 如果既没有存储的结果也没有存储的答案，但有URL参数，则仅使用总分
      setResults({
        totalScore: parseInt(scoreFromUrl),
        factorScores: {},
        positiveItemCount: 0,
        positiveItemAverage: 0,
        isSevere: parseInt(scoreFromUrl) > 160,
      });
    }

    setLoading(false);
  }, [id, searchParams, questionnaire, savedData, isStorageLoading]);

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

      <FactorAnalysis
        factorScores={results.factorScores}
        questionnaireId={id}
        factorDescriptions={questionnaire.factorDescriptions}
      />

      <DimensionsAnalysis
        dimensions={questionnaire.details?.dimensions}
        totalScore={results.totalScore}
        factorScores={results.factorScores}
      />

      <PositiveItemStats
        positiveItemCount={results.positiveItemCount}
        positiveItemAverage={results.positiveItemAverage}
        questionnaireId={id}
      />

      <ResultInterpretation results={results} questionnaireId={id} />

      <Recommendations
        isSevere={results.isSevere}
        positiveItemAverage={results.positiveItemAverage}
        questionnaireId={id}
      />
    </ResultContainer>
  );
}
