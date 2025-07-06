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
    <nav className="bg-white/90 backdrop-blur-sm border-0 rounded-b-3xl soft-shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer interactive-element gpu-accelerated touch-friendly">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mr-3 sm:mr-4">
                <img 
                  src={logoPath} 
                  alt="GIL Logo" 
                  className="w-full h-full object-contain crisp-edges"
                />
              </div>
              <div className="flex items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-ultra-smooth tracking-tight mr-3 sm:mr-4">GIL</h1>
                <div className="hidden sm:block h-8 w-px bg-gray-300 mr-3 sm:mr-4"></div>
                <div className="hidden md:block">
                  <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-widest font-medium text-ultra-smooth leading-tight whitespace-nowrap">
                    GEMOLOGICAL INSTITUTE LABORATORIES
                  </p>
                </div>
                <div className="block md:hidden">
                  <p className="text-xs text-gray-600 uppercase tracking-wide font-medium text-ultra-smooth leading-tight">
                    GEMOLOGICAL INSTITUTE<br />
                    LABORATORIES
                  </p>
                </div>
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
            
            {/* Buy Certified Gemstones Button */}
            <Button 
              onClick={handleBuyGemstones}
              className="bg-gradient-to-r from-[#8c745c] to-[#a18966] hover:from-[#7a6650] hover:to-[#8c745c] text-white font-medium px-4 py-2 ml-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Gem className="w-4 h-4 mr-2" />
              Buy Certified Gemstones
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-[#8c745c] hover:bg-[#ece5dc]/50"
            onClick={toggleMobileMenu}
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
              
              {/* Buy Certified Gemstones Button - Mobile */}
              <Button 
                onClick={() => {
                  handleBuyGemstones();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start bg-gradient-to-r from-[#8c745c] to-[#a18966] hover:from-[#7a6650] hover:to-[#8c745c] text-white font-medium rounded-xl mt-3 shadow-lg"
              >
                <Gem className="w-4 h-4 mr-2" />
                Buy Certified Gemstones
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}