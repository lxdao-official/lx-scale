import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
    zh: () => import('./zh'),
    en: () => import('./en'),
})