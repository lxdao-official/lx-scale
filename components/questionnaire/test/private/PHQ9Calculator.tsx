import { QuestionType } from "@/types";

interface PHQ9CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculatePHQ9Results = ({ answers }: PHQ9CalculatorProps): any => {
    // PHQ-9 calculation logic
    let totalScore = 0;
    let suicidalIdeation = false;

    // Calculate total score (simple sum)
    Object.entries(answers).forEach(([questionId, score]) => {
        const scoreValue = parseInt(score);
        totalScore += scoreValue;
        
        // Check question 9 (suicidal ideation)
        if (parseInt(questionId) === 9 && scoreValue >= 1) {
            suicidalIdeation = true;
        }
    });

    // Determine depression severity level
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

    // Analyze item scores
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 2  // Scores of 2 or above are considered high score items
    }));

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    // Determine possibility of major depressive episode (at least 5 symptoms, including at least one of the first two)
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
        factorScores: {}, // PHQ-9 is a single-factor scale
        positiveItemCount: highScoreItems.length,
        positiveItemAverage: highScoreItems.length > 0 
            ? highScoreItems.reduce((sum, item) => sum + item.score, 0) / highScoreItems.length 
            : 0,
        isSevere: severity === "severe" || severity === "moderately_severe" || suicidalIdeation
    };
};