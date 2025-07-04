'use client';

import React from 'react';
import { calculateDASS21Results } from '../../test/private/DASS21Calculator';

interface DASS21ResultProps {
  answers: string[];
}

export function DASS21Result({ answers }: DASS21ResultProps) {
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculateDASS21Results({ 
    answers: answersMap, 
    questions: [] 
  });

  const severityNames = {
    normal: "正常",
    mild: "轻度",
    moderate: "中度",
    severe: "重度",
    extremely_severe: "极重度"
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "text-green-600 bg-green-50 border-green-200";
      case "mild": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "severe": return "text-red-600 bg-red-50 border-red-200";
      case "extremely_severe": return "text-red-700 bg-red-100 border-red-300";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const dimensionInfo = {
    depression: {
      name: "抑郁",
      score: results.depressionScore,
      severity: results.depressionSeverity,
      description: "情绪低落、绝望、生活缺乏意义等",
      maxScore: 42
    },
    anxiety: {
      name: "焦虑",
      score: results.anxietyScore,
      severity: results.anxietySeverity,
      description: "自主神经系统唤起、肌肉紧张等",
      maxScore: 42
    },
    stress: {
      name: "压力",
      score: results.stressScore,
      severity: results.stressSeverity,
      description: "持续紧张、易激惹、过度反应等",
      maxScore: 42
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">DASS-21 评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="总分" value={`${results.totalScore}/63`} />
          <MetricCard title="抑郁分数" value={`${results.depressionScore}/42`} />
          <MetricCard title="焦虑分数" value={`${results.anxietyScore}/42`} />
          <MetricCard title="压力分数" value={`${results.stressScore}/42`} />
        </div>
      </div>

      {/* 三维度分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">三维度详细分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(dimensionInfo).map(([key, info]) => (
            <div key={key} className={`border rounded-lg p-4 ${getSeverityColor(info.severity)}`}>
              <div className="text-center mb-3">
                <h4 className="font-semibold text-lg">{info.name}</h4>
                <div className="text-2xl font-bold mt-2">{info.score}</div>
                <div className="text-sm opacity-75">/{info.maxScore}</div>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      info.severity === "normal" ? "bg-green-400" :
                      info.severity === "mild" ? "bg-yellow-400" :
                      info.severity === "moderate" ? "bg-orange-400" :
                      info.severity === "severe" ? "bg-red-400" : "bg-red-600"
                    }`}
                    style={{ width: `${(info.score / info.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  info.severity === "normal" ? "bg-green-100 text-green-800" :
                  info.severity === "mild" ? "bg-yellow-100 text-yellow-800" :
                  info.severity === "moderate" ? "bg-orange-100 text-orange-800" :
                  info.severity === "severe" ? "bg-red-100 text-red-800" : "bg-red-200 text-red-900"
                }`}>
                  {severityNames[info.severity as keyof typeof severityNames]}
                </span>
              </div>

              <div className="text-sm text-center mt-2 opacity-75">
                {info.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 严重程度标准 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">评分标准</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="space-y-2">
            <h4 className="font-medium text-green-700">抑郁维度</h4>
            <div className="text-sm space-y-1">
              <div>正常：0-9分</div>
              <div>轻度：10-13分</div>
              <div>中度：14-20分</div>
              <div>重度：21-27分</div>
              <div>极重度：28+分</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-blue-700">焦虑维度</h4>
            <div className="text-sm space-y-1">
              <div>正常：0-7分</div>
              <div>轻度：8-9分</div>
              <div>中度：10-14分</div>
              <div>重度：15-19分</div>
              <div>极重度：20+分</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-purple-700">压力维度</h4>
            <div className="text-sm space-y-1">
              <div>正常：0-14分</div>
              <div>轻度：15-18分</div>
              <div>中度：19-25分</div>
              <div>重度：26-33分</div>
              <div>极重度：34+分</div>
            </div>
          </div>
        </div>
      </div>

      {/* 结果解释和建议 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">结果解释与建议</h3>
        <div className="space-y-4">
          
          {/* 整体评估 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">整体评估</h4>
            <div className="text-sm text-blue-800">
              {results.isSevere ? (
                <p>您在一个或多个维度上显示出较高的困扰水平，建议寻求专业心理健康服务的帮助。</p>
              ) : (
                <p>您的整体情绪状态在可接受范围内，继续保持良好的心理健康习惯。</p>
              )}
            </div>
          </div>

          {/* 维度特定建议 */}
          {results.depressionSeverity !== "normal" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">抑郁维度建议</h4>
              <div className="text-sm text-green-800 space-y-1">
                <p>• 建立规律的日常作息和活动计划</p>
                <p>• 参与愉快的活动，即使最初没有兴趣</p>
                <p>• 与亲友保持联系，寻求社会支持</p>
                <p>• 适度运动，如散步、瑜伽等</p>
                {(results.depressionSeverity === "severe" || results.depressionSeverity === "extremely_severe") && (
                  <p className="font-medium">• 建议尽快寻求专业心理治疗或医疗帮助</p>
                )}
              </div>
            </div>
          )}

          {results.anxietySeverity !== "normal" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">焦虑维度建议</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>• 练习深呼吸和渐进性肌肉放松</p>
                <p>• 学习正念冥想技巧</p>
                <p>• 识别和挑战焦虑想法</p>
                <p>• 逐步面对恐惧情境，避免完全回避</p>
                {(results.anxietySeverity === "severe" || results.anxietySeverity === "extremely_severe") && (
                  <p className="font-medium">• 考虑认知行为疗法或药物治疗</p>
                )}
              </div>
            </div>
          )}

          {results.stressSeverity !== "normal" && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">压力维度建议</h4>
              <div className="text-sm text-purple-800 space-y-1">
                <p>• 学习时间管理和优先级设定</p>
                <p>• 练习压力管理技巧，如冥想、瑜伽</p>
                <p>• 设定现实可行的目标和期望</p>
                <p>• 寻找健康的压力释放方式</p>
                {(results.stressSeverity === "severe" || results.stressSeverity === "extremely_severe") && (
                  <p className="font-medium">• 考虑压力管理课程或专业咨询</p>
                )}
              </div>
            </div>
          )}

          {/* 严重情况警告 */}
          {results.isSevere && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    重要提醒：您的得分显示存在显著的心理困扰，强烈建议寻求专业心理健康服务。
                    早期干预可以有效改善症状并提高生活质量。
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-gray-800 text-sm">
              <strong>注意：</strong>DASS-21是筛查工具，不能替代专业诊断。如果您对结果有疑问或需要帮助，
              请咨询合格的心理健康专业人员。
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