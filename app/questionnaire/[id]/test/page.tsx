"use client"

import { useState } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { questionnaires } from "@/constants/questionnaires";

interface QuestionnaireTestPageProps {
    params: {
        id: string;
    };
}

export default function QuestionnaireTestPage({ params }: QuestionnaireTestPageProps) {
    const { id } = params;

    // 从问卷数据中获取指定id的量表
    const questionnaire = questionnaires.find(q => q.id === id);

    // 如果找不到数据，显示404页面
    if (!questionnaire) {
        return notFound();
    }

    // 这里只是一个占位，实际测试页面需要根据不同量表的具体问题和评分方式来实现
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                <h1 className="text-2xl font-bold mb-6">{questionnaire.title} - 测评</h1>

                <div className="mb-8">
                    <p className="text-gray-700 mb-4">
                        这是{questionnaire.title}的测评页面。根据每个问题选择最符合您情况的选项。
                    </p>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <p className="text-sm text-yellow-700">
                            注意：此页面仅为示例。实际测评内容需要根据{questionnaire.title}的具体问题设计。
                        </p>
                    </div>

                    {/* 示例问题 */}
                    <div className="space-y-8 mt-8">
                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">问题1：这是{questionnaire.title}的示例问题</h3>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input type="radio" id="q1-1" name="q1" className="mr-2" />
                                    <label htmlFor="q1-1">选项1</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="q1-2" name="q1" className="mr-2" />
                                    <label htmlFor="q1-2">选项2</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="q1-3" name="q1" className="mr-2" />
                                    <label htmlFor="q1-3">选项3</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="q1-4" name="q1" className="mr-2" />
                                    <label htmlFor="q1-4">选项4</label>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">问题2：这是{questionnaire.title}的另一个示例问题</h3>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input type="radio" id="q2-1" name="q2" className="mr-2" />
                                    <label htmlFor="q2-1">选项1</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="q2-2" name="q2" className="mr-2" />
                                    <label htmlFor="q2-2">选项2</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="q2-3" name="q2" className="mr-2" />
                                    <label htmlFor="q2-3">选项3</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="q2-4" name="q2" className="mr-2" />
                                    <label htmlFor="q2-4">选项4</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <Button variant="outline">上一页</Button>
                    <Button>下一页</Button>
                </div>
            </div>
        </div>
    );
} 