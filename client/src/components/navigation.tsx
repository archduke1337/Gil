import { Link, useLocation } from "wouter";
import { Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 lab-bg-primary rounded-lg flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GILab.info</h1>
                <p className="text-xs text-muted-foreground">Gemological Institute Laboratories</p>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button 
                variant="ghost" 
                className={isActive("/") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}
              >
                Home
              </Button>
            </Link>
            <Link href="/verify">
              <Button 
                variant="ghost" 
                className={isActive("/verify") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}
              >
                Verify Certificate
              </Button>
            </Link>
            <Link href="/gem-encyclopedia">
              <Button 
                variant="ghost" 
                className={isActive("/gem-encyclopedia") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}
              >
                Gem Encyclopedia
              </Button>
            </Link>
            <Link href="/analysis">
              <Button 
                variant="ghost" 
                className={isActive("/analysis") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}
              >
                Analysis & Grading
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="ghost" 
                className={isActive("/about") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}
              >
                About Us
              </Button>
            </Link>
            <Link href="/faqs">
              <Button 
                variant="ghost" 
                className={isActive("/faqs") ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}
              >
                FAQs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}