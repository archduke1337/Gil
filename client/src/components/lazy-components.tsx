import { lazy, Suspense } from 'react';
import GemLoadingSpinner from './gem-loading-spinner';

// Lazy load heavy components for faster initial page load
export const LazyAdvancedDashboard = lazy(() => import('./advanced-dashboard').then(module => ({ default: module.default })));
export const LazyCertificateGenerator = lazy(() => import('./certificate-generator').then(module => ({ default: module.default })));
export const LazyEnhancedGILCertificateGenerator = lazy(() => import('./enhanced-gil-certificate-generator').then(module => ({ default: module.default })));
export const LazyBulkUpload = lazy(() => import('./bulk-upload').then(module => ({ default: module.default })));
export const LazyARVisualization = lazy(() => import('./ar-visualization').then(module => ({ default: module.default })));
export const LazyARGemIdentification = lazy(() => import('./ar-gem-identification').then(module => ({ default: module.default })));
export const LazyGemRecommendationEngine = lazy(() => import('./gem-recommendation-engine').then(module => ({ default: module.default })));
export const LazyGemRarityHeatmap = lazy(() => import('./gem-rarity-heatmap'));
export const LazyCommunityShowcase = lazy(() => import('./community-showcase'));
export const LazyEnhancedGemAnalysis = lazy(() => import('./enhanced-gem-analysis'));

// Wrapper component with optimized loading state
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyWrapper({ children, fallback }: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback || <GemLoadingSpinner size="lg" className="mx-auto my-8" />}>
      {children}
    </Suspense>
  );
}

// Preload functions for critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be used soon
  import('./certificate-verification');
  import('./certificate-list');
  import('./admin-dashboard');
};

// Component-specific preloaders
export const preloadDashboardComponents = () => {
  import('./advanced-dashboard');
  import('./certificate-generator');
  import('./bulk-upload');
};

export const preloadGemComponents = () => {
  import('./ar-visualization');
  import('./ar-gem-identification');
  import('./gem-recommendation-engine');
  import('./enhanced-gem-analysis');
};