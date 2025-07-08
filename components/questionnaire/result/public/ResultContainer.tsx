import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ResultContainerProps {
  title: string;
  id: string;
  children: ReactNode;
}

export function ResultContainer({ title, id, children }: ResultContainerProps) {
  const t = useScopedI18n(
    'component.questionnaire.result.public.resultContainer'
  );

  const handleCopyResultLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(t('copySuccess'));
    } catch {
      toast.error(t('copyError'));
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen  md:p-4 p-2">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg md:p-8 p-4 border">
        <h1 className="text-2xl font-bold mb-6">
          {title} - {t('resultText')}
        </h1>

        <div className="mb-8">
          <div className="space-y-6">{children}</div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
          <Button variant="outline" className="w-full sm:w-auto">
            <Link href={`/questionnaire/${id}`}>{t('backToDetail')}</Link>
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handleCopyResultLink} className="w-full sm:w-auto">
              <Copy className="w-4 h-4 mr-2" />
              {t('copyResultLink')}
            </Button>
            <Button className="w-full sm:w-auto">
              <Link href="/questionnaire">{t('completeTest')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
