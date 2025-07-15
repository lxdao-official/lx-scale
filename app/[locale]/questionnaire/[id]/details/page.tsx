import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import QuestionnaireDetailsPage from '@/components/questionnaire/QuestionnaireDetailsPage';
import { questionnairesZh } from '@/questionairies/zh';
import { questionnairesEn } from '@/questionairies/en';
import { Questionnaire as QuestionnaireType } from '@/types';
import { generateQuestionnaireMetadata, generateQuestionnaireStructuredData } from '@/lib/seo-metadata';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

function getQuestionnaire(id: string, locale: string) {
  const questionnaires = locale === 'zh' ? questionnairesZh : questionnairesEn;
  return questionnaires.find(q => q.id === id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const questionnaire = getQuestionnaire(id, locale);

  if (!questionnaire) {
    return {};
  }

  const seoData = generateQuestionnaireMetadata(questionnaire, locale);
  const canonicalUrl = `https://lxscale.xyz/${locale}/questionnaire/${id}/details`;

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    authors: [{ name: 'LXScale Team' }],
    creator: 'LXScale',
    publisher: 'LXScale',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      url: canonicalUrl,
      siteName: 'LXScale',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [
        {
          url: `https://lxscale.xyz/api/og?title=${encodeURIComponent(questionnaire.title)}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: questionnaire.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [
        `https://lxscale.xyz/api/og?title=${encodeURIComponent(questionnaire.title)}&locale=${locale}`,
      ],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'zh-CN': `https://lxscale.xyz/zh/questionnaire/${id}/details`,
        'en-US': `https://lxscale.xyz/en/questionnaire/${id}/details`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function QuestionnaireDetailPage({ params }: PageProps) {
  const { id, locale } = await params;
  const questionnaire = getQuestionnaire(id, locale);

  if (!questionnaire) {
    return notFound();
  }

  // Clean questionnaire object, remove functions to avoid client component errors
  const cleanQuestionnaire = {
    id: questionnaire.id,
    title: questionnaire.title,
    description: questionnaire.description,
    tags: questionnaire.tags,
    time: questionnaire.time,
    details: questionnaire.details,
    questions: questionnaire.questions
    // Does not include renderOptions function
  };

  const questionnaireJsonLd = generateQuestionnaireStructuredData(
    questionnaire,
    locale,
    `https://lxscale.xyz/${locale}/questionnaire/${id}/details`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(questionnaireJsonLd) }}
      />
      <QuestionnaireDetailsPage questionnaire={cleanQuestionnaire as QuestionnaireType} locale={locale} />
    </>
  );
}