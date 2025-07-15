'use client';

import React from 'react';
import { calculatePSS10Results } from '../../test/private/PSS10Calculator';
import { useScopedI18n } from '@/locales/client';

interface PSS10ResultProps {
  answers: string[];
}

export function PSS10Result({ answers }: PSS10ResultProps) {
  const t = useScopedI18n('components.pss10Result');
  
  // Convert answer format to the format required by calculator
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculatePSS10Results({ 
    answers: answersMap, 
    questions: [] 
  });


  const severityDescriptions = {
    low: t('severityDescriptions.low'),
    moderate: t('severityDescriptions.moderate'),
    high: t('severityDescriptions.high')
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const questionTexts = [
    t('questions.0'), t('questions.1'), t('questions.2'), t('questions.3'), t('questions.4'),
    t('questions.5'), t('questions.6'), t('questions.7'), t('questions.8'), t('questions.9')
  ];

  const getScoreInterpretation = (score: number) => {
    if (score <= 13) return { level: t('scoreInterpretation.low_level'), color: "text-green-600", desc: t('scoreInterpretation.low_desc') };
    if (score <= 26) return { level: t('scoreInterpretation.moderate_level'), color: "text-yellow-600", desc: t('scoreInterpretation.moderate_desc') };
    return { level: t('scoreInterpretation.high_level'), color: "text-red-600", desc: t('scoreInterpretation.high_desc') };
  };

  const scoreInterp = getScoreInterpretation(results.totalScore);

  return (
    <div className="mt-6 space-y-6">
      {/* Overall score */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title={t('labels.total_score')} value={`${results.totalScore}/40`} />
          <MetricCard title={t('labels.stress_perception')} value={`${results.stressPerceptionScore}/24`} />
          <MetricCard title={t('labels.coping_ability')} value={`${results.copingAbilityScore}/16`} />
          <MetricCard 
            title={t('labels.stress_level')} 
            value={scoreInterp.level}
            className={scoreInterp.color}
          />
        </div>
      </div>

      {/* Severity level description */}
      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">{t('labels.result_interpretation')}</h3>
        <p className="text-sm mb-4">
          {severityDescriptions[results.severity as keyof typeof severityDescriptions]}
        </p>
        
        <div className="space-y-3 text-sm">
          <div>
            <strong>{t('labels.score_interpretation')}：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• {t('scoring.total_range')}</li>
              <li>• {t('scoring.stress_perception_desc')}</li>
              <li>• {t('scoring.coping_ability_desc')}</li>
            </ul>
          </div>
          
          <div>
            <strong>{t('labels.reference_standards')}：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• {t('scoring.range_0_13')}</li>
              <li>• {t('scoring.range_14_26')}</li>
              <li>• {t('scoring.range_27_40')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subscale analysis */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.subscale_analysis')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Stress perception */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
              {t('subscales.stress_perception_title')} ({results.stressPerceptionScore}/24分)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-400 h-2 rounded-full" 
                  style={{ width: `${(results.stressPerceptionScore / 24) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-700">
                {t('subscales.stress_perception_desc')}
              </p>
            </div>
          </div>

          {/* Coping ability */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              {t('subscales.coping_ability_title')} ({results.copingAbilityScore}/16分)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${(results.copingAbilityScore / 16) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-700">
                {t('subscales.coping_ability_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Item analysis */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.item_analysis')}</h3>
        <div className="space-y-3">
          {results.itemAnalysis.map((item: any, index: number) => (
            <div key={item.questionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {index + 1}. {questionTexts[index]}
                  </span>
                  {item.isReverse && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {t('labels.reverse_scoring')}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {t('labels.original_score')}: {item.originalScore} {item.isReverse ? `→ ${t('labels.actual_score')}: ${item.actualScore}` : ''}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-semibold ${
                  item.actualScore >= 3 ? 'text-red-600' : 
                  item.actualScore >= 2 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {item.actualScore}
                </span>
                {item.isHigh && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    {t('labels.high_stress')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.highScoreItemCount > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">{t('labels.high_score_reminder')}</h4>
            <div className="text-sm text-yellow-800">
              {t('highScoreAnalysis.message', { count: results.highScoreItemCount })}
            </div>
          </div>
        )}
      </div>

      {/* Stress management recommendations */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.stress_management_advice')}</h3>
        <div className="space-y-4 text-sm text-gray-700">
          
          {results.severity === "low" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800">
                <strong>{t('advice.maintain_good_state')}：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>{t('advice.maintain_good_state_item_1')}</li>
                  <li>{t('advice.maintain_good_state_item_2')}</li>
                  <li>{t('advice.maintain_good_state_item_3')}</li>
                  <li>{t('advice.maintain_good_state_item_4')}</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <strong>{t('advice.stress_management_strategies')}：</strong>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Short-term strategies */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">{t('advice.short_term_strategies')}</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>{t('advice.short_term_item_1')}</li>
                    <li>{t('advice.short_term_item_2')}</li>
                    <li>{t('advice.short_term_item_3')}</li>
                    <li>{t('advice.short_term_item_4')}</li>
                    <li>{t('advice.short_term_item_5')}</li>
                  </ul>
                </div>

                {/* Long-term strategies */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">{t('advice.long_term_strategies')}</h4>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>{t('advice.long_term_item_1')}</li>
                    <li>{t('advice.long_term_item_2')}</li>
                    <li>{t('advice.long_term_item_3')}</li>
                    <li>{t('advice.long_term_item_4')}</li>
                    <li>{t('advice.long_term_item_5')}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {results.severity === "high" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    {t('advice.high_stress_warning')}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-gray-800">
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