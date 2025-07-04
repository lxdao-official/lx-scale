import { QuestionType } from "@/types";

interface GAD7CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateGAD7Results = ({ answers }: GAD7CalculatorProps): any => {
    // GAD-7 计算逻辑
    let totalScore = 0;

    // 计算总分（简单求和）
    Object.entries(answers).forEach(([, score]) => {
        const scoreValue = parseInt(score);
        totalScore += scoreValue;
    });

    // 判断焦虑严重程度
    let severity = "minimal";
    if (totalScore >= 15) {
        severity = "severe";
    } else if (totalScore >= 10) {
        severity = "moderate";
    } else if (totalScore >= 5) {
        severity = "mild";
    }

    // 分析各项目得分
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 2  // 2分以上认为是高分项目
    }));

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    return {
        totalScore,
        severity,
        itemAnalysis,
        highScoreItemCount: highScoreItems.length,
        factorScores: {}, // GAD-7 是单因子量表
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.score, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "severe" || severity === "moderate"
    };
};