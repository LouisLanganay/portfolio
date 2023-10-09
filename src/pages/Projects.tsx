import React from 'react';
import Layout from './Layout';
import projects from './projects/projects.json';
import { ProjectCard } from '../components';

interface Project {
  title: string;
  description: string;
  links?: {
    name: string;
    url: string;
  }[];
  image?: string;
  date: string;
  tags: string[];
  tools: string[];
  stats?: {
    users?: string;
    downloads?: string;
  };
  repository?: string;
}

const Projects: React.FC = () => {
  return (
    <Layout>
      <section className='flex flex-row w-full gap-16 flex-wrap xl:flex-nowrap'
        id='projects'>
        <ul className='flex flex-row font-Mregular text-white
        text-sm gap-5 w-full flex-wrap'>
          {projects.map((project: Project, index: number) => (
            <ProjectCard project={project} position={index} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Projects;
