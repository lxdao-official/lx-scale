# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LXScale is a free, open-source mental health assessment platform that provides psychological screening tools. Currently implements Y-BOCS (Yale-Brown Obsessive Compulsive Scale) questionnaire with plans to integrate more psychological assessment tools and AI-driven analysis.

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
- **RainbowKit**: Web3 integration (currently commented out)

### Key Directories
- `app/[locale]/`: App Router pages with locale support
- `components/`: Reusable UI components organized by domain
- `questionairies/`: Questionnaire data and definitions
- `hooks/`: Custom React hooks
- `types/`: TypeScript type definitions
- `locales/`: Internationalization files
- `lib/`: Utility functions

### Core Components Architecture

#### Questionnaire System
- **Data Layer**: Questionnaire definitions in `questionairies/` with locale-specific files
- **Types**: Centralized in `types/index.ts` defining `Questionnaire`, `QuestionType`, and `Option` interfaces
- **Hook**: `useQuestionnaire()` provides locale-aware questionnaire access
- **Calculator Components**: Located in `components/questionnaire/test/private/` for scoring logic
- **Result Components**: Located in `components/questionnaire/result/` for displaying results

#### Internationalization
- Uses `next-international` for locale routing (`/en/` and `/zh/`)
- Questionnaire data is separated by locale in `questionairies/en.ts` and `questionairies/zh.ts`
- Layout supports locale parameter from URL routing

#### Component Structure
- **Domain-based organization**: Components grouped by feature (home, questionnaire, ui)
- **Result Analysis**: Modular system where `ResultAnalysis.tsx` routes to specific questionnaire result components
- **Calculation Logic**: Separate calculator components for each questionnaire type with detailed scoring algorithms

### Data Flow
1. Questionnaire data is loaded via `useQuestionnaire()` hook
2. User answers are collected and passed to calculator components
3. Results are processed and displayed through specialized result components
4. AI analysis is available through `/api/chat` endpoint using DeepSeek API

## Important Notes

- Currently only implements Y-BOCS questionnaire; architecture supports easy addition of new questionnaires
- AI API key is hardcoded in `app/api/chat/route.ts` - should be moved to environment variables
- RainbowKit integration is commented out but ready for Web3 donation features
- Each questionnaire should have its own calculator component in `components/questionnaire/test/private/`
- Results are displayed through questionnaire-specific components in `components/questionnaire/result/analysis/`

## Adding New Questionnaires

1. Create questionnaire data file in `questionairies/[locale]/[questionnaire-id].ts`
2. Add to export in `questionairies/[locale].ts`
3. Create calculator component in `components/questionnaire/test/private/[QuestionnaireId]Calculator.tsx`
4. Create result component in `components/questionnaire/result/analysis/[QuestionnaireId]Result.tsx`
5. Add case to `ResultAnalysis.tsx` switch statement