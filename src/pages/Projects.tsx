import React from 'react';
import Layout from './Layout';
import projects from './projects/projects.json';
import { ProjectCard } from '../components';
import { Project } from '../utils/types';

const Projects: React.FC = () => {
  return (
    <Layout>
      <section className='flex flex-row w-full gap-16 flex-wrap xl:flex-nowrap'
        id='projects'>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-Mregular text-white
        text-sm gap-4 w-full'>
          {projects.map((project: Project, index: number) => (
            <ProjectCard project={project} key={index} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Projects;
