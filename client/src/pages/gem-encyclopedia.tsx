import { useState } from "react";
import { Link } from "wouter";
import { Gem, Search, Sparkles, Diamond, Crown, Star, Eye, Palette, Zap, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import logoPath from "@assets/1000119055-removebg-preview.png";

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
  },
  {
    id: 7,
    name: "Amethyst",
    category: "Semi-Precious",
    hardness: "7",
    crystal: "Hexagonal",
    description: "The purple variety of quartz, amethyst has been prized for millennia. Its color ranges from pale lavender to deep purple and is caused by iron impurities.",
    characteristics: ["Purple coloration", "Excellent hardness", "Piezoelectric properties", "Heat sensitive"],
    colors: ["Light purple", "Deep purple", "Lavender", "Violet"],
    icon: Star
  },
  {
    id: 8,
    name: "Aquamarine",
    category: "Semi-Precious",
    hardness: "7.5-8",
    crystal: "Hexagonal",
    description: "The blue variety of beryl, aquamarine derives its name from seawater. It's known for its clarity and beautiful blue hues ranging from pale to deep blue.",
    characteristics: ["Excellent clarity", "Blue coloration", "Good hardness", "Heat resistant"],
    colors: ["Pale blue", "Sky blue", "Deep blue", "Blue-green"],
    icon: Sparkles
  },
  {
    id: 9,
    name: "Topaz",
    category: "Semi-Precious",
    hardness: "8",
    crystal: "Orthorhombic",
    description: "One of the hardest naturally occurring minerals, topaz comes in many colors. Imperial topaz, with its golden to pink hues, is the most valued variety.",
    characteristics: ["Exceptional hardness", "Perfect cleavage", "High refractive index", "Color variety"],
    colors: ["Colorless", "Blue", "Pink", "Yellow", "Orange", "Imperial"],
    icon: Diamond
  },
  {
    id: 10,
    name: "Peridot",
    category: "Semi-Precious",
    hardness: "6.5-7",
    crystal: "Orthorhombic",
    description: "One of the few gemstones that occurs in only one color - green. Peridot is formed deep in the Earth's mantle and brought to surface by volcanic activity.",
    characteristics: ["Olivine green color", "High birefringence", "Oily luster", "Volcanic origin"],
    colors: ["Yellow-green", "Olive green", "Brownish green"],
    icon: Gem
  },
  {
    id: 11,
    name: "Citrine",
    category: "Semi-Precious",
    hardness: "7",
    crystal: "Hexagonal",
    description: "The yellow to brownish variety of quartz, citrine is often called the 'merchant's stone' and is believed to bring prosperity and success.",
    characteristics: ["Yellow coloration", "Good clarity", "Affordable", "Heat treatable"],
    colors: ["Pale yellow", "Golden yellow", "Orange", "Brownish yellow"],
    icon: Crown
  },
  {
    id: 12,
    name: "Opal",
    category: "Semi-Precious",
    hardness: "5.5-6.5",
    crystal: "Amorphous",
    description: "Known for its unique play-of-color, opal displays a rainbow-like iridescence. It contains water and is formed from silica gel that hardens over time.",
    characteristics: ["Play of color", "Hydrated silica", "Delicate structure", "Color flashes"],
    colors: ["White", "Black", "Fire", "Boulder", "Crystal"],
    icon: Sparkles
  },
  {
    id: 13,
    name: "Tourmaline",
    category: "Semi-Precious",
    hardness: "7-7.5",
    crystal: "Trigonal",
    description: "A complex borosilicate mineral with exceptional color range. Tourmaline can exhibit multiple colors in a single crystal and has strong pleochroism.",
    characteristics: ["Wide color range", "Pleochroism", "Pyroelectric properties", "Bicolor crystals"],
    colors: ["Pink", "Green", "Blue", "Yellow", "Black", "Watermelon", "Paraiba"],
    icon: Palette
  },
  {
    id: 14,
    name: "Jade",
    category: "Semi-Precious",
    hardness: "6-7",
    crystal: "Monoclinic",
    description: "Actually two different minerals: jadeite and nephrite. Prized for thousands of years, especially in Asian cultures for its toughness and beauty.",
    characteristics: ["Exceptional toughness", "Waxy luster", "Cultural significance", "Fine grain structure"],
    colors: ["Green", "White", "Lavender", "Yellow", "Black", "Red"],
    icon: Mountain
  },
  {
    id: 15,
    name: "Citrine",
    category: "Semi-Precious",
    hardness: "7",
    crystal: "Hexagonal",
    description: "The yellow variety of quartz, ranging from pale yellow to brownish orange. Most commercial citrine is heat-treated amethyst or smoky quartz.",
    characteristics: ["Yellow coloration", "Heat treatment common", "Piezoelectric", "Abundant availability"],
    colors: ["Pale yellow", "Golden yellow", "Orange", "Brownish yellow"],
    icon: Star
  },
  {
    id: 16,
    name: "Peridot",
    category: "Semi-Precious",
    hardness: "6.5-7",
    crystal: "Orthorhombic",
    description: "The gem variety of olivine, peridot is one of the few gemstones that occurs in only one color. It's found in meteorites and volcanic rocks.",
    characteristics: ["Single color variety", "High birefringence", "Olivine mineral", "Extraterrestrial occurrence"],
    colors: ["Yellowish green", "Olive green", "Brownish green"],
    icon: Zap
  },
  {
    id: 17,
    name: "Moonstone",
    category: "Semi-Precious",
    hardness: "6-6.5",
    crystal: "Triclinic",
    description: "A variety of feldspar showing adularescence - a billowy, moonlight-like sheen. The optical phenomenon is caused by light scattering between feldspar layers.",
    characteristics: ["Adularescence", "Feldspar mineral", "Layered structure", "Moonlight effect"],
    colors: ["White", "Gray", "Peach", "Green", "Blue", "Rainbow"],
    icon: Eye
  },
  {
    id: 18,
    name: "Lapis Lazuli",
    category: "Semi-Precious",
    hardness: "5-5.5",
    crystal: "Cubic",
    description: "A metamorphic rock composed primarily of lazurite with calcite and pyrite. Prized since antiquity for its intense blue color and golden flecks.",
    characteristics: ["Rock composition", "Pyrite inclusions", "Historical significance", "Intense blue color"],
    colors: ["Deep blue", "Royal blue", "Blue with gold flecks"],
    icon: Crown
  },
  {
    id: 19,
    name: "Turquoise",
    category: "Semi-Precious",
    hardness: "5-6",
    crystal: "Triclinic",
    description: "A hydrated phosphate mineral known for its distinctive blue-green color. Often found with host rock matrix creating unique patterns.",
    characteristics: ["Waxy luster", "Matrix patterns", "Porosity", "Ancient gemstone"],
    colors: ["Sky blue", "Blue-green", "Green", "Blue with matrix"],
    icon: Sparkles
  },
  {
    id: 20,
    name: "Morganite",
    category: "Semi-Precious",
    hardness: "7.5-8",
    crystal: "Hexagonal",
    description: "The pink to peach variety of beryl, colored by manganese. Named after J.P. Morgan, it's prized for its delicate pastel colors.",
    characteristics: ["Beryl variety", "Manganese coloration", "Large crystals possible", "Heat sensitive"],
    colors: ["Pink", "Peach", "Rose", "Salmon"],
    icon: Star
  },
  {
    id: 21,
    name: "Spinel",
    category: "Precious Stone",
    hardness: "8",
    crystal: "Cubic",
    description: "Often confused with ruby throughout history, spinel is a magnesium aluminum oxide. The Black Prince's Ruby in the British Crown is actually a spinel.",
    characteristics: ["High hardness", "No cleavage", "Single refraction", "Historical confusion with ruby"],
    colors: ["Red", "Pink", "Blue", "Purple", "Black", "Colorless"],
    icon: Crown
  },
  {
    id: 22,
    name: "Alexandrite",
    category: "Precious Stone",
    hardness: "8.5",
    crystal: "Orthorhombic",
    description: "A rare variety of chrysoberyl famous for its color-changing properties. Appears green in daylight and red under incandescent light.",
    characteristics: ["Color change", "Extreme rarity", "Chrysoberyl variety", "Pleochroism"],
    colors: ["Green to red", "Blue to purple", "Yellow to pink"],
    icon: Zap
  },
  {
    id: 23,
    name: "Topaz",
    category: "Semi-Precious",
    hardness: "8",
    crystal: "Orthorhombic",
    description: "A fluorine aluminum silicate mineral occurring in many colors. Imperial topaz (orange to pink) is the most valuable variety.",
    characteristics: ["Perfect cleavage", "High hardness", "Wide color range", "Heat treatment common"],
    colors: ["Blue", "Pink", "Yellow", "Orange", "Colorless", "Brown"],
    icon: Diamond
  },
  {
    id: 24,
    name: "Iolite",
    category: "Semi-Precious",
    hardness: "7-7.5",
    crystal: "Orthorhombic",
    description: "Also known as cordierite, iolite shows strong pleochroism displaying violet-blue, yellow, and colorless depending on viewing angle.",
    characteristics: ["Strong pleochroism", "Cordierite mineral", "Viking compass stone", "Three-color effect"],
    colors: ["Violet-blue", "Blue", "Yellow", "Colorless"],
    icon: Eye
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
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gem Encyclopedia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive database of gemstones and learn about their unique characteristics, formation, and properties
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-12 bg-card">
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
            {filteredGems.map((gem, index) => {
              const IconComponent = gem.icon;
              return (
                <motion.div
                  key={gem.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="border-border hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-muted/20 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden"
                            whileHover={{ 
                              rotate: 360,
                              transition: { duration: 0.8, ease: "easeInOut" }
                            }}
                          >
                            <div className="w-10 h-10 z-10 relative">
                              <IconComponent />
                            </div>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/30"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{gem.name}</h3>
                          <Badge variant="secondary" className="text-xs">{gem.category}</Badge>
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