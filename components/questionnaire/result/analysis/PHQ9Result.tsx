'use client';

import React from 'react';
import { calculatePHQ9Results } from '../../test/private/PHQ9Calculator';

interface PHQ9ResultProps {
  answers: string[];
}

export function PHQ9Result({ answers }: PHQ9ResultProps) {
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculatePHQ9Results({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    minimal: "无/最低程度",
    mild: "轻度抑郁",
    moderate: "中度抑郁",
    moderately_severe: "中重度抑郁",
    severe: "重度抑郁"
  };

  const severityDescriptions = {
    minimal: "您的抑郁水平很低，目前没有显著的抑郁症状。",
    mild: "您可能存在轻度抑郁症状，建议关注自己的情绪状态。",
    moderate: "您可能存在中度抑郁症状，建议考虑寻求专业帮助。",
    moderately_severe: "您可能存在中重度抑郁症状，强烈建议寻求专业医疗帮助。",
    severe: "您可能存在重度抑郁症状，请立即寻求专业医疗帮助。"
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
    "做事时提不起劲或没有兴趣",
    "感到心情低落、沮丧或绝望",
    "入睡困难、睡不安稳或睡眠过多",
    "感觉疲倦或没有活力",
    "食欲不振或吃太多",
    "觉得自己很糟糕，或觉得自己很失败，或让自己或家人失望",
    "对事物专注有困难，例如阅读报纸或看电视时",
    "动作或说话速度缓慢到别人已经察觉？或正好相反——比平时更加烦躁或坐立不安，动来动去",
    "有不如死掉或用某种方式伤害自己的念头"
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="总分" value={`${results.totalScore}/27`} />
          <MetricCard title="高分项目数" value={`${results.highScoreItemCount}/9`} />
          <MetricCard 
            title="抑郁程度" 
            value={severityNames[results.severity as keyof typeof severityNames] || "未知"}
            className={getSeverityColor(results.severity).split(' ')[0]}
          />
        </div>
      </div>

      {/* 重要警告 */}
      {results.suicidalIdeation && (
        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-red-800">紧急提醒</h3>
              <div className="text-sm font-medium text-red-700 mt-1">
                您报告了自伤或自杀的想法。这是一个严重的信号，请立即寻求专业帮助：
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 立即联系心理危机干预热线：400-161-9995</li>
                  <li>• 前往最近的医院急诊科</li>
                  <li>• 联系您的医生或心理健康专家</li>
                  <li>• 与信任的家人或朋友在一起，不要独处</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 严重程度说明 */}
      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">结果解释</h3>
        <p className="text-sm mb-4">
          {severityDescriptions[results.severity as keyof typeof severityDescriptions] || "评估结果异常，请重新测试。"}
        </p>
        
        <div className="space-y-2 text-sm">
          <div><strong>评分标准：</strong></div>
          <ul className="ml-4 space-y-1">
            <li>• 0-4分：无/最低程度抑郁</li>
            <li>• 5-9分：轻度抑郁</li>
            <li>• 10-14分：中度抑郁</li>
            <li>• 15-19分：中重度抑郁</li>
            <li>• 20-27分：重度抑郁</li>
          </ul>
        </div>

        {results.majorDepressionCriteria && (
          <div className="mt-4 bg-yellow-100 border border-yellow-300 rounded p-3">
            <div className="text-yellow-900 font-medium">
              注意：您的症状模式符合主要抑郁发作的筛查标准，强烈建议寻求专业医疗评估。
            </div>
          </div>
        )}
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">项目分析</h3>
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
                  <div className="text-xs text-red-600 mt-1">⚠️ 需要立即关注</div>
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
                    需要关注
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {results.highScoreItemCount > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">高分项目分析</h4>
            <div className="text-sm text-blue-800">
              您在 {results.highScoreItemCount} 个项目上得分较高（≥2分），这些症状在过去两周内出现频率较高。
              这些项目反映的问题领域可能是您需要重点关注和改善的方面。
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
                  <li>• 规律运动和充足睡眠</li>
                  <li>• 维持良好的社交关系</li>
                  <li>• 学习压力管理技巧</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <strong>自我管理建议：</strong>
              <ul className="mt-2 ml-4 space-y-1">
                <li>• 建立规律的日常作息</li>
                <li>• 适度运动，如散步、游泳等</li>
                <li>• 保持健康饮食，避免过量饮酒</li>
                <li>• 与亲友保持联系，寻求社会支持</li>
                <li>• 尝试放松技巧，如冥想、深呼吸</li>
                <li>• 设定现实可行的目标</li>
              </ul>
            </div>
          )}

          {(results.severity === "moderate" || results.severity === "moderately_severe" || results.severity === "severe") && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-orange-900">
                <strong>专业治疗建议：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 心理治疗：认知行为疗法、人际治疗等</li>
                  <li>• 药物治疗：抗抑郁药物（需医生处方）</li>
                  <li>• 综合治疗：结合心理和药物治疗</li>
                  <li>• 定期随访：监测症状变化和治疗效果</li>
                </ul>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-800">
              <strong>注意：</strong>PHQ-9量表仅供参考，不能替代专业医生的诊断。抑郁症是可以治疗的疾病，及早干预效果更好。
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