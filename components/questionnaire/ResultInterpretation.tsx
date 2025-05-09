interface ResultInterpretationProps {
    results: {
        totalScore: number;
        isSevere: boolean;
    };
    questionnaireId: string;
}

export function ResultInterpretation({ results, questionnaireId }: ResultInterpretationProps) {
    const getInterpretation = () => {
        if (!results) return "暂无解读";

        // 根据测试类型和分数提供不同的解读
        if (questionnaireId === "scl90") {
            if (results.isSevere) {
                return "根据您的测评结果，您可能存在较为严重的心理健康问题。我们强烈建议您尽快咨询专业心理医生，获取更准确的诊断和帮助。";
            } else if (results.totalScore > 120) {
                return "根据您的测评结果，您可能存在中度心理健康问题。建议您进一步咨询专业心理医生，获取更准确的诊断和帮助。";
            } else {
                return "根据您的测评结果，您的心理健康状况整体良好，可能存在轻度问题。建议您保持良好的生活习惯，并定期关注自己的心理健康。";
            }
        } else if (questionnaireId === "depression") {
            if (results.totalScore > 60) {
                return "根据您的测评结果，您可能存在较为严重的抑郁症状。我们强烈建议您尽快咨询专业心理医生，获取更准确的诊断和帮助。";
            } else if (results.totalScore > 40) {
                return "根据您的测评结果，您可能存在中度抑郁症状。建议您进一步咨询专业心理医生，获取更准确的诊断和帮助。";
            } else {
                return "根据您的测评结果，您可能存在轻度抑郁症状。建议您保持良好的生活习惯，多参与社交活动，并关注自己的情绪变化。";
            }
        } else {
            return "根据您的测评结果，建议您关注自己的心理健康状况，保持良好的生活习惯，必要时咨询专业心理医生。";
        }
    };

    return (
        <div>
            <h2 className="text-xl font-medium mb-3">结果解读</h2>
            <div className="bg-white border rounded-lg p-4">
                <p className="text-gray-700">{getInterpretation()}</p>
            </div>
        </div>
    );
} 