import { CalculatedResults, QuestionType } from "@/types";

interface SCL90CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
    factorMapping?: { [key: string]: number[] };
}

export const calculateSCL90Results = ({ answers, factorMapping }: SCL90CalculatorProps): CalculatedResults => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + parseInt(score), 0);
    const positiveItemCount = Object.values(answers).filter(score => parseInt(score) >= 2).length;
    const negativeItemCount = Object.values(answers).filter(score => parseInt(score) === 1).length;
    const positiveItemAverage = positiveItemCount > 0
        ? (totalScore - negativeItemCount) / positiveItemCount
        : 0;

    // 计算各因子分数
    const factorScores: { [key: string]: number } = {};

    if (factorMapping) {
        Object.entries(factorMapping).forEach(([factor, questionIndexes]) => {
            let factorSum = 0;
            let validQuestionCount = 0;

            questionIndexes.forEach((index: number) => {
                if (answers[index]) {
                    factorSum += parseInt(answers[index]);
                    validQuestionCount++;
                }
            });

            factorScores[factor] = validQuestionCount > 0
                ? factorSum / validQuestionCount
                : 0;
        });
    }

    const isSevere = totalScore > 160 || positiveItemCount > 43;

    return {
        totalScore,
        factorScores,
        positiveItemCount,
        positiveItemAverage,
        isSevere
    };
}; 