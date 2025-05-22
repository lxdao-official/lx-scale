import { notFound } from 'next/navigation';
import IdPage from '@/components/questionnaire/IdPage';

interface QuestionnairePageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestionnairePage({
  params,
}: QuestionnairePageProps) {
  const { id } = await params;
  if (!id) {
    return notFound();
  }

  return <IdPage id={id} />;
}
