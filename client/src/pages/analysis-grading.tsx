import { Link } from "wouter";
import { Gem, Microscope, Award, Target, Scale, Eye, CheckCircle, Star, Palette, Zap, Camera, FileText } from "lucide-react";
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
import { usePageTitle } from "@/hooks/use-page-title";

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
  usePageTitle("Gem Analysis & Grading Services");
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 soft-shadow">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Microscope className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display text-ultra-smooth">
            Analysis & Grading Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-ultra-smooth">
            Professional gemological analysis using advanced instruments and internationally recognized grading standards
          </p>
        </div>
      </div>

      {/* Process Overview */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-ultra-smooth">Our Analysis Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-ultra-smooth">
              Every gemstone undergoes rigorous examination using state-of-the-art equipment and expert evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                <Eye className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-ultra-smooth text-lg">Initial Inspection</h3>
              <p className="text-muted-foreground text-ultra-smooth">
                Visual examination to assess overall condition and identify key characteristics
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                <Microscope className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-ultra-smooth text-lg">Microscopic Analysis</h3>
              <p className="text-muted-foreground text-ultra-smooth">
                Detailed examination using high-powered microscopes to identify inclusions and treatments
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                <Scale className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-ultra-smooth text-lg">Measurement</h3>
              <p className="text-muted-foreground text-ultra-smooth">
                Precise measurements of dimensions, weight, and optical properties
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-ultra-smooth text-lg">Final Grading</h3>
              <p className="text-muted-foreground text-ultra-smooth">
                Comprehensive grading based on international standards and expert assessment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Diamond Grading - 4Cs */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-ultra-smooth">Diamond Grading Standards</h2>
            <p className="text-xl text-muted-foreground text-ultra-smooth">
              We follow the internationally recognized 4Cs system for diamond evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm">
                <CardContent className="p-10">
                  <div className="flex items-center space-x-6 mb-8">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl flex items-center justify-center relative overflow-hidden soft-shadow"
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
                      <h3 className="text-2xl font-bold text-foreground text-ultra-smooth">Carat Weight</h3>
                      <p className="text-muted-foreground text-ultra-smooth">Precise measurement of diamond size</p>
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

            <Card className="border-0 rounded-3xl soft-shadow bg-white/90 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <div className="w-14 h-14">
                      <CutDiagramSVG />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground text-ultra-smooth">Cut Quality</h3>
                    <p className="text-muted-foreground text-ultra-smooth">Precision of diamond proportions</p>
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

            <Card className="border-0 rounded-3xl soft-shadow bg-white/90 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <div className="w-14 h-14">
                      <ColorDiagramSVG />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground text-ultra-smooth">Color Grade</h3>
                    <p className="text-muted-foreground text-ultra-smooth">Absence of color in white diamonds</p>
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

            <Card className="border-0 rounded-3xl soft-shadow bg-white/90 backdrop-blur-sm">
              <CardContent className="p-10">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <div className="w-14 h-14">
                      <ClarityDiagramSVG />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground text-ultra-smooth">Clarity Grade</h3>
                    <p className="text-muted-foreground text-ultra-smooth">Internal and external characteristics</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4 text-ultra-smooth">Advanced Equipment</h2>
            <p className="text-xl text-muted-foreground text-ultra-smooth">
              Our laboratory is equipped with the latest gemological instruments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                  <Microscope className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 text-ultra-smooth">Gemological Microscopes</h3>
                <p className="text-muted-foreground text-ultra-smooth">
                  High-powered binocular microscopes with darkfield illumination for detailed inclusion analysis and identification.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                  <Target className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 text-ultra-smooth">Spectroscopy Equipment</h3>
                <p className="text-muted-foreground text-ultra-smooth">
                  FTIR and UV-Vis spectroscopy for identifying treatments, synthetic materials, and origin determination.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 soft-shadow">
                  <Scale className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 text-ultra-smooth">Precision Instruments</h3>
                <p className="text-muted-foreground text-ultra-smooth">
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
          <h2 className="text-3xl font-bold text-foreground mb-4 text-ultra-smooth">Certification Standards</h2>
          <p className="text-xl text-muted-foreground mb-8 text-ultra-smooth">
            Our reports meet international gemological standards and are recognized worldwide
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 rounded-xl soft-shadow hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3 text-ultra-smooth">International Standards</h3>
                <p className="text-muted-foreground">
                  All our grading follows internationally recognized standards established by leading gemological institutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-xl soft-shadow hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3 text-ultra-smooth">Certified Gemologists</h3>
                <p className="text-muted-foreground">
                  Our team consists of certified gemologists with extensive training and experience in diamond grading.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced 3D Gem Analysis */}
      <div className="py-20 bg-gradient-to-br from-background via-muted/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full mb-6">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-medium">Advanced Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-ultra-smooth">
              Professional 3D Gem Analysis
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-ultra-smooth max-w-4xl mx-auto leading-relaxed">
              Experience cutting-edge gemological examination with our state-of-the-art 3D visualization technology, 
              comprehensive analysis tools, and professional-grade assessment capabilities used by leading gemologists worldwide
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium text-ultra-smooth">360° Examination</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium text-ultra-smooth">Real-time Analysis</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium text-ultra-smooth">Professional Grade</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced Analysis Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl soft-shadow border border-white/20 p-8 md:p-12">
              <EnhancedGemAnalysis gemType="diamond" />
            </div>
          </motion.div>
          
          {/* Analysis Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl soft-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-ultra-smooth">Precision Measurement</h3>
              <p className="text-sm text-muted-foreground">Accurate dimensional analysis to 0.001mm precision</p>
            </div>
            
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl soft-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-ultra-smooth">Inclusion Mapping</h3>
              <p className="text-sm text-muted-foreground">Detailed internal characteristic identification</p>
            </div>
            
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl soft-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-ultra-smooth">Color Analysis</h3>
              <p className="text-sm text-muted-foreground">Spectral color grading and tone assessment</p>
            </div>
            
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl soft-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-ultra-smooth">Detailed Reports</h3>
              <p className="text-sm text-muted-foreground">Comprehensive certification documentation</p>
            </div>
          </motion.div>
        </div>
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
                <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Panel</Link></li>
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