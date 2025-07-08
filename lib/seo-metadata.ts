import { Questionnaire } from '@/types';
import { getQuestionnaireKeywords } from '@/constants/seo-keywords';

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export function generateQuestionnaireMetadata(questionnaire: Questionnaire, locale: string): SEOMetadata {
  const isZh = locale === 'zh';
  const keywords = getQuestionnaireKeywords(questionnaire.id, locale);
  
  // 获取量表的专业描述
  const introduction = questionnaire.details.introduction;
  const questionCount = questionnaire.details.questionCount;
  const evaluationTime = questionnaire.details.evaluationTime;
  
  // 构建专业标题
  const title = isZh 
    ? `${questionnaire.title} - 专业心理测评详情 | LXScale免费在线心理量表`
    : `${questionnaire.title} - Professional Assessment Details | LXScale Free Mental Health Tests`;
  
  // 构建详细描述
  const description = isZh
    ? `${questionnaire.title}详细介绍和使用指南。${introduction.substring(0, 100)}...包含${questionCount}个问题，约需${evaluationTime}。专业、免费、保护隐私的心理健康测评工具。`
    : `Comprehensive guide to ${questionnaire.title}. ${introduction.substring(0, 100)}...Contains ${questionCount} questions, takes approximately ${evaluationTime}. Professional, free, and privacy-protected mental health assessment tool.`;
  
  // OpenGraph 标题（稍短）
  const ogTitle = isZh
    ? `${questionnaire.title} - 专业心理测评 | LXScale`
    : `${questionnaire.title} - Professional Assessment | LXScale`;
  
  // OpenGraph 描述
  const ogDescription = isZh
    ? `专业的${questionnaire.title}心理测评工具，${questionCount}个问题，${evaluationTime}完成。免费、专业、保护隐私。`
    : `Professional ${questionnaire.title} mental health assessment tool. ${questionCount} questions, takes ${evaluationTime}. Free, professional, and privacy-protected.`;
  
  // Twitter 标题和描述
  const twitterTitle = ogTitle;
  const twitterDescription = ogDescription;
  
  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription
  };
}

// 为每个量表生成专业的结构化数据
export function generateQuestionnaireStructuredData(questionnaire: Questionnaire, locale: string, url: string) {
  const isZh = locale === 'zh';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    '@id': url,
    name: questionnaire.title,
    description: questionnaire.details.introduction,
    url: url,
    inLanguage: isZh ? 'zh-CN' : 'en-US',
    medicalTestPanel: {
      '@type': 'MedicalTestPanel',
      name: questionnaire.title,
      description: questionnaire.details.introduction,
      testDuration: questionnaire.details.evaluationTime,
      numberOfQuestions: questionnaire.details.questionCount,
    },
    provider: {
      '@type': 'Organization',
      name: 'LXScale',
      url: 'https://lxscale.xyz',
      description: isZh ? '专业免费心理健康测评平台' : 'Professional free mental health assessment platform'
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'LXScale',
      url: 'https://lxscale.xyz',
      description: isZh ? '免费专业心理测评平台，提供多种标准化心理量表' : 'Free professional mental health assessment platform with standardized psychological scales'
    },
    mainEntity: {
      '@type': 'FAQPage',
      name: `${questionnaire.title} FAQ`,
      mainEntity: [
        {
          '@type': 'Question',
          name: isZh ? `${questionnaire.title}需要多长时间完成？` : `How long does ${questionnaire.title} take to complete?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: questionnaire.details.evaluationTime
          }
        },
        {
          '@type': 'Question',
          name: isZh ? `${questionnaire.title}包含多少个问题？` : `How many questions does ${questionnaire.title} contain?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: questionnaire.details.questionCount
          }
        },
        {
          '@type': 'Question',
          name: isZh ? `${questionnaire.title}是否免费？` : `Is ${questionnaire.title} free?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: isZh ? '是的，完全免费，无需注册，本地处理数据，保护隐私。' : 'Yes, completely free, no registration required, data processed locally for privacy protection.'
          }
        }
      ]
    },
    ...(questionnaire.details.references && questionnaire.details.references.length > 0 && {
      citation: questionnaire.details.references.map(ref => ({
        '@type': 'ScholarlyArticle',
        name: ref.text,
        url: ref.url
      }))
    })
  };
}