import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import GemLoadingSpinner from "@/components/gem-loading-spinner";
import CookieConsent from "@/components/cookie-consent";

// Lazy load pages for faster initial load
const Home = lazy(() => import("@/pages/home"));
const Verify = lazy(() => import("@/pages/verify"));
const About = lazy(() => import("@/pages/about"));
const GemEncyclopedia = lazy(() => import("@/pages/gem-encyclopedia"));
const GemDetail = lazy(() => import("@/pages/gem-detail"));
const AnalysisGrading = lazy(() => import("@/pages/analysis-grading"));
const GemServices = lazy(() => import("@/pages/gem-services"));
const FAQs = lazy(() => import("@/pages/faqs"));
const Admin = lazy(() => import("@/pages/admin"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service"));
const DiamondEducation = lazy(() => import("@/pages/diamond-education"));
const GemstoneGuide = lazy(() => import("@/pages/gemstone-guide"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const NotFound = lazy(() => import("@/pages/not-found"));

function LazyWrapper({ Component }: { Component: React.ComponentType }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <GemLoadingSpinner size="lg" />
      </div>
    }>
      <Component />
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <LazyWrapper Component={Home} />} />
      <Route path="/verify" component={() => <LazyWrapper Component={Verify} />} />
      <Route path="/about" component={() => <LazyWrapper Component={About} />} />
      <Route path="/gem-encyclopedia" component={() => <LazyWrapper Component={GemEncyclopedia} />} />
      <Route path="/gem/:id" component={() => <LazyWrapper Component={GemDetail} />} />
      <Route path="/analysis-grading" component={() => <LazyWrapper Component={AnalysisGrading} />} />
      <Route path="/analysis" component={() => <LazyWrapper Component={AnalysisGrading} />} />
      <Route path="/gem-services" component={() => <LazyWrapper Component={GemServices} />} />
      <Route path="/faqs" component={() => <LazyWrapper Component={FAQs} />} />
      <Route path="/admin" component={() => <LazyWrapper Component={Admin} />} />
      <Route path="/privacy-policy" component={() => <LazyWrapper Component={PrivacyPolicy} />} />
      <Route path="/terms-of-service" component={() => <LazyWrapper Component={TermsOfService} />} />
      <Route path="/diamond-education" component={() => <LazyWrapper Component={DiamondEducation} />} />
      <Route path="/gemstone-guide" component={() => <LazyWrapper Component={GemstoneGuide} />} />
      <Route path="/blog" component={() => <LazyWrapper Component={Blog} />} />
      <Route path="/blog/:id" component={() => <LazyWrapper Component={BlogPost} />} />
      <Route component={() => <LazyWrapper Component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
      <CookieConsent />
    </TooltipProvider>
  );
}

export default App;
