import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Map, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";
import GemRecommendationEngine from "@/components/gem-recommendation-engine";
import GemRarityHeatmap from "@/components/gem-rarity-heatmap";
import CommunityShowcase from "@/components/community-showcase";
import AdvancedSearch from "@/components/advanced-search";
import { useQuery } from "@tanstack/react-query";
import type { Certificate } from "@shared/schema";
import { usePageTitle } from "@/hooks/use-page-title";

export default function GemServices() {
  usePageTitle("Gem Services - Advanced Tools & Community");
  const [searchResults, setSearchResults] = useState<Certificate[]>([]);

  const { data: certificatesData } = useQuery<{ certificates: Certificate[] }>({
    queryKey: ["/api/certificates"],
  });

  const certificates = certificatesData?.certificates || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 soft-shadow"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
          </motion.div>
          <motion.h1 
            className="text-hero font-heading mb-8 text-ultra-smooth"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Advanced Gem Services
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-ultra-smooth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our comprehensive suite of gemological tools and community features
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="ai-recommendations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 rounded-xl soft-shadow bg-white">
            <TabsTrigger value="ai-recommendations" className="flex flex-col items-center space-y-2 p-4 rounded-lg text-ultra-smooth">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="rarity-map" className="flex flex-col items-center space-y-2 p-4 rounded-lg text-ultra-smooth">
              <Map className="w-5 h-5" />
              <span className="text-sm font-medium">Rarity Heat Map</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col items-center space-y-2 p-4 rounded-lg text-ultra-smooth">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Community Showcase</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex flex-col items-center space-y-2 p-4 rounded-lg text-ultra-smooth">
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">Advanced Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-recommendations" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">AI-Powered Gem Recommendations</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get personalized gemstone recommendations based on your preferences, budget, and requirements
                </p>
              </div>
              <GemRecommendationEngine />
            </motion.div>
          </TabsContent>

          <TabsContent value="rarity-map" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Gem Rarity Heat Map</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore the rarity and market trends of different gemstones with our interactive visualization
                </p>
              </div>
              <GemRarityHeatmap />
            </motion.div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Community Gem Showcase</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover exceptional gemstones shared by our community and showcase your own collection
                </p>
              </div>
              <CommunityShowcase />
            </motion.div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Certificate Search</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Search and filter through our certificate database with advanced criteria
                </p>
              </div>
              <AdvancedSearch certificates={certificates} onSearchResults={setSearchResults} />
              
              {searchResults.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Search Results ({searchResults.length})</h3>
                  <div className="grid gap-4">
                    {searchResults.map((cert) => (
                      <div key={cert.id} className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{cert.referenceNumber}</h4>
                            <p className="text-muted-foreground">Diamond Certificate</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cert.isActive 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {cert.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Carat:</span> {cert.caratWeight ? `${cert.caratWeight} ct` : "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Color:</span> {cert.colorGrade || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Clarity:</span> {cert.clarityGrade || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Cut:</span> {cert.cutGrade || "N/A"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

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