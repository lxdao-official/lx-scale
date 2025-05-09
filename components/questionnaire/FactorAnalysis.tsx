interface FactorAnalysisProps {
    factorScores: { [key: string]: number };
    questionnaireId: string;
    factorDescriptions?: { [key: string]: string };
}

export function FactorAnalysis({ factorScores, questionnaireId, factorDescriptions }: FactorAnalysisProps) {
    if (!factorScores || Object.keys(factorScores).length === 0) return null;

    // 获取因子分数的严重程度级别
    const getFactorSeverityLevel = (factorName: string, score: number) => {
        // 基于ID和因子名称定义严重程度阈值
        const thresholds: { [key: string]: { [key: string]: number[] } } = {
            "scl90": {
                "躯体化": [1.5, 2.5, 3.5],
                "强迫症状": [1.5, 2.5, 3.5],
                "人际关系敏感": [1.5, 2.5, 3.5],
                "抑郁": [1.5, 2.5, 3.5],
                "焦虑": [1.5, 2.5, 3.5],
                "敌对": [1.5, 2.5, 3.5],
                "恐怖": [1.5, 2.5, 3.5],
                "偏执": [1.5, 2.5, 3.5],
                "精神病性": [1.5, 2.5, 3.5],
                "其他": [1.5, 2.5, 3.5]
            }
        };

        const factorThresholds = thresholds[questionnaireId]?.[factorName] || [1.5, 2.5, 3.5];

        if (score < factorThresholds[0]) return "轻微";
        if (score < factorThresholds[1]) return "轻度";
        if (score < factorThresholds[2]) return "中度";
        return "严重";
    };

    return (
        <div>
            <h2 className="text-xl font-medium mb-3">因子分析</h2>
            <div className="space-y-4">
                {Object.entries(factorScores).map(([factorName, score], index) => {
                    const severity = getFactorSeverityLevel(factorName, score);
                    const severityColorMap: { [key: string]: string } = {
                        "轻微": "bg-green-500",
                        "轻度": "bg-yellow-500",
                        "中度": "bg-orange-500",
                        "严重": "bg-red-500"
                    };
                    const colorClass = severityColorMap[severity] || "bg-blue-500";

                    // 百分比计算，假设最高分为5分
                    const scorePercentage = (score / 5) * 100;

                    return (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">{factorName}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs text-white ${colorClass}`}>
                                    {severity}
                                </span>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className={`${colorClass} h-2.5 rounded-full`}
                                        style={{ width: `${Math.min(scorePercentage, 100)}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{score.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                {factorDescriptions?.[factorName] || `${factorName}得分反映了您在该维度上的状态。`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 