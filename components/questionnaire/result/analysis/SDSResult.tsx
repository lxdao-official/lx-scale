'use client';

import React from 'react';
import { calculateSDSResults } from '../../test/private/SDSCalculator';

interface SDSResultProps {
  answers: string[];
}

export function SDSResult({ answers }: SDSResultProps) {
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
    normal: "正常",
    mild: "轻度抑郁",
    moderate: "中度抑郁", 
    severe: "重度抑郁"
  };

  const severityDescriptions = {
    normal: "您的得分在正常范围内，没有显著的抑郁症状。",
    mild: "您可能存在轻度抑郁症状，建议关注自己的心理状态，必要时寻求专业帮助。",
    moderate: "您可能存在中度抑郁症状，建议尽快咨询专业的心理医生。",
    severe: "您可能存在重度抑郁症状，强烈建议立即寻求专业医疗帮助。"
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
        <h3 className="text-lg font-semibold mb-4">评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="原始总分" value={`${rawScore}/80`} />
          <MetricCard title="标准分" value={results.totalScore} />
          <MetricCard 
            title="抑郁程度" 
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
            <li>• 标准分 ≤ 52：正常范围</li>
            <li>• 标准分 53-62：轻度抑郁</li>
            <li>• 标准分 63-72：中度抑郁</li>
            <li>• 标准分 ≥ 73：重度抑郁</li>
          </ul>
        </div>
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">详细分析</h3>
        <div className="space-y-4">
          
          {/* 高分项目提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">量表说明</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• SDS量表包含20个项目，涵盖情感、躯体、精神运动和心理方面的症状</p>
              <p>• 其中10个项目为正向计分，10个项目为反向计分</p>
              <p>• 原始分数乘以1.25得到标准分，便于与其他研究结果比较</p>
            </div>
          </div>

          {/* 计分方式说明 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">计分方式</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>正向计分项目：</strong>1、3、4、7、8、9、10、13、15、19题</p>
              <p><strong>反向计分项目：</strong>2、5、6、11、12、14、16、17、18、20题</p>
              <p><strong>选项计分：</strong>很少=1分，有些时间=2分，相当多时间=3分，绝大部分时间=4分</p>
              <p><strong>反向计分：</strong>4分→1分，3分→2分，2分→3分，1分→4分</p>
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
                    重要提醒：您的得分提示可能存在抑郁症状，请尽快联系专业心理医生或精神科医生进行进一步评估和治疗。
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 专业建议 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">专业建议</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <strong>如果您的得分较高，建议：</strong>
            <ul className="mt-2 ml-4 space-y-1">
              <li>• 寻求专业心理医生或精神科医生的帮助</li>
              <li>• 与信任的家人或朋友分享您的感受</li>
              <li>• 保持规律的作息和适度的运动</li>
              <li>• 避免酗酒和滥用药物</li>
              <li>• 如有自杀想法，请立即寻求帮助</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-yellow-800">
              <strong>注意：</strong>{tCommon('disclaimers.not_diagnostic')}。{tCommon('disclaimers.consult_professional')}。
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