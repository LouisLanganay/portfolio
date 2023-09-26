import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import projects from './projects.json';
import { useParams } from 'react-router-dom';
import getIcon from '../utils/getIcon';
import {
  ArrowRightIcon
} from '@heroicons/react/24/solid';
import {
  hammer_and_wrench as toolsIcon
} from '../assets/emojis/index';

interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    app?: string;
  }
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
      <div className='flex flex-col h-full'>
        <img src={project.image} alt={project.title}
          className='w-full h-64 object-cover rounded-2xl shadow-lg' />
        <div className='flex flex-col gap-2 mt-4'>
          <div className='flex flex-row items-center'>
            <h1 className='font-Mbold text-3xl text-secondary-500 mr-5'>
              {project.title}
            </h1>
            {project.tags.map((tag: string, index: number) => (
              <span key={index} className='bg-secondary-500 text-tertiary-0
              font-Mmedium text-sm rounded-full px-3 py-1 h-fit bg-opacity-30
              border border-secondary-500 ml-2'>
                {tag}
              </span>
            ))}
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <img src={toolsIcon} alt='Tools'
              className='w-8 h-8 inline-block mr-1' />
            <h4 className='text-tertiary-200 font-Mmedium text-lg mr-2'>
              Tools I used:
            </h4>
            {project.tools.map((tool: string, index: number) => (
              <img
                key={index}
                src={getIcon(tool)}
                alt={tool} className='w-8 h-8 inline-block mr-2 rounded-sm'
              />
            ))}
          </div>
          <hr className='border-tertiary-400 my-5' />
          <p className='font-Mregular text-tertiary-200'>
            {project.description}
          </p>
          <hr className='border-tertiary-400 my-5' />
          <div className='flex flex-col gap-2'>
            {project.links.github && (
              <a href={project.links.github}
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500'>
                <span className='bg-left-bottom bg-gradient-to-r from-secondary-500
                to-secondary-500 bg-[length:0%_2px] bg-no-repeat pb-1
                group-hover:bg-[length:100%_2px] transition-all duration-500
                ease-out'>
                  View on GitHub
                  <ArrowRightIcon className='w-5 h-5 inline-block ml-1
                  group-hover:ml-3 transition-all hover:text-secondary-500' />
                </span>
              </a>
            )}
            {project.links.app && (
              <a href={project.links.app}
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500'>
                <span className='bg-left-bottom bg-gradient-to-r from-secondary-500
                to-secondary-500 bg-[length:0%_1px] bg-no-repeat pb-1
                group-hover:bg-[length:100%_1px] transition-all duration-500
                ease-out'>
                  View App
                  <ArrowRightIcon className='w-5 h-5 inline-block ml-1
                  group-hover:ml-3 transition-all hover:text-secondary-500' />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
