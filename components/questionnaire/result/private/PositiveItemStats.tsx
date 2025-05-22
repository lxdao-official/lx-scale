import { useScopedI18n } from '@/locales/client';
interface PositiveItemStatsProps {
  positiveItemCount: number;
  positiveItemAverage: number;
  questionnaireId: string;
}

export function PositiveItemStats({
  positiveItemCount,
  positiveItemAverage,
  questionnaireId,
}: PositiveItemStatsProps) {
  const t = useScopedI18n('component.questionnaire.result.private');
  // 只有SCL90量表需要显示阳性项目统计
  if (questionnaireId !== 'scl90' || positiveItemCount <= 0) return null;

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('positiveItems')}</h2>
      <div className="flex items-center justify-around bg-gray-100 rounded-lg p-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {positiveItemCount}
          </div>
          <div className="mt-1 text-sm text-gray-600">
            {t('positiveItemCount')}
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {positiveItemAverage.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-gray-600">
            {t('positiveItemAverage')}
          </div>
        </div>
      </div>
    </div>
  );
}
