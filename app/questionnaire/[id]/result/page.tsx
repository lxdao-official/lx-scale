"use client"

import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { questionnaires } from "@/constants/questionnaires";

interface QuestionnaireResultPageProps {
    params: {
        id: string;
    };
}

export default function QuestionnaireResultPage({ params }: QuestionnaireResultPageProps) {
    const { id } = params;

    // 从问卷数据中获取指定id的量表
    const questionnaire = questionnaires.find(q => q.id === id);

    // 如果找不到数据，显示404页面
    if (!questionnaire || !questionnaire.details) {
        return notFound();
    }

    // 这里只是一个占位，实际结果页面需要根据不同量表的评分方式和结果解读来实现
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                <h1 className="text-2xl font-bold mb-6">{questionnaire.title} - 测评结果</h1>

                <div className="mb-8">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <p className="text-sm text-blue-700">
                            注意：此页面仅为示例。实际结果内容需要根据用户的测评结果和{questionnaire.title}的评分标准进行计算和解读。
                        </p>
                    </div>

                    {/* 示例结果 */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-medium mb-3">总分</h2>
                            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
                                <div className="text-center">
                                    <div className="text-5xl font-bold text-blue-600">75</div>
                                    <div className="mt-2 text-gray-600">满分100</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-medium mb-3">结果解读</h2>
                            <div className="bg-white border rounded-lg p-4">
                                <p className="text-gray-700">
                                    根据您的测评结果，您可能存在中度{id === "depression" ? "抑郁" : id === "ocd" ? "强迫" : "心理"}症状。
                                    建议您进一步咨询专业心理医生，获取更准确的诊断和帮助。
                                </p>
                            </div>
                        </div>

                        {questionnaire.details.dimensions && (
                            <div>
                                <h2 className="text-xl font-medium mb-3">维度分析</h2>
                                <div className="space-y-4">
                                    {questionnaire.details.dimensions.map((dim, index) => (
                                        <div key={index} className="border rounded-lg p-4">
                                            <h3 className="font-medium mb-2">{dim.name}</h3>
                                            <div className="flex items-center mb-2">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-blue-600 h-2.5 rounded-full"
                                                        style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">{Math.floor(Math.random() * 100)}%</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{dim.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-medium mb-3">建议</h2>
                            <div className="bg-white border rounded-lg p-4">
                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>保持规律的生活习惯，确保充足的睡眠。</li>
                                    <li>适量运动，有助于缓解压力和改善情绪。</li>
                                    <li>寻求社会支持，与亲友交流您的感受。</li>
                                    <li>如症状持续或加重，建议咨询专业心理医生。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <Button variant="outline">
                        <Link href={`/questionnaire/${id}`}>返回详情</Link>
                    </Button>
                    <Button>
                        <Link href="/questionnaire">完成测评</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
} 