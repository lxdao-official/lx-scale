import { Questionnaire } from "@/types";

export const pss10: Questionnaire = {
    id: "pss10",
    title: "PSS-10感知压力量表",
    description: "评估个体对生活中压力的主观感受",
    tags: ["压力", "自评量表", "心理健康"],
    time: "3-5分钟",
    details: {
        introduction: "感知压力量表（Perceived Stress Scale-10, PSS-10）是一个广泛使用的心理压力评估工具。该量表由10个项目组成，主要评估个体在过去一个月中对生活事件的压力感知程度。PSS-10不测量具体的压力源，而是测量个体对压力的主观体验和应对能力的感知。",
        questionCount: "10个项目",
        evaluationTime: "通常为3-5分钟",
        instructions: "请根据您在过去一个月中的实际感受，选择最符合您情况的选项。每个问题都有五个选择：从不、几乎从不、有时、相当频繁、非常频繁。",
        scoringMethod: [
            "总分：将10个项目得分相加，范围0-40分",
            "正向计分项目：1、2、3、6、9、10题",
            "反向计分项目：4、5、7、8题（倒序计分）",
            "严重程度：得分越高表示感知到的压力越大"
        ],
        dimensions: [
            { name: "压力感知", description: "对生活中不可预测性和不可控制性的感知" },
            { name: "应对能力", description: "对自己应对能力和控制能力的信心" },
            { name: "压力超载", description: "感到生活中的要求超过了应对能力" },
            { name: "情绪反应", description: "对压力情境的情绪反应" }
        ],
        notes: [
            "该量表适用于评估成年人的压力感知水平",
            "PSS-10得分没有绝对的临界值，需要结合个体情况综合分析",
            "持续的高压力感知可能影响身心健康，建议寻求专业指导"
        ],
        references: [
            {
                text: "Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of health and social behavior, 385-396.",
                url: "https://www.jstor.org/stable/2136404"
            }
        ]
    },
    questions: [
        { id: 1, content: "在过去的一个月中，您有多经常因为发生了意想不到的事情而感到心烦意乱？" },
        { id: 2, content: "在过去的一个月中，您有多经常感到无法控制您生活中的重要事情？" },
        { id: 3, content: "在过去的一个月中，您有多经常感到紧张和压力？" },
        { id: 4, content: "在过去的一个月中，您有多经常自信地处理您的个人问题？" },
        { id: 5, content: "在过去的一个月中，您有多经常感到事情正朝着您希望的方向发展？" },
        { id: 6, content: "在过去的一个月中，您有多经常发现您无法应付所有您必须做的事情？" },
        { id: 7, content: "在过去的一个月中，您有多经常能够控制生活中令人烦恼的事情？" },
        { id: 8, content: "在过去的一个月中，您有多经常感到您掌控着整个局面？" },
        { id: 9, content: "在过去的一个月中，您有多经常因为您无法控制的事情而感到生气？" },
        { id: 10, content: "在过去的一个月中，您有多经常感到困难重重，以至于您无法克服它们？" }
    ],
    renderOptions: () => [
        { id: 1, content: "从不", value: "0" },
        { id: 2, content: "几乎从不", value: "1" },
        { id: 3, content: "有时", value: "2" },
        { id: 4, content: "相当频繁", value: "3" },
        { id: 5, content: "非常频繁", value: "4" }
    ]
};