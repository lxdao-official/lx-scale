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

        <div className="flex justify-between mt-8">
          <Button variant="outline">
            <Link href={`/questionnaire/${id}`}>{t('backToDetail')}</Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopyResultLink}>
              <Copy className="w-4 h-4 mr-2" />
              {t('copyResultLink')}
            </Button>
            <Button>
              <Link href="/questionnaire">{t('completeTest')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
