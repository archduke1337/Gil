import { useState, memo, useCallback } from "react";
import { Shield, Gem } from "lucide-react";
import VerificationForm from "@/components/verification-form";
import CertificateResult from "@/components/certificate-result";
import Navigation from "@/components/navigation";
import { SidebarAd, ContentAd } from "@/components/adsense-ad";
import type { Certificate } from "@shared/schema";
import logoPath from "@assets/1000119055-removebg-preview.png";
import { usePageTitle } from "@/hooks/use-page-title";

export default function Verify() {
  usePageTitle("Certificate Verification - Diamond Report Check");
  const [verificationResult, setVerificationResult] = useState<{
    certificate: Certificate | null;
    found: boolean;
  } | null>(null);

  const handleVerificationResult = useCallback((result: { certificate: Certificate | null; found: boolean }) => {
    setVerificationResult(result);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 soft-shadow">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-hero font-heading mb-6 text-ultra-smooth">
            Certificate Verification
          </h1>
          <p className="text-body-lg font-body text-muted-foreground max-w-2xl mx-auto mb-8 text-ultra-smooth">
            Verify the authenticity of your diamond certificate using our secure verification system
          </p>
        </div>
      </div>

      {/* Verification Form Section */}
      <div className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar Ad */}
            <div className="lg:col-span-1 order-last lg:order-first">
              <SidebarAd />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl soft-shadow border-0 p-10">
                <div className="text-center mb-10">
                  <h2 className="text-heading-md font-heading text-foreground mb-3 text-ultra-smooth">Enter Certificate Reference</h2>
                  <p className="text-body font-body text-muted-foreground text-ultra-smooth">Input your diamond certificate reference number to view details</p>
                </div>
                
                <VerificationForm onResult={handleVerificationResult} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Ad */}
      <ContentAd />

      {/* Certificate Results */}
      {verificationResult && (
        <CertificateResult result={verificationResult} />
      )}

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: '#101826' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img 
                src={logoPath} 
                alt="GIL - Gemological Institute Laboratories" 
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-muted-foreground leading-relaxed">
                Leading the world in gemological excellence, education, and certification services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-muted-foreground hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="/gem-encyclopedia" className="text-muted-foreground hover:text-primary-foreground transition-colors">Gem Encyclopedia</a></li>
                <li><a href="/analysis" className="text-muted-foreground hover:text-primary-foreground transition-colors">Analysis & Grading</a></li>
                <li><a href="/gem-services" className="text-muted-foreground hover:text-primary-foreground transition-colors">Gem Services</a></li>
                <li><a href="/verify" className="text-muted-foreground hover:text-primary-foreground transition-colors">Report Check</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Support</h3>
              <ul className="space-y-2">
                <li><a href="/faqs" className="text-muted-foreground hover:text-primary-foreground transition-colors">FAQs</a></li>
                <li><a href="/about#contact" className="text-muted-foreground hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Gemological Institute Laboratories (GIL). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}