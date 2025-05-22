'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/components/questionnaire/test/public/Question';
import { Navigation } from '@/components/questionnaire/test/public/Navigation';
import { ProgressPanel } from '@/components/questionnaire/test/public/ProgressPanel';
import { ProgressBar } from '@/components/questionnaire/test/public/ProgressBar';
import { Toast } from '@/components/questionnaire/test/public/Toast';
import { calculateSCL90Results } from './private/SCL90Calculator';
import { calculateSDSResults } from './private/SDSCalculator';
import { calculateYBOCSResults } from './private/YBOCSCalculator';
import { QuestionType, CalculatedResults } from './types';
import { useScopedI18n } from '@/locales/client';

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

export function QuestionnaireTest({
  questionnaire,
  id,
}: QuestionnaireTestProps) {
  const router = useRouter();
  const t = useScopedI18n('component.questionnaire.test.QuestionnaireTest');
  // 状态管理
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  // 创建refs来引用每个问题元素
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // 初始化问题数据 - 使用真实问卷数据
  const generateQuestions = (): QuestionType[] => {
    const getOptions = (id: string) => {
      if (id === 'depression') {
        return [
          { value: '1', text: t('depressionOption1') },
          { value: '2', text: t('depressionOption2') },
          { value: '3', text: t('depressionOption3') },
          { value: '4', text: t('depressionOption4') },
        ];
      } else if (id === 'ocd') {
        return [
          { value: '0', text: t('ocdOption0') },
          { value: '1', text: t('ocdOption1') },
          { value: '2', text: t('ocdOption2') },
          { value: '3', text: t('ocdOption3') },
          { value: '4', text: t('ocdOption4') },
        ];
      } else {
        return [
          { value: '1', text: t('defaultOption1') },
          { value: '2', text: t('defaultOption2') },
          { value: '3', text: t('defaultOption3') },
          { value: '4', text: t('defaultOption4') },
          { value: '5', text: t('defaultOption5') },
        ];
      }
    };
    // 检查问卷是否有问题数据
    if (!questionnaire.questions || questionnaire.questions.length === 0) {
      // 如果没有真实数据，则使用模拟数据
      const count =
        id === 'scl90' ? 90 : id === 'depression' ? 20 : id === 'ocd' ? 10 : 2;

      return Array(count)
        .fill(0)
        .map((_, index) => ({
          id: index + 1,
          content: t('mockContent', {
            title: questionnaire.title,
            number: index + 1,
            question:
              id === 'scl90'
                ? t('scl90TimeRange')
                : id === 'depression'
                ? t('depressionTimeRange')
                : id === 'ocd'
                ? t('ocdSymptoms')
                : t('dailyLife'),
          }),
          options: getOptions(id),
        }));
    }

    // 使用真实问卷数据
    return questionnaire.questions.map((q, index: number) => ({
      id: index + 1,
      content: q.content,
      factors: q.factors,
      options: getOptions(id),
    }));
  };

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [activePanelQuestion, setActivePanelQuestion] = useState<number | null>(
    null
  );
  const [showToast, setShowToast] = useState<{
    show: boolean;
    title: string;
    description: string;
    type: 'success' | 'error';
  }>({
    show: false,
    title: '',
    description: '',
    type: 'success',
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
  const completionPercentage = questions.length
    ? (answeredCount / questions.length) * 100
    : 0;

  // 这里的generateQuestions在每次useEffect运行时也会变化
  // 解决办法是将其移入useEffect内部或使用useCallback包装
  const generateQuestionsCallback = useCallback(generateQuestions, [
    id,
    questionnaire,
    t,
  ]);

  useEffect(() => {
    setQuestions(generateQuestionsCallback());
    // 重置refs对象，以便在问题列表变化时重新分配
    questionRefs.current = {};
  }, [id, questionnaire, generateQuestionsCallback]);

  // 计算测试结果
  const calculateResults = (): CalculatedResults | null => {
    if (Object.keys(answers).length < questions.length) return null;

    if (id === 'depression') {
      return calculateSDSResults({ answers, questions });
    } else if (id === 'scl90') {
      return calculateSCL90Results({
        answers,
        questions,
        factorMapping: questionnaire.factorMapping,
      });
    } else if (id === 'ocd') {
      return calculateYBOCSResults({ answers, questions });
    }

    return null;
  };

  // 显示通知信息
  const showNotification = (
    title: string,
    description: string,
    type: 'success' | 'error'
  ) => {
    setShowToast({
      show: true,
      title,
      description,
      type,
    });

    // 3秒后自动隐藏
    setTimeout(() => {
      setShowToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
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
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = () => {
    // 检查是否所有问题都已回答
    if (answeredCount < questions.length) {
      showNotification(
        t('errorTitle'),
        t('errorDesc', { number: questions.length - answeredCount }),
        'error'
      );
      return;
    }

    // 计算结果
    const results = calculateResults();
    if (results) {
      // 将结果保存到localStorage中，以便结果页面使用
      try {
        localStorage.setItem(
          `questionnaire_result_${id}`,
          JSON.stringify(results)
        );
      } catch (error) {
        console.error(t('error'), error);
      }

      // 跳转到结果页面，并传递总分作为URL参数
      router.push(`/questionnaire/${id}/result?score=${results.totalScore}`);
    }
  };

  // 切换进度面板显示状态
  const toggleProgressPanel = () => {
    setShowProgressPanel((prev) => !prev);
  };

  const setQuestionRef =
    (questionId: number) => (el: HTMLDivElement | null) => {
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
