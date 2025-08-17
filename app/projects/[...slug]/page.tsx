import React from 'react';
import { notFound } from 'next/navigation';
import { getDocFromParams } from '@/lib/Documents';
import ProjectPage from './project';

export default async function Page({ params }: { params: { slug: string[] } }) {
  let project = await getDocFromParams(params);

  if (!project || !project.published)
    return notFound();

  console.log("project", project.id);
  return <ProjectPage project={project} />;
}
