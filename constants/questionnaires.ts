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
            instructions: "SCL-90量表的测试对象需要根据自身近一周（或近一个月）的实际感受，对90个条目进行自我评定。每个条目分为5个等级，从\"无\"到\"极重\"分别计1到5分。测试过程中，被测者应仔细阅读每个条目，根据自己的实际情况选择最符合的选项。如果对某些条目不太确定，可以选择\"轻度\"或\"中度\"，但尽量避免过多的\"无\"选项，以免影响测试结果的准确性。",
            scoringMethod: [
                "总分：将90个条目的得分相加，得到总分。总分越高，表示心理症状越严重。",
                "平均分：总分除以90，得到平均分。平均分≥2，提示可能存在明显的心理问题。",
                "因子分：将每个因子所包含的条目得分相加，再除以该因子的条目数，得到该因子的平均分。因子分≥2，提示该因子所代表的心理症状较为突出。",
                "阳性项目数：得分≥2的条目数。阳性项目数越多，说明心理症状涉及的范围越广。",
                "阳性症状均分：将所有阳性项目（得分≥2）的得分相加，再除以阳性项目数。阳性症状均分越高，说明阳性症状的严重程度越高。"
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

