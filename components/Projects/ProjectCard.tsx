'use client';

import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  ArrowDownTrayIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ProjectCardItem from './ProjectCardItem';
import Image from 'next/image';
import { Project, Repository } from '@/types';
import { getRepository } from '@/lib/GetRepository';
import { getIcon } from '@/lib/GetIcon';
import { TechBadge } from '../TechBadge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [repository, setRepository] = useState<Repository | null>(null);
  const router = useRouter();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setShowPreview(true);

    router.prefetch(`/projects/${project.slug}`);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setShowPreview(false);
  };

  useEffect(() => {
    if (project.repository && !repository) {
      getRepository(project.repository).then((repo: any) => {
        setRepository(repo);
      });
    }
  }, [project.repository, repository]);

  return (
    <li className='w-full h-full rounded-lg' key={project.title}>
      <div
        className='dark:bg-tertiary-500 bg-white border-[1px] dark:border-tertiary-480 border-tertiary-100 items-center
        rounded-lg flex transition-all ease-in-out w-full cursor-pointer duration-200 group/card
        flex-col shadow-sm p-4 dark:hover:border-tertiary-450 hover:border-tertiary-150
        relative h-full'
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => {
          if (e.button === 1) {
            window.open(
              `/projects/${project.slug}`,
              '_blank'
            );
          }
        }}
        onClick={(e) => {
          e.preventDefault();
          const target = e.currentTarget;
          target.style.opacity = '0.7';
          target.style.transform = 'scale(0.98)';
          router.push(`/projects/${project.slug}`);
        }}
      >
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-lg'
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px,
            rgba(255,255,255,.03), transparent 40%)`,
          }}
        />
        <div className='flex flex-col gap-5 w-full'>
          <div
            className='w-full h-40 md:h-56 overflow-hidden dark:border-tertiary-480 border-tertiary-100
          duration-150 dark:group-hover/card:border-tertiary-450 group-hover/card:border-tertiary-150 rounded-lg border-[1px]
          transition-all'
          >
            {project.preview ? (
              <Image
                src={showPreview && project.preview ? project.preview : project.image || ''}
                alt={project.title}
                className='object-cover group-hover/card:scale-101 h-full w-full transition-all duration-500'
                width={1920}
                height={1080}
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                className='object-cover group-hover/card:scale-101 h-full w-full transition-all duration-500'
                width={1920}
                height={1080}
              />
            ) : (
              <div className='w-full h-full flex flex-row justify-center items-center'>
                <h2
                  className='font-Iregular dark:text-white/70 text-black/70 text-base md:text-lg
                text-center'
                >
                  Nothing here yet!
                </h2>
                <MagnifyingGlassIcon
                  className='w-4 h-4 md:w-5 md:h-5 ml-2 dark:text-white/70 text-black/70'
                />
              </div>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='font-bold dark:text-white/90 text-black/90 text-sm md:text-base'>
                {project.title}
              </h3>
              <ArrowTopRightOnSquareIcon className='w-4 h-4 md:w-5 md:h-5 dark:text-white/90 text-black/90' />
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              {project.tools.sort().map((tool: string, index: number) => {
                const ToolIcon = getIcon(tool);
                if (!ToolIcon)
                  return null;
                return <TechBadge key={index} tech={tool} icon={ToolIcon} />;
              })}
            </div>
            <h4 className='font-Imedium dark:text-white/60 text-black/60 text-xs md:text-sm'>
              {project.date}
            </h4>
            <p className='font-normal dark:text-white/70 text-black/70 text-xs md:text-sm'>
              {project.description.slice(0, 200)}
              {project.description.length > 100 && '...'}
            </p>
            {(project.stats?.downloads ||
              project.stats?.users ||
              repository?.watchers_count) ? (
              <div className='h-[1px] dark:bg-tertiary-480 bg-tertiary-100 w-full my-3 dark:group-hover/card:bg-tertiary-450 group-hover/card:bg-tertiary-150 transition-all duration-150' />
            ) : null}
            <div className='flex flex-row items-center gap-3'>
              {project.stats?.downloads ? (
                <ProjectCardItem tooltip={project.stats.downloads.tooltip}>
                  <ArrowDownTrayIcon className='w-4 h-4 md:w-5 md:h-5 dark:text-white/70 text-black/70 mr-2' />
                  <p className='font-Imedium dark:text-white/70 text-black/70 text-xs md:text-sm'>
                    {project.stats.downloads.value}
                  </p>
                </ProjectCardItem>
              ) : null}
              {project.stats?.users ? (
                <ProjectCardItem tooltip={project.stats.users.tooltip}>
                  <UsersIcon className='w-4 h-4 md:w-5 md:h-5 dark:text-white/70 text-black/70 mr-2' />
                  <p className='font-Imedium dark:text-white/70 text-black/70 text-xs md:text-sm'>
                    {project.stats.users.value}
                  </p>
                </ProjectCardItem>
              ) : null}
              {repository?.watchers_count ? (
                <ProjectCardItem tooltip='Number of stars on GitHub repository' className='group/item'>
                  <StarIcon className='w-4 h-4 md:w-5 md:h-5 dark:text-white/70 text-black/70 mr-2 fill-transparent group-hover/item:fill-yellow group-hover/item:text-yellow transition-all duration-200' />
                  <p className='font-Imedium dark:text-white/70 text-black/70 text-xs md:text-sm'>
                    {repository.watchers_count}
                  </p>
                </ProjectCardItem>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
