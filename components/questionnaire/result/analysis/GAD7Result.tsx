'use client';

import React from 'react';
import { calculateGAD7Results } from '../../test/private/GAD7Calculator';

interface GAD7ResultProps {
  answers: string[];
}

export function GAD7Result({ answers }: GAD7ResultProps) {
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
    minimal: "最低水平",
    mild: "轻度焦虑",
    moderate: "中度焦虑",
    severe: "重度焦虑"
  };

  const severityDescriptions = {
    minimal: "您的焦虑水平很低，目前没有显著的焦虑症状。",
    mild: "您可能存在轻度焦虑症状，建议关注自己的情绪状态。",
    moderate: "您可能存在中度焦虑症状，建议考虑寻求专业帮助。",
    severe: "您可能存在重度焦虑症状，强烈建议寻求专业医疗帮助。"
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
    "感到紧张、担心或焦虑",
    "无法停止或控制担心",
    "对各种各样的事情担心过多",
    "很难放松下来",
    "坐立不安，难以静坐",
    "变得容易烦恼或易怒",
    "感到好像有什么可怕的事情会发生"
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="总分" value={`${results.totalScore}/21`} />
          <MetricCard title="高分项目数" value={`${results.highScoreItemCount}/7`} />
          <MetricCard 
            title="焦虑程度" 
            value={severityNames[results.severity as keyof typeof severityNames] || "未知"}
            className={getSeverityColor(results.severity).split(' ')[0]}
          />
        </div>
      </div>

      {/* 严重程度说明 */}
      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">结果解释</h3>
        <p className="text-sm mb-4">
          {severityDescriptions[results.severity as keyof typeof severityDescriptions] || "评估结果异常，请重新测试。"}
        </p>
        
        <div className="space-y-2 text-sm">
          <div><strong>评分标准：</strong></div>
          <ul className="ml-4 space-y-1">
            <li>• 0-4分：最低水平焦虑</li>
            <li>• 5-9分：轻度焦虑</li>
            <li>• 10-14分：中度焦虑</li>
            <li>• 15-21分：重度焦虑</li>
          </ul>
        </div>
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">项目分析</h3>
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
                    需要关注
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.highScoreItemCount > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">高分项目提示</h4>
            <div className="text-sm text-yellow-800">
              您在 {results.highScoreItemCount} 个项目上得分较高（≥2分），这些项目反映的症状在过去两周内出现频率较高，建议重点关注。
            </div>
          </div>
        )}
      </div>

      {/* 专业建议 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">专业建议</h3>
        <div className="space-y-3 text-sm text-gray-700">
          
          {results.severity === "minimal" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800">
                <strong>保持良好状态：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 继续保持健康的生活方式</li>
                  <li>• 适度运动和充足睡眠</li>
                  <li>• 学习压力管理技巧</li>
                  <li>• 维持良好的社交关系</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <strong>自我管理建议：</strong>
              <ul className="mt-2 ml-4 space-y-1">
                <li>• 练习深呼吸和放松技巧</li>
                <li>• 规律运动，如散步、瑜伽等</li>
                <li>• 保持规律的作息时间</li>
                <li>• 限制咖啡因和酒精摄入</li>
                <li>• 与信任的人分享您的感受</li>
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
                    建议寻求专业帮助：您的得分提示存在{severityNames[results.severity as keyof typeof severityNames]}，建议咨询心理医生或精神科医生进行进一步评估。
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-800">
              <strong>注意：</strong>GAD-7量表仅供参考，不能替代专业医生的诊断。如有疑问，请咨询专业医疗人员。
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