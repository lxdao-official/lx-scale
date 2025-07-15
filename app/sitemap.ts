import { MetadataRoute } from 'next'

const questionnaires = [
  { id: 'ocd', name: 'Y-BOCS耶鲁-布朗强迫症量表' },
  { id: 'scl90', name: 'SCL-90症状自评量表' },
  { id: 'sds', name: 'SDS抑郁自评量表' },
  { id: 'gad7', name: 'GAD-7广泛性焦虑量表' },
  { id: 'phq9', name: 'PHQ-9患者健康问卷' },
  { id: 'pss10', name: 'PSS-10知觉压力量表' },
  { id: 'dass21', name: 'DASS-21抑郁焦虑压力量表' },
  { id: 'bdi2', name: 'BDI-II贝克抑郁量表' },
  { id: 'isi', name: 'ISI失眠严重程度指数' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lxscale.xyz'
  
  // Base pages - add all language versions
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          'zh': `${baseUrl}/zh`,
          'en': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          'zh': `${baseUrl}/zh`,
          'en': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          'zh': `${baseUrl}/zh`,
          'en': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/questionnaire`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'zh': `${baseUrl}/zh/questionnaire`,
          'en': `${baseUrl}/en/questionnaire`,
        },
      },
    },
  ]

  // Questionnaire pages
  const questionnairePages: MetadataRoute.Sitemap = questionnaires.flatMap(q => [
    {
      url: `${baseUrl}/zh/questionnaire/${q.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/questionnaire/${q.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/questionnaire/${q.id}/details`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/questionnaire/${q.id}/details`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ])

  return [...staticPages, ...questionnairePages]
}