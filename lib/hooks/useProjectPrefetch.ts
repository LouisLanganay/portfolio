import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
        router.prefetch(`/projects/${project.slug}`);
        prefetchedRef.current.add(project.slug);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [projects, maxPrefetch, delay, router]);

  const prefetchProject = (slug: string) => {
    if (!prefetchedRef.current.has(slug)) {
      router.prefetch(`/projects/${slug}`);
      prefetchedRef.current.add(slug);
    }
  };

  return { prefetchProject };
}