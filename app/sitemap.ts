import type { MetadataRoute } from 'next';
import { getProjects, getArticles } from '@/lib/Documents';
import { cleanSlug } from '@/lib/utils';

const baseUrl = 'https://www.louisl.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/articles`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${baseUrl}/projects/${cleanSlug(project.slug)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: `${baseUrl}/articles/${cleanSlug(article.slug)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
