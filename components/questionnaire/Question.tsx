import { forwardRef } from 'react';

interface QuestionProps {
    question: {
        id: number;
        content: string;
        options: { value: string; text: string }[];
        factors?: string[];
    };
    answer?: string;
    onSelect: (questionId: number, option: string) => void;
}

export const Question = forwardRef<HTMLDivElement, QuestionProps>(
    ({ question, answer, onSelect }, ref) => {
        return (
            <div
                ref={ref}
                className="mb-8 p-6 bg-white rounded-lg shadow-sm"
                id={`question-${question.id}`}
            >
                <h3 className="text-lg font-medium mb-4">
                    {question.id}. {question.content}
                </h3>
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <button
                            key={option.value}
                            className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                ${answer === option.value
                                    ? 'bg-blue-100 border-blue-500 border-2'
                                    : 'border hover:bg-gray-50'
                                }`}
                            onClick={() => onSelect(question.id, option.value)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
);

Question.displayName = 'Question'; 