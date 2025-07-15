import { QuestionType } from "@/types";

interface BDI2CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateBDI2Results = ({ answers }: BDI2CalculatorProps): any => {
    // BDI-II calculation logic
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
    if (totalScore >= 29) {
        severity = "severe";
    } else if (totalScore >= 20) {
        severity = "moderate";
    } else if (totalScore >= 14) {
        severity = "mild";
    }

    // Analyze item scores
    const itemAnalysis = Object.entries(answers).map(([questionId, score]) => ({
        questionId: parseInt(questionId),
        score: parseInt(score),
        isHigh: parseInt(score) >= 2  // Scores of 2 or above are considered high score items
    }));

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    // Categorize analysis of different symptom domains
    const emotionalItems = [1, 2, 4, 5, 10, 14]; // Emotional symptoms
    const cognitiveItems = [3, 6, 8, 13, 19]; // Cognitive symptoms
    const somaticItems = [15, 16, 18, 20, 21]; // Somatic symptoms
    const behavioralItems = [7, 9, 11, 12, 17]; // Behavioral symptoms

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