import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Gem, Diamond, Sparkles, Palette, Search, Crown } from "lucide-react";
import { Link } from "wouter";

interface Gemstone {
  id: string;
  name: string;
  category: string;
  hardness: string;
  crystal: string;
  colors: string[];
  characteristics: string[];
  icon: any;
  description: string;
}

const gemstones: Gemstone[] = [
  {
    id: "1",
    name: "Diamond",
    category: "Precious",
    hardness: "10",
    crystal: "Cubic",
    colors: ["Colorless", "Yellow", "Brown", "Blue", "Pink", "Green"],
    characteristics: ["Highest hardness", "Exceptional brilliance", "Adamantine luster"],
    icon: Diamond,
    description: "The hardest natural substance, prized for its exceptional brilliance and fire."
  },
  {
    id: "2",
    name: "Ruby",
    category: "Precious",
    hardness: "9",
    crystal: "Trigonal",
    colors: ["Red", "Pinkish Red", "Purplish Red"],
    characteristics: ["Chromium coloring", "Excellent hardness", "Pleochroism"],
    icon: Gem,
    description: "The red variety of corundum, valued for its vibrant color and durability."
  },
  {
    id: "3",
    name: "Sapphire",
    category: "Precious",
    hardness: "9",
    crystal: "Trigonal",
    colors: ["Blue", "Pink", "Yellow", "White", "Orange", "Green"],
    characteristics: ["Corundum variety", "Excellent hardness", "Color zoning"],
    icon: Gem,
    description: "All non-red varieties of corundum, with blue being the most prized."
  },
  {
    id: "4",
    name: "Emerald",
    category: "Precious",
    hardness: "7.5-8",
    crystal: "Hexagonal",
    colors: ["Green", "Bluish Green", "Yellowish Green"],
    characteristics: ["Beryl variety", "Chromium/vanadium coloring", "Garden inclusions"],
    icon: Gem,
    description: "The green variety of beryl, treasured for its vivid green color."
  },
  {
    id: "5",
    name: "Amethyst",
    category: "Semi-Precious",
    hardness: "7",
    crystal: "Trigonal",
    colors: ["Purple", "Lavender", "Deep Violet"],
    characteristics: ["Quartz variety", "Iron coloring", "Dichroism"],
    icon: Gem,
    description: "The purple variety of quartz, popular for its beautiful color range."
  },
  {
    id: "6",
    name: "Topaz",
    category: "Semi-Precious",
    hardness: "8",
    crystal: "Orthorhombic",
    colors: ["Blue", "Pink", "Yellow", "Colorless", "Orange"],
    characteristics: ["Perfect cleavage", "High hardness", "Pleochroism"],
    icon: Gem,
    description: "A hard gemstone available in many colors, often heat-treated."
  },
  {
    id: "7",
    name: "Garnet",
    category: "Semi-Precious",
    hardness: "6.5-7.5",
    crystal: "Cubic",
    colors: ["Red", "Orange", "Yellow", "Green", "Purple"],
    characteristics: ["Isotropic", "High refractive index", "Dodecahedral crystals"],
    icon: Gem,
    description: "A group of silicate minerals with excellent hardness and luster."
  },
  {
    id: "8",
    name: "Tourmaline",
    category: "Semi-Precious",
    hardness: "7-7.5",
    crystal: "Trigonal",
    colors: ["Pink", "Green", "Blue", "Yellow", "Watermelon", "Black"],
    characteristics: ["Pleochroism", "Pyroelectricity", "Complex chemistry"],
    icon: Gem,
    description: "A complex borosilicate mineral known for its wide range of colors."
  }
];

const categories = ["All", "Precious", "Semi-Precious"];

export default function GemEncyclopedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGems = useMemo(() => {
    return gemstones.filter((gem) => {
      const matchesSearch = gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          gem.characteristics.some(char => char.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || gem.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary/90 to-primary/70 overflow-hidden perspective-container">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-20"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center depth-layer">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4"
          >
            <motion.div 
              className="w-24 h-24 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-3d floating-animation pulse-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Gem className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 text-shadow-lg">
              Gem Encyclopedia
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Explore the fascinating world of gemstones with our comprehensive guide to precious and semi-precious stones
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search gemstones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center perspective-container">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/90 text-primary-foreground button-3d" : "border-border hover:bg-primary/10 button-3d"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6 text-center">
            Showing {filteredGems.length} of {gemstones.length} gemstones
          </p>

          {/* Gemstone Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {filteredGems.map((gem, index) => {
              const IconComponent = gem.icon;
              return (
                <motion.div
                  key={gem.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15, rotateY: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 8,
                    rotateX: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="transform-gpu"
                >
                  <Card className="border-border hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-muted/20 group card-3d">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden icon-3d floating-animation pulse-glow"
                            whileHover={{ 
                              rotate: 360,
                              scale: 1.1,
                              transition: { duration: 0.8, ease: "easeInOut" }
                            }}
                          >
                            <IconComponent className="w-8 h-8 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{gem.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {gem.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
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
                          {gem.colors.slice(0, 4).map((color, colorIndex) => (
                            <Badge key={colorIndex} variant="outline" className="text-xs border-border">
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
                          {gem.characteristics.slice(0, 3).map((char, charIndex) => (
                            <li key={charIndex}>• {char}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
      <div className="py-16 bg-gradient-to-r from-secondary to-muted perspective-container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center depth-layer">
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Gemstone Properties</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Learn about the fundamental characteristics that define each gemstone's beauty and value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, rotateY: -15 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-border card-3d">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-3d floating-animation pulse-glow">
                    <Diamond className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Hardness</h3>
                  <p className="text-sm text-muted-foreground">
                    Measured on the Mohs scale from 1-10, indicating resistance to scratching and durability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotateY: 0 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-border card-3d">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-3d floating-animation pulse-glow">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Brilliance</h3>
                  <p className="text-sm text-muted-foreground">
                    The way light reflects and refracts within the gemstone, creating sparkle and fire.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotateY: 15 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-border card-3d">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-3d floating-animation pulse-glow">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Color</h3>
                  <p className="text-sm text-muted-foreground">
                    The hue, tone, and saturation that determines a gemstone's visual appeal and rarity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
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