import { useScopedI18n } from '@/locales/client';
import { AIChat } from './AIChat';

interface RecommendationsProps {
  questionnaireId?: string;
  questionnaireResults: Record<string, string>;
  onChatLimitReached?: (isReached: boolean) => void;
}

export function Recommendations({
  questionnaireId = 'unknown',
  questionnaireResults,
  onChatLimitReached,
}: RecommendationsProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.recommendations'
  );

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('title')}</h2>
      <div className="bg-white border rounded-lg p-4">
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>{t('aiPlaceholder')}</li>
          <li>{t('generalAdvice')}</li>
        </ul>

        {/* AI Chat component */}
        <AIChat
          questionnaireResults={questionnaireResults}
          questionnaireType={questionnaireId}
          onLimitReached={onChatLimitReached}
        />
      </div>
    </div>
  );
}
