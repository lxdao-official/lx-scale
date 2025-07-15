import { useScopedI18n } from '@/locales/client';
interface FactorAnalysisProps {
  factorScores: { [key: string]: number };
  questionnaireId: string;
  factorDescriptions?: { [key: string]: string };
}

export function FactorAnalysis({
  factorScores,
  questionnaireId,
  factorDescriptions,
}: FactorAnalysisProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.factorAnalysis'
  );
  if (!factorScores || Object.keys(factorScores).length === 0) return null;

  // Get Chinese factor name mapping
  const getFactorNameMap = () => {
    const factorNameMap: { [key: string]: { [key: string]: string } } = {
      ocd: {
        obsession: t('ocdObsessionName'),
        compulsion: t('ocdCompulsionName'),
      },
    };
    return factorNameMap[questionnaireId] || {};
  };

  // Get factor description information
  const getFactorDescription = (factorName: string) => {
    // If external description is provided, use it preferentially
    if (factorDescriptions && factorDescriptions[factorName]) {
      return factorDescriptions[factorName];
    }

    // Default description mapping
    const defaultDescriptions: { [key: string]: { [key: string]: string } } = {
      ocd: {
        obsession: t('ocdObsessionDesc'),
        compulsion: t('ocdCompulsionDesc'),
      },
    };

    return (
      defaultDescriptions[questionnaireId]?.[factorName] ||
      `${factorName}得分反映了您在该维度上的状态。`
    );
  };

  // Get severity level of factor scores
  const getFactorSeverityLevel = (factorName: string, score: number) => {
    // Define severity thresholds based on ID and factor names
    const thresholds: { [key: string]: { [key: string]: number[] } } = {
      scl90: {
        躯体化: [1.5, 2.5, 3.5],
        强迫症状: [1.5, 2.5, 3.5],
        人际关系敏感: [1.5, 2.5, 3.5],
        抑郁: [1.5, 2.5, 3.5],
        焦虑: [1.5, 2.5, 3.5],
        敌对: [1.5, 2.5, 3.5],
        恐怖: [1.5, 2.5, 3.5],
        偏执: [1.5, 2.5, 3.5],
        精神病性: [1.5, 2.5, 3.5],
        其他: [1.5, 2.5, 3.5],
      },
      ocd: {
        obsession: [4, 8, 12],
        compulsion: [4, 8, 12],
        default: [4, 8, 12],
      },
    };

    const factorThresholds = thresholds[questionnaireId]?.[factorName] ||
      thresholds[questionnaireId]?.['default'] || [1.5, 2.5, 3.5];

    if (score < factorThresholds[0]) return t('mild');
    if (score < factorThresholds[1]) return t('moderate');
    if (score < factorThresholds[2]) return t('severe');
    return t('extreme');
  };

  // Get maximum score of factor (for percentage calculation)
  const getMaxScore = (factorName: string) => {
    const maxScores: { [key: string]: { [key: string]: number } } = {
      scl90: { default: 5 },
      ocd: {
        obsession: 20,
        compulsion: 20,
        default: 20,
      },
    };

    return (
      maxScores[questionnaireId]?.[factorName] ||
      maxScores[questionnaireId]?.['default'] ||
      5
    );
  };

  // Get localized display of factor names
  const getDisplayName = (factorName: string) => {
    const nameMap = getFactorNameMap();
    return nameMap[factorName] || factorName;
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-3">{t('factorAnalysisTitle')}</h2>
      <div className="space-y-4">
        {Object.entries(factorScores).map(([factorName, score], index) => {
          const displayName = getDisplayName(factorName);
          const severity = getFactorSeverityLevel(factorName, score);
          const severityColorMap: { [key: string]: string } = {
            轻微: 'bg-green-500',
            轻度: 'bg-yellow-500',
            中度: 'bg-orange-500',
            严重: 'bg-red-500',
          };
          const colorClass = severityColorMap[severity] || 'bg-blue-500';

          // Percentage calculation based on maximum scores of each factor in each scale
          const maxScore = getMaxScore(factorName);
          const scorePercentage = (score / maxScore) * 100;

          return (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{displayName} </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs text-white ${colorClass}`}
                >
                  {severity}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${colorClass} h-2.5 rounded-full`}
                    style={{ width: `${Math.min(scorePercentage, 100)}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {score.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {getFactorDescription(factorName)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
