"use client"

import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { questionnaires } from "@/constants/questionnaires";
import Link from "next/link";
import { ResultContainer } from "@/components/questionnaire/result/public/ResultContainer";
import { ResultScore } from "@/components/questionnaire/result/public/ResultScore";
import { PositiveItemStats } from "@/components/questionnaire/result/private/PositiveItemStats";
import { ResultInterpretation } from "@/components/questionnaire/result/public/ResultInterpretation";
import { FactorAnalysis } from "@/components/questionnaire/result/public/FactorAnalysis";
import { DimensionsAnalysis } from "@/components/questionnaire/result/public/DimensionsAnalysis";
import { Recommendations } from "@/components/questionnaire/result/public/Recommendations";

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

import { use } from "react";

export default function QuestionnaireResultPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const searchParams = useSearchParams();
    const [results, setResults] = useState<ResultsData | null>(null);
    const [loading, setLoading] = useState(true);

    // 从问卷数据中获取指定id的量表
    const questionnaire = questionnaires.find(q => q.id === id) as Questionnaire;

    // React useEffect hook必须在组件顶层调用，不能在条件语句之后
    useEffect(() => {
        // 如果找不到问卷，则不执行后续逻辑
        if (!questionnaire || !questionnaire.details) {
            return;
        }

        // 尝试从URL参数中获取总分
        const scoreFromUrl = searchParams.get('score');

        // 尝试从localStorage中获取更详细的结果数据
        const storedResultsStr = localStorage.getItem(`questionnaire_result_${id}`);

        if (storedResultsStr) {
            try {
                const storedResults = JSON.parse(storedResultsStr);
                setResults(storedResults);
            } catch (error) {
                console.error('解析存储的结果数据时出错:', error);
                // 如果localStorage解析失败但有URL参数，则仅使用总分
                if (scoreFromUrl) {
                    setResults({
                        totalScore: parseInt(scoreFromUrl),
                        factorScores: {},
                        positiveItemCount: 0,
                        positiveItemAverage: 0,
                        isSevere: parseInt(scoreFromUrl) > 160
                    });
                }
            }
        } else if (scoreFromUrl) {
            // 如果没有存储的数据但有URL参数，则仅使用总分
            setResults({
                totalScore: parseInt(scoreFromUrl),
                factorScores: {},
                positiveItemCount: 0,
                positiveItemAverage: 0,
                isSevere: parseInt(scoreFromUrl) > 160
            });
        }

        setLoading(false);
    }, [id, searchParams, questionnaire]);

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
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                    <h1 className="text-2xl font-bold mb-6">{questionnaire.title} - 结果未找到</h1>
                    <p className="text-gray-700 mb-6">无法获取您的测评结果，请重新完成测评。</p>
                    <Button>
                        <Link href={`/questionnaire/${id}/survey`}>重新测评</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <ResultContainer title={questionnaire.title} id={id}>
            <ResultScore
                totalScore={results.totalScore}
                questionnaireId={id}
            />

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

            <ResultInterpretation
                results={results}
                questionnaireId={id}
            />



            <Recommendations
                isSevere={results.isSevere}
                positiveItemAverage={results.positiveItemAverage}
            />
        </ResultContainer>
    );
} 