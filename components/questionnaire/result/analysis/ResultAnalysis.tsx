"use client";

import React from 'react';
import { OCDResult } from './OCDResult';
import { SCL90Result } from './SCL90Result';
import { SDSResult } from './SDSResult';
import { GAD7Result } from './GAD7Result';
import { PHQ9Result } from './PHQ9Result';
import { PSS10Result } from './PSS10Result';
import { DASS21Result } from './DASS21Result';
import { BDI2Result } from './BDI2Result';
import { ISIResult } from './ISIResult';

interface Props {
  questionnaireId: string;
  answers: string[];
}

export function ResultAnalysis({ questionnaireId, answers }: Props) {
  switch (questionnaireId) {
    case 'ocd':
      return <OCDResult answers={answers} />;
    case 'scl90':
      return <SCL90Result answers={answers} />;
    case 'sds':
      return <SDSResult answers={answers} />;
    case 'gad7':
      return <GAD7Result answers={answers} />;
    case 'phq9':
      return <PHQ9Result answers={answers} />;
    case 'pss10':
      return <PSS10Result answers={answers} />;
    case 'dass21':
      return <DASS21Result answers={answers} />;
    case 'bdi2':
      return <BDI2Result answers={answers} />;
    case 'isi':
      return <ISIResult answers={answers} />;
    default:
      return (
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-yellow-800">
            <h3 className="font-semibold mb-2">暂不支持的量表</h3>
            <p className="text-sm">
              抱歉，暂时不支持量表ID为 &quot;{questionnaireId}&quot; 的结果分析。
              请检查量表配置或联系开发人员。
            </p>
          </div>
        </div>
      );
  }
}
