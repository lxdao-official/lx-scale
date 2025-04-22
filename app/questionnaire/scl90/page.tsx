"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { questionnaires, Questionnaire } from "@/constants/questionnaires";

export default function SCL90Page() {
    // 从问卷数据中获取SCL90量表
    const scl90 = questionnaires.find(q => q.id === "scl90");

    // 如果找不到数据，显示错误信息
    if (!scl90 || !scl90.details) {
        return (
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                    <h1 className="text-2xl font-bold mb-4">出错了</h1>
                    <p>未找到SCL90量表的详细信息</p>
                    <div className="mt-8">
                        <Button className="w-full cursor-pointer">
                            <Link href="/questionnaire">返回问卷列表</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // 解构获取详细信息
    const { details } = scl90;

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                <h1 className="text-2xl font-bold mb-4">{scl90.title}</h1>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">简介</h2>
                    <p className="text-gray-700 line-clamp-4 h-24 overflow-hidden">
                        {details.introduction}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-medium mb-2">问题数</h2>
                        <p className="text-gray-700">{details.questionCount}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium mb-2">测评时间</h2>
                        <p className="text-gray-700">{details.evaluationTime}</p>
                    </div>
                </div>

                {details.instructions && (
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">测试说明</h2>
                        <p className="text-gray-700">
                            {details.instructions}
                        </p>
                    </div>
                )}

                {details.scoringMethod && details.scoringMethod.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">评分方法</h2>
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
                        <h2 className="text-lg font-medium mb-2">维度说明</h2>
                        <div className="text-gray-700">
                            <ol className="list-decimal pl-5 space-y-1">
                                {details.dimensions.map((dim: { name: string; description: string }, index: number) => (
                                    <li key={index}><strong>{dim.name}</strong>：{dim.description}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}

                {details.notes && details.notes.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">注意事项</h2>
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
                        <h2 className="text-lg font-medium mb-2">参考资料</h2>
                        <div className="text-gray-700">
                            <ul className="list-disc pl-5">
                                {details.references.map((ref: string, index: number) => (
                                    <li key={index}>{ref}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <Button className="w-full py-6 text-lg cursor-pointer">
                        <Link href="/questionnaire/scl90/test">开始测评</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
} 