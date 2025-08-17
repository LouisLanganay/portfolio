'use client';

import { Button } from '@/components/Button';
import { ExperienceLink } from '@/components/ExperienceLink';
import { Mdx } from '@/components/Mdx';
import ProjectCardItem from '@/components/Projects/ProjectCardItem';
import { TechBadge } from '@/components/TechBadge';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getIcon } from '@/lib/GetIcon';
import { getRepository } from '@/lib/GetRepository';
import { Repository } from '@/types';
import { ArrowDownTrayIcon, StarIcon, UsersIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectPage({ project }: { project: any }) {
  const router = useRouter();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => {
        setExperiences(data)
      })
      .catch(err => console.error('Error while loading experiences:', err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    if (project.repository && !repository) {
      getRepository(project.repository)
        .then((repo) => {
          setRepository(repo);
        })
        .catch((err) => {
          console.warn(`Failed to load repository for ${project.title}:`, err);
        });
    }

    return () => clearTimeout(timer);
  }, [project.repository, repository, project.title]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <h4 className='font-Mbold text-2xl dark:text-tertiary-100 text-tertiary-650'>
          Project not found
        </h4>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full w-full'>
      <Button variant='secondary' className='mb-4' onClick={() => router.push('/projects')}>
        &larr; Back to projects
      </Button>
      {project.video ? (
        <HeroVideoDialog
          videoSrc={project.video}
          thumbnailSrc={project.image}
          thumbnailAlt={project.title}
        />
      ) : (
        project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            className='w-full h-64 object-cover rounded-2xl shadow-lg'
            width={1000}
            height={256}
            priority
          />
        ) : null
      )}
      <div className='flex flex-col gap-2 mt-4'>
        <div className='flex flex-row items-center flex-wrap gap-2'>
          <h1 className='font-Mbold text-xl md:text-2xl dark:text-white text-black mr-5'>
            {project.title}
          </h1>
        </div>
        <div className='flex md:items-center gap-2 md:gap-5 flex-col md:flex-row'>
          <p className='font-Imedium dark:text-white/60 text-black/60 text-xs md:text-sm'>
            {project.date}
          </p>
          {(project.stats?.downloads ||
          project.stats?.users ||
          repository?.watchers_count) ? (
            <p className='dark:text-white/60 text-black/60 hidden md:block'>
              •
            </p>
          ) : null}
          <div className='flex flex-row items-center gap-5'>
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
        <div className='flex flex-row gap-2 flex-wrap'>
          {project.tools.sort().map((tool: string, index: number) => (
            <TechBadge tech={tool} icon={getIcon(tool)} key={index} />
          ))}
        </div>
        {project.id && experiences.length > 0 && (
          <ExperienceLink projectId={project.id} experiences={experiences} />
        )}
        <hr className='border-tertiary-400 my-5' />
        
        {/* Conditional MDX content rendering */}
        {project.code ? (
          <div className='font-Mregular dark:text-tertiary-100 text-tertiary-500 text-sm md:text-base'>
            <Mdx code={project.code} raw={project.body.code} />
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              Content is being processed. Please refresh the page if this persists.
            </p>
          </div>
        )}
        
        <hr className='border-tertiary-400 my-5' />
        <div className='flex flex-col gap-2'>
          {project.repository && (
            <Button variant='secondary' link={project.repository}>
              View on GitHub &rarr;
            </Button>
          )}
          {project.links?.map((link: { url: string, name: string }, index: number) => (
            <Button variant='secondary' link={link.url} key={link.name}>
              {link.name} &rarr;
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
