/**
 * 心理测评量表SEO关键词映射
 * Psychological Assessment Scale SEO Keywords Mapping
 */

export const QUESTIONNAIRE_KEYWORDS: Record<string, Record<string, string[]>> = {
  'zh': {
    'phq9': [
      'PHQ-9', 'PHQ9', '患者健康问卷', '抑郁量表', '抑郁测试', '抑郁症筛查', '抑郁自评', 
      '抑郁评估', '心理健康', '心理测评', '免费抑郁测试', '抑郁症状', '情绪测试',
      '心理筛查', '精神健康', '抑郁程度', '抑郁诊断', '心理咨询', '抑郁量表免费'
    ],
    'gad7': [
      'GAD-7', 'GAD7', '广泛性焦虑量表', '焦虑测试', '焦虑症筛查', '焦虑自评',
      '焦虑评估', '焦虑量表', '心理测评', '免费焦虑测试', '焦虑症状', '焦虑程度',
      '心理健康', '精神健康', '焦虑诊断', '心理筛查', '焦虑障碍', '焦虑量表免费'
    ],
    'bdi2': [
      'BDI-II', 'BDI2', '贝克抑郁量表', '抑郁量表', '抑郁测试', '抑郁评估', '抑郁自评',
      '心理测评', '免费抑郁测试', '抑郁症筛查', '抑郁程度', '心理健康', '精神健康',
      '抑郁诊断', '心理筛查', '抑郁症状', '情绪测试', '贝克量表', '抑郁量表免费'
    ],
    'scl90': [
      'SCL-90', 'SCL90', '症状自评量表', '心理症状', '心理测评', '心理健康筛查',
      '精神症状', '心理障碍', '心理评估', '综合心理测试', '心理问题', '心理筛查',
      '心理健康', '精神健康', '心理诊断', '心理状态', '心理测量', 'SCL-90量表免费'
    ],
    'ocd': [
      'Y-BOCS', 'YBOCS', '耶鲁-布朗强迫症量表', '强迫症测试', '强迫症筛查', '强迫症量表',
      '强迫症评估', '强迫症自评', '强迫症状', '心理测评', '免费强迫症测试', '强迫行为',
      '强迫思维', '心理健康', '精神健康', '强迫症诊断', '心理筛查', '强迫障碍'
    ],
    'pss10': [
      'PSS-10', 'PSS10', '感知压力量表', '压力测试', '压力评估', '压力量表', '压力筛查',
      '心理压力', '压力管理', '心理测评', '免费压力测试', '压力程度', '心理健康',
      '精神健康', '压力诊断', '心理筛查', '压力症状', '压力水平', '压力量表免费'
    ],
    'dass21': [
      'DASS-21', 'DASS21', '抑郁焦虑压力量表', '抑郁焦虑测试', '心理测评', '抑郁测试',
      '焦虑测试', '压力测试', '心理健康', '精神健康', '心理筛查', '心理评估',
      '综合心理测试', '情绪测试', '心理状态', '心理问题', 'DASS量表免费'
    ],
    'sds': [
      'SDS', '抑郁自评量表', '祖氏抑郁量表', '抑郁测试', '抑郁评估', '抑郁筛查',
      '抑郁自评', '心理测评', '免费抑郁测试', '抑郁症状', '抑郁程度', '心理健康',
      '精神健康', '抑郁诊断', '心理筛查', '情绪测试', '抑郁量表免费'
    ],
    'isi': [
      'ISI', '失眠严重指数', '失眠量表', '失眠测试', '失眠评估', '失眠筛查', '睡眠质量',
      '睡眠障碍', '失眠症', '心理测评', '免费失眠测试', '睡眠问题', '心理健康',
      '精神健康', '失眠诊断', '心理筛查', '睡眠评估', '失眠量表免费'
    ]
  },
  'en': {
    'phq9': [
      'PHQ-9', 'PHQ9', 'Patient Health Questionnaire', 'depression scale', 'depression test', 
      'depression screening', 'depression assessment', 'mental health', 'psychological assessment',
      'free depression test', 'depressive symptoms', 'mood test', 'mental health screening',
      'depression diagnosis', 'psychological screening', 'depression severity', 'mental wellness'
    ],
    'gad7': [
      'GAD-7', 'GAD7', 'Generalized Anxiety Disorder', 'anxiety scale', 'anxiety test',
      'anxiety screening', 'anxiety assessment', 'mental health', 'psychological assessment',
      'free anxiety test', 'anxiety symptoms', 'anxiety disorder', 'mental health screening',
      'anxiety diagnosis', 'psychological screening', 'anxiety severity', 'mental wellness'
    ],
    'bdi2': [
      'BDI-II', 'BDI2', 'Beck Depression Inventory', 'depression scale', 'depression test',
      'depression assessment', 'mental health', 'psychological assessment', 'free depression test',
      'depression screening', 'depressive symptoms', 'mood assessment', 'mental health screening',
      'depression diagnosis', 'psychological screening', 'Beck scale', 'depression severity'
    ],
    'scl90': [
      'SCL-90', 'SCL90', 'Symptom Checklist', 'psychological symptoms', 'mental health assessment',
      'psychological screening', 'mental health', 'psychiatric symptoms', 'psychological evaluation',
      'comprehensive mental health test', 'psychological problems', 'mental health screening',
      'psychological diagnosis', 'mental state', 'psychological measurement', 'symptom assessment'
    ],
    'ocd': [
      'Y-BOCS', 'YBOCS', 'Yale-Brown Obsessive Compulsive Scale', 'OCD test', 'OCD screening',
      'obsessive compulsive disorder', 'OCD assessment', 'OCD symptoms', 'mental health',
      'psychological assessment', 'free OCD test', 'compulsive behavior', 'obsessive thoughts',
      'OCD diagnosis', 'psychological screening', 'obsessive compulsive symptoms'
    ],
    'pss10': [
      'PSS-10', 'PSS10', 'Perceived Stress Scale', 'stress test', 'stress assessment',
      'stress screening', 'psychological stress', 'stress management', 'mental health',
      'psychological assessment', 'free stress test', 'stress level', 'stress symptoms',
      'stress diagnosis', 'psychological screening', 'stress evaluation', 'stress measurement'
    ],
    'dass21': [
      'DASS-21', 'DASS21', 'Depression Anxiety Stress Scales', 'depression anxiety test',
      'mental health assessment', 'depression test', 'anxiety test', 'stress test',
      'psychological assessment', 'mental health screening', 'comprehensive mental health test',
      'mood assessment', 'emotional assessment', 'psychological evaluation', 'mental wellness'
    ],
    'sds': [
      'SDS', 'Self-Rating Depression Scale', 'Zung Depression Scale', 'depression test',
      'depression assessment', 'depression screening', 'mental health', 'psychological assessment',
      'free depression test', 'depressive symptoms', 'depression severity', 'mental health screening',
      'depression diagnosis', 'psychological screening', 'mood assessment', 'depression scale'
    ],
    'isi': [
      'ISI', 'Insomnia Severity Index', 'insomnia scale', 'sleep test', 'insomnia test',
      'sleep assessment', 'sleep quality', 'sleep disorder', 'insomnia', 'mental health',
      'psychological assessment', 'free insomnia test', 'sleep problems', 'insomnia diagnosis',
      'psychological screening', 'sleep evaluation', 'insomnia assessment', 'sleep screening'
    ]
  }
};

/**
 * 通用心理健康关键词（强调免费、权威、AI分析）
 * General Mental Health Keywords (emphasizing free, authoritative, AI analysis)
 */
export const GENERAL_MENTAL_HEALTH_KEYWORDS: Record<string, string[]> = {
  'zh': [
    '免费心理测试', '免费心理评估', '免费心理筛查', '权威心理量表', '专业心理测评', 
    'AI心理分析', 'AI智能分析', '人工智能心理测评', '免费AI分析', '权威心理诊断',
    '标准化心理量表', '临床心理评估', '专业免费测试', '国际标准量表', '科学心理测评',
    '心理健康', '心理测评', '心理筛查', '心理评估', '精神健康', '心理量表'
  ],
  'en': [
    'free mental health test', 'free psychological assessment', 'free mental health screening', 
    'authoritative psychological scale', 'professional mental health assessment', 'AI psychological analysis',
    'AI-powered mental health', 'artificial intelligence psychology', 'free AI analysis', 'clinical assessment',
    'standardized psychological test', 'evidence-based assessment', 'professional free test', 'validated scale',
    'mental health', 'psychological evaluation', 'mental wellness', 'psychiatric assessment'
  ]
};

/**
 * 获取指定量表的关键词
 * Get keywords for specific questionnaire
 */
export function getQuestionnaireKeywords(questionnaireId: string, locale: string): string[] {
  const specificKeywords = QUESTIONNAIRE_KEYWORDS[locale]?.[questionnaireId] || [];
  const generalKeywords = GENERAL_MENTAL_HEALTH_KEYWORDS[locale] || [];
  
  return [...specificKeywords, ...generalKeywords.slice(0, 5)];
}

/**
 * 获取所有支持的量表ID
 * Get all supported questionnaire IDs
 */
export const SUPPORTED_QUESTIONNAIRE_IDS = [
  'phq9', 'gad7', 'bdi2', 'scl90', 'ocd', 'pss10', 'dass21', 'sds', 'isi'
] as const;

export type QuestionnaireId = typeof SUPPORTED_QUESTIONNAIRE_IDS[number];