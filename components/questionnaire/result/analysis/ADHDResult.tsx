'use client';

import React from 'react';
import { calculateADHDResults } from '../../test/private/ADHDCalculator';

export function ADHDResult({
  answers,
}: {
  answers: string[];
}) {
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
    switch (severity) {
      case 'low': return 'Low Risk';
      case 'mild': return 'Mild Symptoms';
      case 'moderate': return 'Moderate Symptoms';
      case 'high': return 'High Symptoms';
      default: return 'Unknown';
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Score" value={results.totalScore} />
        <MetricCard title="Inattention" value={results.factorScores.inattention} />
        <MetricCard title="Hyperactivity" value={results.factorScores.hyperactivity} />
        <MetricCard title="Part A Score" value={results.factorScores.partA} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Screening Result</h3>
          <div className={`text-lg font-semibold ${results.screeningPositive ? 'text-orange-600' : 'text-green-600'}`}>
            {results.screeningPositive ? 'Positive Screen' : 'Negative Screen'}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Part A Positive Responses: {results.partAPositive}/6
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Severity Level</h3>
          <div className={`text-lg font-semibold ${getSeverityColor(results.severity)}`}>
            {getSeverityLabel(results.severity)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Based on total score: {results.totalScore}/72
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Recommendations</h3>
        <p className="text-sm text-blue-700">{results.recommendations}</p>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Important Notes</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• This scale is a screening tool and does not provide a diagnosis of ADHD</li>
          <li>• ADHD symptoms must be present before age 7 and cause impairment in multiple settings</li>
          <li>• A comprehensive evaluation by a qualified healthcare professional is needed for diagnosis</li>
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