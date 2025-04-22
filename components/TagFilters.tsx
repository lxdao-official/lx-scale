"use client"

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface TagFiltersProps {
    onTagsChange: (tags: string[]) => void;
}

export function TagFilters({ onTagsChange }: TagFiltersProps) {
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setActiveTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // 当标签变化时通知父组件
    useEffect(() => {
        onTagsChange(activeTags);
    }, [activeTags, onTagsChange]);

    const tags = ['抑郁', '焦虑', '强迫', '创伤后应激', '人格障碍', '精神分裂', '进食障碍', 'ADHD', '风险评估', '自评量表', '他评量表'];

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
                <Button
                    key={tag}
                    variant="outline"
                    className={`cursor-pointer ${activeTags.includes(tag) ? "bg-muted text-muted-foreground" : ""}`}
                    onClick={() => toggleTag(tag)}
                >
                    {tag}
                </Button>
            ))}
        </div>
    );
} 