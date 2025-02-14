import { ProjectCard } from '@/components/Projects/ProjectCard';
import { getProjects } from '@/lib/Documents';
import { Project } from '@/types';
import React from 'react';

export default async function Page() {
  const projects = getProjects();

  return (
    <section
      className='flex flex-row w-full gap-16 flex-wrap xl:flex-nowrap'
      id='projects'
    >
      <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-Mregular text-white text-sm gap-4 w-full'>
        {projects.map((project: Project, index: number) => (
          <ProjectCard project={project} key={index} />
        ))}
      </ul>
    </section>
  );
}
