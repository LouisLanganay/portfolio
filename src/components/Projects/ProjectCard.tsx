import React, { useEffect, useRef, useState } from 'react';
import getIcon from '../../utils/getIcon';
import {
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  ArrowDownTrayIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import getRepository from '../../utils/getRepository';
import { useNavigate } from 'react-router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProjectCardItem from './ProjectCardItem';
import { Project, Repository } from '../../utils/types';

const ProjectCard: React.FC<{ project: Project, key: number }> = ({
  project, key
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [ repository, setRepository ] = React.useState<Repository | null>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    if (project.repository) {
      getRepository(project.repository).then((repo) => {
        setRepository(repo);
      });
    }
  }, []);

  console.info(repository);
  return (
    <li key={key} className='w-full h-auto rounded-lg'>
      <div className='bg-tertiary-500 border-[1px] border-tertiary-480 items-center
      rounded-lg flex transition-all ease-in-out w-full cursor-pointer duration-200 group
      flex-col shadow-sm p-4 hover:border-tertiary-450
      relative h-full' ref={divRef} onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      onMouseDown={(e) => {
        if (e.button === 1) {
          window.open(`/projects/${project
            .title.toLowerCase().replace(/ /g, '-')}`, '_blank');
        }
      }}
      onClick={() => {
        navigate(`/projects/${project.title.toLowerCase().replace(/ /g, '-')}`);
      }} key={key}>
        <div className='pointer-events-none absolute -inset-px opacity-0 transition
        duration-300 rounded-lg'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px,
            rgba(255,255,255,.03), transparent 40%)`
        }}
        />
        <div className='flex flex-col gap-5 w-full'>
          <div className='w-full h-40 md:h-64 overflow-hidden border-tertiary-480
          duration-150 group-hover:border-tertiary-450 rounded-lg border-[1px]
          transition-all'>
            {project.image ? (
              <img src={project.image} alt={project.title}
                className='object-cover group-hover:scale-101 h-full w-full transition-all
                duration-500' />
            ) : (
              <div className='w-full h-full flex flex-row justify-center items-center'>
                <h2 className='font-Iregular text-white/70 text-base md:text-lg
                text-center'>
                  Nothing here yet!
                </h2>
                <MagnifyingGlassIcon className='w-4 h-4 md:w-5 md:h-5 ml-2
                text-white/70' />
              </div>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='font-Mbold text-sm md:text-base text-white/90'>
                {project.title}
              </h3>
              <ArrowTopRightOnSquareIcon className='w-4 h-4 md:w-5 md:h-5
              text-white/90' />
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              {project.tools.sort().map((tool: string) => (
                <img src={getIcon(tool)} alt={tool}
                  className='w-4 h-4 md:w-5 md:h-5 inline-block mr-2 rounded-sm'
                />
              ))}
            </div>
            <h4 className='font-Imedium text-white/60 text-xs md:text-sm'>
              {project.date}
            </h4>
            <p className='font-Mregular text-white/70 text-xs md:text-sm'>
              {project.description.slice(0, 100)}
              {project.description.length > 100 && '...'}
            </p>
            {(project.stats?.downloads || project.stats?.users ||
            repository?.watchers_count) ? (
                <div className='h-[1px] bg-tertiary-480 w-full my-3
              group-hover:bg-tertiary-450 transition-all duration-150' />
              ) : null }
            <div className='flex flex-row items-center gap-3'>
              {project.stats?.downloads && (
                <ProjectCardItem tooltip={project.stats.downloads.tooltip}>
                  <ArrowDownTrayIcon className='w-4 h-4 md:w-5 md:h-5 text-white/70
                  mr-2' />
                  <p className='font-Imedium text-white/70 text-xs md:text-sm'>
                    {project.stats.downloads.value}
                  </p>
                </ProjectCardItem>
              )}
              {project.stats?.users && (
                <ProjectCardItem tooltip={project.stats.users.tooltip}>
                  <UsersIcon className='w-4 h-4 md:w-5 md:h-5 text-white/70 mr-2' />
                  <p className='font-Imedium text-white/70 text-xs md:text-sm'>
                    {project.stats.users.value}
                  </p>
                </ProjectCardItem>
              )}
              {repository?.watchers_count && (
                <ProjectCardItem tooltip='Number of stars on GitHub repository'>
                  <StarIcon className='w-4 h-4 md:w-5 md:h-5 text-white/70 mr-2' />
                  <p className='font-Imedium text-white/70 text-xs md:text-sm'>
                    {repository.watchers_count}
                  </p>
                </ProjectCardItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
