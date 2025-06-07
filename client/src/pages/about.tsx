import Navigation from "@/components/navigation";
import { usePageTitle } from "@/hooks/use-page-title";
import { Shield, Award, Users, Globe } from "lucide-react";

export default function About() {
  usePageTitle("About Us - Gemological Institute Laboratories");

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">About GIL</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gemological Institute Laboratories - Setting the global standard for diamond certification and gemological excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-lg p-8">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Trust & Reliability</h3>
            <p className="text-muted-foreground">
              Our rigorous certification process ensures every diamond certificate meets the highest international standards.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8">
            <Award className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Expert Analysis</h3>
            <p className="text-muted-foreground">
              Our team of certified gemologists brings decades of experience to every diamond evaluation.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Industry Leadership</h3>
            <p className="text-muted-foreground">
              Trusted by jewelers, dealers, and consumers worldwide for accurate and unbiased diamond grading.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8">
            <Globe className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Global Recognition</h3>
            <p className="text-muted-foreground">
              Our certificates are recognized and accepted by major diamond markets across the globe.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            To provide the most accurate, reliable, and comprehensive diamond certification services, 
            ensuring transparency and trust in the global diamond trade while advancing gemological 
            science and education.
          </p>
        </div>
      </div>
    </div>
  );
}