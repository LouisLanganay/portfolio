import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { cleanSlug } from '@/lib/utils';

interface UseProjectPrefetchOptions {
  projects: Array<{ slug: string }>;
  maxPrefetch?: number;
  delay?: number;
}

export function useProjectPrefetch({
  projects,
  maxPrefetch = 3,
  delay = 1000
}: UseProjectPrefetchOptions) {
  const router = useRouter();
  const prefetchedRef = useRef(new Set<string>());

  useEffect(() => {
    const timer = setTimeout(() => {
      const projectsToPrefetch = projects
        .slice(0, maxPrefetch)
        .filter(project => !prefetchedRef.current.has(project.slug));

      projectsToPrefetch.forEach(project => {
        const cleanProjectSlug = cleanSlug(project.slug);
        router.prefetch(`/projects/${cleanProjectSlug}`);
        prefetchedRef.current.add(cleanProjectSlug);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [projects, maxPrefetch, delay, router]);

  const prefetchProject = (slug: string) => {
    const cleanProjectSlug = cleanSlug(slug);
    if (!prefetchedRef.current.has(cleanProjectSlug)) {
      router.prefetch(`/projects/${cleanProjectSlug}`);
      prefetchedRef.current.add(cleanProjectSlug);
    }
  };

  return { prefetchProject };
}