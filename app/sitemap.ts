// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hoodhub.ru'
  
  // Define your supported languages
  const languages = ['en', 'ru']
  
  // Define your main routes (without language prefix)
  const routes = [
    {
      url: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/barbing',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/tattoo',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/braids-locs',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/lifestyle',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/book',
      priority: 0.8,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/contact',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: '/faq',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      url: '/terms',
      priority: 0.5,
      changeFrequency: 'yearly' as const,
    },
    {
      url: '/privacy',
      priority: 0.5,
      changeFrequency: 'yearly' as const,
    },
  ]

  // Generate sitemap entries for all language versions
  const sitemapEntries: MetadataRoute.Sitemap = []

  languages.forEach(lang => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: languages.reduce((acc, altLang) => {
            acc[altLang] = `${baseUrl}/${altLang}${route.url}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })

  return sitemapEntries
}