import { Project } from '@/types';
import { allArticles, allProjects } from 'contentlayer/generated';

export async function getDocFromParams(params: { slug: string[] }) {
  if (!params.slug)
    return null;
  const slug = '/' + params.slug[params.slug.length - 1];
  const project = allProjects.find((project) => project.slug === slug);

  if (!project)
    return null;

  const { serialize } = await import('next-mdx-remote/serialize');
  const serialized = await serialize(project.body.raw);

  return {
    ...project,
    code: serialized,
  };
}

export function getProjects(): any[] {
  let projects = allProjects;

  projects = projects.filter((project) => project.published);
  projects = projects.sort((a, b) => (a.index as number || 50) - (b.index || 50));


  return projects;
}

export async function getArticleFromSlug(params: { slug: string[] }) {
  if (!params.slug)
    return null;
  const slug = '/' + params.slug[params.slug.length - 1];
  const article = allArticles.find((article) => article.slug === slug);

  if (!article)
    return null;

  const { serialize } = await import('next-mdx-remote/serialize');
  const serialized = await serialize(article.body.raw);

  return {
    ...article,
    code: serialized,
  };
}

export function getArticles(): any[] {
  let articles = allArticles;
  articles = articles.filter((article) => article.published);
  return articles;
}

