'use client';

import React from 'react';
import { calculateNPDResults } from '../../test/private/NPDCalculator';

export function NPDResult({
  answers,
}: {
  answers: string[];
}) {
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
    switch (interpretation) {
      case 'low': return 'Below Average';
      case 'average': return 'Average';
      case 'above_average': return 'Above Average';
      case 'high': return 'High';
      default: return 'Unknown';
    }
  };

  const getDominantTraitLabel = (trait: string) => {
    switch (trait) {
      case 'leadership': return 'Leadership/Authority';
      case 'exhibitionism': return 'Grandiose Exhibitionism';
      case 'entitlement': return 'Entitlement';
      default: return 'Unknown';
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Score" value={`${results.totalScore}/16`} />
        <MetricCard title="Percentile" value={`${results.percentile}th`} />
        <MetricCard title="Leadership" value={results.factorScores.leadership} />
        <MetricCard title="Exhibitionism" value={results.factorScores.exhibitionism} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Narcissistic Traits Level</h3>
          <div className={`text-lg font-semibold ${getInterpretationColor(results.interpretation)}`}>
            {getInterpretationLabel(results.interpretation)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Score: {results.totalScore}/16 (≈{results.percentile}th percentile)
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Dominant Trait</h3>
          <div className="text-lg font-semibold text-purple-600">
            {getDominantTraitLabel(results.dominantTrait)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Entitlement: {results.factorScores.entitlement}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Interpretation</h3>
        <p className="text-sm text-blue-700">{results.recommendations}</p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Understanding Narcissistic Traits</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Factor Breakdown:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• <strong>Leadership/Authority ({results.factorScores.leadership}):</strong> Desire to lead and have authority over others</li>
            <li>• <strong>Grandiose Exhibitionism ({results.factorScores.exhibitionism}):</strong> Need for attention and admiration from others</li>
            <li>• <strong>Entitlement ({results.factorScores.entitlement}):</strong> Belief that one deserves special treatment and privileges</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">Important Notes</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• This inventory measures narcissistic traits on a continuum, not a clinical disorder</li>
          <li>• Narcissistic traits exist in everyone to some degree and can be adaptive in certain contexts</li>
          <li>• High scores do not necessarily indicate a personality disorder</li>
          <li>• This tool is for educational and research purposes only, not for clinical diagnosis</li>
          <li>• Average scores in general population typically range from 2-8 points</li>
        </ul>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">Healthy Narcissism vs. Problematic Narcissism</h3>
        <div className="text-sm text-green-700 space-y-2">
          <p><strong>Healthy aspects:</strong> Confidence, leadership, self-advocacy, ambition</p>
          <p><strong>Potential concerns:</strong> Difficulty with empathy, relationship problems, exploitation of others</p>
          <p>Balance is key - healthy self-esteem with consideration for others tends to be most adaptive.</p>
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