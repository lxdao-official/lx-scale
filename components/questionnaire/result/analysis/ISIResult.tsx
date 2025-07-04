'use client';

import React from 'react';
import { calculateISIResults } from '../../test/private/ISICalculator';

interface ISIResultProps {
  answers: string[];
}

export function ISIResult({ answers }: ISIResultProps) {
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateISIResults({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    no_insomnia: "无临床意义失眠",
    subthreshold: "亚临床失眠",
    moderate: "中度失眠",
    severe: "重度失眠"
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "no_insomnia": return "text-green-600 bg-green-50 border-green-200";
      case "subthreshold": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "severe": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">ISI 失眠评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="总分" value={`${results.totalScore}/28`} />
          <MetricCard title="高分项目数" value={`${results.highScoreItemCount}/7`} />
          <MetricCard 
            title="失眠程度" 
            value={severityNames[results.severity as keyof typeof severityNames] || "未知"}
            className={getSeverityColor(results.severity).split(' ')[0]}
          />
        </div>
      </div>

      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">结果解释</h3>
        <div className="space-y-2 text-sm">
          <div><strong>ISI 评分标准：</strong></div>
          <ul className="ml-4 space-y-1">
            <li>• 0-7分：无临床意义失眠</li>
            <li>• 8-14分：亚临床失眠</li>
            <li>• 15-21分：中度失眠</li>
            <li>• 22-28分：重度失眠</li>
          </ul>
        </div>
      </div>

      {results.isSevere && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-sm font-medium text-red-800">
            建议咨询睡眠专科医生，寻求专业的睡眠治疗方案。
          </div>
        </div>
      )}
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