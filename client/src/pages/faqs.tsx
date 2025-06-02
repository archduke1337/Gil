import { useState } from "react";
import { Link } from "wouter";
import { Gem, ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";

const faqs = [
  {
    id: 1,
    category: "Certificate Verification",
    question: "How do I verify my diamond certificate?",
    answer: "To verify your diamond certificate, visit our Report Check page and enter your unique reference number. The system will instantly display your certificate details if the number is valid and exists in our database."
  },
  {
    id: 2,
    category: "Certificate Verification",
    question: "What if my certificate reference number is not found?",
    answer: "If your reference number is not found, please verify that you've entered it correctly, including all dashes and letters. Make sure to include any letters and hyphens exactly as they appear on your certificate."
  },
  {
    id: 3,
    category: "Certificate Verification",
    question: "How long are certificates valid?",
    answer: "GILab certificates do not have an expiration date. However, if a diamond undergoes significant repolishing or treatment, a new evaluation may be required."
  },
  {
    id: 4,
    category: "Grading Process",
    question: "What are the 4Cs of diamond grading?",
    answer: "The 4Cs are Carat (weight), Color (absence of color), Clarity (absence of inclusions), and Cut (quality of proportions and finish). These factors determine a diamond's quality and value."
  },
  {
    id: 5,
    category: "Grading Process",
    question: "How long does the grading process take?",
    answer: "Standard grading typically takes 5-10 business days from when we receive your diamond. Rush services may be available for urgent requests with additional fees."
  },
  {
    id: 6,
    category: "Grading Process",
    question: "Can you grade colored diamonds?",
    answer: "Yes, we provide comprehensive grading for fancy colored diamonds, including detailed color origin analysis and intensity grading according to international standards."
  },
  {
    id: 7,
    category: "Grading Process",
    question: "What equipment do you use for grading?",
    answer: "We use state-of-the-art gemological equipment including high-powered microscopes, spectroscopy instruments, precision scales, and photogoniometers, all calibrated to international standards."
  },
  {
    id: 8,
    category: "Services",
    question: "Do you grade other gemstones besides diamonds?",
    answer: "Yes, we offer comprehensive grading services for rubies, sapphires, emeralds, and other precious and semi-precious gemstones using appropriate international standards for each stone type."
  },
  {
    id: 9,
    category: "Services",
    question: "Can you identify synthetic or treated diamonds?",
    answer: "Our laboratory is equipped with advanced spectroscopy equipment that can detect most synthetic diamonds and common treatments. This information is clearly disclosed on our certificates."
  },
  {
    id: 10,
    category: "Services",
    question: "Do you provide origin determination?",
    answer: "We offer origin determination services for certain gemstones where scientifically determinable. This service uses advanced spectroscopic analysis and inclusion studies."
  },
  {
    id: 11,
    category: "Technical",
    question: "What makes GILab certificates secure?",
    answer: "Our certificates feature multiple security measures including unique reference numbers, digital verification systems, tamper-evident features, and secure storage of all grading data."
  },
  {
    id: 12,
    category: "Technical",
    question: "Can I get a digital copy of my certificate?",
    answer: "Yes, digital copies are available through our verification system. Simply enter your reference number on the Report Check page to view and download your certificate."
  },
  {
    id: 13,
    category: "General",
    question: "How do I submit a diamond for grading?",
    answer: "We provide secure shipping instructions and insurance options to ensure your diamond's safe transport to our laboratory. Detailed submission procedures are available through our verification system."
  },
  {
    id: 14,
    category: "General",
    question: "What are your fees for grading services?",
    answer: "Grading fees vary based on the size, type, and complexity of the evaluation required. Detailed pricing information is available through our verification system."
  },
  {
    id: 15,
    category: "General",
    question: "Are your gemologists certified?",
    answer: "All our gemologists hold certifications from recognized international gemological institutes and undergo continuous training to maintain their expertise and certification status."
  }
];

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = ["All", "Certificate Verification", "Grading Process", "Services", "Technical", "General"];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="GIL - Gemological Institute Laboratories" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">GIL</h1>
                <p className="text-xs text-muted-foreground">Gemological Institute Laboratories</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Home
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  About Us
                </Button>
              </Link>
              <Link href="/gem-encyclopedia">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Gem Encyclopedia
                </Button>
              </Link>
              <Link href="/analysis">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Analysis & Grading
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Report Check
                </Button>
              </Link>
              <Button variant="ghost" className="text-primary border-b-2 border-primary">
                FAQs
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="gemological-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Find answers to common questions about our gemological services, certification process, and verification system
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category ? "lab-bg-primary text-white" : "border-border hover:bg-primary/10"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredFAQs.length} of {faqs.length} questions
          </p>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left hover:bg-background/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No questions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or selecting a different category
              </p>
            </div>
          )}
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