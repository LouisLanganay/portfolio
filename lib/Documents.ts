import { Project } from '@/types';
import { allProjects } from 'contentlayer/generated';

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
