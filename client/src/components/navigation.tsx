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
    { href: "/blog", label: "Blog" },
    { href: "/verify", label: "Report Check" },
    { href: "/faqs", label: "FAQs" }
  ];

  const handleBuyGemstones = () => {
    window.open('https://jewelors.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo and Brand */}
          <Link href="/">
            <div className="flex items-center space-x-4 cursor-pointer group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#8c745c]/10 to-[#8c745c]/5 rounded-xl group-hover:from-[#8c745c]/20 group-hover:to-[#8c745c]/10 transition-all duration-300">
                <img 
                  src={logoPath} 
                  alt="GIL Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">GIL</h1>
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden sm:block"></div>
                <div className="hidden sm:block">
                  <p className="text-xs text-gray-500 uppercase tracking-[0.15em] font-semibold leading-tight">
                    GEMOLOGICAL INSTITUTE
                  </p>
                  <p className="text-xs text-[#8c745c] uppercase tracking-[0.15em] font-semibold -mt-0.5">
                    LABORATORIES
                  </p>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Premium Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive(item.href) 
                    ? "text-[#8c745c] bg-[#8c745c]/10 shadow-sm" 
                    : "text-gray-700 hover:text-[#8c745c] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            
            {/* Premium CTA Button */}
            <div className="ml-6 pl-6 border-l border-gray-200">
              <Button 
                onClick={handleBuyGemstones}
                className="bg-gradient-to-r from-[#8c745c] to-[#a18966] hover:from-[#7a6650] hover:to-[#8c745c] text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Gem className="w-4 h-4 mr-2" />
                Buy Gemstones
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href) 
                        ? "text-[#8c745c] bg-[#8c745c]/10 shadow-sm" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Premium Mobile CTA Button */}
              <div className="pt-3 mt-3 border-t border-gray-100">
                <Button 
                  onClick={() => {
                    handleBuyGemstones();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#8c745c] to-[#a18966] hover:from-[#7a6650] hover:to-[#8c745c] text-white font-semibold px-4 py-3 rounded-lg shadow-md"
                >
                  <Gem className="w-4 h-4 mr-2" />
                  Buy Gemstones
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}