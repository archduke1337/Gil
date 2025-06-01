import { useState } from "react";
import { Link } from "wouter";
import { Gem, Search, Sparkles, Diamond, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";

// SVG Components for Gemstones
const DiamondSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:0.9}} />
        <stop offset="50%" style={{stopColor:"#e3f2fd", stopOpacity:0.7}} />
        <stop offset="100%" style={{stopColor:"#bbdefb", stopOpacity:0.8}} />
      </linearGradient>
    </defs>
    <polygon points="50,10 70,35 50,90 30,35" fill="url(#diamondGradient)" stroke="#1976d2" strokeWidth="1"/>
    <polygon points="50,10 60,25 50,40 40,25" fill="#ffffff" opacity="0.6"/>
  </svg>
);

const RubySVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="rubyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#ff5252", stopOpacity:0.9}} />
        <stop offset="50%" style={{stopColor:"#d32f2f", stopOpacity:0.8}} />
        <stop offset="100%" style={{stopColor:"#b71c1c", stopOpacity:0.9}} />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="50" rx="35" ry="40" fill="url(#rubyGradient)" stroke="#b71c1c" strokeWidth="1"/>
    <ellipse cx="45" cy="35" rx="10" ry="15" fill="#ff8a80" opacity="0.6"/>
  </svg>
);

const SapphireSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="sapphireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#3f51b5", stopOpacity:0.9}} />
        <stop offset="50%" style={{stopColor:"#1a237e", stopOpacity:0.8}} />
        <stop offset="100%" style={{stopColor:"#0d47a1", stopOpacity:0.9}} />
      </linearGradient>
    </defs>
    <polygon points="50,15 75,40 60,85 40,85 25,40" fill="url(#sapphireGradient)" stroke="#1a237e" strokeWidth="1"/>
    <polygon points="50,15 65,30 50,45 35,30" fill="#7986cb" opacity="0.5"/>
  </svg>
);

const EmeraldSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#4caf50", stopOpacity:0.9}} />
        <stop offset="50%" style={{stopColor:"#2e7d32", stopOpacity:0.8}} />
        <stop offset="100%" style={{stopColor:"#1b5e20", stopOpacity:0.9}} />
      </linearGradient>
    </defs>
    <rect x="25" y="20" width="50" height="60" rx="5" fill="url(#emeraldGradient)" stroke="#2e7d32" strokeWidth="1"/>
    <rect x="30" y="25" width="15" height="20" fill="#81c784" opacity="0.6"/>
  </svg>
);

const gemstones = [
  {
    id: 1,
    name: "Diamond",
    category: "Precious Stone",
    hardness: "10",
    crystal: "Cubic",
    description: "The hardest natural substance known, diamonds are prized for their brilliance and fire. Formed deep within the Earth under extreme pressure and temperature.",
    characteristics: ["Exceptional hardness", "High refractive index", "Superior brilliance", "Excellent thermal conductivity"],
    colors: ["Colorless", "Yellow", "Brown", "Blue", "Pink", "Green", "Red", "Black"],
    icon: DiamondSVG
  },
  {
    id: 2,
    name: "Ruby",
    category: "Precious Stone",
    hardness: "9",
    crystal: "Trigonal",
    description: "The red variety of corundum, rubies are among the most valuable colored gemstones. The finest rubies display a pure red color with excellent clarity.",
    characteristics: ["Vivid red color", "Excellent hardness", "High brilliance", "Pleochroism"],
    colors: ["Pink-red", "Blood red", "Purplish red"],
    icon: RubySVG
  },
  {
    id: 3,
    name: "Sapphire",
    category: "Precious Stone",
    hardness: "9",
    crystal: "Trigonal",
    description: "All non-red varieties of corundum are called sapphires. Blue sapphires are most famous, but they occur in many colors including yellow, pink, and white.",
    characteristics: ["Exceptional hardness", "Excellent clarity", "Vivid colors", "Strong pleochroism"],
    colors: ["Blue", "Yellow", "Pink", "White", "Orange", "Green", "Purple"],
    icon: SapphireSVG
  },
  {
    id: 4,
    name: "Emerald",
    category: "Precious Stone",
    hardness: "7.5-8",
    crystal: "Hexagonal",
    description: "The green variety of beryl, emeralds are valued for their intense green color. Most emeralds contain inclusions, which are considered part of their character.",
    characteristics: ["Intense green color", "Natural inclusions", "Moderate hardness", "Hexagonal crystals"],
    colors: ["Light green", "Deep green", "Bluish green"],
    icon: EmeraldSVG
  },
  {
    id: 5,
    name: "Tanzanite",
    category: "Semi-Precious",
    hardness: "6.5-7",
    crystal: "Orthorhombic",
    description: "Found only in Tanzania, tanzanite displays remarkable trichroism, showing blue, violet, and burgundy colors depending on the viewing angle.",
    characteristics: ["Strong trichroism", "Rare occurrence", "Heat treatment common", "Pleochroic"],
    colors: ["Blue", "Violet", "Purple"],
    icon: Gem
  },
  {
    id: 6,
    name: "Garnet",
    category: "Semi-Precious",
    hardness: "6.5-7.5",
    crystal: "Cubic",
    description: "A group of silicate minerals with similar crystal structures. Garnets come in many colors and are known for their brilliance and durability.",
    characteristics: ["High refractive index", "Good hardness", "Excellent clarity", "Wide color range"],
    colors: ["Red", "Orange", "Yellow", "Green", "Purple", "Pink"],
    icon: Crown
  }
];

export default function GemEncyclopedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGems = gemstones.filter(gem => {
    const matchesSearch = gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || gem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Precious Stone", "Semi-Precious"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="gemological-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gem Encyclopedia
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our comprehensive database of gemstones and learn about their unique characteristics, formation, and properties
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search gemstones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "lab-bg-primary text-white" : "border-border hover:bg-primary/10"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredGems.length} of {gemstones.length} gemstones
          </p>

          {/* Gemstone Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGems.map((gem) => {
              const IconComponent = gem.icon;
              return (
                <Card key={gem.id} className="border-border hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center shadow-inner">
                          <div className="w-10 h-10">
                            <IconComponent />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{gem.name}</h3>
                          <Badge variant="secondary" className="text-xs">{gem.category}</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {gem.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Hardness:</span>
                        <span className="text-sm text-muted-foreground">{gem.hardness}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Crystal System:</span>
                        <span className="text-sm text-muted-foreground">{gem.crystal}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-sm font-medium text-foreground mb-2 block">Common Colors:</span>
                      <div className="flex flex-wrap gap-1">
                        {gem.colors.slice(0, 4).map((color, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-border">
                            {color}
                          </Badge>
                        ))}
                        {gem.colors.length > 4 && (
                          <Badge variant="outline" className="text-xs border-border">
                            +{gem.colors.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-sm font-medium text-foreground mb-2 block">Key Characteristics:</span>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {gem.characteristics.slice(0, 3).map((char, index) => (
                          <li key={index}>• {char}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredGems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No gemstones found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Educational Section */}
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Gemstone Properties</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Learn about the fundamental characteristics that define each gemstone's beauty and value
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Diamond className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Hardness</h3>
                <p className="text-sm text-muted-foreground">
                  Measured on the Mohs scale from 1-10, indicating resistance to scratching and durability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Brilliance</h3>
                <p className="text-sm text-muted-foreground">
                  The amount of light reflected from the interior of a gemstone, creating sparkle and fire.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Clarity</h3>
                <p className="text-sm text-muted-foreground">
                  The presence or absence of inclusions and blemishes that affect the gemstone's appearance.
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
                <div className="w-10 h-10 lab-bg-primary rounded-lg flex items-center justify-center">
                  <Gem className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold lab-primary">GIL</h1>
                  <p className="text-xs text-muted-foreground">Gemological Institute Laboratories</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Leading provider of gemological education, certification and verification services. 
                Trusted by professionals and enthusiasts worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/gem-encyclopedia" className="hover:text-primary transition-colors">Gem Encyclopedia</Link></li>
                <li><Link href="/analysis" className="hover:text-primary transition-colors">Analysis & Grading</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Report Check</Link></li>
                <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
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