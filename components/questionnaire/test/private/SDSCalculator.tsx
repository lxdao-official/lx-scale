import { QuestionType } from "@/types";

interface SDSCalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateSDSResults = ({ answers }: SDSCalculatorProps): any => {
    // SDS Depression Self-rating Scale calculation logic
    const reverseItems = [2, 5, 6, 11, 12, 14, 16, 17, 18, 20]; // Reverse scoring items
    let totalScore = 0;

    // Calculate total score
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);

        if (reverseItems.includes(questionNum)) {
            // Reverse scoring: 1->4, 2->3, 3->2, 4->1
            totalScore += (5 - scoreValue);
        } else {
            totalScore += scoreValue;
        }
    });

    // Calculate standard score
    const standardScore = Math.round(totalScore * 1.25);

    // Determine depression level
    let severity = "normal";
    if (standardScore >= 53 && standardScore <= 62) {
        severity = "mild";
    } else if (standardScore >= 63 && standardScore <= 72) {
        severity = "moderate";
    } else if (standardScore > 72) {
        severity = "severe";
    }

    return {
        totalScore: standardScore,
        factorScores: {},
        positiveItemCount: 0,
        positiveItemAverage: 0,
        isSevere: severity === "severe",
        severity: severity
    };
}; 