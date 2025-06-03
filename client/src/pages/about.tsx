import { Link } from "wouter";
import { Gem, Award, Shield, Users, Clock, Star, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/1000119055-removebg-preview.png";
import emailjs from '@emailjs/browser';
import { useState } from "react";

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="mx-auto mb-6 floating-animation"
              whileHover={{ 
                scale: 1.05,
                rotateY: 15,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src={logoPath} 
                alt="GIL - Gemological Institute Laboratories" 
                className="h-32 md:h-40 w-auto mx-auto"
              />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Gemological Institute Laboratories
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Leading the industry in diamond certification and gemological expertise with cutting-edge technology and uncompromising standards
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/verify">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 transform-gpu">
                  <Shield className="w-5 h-5 mr-2" />
                  Verify Certificate
                </Button>
              </motion.div>
            </Link>
            <Link href="/gem-services">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 transform-gpu">
                  <Gem className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded with a mission to bring transparency and trust to the diamond industry, 
              GIL has become a respected authority in gemological certification.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="mb-6">
              Gemological Institute Laboratories (GIL) was established by a team of certified gemologists 
              who recognized the need for accurate, reliable, and accessible diamond certification services. 
              Our founders, with decades of combined experience in the jewelry industry, built GIL on the 
              principles of scientific rigor, ethical practices, and customer service excellence.
            </p>
            
            <p className="mb-6">
              From our state-of-the-art laboratory facilities, we employ the latest gemological equipment 
              and techniques to evaluate diamonds according to the most stringent international standards. 
              Every certificate we issue represents our commitment to accuracy and our dedication to 
              protecting both consumers and industry professionals.
            </p>
            
            <p>
              Today, GIL certificates are trusted by jewelers, retailers, and consumers worldwide. 
              Our digital verification system ensures that our certificates remain secure, accessible, 
              and tamper-proof, providing peace of mind for diamond owners everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gradient-to-r from-secondary to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Values</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every aspect of our work and define our commitment to excellence.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="text-center border-border hover:shadow-xl transition-all duration-300 bg-card h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">Integrity</h4>
                  <p className="text-muted-foreground">
                    We maintain the highest ethical standards in all our evaluations, 
                    ensuring honest and unbiased assessments of every diamond.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="text-center border-border hover:shadow-xl transition-all duration-300 bg-card h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">Excellence</h4>
                  <p className="text-muted-foreground">
                    Our certified gemologists use cutting-edge technology and rigorous 
                    procedures to deliver the most accurate certifications possible.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="text-center border-border hover:shadow-xl transition-all duration-300 bg-card h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">Service</h4>
                  <p className="text-muted-foreground">
                    We're committed to providing exceptional customer service and 
                    support to all our clients, from individual consumers to major retailers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Our Expertise</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#ece5dc] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-[#8c745c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Decades of Experience</h4>
                    <p className="text-muted-foreground">
                      Our team brings over 50 years of combined experience in gemological analysis and diamond grading.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#ece5dc] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-[#8c745c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Certified Professionals</h4>
                    <p className="text-muted-foreground">
                      All our gemologists hold certifications from internationally recognized gemological institutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#ece5dc] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Gem className="w-4 h-4 text-[#8c745c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Advanced Technology</h4>
                    <p className="text-muted-foreground">
                      We utilize the latest gemological instruments and scientific methods for precise diamond analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#ece5dc]/30 p-8 rounded-2xl">
              <h4 className="text-xl font-semibold text-foreground mb-4">Certification Standards</h4>
              <p className="text-muted-foreground mb-6">
                Our certification process follows the internationally recognized 4Cs grading system:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#ece5dc] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-[#8c745c]">C</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Carat</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#ece5dc] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-[#8c745c]">C</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Color</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#ece5dc] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-[#8c745c]">C</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Clarity</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#ece5dc] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-[#8c745c]">C</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Cut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gem Encyclopedia Section */}
      <div className="py-16 bg-gradient-to-r from-[#ece5dc] to-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Gem Encyclopedia</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive database contains detailed information on over 200 gemstone varieties
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8c745c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">Gemstone Properties</h4>
                <p className="text-muted-foreground">
                  Physical and optical properties, crystal systems, and identifying characteristics for each gemstone
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8c745c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">Origins & Mining</h4>
                <p className="text-muted-foreground">
                  Geographical sources, mining locations, and geological formation processes
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8c745c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">Market Value</h4>
                <p className="text-muted-foreground">
                  Current market trends, valuation factors, and investment potential analysis
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Analysis & Grading Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Analysis & Grading</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              State-of-the-art equipment and certified expertise ensure accurate gemstone analysis
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-6">Our Testing Methods</h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#ece5dc] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-[#8c745c]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Spectroscopic Analysis</h5>
                    <p className="text-muted-foreground">
                      Advanced spectroscopy techniques including FTIR, UV-Vis, and Raman spectroscopy
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#ece5dc] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-[#8c745c]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Photoluminescence Testing</h5>
                    <p className="text-muted-foreground">
                      Identifying natural versus synthetic gemstones and treatment detection
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#ece5dc] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-[#8c745c]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Microscopic Examination</h5>
                    <p className="text-muted-foreground">
                      Detailed inclusion study and internal structure analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#ece5dc]/30 p-8 rounded-2xl">
              <h4 className="text-xl font-semibold text-foreground mb-4">Grading Standards</h4>
              <p className="text-muted-foreground mb-6">
                We follow internationally recognized grading systems:
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-foreground">Diamond Grading</span>
                  <span className="text-[#8c745c] font-semibold">GIA Standards</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-foreground">Colored Stones</span>
                  <span className="text-[#8c745c] font-semibold">AGTA Guidelines</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-foreground">Pearls</span>
                  <span className="text-[#8c745c] font-semibold">CIBJO Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gradient-to-r from-[#ece5dc] to-[#f5f2ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Services</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive gemological services for professionals and collectors worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#8c745c] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Certification</h4>
                <p className="text-muted-foreground text-sm">
                  Official gemstone identification and grading certificates
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#8c745c] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Appraisal</h4>
                <p className="text-muted-foreground text-sm">
                  Professional valuation for insurance and estate purposes
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#8c745c] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Consultation</h4>
                <p className="text-muted-foreground text-sm">
                  Expert advice on gemstone selection and investment
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#8c745c] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Education</h4>
                <p className="text-muted-foreground text-sm">
                  Training programs for gemology professionals
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h3>
            <p className="text-xl text-muted-foreground">
              Have questions about our certification process or need assistance with certificate verification?
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 lab-bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Email Support</h5>
                      <p className="text-muted-foreground">Get detailed answers to your questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 lab-bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Professional Service</h5>
                      <p className="text-muted-foreground">Speak directly with our gemology experts</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 lab-bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Laboratory Location</h5>
                      <p className="text-muted-foreground">State-of-the-art gemological facility</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <h5 className="font-semibold text-foreground mb-3">Business Hours</h5>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h4>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-foreground">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-border focus:border-primary"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border-border focus:border-primary"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="border-border focus:border-primary"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border-border focus:border-primary min-h-[120px]"
                        placeholder="Please provide details about your inquiry, certificate questions, or how we can assist you..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full lab-bg-primary hover:bg-primary/90 text-white font-medium py-3"
                    >
                      {isSubmitting ? "Sending Message..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={logoPath} 
                  alt="GIL - Gemological Institute Laboratories" 
                  className="h-12 w-auto"
                />
                <div>
                  <h1 className="text-xl font-bold text-[#8c745c]">GIL</h1>
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