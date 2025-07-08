'use client';

import React from 'react';
import { calculateGAD7Results } from '../../test/private/GAD7Calculator';
import { useScopedI18n } from '@/locales/client';

interface GAD7ResultProps {
  answers: string[];
}

export function GAD7Result({ answers }: GAD7ResultProps) {
  const t = useScopedI18n('components.gad7Result');
  
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateGAD7Results({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    minimal: t('severity.minimal'),
    mild: t('severity.mild'),
    moderate: t('severity.moderate'),
    severe: t('severity.severe')
  };

  const severityDescriptions = {
    minimal: t('severityDescriptions.minimal'),
    mild: t('severityDescriptions.mild'),
    moderate: t('severityDescriptions.moderate'),
    severe: t('severityDescriptions.severe')
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal": return "text-green-600 bg-green-50 border-green-200";
      case "mild": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "severe": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const questionTexts = [
    t('questions.0'), t('questions.1'), t('questions.2'), t('questions.3'),
    t('questions.4'), t('questions.5'), t('questions.6')
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title={t('labels.total_score')} value={`${results.totalScore}/21`} />
          <MetricCard title={t('labels.high_score_items')} value={`${results.highScoreItemCount}/7`} />
          <MetricCard 
            title={t('labels.anxiety_level')} 
            value={severityNames[results.severity as keyof typeof severityNames] || t('labels.unknown')}
            className={getSeverityColor(results.severity).split(' ')[0]}
          />
        </div>
      </div>

      {/* 严重程度说明 */}
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
            <li>{t('scoring.range_15_21')}</li>
          </ul>
        </div>
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.item_analysis')}</h3>
        <div className="space-y-3">
          {results.itemAnalysis.map((item: any, index: number) => (
            <div key={item.questionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <span className="text-sm font-medium">
                  {index + 1}. {questionTexts[index]}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-semibold ${
                  item.score >= 2 ? 'text-red-600' : 
                  item.score >= 1 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {item.score}
                </span>
                {item.isHigh && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    {t('labels.needs_attention')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.highScoreItemCount > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">{t('labels.high_score_item_alert')}</h4>
            <div className="text-sm text-yellow-800">
              {t('highScoreAlert.message', { count: results.highScoreItemCount })}
            </div>
          </div>
        )}
      </div>

      {/* 专业建议 */}
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
              </ul>
            </div>
          )}

          {(results.severity === "moderate" || results.severity === "severe") && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    {t('advice.professional_help_message', { severity: severityNames[results.severity as keyof typeof severityNames] })}
                  </div>
                </div>
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