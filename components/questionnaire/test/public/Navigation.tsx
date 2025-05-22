'use client';
import { useScopedI18n } from '@/locales/client';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  onSubmit: () => void;
  isLastPage: boolean;
}

export function Navigation({
  currentPage,
  totalPages,
  goToPage,
  onSubmit,
  isLastPage,
}: NavigationProps) {
  const t = useScopedI18n('component.questionnaire.test.public.navigation');
  return (
    <div className="flex justify-between items-center mt-8">
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t('previousPage')}
      </Button>

      <span className="text-sm text-gray-500">
        {t('pageInfo', { currentPage, totalPages })}
      </span>

      {isLastPage ? (
        <Button onClick={onSubmit}>{t('submit')}</Button>
      ) : (
        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('nextPage')}
        </Button>
      )}
    </div>
  );
}
