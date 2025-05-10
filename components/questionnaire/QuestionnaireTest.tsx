"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Question } from "@/components/questionnaire/Question";
import { Navigation } from "@/components/questionnaire/Navigation";
import { ProgressPanel } from "@/components/questionnaire/ProgressPanel";
import { ProgressBar } from "@/components/questionnaire/ProgressBar";
import { Toast } from "@/components/questionnaire/Toast";

interface Questionnaire {
    id: string;
    title: string;
    questions?: QuestionType[];
    factorMapping?: { [key: string]: number[] };
}

interface QuestionnaireTestProps {
    questionnaire: Questionnaire;
    id: string;
}

interface QuestionType {
    id: number;
    content: string;
    options: { value: string; text: string }[];
    factors?: string[];
}

export function QuestionnaireTest({ questionnaire, id }: QuestionnaireTestProps) {
    const router = useRouter();

    // 创建refs来引用每个问题元素
    const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // 初始化问题数据 - 使用真实问卷数据
    const generateQuestions = (): QuestionType[] => {
        // 检查问卷是否有问题数据
        if (!questionnaire.questions || questionnaire.questions.length === 0) {
            // 如果没有真实数据，则使用模拟数据
            const count = id === "scl90" ? 90 : id === "depression" ? 20 : 10;

            return Array(count).fill(0).map((_, index) => ({
                id: index + 1,
                content: `${questionnaire.title}问题${index + 1}：这是一个关于您${id === "scl90" ? "近一周" :
                    id === "depression" ? "过去一周" : "日常生活中"
                    }的问题，请根据实际情况选择最符合的选项。`,
                options: id === "depression"
                    ? [
                        { value: "1", text: "没有或很少时间" },
                        { value: "2", text: "小部分时间" },
                        { value: "3", text: "相当多时间" },
                        { value: "4", text: "绝大部分或全部时间" }
                    ]
                    : [
                        { value: "1", text: "没有" },
                        { value: "2", text: "很轻" },
                        { value: "3", text: "中等" },
                        { value: "4", text: "偏重" },
                        { value: "5", text: "严重" }
                    ]
            }));
        }

        // 使用真实问卷数据
        return questionnaire.questions.map((q, index: number) => ({
            id: index + 1,
            content: q.content,
            factors: q.factors,
            options: id === "depression"
                ? [
                    { value: "1", text: "没有或很少时间" },
                    { value: "2", text: "小部分时间" },
                    { value: "3", text: "相当多时间" },
                    { value: "4", text: "绝大部分或全部时间" }
                ]
                : [
                    { value: "1", text: "没有" },
                    { value: "2", text: "很轻" },
                    { value: "3", text: "中等" },
                    { value: "4", text: "偏重" },
                    { value: "5", text: "严重" }
                ]
        }));
    };

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [activePanelQuestion, setActivePanelQuestion] = useState<number | null>(null);
    const [showToast, setShowToast] = useState<{ show: boolean, title: string, description: string, type: 'success' | 'error' }>({
        show: false,
        title: '',
        description: '',
        type: 'success'
    });
    // 进度面板显示状态控制
    const [showProgressPanel, setShowProgressPanel] = useState(true);

    // 每页显示的问题数
    const questionsPerPage = 5;
    // 总页数
    const totalPages = Math.ceil((questions.length || 0) / questionsPerPage);
    // 当前页的问题
    const currentQuestions = questions.slice(
        (currentPage - 1) * questionsPerPage,
        currentPage * questionsPerPage
    );

    // 已回答的问题数
    const answeredCount = Object.keys(answers).length;
    // 完成百分比
    const completionPercentage = questions.length ? (answeredCount / questions.length) * 100 : 0;

    // 这里的generateQuestions在每次useEffect运行时也会变化
    // 解决办法是将其移入useEffect内部或使用useCallback包装
    const generateQuestionsCallback = useCallback(generateQuestions, [id, questionnaire]);

    useEffect(() => {
        setQuestions(generateQuestionsCallback());
        // 重置refs对象，以便在问题列表变化时重新分配
        questionRefs.current = {};
    }, [id, questionnaire, generateQuestionsCallback]);

    // 在QuestionType中添加适当的类型
    interface CalculatedResults {
        totalScore: number;
        factorScores: { [key: string]: number };
        positiveItemCount: number;
        positiveItemAverage: number;
        isSevere: boolean;
    }

    // 计算测试结果
    const calculateResults = (): CalculatedResults | null => {
        if (Object.keys(answers).length < questions.length) return null;

        // 计算总分
        const totalScore = Object.values(answers).reduce((sum, score) => sum + parseInt(score), 0);

        // 计算阳性项目数（得分>=2的项目）
        const positiveItemCount = Object.values(answers).filter(score => parseInt(score) >= 2).length;

        // 计算阴性项目数（得分=1的项目）
        const negativeItemCount = Object.values(answers).filter(score => parseInt(score) === 1).length;

        // 阳性症状均分
        const positiveItemAverage = positiveItemCount > 0
            ? (totalScore - negativeItemCount) / positiveItemCount
            : 0;

        // 计算各因子分数
        const factorScores: { [key: string]: number } = {};

        if (questionnaire.factorMapping && id === "scl90") {
            Object.entries(questionnaire.factorMapping).forEach(([factor, questionIndexes]) => {
                let factorSum = 0;
                let validQuestionCount = 0;

                questionIndexes.forEach((index: number) => {
                    if (answers[index]) {
                        factorSum += parseInt(answers[index]);
                        validQuestionCount++;
                    }
                });

                factorScores[factor] = validQuestionCount > 0
                    ? factorSum / validQuestionCount
                    : 0;
            });
        }

        // 判断是否严重
        const isSevere = totalScore > 160 || positiveItemCount > 43;

        return {
            totalScore,
            factorScores,
            positiveItemCount,
            positiveItemAverage,
            isSevere
        };
    };

    // 显示通知信息
    const showNotification = (title: string, description: string, type: 'success' | 'error') => {
        setShowToast({
            show: true,
            title,
            description,
            type
        });

        // 3秒后自动隐藏
        setTimeout(() => {
            setShowToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleSelect = (questionId: number, option: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };

    const goToQuestion = (questionId: number) => {
        // 计算问题所在页数
        const page = Math.ceil(questionId / questionsPerPage);

        // 如果当前已经在该页，直接滚动到问题位置
        if (currentPage === page) {
            scrollToQuestion(questionId);
        } else {
            // 否则，先切换页面，然后在页面加载后滚动到问题位置
            setCurrentPage(page);

            // 使用setTimeout确保DOM更新后再滚动
            setTimeout(() => {
                scrollToQuestion(questionId);
            }, 100);
        }

        // 设置高亮效果
        setActivePanelQuestion(questionId);
        setTimeout(() => {
            setActivePanelQuestion(null);
        }, 1500);
    };

    // 滚动到指定问题的位置
    const scrollToQuestion = (questionId: number) => {
        const questionElement = questionRefs.current[questionId];
        if (questionElement) {
            // 获取问题元素相对于视口的位置
            const rect = questionElement.getBoundingClientRect();

            // 计算滚动位置，稍微向上偏移一点，以便有更好的视觉效果
            const scrollTop = window.pageYOffset + rect.top - 100;

            // 平滑滚动到问题位置
            window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    };

    const handleSubmit = () => {
        // 检查是否所有问题都已回答
        if (answeredCount < questions.length) {
            showNotification(
                "未完成全部问题",
                `您还有${questions.length - answeredCount}个问题未回答。`,
                "error"
            );
            return;
        }

        // 计算结果
        const results = calculateResults();
        if (results) {
            // 将结果保存到localStorage中，以便结果页面使用
            try {
                localStorage.setItem(`questionnaire_result_${id}`, JSON.stringify(results));
            } catch (error) {
                console.error('保存结果数据时出错:', error);
            }

            // 跳转到结果页面，并传递总分作为URL参数
            router.push(`/questionnaire/${id}/result?score=${results.totalScore}`);
        }
    };

    // 切换进度面板显示状态
    const toggleProgressPanel = () => {
        setShowProgressPanel(prev => !prev);
    };

    const setQuestionRef = (questionId: number) => (el: HTMLDivElement | null) => {
        questionRefs.current[questionId] = el;
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-8">{questionnaire.title}</h1>

            <ProgressPanel
                questions={questions}
                answers={answers}
                activePanelQuestion={activePanelQuestion}
                goToQuestion={goToQuestion}
                showProgressPanel={showProgressPanel}
                toggleProgressPanel={toggleProgressPanel}
                completionPercentage={completionPercentage}
            />

            <ProgressBar completionPercentage={completionPercentage} />

            <div className="space-y-6">
                {currentQuestions.map((question) => (
                    <Question
                        key={question.id}
                        question={question}
                        answer={answers[question.id]}
                        onSelect={handleSelect}
                        ref={setQuestionRef(question.id)}
                    />
                ))}
            </div>

            <Navigation
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                onSubmit={handleSubmit}
                isLastPage={currentPage === totalPages}
            />

            <Toast {...showToast} />
        </div>
    );
} 