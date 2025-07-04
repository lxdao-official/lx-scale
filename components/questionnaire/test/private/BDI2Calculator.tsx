import { QuestionType } from "@/types";

interface BDI2CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateBDI2Results = ({ answers }: BDI2CalculatorProps): any => {
    // BDI-II 计算逻辑
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
    if (totalScore >= 29) {
        severity = "severe";
    } else if (totalScore >= 20) {
        severity = "moderate";
    } else if (totalScore >= 14) {
        severity = "mild";
    }

    // 分析各项目得分
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 2  // 2分以上认为是高分项目
    }));

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    // 分类分析不同症状领域
    const emotionalItems = [1, 2, 4, 5, 10, 14]; // 情感症状
    const cognitiveItems = [3, 6, 8, 13, 19]; // 认知症状
    const somaticItems = [15, 16, 18, 20, 21]; // 躯体症状
    const behavioralItems = [7, 9, 11, 12, 17]; // 行为症状

    const getSubscaleScore = (items: number[]) => {
        return items.reduce((sum, itemId) => {
            return sum + (answers[itemId] ? parseInt(answers[itemId]) : 0);
        }, 0);
    };

    const emotionalScore = getSubscaleScore(emotionalItems);
    const cognitiveScore = getSubscaleScore(cognitiveItems);
    const somaticScore = getSubscaleScore(somaticItems);
    const behavioralScore = getSubscaleScore(behavioralItems);

    return {
        totalScore,
        severity,
        suicidalIdeation,
        itemAnalysis,
        highScoreItemCount: highScoreItems.length,
        emotionalScore,
        cognitiveScore,
        somaticScore,
        behavioralScore,
        factorScores: {
            "emotional": emotionalScore,
            "cognitive": cognitiveScore,
            "somatic": somaticScore,
            "behavioral": behavioralScore
        },
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.score, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "severe" || suicidalIdeation
    };
};