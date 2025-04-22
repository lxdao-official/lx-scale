"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SCL90Page() {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                <h1 className="text-2xl font-bold mb-4">SCL90量表</h1>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">简介</h2>
                    <p className="text-gray-700">
                        SCL-90（Symptom Checklist-90）量表，即症状自评量表，是一种用于评估个体心理症状和心理健康状况的自评量表，广泛应用于医学、心理学、社会学等领域，用于筛查心理问题、评估治疗效果等。SCL-90量表由美国精神病学家德若伽提斯（L. R. Derogatis）于1975年编制。该量表包含90个项目，涵盖了躯体化、强迫症状、人际关系敏感、抑郁、焦虑、敌对、恐怖、偏执、精神病性及睡眠饮食等10个因子，能够全面评估个体在躯体和心理方面的症状表现。它适用于16岁以上的成年人，尤其在临床诊断、心理咨询、流行病学调查等方面具有重要价值。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-medium mb-2">问题数</h2>
                        <p className="text-gray-700">90个</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium mb-2">测评时间</h2>
                        <p className="text-gray-700">通常为10-20分钟</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">测试说明</h2>
                    <p className="text-gray-700">
                        SCL-90量表的测试对象需要根据自身近一周（或近一个月）的实际感受，对90个条目进行自我评定。每个条目分为5个等级，从"无"到"极重"分别计1到5分。测试过程中，被测者应仔细阅读每个条目，根据自己的实际情况选择最符合的选项。如果对某些条目不太确定，可以选择"轻度"或"中度"，但尽量避免过多的"无"选项，以免影响测试结果的准确性。
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">评分方法</h2>
                    <div className="text-gray-700">
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>总分</strong>：将90个条目的得分相加，得到总分。总分越高，表示心理症状越严重。</li>
                            <li><strong>平均分</strong>：总分除以90，得到平均分。平均分≥2，提示可能存在明显的心理问题。</li>
                            <li><strong>因子分</strong>：将每个因子所包含的条目得分相加，再除以该因子的条目数，得到该因子的平均分。因子分≥2，提示该因子所代表的心理症状较为突出。</li>
                            <li><strong>阳性项目数</strong>：得分≥2的条目数。阳性项目数越多，说明心理症状涉及的范围越广。</li>
                            <li><strong>阳性症状均分</strong>：将所有阳性项目（得分≥2）的得分相加，再除以阳性项目数。阳性症状均分越高，说明阳性症状的严重程度越高。</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">维度说明</h2>
                    <div className="text-gray-700">
                        <ol className="list-decimal pl-5 space-y-1">
                            <li><strong>躯体化</strong>：主要反映身体不适和疼痛等症状，如头痛、背痛、四肢酸痛等。</li>
                            <li><strong>强迫症状</strong>：反映强迫观念和强迫行为，如反复洗手、检查门窗等。</li>
                            <li><strong>人际关系敏感</strong>：反映在人际交往中的敏感和不安，如担心他人对自己的看法等。</li>
                            <li><strong>抑郁</strong>：反映情绪低落、兴趣减退、自我评价低等症状。</li>
                            <li><strong>焦虑</strong>：反映紧张、不安、害怕等情绪体验。</li>
                            <li><strong>敌对</strong>：反映愤怒、冲动、与人争执等行为倾向。</li>
                            <li><strong>恐怖</strong>：反映恐惧、害怕等情绪，如害怕社交场合、害怕特定事物等。</li>
                            <li><strong>偏执</strong>：反映多疑、敏感、固执等症状。</li>
                            <li><strong>精神病性</strong>：反映幻觉、妄想、思维异常等精神病性症状。</li>
                            <li><strong>睡眠饮食</strong>：反映睡眠和饮食情况，如失眠、食欲不振等。</li>
                        </ol>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">注意事项</h2>
                    <div className="text-gray-700">
                        <ol className="list-decimal pl-5 space-y-1">
                            <li><strong>测试环境</strong>：测试应在安静、舒适的环境中进行，避免外界干扰，确保被测者能够认真、准确地填写量表。</li>
                            <li><strong>指导语清晰</strong>：测试前应向被测者详细说明测试的目的、方法和填写要求，确保其理解并积极配合。</li>
                            <li><strong>诚实填写</strong>：被测者应根据自己的真实感受填写量表，避免夸大或隐瞒症状。</li>
                            <li><strong>避免疲劳</strong>：测试时间不宜过长，如果被测者感到疲劳或注意力不集中，可适当休息后再继续填写。</li>
                            <li><strong>专业解读</strong>：测试结果应由专业的心理咨询师或医生进行解读，避免自行诊断或过度解读。</li>
                        </ol>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2">参考资料</h2>
                    <div className="text-gray-700">
                        <ul className="list-disc pl-5">
                            <li>德若伽提斯（L. R. Derogatis）. 症状自评量表（SCL-90）[M]. 北京：中国心理卫生杂志，1984.</li>
                            <li>张明园. 精神科评定量表手册[M]. 长沙：湖南科学技术出版社，1993.</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8">
                    <Button className="w-full py-6 text-lg cursor-pointer">
                        <Link href="/questionnaire/scl90/test">开始测评</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
} 