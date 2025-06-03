import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | GIL - Gemological Institute Laboratories`;
    
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

export function setPageTitle(title: string) {
  document.title = `${title} | GIL - Gemological Institute Laboratories`;
}