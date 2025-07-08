import { Questionnaire } from "@/types";
import { getQuestionnaireKeywords } from "@/constants/seo-keywords";

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export function generateQuestionnaireMetadata(
  questionnaire: Questionnaire,
  locale: string
): SEOMetadata {
  const isZh = locale === "zh";
  const keywords = getQuestionnaireKeywords(questionnaire.id, locale);

  // 获取量表的专业描述
  const introduction = questionnaire.details.introduction;
  const questionCount = questionnaire.details.questionCount;
  const evaluationTime = questionnaire.details.evaluationTime;

  // 构建专业标题（强调免费、权威、AI分析）
  const title = isZh
    ? `${questionnaire.title} - 免费权威AI心理测评 | LXScale专业心理量表平台`
    : `${questionnaire.title} - Free Authoritative AI Assessment | LXScale Professional Mental Health Platform`;

  // 构建详细描述（突出三大优势）
  const description = isZh
    ? `【免费+权威+AI分析】${
        questionnaire.title
      }专业心理测评工具。${introduction.substring(
        0,
        80
      )}...包含${questionCount}个问题，${evaluationTime}完成。国际标准量表，免费AI智能分析，权威临床评估，保护隐私。`
    : `[Free+Authoritative+AI Analysis] Professional ${
        questionnaire.title
      } mental health assessment. ${introduction.substring(
        0,
        80
      )}...${questionCount} questions, takes ${evaluationTime}. International standard scale with free AI analysis, authoritative clinical assessment, privacy protected.`;

  // OpenGraph 标题（突出核心价值）
  const ogTitle = isZh
    ? `${questionnaire.title} - 免费AI心理测评 | LXScale权威平台`
    : `${questionnaire.title} - Free AI Mental Health Assessment | LXScale`;

  // OpenGraph 描述（强调专业性和免费）
  const ogDescription = isZh
    ? `权威${questionnaire.title}免费测评+AI智能分析。${questionCount}题${evaluationTime}完成，国际标准，临床级准确度，完全免费。`
    : `Authoritative ${questionnaire.title} free assessment + AI analysis. ${questionCount} questions, ${evaluationTime} completion, international standard, clinical accuracy, completely free.`;

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
    twitterDescription,
  };
}

// 为每个量表生成专业的结构化数据
export function generateQuestionnaireStructuredData(
  questionnaire: Questionnaire,
  locale: string,
  url: string
) {
  const isZh = locale === "zh";

  return {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "@id": url,
    name: questionnaire.title,
    description: questionnaire.details.introduction,
    url: url,
    inLanguage: isZh ? "zh-CN" : "en-US",
    medicalTestPanel: {
      "@type": "MedicalTestPanel",
      name: questionnaire.title,
      description: questionnaire.details.introduction,
      testDuration: questionnaire.details.evaluationTime,
      numberOfQuestions: questionnaire.details.questionCount,
    },
    provider: {
      "@type": "Organization",
      name: "LXScale",
      url: "https://lxscale.xyz",
      description: isZh
        ? "免费权威AI心理健康测评平台，提供专业临床级心理量表和智能分析"
        : "Free authoritative AI mental health assessment platform with professional clinical-grade scales and intelligent analysis",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "LXScale",
      url: "https://lxscale.xyz",
      description: isZh
        ? "权威免费AI心理测评平台，国际标准量表+智能分析，临床级准确度"
        : "Authoritative free AI mental health platform with international standard scales + intelligent analysis, clinical-grade accuracy",
    },
    mainEntity: {
      "@type": "FAQPage",
      name: `${questionnaire.title} FAQ`,
      mainEntity: [
        {
          "@type": "Question",
          name: isZh
            ? `${questionnaire.title}需要多长时间完成？`
            : `How long does ${questionnaire.title} take to complete?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: questionnaire.details.evaluationTime,
          },
        },
        {
          "@type": "Question",
          name: isZh
            ? `${questionnaire.title}包含多少个问题？`
            : `How many questions does ${questionnaire.title} contain?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: questionnaire.details.questionCount,
          },
        },
        {
          "@type": "Question",
          name: isZh
            ? `${questionnaire.title}是否免费且有AI分析？`
            : `Is ${questionnaire.title} free with AI analysis?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: isZh
              ? "是的，完全免费！包括权威量表测评+AI智能分析+专业解读，无需注册，保护隐私，临床级准确度。"
              : "Yes, completely free! Including authoritative scale assessment + AI intelligent analysis + professional interpretation, no registration required, privacy protected, clinical-grade accuracy.",
          },
        },
        {
          "@type": "Question",
          name: isZh
            ? "LXScale的测评结果权威吗？"
            : "Are LXScale assessment results authoritative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: isZh
              ? "是的，我们使用国际标准化心理量表，如PHQ-9、GAD-7等，结合AI智能分析，具有临床级准确度和权威性。"
              : "Yes, we use internationally standardized psychological scales like PHQ-9, GAD-7, etc., combined with AI intelligent analysis, providing clinical-grade accuracy and authority.",
          },
        },
      ],
    },
    ...(questionnaire.details.references &&
      questionnaire.details.references.length > 0 && {
        citation: questionnaire.details.references.map((ref) => ({
          "@type": "ScholarlyArticle",
          name: ref.text,
          url: ref.url,
        })),
      }),
  };
}
