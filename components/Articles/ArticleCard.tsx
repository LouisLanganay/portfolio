'use client';

import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Repository } from '@/types';
import { getRepository } from '@/lib/GetRepository';
import { getIcon } from '@/lib/GetIcon';
import { TechBadge } from '../TechBadge';
import Article from '@/types/Blog';
import { Badge } from '../ui/badge';
import { SparklesIcon } from '@heroicons/react/20/solid';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    router.prefetch(`/articles/${article.slug}`);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    if (article.repository && !repository) {
      getRepository(article.repository).then((repo) => {
        setRepository(repo);
      });
    }
  }, [article.repository, repository]);

  useEffect(() => {
    const publishDate = new Date(article.publishedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setIsNew(diffDays <= 15);
  }, [article.publishedAt]);

  return (
    <li className='w-full h-full sm:max-w-[400px] max-h-[400px] rounded-lg'>
      <div
        className='dark:bg-tertiary-500 bg-white border dark:border-tertiary-480 border-tertiary-100
        rounded-lg flex transition-all ease-in-out w-full cursor-pointer duration-200 group/card
        flex-col shadow-sm p-4 dark:hover:border-tertiary-450 hover:border-tertiary-150
        relative h-full'
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => router.push(`/articles/${article.slug}`)}
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
          {article.image && (
            <div className='w-full h-40 md:h-56 overflow-hidden dark:border-tertiary-480 border-tertiary-100
              duration-150 dark:group-hover/card:border-tertiary-450 group-hover/card:border-tertiary-150 rounded-lg border
              transition-all'>
              <Image
                src={article.image}
                alt={article.title}
                className='object-cover group-hover/card:scale-101 h-full w-full transition-all duration-500'
                width={1920}
                height={1080}
              />
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center gap-2'>
              <h3 className='font-bold dark:text-white/90 text-black/90 text-sm md:text-base'>
                {article.title}
              </h3>
              <ArrowTopRightOnSquareIcon className='w-4 h-4 md:w-5 md:h-5 dark:text-white/90 text-black/90' />
            </div>
            <div className='flex flex-row gap-1 flex-wrap'>
              {article.tools?.sort().map((tool: string, index: number) => {
                const ToolIcon = getIcon(tool);
                if (!ToolIcon) return null;
                return <TechBadge key={index} tech={tool} icon={ToolIcon} />;
              })}
            </div>
            <h4 className='font-Imedium dark:text-white/60 text-black/60 text-xs md:text-sm'>
              {article.publishedAt} - {article.author}
            </h4>
            <p className='font-normal dark:text-white/70 text-black/70 text-xs md:text-sm'>
              {article.description?.slice(0, 200)}
              {article.description?.length > 100 && '...'}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
