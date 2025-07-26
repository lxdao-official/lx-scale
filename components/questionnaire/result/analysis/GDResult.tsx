'use client';

import React from 'react';
import { calculateGDResults } from '../../test/private/GDCalculator';

export function GDResult({
  answers,
}: {
  answers: string[];
}) {
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
    switch (interpretation) {
      case 'low': return 'Low';
      case 'mild': return 'Mild';
      case 'moderate': return 'Moderate';
      case 'high': return 'High';
      default: return 'Unknown';
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard title="Total Score" value={results.totalScore} />
        <MetricCard title="Score Percentage" value={`${results.scorePercentage}%`} />
        <MetricCard title="Elevated Items" value={results.positiveItemCount} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Gender Identity" value={results.factorScores.genderIdentity} />
        <MetricCard title="Social Role" value={results.factorScores.socialRole} />
        <MetricCard title="Physical Dysphoria" value={results.factorScores.physicalDysphoria} />
        <MetricCard title="Gender Expression" value={results.factorScores.genderExpression} />
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Overall Assessment</h3>
        <div className={`text-lg font-semibold ${getInterpretationColor(results.interpretation)}`}>
          {getInterpretationLabel(results.interpretation)} Level
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Score: {results.totalScore}/189 ({results.scorePercentage}%)
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Recommendations</h3>
        <p className="text-sm text-blue-700">{results.recommendations}</p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Important Notes</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• This questionnaire is for educational and self-reflection purposes only</li>
          <li>• It is not a substitute for professional evaluation or diagnosis</li>
          <li>• Gender identity is a complex and personal experience that varies greatly among individuals</li>
          <li>• If you are experiencing distress, consider speaking with a qualified mental health professional</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-purple-800 mb-2">Understanding Your Results</h3>
        <div className="text-sm text-purple-700 space-y-2">
          <p><strong>Factor Scores:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• Gender Identity: Feelings about your internal sense of gender</li>
            <li>• Social Role: Comfort with social expectations based on assigned gender</li>
            <li>• Physical Dysphoria: Feelings about physical characteristics and body</li>
            <li>• Gender Expression: Comfort with expressing gender in various ways</li>
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