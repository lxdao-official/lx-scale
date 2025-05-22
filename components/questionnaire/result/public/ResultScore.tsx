import { useScopedI18n } from '@/locales/client';
interface ResultScoreProps {
  totalScore: number;
  questionnaireId: string;
}

export function ResultScore({ totalScore, questionnaireId }: ResultScoreProps) {
  const t = useScopedI18n('component.questionnaire.result.public.resultScore');
  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('totalScoreTitle')}</h2>
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-600">{totalScore}</div>
          {questionnaireId === 'scl90' && (
            <div className="mt-2 text-gray-600">{t('scl90StandardScore')}</div>
          )}
          {questionnaireId === 'depression' && (
            <div className="mt-2 text-gray-600">
              {t('depressionStandardScore')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
