import { Link } from "wouter";
import { Shield, Gem, Search, Microscope, FileCheck, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function Home() {
  const features = [
    {
      icon: <Gem className="w-12 h-12 text-[#8c745c]" />,
      title: "Gem Encyclopedia",
      description: "Comprehensive database of gemstones with detailed information on characteristics, origins, and identification techniques.",
      link: "/gem-encyclopedia"
    },
    {
      icon: <Microscope className="w-12 h-12 text-[#8c745c]" />,
      title: "Analysis & Grading",
      description: "Professional gemological analysis and grading services using state-of-the-art equipment and certified expertise.",
      link: "/analysis"
    },
    {
      icon: <Search className="w-12 h-12 text-[#8c745c]" />,
      title: "Advanced Gem Services",
      description: "AI-powered recommendations, community showcase, rarity analysis, and advanced search tools for gemstone enthusiasts.",
      link: "/gem-services"
    },
    {
      icon: <FileCheck className="w-12 h-12 text-[#8c745c]" />,
      title: "Report Check",
      description: "Verify the authenticity of gemological certificates and access detailed analysis reports instantly.",
      link: "/verify"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ece5dc] to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('8c745c')}' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <img 
                src={logoPath} 
                alt="GIL - Gemological Institute Laboratories" 
                className="h-24 w-auto mx-auto mb-6"
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Leading Gemological
              <span className="block text-[#8c745c]">Excellence Worldwide</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Trusted by professionals worldwide for accurate gemstone identification, 
              certification, and educational excellence since our founding.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-[#8c745c] hover:bg-[#7a6550] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/verify">
                  Verify Certificate
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-[#8c745c] text-[#8c745c] hover:bg-[#8c745c] hover:text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive gemological services backed by decades of expertise and cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer">
                  <Link href={feature.link}>
                    <CardContent className="p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-[#ece5dc] rounded-full group-hover:bg-[#8c745c] group-hover:text-white transition-all duration-300">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#8c745c] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex items-center justify-center text-[#8c745c] font-semibold group-hover:text-gray-900 transition-colors duration-300">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credentials Section */}
      <section className="py-20 bg-gradient-to-r from-[#ece5dc] to-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Trusted Worldwide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Award className="w-8 h-8 text-[#8c745c]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Excellence</h3>
                <p className="text-gray-600">International accreditation and recognition</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Shield className="w-8 h-8 text-[#8c745c]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Security</h3>
                <p className="text-gray-600">Secure verification and authentication</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Search className="w-8 h-8 text-[#8c745c]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analysis</h3>
                <p className="text-gray-600">State-of-the-art gemological equipment</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/gem-encyclopedia" className="text-gray-400 hover:text-white transition-colors">Gem Encyclopedia</Link></li>
                <li><Link href="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis & Grading</Link></li>
                <li><Link href="/gem-services" className="text-gray-400 hover:text-white transition-colors">Gem Services</Link></li>
                <li><Link href="/verify" className="text-gray-400 hover:text-white transition-colors">Report Check</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#8c745c]">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/about#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
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