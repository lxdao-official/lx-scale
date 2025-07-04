import { QuestionType } from "@/types";

interface PSS10CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculatePSS10Results = ({ answers }: PSS10CalculatorProps): any => {
    // PSS-10 计算逻辑
    let totalScore = 0;
    
    // 反向计分项目 (4, 5, 7, 8)
    const reverseItems = [4, 5, 7, 8];

    // 计算总分
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);

        if (reverseItems.includes(questionNum)) {
            // 反向计分：0->4, 1->3, 2->2, 3->1, 4->0
            totalScore += (4 - scoreValue);
        } else {
            totalScore += scoreValue;
        }
    });

    // 判断压力水平（基于研究文献的参考值）
    let severity = "low";
    if (totalScore >= 27) {
        severity = "high";
    } else if (totalScore >= 14) {
        severity = "moderate";
    }

    // 分析各项目得分
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);
        const isReverse = reverseItems.includes(questionNum);
        const actualScore = isReverse ? (4 - scoreValue) : scoreValue;
        
        return {
            questionId: questionNum,
            originalScore: scoreValue,
            actualScore: actualScore,
            isReverse: isReverse,
            isHigh: actualScore >= 3  // 3分以上认为是高分项目
        };
    });

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    // 计算分量表得分
    const stressPerceptionItems = [1, 2, 3, 6, 9, 10]; // 压力感知项目
    const copingAbilityItems = [4, 5, 7, 8]; // 应对能力项目

    let stressPerceptionScore = 0;
    let copingAbilityScore = 0;

    itemAnalysis.forEach(item => {
        if (stressPerceptionItems.includes(item.questionId)) {
            stressPerceptionScore += item.actualScore;
        } else if (copingAbilityItems.includes(item.questionId)) {
            copingAbilityScore += item.actualScore;
        }
    });

    return {
        totalScore,
        severity,
        itemAnalysis,
        highScoreItemCount: highScoreItems.length,
        stressPerceptionScore, // 压力感知分数 (0-24分)
        copingAbilityScore,    // 应对能力分数 (0-16分)
        factorScores: {
            "stress_perception": stressPerceptionScore,
            "coping_ability": copingAbilityScore
        },
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.actualScore, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "high"
    };
};