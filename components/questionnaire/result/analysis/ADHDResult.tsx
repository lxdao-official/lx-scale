'use client';

import React from 'react';
import { useScopedI18n } from '@/locales/client';
import { calculateADHDResults } from '../../test/private/ADHDCalculator';

function useLabels() {
  const t = useScopedI18n('components.adhdResult');
  return {
    totalScore: t('totalScore'),
    inattention: t('inattention'),
    hyperactivity: t('hyperactivity'),
    partAScore: t('partAScore'),
    screeningResult: t('screeningResult'),
    severityLevel: t('severityLevel'),
    positiveScreen: t('positiveScreen'),
    negativeScreen: t('negativeScreen'),
    partAPositiveResponses: t('partAPositiveResponses'),
    basedOnTotalScore: t('basedOnTotalScore'),
    recommendations: t('recommendations'),
    importantNotes: t('importantNotes'),
    severityLevels: {
      low: t('severityLevels.low'),
      mild: t('severityLevels.mild'),
      moderate: t('severityLevels.moderate'),
      high: t('severityLevels.high'),
    },
    notes: {
      screening: t('notes.screening'),
      symptoms: t('notes.symptoms'),
      evaluation: t('notes.evaluation'),
    },
    recommendationTexts: {
      positive: t('recommendationTexts.positive'),
      negative: t('recommendationTexts.negative'),
    },
  };
}

export function ADHDResult({
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

  const results = calculateADHDResults({ answers: answersObj, questions: [] });
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'mild': return 'text-yellow-600';
      case 'moderate': return 'text-orange-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityLabel = (severity: string) => {
    return labels.severityLevels[severity as keyof typeof labels.severityLevels] || 'Unknown';
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={labels.totalScore} value={results.totalScore} />
        <MetricCard title={labels.inattention} value={results.factorScores.inattention} />
        <MetricCard title={labels.hyperactivity} value={results.factorScores.hyperactivity} />
        <MetricCard title={labels.partAScore} value={results.factorScores.partA} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{labels.screeningResult}</h3>
          <div className={`text-lg font-semibold ${results.screeningPositive ? 'text-orange-600' : 'text-green-600'}`}>
            {results.screeningPositive ? labels.positiveScreen : labels.negativeScreen}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {labels.partAPositiveResponses}: {results.partAPositive}/6
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{labels.severityLevel}</h3>
          <div className={`text-lg font-semibold ${getSeverityColor(results.severity)}`}>
            {getSeverityLabel(results.severity)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {labels.basedOnTotalScore}: {results.totalScore}/72
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">{labels.recommendations}</h3>
        <p className="text-sm text-blue-700">
          {results.screeningPositive ? labels.recommendationTexts.positive : labels.recommendationTexts.negative}
        </p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{labels.importantNotes}</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• {labels.notes.screening}</li>
          <li>• {labels.notes.symptoms}</li>
          <li>• {labels.notes.evaluation}</li>
        </ul>
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