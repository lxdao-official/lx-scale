import { CalculatedResults, QuestionType } from "../types";

/**
 * Yale-Brown强迫症状量表计算器参数接口
 */
interface YBOCSCalculatorProps {
    /** 回答数据，键为问题ID，值为选择的分数 */
    answers: { [key: number]: string };
    /** 问题列表 */
    questions: QuestionType[];
}

/**
 * 计算Yale-Brown强迫症状量表(Y-BOCS)的结果
 * 
 * @param answers - 用户回答数据，包含问题ID和选择的分数
 * @returns 计算结果，包含总分、因子分数、严重程度等信息
 */
export const calculateYBOCSResults = ({ answers }: YBOCSCalculatorProps): CalculatedResults => {
    // Y-BOCS强迫症状量表计算逻辑
    let totalScore = 0;

    // 分量表得分初始化：强迫观念(1-5题)和强迫行为(6-10题)
    let obsessionScore = 0;   // 强迫观念分量表得分
    let compulsionScore = 0;  // 强迫行为分量表得分

    // 计算总分和分量表得分
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionNum = parseInt(questionId);  // 问题编号
        const scoreValue = parseInt(score);        // 选择的分数值

        totalScore += scoreValue;  // 累加总分

        // 分量表得分计算：区分强迫观念和强迫行为
        if (questionNum >= 1 && questionNum <= 5) {
            // 强迫观念分量表（第1-5题）
            obsessionScore += scoreValue;
        } else if (questionNum >= 6 && questionNum <= 10) {
            // 强迫行为分量表（第6-10题）
            compulsionScore += scoreValue;
        }
    });

    // 根据总分判断强迫症状严重程度
    // 0-7分：正常
    // 8-15分：轻微强迫症状
    // 16-23分：中度强迫症状
    // 24-31分：严重强迫症状
    // 32-40分：极严重强迫症状
    let severity = "normal";  // 默认为正常
    if (totalScore >= 8 && totalScore <= 15) {
        severity = "mild";    // 轻微强迫症状
    } else if (totalScore >= 16 && totalScore <= 23) {
        severity = "moderate"; // 中度强迫症状
    } else if (totalScore >= 24 && totalScore <= 31) {
        severity = "severe";   // 严重强迫症状
    } else if (totalScore >= 32) {
        severity = "extreme";  // 极严重强迫症状
    }

    // 计算因子分数（强迫观念分量表和强迫行为分量表）
    // 这些因子分数可用于分析症状特点和干预方向
    const factorScores: { [key: string]: number } = {
        "obsession": obsessionScore,   // 强迫观念分数
        "compulsion": compulsionScore  // 强迫行为分数
    };

    // 返回完整的计算结果
    return {
        totalScore,                      // 总分
        factorScores,                    // 因子分数（包括强迫观念和强迫行为）
        positiveItemCount: Object.values(answers).filter(score => parseInt(score) >= 1).length,  // 阳性项目数（得分≥1的项目数）
        positiveItemAverage: totalScore / Object.keys(answers).length,  // 阳性项目平均分
        isSevere: severity === "severe" || severity === "extreme",  // 是否为严重或极严重症状
        severity  // 严重程度分类
    };
}; 