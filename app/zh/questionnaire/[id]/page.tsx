'use client';

import { notFound } from 'next/navigation';
import IdPage from '@/components/questionnaire/IdPage';

interface QuestionnairePageProps {
  params: {
    id: string;
  };
}

export default function QuestionnairePage({ params }: QuestionnairePageProps) {
  const { id } = params;
  if (!id) {
    return notFound();
  }

  return <IdPage id={id} />;
}
