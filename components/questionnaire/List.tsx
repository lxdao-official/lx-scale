'use client';
import { Search } from 'lucide-react';
import { useState, useCallback } from 'react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Separator } from "@/components/ui/separator";
import { TagFilters } from '@/components/TagFilters';
import { useScopedI18n } from '@/locales/client';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { Questionnaire } from '@/types';

export default function QuestionnaireList() {
  const questionnaires = useQuestionnaire();
  const t = useScopedI18n('component.questionnaire.list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Callback function for tag changes
  const handleTagsChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);


  // Filter questionnaires based on search terms and tags
  const filteredQuestionnaires = (questionnaires as Questionnaire[]).filter((q) => {
    // Text search filtering
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Tag filtering - if no tags are selected, don't filter
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => q.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container px-4 py-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-medium mb-6">{t('title')}</h1>

          {/* Search bar */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tag filters */}
          <TagFilters onTagsChange={handleTagsChange} />

          {/* Questionnaire list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredQuestionnaires.length > 0 ? (
              filteredQuestionnaires.map((questionnaire) => (
                <Card key={questionnaire.id}>
                  <CardHeader>
                    <CardTitle>{questionnaire.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 h-12">
                      <p
                        className="text-sm text-muted-foreground"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
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
                    <span className="text-xs text-muted-foreground">
                      {questionnaire.time}
                    </span>
                    <Link href={`/questionnaire/${questionnaire.id}/details`}>
                      <Button className="cursor-pointer">
                        {t('detailButton')}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                {t('noMatch')}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
