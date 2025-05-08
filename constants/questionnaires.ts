export interface Questionnaire {
    id: string;
    title: string;
    description: string;
    tags: string[];
    time: string;
    details?: {
        introduction?: string;
        questionCount?: string;
        evaluationTime?: string;
        instructions?: string;
        scoringMethod?: string[];
        dimensions?: Array<{ name: string; description: string }>;
        notes?: string[];
        references?: string[];
    };
    questions?: {
        content: string;
        factors?: string[];
    }[];
    factorMapping?: {
        [key: string]: number[];
    };
}

export const questionnaires: Questionnaire[] = [
    {
        id: "scl90",
        title: "SCL90量表",
        description: "用于评估个体心理症状和心理健康状况体",
        tags: ["自评量表", "精神症状"],
        time: "3-10分钟",
        details: {
            introduction: "SCL-90（Symptom Checklist-90）量表，即症状自评量表，是一种用于评估个体心理症状和心理健康状况的自评量表，广泛应用于医学、心理学、社会学等领域，用于筛查心理问题、评估治疗效果等。SCL-90量表由美国精神病学家德若伽提斯（L. R. Derogatis）于1975年编制。该量表包含90个项目，涵盖了躯体化、强迫症状、人际关系敏感、抑郁、焦虑、敌对、恐怖、偏执、精神病性及睡眠饮食等10个因子，能够全面评估个体在躯体和心理方面的症状表现。它适用于16岁以上的成年人，尤其在临床诊断、心理咨询、流行病学调查等方面具有重要价值。",
            questionCount: "90个",
            evaluationTime: "通常为10-20分钟",
            instructions: "SCL-90量表的测试对象需要根据自身近一周（或近一个月）的实际感受，对90个条目进行自我评定。每个条目分为5个等级，从\"无\"(1分)到\"极重\"(5分)分别计1到5分。测试过程中，被测者应仔细阅读每个条目，根据自己的实际情况选择最符合的选项。如果对某些条目不太确定，可以选择\"轻度\"或\"中度\"，但尽量避免过多的\"无\"选项，以免影响测试结果的准确性。",
            scoringMethod: [
                "总分：将90个条目的得分相加，得到总分。总分越高，表示心理症状越严重。",
                "平均分：总分除以90，得到平均分。平均分≥2，提示可能存在明显的心理问题。",
                "因子分：将每个因子所包含的条目得分相加，再除以该因子的条目数，得到该因子的平均分。因子分≥2，提示该因子所代表的心理症状较为突出。",
                "阳性项目数：得分≥2的条目数。阳性项目数越多，说明心理症状涉及的范围越广。",
                "阳性症状均分：将所有阳性项目（得分≥2）的得分相加，再除以阳性项目数。阳性症状均分越高，说明阳性症状的严重程度越高。",
                "严重程度评估：如果总分>160或阳性项目数>43，则可能存在严重的心理健康问题，建议寻求专业帮助。"
            ],
            dimensions: [
                { name: "躯体化", description: "主要反映身体不适和疼痛等症状，如头痛、背痛、四肢酸痛等。" },
                { name: "强迫症状", description: "反映强迫观念和强迫行为，如反复洗手、检查门窗等。" },
                { name: "人际关系敏感", description: "反映在人际交往中的敏感和不安，如担心他人对自己的看法等。" },
                { name: "抑郁", description: "反映情绪低落、兴趣减退、自我评价低等症状。" },
                { name: "焦虑", description: "反映紧张、不安、害怕等情绪体验。" },
                { name: "敌对", description: "反映愤怒、冲动、与人争执等行为倾向。" },
                { name: "恐怖", description: "反映恐惧、害怕等情绪，如害怕社交场合、害怕特定事物等。" },
                { name: "偏执", description: "反映多疑、敏感、固执等症状。" },
                { name: "精神病性", description: "反映幻觉、妄想、思维异常等精神病性症状。" },
                { name: "睡眠饮食", description: "反映睡眠和饮食情况，如失眠、食欲不振等。" }
            ],
            notes: [
                "测试环境：测试应在安静、舒适的环境中进行，避免外界干扰，确保被测者能够认真、准确地填写量表。",
                "指导语清晰：测试前应向被测者详细说明测试的目的、方法和填写要求，确保其理解并积极配合。",
                "诚实填写：被测者应根据自己的真实感受填写量表，避免夸大或隐瞒症状。",
                "避免疲劳：测试时间不宜过长，如果被测者感到疲劳或注意力不集中，可适当休息后再继续填写。",
                "专业解读：测试结果应由专业的心理咨询师或医生进行解读，避免自行诊断或过度解读。"
            ],
            references: [
                "德若伽提斯（L. R. Derogatis）. 症状自评量表（SCL-90）[M]. 北京：中国心理卫生杂志，1984.",
                "张明园. 精神科评定量表手册[M]. 长沙：湖南科学技术出版社，1993."
            ]
        },
        questions: [
            { content: "头痛", factors: ["躯体化"] },
            { content: "神经过敏，心中不踏实", factors: ["焦虑"] },
            { content: "头脑中有不必要的想法或字句盘旋", factors: ["强迫症状"] },
            { content: "头晕或晕倒", factors: ["躯体化"] },
            { content: "对异性的兴趣减退", factors: ["抑郁"] },
            { content: "对旁人责备求全", factors: ["人际关系敏感"] },
            { content: "感到别人能控制您的思想", factors: ["精神病性"] },
            { content: "责怪别人制造麻烦", factors: ["偏执"] },
            { content: "忘性大", factors: ["强迫症状"] },
            { content: "担心自己的衣饰整齐及仪态的端正", factors: ["强迫症状"] },
            { content: "容易烦恼和激动", factors: ["敌对"] },
            { content: "胸痛", factors: ["躯体化"] },
            { content: "害怕空旷的场所或街道", factors: ["恐怖"] },
            { content: "感到自己的精力下降，活动减慢", factors: ["抑郁"] },
            { content: "想结束自己的生命", factors: ["抑郁"] },
            { content: "听到旁人听不到的声音", factors: ["精神病性"] },
            { content: "发抖", factors: ["焦虑"] },
            { content: "感到大多数人都不可信任", factors: ["偏执"] },
            { content: "胃口不好", factors: ["睡眠饮食"] },
            { content: "容易哭泣", factors: ["抑郁"] },
            { content: "同异性相处时感到害羞不自在", factors: ["人际关系敏感"] },
            { content: "感到受骗，中了圈套或有人想抓住您", factors: ["偏执"] },
            { content: "无缘无故地突然感到害怕", factors: ["焦虑"] },
            { content: "自己不能控制地大发脾气", factors: ["敌对"] },
            { content: "怕单独出门", factors: ["恐怖"] },
            { content: "经常责怪自己", factors: ["抑郁"] },
            { content: "腰痛", factors: ["躯体化"] },
            { content: "感到难以完成任务", factors: ["强迫症状"] },
            { content: "感到孤独", factors: ["抑郁"] },
            { content: "感到苦闷", factors: ["抑郁"] },
            { content: "过分担忧", factors: ["抑郁"] },
            { content: "对事物不感兴趣", factors: ["抑郁"] },
            { content: "感到害怕", factors: ["焦虑"] },
            { content: "您的感情容易受到伤害", factors: ["人际关系敏感"] },
            { content: "旁人能知道您的私下想法", factors: ["精神病性"] },
            { content: "感到别人不理解您、不同情您", factors: ["人际关系敏感"] },
            { content: "感到人们对您不友好，不喜欢您", factors: ["人际关系敏感"] },
            { content: "做事必须做得很慢以保证做得正确", factors: ["强迫症状"] },
            { content: "心跳得很厉害", factors: ["焦虑"] },
            { content: "恶心或胃部不舒服", factors: ["躯体化"] },
            { content: "感到比不上他人", factors: ["人际关系敏感"] },
            { content: "肌肉酸痛", factors: ["躯体化"] },
            { content: "感到有人在监视您、谈论您", factors: ["偏执"] },
            { content: "难以入睡", factors: ["睡眠饮食"] },
            { content: "做事必须反复检查", factors: ["强迫症状"] },
            { content: "难以做出决定", factors: ["强迫症状"] },
            { content: "怕乘电车、公共汽车、地铁或火车", factors: ["恐怖"] },
            { content: "呼吸有困难", factors: ["躯体化"] },
            { content: "一阵阵发冷或发热", factors: ["躯体化"] },
            { content: "因为感到害怕而避开某些东西、场合或活动", factors: ["恐怖"] },
            { content: "脑子变空了", factors: ["强迫症状"] },
            { content: "身体发麻或刺痛", factors: ["躯体化"] },
            { content: "喉咙有梗塞感", factors: ["躯体化"] },
            { content: "感到前途没有希望", factors: ["抑郁"] },
            { content: "不能集中注意力", factors: ["强迫症状"] },
            { content: "感到身体的某一部分软弱无力", factors: ["躯体化"] },
            { content: "感到紧张或容易紧张", factors: ["焦虑"] },
            { content: "感到手或脚发重", factors: ["躯体化"] },
            { content: "想到死亡的事", factors: ["抑郁"] },
            { content: "吃得太多", factors: ["睡眠饮食"] },
            { content: "当别人看着您或谈论您时感到不自在", factors: ["人际关系敏感"] },
            { content: "有一些不属于您自己的想法", factors: ["精神病性"] },
            { content: "有想打人或伤害他人的冲动", factors: ["敌对"] },
            { content: "醒得太早", factors: ["睡眠饮食"] },
            { content: "必须反复洗手、点数", factors: ["强迫症状"] },
            { content: "睡得不稳不深", factors: ["睡眠饮食"] },
            { content: "有想摔坏或破坏东西的想法", factors: ["敌对"] },
            { content: "有一些别人没有的想法", factors: ["精神病性"] },
            { content: "感到对别人神经过敏", factors: ["人际关系敏感"] },
            { content: "在商店或电影院等人多的地方感到不自在", factors: ["恐怖"] },
            { content: "感到任何事情都很困难", factors: ["抑郁"] },
            { content: "一阵阵恐惧或惊恐", factors: ["焦虑"] },
            { content: "感到公共场合吃东西很不舒服", factors: ["恐怖"] },
            { content: "经常与人争论", factors: ["敌对"] },
            { content: "单独一人时神经很紧张", factors: ["焦虑"] },
            { content: "别人对您的成绩没有做出恰当的评价", factors: ["偏执"] },
            { content: "即使和别人在一起也感到孤单", factors: ["人际关系敏感"] },
            { content: "感到坐立不安心神不定", factors: ["焦虑"] },
            { content: "感到自己没有什么价值", factors: ["抑郁"] },
            { content: "感到熟悉的东西变成陌生或不像是真的", factors: ["精神病性"] },
            { content: "大叫或摔东西", factors: ["敌对"] },
            { content: "害怕会在公共场合晕倒", factors: ["恐怖"] },
            { content: "感到别人想占您的便宜", factors: ["偏执"] },
            { content: "为一些有关性的想法而很苦恼", factors: ["精神病性"] },
            { content: "您认为应该因为自己的过错而受到惩罚", factors: ["抑郁"] },
            { content: "感到要很快把事情做完", factors: ["强迫症状"] },
            { content: "感到自己的身体有严重问题", factors: ["躯体化"] },
            { content: "从未感到和其他人很亲近", factors: ["精神病性"] },
            { content: "感到自己有罪", factors: ["抑郁"] },
            { content: "感到自己的脑子有毛病", factors: ["精神病性"] }
        ],
        factorMapping: {
            "躯体化": [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58, 87],
            "强迫症状": [3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
            "人际关系敏感": [6, 21, 34, 36, 37, 41, 61, 69, 73, 79],
            "抑郁": [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
            "焦虑": [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],
            "敌对": [11, 24, 63, 67, 74, 81],
            "恐怖": [13, 25, 47, 50, 70, 75, 82],
            "偏执": [8, 18, 43, 68, 76, 83],
            "精神病性": [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],
            "睡眠饮食": [19, 44, 59, 60, 64, 66, 89]
        }
    },
    {
        id: "depression",
        title: "抑郁自评量表",
        description: "用于评估个体抑郁程度的量表",
        tags: ["抑郁", "自评量表"],
        time: "3-10分钟",
        details: {
            introduction: "抑郁自评量表（Self-Rating Depression Scale, SDS）是由美国心理学家宗(William W.K. Zung)于1965年编制的一种用于评估抑郁症状严重程度的自评工具。该量表简单易行，能够反映被测者抑郁症状的主观体验，广泛应用于临床筛查、科学研究和治疗效果评估。SDS量表聚焦于抑郁的情感、生理、心理和行为等方面的表现，通过自我报告方式获取数据，是目前国际上最常用的抑郁症评估工具之一。",
            questionCount: "20个",
            evaluationTime: "通常为5-10分钟",
            instructions: "被测者需要根据过去一周的感受，对20个条目进行自我评定。每个条目分为4个等级：\"没有或很少时间\"(1分)、\"小部分时间\"(2分)、\"相当多时间\"(3分)和\"绝大部分或全部时间\"(4分)。其中部分条目(第2、5、6、11、12、14、16、17、18、20题)采用反向计分。被测者应根据自己的实际情况选择最符合的选项，尽量避免中间值，以确保测试结果的准确性。",
            scoringMethod: [
                "粗分：将20个条目的得分相加，得到总粗分。",
                "标准分：粗分乘以1.25取整数部分，得到标准分（指数）。",
                "抑郁程度评定：标准分<50分为正常；50-59分为轻度抑郁；60-69分为中度抑郁；≥70分为重度抑郁。",
                "因子分析：可将20个条目分为4个因子进行分析，分别是情感症状、躯体障碍、心理障碍和精神运动障碍。"
            ],
            dimensions: [
                { name: "情感症状", description: "反映心境低落、悲观、易哭等情绪表现。" },
                { name: "躯体障碍", description: "包括睡眠问题、食欲改变、体重下降等生理症状。" },
                { name: "心理障碍", description: "包括烦躁、困惑、空虚感和自我否定等心理体验。" },
                { name: "精神运动障碍", description: "反映活动减少、言语减少和思维迟缓等表现。" }
            ],
            notes: [
                "测试环境应安静、私密，确保被测者能够专注且真实地回答问题。",
                "应向被测者说明，量表结果仅作为参考，不能替代专业诊断。",
                "如被测者有自杀意念或严重抑郁表现，应及时转介专业心理医生。",
                "测试结果宜与临床观察、病史和其他评估工具结合使用。",
                "对于文化程度较低的被测者，可能需要提供适当的解释和帮助。"
            ],
            references: [
                "Zung, W. W. K. (1965). A self-rating depression scale. Archives of General Psychiatry, 12, 63-70.",
                "汪向东, 王希林, 马弘. (1999). 心理卫生评定量表手册(增订版). 北京: 中国心理卫生杂志社.",
                "张明园. (1998). 精神科评定量表手册. 长沙: 湖南科学技术出版社."
            ]
        }
    },
    {
        id: "ocd",
        title: "强迫症量表",
        description: "评估强迫症状及其严重程度",
        tags: ["强迫", "自评量表"],
        time: "3-10分钟",
        details: {
            introduction: "耶鲁-布朗强迫症量表（Yale-Brown Obsessive Compulsive Scale, Y-BOCS）是由Wayne K. Goodman和Steven Rasmussen等人于1989年开发的评估工具，专门用于测量强迫症状的性质和严重程度。作为目前国际上最广泛使用的强迫症评估工具，Y-BOCS能够独立评估强迫观念和强迫行为的严重程度，不受具体症状内容的影响，可用于临床诊断、疗效评估和科学研究。该量表已被翻译成多种语言并在全球范围内得到验证。",
            questionCount: "10个核心项目（另有症状清单部分）",
            evaluationTime: "通常为15-20分钟",
            instructions: "Y-BOCS量表由症状清单和严重度量表两部分组成。症状清单用于筛查强迫观念和强迫行为的类型；严重度量表包含10个项目，分别评估强迫观念(1-5题)和强迫行为(6-10题)的严重程度。每个项目按0-4分5级评分，0分表示无症状，4分表示极重症状。评估应由训练有素的专业人员通过半结构化访谈完成，也可由患者进行自评（自评版本为OCI-R或YBOCS-SR）。",
            scoringMethod: [
                "总分：将10个核心项目得分相加，范围0-40分。",
                "分量表分：强迫观念分量表(1-5题)和强迫行为分量表(6-10题)各0-20分。",
                "严重程度判断：总分0-7分为无症状或轻微；8-15分为轻度；16-23分为中度；24-31分为重度；32-40分为极重度。",
                "临床意义：总分减少≥35%或降至14分以下通常被视为有效治疗反应；总分≤7分常被视为缓解标准。"
            ],
            dimensions: [
                { name: "强迫观念时间", description: "评估患者每天被强迫观念占据的时间。" },
                { name: "强迫观念干扰", description: "评估强迫观念对患者社会功能和日常活动的干扰程度。" },
                { name: "强迫观念痛苦", description: "评估强迫观念引起的焦虑或痛苦程度。" },
                { name: "抵抗强迫观念", description: "评估患者抵抗强迫观念的努力程度。" },
                { name: "控制强迫观念", description: "评估患者对强迫观念的控制能力。" },
                { name: "强迫行为时间", description: "评估患者每天花在强迫行为上的时间。" },
                { name: "强迫行为干扰", description: "评估强迫行为对患者社会功能和日常活动的干扰程度。" },
                { name: "强迫行为痛苦", description: "评估如果阻止强迫行为会引起的焦虑程度。" },
                { name: "抵抗强迫行为", description: "评估患者抵抗强迫行为的努力程度。" },
                { name: "控制强迫行为", description: "评估患者对强迫行为的控制能力。" }
            ],
            notes: [
                "评估应在安静、不受干扰的环境中进行，确保患者舒适和隐私。",
                "需要明确区分强迫症状与其他精神障碍症状，如妄想、焦虑等。",
                "评估时应考虑症状的变化和波动，建议定期重复评估以监测变化。",
                "自知力不佳的患者可能低估症状严重程度，需结合家属观察和临床判断。",
                "量表得分应与临床面谈、病史和功能评估等综合考量，而非孤立解释。"
            ],
            references: [
                "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006-1011.",
                "张明园, 朱佳. (2015). 精神科评定量表手册(第三版). 长沙: 湖南科学技术出版社.",
                "Storch, E. A., Rasmussen, S. A., Price, L. H., Larson, M. J., Murphy, T. K., & Goodman, W. K. (2010). Development and psychometric evaluation of the Yale-Brown Obsessive-Compulsive Scale—Second Edition. Psychological Assessment, 22(2), 223-232."
            ]
        }
    }
]; 