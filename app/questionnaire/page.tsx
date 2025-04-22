"use client"

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TagFilters } from "@/components/TagFilters";
import { questionnaires } from "@/constants/questionnaires";

export default function QuestionnairePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // 标签变化的回调函数
    const handleTagsChange = useCallback((tags: string[]) => {
        setSelectedTags(tags);
    }, []);

    // 根据搜索词和标签过滤问卷
    const filteredQuestionnaires = questionnaires.filter(q => {
        // 文本搜索过滤
        const matchesSearch =
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        // 标签过滤 - 如果没有选中标签，则不过滤
        const matchesTags = selectedTags.length === 0 ||
            selectedTags.every(tag => q.tags.includes(tag));

        return matchesSearch && matchesTags;
    });

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-1">
                <div className="container px-4 py-6 max-w-6xl mx-auto">
                    <h1 className="text-2xl font-medium mb-6">问答列表</h1>

                    {/* 搜索栏 */}
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="搜索..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* 标签筛选 */}
                    <TagFilters onTagsChange={handleTagsChange} />

                    {/* 问卷列表 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredQuestionnaires.length > 0 ? (
                            filteredQuestionnaires.map((questionnaire) => (
                                <Card key={questionnaire.id}>
                                    <CardHeader>
                                        <CardTitle>{questionnaire.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4 h-12">
                                            <p className="text-sm text-muted-foreground" style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '2',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {questionnaire.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {questionnaire.tags.map((tag, index) => (
                                                <Badge key={index}>{tag}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">{questionnaire.time}</span>
                                        <Button className="cursor-pointer">
                                            <Link href={`/questionnaire/${questionnaire.id}`}>了解详情</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-8 text-muted-foreground">
                                未找到匹配的问卷
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}