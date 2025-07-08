import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useScopedI18n } from '@/locales/client';
import { Copy, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Questionnaire } from '@/types';

interface ResultContainerProps {
  title: string;
  id: string;
  children: ReactNode;
  questionnaire?: Questionnaire;
  answers?: string[];
  questionnaireResults?: Record<string, string>;
  isChatLimitReached?: boolean;
}

export function ResultContainer({ title, id, children, questionnaire, answers, questionnaireResults, isChatLimitReached = false }: ResultContainerProps) {
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

  const handleCopyResultData = async () => {
    if (!questionnaire || !answers || !questionnaireResults) {
      toast.error(t('copyResultDataError'));
      return;
    }

    try {
      const currentTime = new Date().toLocaleString();

      let resultData = `# ${t('copyTemplate.title')}\n\n`;
      resultData += `## ${t('copyTemplate.basicInfo')}\n`;
      resultData += `- ${t('copyTemplate.questionnaireName')}: ${questionnaire.title}\n`;
      resultData += `- ${t('copyTemplate.questionnaireId')}: ${id}\n`;
      resultData += `- ${t('copyTemplate.assessmentTime')}: ${currentTime}\n`;
      resultData += `- ${t('copyTemplate.questionCount')}: ${questionnaire.questions.length}\n\n`;
      
      resultData += `## ${t('copyTemplate.questionsAndAnswers')}\n`;
      Object.entries(questionnaireResults).forEach(([question, answer], index) => {
        resultData += `${index + 1}. ${question}\n   ${t('copyTemplate.answer')}: ${answer}\n\n`;
      });
      
      resultData += `## ${t('copyTemplate.usage')}\n`;
      resultData += `${t('copyTemplate.disclaimer')}\n\n`;
      resultData += `${t('copyTemplate.source')}: ${t('copyTemplate.platform')}\n`;
      resultData += `${t('copyTemplate.website')}: https://lxscale.xyz\n`;
      
      await navigator.clipboard.writeText(resultData);
      toast.success(t('copyResultDataSuccess'));
    } catch {
      toast.error(t('copyResultDataError'));
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

        {isChatLimitReached && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <div className="text-blue-800">
                <p className="font-medium">{t('chatLimitReachedTitle')}</p>
                <p className="text-sm mt-1">{t('chatLimitReachedDesc')}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
          <Button variant="outline" className="w-full sm:w-auto">
            <Link href={`/questionnaire/${id}`}>{t('backToDetail')}</Link>
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handleCopyResultLink} className="w-full sm:w-auto">
              <Copy className="w-4 h-4 mr-2" />
              {t('copyResultLink')}
            </Button>
            <Button 
              variant={isChatLimitReached ? "default" : "outline"} 
              onClick={handleCopyResultData} 
              className={`w-full sm:w-auto ${isChatLimitReached ? 'bg-blue-600 hover:bg-blue-700 text-white animate-pulse' : ''}`}
            >
              <FileText className="w-4 h-4 mr-2" />
              {t('copyResultData')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
