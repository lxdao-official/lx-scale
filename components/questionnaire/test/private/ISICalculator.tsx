import { QuestionType } from "@/types";

interface ISICalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateISIResults = ({ answers }: ISICalculatorProps): any => {
    // ISI calculation logic
    let totalScore = 0;

    // Calculate total score (simple sum)
    Object.entries(answers).forEach(([, score]) => {
        const scoreValue = parseInt(score);
        totalScore += scoreValue;
    });

    // Determine insomnia severity level
    let severity = "no_insomnia";
    if (totalScore >= 22) {
        severity = "severe";
    } else if (totalScore >= 15) {
        severity = "moderate";
    } else if (totalScore >= 8) {
        severity = "subthreshold";
    }

    // Analyze item scores
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 3  // Scores of 3 or above are considered high score items
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