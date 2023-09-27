import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import projects from './projects.json';
import { useParams } from 'react-router-dom';
import getIcon from '../utils/getIcon';
import {
  ArrowRightIcon
} from '@heroicons/react/24/solid';
import {
  backhand_index_pointing_right as rightHandEmoji
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
  const [ project, setProject ] = useState<Project | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const project = projects.find((project) => {
        return project.title.toLowerCase().replace(/ /g, '-') === id;
      });
      if (project)
        setProject(project);
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
          <div className='flex flex-row items-center flex-wrap gap-2'>
            <h1 className='font-Mbold text-3xl text-secondary-500 mr-5'>
              {project.title}
            </h1>
            {project.tags.map((tag: string, index: number) => (
              <span key={index} className='bg-secondary-500 text-tertiary-0
              font-Mmedium text-sm rounded-full px-3 py-1 h-fit bg-opacity-30
              border border-secondary-500'>
                {tag}
              </span>
            ))}
          </div>
          <div className='flex flex-row items-center'>
            <p className='font-Imedium text-tertiary-100 mr-5'>
              {project.date}
            </p>
            <div className='flex flex-row gap-2 flex-wrap'>
              {project.tools.map((tool: string, index: number) => (
                <img
                  key={index}
                  src={getIcon(tool)}
                  alt={tool} className='w-6 h-6 inline-block rounded-sm'
                />
              ))}
            </div>
          </div>
          <hr className='border-tertiary-400 my-5' />
          <p className='font-Mregular text-tertiary-100'>
            {project.description}
          </p>
          <hr className='border-tertiary-400 my-5' />
          <div className='flex flex-col gap-2'>
            {project.links.github && (
              <a onClick={() => window.open(project.links.github, '_blank')}
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500 cursor-pointer'>
                <span className='bg-left-bottom bg-gradient-to-r
                from-secondary-500 to-secondary-500 bg-[length:0%_2px]
                bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
                duration-500 ease-out flex gap-2'>
                  <img src={rightHandEmoji} alt='Right Hand Emoji'
                    className='w-5 h-5 inline-block' />
                  View on GitHub
                </span>
              </a>
            )}
            {project.links.app && (
              <a onClick={() => window.open(project.links.app, '_blank')}
                className='group w-fit ease-in-out font-Mmedium text-tertiary-0
                hover:text-secondary-500 cursor-pointer'>
                <span className='bg-left-bottom bg-gradient-to-r
                from-secondary-500 to-secondary-500 bg-[length:0%_2px]
                bg-no-repeat pb-1 group-hover:bg-[length:100%_2px] transition-all
                duration-500 ease-out flex gap-2'>
                  <img src={rightHandEmoji} alt='Right Hand Emoji'
                    className='w-5 h-5 inline-block' />
                  View App
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
