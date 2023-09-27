import React from 'react';
import getIcon from '../utils/getIcon';
import {
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid';

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
  stats?: {
    users?: string;
    downloads?: string;
  }
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <li className='hover:bg-tertiary-500 p-4 rounded-lg w-[600px]
    overflow-hidden cursor-pointer transition-all h-fit
    duration-150 group flex flex-col bg-opacity-60 hover:shadow-lg'
    onClick={() => {
      window.location.href = (`/project/${project
        .title.toLowerCase().replace(/ /g, '-')}`);
    }}>
      <div className='flex flex-row gap-5'>
        <div className='flex flex-col gap-3 w-52 flex-shrink-0'>
          <img src={project.image} alt={project.title}
            className='w-full h-28 object-cover rounded-lg border-2 transition-all
            duration-150 border-tertiary-450 group-hover:border-tertiary-400' />
          <div className='flex flex-row gap-1 flex-wrap'>
            {project.tools.map((tool: string, index: number) => (
              <img
                key={index}
                src={getIcon(tool)}
                alt={tool} className='w-6 h-6 inline-block mr-2 rounded-sm'
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-2'>
            <h3 className='font-Mbold text-lg'>
              {project.title}
            </h3>
            <ArrowTopRightOnSquareIcon className='w-5 h-5 text-tertiary-100' />
          </div>
          <h4 className='font-Imedium text-tertiary-100 text-base'>
            {project.date}
          </h4>
          <p className='font-Mregular text-tertiary-100 mt-3'>
            {project.description.slice(0, 100)}...
          </p>
          <div className='h-[1px] bg-tertiary-450 w-full my-4
          group-hover:bg-tertiary-400 transition-all duration-150' />
          <div className='flex flex-row items-center gap-5'>
            {project.stats?.downloads && (
              <div className='flex flex-row items-center gap-1'>
                <ArrowDownTrayIcon className='w-5 h-5 text-secondary-500' />
                <p className='font-Mbold text-secondary-500 text-base'>
                  {project.stats.downloads}
                </p>
              </div>
            )}
            {project.stats?.users && (
              <div className='flex flex-row items-center gap-1'>
                <UsersIcon className='w-5 h-5 text-secondary-500' />
                <p className='font-Mbold text-secondary-500 text-base'>
                  {project.stats.users}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
