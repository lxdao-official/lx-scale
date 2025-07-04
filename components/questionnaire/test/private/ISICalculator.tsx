import { QuestionType } from "@/types";

interface ISICalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateISIResults = ({ answers }: ISICalculatorProps): any => {
    // ISI 计算逻辑
    let totalScore = 0;

    // 计算总分（简单求和）
    Object.entries(answers).forEach(([, score]) => {
        const scoreValue = parseInt(score);
        totalScore += scoreValue;
    });

    // 判断失眠严重程度
    let severity = "no_insomnia";
    if (totalScore >= 22) {
        severity = "severe";
    } else if (totalScore >= 15) {
        severity = "moderate";
    } else if (totalScore >= 8) {
        severity = "subthreshold";
    }

    // 分析各项目得分
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 3  // 3分以上认为是高分项目
    }));

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    return {
        totalScore,
        severity,
        itemAnalysis,
        highScoreItemCount: highScoreItems.length,
        factorScores: {},
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.score, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "severe" || severity === "moderate"
    };
};