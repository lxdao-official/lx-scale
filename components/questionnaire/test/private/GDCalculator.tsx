import { QuestionType } from "@/types";

/**
 * Gender Dysphoria Questionnaire calculator parameters interface
 */
interface GDCalculatorProps {
    /** Answer data, key is question ID, value is selected score */
    answers: { [key: number]: string };
    /** Questions list */
    questions: QuestionType[];
}

/**
 * Calculate Gender Dysphoria Questionnaire (GDQ) results
 * 
 * @param answers - User answer data, containing question ID and selected score
 * @returns Calculation results, including total score, factor scores, and other information
 */
export const calculateGDResults = ({ answers }: GDCalculatorProps): any => {
    // Gender Dysphoria calculation logic
    let totalRawScore = 0;

    // Reverse-scored items (questions where agreement indicates comfort with assigned gender)
    const reverseItems = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
    
    // Calculate total score with reverse scoring
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);
        
        if (reverseItems.includes(questionNum)) {
            // Reverse score: 7 becomes 1, 6 becomes 2, etc.
            totalRawScore += (8 - scoreValue);
        } else {
            totalRawScore += scoreValue;
        }
    });

    // Calculate factor scores based on conceptual dimensions
    let genderIdentityScore = 0;     // Questions about internal gender identity
    let socialRoleScore = 0;         // Questions about social gender roles
    let physicalDysphoriaScore = 0;  // Questions about physical characteristics
    let genderExpressionScore = 0;   // Questions about gender expression

    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        let scoreValue = parseInt(score);
        
        // Apply reverse scoring if needed
        if (reverseItems.includes(questionNum)) {
            scoreValue = 8 - scoreValue;
        }

        // Assign to factor scores based on question content
        if ([2, 4, 6, 17, 18, 20, 22, 24, 27].includes(questionNum)) {
            genderIdentityScore += scoreValue;
        } else if ([5, 7, 12, 19, 21, 26].includes(questionNum)) {
            socialRoleScore += scoreValue;
        } else if ([3, 9, 10, 13, 15, 16].includes(questionNum)) {
            physicalDysphoriaScore += scoreValue;
        } else if ([1, 8, 11, 14, 23, 25].includes(questionNum)) {
            genderExpressionScore += scoreValue;
        }
    });

    // Determine general interpretation level
    const totalPossibleScore = Object.keys(answers).length * 7;
    const scorePercentage = (totalRawScore / totalPossibleScore) * 100;
    
    let interpretation = "low";
    if (scorePercentage >= 30 && scorePercentage < 50) {
        interpretation = "mild";
    } else if (scorePercentage >= 50 && scorePercentage < 70) {
        interpretation = "moderate";
    } else if (scorePercentage >= 70) {
        interpretation = "high";
    }

    // Calculate factor scores
    const factorScores: { [key: string]: number } = {
        "genderIdentity": genderIdentityScore,
        "socialRole": socialRoleScore,
        "physicalDysphoria": physicalDysphoriaScore,
        "genderExpression": genderExpressionScore
    };

    // Count items with scores above neutral (>4 after reverse scoring)
    const elevatedItems = Object.entries(answers).filter(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        let scoreValue = parseInt(score);
        
        if (reverseItems.includes(questionNum)) {
            scoreValue = 8 - scoreValue;
        }
        
        return scoreValue > 4;
    }).length;

    // Return complete calculation results
    return {
        totalScore: totalRawScore,
        factorScores,
        positiveItemCount: elevatedItems,
        positiveItemAverage: totalRawScore / Object.keys(answers).length,
        isSevere: interpretation === "high",
        interpretation,
        scorePercentage: Math.round(scorePercentage),
    };
};