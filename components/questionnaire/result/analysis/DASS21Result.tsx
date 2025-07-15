'use client';

import React from 'react';
import { calculateDASS21Results } from '../../test/private/DASS21Calculator';
import { useScopedI18n } from '@/locales/client';

interface DASS21ResultProps {
  answers: string[];
}

export function DASS21Result({ answers }: DASS21ResultProps) {
  const t = useScopedI18n('components.dass21Result');

  // Convert answer format to the format required by calculator
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateDASS21Results({
    answers: answersMap,
    questions: []
  });

  const severityNames = {
    normal: t('severity.normal'),
    mild: t('severity.mild'),
    moderate: t('severity.moderate'),
    severe: t('severity.severe'),
    extremely_severe: t('severity.extremely_severe')
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "text-green-600 bg-green-50 border-green-200";
      case "mild": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "severe": return "text-red-600 bg-red-50 border-red-200";
      case "extremely_severe": return "text-red-700 bg-red-100 border-red-300";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const dimensionInfo = {
    depression: {
      name: t('dimensions.depression'),
      score: results.depressionScore,
      severity: results.depressionSeverity,
      description: t('descriptions.depression'),
      maxScore: 42
    },
    anxiety: {
      name: t('dimensions.anxiety'),
      score: results.anxietyScore,
      severity: results.anxietySeverity,
      description: t('descriptions.anxiety'),
      maxScore: 42
    },
    stress: {
      name: t('dimensions.stress'),
      score: results.stressScore,
      severity: results.stressSeverity,
      description: t('descriptions.stress'),
      maxScore: 42
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Overall score */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title={t('labels.total_score')} value={`${results.totalScore}/63`} />
          <MetricCard title={t('labels.depression_score')} value={`${results.depressionScore}/42`} />
          <MetricCard title={t('labels.anxiety_score')} value={`${results.anxietyScore}/42`} />
          <MetricCard title={t('labels.stress_score')} value={`${results.stressScore}/42`} />
        </div>
      </div>

      {/* Three-dimension analysis */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.three_dimension_analysis')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(dimensionInfo).map(([key, info]) => (
            <div key={key} className={`border rounded-lg p-4 ${getSeverityColor(info.severity)}`}>
              <div className="text-center mb-3">
                <h4 className="font-semibold text-lg">{info.name}</h4>
                <div className="text-2xl font-bold mt-2">{info.score}</div>
                <div className="text-sm opacity-75">/{info.maxScore}</div>
              </div>

              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${info.severity === "normal" ? "bg-green-400" :
                      info.severity === "mild" ? "bg-yellow-400" :
                        info.severity === "moderate" ? "bg-orange-400" :
                          info.severity === "severe" ? "bg-red-400" : "bg-red-600"
                      }`}
                    style={{ width: `${(info.score / info.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${info.severity === "normal" ? "bg-green-100 text-green-800" :
                  info.severity === "mild" ? "bg-yellow-100 text-yellow-800" :
                    info.severity === "moderate" ? "bg-orange-100 text-orange-800" :
                      info.severity === "severe" ? "bg-red-100 text-red-800" : "bg-red-200 text-red-900"
                  }`}>
                  {severityNames[info.severity as keyof typeof severityNames]}
                </span>
              </div>

              <div className="text-sm text-center mt-2 opacity-75">
                {info.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Severity level standards */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.scoring_criteria')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="space-y-2">
            <h4 className="font-medium text-green-700">{t('labels.depression_dimension')}</h4>
            <div className="text-sm space-y-1">
              <div>{t('scoring.depression.normal')}</div>
              <div>{t('scoring.depression.mild')}</div>
              <div>{t('scoring.depression.moderate')}</div>
              <div>{t('scoring.depression.severe')}</div>
              <div>{t('scoring.depression.extremely_severe')}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-blue-700">{t('labels.anxiety_dimension')}</h4>
            <div className="text-sm space-y-1">
              <div>{t('scoring.anxiety.normal')}</div>
              <div>{t('scoring.anxiety.mild')}</div>
              <div>{t('scoring.anxiety.moderate')}</div>
              <div>{t('scoring.anxiety.severe')}</div>
              <div>{t('scoring.anxiety.extremely_severe')}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-purple-700">{t('labels.stress_dimension')}</h4>
            <div className="text-sm space-y-1">
              <div>{t('scoring.stress.normal')}</div>
              <div>{t('scoring.stress.mild')}</div>
              <div>{t('scoring.stress.moderate')}</div>
              <div>{t('scoring.stress.severe')}</div>
              <div>{t('scoring.stress.extremely_severe')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Result interpretation and recommendations */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.result_interpretation_advice')}</h3>
        <div className="space-y-4">

          {/* Overall assessment */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">{t('labels.overall_assessment')}</h4>
            <div className="text-sm text-blue-800">
              {results.isSevere ? (
                <p>{t('assessment.severe_message')}</p>
              ) : (
                <p>{t('assessment.normal_message')}</p>
              )}
            </div>
          </div>

          {/* Dimension-specific recommendations */}
          {results.depressionSeverity !== "normal" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">{t('advice.depression_dimension')}</h4>
              <div className="text-sm text-green-800 space-y-1">
                <p>{t('advice.depression_item_1')}</p>
                <p>{t('advice.depression_item_2')}</p>
                <p>{t('advice.depression_item_3')}</p>
                <p>{t('advice.depression_item_4')}</p>
                {(results.depressionSeverity === "severe" || results.depressionSeverity === "extremely_severe") && (
                  <p className="font-medium">{t('advice.depression_severe')}</p>
                )}
              </div>
            </div>
          )}

          {results.anxietySeverity !== "normal" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">{t('advice.anxiety_dimension')}</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>{t('advice.anxiety_item_1')}</p>
                <p>{t('advice.anxiety_item_2')}</p>
                <p>{t('advice.anxiety_item_3')}</p>
                <p>{t('advice.anxiety_item_4')}</p>
                {(results.anxietySeverity === "severe" || results.anxietySeverity === "extremely_severe") && (
                  <p className="font-medium">{t('advice.anxiety_severe')}</p>
                )}
              </div>
            </div>
          )}

          {results.stressSeverity !== "normal" && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">{t('advice.stress_dimension')}</h4>
              <div className="text-sm text-purple-800 space-y-1">
                <p>{t('advice.stress_item_1')}</p>
                <p>{t('advice.stress_item_2')}</p>
                <p>{t('advice.stress_item_3')}</p>
                <p>{t('advice.stress_item_4')}</p>
                {(results.stressSeverity === "severe" || results.stressSeverity === "extremely_severe") && (
                  <p className="font-medium">{t('advice.stress_severe')}</p>
                )}
              </div>
            </div>
          )}

          {/* Severe situation warning */}
          {results.isSevere && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    {t('labels.important_reminder')}：{t('warning.severe_distress')}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-gray-800 text-sm">
              <strong>{t('labels.note')}：</strong>{t('disclaimer')}
            </p>
          </div>
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
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
      <span className="text-sm text-gray-500 mb-1">{title}</span>
      <span className={`text-2xl font-semibold ${className || 'text-indigo-600'}`}>
        {value}
      </span>
    </div>
  );
}