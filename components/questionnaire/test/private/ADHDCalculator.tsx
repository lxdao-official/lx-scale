import { QuestionType } from "@/types";

/**
 * ADHD Self-Report Scale calculator parameters interface
 */
interface ADHDCalculatorProps {
    /** Answer data, key is question ID, value is selected score */
    answers: { [key: number]: string };
    /** Questions list */
    questions: QuestionType[];
}

/**
 * Calculate ADHD Self-Report Scale (ASRS-v1.1) results
 * 
 * @param answers - User answer data, containing question ID and selected score
 * @returns Calculation results, including total score, factor scores, severity level and other information
 */
export const calculateADHDResults = ({ answers }: ADHDCalculatorProps): any => {
    // ADHD ASRS calculation logic
    let totalScore = 0;

    // Subscale score initialization: inattention and hyperactivity-impulsivity
    let inattentionScore = 0;        // Inattention subscale score (questions 1-9)
    let hyperactivityScore = 0;      // Hyperactivity-Impulsivity subscale score (questions 10-18)

    // Part A screening questions (questions 1-6) - critical for screening
    let partAScore = 0;
    let partAPositive = 0;  // Count of positive responses in Part A

    // Calculate total score and subscale scores
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);

        totalScore += scoreValue;

        // Part A screening questions (questions 1-6)
        if (questionNum >= 1 && questionNum <= 6) {
            partAScore += scoreValue;
            // Part A positive criteria: questions 1-4 score ≥2, questions 5-6 score ≥3
            if ((questionNum >= 1 && questionNum <= 4 && scoreValue >= 2) ||
                (questionNum >= 5 && questionNum <= 6 && scoreValue >= 3)) {
                partAPositive++;
            }
        }

        // Inattention subscale (questions 1-9)
        if (questionNum >= 1 && questionNum <= 9) {
            inattentionScore += scoreValue;
        } 
        // Hyperactivity-Impulsivity subscale (questions 10-18)
        else if (questionNum >= 10 && questionNum <= 18) {
            hyperactivityScore += scoreValue;
        }
    });

    // Determine screening result based on Part A
    const screeningPositive = partAPositive >= 4;

    // Determine severity level based on total score
    let severity = "low";
    if (totalScore >= 24 && totalScore <= 36) {
        severity = "mild";
    } else if (totalScore >= 37 && totalScore <= 54) {
        severity = "moderate";
    } else if (totalScore >= 55) {
        severity = "high";
    }

    // Calculate factor scores
    const factorScores: { [key: string]: number } = {
        "inattention": inattentionScore,
        "hyperactivity": hyperactivityScore,
        "partA": partAScore
    };

    // Return complete calculation results
    return {
        totalScore,
        factorScores,
        positiveItemCount: Object.values(answers).filter(score => parseInt(score) >= 2).length,
        positiveItemAverage: totalScore / Object.keys(answers).length,
        isSevere: severity === "high",
        severity,
        screeningPositive,
        partAPositive,
        recommendations: screeningPositive 
            ? "Results suggest possible ADHD symptoms. Consider consulting with a healthcare professional for proper evaluation."
            : "Results do not suggest significant ADHD symptoms. However, if you have concerns, consider speaking with a healthcare professional."
    };
};