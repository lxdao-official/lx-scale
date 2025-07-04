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
      description: 'Professional free mental health assessment platform. Includes depression scales (PHQ-9, BDI-II, SDS), anxiety scales (GAD-7, DASS-21), OCD scale (Y-BOCS), sleep scale (ISI), stress scale (PSS-10), and SCL-90.',
      keywords: 'mental health assessment, psychological scales, depression test, anxiety test, free mental health, PHQ-9, BDI-II, SDS, GAD-7, DASS-21, Y-BOCS, SCL-90, ISI, PSS-10',
      openGraph: {
        title: 'LXScale - Free Mental Health Assessment Tools',
        description: 'Professional mental health assessment platform with multiple free psychological scales',
        locale: 'en_US',
      },
    };
  }
  
  return {
    title: 'LXScale - 免费心理健康测评工具 | 专业心理量表测试平台',
    description: '提供免费、专业的心理健康测评服务。包含抑郁量表(PHQ-9、BDI-II、SDS)、焦虑量表(GAD-7、DASS-21)、强迫症量表(Y-BOCS)、睡眠量表(ISI)、压力量表(PSS-10)、心理症状量表(SCL-90)等多种国际标准心理测评工具。',
    keywords: '心理测评, 心理量表, 抑郁测试, 焦虑测试, 心理健康, 免费测评, PHQ-9, BDI-II, SDS, GAD-7, DASS-21, Y-BOCS, SCL-90, ISI, PSS-10',
    openGraph: {
      title: 'LXScale - 免费心理健康测评工具',
      description: '专业的心理健康测评平台，提供抑郁、焦虑、强迫症等多种免费心理量表测试',
      locale: 'zh_CN',
    },
  };
}

export default function Home() {
  // 添加问卷相关的结构化数据
  const questionnaireJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '心理健康测评量表',
    description: '专业心理健康测评工具集合',
    itemListElement: [
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/phq9',
        name: 'PHQ-9患者健康问卷',
        description: '评估抑郁症状严重程度的标准化工具',
        url: 'https://lxscale.xyz/questionnaire/phq9'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/gad7',
        name: 'GAD-7广泛性焦虑量表',
        description: '评估焦虑症状严重程度的标准化工具',
        url: 'https://lxscale.xyz/questionnaire/gad7'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/bdi2',
        name: 'BDI-II贝克抑郁量表',
        description: '广泛使用的抑郁症状评估工具',
        url: 'https://lxscale.xyz/questionnaire/bdi2'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/scl90',
        name: 'SCL-90症状自评量表',
        description: '评估心理症状的综合性量表',
        url: 'https://lxscale.xyz/questionnaire/scl90'
      },
      {
        '@type': 'MedicalTest',
        '@id': 'https://lxscale.xyz/questionnaire/ocd',
        name: 'Y-BOCS强迫症量表',
        description: '评估强迫症状严重程度的专业工具',
        url: 'https://lxscale.xyz/questionnaire/ocd'
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
