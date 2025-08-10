# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LXScale is a free, open-source mental health assessment platform that provides psychological screening tools. Currently implements 12 questionnaires (OCD/Y-BOCS, SCL-90, SDS, GAD-7, PHQ-9, PSS-10, DASS-21, BDI-2, ISI, ADHD, GD, NPD) with AI-driven analysis through DeepSeek API.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Tech Stack
- **Next.js 15**: App Router with internationalization (i18n)
- **TypeScript**: Full type safety
- **Tailwind CSS 4**: Utility-first styling  
- **Shadcn/ui**: Component library with Radix UI primitives
- **Next-international**: i18n support for zh/en locales
- **Sonner**: Toast notifications
- **DeepSeek API**: AI-powered result analysis
- **RainbowKit**: Web3 integration (currently commented out)

### Core Architecture

#### Questionnaire System
- **Data Layer**: Each questionnaire has locale-specific data files in `questionairies/[questionnaire-id]/[locale].ts`
- **Type System**: Core interfaces (`Questionnaire`, `QuestionType`, `Option`) defined in `types/index.ts`
- **Data Access**: `useQuestionnaire()` hook provides locale-aware questionnaire loading
- **Scoring Logic**: Calculator components in `components/questionnaire/test/private/[QuestionnaireId]Calculator.tsx`
- **Result Display**: Analysis components in `components/questionnaire/result/analysis/[QuestionnaireId]Result.tsx`
- **Routing**: `ResultAnalysis.tsx` component routes to appropriate result component based on questionnaire ID

#### Internationalization
- URL-based locale routing: `/zh/` for Chinese, `/en/` for English
- Questionnaire exports consolidated in `questionairies/zh.ts` and `questionairies/en.ts`
- Translation files in `locales/[locale]/` for UI strings and result interpretations

#### API Integration
- **Chat API**: `/api/chat/route.ts` handles AI analysis requests
- **Rate Limiting**: IP-based rate limiting (10 requests/minute)
- **Streaming Support**: Supports both regular and streaming responses
- **Environment Variable**: `DEEPSEEK_API_KEY` for API authentication

### Data Flow
1. User selects questionnaire from list (locale-aware via `useQuestionnaire()`)
2. Answers collected in `QuestionnaireTest.tsx` component
3. Calculator component processes raw answers into scores
4. Result component displays scores, interpretations, and recommendations
5. Optional AI chat for personalized analysis via DeepSeek API

## Adding New Questionnaires

1. Create data files: `questionairies/[id]/zh.ts` and `questionairies/[id]/en.ts`
2. Export from: `questionairies/zh.ts` and `questionairies/en.ts`
3. Create calculator: `components/questionnaire/test/private/[Id]Calculator.tsx`
4. Create result component: `components/questionnaire/result/analysis/[Id]Result.tsx`
5. Add case in `ResultAnalysis.tsx` switch statement
6. Add translations: `locales/[locale]/result/[id].ts`

## Important Notes

- DeepSeek API key should be set via `DEEPSEEK_API_KEY` environment variable
- All questionnaires support answer persistence via browser localStorage
- Result sharing via URL with compressed answer data (LZ-string compression)
- Each questionnaire must implement its own scoring algorithm in calculator component
- Support for factor analysis and dimensional scoring where applicable