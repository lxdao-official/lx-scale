'use client';

import React from 'react';
import { calculateBDI2Results } from '../../test/private/BDI2Calculator';

interface BDI2ResultProps {
  answers: string[];
}

export function BDI2Result({ answers }: BDI2ResultProps) {
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateBDI2Results({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    minimal: "无/最低程度",
    mild: "轻度抑郁",
    moderate: "中度抑郁",
    severe: "重度抑郁"
  };

  const severityDescriptions = {
    minimal: "您目前的抑郁水平很低，没有显著的抑郁症状。",
    mild: "您可能存在轻度抑郁症状，建议关注自己的情绪状态并考虑寻求支持。",
    moderate: "您可能存在中度抑郁症状，建议寻求专业心理健康服务。",
    severe: "您可能存在重度抑郁症状，强烈建议立即寻求专业医疗帮助。"
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

  const subscaleInfo = {
    emotional: { name: "情感症状", maxScore: 18, description: "悲伤、绝望、内疚等情感表现" },
    cognitive: { name: "认知症状", maxScore: 15, description: "自我批评、决断困难、注意力问题" },
    somatic: { name: "躯体症状", maxScore: 15, description: "疲劳、睡眠、食欲、性兴趣问题" },
    behavioral: { name: "行为症状", maxScore: 15, description: "兴趣丧失、社交退缩、激越表现" }
  };

  const questionTexts = [
    "悲伤", "悲观", "既往失败", "快感缺失", "内疚感", "惩罚感", "自我厌恶", "自我指责",
    "自杀想法或愿望", "哭泣", "激越", "兴趣缺失", "犹豫不决", "无价值感", "精力缺失",
    "睡眠模式改变", "易激惹", "食欲改变", "注意力集中困难", "疲劳或疲倦", "对性的兴趣缺失"
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* 紧急警告 */}
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
                您报告了自杀想法。这是非常严重的信号，请立即寻求帮助：
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

      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">BDI-II 评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="总分" value={`${results.totalScore}/63`} />
          <MetricCard title="高分项目数" value={`${results.highScoreItemCount}/21`} />
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
          <div><strong>BDI-II 评分标准：</strong></div>
          <ul className="ml-4 space-y-1">
            <li>• 0-13分：无/最低程度抑郁</li>
            <li>• 14-19分：轻度抑郁</li>
            <li>• 20-28分：中度抑郁</li>
            <li>• 29-63分：重度抑郁</li>
          </ul>
        </div>
      </div>

      {/* 症状维度分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">症状维度分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(subscaleInfo).map(([key, info]) => {
            const score = results.factorScores[key] as number;
            const percentage = (score / info.maxScore) * 100;
            
            return (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{info.name}</span>
                  <span className="text-sm text-gray-600">{score}/{info.maxScore}</span>
                </div>
                
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        percentage >= 75 ? "bg-red-400" :
                        percentage >= 50 ? "bg-orange-400" :
                        percentage >= 25 ? "bg-yellow-400" : "bg-green-400"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  {info.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">项目详细分析</h3>
        <div className="space-y-2">
          {results.itemAnalysis.map((item: any, index: number) => (
            <div key={item.questionId} className={`flex items-center justify-between p-3 rounded-lg ${
              item.questionId === 9 && item.score >= 1 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
            }`}>
              <div className="flex-1">
                <span className="text-sm font-medium">
                  {index + 1}. {questionTexts[index]}
                </span>
                {item.questionId === 9 && item.score >= 1 && (
                  <div className="text-xs text-red-600 mt-1">⚠️ 自杀风险 - 需要立即关注</div>
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
      </div>

      {/* 专业建议 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">专业建议</h3>
        <div className="space-y-4 text-sm text-gray-700">
          
          {results.severity === "minimal" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800">
                <strong>保持良好状态：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 继续保持健康的生活方式</li>
                  <li>• 维持良好的社交关系</li>
                  <li>• 定期进行自我评估</li>
                  <li>• 学习压力管理技巧</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <strong>抑郁症状管理建议：</strong>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">日常生活管理</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• 建立规律的作息时间</li>
                    <li>• 设定小而可实现的目标</li>
                    <li>• 参与愉快的活动</li>
                    <li>• 适度运动，如散步、瑜伽</li>
                    <li>• 保持营养均衡的饮食</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">社会支持</h4>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• 与亲友保持联系</li>
                    <li>• 参加支持小组</li>
                    <li>• 寻求专业心理咨询</li>
                    <li>• 考虑认知行为疗法</li>
                    <li>• 必要时接受药物治疗</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {(results.severity === "moderate" || results.severity === "severe") && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-orange-900">
                <strong>专业治疗建议：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 寻求精神科医生或心理治疗师帮助</li>
                  <li>• 考虑系统性心理治疗（如CBT、IPT）</li>
                  <li>• 评估是否需要抗抑郁药物治疗</li>
                  <li>• 建立危机干预计划</li>
                  <li>• 定期随访监测症状变化</li>
                </ul>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-gray-800">
              <strong>重要提醒：</strong>BDI-II是筛查工具，不能替代专业诊断。抑郁症是可以治疗的疾病，
              及早寻求专业帮助可以显著改善症状和生活质量。
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