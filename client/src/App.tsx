import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Verify from "@/pages/verify";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/verify" component={Verify} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

export default App;
