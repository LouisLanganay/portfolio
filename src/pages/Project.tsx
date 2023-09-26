import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import projects from './projects.json';
import { useParams } from 'react-router-dom';
import getIcon from '../utils/getIcon';

interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  date: string;
  tags: string[];
  tools: string[];
}

const Project: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const project = projects.find((project) => {
        return project.title.toLowerCase().replace(/ /g, '-') === id;
      });
      if (project) setProject(project);
    }
  }, []);

  if (!project) return (
    <Layout>
      Loading....
    </Layout>
  );

  return (
    <Layout>
      <div className='flex flex-col'>
        <img src={project.image} alt={project.title}
          className='w-full h-64 object-cover rounded-2xl blur-sm' />
        <div className='flex flex-col gap-2 mt-4'>
          <h1 className='font-Mbold text-3xl text-secondary-500'>
            {project.title}
          </h1>
          <p className='font-Mregular text-tertiary-200'>
            {project.description}
          </p>
          <div className='flex flex-row gap-1'>
            {project.tools.map((tool: string, index: number) => (
              <img
                key={index}
                src={getIcon(tool)}
                alt={tool} className='w-6 h-6 inline-block mr-2 rounded-sm'
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
