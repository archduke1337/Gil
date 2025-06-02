// Performance optimization utilities

// Debounce function for search inputs and frequent events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for scroll events and frequent interactions
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "50px",
    ...options,
  };

  return new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      callback(entry);
    }
  }, defaultOptions);
}

// Check if device supports touch
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Get device performance tier
export function getDevicePerformanceTier(): 'low' | 'medium' | 'high' {
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  
  if (memory <= 2 || cores <= 2) return 'low';
  if (memory <= 4 || cores <= 4) return 'medium';
  return 'high';
}

// Optimize animations based on device performance
export function getOptimizedAnimationConfig() {
  const tier = getDevicePerformanceTier();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return { duration: 0, enabled: false };
  }
  
  switch (tier) {
    case 'low':
      return { duration: 0.2, enabled: true, complexity: 'simple' };
    case 'medium':
      return { duration: 0.3, enabled: true, complexity: 'moderate' };
    default:
      return { duration: 0.5, enabled: true, complexity: 'full' };
  }
}