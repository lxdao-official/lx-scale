interface RecommendationsProps {
    isSevere: boolean;
    positiveItemAverage?: number;
}

export function Recommendations({ isSevere, positiveItemAverage }: RecommendationsProps) {
    const isHighSeverity = isSevere || (positiveItemAverage && positiveItemAverage > 3);

    return (
        <div>
            <h2 className="text-xl font-medium mb-3">建议</h2>
            <div className="bg-white border rounded-lg p-4">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>保持规律的生活习惯，确保充足的睡眠。</li>
                    <li>适量运动，有助于缓解压力和改善情绪。</li>
                    <li>寻求社会支持，与亲友交流您的感受。</li>
                    {isHighSeverity ? (
                        <li className="font-bold text-red-600">您的症状可能较为严重，强烈建议您尽快咨询专业心理医生获取帮助。</li>
                    ) : (
                        <li>如症状持续或加重，建议咨询专业心理医生。</li>
                    )}
                </ul>
            </div>
        </div>
    );
} 