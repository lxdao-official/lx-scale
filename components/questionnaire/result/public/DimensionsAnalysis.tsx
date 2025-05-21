interface Dimension {
    name: string;
    description: string;
}

interface DimensionsAnalysisProps {
    dimensions?: Dimension[];
    totalScore: number;
    factorScores: { [key: string]: number };
}

export function DimensionsAnalysis({ dimensions, totalScore, factorScores }: DimensionsAnalysisProps) {
    if (!dimensions || !dimensions.length || (factorScores && Object.keys(factorScores).length > 0)) return null;

    return (
        <div>
            <h2 className="text-xl font-medium mb-3">维度分析</h2>
            <div className="space-y-4">
                {dimensions.map((dim, index) => {
                    // 如果没有真实数据，使用虚拟数据展示维度
                    const dimensionsLength = dimensions?.length || 1;
                    const virtualScore = Math.round(totalScore / (dimensionsLength * 10)) + Math.floor(Math.random() * 3);
                    const scorePercentage = Math.min((virtualScore / 10) * 100, 100);

                    return (
                        <div key={index} className="border rounded-lg p-4">
                            <h3 className="font-medium mb-2">{dim.name}</h3>
                            <div className="flex items-center mb-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${scorePercentage}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">{virtualScore}/10</span>
                            </div>
                            <p className="text-sm text-gray-600">{dim.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 