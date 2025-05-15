interface ResultScoreProps {
    totalScore: number;
    questionnaireId: string;
}

export function ResultScore({ totalScore, questionnaireId }: ResultScoreProps) {
    return (
        <div>
            <h2 className="text-xl font-medium mb-3">总分</h2>
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
                <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600">{totalScore}</div>
                    {questionnaireId === "scl90" && (
                        <div className="mt-2 text-gray-600">标准分值：2.5 以下为正常范围</div>
                    )}
                    {questionnaireId === "depression" && (
                        <div className="mt-2 text-gray-600">标准分值：40 以下为轻度抑郁</div>
                    )}
                </div>
            </div>
        </div>
    );
} 