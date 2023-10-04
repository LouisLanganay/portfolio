import React, { useEffect } from 'react';
import getIcon from '../utils/getIcon';
import {
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  ArrowDownTrayIcon,
  StarIcon
} from '@heroicons/react/24/solid';
import getRepository from '../utils/getRepository';

interface Project {
  title: string;
  description: string;
  links?: {
    name: string;
    url: string;
  }[];
  image: string;
  date: string;
  tags: string[];
  tools: string[];
  stats?: {
    users?: string;
    downloads?: string;
  },
  repository?: string;
}

interface Repo {
  watchers_count: number;
}

const ProjectCard: React.FC<{ project: Project, position: number }> = ({
  project, position
}) => {
  const [ repository, setRepository ] = React.useState<Repo | null>(null);

  useEffect(() => {
    if (project.repository) {
      getRepository(project.repository).then((repo) => {
        setRepository(repo);
      });
    }
  }, []);

  console.info(repository);
  return (
    <li className='hover:bg-tertiary-500 p-4 rounded-lg max-w-[650px] w-full
    overflow-hidden cursor-pointer transition-all h-fit
    duration-150 group flex flex-col bg-opacity-60 hover:shadow-lg'
    onClick={() => {
      window.location.href = (`/projects/${project
        .title.toLowerCase().replace(/ /g, '-')}`);
    }} key={position}>
      <div className='flex flex-row gap-5 flex-wrap md:flex-nowrap'>
        <div className='flex flex-col gap-3 w-60 flex-shrink-0'>
          <img src={project.image} alt={project.title}
            className='w-full h-32 object-cover rounded-xl border-2 transition-all
            duration-150 border-tertiary-450 group-hover:border-tertiary-400' />
          <div className='flex flex-row gap-1 flex-wrap'>
            {project.tools.map((tool: string) => (
              <img
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
          <p className='font-Mregular text-tertiary-100 mt-3 text-base'>
            {project.description.slice(0, 100)}
            {project.description.length > 100 && '...'}
          </p>
          {(project.stats?.downloads ||
          project.stats?.users ||
          repository?.watchers_count) && (
            <div className='h-[1px] bg-tertiary-450 w-full my-4
          group-hover:bg-tertiary-400 transition-all duration-150' />
          )}
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
            {repository?.watchers_count && (
              <div className='flex flex-row items-center gap-1'>
                <StarIcon className='w-5 h-5 text-light-500' />
                <p className='font-Mbold text-light-500 text-base'>
                  {repository.watchers_count}
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
