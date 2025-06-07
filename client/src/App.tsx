import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, memo } from "react";
import GemLoadingSpinner from "@/components/gem-loading-spinner";

// Lazy load pages for faster initial load
const Home = lazy(() => import("@/pages/home"));
const Verify = lazy(() => import("@/pages/verify"));
const Admin = lazy(() => import("@/pages/admin"));
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
      <Route path="/admin" component={() => <LazyWrapper Component={Admin} />} />
      <Route component={() => <div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl text-gray-600">Page Not Found</h1></div>} />
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
