import { useState } from "react";
import { Link } from "wouter";
import { Shield, Gem, Search, Clock, Users, Star } from "lucide-react";
import VerificationForm from "@/components/verification-form";
import CertificateResult from "@/components/certificate-result";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Certificate } from "@shared/schema";

export default function Home() {
  const [verificationResult, setVerificationResult] = useState<{
    certificate: Certificate | null;
    found: boolean;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GILab.info</h1>
                <p className="text-xs text-gray-500">Gemological Institute Laboratories</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-blue-700 border-b-2 border-blue-700">
                  Certificate Verification
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" className="text-gray-500 hover:text-blue-700">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diamond Certificate Verification
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Verify the authenticity of your diamond certificate instantly using our secure verification system
          </p>
        </div>
      </div>

      {/* Verification Form Section */}
      <div className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Certificate Reference</h2>
              <p className="text-gray-600">Input your diamond certificate reference number to view details</p>
            </div>
            
            <VerificationForm onResult={setVerificationResult} />

            {/* Sample Reference Numbers */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sample Reference Numbers for Testing:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <button 
                  className="text-left p-2 hover:bg-white rounded cursor-pointer transition-colors"
                  onClick={() => {
                    const input = document.querySelector('input[name="referenceNumber"]') as HTMLInputElement;
                    if (input) input.value = 'GIL-2024-001234';
                  }}
                >
                  <code className="text-blue-700">GIL-2024-001234</code>
                </button>
                <button 
                  className="text-left p-2 hover:bg-white rounded cursor-pointer transition-colors"
                  onClick={() => {
                    const input = document.querySelector('input[name="referenceNumber"]') as HTMLInputElement;
                    if (input) input.value = 'GIL-2024-005678';
                  }}
                >
                  <code className="text-blue-700">GIL-2024-005678</code>
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

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GILab?</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive diamond certification services with the highest standards of accuracy and security.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-700" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analysis</h4>
                <p className="text-gray-600">
                  State-of-the-art gemological equipment and certified professionals ensure accurate assessments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-cyan-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Secure Database</h4>
                <p className="text-gray-600">
                  Your certificates are stored securely with blockchain-backed verification for maximum trust.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h4>
                <p className="text-gray-600">
                  Our certified gemologists are available to answer questions about your diamond certificates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Gem className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-700">GILab</h1>
                  <p className="text-xs text-gray-500">Gemological Institute Laboratories</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Leading provider of diamond certification and verification services. 
                Trusted by jewelers, retailers, and consumers worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-cyan-600">✉</span>
                <span className="text-gray-600">info@gilab.info</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-700 transition-colors">Certificate Verification</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-colors">Diamond Grading</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-colors">Gemstone Analysis</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-colors">Appraisal Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-700 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Gemological Institute Laboratories. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
