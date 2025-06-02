import { Link } from "wouter";
import { Gem, Microscope, Award, Target, Scale, Eye, CheckCircle, Star, Palette, Zap, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";
import EnhancedGemAnalysis from "@/components/enhanced-gem-analysis";
import ARGemIdentification from "@/components/ar-gem-identification";
import { GemTermTooltip, InfoIconTooltip } from "@/components/educational-tooltips";

// SVG Components for the 4Cs
const CutDiagramSVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="cutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#f3e5f5", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#e1bee7", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#ce93d8", stopOpacity:1}} />
      </linearGradient>
    </defs>
    <polygon points="60,20 85,50 60,100 35,50" fill="url(#cutGradient)" stroke="#8e24aa" strokeWidth="2"/>
    <line x1="60" y1="20" x2="60" y2="50" stroke="#8e24aa" strokeWidth="1"/>
    <line x1="35" y1="50" x2="85" y2="50" stroke="#8e24aa" strokeWidth="1"/>
    <line x1="60" y1="50" x2="60" y2="100" stroke="#8e24aa" strokeWidth="1"/>
    <circle cx="60" cy="35" r="3" fill="#ffffff"/>
  </svg>
);

const ClarityDiagramSVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <radialGradient id="clarityGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:0.9}} />
        <stop offset="70%" style={{stopColor:"#e3f2fd", stopOpacity:0.7}} />
        <stop offset="100%" style={{stopColor:"#bbdefb", stopOpacity:0.8}} />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="40" fill="url(#clarityGradient)" stroke="#1976d2" strokeWidth="2"/>
    <circle cx="55" cy="50" r="2" fill="#ffab40" opacity="0.7"/>
    <circle cx="70" cy="65" r="1.5" fill="#ff7043" opacity="0.6"/>
    <text x="60" y="95" textAnchor="middle" fontSize="10" fill="#1976d2">FL-IF</text>
  </svg>
);

const ColorDiagramSVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
        <stop offset="30%" style={{stopColor:"#fff9c4", stopOpacity:1}} />
        <stop offset="60%" style={{stopColor:"#fff176", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#ffc107", stopOpacity:1}} />
      </linearGradient>
    </defs>
    <rect x="20" y="40" width="80" height="40" fill="url(#colorGradient)" stroke="#f57c00" strokeWidth="2" rx="5"/>
    <text x="30" y="55" fontSize="8" fill="#333">D</text>
    <text x="50" y="55" fontSize="8" fill="#333">G</text>
    <text x="70" y="55" fontSize="8" fill="#333">J</text>
    <text x="90" y="55" fontSize="8" fill="#333">Z</text>
    <text x="60" y="95" textAnchor="middle" fontSize="10" fill="#f57c00">Color Scale</text>
  </svg>
);

const CaratDiagramSVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="caratGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#e8f5e8", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#c8e6c9", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#a5d6a7", stopOpacity:1}} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="60" r="15" fill="url(#caratGradient)" stroke="#4caf50" strokeWidth="2"/>
    <circle cx="70" cy="60" r="20" fill="url(#caratGradient)" stroke="#4caf50" strokeWidth="2"/>
    <text x="40" y="85" textAnchor="middle" fontSize="8" fill="#4caf50">0.5ct</text>
    <text x="70" y="85" textAnchor="middle" fontSize="8" fill="#4caf50">1.0ct</text>
  </svg>
);

export default function AnalysisGrading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Microscope className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Analysis & Grading Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional gemological analysis using advanced instruments and internationally recognized grading standards
          </p>
        </div>
      </div>

      {/* Process Overview */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Analysis Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every gemstone undergoes rigorous examination using state-of-the-art equipment and expert evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Initial Inspection</h3>
              <p className="text-sm text-muted-foreground">
                Visual examination to assess overall condition and identify key characteristics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Microscopic Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Detailed examination using high-powered microscopes to identify inclusions and treatments
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Measurement</h3>
              <p className="text-sm text-muted-foreground">
                Precise measurements of dimensions, weight, and optical properties
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Final Grading</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive grading based on international standards and expert assessment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3D Gem Examination */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Interactive 3D Gem Examination</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience our advanced 3D visualization technology for detailed gemstone analysis
              </p>
            </div>
            <Interactive3DGem gemType="diamond" />
          </motion.div>
        </div>
      </div>



      {/* Diamond Grading - 4Cs */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Diamond Grading Standards</h2>
            <p className="text-xl text-muted-foreground">
              We follow the internationally recognized 4Cs system for diamond evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-border hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12">
                        <CaratDiagramSVG />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-green-300/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Carat Weight</h3>
                      <p className="text-muted-foreground">Precise measurement of diamond size</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Carat weight measures the actual weight of the diamond. One carat equals 0.2 grams or 200 milligrams. 
                    We use certified precision scales accurate to 0.001 carats.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Common sizes:</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <Badge variant="outline" className="border-border">0.25 ct</Badge>
                      <Badge variant="outline" className="border-border">0.50 ct</Badge>
                      <Badge variant="outline" className="border-border">1.00 ct</Badge>
                      <Badge variant="outline" className="border-border">1.50 ct</Badge>
                      <Badge variant="outline" className="border-border">2.00 ct</Badge>
                      <Badge variant="outline" className="border-border">3.00+ ct</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="w-12 h-12">
                      <CutDiagramSVG />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Cut Quality</h3>
                    <p className="text-muted-foreground">Precision of diamond proportions</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Cut quality determines how well a diamond reflects light, affecting its brilliance and fire. 
                  We evaluate proportions, symmetry, and polish to determine overall cut grade.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Cut grades:</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <Badge variant="default" className="lab-bg-primary text-white mr-2">Excellent</Badge>
                    <Badge variant="secondary" className="mr-2">Very Good</Badge>
                    <Badge variant="outline" className="border-border mr-2">Good</Badge>
                    <Badge variant="outline" className="border-border mr-2">Fair</Badge>
                    <Badge variant="outline" className="border-border">Poor</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl flex items-center justify-center">
                    <div className="w-12 h-12">
                      <ColorDiagramSVG />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Color Grade</h3>
                    <p className="text-muted-foreground">Absence of color in white diamonds</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Color grading evaluates the absence of color in white diamonds. The scale runs from D (colorless) 
                  to Z (light yellow or brown). Grading is performed under controlled lighting conditions.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Color scale:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-xs">
                    <Badge variant="default" className="lab-bg-primary text-white">D-F</Badge>
                    <Badge variant="secondary" className="">G-J</Badge>
                    <Badge variant="outline" className="border-border">K-M</Badge>
                    <Badge variant="outline" className="border-border">N-Z</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-xs text-muted-foreground">
                    <span>Colorless</span>
                    <span>Near Colorless</span>
                    <span>Faint Yellow</span>
                    <span>Light Yellow</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="w-12 h-12">
                      <ClarityDiagramSVG />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Clarity Grade</h3>
                    <p className="text-muted-foreground">Internal and external characteristics</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Clarity refers to the absence of inclusions and blemishes. We examine diamonds under 10x magnification 
                  to identify and map any clarity characteristics.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Clarity grades:</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <Badge variant="default" className="lab-bg-primary text-white mr-2">FL</Badge>
                    <Badge variant="default" className="lab-bg-primary text-white mr-2">IF</Badge>
                    <Badge variant="secondary" className="mr-2">VVS1-VVS2</Badge>
                    <Badge variant="secondary" className="mr-2">VS1-VS2</Badge>
                    <Badge variant="outline" className="border-border mr-2">SI1-SI2</Badge>
                    <Badge variant="outline" className="border-border">I1-I3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Equipment and Technology */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Equipment</h2>
            <p className="text-xl text-muted-foreground">
              Our laboratory is equipped with the latest gemological instruments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Microscope className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Gemological Microscopes</h3>
                <p className="text-muted-foreground">
                  High-powered binocular microscopes with darkfield illumination for detailed inclusion analysis and identification.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Spectroscopy Equipment</h3>
                <p className="text-muted-foreground">
                  FTIR and UV-Vis spectroscopy for identifying treatments, synthetic materials, and origin determination.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Precision Instruments</h3>
                <p className="text-muted-foreground">
                  Calibrated carat scales, proportion analyzers, and photogoniometers for accurate measurements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Certification Standards */}
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Certification Standards</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our reports meet international gemological standards and are recognized worldwide
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">International Standards</h3>
                <p className="text-muted-foreground">
                  All our grading follows internationally recognized standards established by leading gemological institutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Certified Gemologists</h3>
                <p className="text-muted-foreground">
                  Our team consists of certified gemologists with extensive training and experience in diamond grading.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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