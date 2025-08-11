import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { SponsorsSection } from '@/components/home/SponsorsSection';
import { ContributorsSection } from '@/components/home/ContributorsSection';
import { SupportSection } from '@/components/home/SupportSection';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'en') {
    return {
      title: 'LXScale - Free Mental Health Assessment Tools | Professional Psychological Scales',
      description: 'Professional free mental health assessment platform. Includes Patient Health Questionnaire (PHQ-9), Beck Depression Inventory (BDI-II), Generalized Anxiety Disorder Scale (GAD-7), Insomnia Severity Index Scale (ISI), Perceived Stress Scale (PSS-10), Narcissistic Personality Inventory (NPI-16), Gender Dysphoria Test, ADHD Self-Report Scale, and more.',
      keywords: 'mental health assessment, psychological scales, depression test, anxiety test, free mental health, Patient Health Questionnaire, PHQ-9, Beck Depression Inventory, BDI-II, Generalized Anxiety Disorder Scale, GAD-7, Insomnia Severity Index, Perceived Stress Scale, Narcissistic Personality Inventory, Gender Dysphoria Test, ADHD test, SCL-90, DASS-21',
      openGraph: {
        title: 'LXScale - Free Mental Health Assessment Tools',
        description: 'Professional mental health assessment platform with multiple free psychological scales',
        locale: 'en_US',
      },
    };
  }
  
  return {
    title: 'LXScale - 免费心理健康测评工具 | 专业心理量表测试平台',
    description: '提供免费、专业的心理健康测评服务。包含患者健康问卷(PHQ-9)、贝克抑郁量表(BDI-II)、广泛性焦虑量表(GAD-7)、失眠严重程度指数量表(ISI)、感知压力量表(PSS-10)、自恋人格量表清单(NPI-16)、性别焦虑测试、成人ADHD自评量表等多种国际标准心理测评工具。',
    keywords: '心理测评, 心理量表, 抑郁测试, 焦虑测试, 心理健康, 免费测评, 患者健康问卷, PHQ-9, 贝克抑郁量表, BDI-II, 广泛性焦虑量表, GAD-7, 失眠严重程度指数, 感知压力量表, 自恋人格量表, 性别焦虑测试, ADHD测试, SCL-90, DASS-21',
    openGraph: {
      title: 'LXScale - 免费心理健康测评工具',
      description: '专业的心理健康测评平台，提供抑郁、焦虑、强迫症等多种免费心理量表测试',
      locale: 'zh_CN',
    },
  };
}

export default function Home() {
  // Add questionnaire-related structured data
  const questionnaireJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mental Health Assessment Scales',
    description: 'Professional mental health assessment tools collection',
    itemListElement: [
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/phq9',
        name: 'Patient Health Questionnaire (PHQ-9) / 患者健康问卷',
        description: 'Standardized tool for assessing depression severity',
        url: 'https://lxscale.xyz/questionnaire/phq9'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/gad7',
        name: 'Generalized Anxiety Disorder Scale (GAD-7) / 广泛性焦虑量表',
        description: 'Standardized tool for assessing anxiety severity',
        url: 'https://lxscale.xyz/questionnaire/gad7'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/isi',
        name: 'Insomnia Severity Index Scale (ISI) / 失眠严重程度指数量表',
        description: 'Assessment of insomnia severity and impact on daily life',
        url: 'https://lxscale.xyz/questionnaire/isi'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/pss10',
        name: 'Perceived Stress Scale (PSS-10) / 感知压力量表',
        description: 'Measurement of perceived stress levels',
        url: 'https://lxscale.xyz/questionnaire/pss10'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/npd',
        name: 'Narcissistic Personality Inventory (NPI-16) / 自恋人格量表清单',
        description: 'Assessment of narcissistic personality traits',
        url: 'https://lxscale.xyz/questionnaire/npd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/gd',
        name: 'Gender Dysphoria Test (GDQ) / 性别焦虑测试',
        description: 'Assessment of gender dysphoria experiences',
        url: 'https://lxscale.xyz/questionnaire/gd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/bdi2',
        name: 'Beck Depression Inventory (BDI-II) / 贝克抑郁量表',
        description: 'Widely used depression assessment tool',
        url: 'https://lxscale.xyz/questionnaire/bdi2'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/adhd',
        name: 'ADHD Self-Report Scale (ASRS-v1.1) / 成人ADHD自评量表',
        description: 'Adult ADHD screening and assessment',
        url: 'https://lxscale.xyz/questionnaire/adhd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/scl90',
        name: 'SCL-90 Symptom Checklist / 症状自评量表',
        description: 'Comprehensive psychological symptom assessment',
        url: 'https://lxscale.xyz/questionnaire/scl90'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/ocd',
        name: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS) / 强迫症量表',
        description: 'Professional tool for assessing OCD severity',
        url: 'https://lxscale.xyz/questionnaire/ocd'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/dass21',
        name: 'Depression Anxiety Stress Scales (DASS-21) / 抑郁焦虑压力量表',
        description: 'Combined assessment of depression, anxiety, and stress',
        url: 'https://lxscale.xyz/questionnaire/dass21'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/sds',
        name: 'Self-Rating Depression Scale (SDS) / 抑郁自评量表',
        description: 'Self-assessment tool for depression',
        url: 'https://lxscale.xyz/questionnaire/sds'
      },
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(questionnaireJsonLd) }}
      />
      <div className="flex flex-col min-h-screen border-t">
        <HeroSection />
        <FeaturesSection />
        <SponsorsSection />
        <ContributorsSection />
        <SupportSection />
      </div>
    </>
  );
}
