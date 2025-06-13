import { Questionnaire } from '@/types';

interface AnswerListProps {
    questions: Questionnaire['questions'];
    answers: string[]; // array of selected option values in order
    renderOptions: (id: number) => { id: number; content: string; value: string }[];
}

export function AnswerList({ questions, answers, renderOptions }: AnswerListProps) {
    if (!questions || questions.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">选择明细</h3>
            <div className="space-y-2">
                {questions.map((q, idx) => {
                    const selectedValue = answers[idx];

                    const optionContent = selectedValue !== undefined ? (() => {
                        const opts = renderOptions(q.id) || [];
                        const found = opts.find(o => String(o.value) === String(selectedValue));
                        return found ? found.content : `选项 ${selectedValue}`;
                    })() : '未作答';

                    return (
                        <div
                            key={q.id}
                            className="flex items-start gap-2 p-3 bg-gray-50 rounded-md text-sm"
                        >
                            <span className="font-medium">{idx + 1}. {q.content}</span>
                            <span className="ml-auto">
                                {selectedValue !== undefined ? `${optionContent}` : '未作答'}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
