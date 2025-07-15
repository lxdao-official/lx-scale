import { QuestionType } from "@/types";

/**
 * Yale-Brown Obsessive Compulsive Scale calculator parameters interface
 */
interface YBOCSCalculatorProps {
    /** Answer data, key is question ID, value is selected score */
    answers: { [key: number]: string };
    /** Questions list */
    questions: QuestionType[];
}

/**
 * Calculate Yale-Brown Obsessive Compulsive Scale (Y-BOCS) results
 * 
 * @param answers - User answer data, containing question ID and selected score
 * @returns Calculation results, including total score, factor scores, severity level and other information
 */
export const calculateYBOCSResults = ({ answers }: YBOCSCalculatorProps): any => {
    // Y-BOCS Obsessive Compulsive Scale calculation logic
    let totalScore = 0;

    // Subscale score initialization: obsessions (questions 1-5) and compulsions (questions 6-10)
    let obsessionScore = 0;   // Obsessions subscale score
    let compulsionScore = 0;  // Compulsions subscale score

    // Calculate total score and subscale scores
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);  // Question number
        const scoreValue = parseInt(score);        // Selected score value

        totalScore += scoreValue;  // Accumulate total score

        // Subscale score calculation: distinguish between obsessions and compulsions
        if (questionNum >= 1 && questionNum <= 5) {
            // Obsessions subscale (questions 1-5)
            obsessionScore += scoreValue;
        } else if (questionNum >= 6 && questionNum <= 10) {
            // Compulsions subscale (questions 6-10)
            compulsionScore += scoreValue;
        }
    });

    // Determine severity level of obsessive-compulsive symptoms based on total score
    // 0-7: Normal
    // 8-15: Mild obsessive-compulsive symptoms
    // 16-23: Moderate obsessive-compulsive symptoms
    // 24-31: Severe obsessive-compulsive symptoms
    // 32-40: Extremely severe obsessive-compulsive symptoms
    let severity = "normal";  // Default to normal
    if (totalScore >= 8 && totalScore <= 15) {
        severity = "mild";    // Mild obsessive-compulsive symptoms
    } else if (totalScore >= 16 && totalScore <= 23) {
        severity = "moderate"; // Moderate obsessive-compulsive symptoms
    } else if (totalScore >= 24 && totalScore <= 31) {
        severity = "severe";   // Severe obsessive-compulsive symptoms
    } else if (totalScore >= 32) {
        severity = "extreme";  // Extremely severe obsessive-compulsive symptoms
    }

    // Calculate factor scores (obsessions subscale and compulsions subscale)
    // These factor scores can be used to analyze symptom characteristics and intervention directions
    const factorScores: { [key: string]: number } = {
        "obsession": obsessionScore,   // Obsessions score
        "compulsion": compulsionScore  // Compulsions score
    };

    // Return complete calculation results
    return {
        totalScore,                      // Total score
        factorScores,                    // Factor scores (including obsessions and compulsions)
        positiveItemCount: Object.values(answers).filter(score => parseInt(score) >= 1).length,  // Positive item count (number of items with score ≥1)
        positiveItemAverage: totalScore / Object.keys(answers).length,  // Positive item average score
        isSevere: severity === "severe" || severity === "extreme",  // Whether it's severe or extremely severe symptoms
        severity  // Severity level classification
    };
}; 