import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleFromSlug } from '@/lib/Documents';
import ArticlePage from './article';

export default async function Page({ params }: { params: { slug: string[] } }) {
  let article = await getArticleFromSlug(params);

  if (!article || !article.published)
    return notFound();

  return <ArticlePage article={article} />;
}
