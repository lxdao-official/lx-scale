'use client';

import React from 'react';
import { useScopedI18n } from '@/locales/client';
import { calculateNPDResults } from '../../test/private/NPDCalculator';

function useLabels() {
  const t = useScopedI18n('components.npdResult');
  return {
    totalScore: t('totalScore'),
    percentile: t('percentile'),
    leadership: t('leadership'),
    exhibitionism: t('exhibitionism'),
    narcissisticTraitsLevel: t('narcissisticTraitsLevel'),
    dominantTrait: t('dominantTrait'),
    entitlement: t('entitlement'),
    interpretation: t('interpretation'),
    understandingTraits: t('understandingTraits'),
    factorBreakdown: t('factorBreakdown'),
    importantNotes: t('importantNotes'),
    healthyVsProblematic: t('healthyVsProblematic'),
    interpretationLevels: {
      low: t('interpretationLevels.low'),
      average: t('interpretationLevels.average'),
      above_average: t('interpretationLevels.above_average'),
      high: t('interpretationLevels.high'),
    },
    traitLabels: {
      leadership: t('traitLabels.leadership'),
      exhibitionism: t('traitLabels.exhibitionism'),
      entitlement: t('traitLabels.entitlement'),
    },
    factorDescriptions: {
      leadership: t('factorDescriptions.leadership'),
      exhibitionism: t('factorDescriptions.exhibitionism'),
      entitlement: t('factorDescriptions.entitlement'),
    },
    notes: {
      continuum: t('notes.continuum'),
      adaptive: t('notes.adaptive'),
      disorder: t('notes.disorder'),
      purpose: t('notes.purpose'),
      population: t('notes.population'),
    },
    healthyAspects: t('healthyAspects'),
    potentialConcerns: t('potentialConcerns'),
    balanceKey: t('balanceKey'),
  };
}

export function NPDResult({
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

  const results = calculateNPDResults({ answers: answersObj, questions: [] });
  
  const getInterpretationColor = (interpretation: string) => {
    switch (interpretation) {
      case 'low': return 'text-green-600';
      case 'average': return 'text-blue-600';
      case 'above_average': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getInterpretationLabel = (interpretation: string) => {
    return labels.interpretationLevels[interpretation as keyof typeof labels.interpretationLevels] || 'Unknown';
  };

  const getDominantTraitLabel = (trait: string) => {
    return labels.traitLabels[trait as keyof typeof labels.traitLabels] || 'Unknown';
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={labels.totalScore} value={`${results.totalScore}/16`} />
        <MetricCard title={labels.percentile} value={`${results.percentile}th`} />
        <MetricCard title={labels.leadership} value={results.factorScores.leadership} />
        <MetricCard title={labels.exhibitionism} value={results.factorScores.exhibitionism} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{labels.narcissisticTraitsLevel}</h3>
          <div className={`text-lg font-semibold ${getInterpretationColor(results.interpretation)}`}>
            {getInterpretationLabel(results.interpretation)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Score: {results.totalScore}/16 (≈{results.percentile}th percentile)
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{labels.dominantTrait}</h3>
          <div className="text-lg font-semibold text-purple-600">
            {getDominantTraitLabel(results.dominantTrait)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {labels.entitlement}: {results.factorScores.entitlement}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">{labels.interpretation}</h3>
        <p className="text-sm text-blue-700">{results.recommendations}</p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{labels.understandingTraits}</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>{labels.factorBreakdown}:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• <strong>{labels.traitLabels.leadership} ({results.factorScores.leadership}):</strong> {labels.factorDescriptions.leadership}</li>
            <li>• <strong>{labels.traitLabels.exhibitionism} ({results.factorScores.exhibitionism}):</strong> {labels.factorDescriptions.exhibitionism}</li>
            <li>• <strong>{labels.traitLabels.entitlement} ({results.factorScores.entitlement}):</strong> {labels.factorDescriptions.entitlement}</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">{labels.importantNotes}</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• {labels.notes.continuum}</li>
          <li>• {labels.notes.adaptive}</li>
          <li>• {labels.notes.disorder}</li>
          <li>• {labels.notes.purpose}</li>
          <li>• {labels.notes.population}</li>
        </ul>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">{labels.healthyVsProblematic}</h3>
        <div className="text-sm text-green-700 space-y-2">
          <p><strong>{labels.healthyAspects}</strong></p>
          <p><strong>{labels.potentialConcerns}</strong></p>
          <p>{labels.balanceKey}</p>
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