import { QuestionType } from "@/types";

interface SCL90CalculatorProps {
    answers: { [key: number]: string };
    questions: QuestionType[];
}

export const calculateSCL90Results = ({ answers }: SCL90CalculatorProps): any => {
    // SCL-90 calculation logic
    const totalScore = Object.values(answers).reduce((sum, score) => sum + parseInt(score), 0);
    const positiveItemCount = Object.values(answers).filter(score => parseInt(score) >= 2).length;
    const negativeItemCount = Object.values(answers).filter(score => parseInt(score) === 1).length;
    const positiveItemAverage = positiveItemCount > 0
        ? (totalScore - negativeItemCount) / positiveItemCount
        : 0;

    // SCL-90 factor grouping (based on standard factor structure)
    const factorMapping: { [key: string]: number[] } = {
        "somatization": [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58], // Somatization
        "obsessive": [3, 9, 10, 28, 38, 45, 46, 51, 55, 65], // Obsessive-compulsive
        "interpersonal": [6, 21, 34, 36, 37, 41, 61, 69, 73], // Interpersonal sensitivity
        "depression": [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79], // Depression
        "anxiety": [2, 17, 23, 33, 39, 57, 72, 78, 80, 86], // Anxiety
        "hostility": [11, 24, 63, 67, 74, 81], // Hostility
        "phobic": [13, 25, 47, 50, 70, 75, 82], // Phobic anxiety
        "paranoid": [8, 18, 43, 68, 76, 83], // Paranoid ideation
        "psychotic": [7, 16, 35, 62, 77, 84, 85, 87, 88, 90], // Psychoticism
        "other": [19, 44, 59, 60, 64, 66, 89] // Other
    };

    // Calculate factor scores
    const factorScores: { [key: string]: number } = {};

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

    const isSevere = totalScore > 160 || positiveItemCount > 43;

    // Determine overall severity level
    let severity = "normal";
    if (totalScore >= 160 && positiveItemCount >= 43) {
        severity = "severe";
    } else if (totalScore >= 120 || positiveItemCount >= 30) {
        severity = "moderate";
    } else if (totalScore >= 90 || positiveItemCount >= 20) {
        severity = "mild";
    }

    return {
        totalScore,
        factorScores,
        positiveItemCount,
        positiveItemAverage,
        isSevere,
        severity
    };
}; 