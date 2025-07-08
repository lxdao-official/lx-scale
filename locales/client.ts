"use client"
import { createI18nClient } from 'next-international/client';

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
    zh: () => import('./zh/index'),
    en: () => import('./en/index'),
})
