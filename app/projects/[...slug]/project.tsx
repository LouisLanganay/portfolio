'use client';

import { Button } from '@/components';
import ProjectCardItem from '@/components/Projects/ProjectCardItem';
import { ArrowDownTrayIcon, ChatBubbleBottomCenterTextIcon, ExclamationTriangleIcon, InformationCircleIcon, MagnifyingGlassIcon, StarIcon, TagIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Theme from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import { useEffect, useState } from 'react';
import { getRepository } from '@/lib/GetRepository';
import { Repository } from '@/types';
import { getIcon } from '@/lib/GetIcon';
import Image from 'next/image';
import { Mdx } from '@/components/Mdx';

export default function ProjectPage({ project }: { project: any }) {
  const router = useRouter();
  const [ repository, setRepository ] = useState<Repository | null>(null);

  useEffect(() => {
    if (project.repository && !repository) {
      getRepository(project.repository).then((repo) => {
        setRepository(repo);
      });
    }
  });

  if (!project) return (
    <h4 className='font-Mbold text-2xl text-tertiary-100'>
      Loading....
    </h4>
  );
  return (
    <div className='flex flex-col h-full w-full'>
      <Button variant='secondary' className='mb-4' onClick={() => router.push('/projects')}>
        &larr; Back to projects
      </Button>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          className='w-full h-64 object-cover rounded-2xl shadow-lg'
          width={1000}
          height={256}
        />
      ) : null }
      <div className='flex flex-col gap-2 mt-4'>
        <div className='flex flex-row items-center flex-wrap gap-2'>
          <h1 className='font-Mbold text-xl md:text-2xl text-white mr-5'>
            {project.title}
          </h1>
          {project.tags?.map((tag: string, index: number) => (
            <span key={index} className='bg-tertiary-480 text-tertiary-0
            font-Mmedium rounded-full px-2 py-0.5 h-fit bg-opacity-30
            border border-tertiary-450 text-sm'>
              <TagIcon className='size-3 inline-block mr-1' />
              {tag}
            </span>
          ))}
        </div>
        <div className='flex md:items-center gap-2 md:gap-5 flex-col md:flex-row'>
          <p className='font-Imedium text-white/60 text-xs md:text-sm'>
            {project.date}
          </p>
          {project.tools.length > 0 && (
            <p className='text-tertiary-100 hidden md:block'>
              •
            </p>
          )}
          <div className='flex flex-row gap-2 flex-wrap'>
            {project.tools.sort().map((tool: string, index: number) => (
              <img key={index} src={getIcon(tool)} alt={tool}
                className='w-4 h-4 md:w-5 md:h-5 inline-block rounded-sm'
              />
            ))}
          </div>
          {(project.stats?.downloads ||
          project.stats?.users ||
          repository?.watchers_count) ? (
            <p className='text-tertiary-100 hidden md:block'>
              •
            </p>
          ) : null}
          <div className='flex flex-row items-center gap-5'>
            {project.stats?.downloads ? (
              <ProjectCardItem tooltip={project.stats.downloads.tooltip}>
                <ArrowDownTrayIcon className='w-4 h-4 md:w-5 md:h-5 text-white/70
                mr-2' />
                <p className='font-Imedium text-white/70 text-xs md:text-sm'>
                  {project.stats.downloads.value}
                </p>
              </ProjectCardItem>
            ) : null}
            {project.stats?.users ? (
              <ProjectCardItem tooltip={project.stats.users.tooltip}>
                <UsersIcon className='w-4 h-4 md:w-5 md:h-5 text-white/70 mr-2' />
                <p className='font-Imedium text-white/70 text-xs md:text-sm'>
                  {project.stats.users.value}
                </p>
              </ProjectCardItem>
            ) : null}
            {repository?.watchers_count ? (
              <ProjectCardItem tooltip='Number of stars on GitHub repository' className='group/item'>
                <StarIcon className='w-4 h-4 md:w-5 md:h-5 text-white/70 mr-2 fill-transparent group-hover/item:fill-yellow group-hover/item:text-yellow transition-all duration-200' />
                <p className='font-Imedium text-white/70 text-xs md:text-sm'>
                  {repository.watchers_count}
                </p>
              </ProjectCardItem>
            ) : null}
          </div>
        </div>
        <hr className='border-tertiary-400 my-5' />
        <div className='font-Mregular text-tertiary-100 text-sm md:text-base'>
          <Mdx code={project.code} raw={project.body.code} />
        </div>
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
