import { Link } from "wouter";
import { Shield, Gem, Search, Microscope, FileCheck, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";
import { usePageTitle } from "@/hooks/use-page-title";

function Home() {
  usePageTitle("Home - Diamond Certificate Verification");
  
  const features = [
    {
      icon: <Gem className="w-12 h-12 text-[#8B5A3C]" />,
      title: "Gem Encyclopedia",
      description: "Comprehensive database of gemstones with detailed information on characteristics, origins, and identification techniques.",
      link: "/gem-encyclopedia"
    },
    {
      icon: <Microscope className="w-12 h-12 text-[#8B5A3C]" />,
      title: "Analysis & Grading",
      description: "Professional gemological analysis and grading services using state-of-the-art equipment and certified expertise.",
      link: "/analysis"
    },
    {
      icon: <Search className="w-12 h-12 text-[#8B5A3C]" />,
      title: "Advanced Gem Services",
      description: "AI-powered recommendations, community showcase, rarity analysis, and advanced search tools for gemstone enthusiasts.",
      link: "/gem-services"
    },
    {
      icon: <FileCheck className="w-12 h-12 text-[#8B5A3C]" />,
      title: "Report Check",
      description: "Verify the authenticity of gemological certificates and access detailed analysis reports instantly.",
      link: "/verify"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8c745c]/5 via-white to-[#8c745c]/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                <img 
                  src={logoPath} 
                  alt="GIL - Gemological Institute Laboratories" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-[#8B5A3C]">Gemological</span>{" "}
              <span className="text-gray-900">Excellence</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Precision certification and advanced gemological analysis for the modern jewelry industry
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/verify">
                <Button size="lg" className="bg-[#8B5A3C] hover:bg-[#8B5A3C]/90 text-white px-8 py-3 text-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  Verify Certificate
                </Button>
              </Link>
              
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white px-8 py-3 text-lg">
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Gemological Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From advanced analysis to comprehensive databases, we provide the tools and expertise needed for professional gemological work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white hover:bg-[#8B5A3C]/5">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#8B5A3C] mb-2">10,000+</div>
              <div className="text-xl text-gray-600">Certificates Issued</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#8B5A3C] mb-2">99.9%</div>
              <div className="text-xl text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#8B5A3C] mb-2">24/7</div>
              <div className="text-xl text-gray-600">Verification Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#8B5A3C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the precision and reliability of professional gemological certification.
          </p>
          <Link href="/verify">
            <Button size="lg" variant="secondary" className="bg-white text-[#8B5A3C] hover:bg-gray-100 px-8 py-3 text-lg">
              <FileCheck className="w-5 h-5 mr-2" />
              Start Verification
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;