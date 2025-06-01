import { useScopedI18n } from '@/locales/client';
import { AIChat } from './AIChat';

interface RecommendationsProps {
  isSevere: boolean;
  positiveItemAverage?: number;
  questionnaireId?: string;
}

export function Recommendations({
  isSevere,
  positiveItemAverage,
  questionnaireId = 'unknown',
}: RecommendationsProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.recommendations'
  );
  const isHighSeverity =
    isSevere || (positiveItemAverage && positiveItemAverage > 3);

  // 准备问卷结果数据，用于传递给AI聊天组件
  const questionnaireResults = {
    isSevere,
    positiveItemAverage,
    severity: isHighSeverity ? 'high' : 'normal',
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('title')}</h2>
      <div className="bg-white border rounded-lg p-4">
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>{t('aiPlaceholder')}</li>
          {isHighSeverity ? (
            <li className="font-bold text-red-600">{t('severeAdvice')}</li>
          ) : (
            <li>{t('generalAdvice')}</li>
          )}
        </ul>
        
        {/* AI 聊天组件 */}
        <AIChat 
          questionnaireResults={questionnaireResults} 
          questionnaireType={questionnaireId} 
        />
      </div>
    </div>
  );
}
