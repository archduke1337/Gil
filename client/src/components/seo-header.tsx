import { useEffect } from 'react';

interface SEOHeaderProps {
  preloadImages?: string[];
  prefetchUrls?: string[];
}

export function SEOHeader({ preloadImages = [], prefetchUrls = [] }: SEOHeaderProps) {
  useEffect(() => {
    // Preload critical images
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Prefetch important pages
    prefetchUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Add performance hints
    const dnsPreconnect = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://pagead2.googlesyndication.com'];
    dnsPreconnect.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = origin;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup if needed
    };
  }, [preloadImages, prefetchUrls]);

  return null;
}

// Performance monitoring component
export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      return;
    }

    // Log performance metrics
    if ('performance' in window && 'PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              console.log('CLS:', clsValue);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup
        return () => {
          paintObserver.disconnect();
          lcpObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (e) {
        console.error('Performance monitoring error:', e);
      }
    }
  }, []);

  return null;
}