import { Link, useLocation } from "wouter";
import { Gem, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, memo, useCallback } from "react";
import logoPath from "@assets/1000119055-removebg-preview.png";

const Navigation = memo(function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = useCallback((path: string) => location === path, [location]);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gem-encyclopedia", label: "Gem Encyclopedia" },
    { href: "/analysis", label: "Analysis & Grading" },
    { href: "/gem-services", label: "Gem Services" },
    { href: "/verify", label: "Report Check" },
    { href: "/faqs", label: "FAQs" }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-0 rounded-b-3xl soft-shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer interactive-element gpu-accelerated touch-friendly">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <img 
                  src={logoPath} 
                  alt="GIL Logo" 
                  className="w-full h-full object-contain crisp-edges"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-heading-sm font-heading text-foreground text-ultra-smooth">GIL</h1>
                <p className="text-caption text-muted-foreground hidden md:block text-ultra-smooth">Gemological Institute Laboratories</p>
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
                  className={`btn-premium text-ultra-smooth touch-friendly ${isActive(item.href) 
                    ? "text-[#8c745c] border-b-2 border-[#8c745c] rounded-none" 
                    : "text-gray-600 hover:text-[#8c745c]"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-[#8c745c] hover:bg-[#ece5dc]/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl text-ultra-smooth ${
                      isActive(item.href) 
                        ? "text-[#8c745c] bg-[#ece5dc]" 
                        : "text-gray-600 hover:text-[#8c745c] hover:bg-[#ece5dc]/50"
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