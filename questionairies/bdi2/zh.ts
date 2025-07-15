import { Questionnaire } from "@/types";

export const bdi2: Questionnaire = {
    id: "bdi2",
    title: "BDI-II Beck抑郁量表",
    description: "抑郁症状评估的金标准工具",
    tags: ["抑郁", "自评量表", "临床评估"],
    time: "5-10分钟",
    details: {
        introduction: "Beck抑郁量表第二版（Beck Depression Inventory-II, BDI-II）是世界上最广泛使用的抑郁症筛查和评估工具之一。该量表由21个项目组成，每个项目描述抑郁症的一个特定症状，基于DSM-IV的抑郁症诊断标准设计。BDI-II具有良好的信效度，被认为是抑郁症状评估的金标准。",
        questionCount: "21个项目",
        evaluationTime: "通常为5-10分钟",
        instructions: "这个问卷包含21组陈述。请仔细阅读每组陈述，然后从每组中选择一个最能描述您在过去两周内（包括今天）感受的陈述。每组陈述按严重程度排序，从0到3分。",
        scoringMethod: [
            "总分：将21个项目得分相加，范围0-63分",
            "严重程度：0-13分为最低程度/无抑郁，14-19分为轻度抑郁，20-28分为中度抑郁，29-63分为重度抑郁",
            "临床意义：总分≥14分建议进一步评估，≥29分提示重度抑郁需要立即关注"
        ],
        dimensions: [
            { name: "情感症状", description: "悲伤、绝望、哭泣、易怒等情绪表现" },
            { name: "认知症状", description: "自我批评、内疚感、决断困难、注意力问题" },
            { name: "躯体症状", description: "疲劳、睡眠问题、食欲改变、性兴趣下降" },
            { name: "行为症状", description: "社交退缩、兴趣丧失、工作能力下降" }
        ],
        notes: [
            "该量表适用于13岁以上的青少年和成年人",
            "如果总分≥29分或有自杀想法，需要立即寻求专业帮助",
            "该量表仅供筛查使用，不能替代专业诊断"
        ],
        references: [
            {
                text: "Beck, A. T., Steer, R. A., & Brown, G. K. (1996). Manual for the Beck Depression Inventory-II. San Antonio, TX: Psychological Corporation.",
                url: "https://www.pearsonassessments.com"
            }
        ]
    },
    questions: [
        { id: 1, content: "悲伤" },
        { id: 2, content: "悲观" },
        { id: 3, content: "既往失败" },
        { id: 4, content: "快感缺失" },
        { id: 5, content: "内疚感" },
        { id: 6, content: "惩罚感" },
        { id: 7, content: "自我厌恶" },
        { id: 8, content: "自我指责" },
        { id: 9, content: "自杀想法或愿望" },
        { id: 10, content: "哭泣" },
        { id: 11, content: "激越" },
        { id: 12, content: "兴趣缺失" },
        { id: 13, content: "犹豫不决" },
        { id: 14, content: "无价值感" },
        { id: 15, content: "精力缺失" },
        { id: 16, content: "睡眠模式改变" },
        { id: 17, content: "易激惹" },
        { id: 18, content: "食欲改变" },
        { id: 19, content: "注意力集中困难" },
        { id: 20, content: "疲劳或疲倦" },
        { id: 21, content: "对性的兴趣缺失" }
    ],
    renderOptions: (id: number) => {
        // Return different options based on different questions
        switch (id) {
            case 1: // Sadness
                return [
                    { id: 1, content: "我不感到悲伤", value: "0" },
                    { id: 2, content: "我大部分时间感到悲伤", value: "1" },
                    { id: 3, content: "我一直感到悲伤", value: "2" },
                    { id: 4, content: "我太悲伤或不快乐，无法忍受", value: "3" }
                ];
            case 2: // Pessimism
                return [
                    { id: 1, content: "我对未来不感到特别沮丧", value: "0" },
                    { id: 2, content: "我对未来感到比以前更沮丧", value: "1" },
                    { id: 3, content: "我不期望事情对我有好转", value: "2" },
                    { id: 4, content: "我觉得未来对我来说是无望的，只会变得更糟", value: "3" }
                ];
            case 3: // Past failure
                return [
                    { id: 1, content: "我不觉得自己是个失败者", value: "0" },
                    { id: 2, content: "我比大多数人更经常地失败", value: "1" },
                    { id: 3, content: "当我回顾我的生活时，我看到的都是失败", value: "2" },
                    { id: 4, content: "我觉得自己作为一个人是完全失败的", value: "3" }
                ];
            case 4: // Loss of pleasure
                return [
                    { id: 1, content: "我从事情中得到的满足感和以前一样多", value: "0" },
                    { id: 2, content: "我从事情中得到的享受不如以前", value: "1" },
                    { id: 3, content: "我从任何事情中得到的真正满足感都很少", value: "2" },
                    { id: 4, content: "我从任何事情中都不满足或不快乐", value: "3" }
                ];
            case 9: // Suicidal thoughts or wishes
                return [
                    { id: 1, content: "我没有任何自杀的想法", value: "0" },
                    { id: 2, content: "我有自杀的想法，但不会实施", value: "1" },
                    { id: 3, content: "我想自杀", value: "2" },
                    { id: 4, content: "如果有机会，我会自杀", value: "3" }
                ];
            case 16: // Changes in sleeping pattern
                return [
                    { id: 1, content: "我的睡眠没有任何变化", value: "0" },
                    { id: 2, content: "我比平时睡得稍微多一些或少一些", value: "1" },
                    { id: 3, content: "我比平时睡得多很多或少很多", value: "2" },
                    { id: 4, content: "我几乎整天睡觉，或者我比平时早醒1-2小时且无法再入睡", value: "3" }
                ];
            case 18: // Changes in appetite
                return [
                    { id: 1, content: "我的食欲没有任何变化", value: "0" },
                    { id: 2, content: "我的食欲比以前稍微差一些或好一些", value: "1" },
                    { id: 3, content: "我的食欲比以前差很多或好很多", value: "2" },
                    { id: 4, content: "我完全没有食欲，或者我渴望一直吃东西", value: "3" }
                ];
            default:
                // Generic option template
                return [
                    { id: 1, content: "无此症状", value: "0" },
                    { id: 2, content: "轻度", value: "1" },
                    { id: 3, content: "中度", value: "2" },
                    { id: 4, content: "重度", value: "3" }
                ];
        }
    }
};