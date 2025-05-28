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
        resultInterpretation?: {
            normal: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            mild: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            moderate: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            severe: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
            extreme?: {
                range: string;
                explanation: string;
                suggestions: string[];
            };
        };
    };
    questions?: {
        content: string;
        factors?: string[];
        options?: { value: string; text: string }[];
    }[];
    factorMapping?: {
        [key: string]: number[];
    };
}

export const questionnaires: Questionnaire[] = [
    {
        id: "scl90",
        title: "SCL-90 Scale",
        description: "Used to assess individual psychological symptoms and mental health status",
        tags: ["Self-assessment Scale", "Psychiatric Symptoms"],
        time: "3-10 minutes",
        details: {
            introduction: "The SCL-90 (Symptom Checklist-90) scale, also known as the Symptom Self-Assessment Scale, is a self-report tool used to evaluate individual psychological symptoms and mental health status. It is widely used in medicine, psychology, and sociology for screening psychological problems and assessing treatment effectiveness. Developed by American psychiatrist L. R. Derogatis in 1975, the scale contains 90 items covering 10 factors: somatization, obsessive-compulsive symptoms, interpersonal sensitivity, depression, anxiety, hostility, phobic anxiety, paranoid ideation, psychoticism, and sleep/eating disorders. It provides a comprehensive assessment of physical and psychological symptoms and is suitable for adults over 16 years old, particularly valuable in clinical diagnosis, psychological counseling, and epidemiological research.",
            questionCount: "90 items",
            evaluationTime: "Typically 10-20 minutes",
            instructions: "The test subject needs to self-assess 90 items based on their actual feelings in the past week (or month). Each item is rated on a 5-point scale from 'none' to 'extremely severe', scored from 1 to 5. The subject should carefully read each item and choose the most appropriate option based on their actual situation. If uncertain about some items, they can choose 'mild' or 'moderate', but should avoid too many 'none' options to ensure the accuracy of the test results.",
            scoringMethod: [
                "Total score: Sum of all 90 items. Higher scores indicate more severe psychological symptoms.",
                "Average score: Total score divided by 90. An average score ≥2 suggests significant psychological problems.",
                "Factor scores: Sum of items in each factor divided by the number of items in that factor. A factor score ≥2 indicates prominent symptoms in that factor.",
                "Number of positive items: Number of items with scores ≥2. More positive items indicate a wider range of psychological symptoms.",
                "Average score of positive symptoms: Sum of all positive items (scores ≥2) divided by the number of positive items. Higher scores indicate more severe positive symptoms."
            ],
            dimensions: [
                { name: "Somatization", description: "Mainly reflects physical discomfort and pain symptoms, such as headaches, back pain, and limb soreness." },
                { name: "Obsessive-Compulsive Symptoms", description: "Reflects obsessive thoughts and compulsive behaviors, such as repeated hand washing and checking doors and windows." },
                { name: "Interpersonal Sensitivity", description: "Reflects sensitivity and unease in interpersonal relationships, such as worrying about others' opinions." },
                { name: "Depression", description: "Reflects symptoms such as low mood, loss of interest, and low self-esteem." },
                { name: "Anxiety", description: "Reflects emotional experiences such as tension, unease, and fear." },
                { name: "Hostility", description: "Reflects behavioral tendencies such as anger, impulsiveness, and arguments." },
                { name: "Phobic Anxiety", description: "Reflects fear and anxiety, such as fear of social situations or specific things." },
                { name: "Paranoid Ideation", description: "Reflects symptoms such as suspicion, sensitivity, and stubbornness." },
                { name: "Psychoticism", description: "Reflects psychotic symptoms such as hallucinations, delusions, and abnormal thinking." },
                { name: "Sleep/Eating Disorders", description: "Reflects sleep and eating conditions, such as insomnia and loss of appetite." }
            ],
            notes: [
                "Testing environment: The test should be conducted in a quiet and comfortable environment, free from external interference, to ensure the subject can fill out the scale carefully and accurately.",
                "Clear instructions: Before the test, the purpose, method, and requirements should be explained in detail to ensure the subject understands and cooperates.",
                "Honest responses: The subject should fill out the scale based on their true feelings, avoiding exaggeration or concealment of symptoms.",
                "Avoid fatigue: The test time should not be too long. If the subject feels tired or loses concentration, they can take a break before continuing.",
                "Professional interpretation: The test results should be interpreted by a professional psychological counselor or doctor, avoiding self-diagnosis or over-interpretation."
            ],
            references: [
                "Derogatis, L. R. (1984). Symptom Checklist-90 (SCL-90). Beijing: Chinese Mental Health Journal.",
                "Zhang, M. Y. (1993). Handbook of Psychiatric Rating Scales. Changsha: Hunan Science and Technology Press."
            ]
        }
    },
    {
        id: "depression",
        title: "Self-Rating Depression Scale",
        description: "Used to assess the degree of depression in individuals",
        tags: ["Depression", "Self-assessment Scale"],
        time: "3-10 minutes",
        details: {
            introduction: "The Self-Rating Depression Scale (SDS) was developed by American psychologist William W.K. Zung in 1965 as a self-assessment tool to evaluate the severity of depressive symptoms. This simple and easy-to-use scale reflects the subjective experience of depressive symptoms and is widely used in clinical screening, scientific research, and treatment effectiveness evaluation. The SDS focuses on emotional, physiological, psychological, and behavioral aspects of depression, obtaining data through self-reporting, making it one of the most commonly used depression assessment tools internationally.",
            questionCount: "20 items",
            evaluationTime: "Typically 5-10 minutes",
            instructions: "The subject needs to self-assess 20 items based on their feelings over the past week. Each item is rated on a 4-point scale: 'none or a little of the time' (1 point), 'some of the time' (2 points), 'a good part of the time' (3 points), and 'most or all of the time' (4 points). Some items (items 2, 5, 6, 11, 12, 14, 16, 17, 18, 20) are reverse scored. The subject should choose the most appropriate option based on their actual situation, avoiding middle values to ensure the accuracy of the test results.",
            scoringMethod: [
                "Raw score: Sum of all 20 items.",
                "Standard score: Multiply the raw score by 1.25 and take the integer part to get the standard score (index).",
                "Depression severity assessment: Standard score <50 is normal; 50-59 indicates mild depression; 60-69 indicates moderate depression; ≥70 indicates severe depression.",
                "Factor analysis: The 20 items can be divided into 4 factors: emotional symptoms, somatic disorders, psychological disorders, and psychomotor disorders."
            ],
            dimensions: [
                { name: "Emotional Symptoms", description: "Reflects emotional manifestations such as low mood, pessimism, and tearfulness." },
                { name: "Somatic Disorders", description: "Includes physiological symptoms such as sleep problems, appetite changes, and weight loss." },
                { name: "Psychological Disorders", description: "Includes psychological experiences such as irritability, confusion, emptiness, and self-denial." },
                { name: "Psychomotor Disorders", description: "Reflects reduced activity, decreased speech, and slowed thinking." }
            ],
            notes: [
                "The testing environment should be quiet and private to ensure the subject can focus and answer truthfully.",
                "The subject should be informed that the scale results are for reference only and cannot replace professional diagnosis.",
                "If the subject has suicidal thoughts or severe depressive symptoms, they should be referred to a professional psychiatrist immediately.",
                "Test results should be used in conjunction with clinical observation, medical history, and other assessment tools.",
                "For subjects with lower education levels, appropriate explanations and assistance may be needed."
            ],
            references: [
                "Zung, W. W. K. (1965). A self-rating depression scale. Archives of General Psychiatry, 12, 63-70.",
                "Wang, X. D., Wang, X. L., & Ma, H. (1999). Handbook of Mental Health Rating Scales (Revised Edition). Beijing: Chinese Mental Health Journal Press.",
                "Zhang, M. Y. (1998). Handbook of Psychiatric Rating Scales. Changsha: Hunan Science and Technology Press."
            ]
        }
    },
    {
        id: "ocd",
        title: "Obsessive-Compulsive Disorder Scale",
        description: "Assesses obsessive-compulsive symptoms and their severity",
        tags: ["Obsession", "Self-assessment Scale"],
        time: "3-10 minutes",
        details: {
            introduction: "The Yale-Brown Obsessive Compulsive Scale (Y-BOCS) was developed by Wayne K. Goodman and Steven Rasmussen in 1989 as an assessment tool specifically designed to measure the nature and severity of obsessive-compulsive symptoms. As the most widely used OCD assessment tool internationally, the Y-BOCS independently evaluates the severity of obsessions and compulsions, unaffected by specific symptom content, and is used for clinical diagnosis, treatment effectiveness evaluation, and scientific research. The scale has been translated into multiple languages and validated worldwide.",
            questionCount: "10 core items (plus a symptom checklist)",
            evaluationTime: "Typically 15-20 minutes",
            instructions: "The Y-BOCS consists of two parts: a symptom checklist and a severity scale. The symptom checklist screens for types of obsessions and compulsions; the severity scale contains 10 items assessing the severity of obsessions (items 1-5) and compulsions (items 6-10). Each item is rated on a 5-point scale from 0 (no symptoms) to 4 (extremely severe symptoms). The assessment should be conducted by trained professionals through semi-structured interviews, or self-administered by patients (self-report versions include OCI-R or YBOCS-SR).",
            scoringMethod: [
                "Total score: Sum of all 10 core items, ranging from 0-40.",
                "Subscale scores: Obsession subscale (items 1-5) and compulsion subscale (items 6-10), each ranging from 0-20.",
                "Severity assessment: Total score 0-7 indicates no or minimal symptoms; 8-15 indicates mild; 16-23 indicates moderate; 24-31 indicates severe; 32-40 indicates extreme severity.",
                "Clinical significance: A reduction of ≥35% in total score or a score below 14 is usually considered an effective treatment response; a total score ≤7 is often considered remission criteria."
            ],
            dimensions: [
                { name: "Time Spent on Obsessions", description: "Assesses the amount of time per day the patient is occupied by obsessive thoughts." },
                { name: "Interference from Obsessions", description: "Assesses the degree to which obsessions interfere with the patient's social functioning and daily activities." },
                { name: "Distress from Obsessions", description: "Assesses the level of anxiety or distress caused by obsessive thoughts." },
                { name: "Resistance to Obsessions", description: "Assesses the patient's efforts to resist obsessive thoughts." },
                { name: "Control over Obsessions", description: "Assesses the patient's ability to control obsessive thoughts." },
                { name: "Time Spent on Compulsions", description: "Assesses the amount of time per day the patient spends on compulsive behaviors." },
                { name: "Interference from Compulsions", description: "Assesses the degree to which compulsions interfere with the patient's social functioning and daily activities." },
                { name: "Distress from Compulsions", description: "Assesses the level of anxiety if compulsive behaviors are prevented." },
                { name: "Resistance to Compulsions", description: "Assesses the patient's efforts to resist compulsive behaviors." },
                { name: "Control over Compulsions", description: "Assesses the patient's ability to control compulsive behaviors." }
            ],
            notes: [
                "The assessment should be conducted in a quiet, undisturbed environment to ensure patient comfort and privacy.",
                "It is necessary to clearly distinguish obsessive-compulsive symptoms from other psychiatric symptoms, such as delusions and anxiety.",
                "The assessment should consider symptom changes and fluctuations, and regular reassessments are recommended to monitor changes.",
                "Patients with poor insight may underestimate symptom severity, requiring combined family observations and clinical judgment.",
                "Scale scores should be considered in conjunction with clinical interviews, medical history, and functional assessments, rather than interpreted in isolation."
            ],
            references: [
                "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006-1011.",
                "Zhang, M. Y., & Zhu, J. (2015). Handbook of Psychiatric Rating Scales (3rd Edition). Changsha: Hunan Science and Technology Press.",
                "Storch, E. A., Rasmussen, S. A., Price, L. H., Larson, M. J., Murphy, T. K., & Goodman, W. K. (2010). Development and psychometric evaluation of the Yale-Brown Obsessive-Compulsive Scale—Second Edition. Psychological Assessment, 22(2), 223-232."
            ]
        }
    }
];

export const questionnairesZh: Questionnaire[] = [
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
            { content: "即使和别人在一起也感到孤单", factors: ["抑郁"] },
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
        tags: ["抑郁", "自评量表", "简便", "最常用"],
        time: "5-10分钟",
        details: {
            introduction: "抑郁自评量表（Self-Rating Depression Scale, SDS）是由美国杜克大学William W.K.Zung于1965年编制的一种用于评估抑郁症状严重程度的自评工具。该量表简单易行，能够反映被测者抑郁症状的主观体验，广泛应用于临床筛查、科学研究和治疗效果评估。SDS量表聚焦于抑郁的情感、生理、心理和行为等方面的表现，通过自我报告方式获取数据，是目前国际上最常用的抑郁症评估工具之一。",
            questionCount: "20个",
            evaluationTime: "通常为5-10分钟",
            instructions: "被测者需要根据过去一周的感受，对20个条目进行自我评定。每个条目分为4个等级：\"从无或偶尔\"(1分)、\"有时\"(2分)、\"经常\"(3分)和\"总是如此\"(4分)。其中部分条目(第2、5、6、11、12、14、16、17、18、20题)采用反向计分。被测者应根据自己的实际情况选择最符合的选项，尽量避免中间值，以确保测试结果的准确性。",
            scoringMethod: [
                "粗分：将20个条目的得分相加，得到总粗分。",
                "标准分：粗分乘以1.25取整数部分，得到标准分（指数）。",
                "抑郁程度评定：标准分<53分为正常；53-62分为轻度抑郁；63-72分为中度抑郁；>72分为重度抑郁。",
                "因子分析：可将20个条目分为4个因子进行分析，分别是情感症状、躯体障碍、心理障碍和精神运动障碍。"
            ],
            dimensions: [
                { name: "情感症状", description: "反映心境低落、悲观、易哭等情绪表现。" },
                { name: "躯体障碍", description: "包括睡眠问题、食欲改变、体重下降等生理症状。" },
                { name: "心理障碍", description: "包括烦躁、困惑、空虚感和自我否定等心理体验。" },
                { name: "精神运动障碍", description: "反映活动减少、言语减少和思维迟缓等表现。" }
            ],
            resultInterpretation: {
                normal: {
                    range: "<53",
                    explanation: "被测试者无抑郁体验。心情明朗,轻松愉快,对自己身体和情绪健康有良好的感受,对自己的现状感到满意。因此,能尽心尽力、愉快地进行工作和学习,并始终保持乐观向上的心态。",
                    suggestions: ["被试无抑郁体验，希望保持。被试的生活很开心,也很轻松,感到生活充实,健康状况良好,对未来充满希望,如果条件许可,被试可以了解一些必要的心理知识,为今后保持健康的心理奠定基础。"]
                },
                mild: {
                    range: "53-62",
                    explanation: "通过测试表明被试属于轻度抑郁。偶尔有些郁闷、压抑。被测者在遇到挫折和烦恼时,会出现暂时的情绪低落。",
                    suggestions: [
                        "不要掩饰自己的情绪、过多地压抑自己,要学会倾诉和宣泄等方式来进行自我调节,如写日记,散步或者找朋友聊聊天,努力使自己保持乐观、向上的心态。",
                        "也可在相关心理学知识的指导下,培养积极的认知方式,改变对自己的认识,全面认识自我,悦纳自我,善待自我。",
                        "定期复查，若无改善需做心理咨询或转介专业门诊。"
                    ]
                },
                moderate: {
                    range: "63-72",
                    explanation: "被测试者体验到了较轻程度的抑郁感受,但时间比较持久。被测试者可能会感到心情不太舒畅、比较暗淡、沮丧、消沉；对于各种活动的兴趣发生了减退,但并未完全丧失；能坚持本职工作,但无热情,在面对困难时很难采取积极的行动,思维能力有所下降,工作效率可能略有减退；对前途感到悲观失望,但还不至于绝望；自信心下降,但还愿意接受他人的鼓励,没有特别明显的自我责备和自我怪罪感；在社会交往中的活跃程度有所下降,不能与他人进行很好地情感沟通；精神状态不好,能感觉到疲乏及各种伴随的躯体症状,如睡眠不好,食欲下降,性欲有所降低；可能有一些消极观念,顾虑重重。",
                    suggestions: [
                        "懂得放松。必要时放下手头的工作,去休息休息。可以到海滨去休假,享受大自然的阳光雨露,并对自己的问题进行静心思考。",
                        "建立信心。无论抑郁状况如何,被测者都应努力建立信心,相信这一问题可以得到妥善解决,不能自怨自艾。",
                        "树立生活目标。在感到抑郁难当时,不妨想一想今后的生活目标,并冷静下来为目标的实现而做出详细的计划。",
                        "寻求周围人的支持。不妨向亲人和朋友诉说自己的苦恼,他们一定会乐意对被试提供帮助。",
                        "求助于心理咨询或者专科门诊。中度的抑郁有可能在心理门诊中,在专业心理学家的帮助下获得解决。"
                    ]
                },
                severe: {
                    range: ">72",
                    explanation: "被测试者有比较明显的抑郁状况,对自己的身体和情绪健康感受糟糕,对自己的现状不满意,并经常担忧,对任何事情都没有兴趣,对令人愉快的事情感到麻木,不愿意活动。被测试者思维混乱,常有失败感,自尊水平低,对生活没有信心,感到悲观绝望、自厌、自责、自杀意向、痛哭、易激惹、社会退缩、犹豫不决、情绪矛盾、行为迟缓。也会伴随有比较强烈的躯体症状,如胸闷、头痛、心动过速睡眠障碍、食欲减退、进食障碍、体重减轻等。想要摆脱苦海,甚出现过自杀冲动或者尝试。",
                    suggestions: ["重度抑郁患者容易产生自杀念头，一定要高度重视。转介专科心理门诊，通知学校和家长，注意心理咨询保密协议。"]
                }
            },
            notes: [
                "测试环境应安静、私密，确保被测者能够专注且真实地回答问题。",
                "应向被测者说明，量表结果仅作为参考，不能替代专业诊断。",
                "如被测者有自杀意念或严重抑郁表现，应及时转介专业心理医生。",
                "测试结果宜与临床观察、病史和其他评估工具结合使用。",
                "对于文化程度较低的被测者，可能需要提供适当的解释和帮助。",
                "适用范围：适用于各种职业、文化阶层、年龄段的正常人或各类精神病人。但文化程度或智力水平较低者不能进行自评。"
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
        title: "Yale-Brown强迫症状量表",
        description: "评估强迫症状及其严重程度",
        tags: ["强迫", "自评量表", "简便"],
        time: "5-10分钟",
        details: {
            introduction: "耶鲁-布朗强迫症量表（Yale-Brown Obsessive Compulsive Scale, Y-BOCS）是由美国GOODMAN等人根据DSM-III-R诊断标准制定的专门测定强迫症状严重程度的量表，是临床上使用的评定强迫症的主要量表之一。整个量表共10个项目，用于反映测试者的强迫思维和强迫行为，下面请根据最近一周的情绪进行选择。",
            questionCount: "10个核心项目",
            evaluationTime: "通常为5-10分钟",
            instructions: "Y-BOCS量表包含10个项目，分别评估强迫观念(1-5题)和强迫行为(6-10题)的严重程度。每个项目按0-4分5级评分，0分表示无症状，4分表示极重症状。",
            scoringMethod: [
                "总分：将10个核心项目得分相加，范围0-40分。",
                "分量表分：强迫观念分量表(1-5题)和强迫行为分量表(6-10题)各0-20分。",
                "严重程度判断：总分0-7分为正常；8-15分为轻微强迫症状；16-23分为中度强迫症状；24-31分为严重强迫症状；32-40分为极严重强迫症状。"
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
            resultInterpretation: {
                normal: {
                    explanation: "经过测验您【正常】，希望您继续保持良好的心情。",
                    suggestions: ["保持健康的生活方式", "注意心理卫生", "积极参与社交活动"],
                    range: "0-7分"
                },
                mild: {
                    explanation: "经过检测您有【轻微强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                    suggestions: ["学习简单的放松技术", "尝试正念冥想", "了解强迫症的知识", "如果症状持续，考虑寻求专业咨询"],
                    range: "8-15分"
                },
                moderate: {
                    explanation: "经过检测您有【中度强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                    suggestions: ["建议寻求专业心理咨询", "学习认知行为疗法技术", "规律生活，保持充足睡眠", "告知亲友您的情况以获得支持"],
                    range: "16-23分"
                },
                severe: {
                    explanation: "经过检测您有【严重强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                    suggestions: ["强烈建议立即寻求专业精神科或心理健康专家帮助", "可能需要药物治疗和心理治疗相结合", "建立支持系统", "避免过度压力和刺激"],
                    range: "24-31分"
                },
                extreme: {
                    explanation: "经过检测您有【极严重强迫症状】，为了您和家人的幸福，建议您联系我们，进行专业的检测。",
                    suggestions: ["需要立即的专业医疗干预", "可能需要住院治疗", "综合治疗方案包括药物、心理治疗和支持性照顾", "家人需了解病情并提供密切支持"],
                    range: "32-40分"
                }
            },
            notes: [
                "评估应在安静、不受干扰的环境中进行，确保测试者舒适和隐私。",
                "需要明确区分强迫症状与其他精神障碍症状。",
                "评估时应考虑症状的变化和波动，建议定期重复评估以监测变化。"
            ],
            references: [
                "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006-1011.",
                "张明园, 朱佳. (2015). 精神科评定量表手册(第三版). 长沙: 湖南科学技术出版社."
            ]
        },
        questions: [
            {
                content: "一天之中，强迫性意念占据您多少时间？",
                options: [
                    { value: "0", text: "0小时，分数:0" },
                    { value: "1", text: "0-1小时，分数:1" },
                    { value: "2", text: "1-3小时，分数:2" },
                    { value: "3", text: "3-8小时，分数:3" },
                    { value: "4", text: "8小时以上，分数:4" }
                ]
            },
            {
                content: "强迫性意念，对您日常生活或工作的影响程度？",
                options: [
                    { value: "0", text: "没有影响，分数:0" },
                    { value: "1", text: "轻微影响，分数:1" },
                    { value: "2", text: "中度影响，分数:2" },
                    { value: "3", text: "严重影响，分数:3" },
                    { value: "4", text: "完全无法工作/从事日常生活，分数:4" }
                ]
            },
            {
                content: "强迫性意念发生时，对您造成多大的困扰？",
                options: [
                    { value: "0", text: "没有困扰，分数:0" },
                    { value: "1", text: "轻微，分数:1" },
                    { value: "2", text: "中等，分数:2" },
                    { value: "3", text: "严重，分数:3" },
                    { value: "4", text: "非常严重，一直持续痛苦，分数:4" }
                ]
            },
            {
                content: "强迫性意念发生时，您会在多少方面去抗拒它？",
                options: [
                    { value: "0", text: "尽全力抗拒，分数:0" },
                    { value: "1", text: "经常大部分强迫意念，分数:1" },
                    { value: "2", text: "抗拒部分强迫意念，分数:2" },
                    { value: "3", text: "会屈服，但不情愿，分数:3" },
                    { value: "4", text: "心甘情愿不抗拒，分数:4" }
                ]
            },
            {
                content: "您可以控制您的强迫性意念？",
                options: [
                    { value: "0", text: "完全可以，分数:0" },
                    { value: "1", text: "大部分可以，分数:1" },
                    { value: "2", text: "通常可以，分数:2" },
                    { value: "3", text: "很难控制，分数:3" },
                    { value: "4", text: "无法控制，分数:4" }
                ]
            },
            {
                content: "一天之中，强迫行为占据您多少时间？",
                options: [
                    { value: "0", text: "0小时，分数:0" },
                    { value: "1", text: "0-1小时，分数:1" },
                    { value: "2", text: "1-3小时，分数:2" },
                    { value: "3", text: "3-8小时，分数:3" },
                    { value: "4", text: "8小时以上，分数:4" }
                ]
            },
            {
                content: "强迫行为，对您日常生活或工作的影响程度？",
                options: [
                    { value: "0", text: "没有影响，分数:0" },
                    { value: "1", text: "轻微影响，分数:1" },
                    { value: "2", text: "中度影响，分数:2" },
                    { value: "3", text: "严重影响，分数:3" },
                    { value: "4", text: "完全无法工作/从事日常生活，分数:4" }
                ]
            },
            {
                content: "强迫行为发生时，对您造成多大的困扰？",
                options: [
                    { value: "0", text: "没有困扰，分数:0" },
                    { value: "1", text: "轻微，分数:1" },
                    { value: "2", text: "中等，分数:2" },
                    { value: "3", text: "严重，分数:3" },
                    { value: "4", text: "非常严重，一直持续痛苦，分数:4" }
                ]
            },
            {
                content: "当强迫行为发生时，您会在多少方面去抗拒它？",
                options: [
                    { value: "0", text: "尽全力抗拒，分数:0" },
                    { value: "1", text: "经常大部分强迫行为，分数:1" },
                    { value: "2", text: "抗拒部分强迫行为，分数:2" },
                    { value: "3", text: "会屈服，但不情愿，分数:3" },
                    { value: "4", text: "心甘情愿不抗拒，分数:4" }
                ]
            },
            {
                content: "您可以控制您的强迫行为吗？",
                options: [
                    { value: "0", text: "完全可以，分数:0" },
                    { value: "1", text: "大部分可以，分数:1" },
                    { value: "2", text: "通常可以，分数:2" },
                    { value: "3", text: "很难控制，分数:3" },
                    { value: "4", text: "无法控制，分数:4" }
                ]
            }
        ]
    }
];

