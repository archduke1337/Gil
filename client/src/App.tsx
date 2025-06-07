import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, memo } from "react";

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
const NotFound = lazy(() => import("@/pages/not-found"));

const LazyWrapper = memo(function LazyWrapper({ Component }: { Component: React.ComponentType }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8B5A3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8B5A3C] font-medium">Loading...</p>
        </div>
      </div>
    }>
      <Component />
    </Suspense>
  );
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <LazyWrapper Component={Home} />} />
      <Route path="/verify" component={() => <LazyWrapper Component={Verify} />} />
      <Route path="/about" component={() => <LazyWrapper Component={About} />} />
      <Route path="/gem-encyclopedia" component={() => <LazyWrapper Component={GemEncyclopedia} />} />
      <Route path="/gem/:id" component={() => <LazyWrapper Component={GemDetail} />} />
      <Route path="/analysis" component={() => <LazyWrapper Component={AnalysisGrading} />} />
      <Route path="/gem-services" component={() => <LazyWrapper Component={GemServices} />} />
      <Route path="/faqs" component={() => <LazyWrapper Component={FAQs} />} />
      <Route path="/admin" component={() => <LazyWrapper Component={Admin} />} />
      <Route component={() => <LazyWrapper Component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Router />
    </>
  );
}

export default App;
