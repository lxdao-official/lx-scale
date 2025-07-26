import { Questionnaire } from "@/types";

export const npd: Questionnaire = {
    id: "npd",
    title: "自恋人格量表 (NPI-16)",
    description: "评估自恋人格特征和特质",
    tags: ["人格", "自恋", "自我评估"],
    time: "5-10分钟",
    details: {
        introduction: "自恋人格量表(NPI-16)是一个心理测量工具，旨在测量非临床人群中的自恋特质。这个简化版本包含16个强迫选择项目，评估自恋人格特征的各个方面。请注意，这是一个用于理解人格特质的研究工具，不用于临床诊断。",
        questionCount: "16个项目",
        evaluationTime: "约5-10分钟",
        instructions: "对于下面的每对陈述，选择您认为最能描述您或最接近描述您对自己感受的一个。",
        scoringMethod: [
            "每个问题提供两个选择 - 选择最能描述您的一个。",
            "自恋反应得1分，非自恋反应得0分。",
            "总分范围：0-16分。",
            "分数越高表示自恋特质越明显。",
            "普通人群的平均分数通常在2-8分之间。"
        ],
        dimensions: [
            { name: "领导力/权威", description: "渴望领导和对他人拥有权威。" },
            { name: "夸大表现欲", description: "需要他人的关注和赞美。" },
            { name: "特权感", description: "认为自己应当受到特殊待遇和特权。" }
        ],
        notes: [
            "此量表测量连续体上的自恋特质，而非临床障碍。",
            "每个人都在某种程度上具有自恋特质，在某些情况下可能是适应性的。",
            "高分并不一定表示人格障碍。",
            "此工具仅用于教育和研究目的，不用于临床诊断。"
        ],
        references: [
            {
                text: "Ames, D. R., Rose, P., & Anderson, C. P. (2006). The NPI-16 as a short measure of narcissism. Journal of Research in Personality, 40(4), 440-450.",
                url: "https://doi.org/10.1016/j.jrp.2005.03.002"
            }
        ]
    },
    questions: [
        { id: 1, content: "选择最能描述您的陈述：" },
        { id: 2, content: "选择最能描述您的陈述：" },
        { id: 3, content: "选择最能描述您的陈述：" },
        { id: 4, content: "选择最能描述您的陈述：" },
        { id: 5, content: "选择最能描述您的陈述：" },
        { id: 6, content: "选择最能描述您的陈述：" },
        { id: 7, content: "选择最能描述您的陈述：" },
        { id: 8, content: "选择最能描述您的陈述：" },
        { id: 9, content: "选择最能描述您的陈述：" },
        { id: 10, content: "选择最能描述您的陈述：" },
        { id: 11, content: "选择最能描述您的陈述：" },
        { id: 12, content: "选择最能描述您的陈述：" },
        { id: 13, content: "选择最能描述您的陈述：" },
        { id: 14, content: "选择最能描述您的陈述：" },
        { id: 15, content: "选择最能描述您的陈述：" },
        { id: 16, content: "选择最能描述您的陈述：" }
    ],
    renderOptions: (id: number) => {
        const optionPairs = [
            [
                { id: 1, content: "我有影响别人的天赋。", value: "1" },
                { id: 2, content: "我不擅长影响别人。", value: "0" }
            ],
            [
                { id: 1, content: "谦虚不适合我。", value: "1" },
                { id: 2, content: "谦虚适合我。", value: "0" }
            ],
            [
                { id: 1, content: "如果有人激将，我几乎什么都敢做。", value: "1" },
                { id: 2, content: "我倾向于是一个相当谨慎的人。", value: "0" }
            ],
            [
                { id: 1, content: "当人们赞美我时，我有时会感到尴尬。", value: "0" },
                { id: 2, content: "我知道我很好，因为每个人都这样告诉我。", value: "1" }
            ],
            [
                { id: 1, content: "统治世界的想法让我害怕得要死。", value: "0" },
                { id: 2, content: "如果我统治世界，世界会变得更好。", value: "1" }
            ],
            [
                { id: 1, content: "我通常能说服别人让我摆脱困境。", value: "1" },
                { id: 2, content: "我努力接受自己行为的后果。", value: "0" }
            ],
            [
                { id: 1, content: "我更喜欢融入人群。", value: "0" },
                { id: 2, content: "我喜欢成为关注的焦点。", value: "1" }
            ],
            [
                { id: 1, content: "我将会成功。", value: "1" },
                { id: 2, content: "我不太关心成功。", value: "0" }
            ],
            [
                { id: 1, content: "我并不比大多数人好或差。", value: "0" },
                { id: 2, content: "我认为我是一个特殊的人。", value: "1" }
            ],
            [
                { id: 1, content: "我不确定我是否会成为一个好领导。", value: "0" },
                { id: 2, content: "我认为自己是一个好领导。", value: "1" }
            ],
            [
                { id: 1, content: "我很有主见。", value: "1" },
                { id: 2, content: "我希望我更有主见一些。", value: "0" }
            ],
            [
                { id: 1, content: "我喜欢对别人有权威。", value: "1" },
                { id: 2, content: "我不介意听从命令。", value: "0" }
            ],
            [
                { id: 1, content: "我发现操纵别人很容易。", value: "1" },
                { id: 2, content: "当我发现自己在操纵别人时，我不喜欢这样。", value: "0" }
            ],
            [
                { id: 1, content: "我坚持要得到应得的尊重。", value: "1" },
                { id: 2, content: "我通常得到我应得的尊重。", value: "0" }
            ],
            [
                { id: 1, content: "我不特别喜欢炫耀我的身体。", value: "0" },
                { id: 2, content: "我喜欢炫耀我的身体。", value: "1" }
            ],
            [
                { id: 1, content: "我能像读书一样读懂人心。", value: "1" },
                { id: 2, content: "人有时很难理解。", value: "0" }
            ]
        ];

        return optionPairs[id - 1] || [];
    }
};