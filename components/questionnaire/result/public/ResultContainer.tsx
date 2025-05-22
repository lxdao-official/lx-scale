import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';

interface ResultContainerProps {
  title: string;
  id: string;
  children: ReactNode;
}

export function ResultContainer({ title, id, children }: ResultContainerProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.resultContainer'
  );
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
        <h1 className="text-2xl font-bold mb-6">
          {title} - {t('resultText')}
        </h1>

        <div className="mb-8">
          <div className="space-y-6">{children}</div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline">
            <Link href={`/questionnaire/${id}`}>{t('backToDetail')}</Link>
          </Button>
          <Button>
            <Link href="/questionnaire">{t('completeTest')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
