'use client';

import React from 'react';
import { calculateSCL90Results } from '../../test/private/SCL90Calculator';

interface SCL90ResultProps {
  answers: string[];
}

export function SCL90Result({ answers }: SCL90ResultProps) {
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
    somatization: "躯体化",
    obsessive: "强迫症状",
    interpersonal: "人际关系敏感",
    depression: "抑郁",
    anxiety: "焦虑",
    hostility: "敌对",
    phobic: "恐怖",
    paranoid: "偏执",
    psychotic: "精神病性",
    other: "其他"
  };

  const severityNames = {
    normal: "正常",
    mild: "轻度",
    moderate: "中度",
    severe: "重度"
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
        <h3 className="text-lg font-semibold mb-4">总体评估</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="总分" value={results.totalScore} />
          <MetricCard title="阳性项目数" value={results.positiveItemCount} />
          <MetricCard title="阳性症状均分" value={results.positiveItemAverage.toFixed(2)} />
          <MetricCard 
            title="严重程度" 
            value={severityNames[results.severity as keyof typeof severityNames] || "未知"}
            className={getSeverityColor(results.severity)}
          />
        </div>
      </div>

      {/* 因子分数 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">因子分析</h3>
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
        <h3 className="text-lg font-semibold mb-4">结果解释</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <strong>评分标准：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• 1 = 没有 | 2 = 很轻 | 3 = 中等 | 4 = 偏重 | 5 = 严重</li>
            </ul>
          </div>
          <div>
            <strong>判断标准：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• 总分 ≥ 160 分或阳性项目数 ≥ 43 个：提示可能存在心理问题</li>
              <li>• 因子分 ≥ 2 分：该因子异常，需要关注</li>
              <li>• 因子分 ≥ 3 分：该因子严重异常，建议寻求专业帮助</li>
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
                    您的得分提示可能存在心理健康问题，建议咨询专业的心理健康专家。
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