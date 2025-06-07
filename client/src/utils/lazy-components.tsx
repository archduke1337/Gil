import { lazy, Suspense } from "react";
import GemLoadingSpinner from "@/components/gem-loading-spinner";
import { FormSkeleton, CertificateListSkeleton } from "@/components/skeleton-loader";

// Lazy load heavy components for better performance
export const LazyAdvancedSearch = lazy(() => import("@/components/advanced-search"));
export const LazyBulkUpload = lazy(() => import("@/components/bulk-upload"));

export const LazyARVisualization = lazy(() => import("@/components/ar-visualization"));
export const LazyARGemIdentification = lazy(() => import("@/components/ar-gem-identification"));
export const LazyGemRecommendationEngine = lazy(() => import("@/components/gem-recommendation-engine"));
export const LazyEnhancedGemAnalysis = lazy(() => import("@/components/enhanced-gem-analysis"));
export const LazyCommunityShowcase = lazy(() => import("@/components/community-showcase"));

// Wrapper components with appropriate loading states
export function LazyAdvancedSearchWrapper(props: any) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <LazyAdvancedSearch {...props} />
    </Suspense>
  );
}

export function LazyBulkUploadWrapper(props: any) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <LazyBulkUpload {...props} />
    </Suspense>
  );
}



export function LazyARVisualizationWrapper(props: any) {
  return (
    <Suspense fallback={<GemLoadingSpinner size="lg" />}>
      <LazyARVisualization {...props} />
    </Suspense>
  );
}

export function LazyARGemIdentificationWrapper(props: any) {
  return (
    <Suspense fallback={<GemLoadingSpinner size="lg" />}>
      <LazyARGemIdentification {...props} />
    </Suspense>
  );
}

export function LazyGemRecommendationEngineWrapper(props: any) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <LazyGemRecommendationEngine {...props} />
    </Suspense>
  );
}

export function LazyEnhancedGemAnalysisWrapper(props: any) {
  return (
    <Suspense fallback={<GemLoadingSpinner size="md" />}>
      <LazyEnhancedGemAnalysis {...props} />
    </Suspense>
  );
}

export function LazyCommunityShowcaseWrapper(props: any) {
  return (
    <Suspense fallback={<CertificateListSkeleton count={9} />}>
      <LazyCommunityShowcase {...props} />
    </Suspense>
  );
}