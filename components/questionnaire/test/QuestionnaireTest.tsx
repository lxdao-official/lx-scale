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
import { saveDraft, loadDraft, clearDraft } from '@/lib/storage';

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
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>(() => {
    // Load saved answers from local storage
    const savedAnswers = loadDraft(id);
    return savedAnswers || {};
  });
  // Create refs to reference each question element
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Save answers when component unmounts
  useEffect(() => {
    return () => {
      // Save answers if user leaves the page without submitting
      if (Object.keys(answers).length > 0) {
        saveDraft(id, answers);
      }
    };
  }, [id, answers]);



  // Initialize question data - using real questionnaire data
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
    // Check the questionnaire for question data
    if (!questionnaire.questions || questionnaire.questions.length === 0) {
      // If real data is not available, simulated data is used
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

    // Use real questionnaire data
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
  // Control the display state of the progress panel
  const [showProgressPanel, setShowProgressPanel] = useState(true);

  // Number of questions per page
  const questionsPerPage = 5;
  // Total number of pages
  const totalPages = Math.ceil((questions.length || 0) / questionsPerPage);
  // Questions on the current page
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  // Number of answered questions
  const answeredCount = Object.keys(answers).length;
  // Calculate completion percentage
  const completionPercentage = questions.length
    ? (answeredCount / questions.length) * 100
    : 0;

  // This generateQuestions function changes every time useEffect runs
  // Solution is to move it inside useEffect or wrap it with useCallback
  const generateQuestionsCallback = useCallback(generateQuestions, [
    id,
    questionnaire,
    t,
  ]);

  useEffect(() => {
    setQuestions(generateQuestionsCallback());
    // Reset the refs object to reassign when the list of issues changes
    questionRefs.current = {};
  }, [id, questionnaire, generateQuestionsCallback]);

  // Calculate the test results
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

  // Show notification message
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

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSelect = (questionId: number, value: string) => {
    const newAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(newAnswers);
    // Auto-save answers
    if (Object.keys(newAnswers).length < questions.length) {
      saveDraft(id, newAnswers);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const goToQuestion = (questionId: number) => {
    // Calculate which page the question is on
    const page = Math.ceil(questionId / questionsPerPage);

    // If already on the page, scroll to the question
    if (currentPage === page) {
      scrollToQuestion(questionId);
    } else {
      // Otherwise, switch page first, then scroll to question after page loads
      setCurrentPage(page);

      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollToQuestion(questionId);
      }, 100);
    }

    // Set highlight effect
    setActivePanelQuestion(questionId);
    setTimeout(() => {
      setActivePanelQuestion(null);
    }, 1500);
  };

  // Scroll to specific question position
  const scrollToQuestion = (questionId: number) => {
    const questionElement = questionRefs.current[questionId];
    if (questionElement) {
      // Get question element's position relative to viewport
      const rect = questionElement.getBoundingClientRect();

      // Calculate scroll position with slight offset for better visual effect
      const scrollTop = window.pageYOffset + rect.top - 100;

      // Smooth scroll to question position
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered first
    if (answeredCount < questions.length) {
      showNotification(
        t('errorTitle'),
        t('errorDesc', { number: questions.length - answeredCount }),
        'error'
      );
      return;
    }

    // Calculate results
    const results = calculateResults();
    if (results) {
      // Clear draft before navigation
      clearDraft(id);
      // Navigate to results page with total score as URL parameter
      router.push(`/questionnaire/${id}/result?score=${results.totalScore}`);
    }
  };

  // Toggle progress panel visibility
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
