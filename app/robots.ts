import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finzavio.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login/', '/report/', '/coming-soon/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
