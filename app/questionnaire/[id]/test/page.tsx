"use client"

import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { questionnaires } from "@/constants/questionnaires";

interface QuestionnaireTestPageProps {
    params: {
        id: string;
    };
}

interface Question {
    id: number;
    content: string;
    options: { value: string; text: string }[];
    factors?: string[];
}

export default function QuestionnaireTestPage({ params }: QuestionnaireTestPageProps) {
    const { id } = params;
    const router = useRouter();

    // 从问卷数据中获取指定id的量表
    const questionnaire = questionnaires.find(q => q.id === id);

    // 如果找不到数据，显示404页面
    if (!questionnaire) {
        return notFound();
    }

    // 初始化问题数据 - 使用真实问卷数据
    const generateQuestions = (): Question[] => {
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
                        { value: "1", text: "完全不" },
                        { value: "2", text: "轻微" },
                        { value: "3", text: "中等" },
                        { value: "4", text: "偏重" },
                        { value: "5", text: "严重" }
                    ]
            }));
        }

        // 使用真实问卷数据
        return questionnaire.questions.map((q, index) => ({
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

    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [activePanelQuestion, setActivePanelQuestion] = useState<number | null>(null);
    const [showToast, setShowToast] = useState<{ show: boolean, title: string, description: string, type: 'success' | 'error' }>({
        show: false,
        title: '',
        description: '',
        type: 'success'
    });
    const [results, setResults] = useState<{
        totalScore: number;
        factorScores: { [key: string]: number };
        positiveItemCount: number;
        positiveItemAverage: number;
        isSevere: boolean;
    } | null>(null);

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

    useEffect(() => {
        setQuestions(generateQuestions());
    }, [id]);

    // 计算测试结果
    const calculateResults = () => {
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

                questionIndexes.forEach(index => {
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

    const isOptionSelected = (questionId: number, option: string) => {
        return answers[questionId] === option;
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };

    const goToQuestion = (questionId: number) => {
        const page = Math.ceil(questionId / questionsPerPage);
        goToPage(page);
        setActivePanelQuestion(questionId);
        // 添加定时器模拟高亮效果
        setTimeout(() => {
            setActivePanelQuestion(null);
        }, 1500);
    };

    const handleSubmit = () => {
        // 检查是否所有问题都已回答
        if (answeredCount < questions.length) {
            showNotification(
                "未完成全部问题",
                `您还有 ${questions.length - answeredCount} 个问题未回答`,
                'error'
            );
            return;
        }

        // 计算测试结果
        const results = calculateResults();
        if (results) {
            setResults(results);
        }

        // 提交逻辑，可以调用API或直接跳转到结果页
        showNotification("提交成功", "您的测评结果已生成", 'success');

        // 模拟提交后跳转到结果页
        setTimeout(() => {
            // 这里可以传递结果数据到结果页
            router.push(`/questionnaire/${id}/result?score=${results?.totalScore}`);
        }, 2000);
    };

    return (
        <div className="flex justify-center min-h-screen p-4 relative">
            {/* 通知提示 */}
            {showToast.show && (
                <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg max-w-sm z-50 
                    ${showToast.type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} 
                    border`}>
                    <div className={`font-bold ${showToast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                        {showToast.title}
                    </div>
                    <div className={`text-sm ${showToast.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {showToast.description}
                    </div>
                </div>
            )}

            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 relative mb-12">
                <h1 className="text-xl font-bold text-center mb-4">{questionnaire.title}</h1>

                <div className="mb-6">
                    {/* 进度条 */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${completionPercentage}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>已完成: {answeredCount}/{questions.length}</span>
                        <span>页面: {currentPage}/{totalPages}</span>
                    </div>
                </div>

                <p className="text-center mb-8">
                    {questionnaire.details?.instructions?.split('.')[0] ||
                        `请根据您${id === "scl90" ? "近一周" : "过去一周"}的实际感受，选择最符合您情况的选项。`}
                </p>

                <div className="space-y-8">
                    {currentQuestions.map((question) => (
                        <div key={question.id} className={`mb-8 p-4 border rounded-lg ${activePanelQuestion === question.id ? 'border-green-500 bg-green-50' : ''}`}>
                            <div className="mb-4 font-medium">
                                {question.id}. {question.content}
                                {question.factors && question.factors.length > 0 && (
                                    <span className="ml-2 text-xs text-gray-500">
                                        ({question.factors.join(", ")})
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2">
                                {question.options.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`w-full border rounded-md py-3 px-4 text-left hover:bg-gray-50 transition-colors
                                        ${isOptionSelected(question.id, option.value)
                                                ? 'bg-green-100 border-green-500 font-medium'
                                                : 'border-gray-300'}`}
                                        onClick={() => handleSelect(question.id, option.value)}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-8 mb-4">
                    <Button
                        variant="outline"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        上一页
                    </Button>

                    <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm
                                ${currentPage === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'border hover:bg-gray-100'}`}
                                onClick={() => goToPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        下一页
                    </Button>
                </div>

                <div className="flex justify-center mt-8">
                    <Button
                        className="w-full max-w-lg py-6"
                        onClick={handleSubmit}
                        disabled={answeredCount < questions.length}
                    >
                        {answeredCount < questions.length
                            ? `完成${answeredCount}/${questions.length}题 继续作答`
                            : '提交结果'}
                    </Button>
                </div>
            </div>

            {/* 固定在右侧的进度面板 */}
            <div className="fixed right-8 top-1/4 bg-white border rounded-lg shadow-lg p-4 w-64 max-h-[500px] overflow-auto">
                <div className="text-center mb-2 font-medium">题目列表</div>
                <div className="text-center font-bold mb-4">{answeredCount}/{questions.length}</div>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                    <div className="text-xs text-right w-full">完成题数/总数</div>
                </div>

                <div className="grid grid-cols-5 gap-1 mb-4">
                    {Array(Math.min(20, questions.length)).fill(0).map((_, i) => (
                        <button
                            key={i}
                            className={`w-9 h-9 flex items-center justify-center rounded-md text-xs
                            ${answers[i + 1] ? 'bg-green-100 border-green-500 border-2' : 'border'}
                            ${(i + 1) === activePanelQuestion ? 'bg-green-300 border-green-600' : ''}`}
                            onClick={() => goToQuestion(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                {questions.length > 20 && (
                    <>
                        <div className="text-xs text-center mb-2">
                            点击查看更多题目
                        </div>

                        <div className="grid grid-cols-5 gap-1">
                            {Array(questions.length - 20).fill(0).map((_, i) => (
                                <button
                                    key={i + 20}
                                    className={`w-9 h-9 flex items-center justify-center rounded-md text-xs
                                    ${answers[i + 21] ? 'bg-green-100 border-green-500 border-2' : 'border'}
                                    ${(i + 21) === activePanelQuestion ? 'bg-green-300 border-green-600' : ''}`}
                                    onClick={() => goToQuestion(i + 21)}
                                >
                                    {i + 21}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex justify-between items-center mt-4 pt-2 border-t">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-100 border-green-500 border-2 mr-1"></div>
                        <span className="text-xs">已完成</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 border mr-1"></div>
                        <span className="text-xs">未完成</span>
                    </div>
                </div>
            </div>
        </div>
    );
}