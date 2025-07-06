import { Link, useLocation } from "wouter";
import { Gem, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function Navigation() {
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

  const handleBuyGemstones = () => {
    window.open('https://jewelors.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src={logoPath} 
                  alt="GIL Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">GIL</h1>
                <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
                <p className="text-sm text-gray-600 uppercase tracking-wide font-medium hidden sm:block">
                  GEMOLOGICAL INSTITUTE LABORATORIES
                </p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${isActive(item.href) 
                    ? "text-[#8c745c] bg-[#8c745c]/10" 
                    : "text-gray-600 hover:text-[#8c745c] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Buy Certified Gemstones Button */}
            <Button 
              onClick={handleBuyGemstones}
              className="bg-[#8c745c] hover:bg-[#7a6650] text-white font-medium px-4 py-2 ml-4 rounded-lg shadow-sm transition-all duration-200"
            >
              <Gem className="w-4 h-4 mr-2" />
              Buy Gemstones
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-3 py-2 text-sm font-medium ${
                      isActive(item.href) 
                        ? "text-[#8c745c] bg-[#8c745c]/10" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Buy Certified Gemstones Button - Mobile */}
              <Button 
                onClick={() => {
                  handleBuyGemstones();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start bg-[#8c745c] hover:bg-[#7a6650] text-white font-medium px-3 py-2 mt-2"
              >
                <Gem className="w-4 h-4 mr-2" />
                Buy Gemstones
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}