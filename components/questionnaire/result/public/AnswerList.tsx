import { Questionnaire } from '@/types';
import { useScopedI18n } from '@/locales/client';

interface AnswerListProps {
    questions: Questionnaire['questions'];
    answers: string[]; // array of selected option values in order
    renderOptions: (id: number) => { id: number; content: string; value: string }[];
}

export function AnswerList({ questions, answers, renderOptions }: AnswerListProps) {
    const t = useScopedI18n('common');
    
    if (!questions || questions.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">{t('answerList.title')}</h3>
            <div className="space-y-2">
                {questions.map((q, idx) => {
                    const selectedValue = answers[idx];

                    const optionContent = selectedValue !== undefined ? (() => {
                        const opts = renderOptions(q.id) || [];
                        const found = opts.find(o => String(o.value) === String(selectedValue));
                        return found ? found.content : `${t('answerList.option')} ${selectedValue}`;
                    })() : t('answerList.unanswered');

                    return (
                        <div
                            key={q.id}
                            className="flex items-start gap-2 p-3 bg-gray-50 rounded-md text-sm"
                        >
                            <span className="font-medium">{idx + 1}. {q.content}</span>
                            <span className="ml-auto">
                                {selectedValue !== undefined ? `${optionContent}` : t('answerList.unanswered')}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
