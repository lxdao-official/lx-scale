'use client';
import { useScopedI18n } from '@/locales/client';
interface ResultInterpretationProps {
  results: {
    totalScore: number;
    isSevere: boolean;
    severity?: string;
  };
  questionnaireId: string;
}

export function ResultInterpretation({
  results,
  questionnaireId,
}: ResultInterpretationProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.resultInterpretation'
  );
  const getInterpretation = () => {
    if (!results) return t('noInterpretation');

    // 根据测试类型和分数提供不同的解读
    if (questionnaireId === 'scl90') {
      if (results.isSevere) {
        return t('scl90Severe');
      } else if (results.totalScore > 120) {
        return t('scl90Moderate');
      } else {
        return t('scl90Good');
      }
    } else if (questionnaireId === 'depression') {
      if (results.totalScore > 60) {
        return t('depressionSevere');
      } else if (results.totalScore > 40) {
        return t('depressionModerate');
      } else {
        return t('depressionMild');
      }
    } else if (questionnaireId === 'ocd') {
      // Yale-Brown强迫症状量表(Y-BOCS)结果解释
      if (results.severity === 'extreme') {
        return t('ocdExtreme', { score: results.totalScore });
      } else if (results.severity === 'severe') {
        return t('ocdSevere', { score: results.totalScore });
      } else if (results.severity === 'moderate') {
        return t('ocdModerate', { score: results.totalScore });
      } else if (results.severity === 'mild') {
        return t('ocdMild', { score: results.totalScore });
      } else {
        return t('ocdNormal', { score: results.totalScore });
      }
    } else {
      return t('default');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('title')}</h2>
      <div className="bg-white border rounded-lg p-4">
        <p className="text-gray-700">{getInterpretation()}</p>
      </div>
    </div>
  );
}
