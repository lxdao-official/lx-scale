'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, FileText } from 'lucide-react';
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

interface QuestionnaireDetailsPageProps {
    questionnaire: Questionnaire;
    locale?: string;
}

export default function QuestionnaireDetailsPage({ questionnaire, locale = 'zh' }: QuestionnaireDetailsPageProps) {
    const t = useScopedI18n('app.questionnaire.page');
    
    const { title, details, id, tags } = questionnaire;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-6">
                <Link 
                    href="/questionnaire" 
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {locale === 'zh' ? '返回问卷列表' : 'Back to Questionnaire List'}
                </Link>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                
                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{details.questionCount} {locale === 'zh' ? '个问题' : 'Questions'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{details.evaluationTime}</span>
                    </div>
                </div>

                {/* Start Test Button */}
                <Link href={`/questionnaire/${id}`}>
                    <Button size="lg" className="px-8 py-6 text-lg gap-2">
                        {locale === 'zh' ? '开始测评' : 'Start Assessment'} <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            {/* Content */}
            <div className="prose prose-gray max-w-none">
                {/* Introduction */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{t('introduction')}</h2>
                    <p className="text-gray-700 leading-relaxed">{details.introduction}</p>
                </div>

                {/* Instructions */}
                {details.instructions && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('instructions')}</h2>
                        <p className="text-gray-700 leading-relaxed">{details.instructions}</p>
                    </div>
                )}

                {/* Scoring Method */}
                {details.scoringMethod && details.scoringMethod.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('scoringMethod')}</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            {details.scoringMethod.map((method: string, index: number) => (
                                <li key={index} className="leading-relaxed">{method}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Dimensions */}
                {details.dimensions && details.dimensions.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('dimensions')}</h2>
                        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                            {details.dimensions.map((dim: Dimension, index: number) => (
                                <li key={index} className="leading-relaxed">
                                    <strong className="text-gray-900">{dim.name}</strong>：{dim.description}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Notes */}
                {details.notes && details.notes.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('notes')}</h2>
                        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                            {details.notes.map((note: string, index: number) => (
                                <li key={index} className="leading-relaxed">{note}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* References */}
                {details.references && details.references.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{t('references')}</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            {details.references.map((ref: Reference, index: number) => (
                                <li key={index}>
                                    <a 
                                        href={ref.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        {ref.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        {locale === 'zh' ? '准备好开始测评了吗？' : 'Ready to start the assessment?'}
                    </p>
                    <Link href={`/questionnaire/${id}`}>
                        <Button size="lg" className="px-8 py-6 text-lg gap-2">
                            {locale === 'zh' ? '开始测评' : 'Start Assessment'} <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}