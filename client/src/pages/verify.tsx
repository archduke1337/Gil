import { useState } from "react";
import { Shield, Gem } from "lucide-react";
import VerificationForm from "@/components/verification-form";
import CertificateResult from "@/components/certificate-result";
import type { Certificate } from "@shared/schema";

export default function Verify() {
  const [verificationResult, setVerificationResult] = useState<{
    certificate: Certificate | null;
    found: boolean;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="gemological-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
    </div>
  );
}