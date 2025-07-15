import { QuestionType } from "@/types";

interface PSS10CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculatePSS10Results = ({ answers }: PSS10CalculatorProps): any => {
    // PSS-10 calculation logic
    let totalScore = 0;
    
    // Reverse scoring items (4, 5, 7, 8)
    const reverseItems = [4, 5, 7, 8];

    // Calculate total score
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);

        if (reverseItems.includes(questionNum)) {
            // Reverse scoring: 0->4, 1->3, 2->2, 3->1, 4->0
            totalScore += (4 - scoreValue);
        } else {
            totalScore += scoreValue;
        }
    });

    // Determine stress level (based on reference values from research literature)
    let severity = "low";
    if (totalScore >= 27) {
        severity = "high";
    } else if (totalScore >= 14) {
        severity = "moderate";
    }

    // Analyze item scores
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
            isHigh: actualScore >= 3  // Scores of 3 or above are considered high score items
        };
    });

    const highScoreItems = itemAnalysis.filter(item => item.isHigh);

    // Calculate subscale scores
    const stressPerceptionItems = [1, 2, 3, 6, 9, 10]; // Stress perception items
    const copingAbilityItems = [4, 5, 7, 8]; // Coping ability items

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
        stressPerceptionScore, // Stress perception score (0-24 points)
        copingAbilityScore,    // Coping ability score (0-16 points)
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