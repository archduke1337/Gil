import { Link } from "wouter";
import logoPath from "@assets/1000119055-removebg-preview.png";

interface FooterProps {
  variant?: "light" | "dark";
}

export default function Footer({ variant = "dark" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer className={`py-12 ${isDark ? "text-white" : "bg-white border-t border-border"}`} style={{ backgroundColor: isDark ? '#101826' : undefined }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src={logoPath} 
              alt="GIL - Gemological Institute Laboratories" 
              className={`h-16 w-auto mb-4 ${isDark ? "brightness-0 invert" : ""}`}
            />
            <p className={`leading-relaxed ${isDark ? "text-gray-400" : "text-muted-foreground"}`}>
              Leading the world in gemological excellence, education, and certification services.
            </p>
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-[#8c745c]" : "text-[#8c745c]"}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/gem-encyclopedia" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gem Encyclopedia
                </Link>
              </li>
              <li>
                <Link 
                  href="/analysis" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Analysis & Grading
                </Link>
              </li>
              <li>
                <Link 
                  href="/gem-services" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gem Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/verify" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Report Check
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-[#8c745c]" : "text-[#8c745c]"}`}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/faqs" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href="/about#contact" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className={`transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center ${
          isDark ? "border-gray-800" : "border-border"
        }`}>
          <p className={isDark ? "text-gray-400" : "text-muted-foreground"}>
            © {new Date().getFullYear()} Gemological Institute Laboratories (GIL). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}