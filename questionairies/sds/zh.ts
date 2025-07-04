import { Questionnaire } from "@/types";

export const sds: Questionnaire = {
    id: "sds",
    title: "SDS抑郁自评量表",
    description: "评估抑郁症状的严重程度",
    tags: ["抑郁", "自评量表", "筛查"],
    time: "5-10分钟",
    details: {
        introduction: "抑郁自评量表（Self-Rating Depression Scale, SDS）是由Zung于1965年编制的，用于评估抑郁症状的严重程度。该量表共20个项目，涵盖情感、躯体、精神运动和心理方面的症状。量表简单易用，适合作为抑郁症筛查工具。",
        questionCount: "20个项目",
        evaluationTime: "通常为5-10分钟",
        instructions: "请根据您最近一周的实际感受，选择最符合您情况的选项。每个问题都有四个选择：很少、有些时间、相当多时间、绝大部分时间。",
        scoringMethod: [
            "总分：将20个项目得分相加，再乘以1.25得到标准分",
            "正向计分项目：1、3、4、7、8、9、10、13、15、19题",
            "反向计分项目：2、5、6、11、12、14、16、17、18、20题（倒序计分）",
            "严重程度：标准分53-62分为轻度抑郁，63-72分为中度抑郁，73分以上为重度抑郁"
        ],
        dimensions: [
            { name: "情感症状", description: "情绪低落、悲伤、绝望等情感体验" },
            { name: "躯体症状", description: "食欲不振、睡眠障碍、疲劳等身体症状" },
            { name: "精神运动症状", description: "行动迟缓、思维迟钝、注意力不集中等" },
            { name: "心理症状", description: "自我评价低、内疚感、无助感等心理体验" }
        ],
        notes: [
            "该量表适用于具有抑郁症状的成年人",
            "如果标准分超过53分，建议寻求专业心理医生的帮助",
            "该量表仅供筛查使用，不能替代专业诊断"
        ],
        references: [
            {
                text: "Zung, W. W. (1965). A self-rating depression scale. Archives of general psychiatry, 12(1), 63-70.",
                url: "https://jamanetwork.com/journals/jamapsychiatry/article-abstract/487993"
            }
        ]
    },
    questions: [
        { id: 1, content: "我感到情绪沮丧，郁闷" },
        { id: 2, content: "我感到早晨心情最好" },
        { id: 3, content: "我要哭或想哭" },
        { id: 4, content: "我夜间睡眠不好" },
        { id: 5, content: "我吃饭像平时一样多" },
        { id: 6, content: "我的性功能正常" },
        { id: 7, content: "我感到体重减轻" },
        { id: 8, content: "我为便秘烦恼" },
        { id: 9, content: "我的心跳比平时快" },
        { id: 10, content: "我无故感到疲劳" },
        { id: 11, content: "我的头脑像往常一样清楚" },
        { id: 12, content: "我做事情像平时一样不感到困难" },
        { id: 13, content: "我坐卧不安，难以保持平静" },
        { id: 14, content: "我对未来感到有希望" },
        { id: 15, content: "我比平时更容易激怒" },
        { id: 16, content: "我觉得决定什么事很容易" },
        { id: 17, content: "我感到自己是有用的和不可缺少的人" },
        { id: 18, content: "我的生活很有意义" },
        { id: 19, content: "假若我死了别人会过得更好" },
        { id: 20, content: "我仍旧喜爱自己平时喜爱的东西" }
    ],
    renderOptions: () => [
        { id: 1, content: "很少", value: "1" },
        { id: 2, content: "有些时间", value: "2" },
        { id: 3, content: "相当多时间", value: "3" },
        { id: 4, content: "绝大部分时间", value: "4" }
    ]
};