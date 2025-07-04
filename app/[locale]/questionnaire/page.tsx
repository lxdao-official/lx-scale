import QuestionnaireList from '@/components/questionnaire/List';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'en') {
    return {
      title: 'Psychological Assessment Questionnaires | LXScale Free Mental Health Tests',
      description: 'Browse all available mental health assessment questionnaires. Including PHQ-9 depression scale, GAD-7 anxiety scale, BDI-II, SCL-90, Y-BOCS OCD scale, ISI sleep scale, PSS-10 stress scale and more professional psychological assessment tools.',
      keywords: 'psychological questionnaires, mental health tests, depression questionnaire, anxiety assessment, OCD scale, sleep disorders test, stress assessment, free psychological evaluation',
      openGraph: {
        title: 'Psychological Assessment Questionnaires - LXScale',
        description: 'Browse all available mental health assessment questionnaires and scales',
        locale: 'en_US',
      },
    };
  }
  
  return {
    title: '心理测评问卷列表 | LXScale免费心理健康测试',
    description: '浏览所有可用的心理健康测评问卷。包括PHQ-9抑郁量表、GAD-7焦虑量表、BDI-II贝克抑郁量表、SCL-90症状自评量表、Y-BOCS强迫症量表、ISI失眠量表、PSS-10压力量表等专业心理测评工具。',
    keywords: '心理测评问卷, 心理健康测试, 抑郁问卷, 焦虑评估, 强迫症量表, 睡眠障碍测试, 压力评估, 免费心理评估',
    openGraph: {
      title: '心理测评问卷列表 - LXScale',
      description: '浏览所有可用的心理健康测评问卷和量表',
      locale: 'zh_CN',
    },
  };
}

export default function QuestionnairePage() {
  return <QuestionnaireList />;
}
