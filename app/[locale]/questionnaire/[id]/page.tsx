'use client';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Questionnaire } from '@/components/questionnaire/test/QuestionnaireTest';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { Questionnaire as QuestionnaireType } from '@/types';

export default function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Get the questionnaire with specified id from questionnaire data
  const questionnaire = useQuestionnaire(id);

  // If data not found, show 404 page
  if (!questionnaire) {
    return notFound();
  }

  return <Questionnaire questionnaire={questionnaire as QuestionnaireType} id={id} />;
}
