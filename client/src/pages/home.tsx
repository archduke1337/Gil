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
      icon: <Gem className="w-12 h-12 text-primary" />,
      title: "Gem Encyclopedia",
      description: "Comprehensive database of gemstones with detailed information on characteristics, origins, and identification techniques.",
      link: "/gem-encyclopedia"
    },
    {
      icon: <Microscope className="w-12 h-12 text-primary" />,
      title: "Analysis & Grading",
      description: "Professional gemological analysis and grading services using state-of-the-art equipment and certified expertise.",
      link: "/analysis"
    },
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: "Advanced Gem Services",
      description: "AI-powered recommendations, community showcase, rarity analysis, and advanced search tools for gemstone enthusiasts.",
      link: "/gem-services"
    },
    {
      icon: <FileCheck className="w-12 h-12 text-primary" />,
      title: "Report Check",
      description: "Verify the authenticity of gemological certificates and access detailed analysis reports instantly.",
      link: "/verify"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-primary/15 to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('725D47')}' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Gem className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Gemological Institute
              <span className="block text-foreground">Laboratories</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Leading the industry in diamond certification and gemological 
              expertise with cutting-edge technology and uncompromising standards
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/verify">
                  <Search className="mr-2 h-5 w-5" />
                  Verify Certificate
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/about">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Submit Report
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Professional Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border shadow-lg group cursor-pointer bg-card">
                  <Link href={feature.link}>
                    <CardContent className="p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-secondary rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex items-center justify-center text-primary font-semibold group-hover:text-foreground transition-colors duration-300">
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
      <section className="py-20 bg-gradient-to-r from-secondary to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Trusted Worldwide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-card rounded-full shadow-lg">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Certified Excellence</h3>
                <p className="text-muted-foreground">International accreditation and recognition</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-card rounded-full shadow-lg">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Trusted Security</h3>
                <p className="text-muted-foreground">Secure verification and authentication</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-card rounded-full shadow-lg">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Advanced Analysis</h3>
                <p className="text-muted-foreground">State-of-the-art gemological equipment</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Gem className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Leading the world in gemological excellence, education, and certification services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary-foreground transition-colors">About Us</Link></li>
                <li><Link href="/gem-encyclopedia" className="text-muted-foreground hover:text-primary-foreground transition-colors">Gem Encyclopedia</Link></li>
                <li><Link href="/analysis" className="text-muted-foreground hover:text-primary-foreground transition-colors">Analysis & Grading</Link></li>
                <li><Link href="/gem-services" className="text-muted-foreground hover:text-primary-foreground transition-colors">Gem Services</Link></li>
                <li><Link href="/verify" className="text-muted-foreground hover:text-primary-foreground transition-colors">Report Check</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faqs" className="text-muted-foreground hover:text-primary-foreground transition-colors">FAQs</Link></li>
                <li><Link href="/about#contact" className="text-muted-foreground hover:text-primary-foreground transition-colors">Contact</Link></li>
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