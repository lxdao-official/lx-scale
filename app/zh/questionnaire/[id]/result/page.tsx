import { notFound } from 'next/navigation';
import { questionnaires } from '@/constants/questionnaires';
import ResultPage from '@/components/questionnaire/ResultPage';

interface QuestionnaireResultPageProps {
  params: {
    id: string;
  };
}

export default async function QuestionnaireResultPage({
  params,
}: QuestionnaireResultPageProps) {
  const { id } = await params;

  // 从问卷数据中获取指定id的量表
  const questionnaire = questionnaires.find((q) => q.id === id);

  // 如果找不到数据，显示404页面
  if (!questionnaire || !questionnaire.details) {
    return notFound();
  }

  // 这里只是一个占位，实际结果页面需要根据不同量表的评分方式和结果解读来实现
  return <ResultPage id={id} />;
}
