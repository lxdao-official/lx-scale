'use client';

import React from 'react';
import { calculatePHQ9Results } from '../../test/private/PHQ9Calculator';
import { useScopedI18n } from '@/locales/client';

interface PHQ9ResultProps {
  answers: string[];
}

export function PHQ9Result({ answers }: PHQ9ResultProps) {
  const t = useScopedI18n('components.phq9Result');
  
  // Convert answer format to the format required by calculator
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculatePHQ9Results({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    minimal: t('severity.minimal'),
    mild: t('severity.mild'),
    moderate: t('severity.moderate'),
    moderately_severe: t('severity.moderately_severe'),
    severe: t('severity.severe')
  };

  const severityDescriptions = {
    minimal: t('severityDescriptions.minimal'),
    mild: t('severityDescriptions.mild'),
    moderate: t('severityDescriptions.moderate'),
    moderately_severe: t('severityDescriptions.moderately_severe'),
    severe: t('severityDescriptions.severe')
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal": return "text-green-600 bg-green-50 border-green-200";
      case "mild": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "moderately_severe": return "text-red-600 bg-red-50 border-red-200";
      case "severe": return "text-red-700 bg-red-100 border-red-300";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const questionTexts = [
    t('questions.0'), t('questions.1'), t('questions.2'), t('questions.3'), t('questions.4'),
    t('questions.5'), t('questions.6'), t('questions.7'), t('questions.8')
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Overall score */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title={t('labels.total_score')} value={`${results.totalScore}/27`} />
          <MetricCard title={t('labels.high_score_items')} value={`${results.highScoreItemCount}/9`} />
          <MetricCard 
            title={t('labels.depression_level')} 
            value={severityNames[results.severity as keyof typeof severityNames] || t('labels.unknown')}
            className={getSeverityColor(results.severity).split(' ')[0]}
          />
        </div>
      </div>

      {/* Important warning */}
      {results.suicidalIdeation && (
        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-red-800">{t('labels.emergency_reminder')}</h3>
              <div className="text-sm font-medium text-red-700 mt-1">
                {t('crisis.suicide_warning')}
                <ul className="mt-2 ml-4 space-y-1">
                  <li>{t('crisis.hotline')}</li>
                  <li>{t('crisis.hospital')}</li>
                  <li>{t('crisis.doctor')}</li>
                  <li>{t('crisis.support')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Severity level description */}
      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">{t('labels.result_interpretation')}</h3>
        <p className="text-sm mb-4">
          {severityDescriptions[results.severity as keyof typeof severityDescriptions] || "评估结果异常，请重新测试。"}
        </p>
        
        <div className="space-y-2 text-sm">
          <div><strong>{t('labels.scoring_criteria')}：</strong></div>
          <ul className="ml-4 space-y-1">
            <li>{t('scoring.range_0_4')}</li>
            <li>{t('scoring.range_5_9')}</li>
            <li>{t('scoring.range_10_14')}</li>
            <li>{t('scoring.range_15_19')}</li>
            <li>{t('scoring.range_20_27')}</li>
          </ul>
        </div>

        {results.majorDepressionCriteria && (
          <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded p-3">
            <div className="text-yellow-900 font-medium">
              {t('clinical.major_depression_warning')}
            </div>
          </div>
        )}
      </div>

      {/* Item analysis */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.item_analysis')}</h3>
        <div className="space-y-3">
          {results.itemAnalysis.map((item: any, index: number) => (
            <div key={item.questionId} className={`flex items-center justify-between p-3 rounded-lg ${
              item.questionId === 9 && item.score >= 1 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
            }`}>
              <div className="flex-1">
                <span className="text-sm font-medium">
                  {index + 1}. {questionTexts[index]}
                </span>
                {item.questionId === 9 && item.score >= 1 && (
                  <div className="text-xs text-red-600 mt-1">{t('labels.needs_immediate_attention')}</div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-semibold ${
                  item.questionId === 9 && item.score >= 1 ? 'text-red-700' :
                  item.score >= 2 ? 'text-red-600' : 
                  item.score >= 1 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {item.score}
                </span>
                {item.isHigh && item.questionId !== 9 && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    {t('labels.needs_attention')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.highScoreItemCount > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">{t('labels.high_score_item_analysis')}</h4>
            <div className="text-sm text-blue-800">
              {t('highScoreAnalysis.message', { count: results.highScoreItemCount })}
            </div>
          </div>
        )}
      </div>

      {/* Professional advice */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.professional_advice')}</h3>
        <div className="space-y-3 text-sm text-gray-700">
          
          {results.severity === "minimal" ? (
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
              <strong>{t('advice.self_management_advice')}：</strong>
              <ul className="mt-2 ml-4 space-y-1">
                <li>{t('advice.self_management_item_1')}</li>
                <li>{t('advice.self_management_item_2')}</li>
                <li>{t('advice.self_management_item_3')}</li>
                <li>{t('advice.self_management_item_4')}</li>
                <li>{t('advice.self_management_item_5')}</li>
                <li>{t('advice.self_management_item_6')}</li>
              </ul>
            </div>
          )}

          {(results.severity === "moderate" || results.severity === "moderately_severe" || results.severity === "severe") && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-orange-900">
                <strong>{t('advice.professional_treatment')}：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>{t('advice.professional_treatment_item_1')}</li>
                  <li>{t('advice.professional_treatment_item_2')}</li>
                  <li>{t('advice.professional_treatment_item_3')}</li>
                  <li>{t('advice.professional_treatment_item_4')}</li>
                </ul>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-800">
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