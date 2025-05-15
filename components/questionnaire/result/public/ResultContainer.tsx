import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ResultContainerProps {
    title: string;
    id: string;
    children: ReactNode;
}

export function ResultContainer({ title, id, children }: ResultContainerProps) {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 border">
                <h1 className="text-2xl font-bold mb-6">{title} - 测评结果</h1>

                <div className="mb-8">
                    <div className="space-y-6">
                        {children}
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