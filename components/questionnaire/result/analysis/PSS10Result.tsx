'use client';

import React from 'react';
import { calculatePSS10Results } from '../../test/private/PSS10Calculator';

interface PSS10ResultProps {
  answers: string[];
}

export function PSS10Result({ answers }: PSS10ResultProps) {
  // 转换答案格式为计算器需要的格式
  const answersMap: { [key: number]: string } = {};
  answers.forEach((answer, index) => {
    answersMap[index + 1] = answer;
  });

  const results = calculatePSS10Results({ 
    answers: answersMap, 
    questions: [] 
  });


  const severityDescriptions = {
    low: "您目前的压力感知水平较低，表明您能够较好地应对生活中的挑战。",
    moderate: "您目前的压力感知水平处于中等程度，需要关注压力管理。",
    high: "您目前的压力感知水平较高，建议积极采取压力管理措施，必要时寻求专业帮助。"
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const questionTexts = [
    "因为发生了意想不到的事情而感到心烦意乱",
    "感到无法控制生活中的重要事情",
    "感到紧张和压力",
    "自信地处理个人问题",
    "感到事情正朝着希望的方向发展",
    "发现无法应付所有必须做的事情",
    "能够控制生活中令人烦恼的事情",
    "感到掌控着整个局面",
    "因为无法控制的事情而感到生气",
    "感到困难重重，以至于无法克服它们"
  ];

  const getScoreInterpretation = (score: number) => {
    if (score <= 13) return { level: "低", color: "text-green-600", desc: "压力水平较低" };
    if (score <= 26) return { level: "中", color: "text-yellow-600", desc: "压力水平中等" };
    return { level: "高", color: "text-red-600", desc: "压力水平较高" };
  };

  const scoreInterp = getScoreInterpretation(results.totalScore);

  return (
    <div className="mt-6 space-y-6">
      {/* 总体得分 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">评估结果</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="总分" value={`${results.totalScore}/40`} />
          <MetricCard title="压力感知" value={`${results.stressPerceptionScore}/24`} />
          <MetricCard title="应对能力" value={`${results.copingAbilityScore}/16`} />
          <MetricCard 
            title="压力水平" 
            value={scoreInterp.level}
            className={scoreInterp.color}
          />
        </div>
      </div>

      {/* 严重程度说明 */}
      <div className={`border rounded-lg p-6 shadow-sm ${getSeverityColor(results.severity)}`}>
        <h3 className="text-lg font-semibold mb-3">结果解释</h3>
        <p className="text-sm mb-4">
          {severityDescriptions[results.severity as keyof typeof severityDescriptions] || "评估结果异常，请重新测试。"}
        </p>
        
        <div className="space-y-3 text-sm">
          <div>
            <strong>得分解释：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• 总分范围：0-40分，得分越高表示感知到的压力越大</li>
              <li>• 压力感知：反映您对生活中不可预测和不可控事件的感知</li>
              <li>• 应对能力：反映您对自己处理问题能力的信心</li>
            </ul>
          </div>
          
          <div>
            <strong>参考标准：</strong>
            <ul className="mt-1 ml-4 space-y-1">
              <li>• 0-13分：低压力水平</li>
              <li>• 14-26分：中等压力水平</li>
              <li>• 27-40分：高压力水平</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 分量表分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">分量表分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 压力感知 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
              压力感知 ({results.stressPerceptionScore}/24分)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-400 h-2 rounded-full" 
                  style={{ width: `${(results.stressPerceptionScore / 24) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-700">
                反映您对生活中不可预测性、不可控制性和超负荷情况的感知程度。
                得分越高，表明您感到生活中的压力和挑战越多。
              </p>
            </div>
          </div>

          {/* 应对能力 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              应对能力 ({results.copingAbilityScore}/16分)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${(results.copingAbilityScore / 16) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-700">
                反映您对自己应对能力的信心和控制感的缺失程度。
                得分越高，表明您越感到缺乏应对能力和控制感。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 项目分析 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">项目分析</h3>
        <div className="space-y-3">
          {results.itemAnalysis.map((item: any, index: number) => (
            <div key={item.questionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {index + 1}. {questionTexts[index]}
                  </span>
                  {item.isReverse && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      反向计分
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  原始得分: {item.originalScore} {item.isReverse ? `→ 实际得分: ${item.actualScore}` : ''}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-semibold ${
                  item.actualScore >= 3 ? 'text-red-600' : 
                  item.actualScore >= 2 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {item.actualScore}
                </span>
                {item.isHigh && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    高压力
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
              您在 {results.highScoreItemCount} 个项目上得分较高（≥3分），这些方面的压力感知较为强烈，
              建议重点关注这些领域的压力管理。
            </div>
          </div>
        )}
      </div>

      {/* 压力管理建议 */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">压力管理建议</h3>
        <div className="space-y-4 text-sm text-gray-700">
          
          {results.severity === "low" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800">
                <strong>保持良好状态：</strong>
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 继续保持现有的压力管理策略</li>
                  <li>• 定期进行自我评估</li>
                  <li>• 帮助他人管理压力</li>
                  <li>• 分享成功的应对经验</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <strong>压力管理策略：</strong>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 短期策略 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">短期缓解策略</h4>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• 深呼吸练习和放松技巧</li>
                    <li>• 适度运动，如散步、瑜伽</li>
                    <li>• 听音乐、冥想或正念练习</li>
                    <li>• 与朋友交流或寻求支持</li>
                    <li>• 充足的睡眠和休息</li>
                  </ul>
                </div>

                {/* 长期策略 */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">长期管理策略</h4>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• 建立规律的生活作息</li>
                    <li>• 学习时间管理技巧</li>
                    <li>• 培养爱好和兴趣</li>
                    <li>• 建立良好的社会支持网络</li>
                    <li>• 定期评估和调整目标</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {results.severity === "high" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-red-800">
                    高压力提醒：您的压力水平较高，建议寻求专业帮助，如心理咨询师或压力管理专家的指导。
                    长期的高压力可能影响身心健康。
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-gray-800">
              <strong>注意：</strong>PSS-10量表评估的是主观压力感知，不同个体对相同压力源的感知可能不同。
              重要的是学会有效的压力管理技巧，提高应对能力。
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