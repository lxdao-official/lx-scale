'use client';

import React from 'react';
import { useScopedI18n } from '@/locales/client';

function useLabels() {
  const t = useScopedI18n('components.ocdResult');
  return {
    total: t('totalScore'),
    obs: t('obsessionsScore'),
    comp: t('compulsionsScore'),
    severity: t('severity'),
    severityMap: {
      1: t('severityLevel.1'),
      2: t('severityLevel.2'),
      3: t('severityLevel.3'),
      4: t('severityLevel.4'),
      5: t('severityLevel.5'),
    } as Record<number, string>,
  };
}

export function OCDResult({
  answers,
}: {
  answers: string[];
}) {
  const labels = useLabels();
  const toNumber = (v: string | undefined) => Number(v) || 0;

  let obsessionsScore = 0;
  let compulsionsScore = 0;
  for (let i = 1; i <= 10; i++) {
    const score = toNumber(answers[i - 1]); // array index start 0
    if (i <= 5) obsessionsScore += score;
    else compulsionsScore += score;
  }

  const totalScore = obsessionsScore + compulsionsScore;

  let severityLevel = 0;
  if (totalScore >= 32) severityLevel = 5;
  else if (totalScore >= 24) severityLevel = 4;
  else if (totalScore >= 16) severityLevel = 3;
  else if (totalScore >= 8) severityLevel = 2;
  else severityLevel = 1;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard title={labels.total} value={totalScore} />
      <MetricCard title={labels.obs} value={obsessionsScore} />
      <MetricCard title={labels.comp} value={compulsionsScore} />
      <MetricCard
        title={labels.severity}
        value={`${labels.severityMap[severityLevel] || '?'} (${severityLevel})`}
        className="md:col-span-3"
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  className?: string;
}

function MetricCard({ title, value, className = '' }: MetricCardProps) {
  return (
    <div
      className={`bg-white border rounded-lg p-4 flex flex-col items-center shadow-sm ${className}`}
    >
      <span className="text-sm text-gray-500 mb-1">{title}</span>
      <span className="text-2xl font-semibold text-indigo-600">{value}</span>
    </div>
  );
}
