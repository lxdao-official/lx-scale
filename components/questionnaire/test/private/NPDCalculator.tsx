import { QuestionType } from "@/types";

/**
 * Narcissistic Personality Inventory calculator parameters interface
 */
interface NPDCalculatorProps {
    /** Answer data, key is question ID, value is selected score */
    answers: { [key: number]: string };
    /** Questions list */
    questions: QuestionType[];
}

/**
 * Calculate Narcissistic Personality Inventory (NPI-16) results
 * 
 * @param answers - User answer data, containing question ID and selected score
 * @returns Calculation results, including total score, factor scores, severity level and other information
 */
export const calculateNPDResults = ({ answers }: NPDCalculatorProps): any => {
    // NPI-16 calculation logic
    let totalScore = 0;

    // Subscale score initialization based on NPI factors
    let leadershipAuthorityScore = 0;      // Leadership/Authority subscale
    let grandioseExhibitionismScore = 0;   // Grandiose Exhibitionism subscale
    let entitlementScore = 0;              // Entitlement subscale

    // Calculate total score and subscale scores
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);
        const scoreValue = parseInt(score);

        totalScore += scoreValue;

        // Assign to subscales based on NPI-16 factor structure
        // Leadership/Authority: questions 1, 8, 10, 11, 12
        if ([1, 8, 10, 11, 12].includes(questionNum)) {
            leadershipAuthorityScore += scoreValue;
        }
        // Grandiose Exhibitionism: questions 2, 3, 7, 15
        else if ([2, 3, 7, 15].includes(questionNum)) {
            grandioseExhibitionismScore += scoreValue;
        }
        // Entitlement: questions 4, 5, 6, 9, 13, 14, 16
        else if ([4, 5, 6, 9, 13, 14, 16].includes(questionNum)) {
            entitlementScore += scoreValue;
        }
    });

    // Determine interpretation level based on total score
    // Based on research, average scores typically range from 2-8 in general population
    let interpretation = "low";
    if (totalScore >= 4 && totalScore <= 7) {
        interpretation = "average";
    } else if (totalScore >= 8 && totalScore <= 11) {
        interpretation = "above_average";
    } else if (totalScore >= 12) {
        interpretation = "high";
    }

    // Calculate percentile approximation
    let percentile = 0;
    if (totalScore <= 2) percentile = 25;
    else if (totalScore <= 5) percentile = 50;
    else if (totalScore <= 8) percentile = 75;
    else if (totalScore <= 11) percentile = 90;
    else percentile = 95;

    // Calculate factor scores
    const factorScores: { [key: string]: number } = {
        "leadership": leadershipAuthorityScore,
        "exhibitionism": grandioseExhibitionismScore,
        "entitlement": entitlementScore
    };

    // Identify dominant traits
    const dominantTrait = Object.entries(factorScores).reduce((a, b) => 
        factorScores[a[0]] > factorScores[b[0]] ? a : b
    )[0];

    // Return complete calculation results
    return {
        totalScore,
        factorScores,
        positiveItemCount: totalScore, // For NPI, each item is either 0 or 1
        positiveItemAverage: totalScore / Object.keys(answers).length,
        isSevere: interpretation === "high",
        interpretation,
        percentile,
        dominantTrait,
        recommendations: interpretation === "high" 
            ? "Results suggest elevated narcissistic traits. Remember that this is a personality assessment, not a clinical diagnosis. Narcissistic traits can be adaptive in some contexts but may impact relationships if extreme."
            : interpretation === "above_average"
            ? "Results suggest above-average narcissistic traits. This is relatively common and can include positive aspects like confidence and leadership, balanced with consideration for others."
            : "Results suggest relatively low narcissistic traits, indicating a balanced sense of self with consideration for others. This suggests healthy self-esteem without excessive self-focus."
    };
};