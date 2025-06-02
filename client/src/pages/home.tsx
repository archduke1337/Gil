import { Link } from "wouter";
import { Shield, Gem, Search, Clock, Users, Star, Award, Microscope, FileCheck, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="gemological-gradient text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <motion.div 
              className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center shadow-lg p-3 sm:p-4 floating-animation pulse-glow transform-gpu"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 15,
                  transition: { duration: 0.3 }
                }}
              >
                <img 
                  src={logoPath} 
                  alt="GIL - Gemological Institute Laboratories" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Gemological Institute Laboratories
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              World-class diamond certification and gemological services since 1987
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 sm:mb-10 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Trusted by over 50,000+ jewelers, retailers, and collectors worldwide for accurate, 
              reliable gemstone analysis and certification services.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link href="/verify">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold px-6 sm:px-8 py-3 sm:py-4 transform-gpu">
                    <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Verify Certificate
                  </Button>
                </motion.div>
              </Link>
              <Link href="/gem-encyclopedia">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 transform-gpu">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Explore Gems
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center px-4">
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">50,000+</div>
              <div className="text-xs sm:text-sm text-white/80">Certificates Issued</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">37+</div>
              <div className="text-xs sm:text-sm text-white/80">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm text-white/80">Trained Gemologists</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">99.9%</div>
              <div className="text-xs sm:text-sm text-white/80">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">Advanced Gem Services</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Discover our cutting-edge tools and community features designed for gemstone enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full text-center border-border hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">AI Recommendations</h3>
                  <p className="text-muted-foreground mb-4">
                    Get personalized gemstone suggestions based on your preferences and budget
                  </p>
                  <Link href="/gem-services">
                    <Button className="w-full">Try AI Engine</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full text-center border-border hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Rarity Heat Map</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore interactive visualizations of gemstone rarity and market trends
                  </p>
                  <Link href="/gem-services">
                    <Button className="w-full">View Heat Map</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full text-center border-border hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Community Showcase</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your collection and discover exceptional gems from our community
                  </p>
                  <Link href="/gem-services">
                    <Button className="w-full">Join Community</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full text-center border-border hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Advanced Search</h3>
                  <p className="text-muted-foreground mb-4">
                    Search certificates with sophisticated filters and criteria
                  </p>
                  <Link href="/gem-services">
                    <Button className="w-full">Search Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">Our Core Services</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Comprehensive gemological services backed by cutting-edge technology and decades of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="text-center border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Microscope className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Diamond Grading</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Complete 4Cs analysis using advanced spectroscopic equipment and certified expertise.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Certificate Verification</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Secure online verification system for instant certificate authenticity checks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Gemstone Analysis</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Comprehensive identification and evaluation of precious and semi-precious stones.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Appraisal Services</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Professional valuation reports for insurance, estate, and retail purposes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose GIL?</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide comprehensive diamond certification services with the highest standards of accuracy and security.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">Advanced Analysis</h4>
                <p className="text-muted-foreground">
                  State-of-the-art gemological equipment and certified professionals ensure accurate assessments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">Secure Database</h4>
                <p className="text-muted-foreground">
                  Your certificates are stored securely with advanced encryption for maximum trust.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">Expert Support</h4>
                <p className="text-muted-foreground">
                  Our certified gemologists are available to answer questions about your diamond certificates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1">
                  <img 
                    src={logoPath} 
                    alt="GIL Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold lab-primary">GIL</h1>
                  <p className="text-xs text-muted-foreground">Gemological Institute Laboratories</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Leading provider of diamond certification and verification services. 
                Trusted by jewelers, retailers, and consumers worldwide.
              </p>

            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Certificate Verification</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Diamond Grading</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gemstone Analysis</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Appraisal Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Gemological Institute Laboratories. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
