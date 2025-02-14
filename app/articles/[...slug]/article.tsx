'use client';

import { ArrowDownTrayIcon, StarIcon, TagIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRepository } from '@/lib/GetRepository';
import { Repository } from '@/types';
import { getIcon } from '@/lib/GetIcon';
import Image from 'next/image';
import { Mdx } from '@/components/Mdx';
import { Button } from '@/components/Button';
import { TechBadge } from '@/components/TechBadge';
import { NewsLetterSubscribe } from '@/components/NewsLetterSubscribe';

export default function ArticlePage({ article }: { article: any }) {
  const router = useRouter();
  const [ repository, setRepository ] = useState<Repository | null>(null);

  useEffect(() => {
    if (article.repository && !repository) {
      getRepository(article.repository).then((repo) => {
        setRepository(repo);
      });
    }
  });

  if (!article) return (
    <h4 className='font-Mbold text-2xl dark:text-tertiary-100 text-tertiary-650'>
      Loading....
    </h4>
  );
  return (
    <div className='flex flex-col h-full w-full'>
      <Button variant='secondary' className='mb-4' onClick={() => router.push('/articles')}>
        &larr; Back to articles
      </Button>
      {article.image ? (
        <Image
          src={article.image}
          alt={article.title}
          className='w-full h-64 object-cover rounded-2xl shadow-lg'
          width={1000}
          height={256}
        />
      ) : null }
      <div className='flex flex-col gap-2 mt-4'>
        <div className='flex flex-row items-center flex-wrap gap-2'>
          <h1 className='font-Mbold text-xl md:text-2xl dark:text-white text-black mr-5'>
            {article.title}
          </h1>
        </div>
        <div className='flex md:items-center gap-2 md:gap-5 flex-col md:flex-row'>
          <p className='font-Imedium dark:text-white/60 text-black/60 text-xs md:text-sm'>
            {article.date}
          </p>
        </div>
          <div className='flex flex-row gap-2 flex-wrap'>
            {article.tools.sort().map((tool: string, index: number) => (
              <TechBadge tech={tool} icon={getIcon(tool)} key={index} />
            ))}
          </div>
        <hr className='border-tertiary-400 my-5' />
        <div className='font-Mregular dark:text-tertiary-100 text-tertiary-500 text-sm md:text-base'>
          <Mdx code={article.code} raw={article.body.code} />
        </div>
        <hr className='border-tertiary-400 my-5' />
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-2'>
            {article.repository && (
              <Button variant='secondary' link={article.repository}>
                View on GitHub &rarr;
              </Button>
            )}
            {article.links?.map((link: { url: string, name: string }, index: number) => (
              <Button variant='secondary' link={link.url} key={link.name}>
                {link.name} &rarr;
              </Button>
            ))}
          </div>
          <div className='flex flex-col items-end gap-1'>
            <p className='font-Imedium dark:text-white/60 text-black/60 text-xs'>
              Published on {article.publishedAt}
            </p>
            {article.author && (
              <p className='font-Imedium dark:text-white/60 text-black/60 text-xs'>
                By {article.author}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
