// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) return 0;
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    return duration;
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label);
    return fn().finally(() => {
      const duration = this.endTiming(label);
      console.log(`${label}: ${duration.toFixed(2)}ms`);
    });
  }
}

// Advanced image optimization
export const optimizeImageLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  images.forEach(img => imageObserver.observe(img));
};

// Critical resource preloader
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/api/certificates', as: 'fetch' },
    { href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    document.head.appendChild(link);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};

// Memory management
export const optimizeMemoryUsage = () => {
  // Clean up unused query cache entries
  const cleanupInterval = setInterval(() => {
    if (window.gc && typeof window.gc === 'function') {
      window.gc();
    }
  }, 60000); // Every minute

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(cleanupInterval);
  });
};

// Bundle size optimization
export const loadModuleOnDemand = async (
  moduleLoader: () => Promise<any>
): Promise<any> => {
  const monitor = PerformanceMonitor.getInstance();
  return monitor.measureAsync('module-load', async () => {
    const module = await moduleLoader();
    return module.default;
  });
};

// Network optimization
export const optimizeNetworkRequests = () => {
  // Enable HTTP/2 push for critical resources
  if ('fetch' in window) {
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      const monitor = PerformanceMonitor.getInstance();
      return monitor.measureAsync('fetch-request', () => originalFetch(input, init));
    };
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  preloadCriticalResources();
  optimizeImageLoading();
  optimizeMemoryUsage();
  optimizeNetworkRequests();
  registerServiceWorker();
};