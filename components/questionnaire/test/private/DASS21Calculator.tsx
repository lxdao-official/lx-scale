import { QuestionType } from "@/types";

interface DASS21CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateDASS21Results = ({ answers }: DASS21CalculatorProps): any => {
    // DASS-21 计算逻辑
    // 抑郁维度题目: 3, 5, 10, 13, 16, 17, 21
    // 焦虑维度题目: 2, 4, 7, 9, 15, 19, 20  
    // 压力维度题目: 1, 6, 8, 11, 12, 14, 18
    
    const depressionItems = [3, 5, 10, 13, 16, 17, 21];
    const anxietyItems = [2, 4, 7, 9, 15, 19, 20];
    const stressItems = [1, 6, 8, 11, 12, 14, 18];
    
    let depressionScore = 0;
    let anxietyScore = 0;
    let stressScore = 0;
    let totalScore = 0;

    // 计算各维度分数
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);
        
        totalScore += scoreValue;
        
        if (depressionItems.includes(questionNum)) {
            depressionScore += scoreValue;
        } else if (anxietyItems.includes(questionNum)) {
            anxietyScore += scoreValue;
        } else if (stressItems.includes(questionNum)) {
            stressScore += scoreValue;
        }
    });

    // DASS-21的分数需要乘以2以便与DASS-42比较
    const finalDepressionScore = depressionScore * 2;
    const finalAnxietyScore = anxietyScore * 2;
    const finalStressScore = stressScore * 2;

    // 判断各维度严重程度
    const getDepressionSeverity = (score: number) => {
        if (score <= 9) return "normal";
        if (score <= 13) return "mild";
        if (score <= 20) return "moderate";
        if (score <= 27) return "severe";
        return "extremely_severe";
    };

    const getAnxietySeverity = (score: number) => {
        if (score <= 7) return "normal";
        if (score <= 9) return "mild";
        if (score <= 14) return "moderate";
        if (score <= 19) return "severe";
        return "extremely_severe";
    };

    const getStressSeverity = (score: number) => {
        if (score <= 14) return "normal";
        if (score <= 18) return "mild";
        if (score <= 25) return "moderate";
        if (score <= 33) return "severe";
        return "extremely_severe";
    };

    const depressionSeverity = getDepressionSeverity(finalDepressionScore);
    const anxietySeverity = getAnxietySeverity(finalAnxietyScore);
    const stressSeverity = getStressSeverity(finalStressScore);

    // 判断整体严重程度
    const isAnySevere = depressionSeverity === "severe" || depressionSeverity === "extremely_severe" ||
                       anxietySeverity === "severe" || anxietySeverity === "extremely_severe" ||
                       stressSeverity === "severe" || stressSeverity === "extremely_severe";

    return {
        totalScore,
        depressionScore: finalDepressionScore,
        anxietyScore: finalAnxietyScore,
        stressScore: finalStressScore,
        depressionSeverity,
        anxietySeverity,
        stressSeverity,
        factorScores: {
            "depression": finalDepressionScore,
            "anxiety": finalAnxietyScore,
            "stress": finalStressScore
        },
        positiveItemCount: Object.values(answers).filter(score => parseInt(score) >= 2).length,
        positiveItemAverage: totalScore / Object.keys(answers).length,
        isSevere: isAnySevere
    };
};