import { QuestionType } from "@/types";

interface PHQ9CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculatePHQ9Results = ({ answers }: PHQ9CalculatorProps): any => {
    // PHQ-9 计算逻辑
    let totalScore = 0;
    let suicidalIdeation = false;

    // 计算总分（简单求和）
    Object.entries(answers).forEach(([questionId, score]) => {
        const scoreValue = parseInt(score);
        totalScore += scoreValue;
        
        // 检查第9题（自杀想法）
        if (parseInt(questionId) === 9 && scoreValue >= 1) {
            suicidalIdeation = true;
        }
    });

    // 判断抑郁严重程度
    let severity = "minimal";
    if (totalScore >= 20) {
        severity = "severe";
    } else if (totalScore >= 15) {
        severity = "moderately_severe";
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

    // 判断主要抑郁发作的可能性（至少5个症状，其中至少包含前两个中的一个）
    const coreSymptoms = itemAnalysis.slice(0, 2).filter(item => item.score >= 2);
    const otherSymptoms = itemAnalysis.slice(2).filter(item => item.score >= 2);
    const majorDepressionCriteria = coreSymptoms.length >= 1 && (coreSymptoms.length + otherSymptoms.length) >= 5;

    return {
        totalScore,
        severity,
        suicidalIdeation,
        itemAnalysis,
        highScoreItemCount: highScoreItems.length,
        majorDepressionCriteria,
        factorScores: {}, // PHQ-9 是单因子量表
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.score, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "severe" || severity === "moderately_severe" || suicidalIdeation
    };
};