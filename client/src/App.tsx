import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GemLoadingSpinner from "@/components/gem-loading-spinner";
import Home from "@/pages/home";

// Lazy load non-critical pages for faster initial load
const Verify = lazy(() => import("@/pages/verify"));
const About = lazy(() => import("@/pages/about"));
const GemEncyclopedia = lazy(() => import("@/pages/gem-encyclopedia"));
const GemDetail = lazy(() => import("@/pages/gem-detail"));
const AnalysisGrading = lazy(() => import("@/pages/analysis-grading"));
const GemServices = lazy(() => import("@/pages/gem-services"));
const FAQs = lazy(() => import("@/pages/faqs"));
const Admin = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  const LazyPageWrapper = ({ Component }: { Component: React.ComponentType }) => (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <GemLoadingSpinner size="lg" />
      </div>
    }>
      <Component />
    </Suspense>
  );

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verify" component={() => <LazyPageWrapper Component={Verify} />} />
      <Route path="/about" component={() => <LazyPageWrapper Component={About} />} />
      <Route path="/gem-encyclopedia" component={() => <LazyPageWrapper Component={GemEncyclopedia} />} />
      <Route path="/gem/:id" component={() => <LazyPageWrapper Component={GemDetail} />} />
      <Route path="/analysis" component={() => <LazyPageWrapper Component={AnalysisGrading} />} />
      <Route path="/gem-services" component={() => <LazyPageWrapper Component={GemServices} />} />
      <Route path="/faqs" component={() => <LazyPageWrapper Component={FAQs} />} />
      <Route path="/admin" component={() => <LazyPageWrapper Component={Admin} />} />
      <Route component={() => <LazyPageWrapper Component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
