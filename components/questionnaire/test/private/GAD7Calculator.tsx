import { QuestionType } from "@/types";

interface GAD7CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateGAD7Results = ({ answers }: GAD7CalculatorProps): any => {
    // GAD-7 calculation logic
    let totalScore = 0;

    // Calculate total score (simple sum)
    Object.entries(answers).forEach(([, score]) => {
        const scoreValue = parseInt(score);
        totalScore += scoreValue;
    });

    // Determine anxiety severity level
    let severity = "minimal";
    if (totalScore >= 15) {
        severity = "severe";
    } else if (totalScore >= 10) {
        severity = "moderate";
    } else if (totalScore >= 5) {
        severity = "mild";
    }

    // Analyze item scores
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 2  // Scores of 2 or above are considered high score items
    }));

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    return {
        totalScore,
        severity,
        itemAnalysis,
        highScoreItemCount: highScoreItems.length,
        factorScores: {}, // GAD-7 is a single-factor scale
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.score, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "severe" || severity === "moderate"
    };
};