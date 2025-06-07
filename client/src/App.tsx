import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Verify from "@/pages/verify";
import About from "@/pages/about";
import GemEncyclopedia from "@/pages/gem-encyclopedia";
import GemDetail from "@/pages/gem-detail";
import AnalysisGrading from "@/pages/analysis-grading";
import GemServices from "@/pages/gem-services";
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
      <Route path="/gem/:id" component={GemDetail} />
      <Route path="/analysis" component={AnalysisGrading} />
      <Route path="/gem-services" component={GemServices} />
      <Route path="/faqs" component={FAQs} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
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
