import { useScopedI18n } from '@/locales/client';
interface RecommendationsProps {
  isSevere: boolean;
  positiveItemAverage?: number;
}

export function Recommendations({
  isSevere,
  positiveItemAverage,
}: RecommendationsProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.recommendations'
  );
  const isHighSeverity =
    isSevere || (positiveItemAverage && positiveItemAverage > 3);

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
      </div>
    </div>
  );
}
