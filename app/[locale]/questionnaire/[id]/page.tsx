import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  questionnaires as questionnairesEn,
  questionnairesZh,
} from '@/constants/questionairies/type';
import { getScopedI18n, getCurrentLocale } from '@/locales/server';

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getScopedI18n('app.questionnaire.page');
  const locale = await getCurrentLocale();

  const questionnaires = locale === 'zh' ? questionnairesZh : questionnairesEn;
  // 从问卷数据中获取指定id的量表
  const questionnaire = questionnaires.find((q) => q.id === id);

  // 如果找不到数据，显示404页面
  if (!questionnaire || !questionnaire.details) {
    return notFound();
  }

  // 解构获取详细信息
  const { details } = questionnaire;

  return (
    <div className="flex justify-center items-center min-h-screen md:p-4 p-2">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg md:p-8 p-4 border">
        <h1 className="text-2xl font-bold mb-4">{questionnaire.title}</h1>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">{t('introduction')}</h2>
          <p className="text-gray-700">{details.introduction}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-medium mb-2">{t('questionCount')}</h2>
            <p className="text-gray-700">{details.questionCount}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">{t('evaluationTime')}</h2>
            <p className="text-gray-700">{details.evaluationTime}</p>
          </div>
        </div>

        {details.instructions && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">{t('instructions')}</h2>
            <p className="text-gray-700">{details.instructions}</p>
          </div>
        )}

        {details.scoringMethod && details.scoringMethod.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">{t('scoringMethod')}</h2>
            <div className="text-gray-700">
              <ul className="list-disc pl-5 space-y-1">
                {details.scoringMethod.map((method: string, index: number) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {details.dimensions && details.dimensions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">{t('dimensions')}</h2>
            <div className="text-gray-700">
              <ol className="list-decimal pl-5 space-y-1">
                {details.dimensions.map(
                  (
                    dim: { name: string; description: string },
                    index: number
                  ) => (
                    <li key={index}>
                      <strong>{dim.name}</strong>：{dim.description}
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
        )}

        {details.notes && details.notes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">{t('notes')}</h2>
            <div className="text-gray-700">
              <ol className="list-decimal pl-5 space-y-1">
                {details.notes.map((note: string, index: number) => (
                  <li key={index}>{note}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {details.references && details.references.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">{t('references')}</h2>
            <div className="text-gray-700">
              <ul className="list-disc pl-5">
                {details.references.map((ref: { text: string; url: string }, index: number) => (
                  <li key={index}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {ref.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link href={`/questionnaire/${id}/survey`}>
            <Button className="w-full py-6 text-lg cursor-pointer" asChild>
              <span>{t('startSurvey')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
