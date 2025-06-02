import { useState } from "react";
import { Shield, Gem } from "lucide-react";
import VerificationForm from "@/components/verification-form";
import CertificateResult from "@/components/certificate-result";
import Navigation from "@/components/navigation";
import type { Certificate } from "@shared/schema";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function Verify() {
  const [verificationResult, setVerificationResult] = useState<{
    certificate: Certificate | null;
    found: boolean;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ece5dc] to-white">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8c745c] to-[#7a6550] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/attached_assets/Capture5.PNG" 
              alt="Diamond Certificate Verification Technology" 
              className="max-w-lg w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Certificate Verification
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Verify the authenticity of your diamond certificate using our secure verification system
          </p>
        </div>
      </div>

      {/* Verification Form Section */}
      <div className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/attached_assets/IMG-20250522-WA0006.jpg" 
                  alt="GIL Official Seal - Certificate Verification" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Enter Certificate Reference</h2>
              <p className="text-muted-foreground">Input your diamond certificate reference number to view details</p>
            </div>
            
            <VerificationForm onResult={setVerificationResult} />

            {/* Sample Reference Numbers */}
            <div className="mt-8 p-4 bg-background rounded-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">Sample Reference Numbers for Testing:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <button 
                  className="text-left p-2 hover:bg-white rounded cursor-pointer transition-colors"
                  onClick={() => {
                    const input = document.querySelector('input[name="referenceNumber"]') as HTMLInputElement;
                    if (input) input.value = 'GIL-2024-001234';
                  }}
                >
                  <code className="text-primary">GIL-2024-001234</code>
                </button>
                <button 
                  className="text-left p-2 hover:bg-white rounded cursor-pointer transition-colors"
                  onClick={() => {
                    const input = document.querySelector('input[name="referenceNumber"]') as HTMLInputElement;
                    if (input) input.value = 'GIL-2024-005678';
                  }}
                >
                  <code className="text-primary">GIL-2024-005678</code>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Results */}
      {verificationResult && (
        <CertificateResult result={verificationResult} />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img 
                src={logoPath} 
                alt="GIL - Gemological Institute Laboratories" 
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 leading-relaxed">
                Leading the world in gemological excellence, education, and certification services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#8c745c]">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/gem-encyclopedia" className="text-gray-400 hover:text-white transition-colors">Gem Encyclopedia</a></li>
                <li><a href="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis & Grading</a></li>
                <li><a href="/gem-services" className="text-gray-400 hover:text-white transition-colors">Gem Services</a></li>
                <li><a href="/verify" className="text-gray-400 hover:text-white transition-colors">Report Check</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#8c745c]">Support</h3>
              <ul className="space-y-2">
                <li><a href="/faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="/about#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Gemological Institute Laboratories (GIL). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}