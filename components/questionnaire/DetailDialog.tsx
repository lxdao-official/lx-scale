'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { useScopedI18n } from '@/locales/client';
import { Questionnaire } from '@/types';

interface Dimension {
    name: string;
    description: string;
}

interface Reference {
    text: string;
    url: string;
}

interface DetailDialogProps {
    questionnaire: Questionnaire;
    trigger?: React.ReactNode;
}

export default function DetailDialog({ questionnaire, trigger }: DetailDialogProps) {
    const t = useScopedI18n('app.questionnaire.page');
    const [open, setOpen] = useState(false);

    const { title, details, id } = questionnaire;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">查看详情</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                </DialogHeader>

                <div className="py-4">
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
                                        (dim: Dimension, index: number) => (
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
                                    {details.references.map((ref: Reference, index: number) => (
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
                </div>

                <DialogFooter>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="outline"
                        className="mr-2"
                    >
                        关闭
                    </Button>
                    <Link href={`/questionnaire/${id}`} onClick={() => setOpen(false)}>
                        <Button className="cursor-pointer">
                            {t('startSurvey')}
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}