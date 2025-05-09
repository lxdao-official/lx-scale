interface ResultsProps {
    results: {
        totalScore: number;
        factorScores: { [key: string]: number };
        positiveItemCount: number;
        positiveItemAverage: number;
        isSevere: boolean;
    };
}

export function Results({ results }: ResultsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">测试结果</h2>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">总分：</span>
                    <span>{results.totalScore}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">阳性项目数：</span>
                    <span>{results.positiveItemCount}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">阳性症状均分：</span>
                    <span>{results.positiveItemAverage.toFixed(2)}</span>
                </div>

                {Object.entries(results.factorScores).length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">因子分数</h3>
                        <div className="grid gap-3">
                            {Object.entries(results.factorScores).map(([factor, score]) => (
                                <div key={factor} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">{factor}：</span>
                                    <span>{score.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {results.isSevere && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
                        <p className="font-medium">提示：您的得分结果显示存在较为严重的症状，建议及时就医咨询。</p>
                    </div>
                )}
            </div>
        </div>
    );
} 