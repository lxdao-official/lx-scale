interface ResultInterpretationProps {
    results: {
        totalScore: number;
        isSevere: boolean;
        severity?: string;
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
        } else if (questionnaireId === "ocd") {
            // Yale-Brown强迫症状量表(Y-BOCS)结果解释
            if (results.severity === "extreme") {
                return "根据您的测评结果(Y-BOCS总分" + results.totalScore + "分)，您可能存在极严重的强迫症状。这意味着强迫观念和强迫行为已经严重影响了您的日常生活、工作和社交功能。我们强烈建议您立即寻求专业精神科医师的帮助，可能需要综合药物治疗和专业心理治疗。请记住，强迫症是可以治疗的，及时干预非常重要。";
            } else if (results.severity === "severe") {
                return "根据您的测评结果(Y-BOCS总分" + results.totalScore + "分)，您可能存在严重的强迫症状。这表明强迫观念和强迫行为已经显著干扰了您的生活质量。我们建议您尽快咨询专业精神科医师或心理治疗师，获取专业的诊断和治疗方案，通常可能需要药物治疗和认知行为疗法的结合。";
            } else if (results.severity === "moderate") {
                return "根据您的测评结果(Y-BOCS总分" + results.totalScore + "分)，您可能存在中度强迫症状。这意味着强迫症状已经给您的生活带来了一定困扰，但您仍然能够维持基本功能。建议您寻求专业心理咨询，学习应对强迫症状的技巧，如认知行为疗法中的暴露和反应预防技术，并保持规律健康的生活方式。";
            } else if (results.severity === "mild") {
                return "根据您的测评结果(Y-BOCS总分" + results.totalScore + "分)，您可能存在轻微的强迫症状。这些症状虽然会给您带来一些不适，但对日常生活的影响相对有限。建议您学习一些放松技巧和正念冥想方法，了解更多关于强迫症的知识，如果症状持续或加重，可以考虑寻求专业心理咨询。";
            } else {
                return "根据您的测评结果(Y-BOCS总分" + results.totalScore + "分)，您的强迫症状处于正常范围内。建议您继续保持健康的生活方式，积极参与社交活动，并注意心理卫生，预防强迫症状的发生。";
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