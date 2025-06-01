import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Verify from "@/pages/verify";
import About from "@/pages/about";
import GemEncyclopedia from "@/pages/gem-encyclopedia";
import AnalysisGrading from "@/pages/analysis-grading";
import FAQs from "@/pages/faqs";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verify" component={Verify} />
      <Route path="/about" component={About} />
      <Route path="/gem-encyclopedia" component={GemEncyclopedia} />
      <Route path="/analysis" component={AnalysisGrading} />
      <Route path="/faqs" component={FAQs} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
