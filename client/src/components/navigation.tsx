import { Link, useLocation } from "wouter";
import { Gem, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gem-encyclopedia", label: "Gem Encyclopedia" },
    { href: "/analysis", label: "Analysis & Grading" },
    { href: "/verify", label: "Report Check" },
    { href: "/faqs", label: "FAQs" }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <img 
                  src={logoPath} 
                  alt="GIL Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-foreground">GIL</h1>
                <p className="text-xs text-muted-foreground hidden md:block">Gemological Institute Laboratories</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isActive(item.href) 
                    ? "text-primary border-b-2 border-primary rounded-none" 
                    : "text-muted-foreground hover:text-primary"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-background"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      isActive(item.href) 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-primary hover:bg-background"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}