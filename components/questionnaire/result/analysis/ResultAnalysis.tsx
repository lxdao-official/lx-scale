"use client";

import React from 'react';
import { OCDResult } from './OCDResult';

interface Props {
  questionnaireId: string;
  answers: string[];
}

export function ResultAnalysis({ questionnaireId, answers }: Props) {
  switch (questionnaireId) {
    case 'ocd':
      return <OCDResult answers={answers} />;
    /*
    case 'scl90':
      return <SCL90Result answers={answers} />;
    case 'depression':
      return <DepressionResult answers={answers} />;
    */
    default:
      return null;
  }
}
