import { useEffect } from 'react';

export function useScrollToAnchor() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash) {
        const timer = setTimeout(() => {
          const element = document.querySelector(hash);
          
          if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
              top: elementPosition - headerHeight,
              behavior: 'smooth'
            });
          }
        }, 100);

        return () => clearTimeout(timer);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}
