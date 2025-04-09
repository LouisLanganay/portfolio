'use client';

import { ArticleCard } from '@/components/Articles/ArticleCard';
import { TechBadge } from '@/components/TechBadge';
import { useTechBadge } from '@/contexts/TechBadgeContext';
import { getArticles } from '@/lib/Documents';
import { getIcon } from '@/lib/GetIcon';

export default function Page() {
  const articles = getArticles();
  const { selectedTechs } = useTechBadge();

  const allTools = Array.from(
    new Set(articles.flatMap((article) => article.tools || []))
  ).sort();

  const filteredArticles = articles.filter((article) =>
    selectedTechs.size === 0 ||
    article.tools?.some((tech: string) => selectedTechs.has(tech.toLowerCase()))
  );

  return (
    <section className='flex flex-col w-full gap-8' id='articles'>
      <div className='flex flex-wrap gap-2'>
        {allTools.sort().map((tool) => (
          <TechBadge
            key={tool}
            tech={tool}
            icon={getIcon(tool.toLowerCase())}
          />
        ))}
      </div>

      <ul className='grid sm:grid-cols-1 md:grid-cols-2 font-Mregular text-white text-sm gap-4 w-full'>
        {filteredArticles.map((article: any, index: number) => (
          <ArticleCard key={index} article={article} />
        ))}
      </ul>
    </section>
  );
}
