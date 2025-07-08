'use client';

import React from 'react';
import { useScopedI18n } from '@/locales/client';
import { calculateSCL90Results } from '../../test/private/SCL90Calculator';

interface SCL90ResultProps {
  answers: string[];
}

export function SCL90Result({ answers }: SCL90ResultProps) {
  const t = useScopedI18n('components.scl90Result');
  const tCommon = useScopedI18n('common');
  
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateSCL90Results({ 
    answers: answersMap, 
    questions: [] 
  });

  const factorNames = {
    somatization: t('factors.somatization'),
    obsessive: t('factors.obsessive'),
    interpersonal: t('factors.interpersonal'),
    depression: t('factors.depression'),
    anxiety: t('factors.anxiety'),
    hostility: t('factors.hostility'),
    phobic: t('factors.phobic'),
    paranoid: t('factors.paranoid'),
    psychotic: t('factors.psychotic'),
    other: t('factors.other')
  };

  const severityNames = {
    normal: tCommon('severity.normal'),
    mild: tCommon('severity.mild'),
    moderate: tCommon('severity.moderate'),
    severe: tCommon('severity.severe')
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "text-green-600";
      case "mild": return "text-yellow-600";
      case "moderate": return "text-orange-600";
      case "severe": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getFactorSeverity = (score: number) => {
    if (score >= 3) return "severe";
    if (score >= 2) return "moderate";
    if (score >= 1.5) return "mild";
    return "normal";
  };

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.overall_assessment')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title={tCommon('labels.total_score')} value={results.totalScore} />
          <MetricCard title={t('labels.positive_item_count')} value={results.positiveItemCount} />
          <MetricCard title={t('labels.positive_symptom_average')} value={results.positiveItemAverage.toFixed(2)} />
          <MetricCard 
            title={tCommon('labels.severity_level')} 
            value={severityNames[results.severity as keyof typeof severityNames] || t('warnings.unknown_level')}
            className={getSeverityColor(results.severity)}
          />
        </div>
      </div>

      {/* 因子分数 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{t('labels.factor_analysis')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(results.factorScores).map(([factor, score]) => {
            const factorSeverity = getFactorSeverity(Number(score));
            return (
              <div key={factor} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{factorNames[factor as keyof typeof factorNames]}</span>
                  <span className={`text-sm px-2 py-1 rounded ${getSeverityColor(factorSeverity)}`}>
                    {severityNames[factorSeverity as keyof typeof severityNames]}
                  </span>
                </div>
                <div className="text-2xl font-bold text-indigo-600">{Number(score).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 结果解释 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{tCommon('labels.result_interpretation')}</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <strong>{t('clinical.rating_criteria')}：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• {t('clinical.rating_scale')}</li>
            </ul>
          </div>
          <div>
            <strong>{t('clinical.judgment_criteria')}：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• {t('clinical.total_score_criteria')}</li>
              <li>• {t('clinical.factor_score_2')}</li>
              <li>• {t('clinical.factor_score_3')}</li>
            </ul>
          </div>
          {results.isSevere && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    {t('warnings.severe_condition')}
                  </div>
                </div>
              </div>
            </div>
          )}
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