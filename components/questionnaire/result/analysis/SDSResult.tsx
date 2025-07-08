'use client';

import React from 'react';
import { calculateSDSResults } from '../../test/private/SDSCalculator';
import { useScopedI18n } from '@/locales/client';

interface SDSResultProps {
  answers: string[];
}

export function SDSResult({ answers }: SDSResultProps) {
  const t = useScopedI18n('components.sdsResult');
  
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateSDSResults({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    normal: t('severity.normal'),
    mild: t('severity.mild'),
    moderate: t('severity.moderate'), 
    severe: t('severity.severe')
  };

  const severityDescriptions = {
    normal: t('severityDescriptions.normal'),
    mild: t('severityDescriptions.mild'),
    moderate: t('severityDescriptions.moderate'),
    severe: t('severityDescriptions.severe')
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "text-green-600 bg-green-50 border-green-200";
      case "mild": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "severe": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  // 获取原始分数（未乘以1.25）
  const rawScore = Math.round(results.totalScore / 1.25);

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title={t('labels.raw_total_score')} value={`${rawScore}/80`} />
          <MetricCard title={t('labels.standard_score')} value={results.totalScore} />
          <MetricCard 
            title={t('labels.depression_level')} 
            value={severityNames[results.severity as keyof typeof severityNames] || t('labels.unknown')}
            className={getSeverityColor(results.severity).split(' ')[0]}
          />
        </div>
      </div>

      {/* 严重程度说明 */}
      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">{t('labels.result_interpretation')}</h3>
        <p className="text-sm mb-4">
          {severityDescriptions[results.severity as keyof typeof severityDescriptions]}
        </p>
        
        <div className="space-y-2 text-sm">
          <div><strong>{t('labels.scoring_criteria')}：</strong></div>
          <ul className="ml-4 space-y-1">
            <li>• {t('scoring.range_0_52')}</li>
            <li>• {t('scoring.range_53_62')}</li>
            <li>• {t('scoring.range_63_72')}</li>
            <li>• {t('scoring.range_73_plus')}</li>
          </ul>
        </div>
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.detailed_analysis')}</h3>
        <div className="space-y-4">
          
          {/* 高分项目提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">{t('labels.scale_description')}</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• {t('scaleInfo.description_1')}</p>
              <p>• {t('scaleInfo.description_2')}</p>
              <p>• {t('scaleInfo.description_3')}</p>
            </div>
          </div>

          {/* 计分方式说明 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">{t('labels.scoring_method')}</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>正向计分项目：</strong>{t('scaleInfo.positive_items')}</p>
              <p><strong>反向计分项目：</strong>{t('scaleInfo.reverse_items')}</p>
              <p><strong>选项计分：</strong>{t('scaleInfo.option_scoring')}</p>
              <p><strong>反向计分：</strong>{t('scaleInfo.reverse_scoring')}</p>
            </div>
          </div>

          {(results.severity === "severe" || results.severity === "moderate") && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    {t('labels.important_reminder')}：{t('warnings.depression_reminder')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 专业建议 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.professional_advice')}</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <strong>{t('advice.high_score_title')}</strong>
            <ul className="mt-2 ml-4 space-y-1">
              <li>• {t('advice.seek_professional')}</li>
              <li>• {t('advice.share_feelings')}</li>
              <li>• {t('advice.maintain_routine')}</li>
              <li>• {t('advice.avoid_substances')}</li>
              <li>• {t('advice.suicide_help')}</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-yellow-800">
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