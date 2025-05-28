import { useScopedI18n } from '@/locales/client';
interface Question {
  id: number;
  content: string;
  options: Array<{ value: string; text: string }>;
  factors?: string[];
}

interface ProgressPanelProps {
  questions: Question[];
  answers: { [key: number]: string };
  activePanelQuestion: number | null;
  goToQuestion: (questionId: number) => void;
  showProgressPanel: boolean;
  toggleProgressPanel: () => void;
  completionPercentage: number;
}

export function ProgressPanel({
  questions,
  answers,
  activePanelQuestion,
  goToQuestion,
  showProgressPanel,
  toggleProgressPanel,
  completionPercentage,
}: ProgressPanelProps) {
  const t = useScopedI18n('component.questionnaire.test.public.progressPanel');
  return (
    <>
      <button
        className="fixed right-4 top-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 z-40 transition-all duration-300"
        onClick={toggleProgressPanel}
        title={showProgressPanel ? t('hideNav') : t('showNav')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform duration-300 ${
            showProgressPanel ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        className={`fixed right-4 top-20 w-64 bg-white rounded-lg shadow-lg p-4 transition-transform duration-300 transform ${
          showProgressPanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">
            {t('completionProgress')}
            {Math.round(completionPercentage)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1 mb-4 max-h-[400px] overflow-y-auto">
          {questions.map((_, i) => (
            <button
              key={i}
              className={`w-9 h-9 flex items-center justify-center rounded-md text-xs
                            ${
                              answers[i + 1]
                                ? 'bg-green-100 border-green-500 border-2'
                                : 'border'
                            }
                            ${
                              i + 1 === activePanelQuestion
                                ? 'bg-green-300 border-green-600'
                                : ''
                            }
                            hover:bg-gray-100 transition-colors duration-200`}
              onClick={() => goToQuestion(i + 1)}
              title={t('jumpToQuestion', { questionNumber: i + 1 })}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
