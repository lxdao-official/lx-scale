'use client';

import React from 'react';
import { useScopedI18n } from '@/locales/client';
import { calculateGDResults } from '../../test/private/GDCalculator';

function useLabels() {
  const t = useScopedI18n('components.gdResult');
  return {
    totalScore: t('totalScore'),
    scorePercentage: t('scorePercentage'),
    elevatedItems: t('elevatedItems'),
    genderIdentity: t('genderIdentity'),
    socialRole: t('socialRole'),
    physicalDysphoria: t('physicalDysphoria'),
    genderExpression: t('genderExpression'),
    overallAssessment: t('overallAssessment'),
    recommendations: t('recommendations'),
    importantNotes: t('importantNotes'),
    understandingResults: t('understandingResults'),
    factorScores: t('factorScores'),
    interpretationLevels: {
      low: t('interpretationLevels.low'),
      mild: t('interpretationLevels.mild'),
      moderate: t('interpretationLevels.moderate'),
      high: t('interpretationLevels.high'),
    },
    factorDescriptions: {
      genderIdentity: t('factorDescriptions.genderIdentity'),
      socialRole: t('factorDescriptions.socialRole'),
      physicalDysphoria: t('factorDescriptions.physicalDysphoria'),
      genderExpression: t('factorDescriptions.genderExpression'),
    },
    notes: {
      purpose: t('notes.purpose'),
      substitute: t('notes.substitute'),
      complexity: t('notes.complexity'),
      professional: t('notes.professional'),
    },
    recommendationTexts: {
      high: t('recommendationTexts.high'),
      low: t('recommendationTexts.low'),
    },
  };
}

export function GDResult({
  answers,
}: {
  answers: string[];
}) {
  const labels = useLabels();
  
  // Convert answers array to object format expected by calculator
  const answersObj: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersObj[index + 1] = answer;
  });

  const results = calculateGDResults({ answers: answersObj, questions: [] });
  
  const getInterpretationColor = (interpretation: string) => {
    switch (interpretation) {
      case 'low': return 'text-green-600';
      case 'mild': return 'text-yellow-600';
      case 'moderate': return 'text-orange-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getInterpretationLabel = (interpretation: string) => {
    return labels.interpretationLevels[interpretation as keyof typeof labels.interpretationLevels] || 'Unknown';
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard title={labels.totalScore} value={results.totalScore} />
        <MetricCard title={labels.scorePercentage} value={`${results.scorePercentage}%`} />
        <MetricCard title={labels.elevatedItems} value={results.positiveItemCount} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={labels.genderIdentity} value={results.factorScores.genderIdentity} />
        <MetricCard title={labels.socialRole} value={results.factorScores.socialRole} />
        <MetricCard title={labels.physicalDysphoria} value={results.factorScores.physicalDysphoria} />
        <MetricCard title={labels.genderExpression} value={results.factorScores.genderExpression} />
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{labels.overallAssessment}</h3>
        <div className={`text-lg font-semibold ${getInterpretationColor(results.interpretation)}`}>
          {getInterpretationLabel(results.interpretation)} Level
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Score: {results.totalScore}/189 ({results.scorePercentage}%)
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">{labels.recommendations}</h3>
        <p className="text-sm text-blue-700">
          {results.scorePercentage >= 50 ? labels.recommendationTexts.high : labels.recommendationTexts.low}
        </p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{labels.importantNotes}</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• {labels.notes.purpose}</li>
          <li>• {labels.notes.substitute}</li>
          <li>• {labels.notes.complexity}</li>
          <li>• {labels.notes.professional}</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-purple-800 mb-2">{labels.understandingResults}</h3>
        <div className="text-sm text-purple-700 space-y-2">
          <p><strong>{labels.factorScores}:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• {labels.genderIdentity}: {labels.factorDescriptions.genderIdentity}</li>
            <li>• {labels.socialRole}: {labels.factorDescriptions.socialRole}</li>
            <li>• {labels.physicalDysphoria}: {labels.factorDescriptions.physicalDysphoria}</li>
            <li>• {labels.genderExpression}: {labels.factorDescriptions.genderExpression}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  className?: string;
}

function MetricCard({ title, value, className = '' }: MetricCardProps) {
  return (
    <div
      className={`bg-white border rounded-lg p-4 flex flex-col items-center shadow-sm ${className}`}
    >
      <span className="text-sm text-gray-500 mb-1">{title}</span>
      <span className="text-2xl font-semibold text-indigo-600">{value}</span>
    </div>
  );
}