import { useState } from "react";
import { Gem, Search, Filter, Info, ChevronRight, Sparkles, Mountain, Palette, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOMeta } from "@/components/seo-meta";
import { ContentAd, SidebarAd } from "@/components/adsense-ad";
import { Badge } from "@/components/ui/badge";

export default function GemstoneGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const gemstoneCategories = {
    precious: "Precious Stones",
    semiprecious: "Semi-Precious Stones",
    organic: "Organic Gems",
    rare: "Rare Collectors' Gems"
  };

  const gemstones = [
    {
      name: "Ruby",
      category: "precious",
      hardness: "9",
      colors: ["Red", "Pink-Red", "Purple-Red"],
      origin: ["Myanmar", "Thailand", "Sri Lanka", "Madagascar"],
      description: "Ruby is the red variety of corundum and one of the most valued gemstones. The finest rubies display a pure, vibrant red to slightly purplish red color.",
      properties: {
        chemicalFormula: "Al₂O₃",
        crystalSystem: "Trigonal",
        refractiveIndex: "1.762-1.770",
        specificGravity: "4.00",
        treatments: ["Heat treatment", "Flux healing", "Lead glass filling"]
      },
      value: "Rubies over 1 carat with fine color and clarity can exceed $100,000 per carat. Burmese rubies with 'pigeon blood' color command the highest prices."
    },
    {
      name: "Sapphire",
      category: "precious",
      hardness: "9",
      colors: ["Blue", "Pink", "Yellow", "Orange", "Padparadscha", "White", "Green"],
      origin: ["Kashmir", "Myanmar", "Sri Lanka", "Thailand", "Madagascar", "Montana USA"],
      description: "Sapphire is the non-red variety of corundum. While blue is most famous, sapphires come in every color except red. Kashmir sapphires are considered the finest.",
      properties: {
        chemicalFormula: "Al₂O₃",
        crystalSystem: "Trigonal",
        refractiveIndex: "1.762-1.770",
        specificGravity: "4.00",
        treatments: ["Heat treatment", "Beryllium diffusion", "Titanium diffusion"]
      },
      value: "Fine blue sapphires can reach $50,000+ per carat. Padparadscha sapphires are extremely rare and valuable, with prices comparable to fine rubies."
    },
    {
      name: "Emerald",
      category: "precious",
      hardness: "7.5-8",
      colors: ["Green", "Bluish-Green"],
      origin: ["Colombia", "Zambia", "Brazil", "Zimbabwe", "Afghanistan"],
      description: "Emerald is the green variety of beryl, colored by chromium and vanadium. Colombian emeralds are prized for their pure green color with slight blue undertones.",
      properties: {
        chemicalFormula: "Be₃Al₂Si₆O₁₈",
        crystalSystem: "Hexagonal",
        refractiveIndex: "1.577-1.583",
        specificGravity: "2.72",
        treatments: ["Oil treatment", "Resin filling", "Opticon treatment"]
      },
      value: "Top-quality emeralds can exceed $20,000 per carat. Colombian emeralds with vivid color and minimal inclusions are most valuable."
    },
    {
      name: "Alexandrite",
      category: "rare",
      hardness: "8.5",
      colors: ["Green to Red (color change)", "Yellow to Pink"],
      origin: ["Russia", "Brazil", "Sri Lanka", "Tanzania", "Madagascar"],
      description: "Alexandrite is a rare chrysoberyl that displays remarkable color change from green in daylight to red under incandescent light. Russian alexandrites are the most prized.",
      properties: {
        chemicalFormula: "BeAl₂O₄",
        crystalSystem: "Orthorhombic",
        refractiveIndex: "1.746-1.755",
        specificGravity: "3.73",
        treatments: ["Usually untreated"]
      },
      value: "Fine alexandrites with strong color change can exceed $70,000 per carat, making them among the most expensive gemstones."
    },
    {
      name: "Aquamarine",
      category: "semiprecious",
      hardness: "7.5-8",
      colors: ["Light Blue", "Blue", "Blue-Green"],
      origin: ["Brazil", "Pakistan", "Madagascar", "Mozambique", "Nigeria"],
      description: "Aquamarine is the blue variety of beryl, prized for its sea-blue colors. The most valued aquamarines display a deep blue color without green tones.",
      properties: {
        chemicalFormula: "Be₃Al₂Si₆O₁₈",
        crystalSystem: "Hexagonal",
        refractiveIndex: "1.577-1.583",
        specificGravity: "2.72",
        treatments: ["Heat treatment"]
      },
      value: "Fine aquamarines range from $100-$600 per carat depending on color intensity and clarity."
    },
    {
      name: "Tourmaline",
      category: "semiprecious",
      hardness: "7-7.5",
      colors: ["Pink", "Green", "Blue", "Watermelon", "Paraiba", "Black", "Colorless"],
      origin: ["Brazil", "Afghanistan", "Pakistan", "Africa", "USA"],
      description: "Tourmaline is a complex boron silicate mineral that occurs in more color varieties than any other gemstone. Paraiba tourmalines with neon blue-green colors are exceptionally rare.",
      properties: {
        chemicalFormula: "Complex boron silicate",
        crystalSystem: "Trigonal",
        refractiveIndex: "1.614-1.666",
        specificGravity: "3.06",
        treatments: ["Heat treatment", "Irradiation", "Oil treatment"]
      },
      value: "Common tourmalines range from $50-$500 per carat, while Paraiba tourmalines can exceed $50,000 per carat."
    },
    {
      name: "Opal",
      category: "semiprecious",
      hardness: "5.5-6.5",
      colors: ["White", "Black", "Fire", "Boulder", "Crystal"],
      origin: ["Australia", "Ethiopia", "Mexico", "Brazil", "USA"],
      description: "Opal displays a unique play-of-color caused by its internal structure diffracting light. Black opals from Lightning Ridge, Australia are the most valuable.",
      properties: {
        chemicalFormula: "SiO₂·nH₂O",
        crystalSystem: "Amorphous",
        refractiveIndex: "1.37-1.47",
        specificGravity: "2.15",
        treatments: ["Sugar/acid treatment", "Smoke treatment", "Resin impregnation"]
      },
      value: "Black opals with strong play-of-color can reach $15,000 per carat. Common white opals range from $10-$200 per carat."
    },
    {
      name: "Pearl",
      category: "organic",
      hardness: "2.5-4.5",
      colors: ["White", "Cream", "Pink", "Silver", "Black", "Gold"],
      origin: ["Japan", "China", "Tahiti", "Australia", "Philippines"],
      description: "Pearls are organic gems formed within mollusks. Cultured pearls dominate the market, with Akoya, South Sea, and Tahitian pearls being most valued.",
      properties: {
        chemicalFormula: "CaCO₃ (aragonite) + conchiolin",
        crystalSystem: "Orthorhombic",
        refractiveIndex: "1.53-1.69",
        specificGravity: "2.71",
        treatments: ["Bleaching", "Dyeing", "Irradiation"]
      },
      value: "Fine South Sea pearls can exceed $100,000 per strand. Individual pearls range from $50 to $5,000+ depending on size, luster, and origin."
    },
    {
      name: "Spinel",
      category: "semiprecious",
      hardness: "8",
      colors: ["Red", "Pink", "Blue", "Lavender", "Orange", "Black"],
      origin: ["Myanmar", "Sri Lanka", "Tanzania", "Vietnam", "Tajikistan"],
      description: "Spinel has been confused with ruby throughout history. The finest red spinels rival rubies in beauty and are increasingly valued by collectors.",
      properties: {
        chemicalFormula: "MgAl₂O₄",
        crystalSystem: "Cubic",
        refractiveIndex: "1.718",
        specificGravity: "3.60",
        treatments: ["Usually untreated"]
      },
      value: "Fine red spinels can reach $20,000 per carat. Pink and blue varieties range from $1,000-$5,000 per carat."
    },
    {
      name: "Tanzanite",
      category: "rare",
      hardness: "6.5-7",
      colors: ["Blue", "Violet-Blue", "Purple-Blue"],
      origin: ["Tanzania (Merelani Hills only)"],
      description: "Tanzanite is a blue variety of zoisite found only in Tanzania. Its rarity and beautiful blue-violet color make it highly sought after.",
      properties: {
        chemicalFormula: "Ca₂Al₃(SiO₄)₃(OH)",
        crystalSystem: "Orthorhombic",
        refractiveIndex: "1.691-1.700",
        specificGravity: "3.35",
        treatments: ["Heat treatment (standard)"]
      },
      value: "Fine tanzanites range from $600-$1,500 per carat, with exceptional stones exceeding $2,000 per carat."
    }
  ];

  const identificationMethods = [
    {
      method: "Visual Inspection",
      tools: "10x Loupe, Microscope",
      description: "Examine color, clarity, inclusions, and surface features. Many gems have characteristic inclusions that aid identification."
    },
    {
      method: "Refractive Index",
      tools: "Refractometer",
      description: "Measure how light bends when entering the gem. Each gem species has a specific refractive index range."
    },
    {
      method: "Specific Gravity",
      tools: "Hydrostatic Scale",
      description: "Determine the gem's density relative to water. Helps distinguish between similar-looking stones."
    },
    {
      method: "UV Fluorescence",
      tools: "UV Lamp",
      description: "Observe how gems react under ultraviolet light. Some gems show characteristic fluorescence patterns."
    },
    {
      method: "Spectroscopy",
      tools: "Spectroscope",
      description: "Analyze the absorption spectrum to identify characteristic patterns for each gem species."
    }
  ];

  const careTips = {
    hard: {
      gems: ["Diamond", "Ruby", "Sapphire", "Alexandrite"],
      care: [
        "Can withstand ultrasonic and steam cleaning",
        "Safe for daily wear in all jewelry types",
        "Store separately to avoid scratching other gems",
        "Regular cleaning with mild soap and water"
      ]
    },
    medium: {
      gems: ["Emerald", "Aquamarine", "Tourmaline", "Spinel"],
      care: [
        "Avoid ultrasonic cleaners and sudden temperature changes",
        "Remove before physical activities",
        "Clean with warm soapy water and soft brush",
        "Store in individual soft pouches"
      ]
    },
    soft: {
      gems: ["Opal", "Pearl", "Tanzanite", "Moonstone"],
      care: [
        "Avoid all chemicals, cosmetics, and perfumes",
        "Never use ultrasonic or steam cleaners",
        "Store separately in soft cloth",
        "Clean only with damp soft cloth"
      ]
    }
  };

  const filteredGemstones = gemstones.filter(gem => {
    const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || gem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <SEOMeta
        title="Complete Gemstone Guide - Types, Properties & Identification"
        description="Comprehensive guide to gemstones including precious stones, identification methods, care tips, and valuation. Learn about rubies, sapphires, emeralds, and rare collectors' gems from certified experts."
        keywords="gemstone guide, precious stones, ruby, sapphire, emerald, gemstone identification, gem properties, gemstone value, gemstone care, semi-precious stones"
        url="https://gilab.info/gemstone-guide"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gem className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Complete Gemstone Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the fascinating world of gemstones. Learn about their properties, origins, 
              identification methods, and proper care from industry experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search gemstones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {Object.entries(gemstoneCategories).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Gemstones</h2>
                <p className="text-gray-600 mb-4">
                  Gemstones have captivated humanity for millennia with their beauty, rarity, and durability. 
                  From the ancient Egyptian pharaohs to modern collectors, these precious minerals continue 
                  to fascinate and inspire. This comprehensive guide will help you understand the complex 
                  world of gemstones, their properties, and how to identify and care for them.
                </p>
                <p className="text-gray-600">
                  Whether you're a collector, jeweler, or simply curious about gemstones, understanding 
                  their physical properties, origins, and treatments is essential for making informed 
                  decisions about purchasing and caring for these natural treasures.
                </p>
              </div>

              {/* Gemstone List */}
              <div className="space-y-8 mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Gemstone Encyclopedia</h2>
                {filteredGemstones.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500">No gemstones found matching your criteria.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredGemstones.map((gem, index) => (
                    <motion.div
                      key={gem.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{gem.name}</h3>
                              <Badge variant="secondary">
                                {gemstoneCategories[gem.category as keyof typeof gemstoneCategories]}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Mohs Hardness</p>
                              <p className="text-2xl font-bold text-[#8c745c]">{gem.hardness}</p>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{gem.description}</p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Colors Available</h4>
                              <div className="flex flex-wrap gap-2">
                                {gem.colors.map((color) => (
                                  <span key={color} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                    {color}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Major Origins</h4>
                              <div className="flex flex-wrap gap-2">
                                {gem.origin.map((place) => (
                                  <span key={place} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                    {place}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Technical Properties</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500">Chemical Formula</p>
                                <p className="font-mono">{gem.properties.chemicalFormula}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Crystal System</p>
                                <p>{gem.properties.crystalSystem}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Refractive Index</p>
                                <p>{gem.properties.refractiveIndex}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Specific Gravity</p>
                                <p>{gem.properties.specificGravity}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-500">Common Treatments</p>
                                <p>{gem.properties.treatments.join(", ")}</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Market Value</h4>
                            <p className="text-gray-600 text-sm">{gem.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Ad Placement */}
              <ContentAd />

              {/* Identification Methods */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Gemstone Identification Methods</h2>
                <div className="grid gap-6">
                  {identificationMethods.map((method, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-purple-100 rounded-full">
                            <Eye className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{method.method}</h3>
                            <p className="text-sm text-gray-500 mb-2">Tools: {method.tools}</p>
                            <p className="text-gray-700">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Care Guide */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Gemstone Care Guide</h2>
                <div className="space-y-6">
                  {Object.entries(careTips).map(([hardness, info]) => (
                    <Card key={hardness}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                          {hardness} Gemstones
                        </h3>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Examples:</p>
                          <div className="flex flex-wrap gap-2">
                            {info.gems.map((gem) => (
                              <Badge key={gem} variant="outline">{gem}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {info.care.map((tip, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-[#8c745c] rounded-full mt-1.5" />
                              <span className="text-gray-700">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quick Facts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Gemstone Facts</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Sparkles className="w-5 h-5 text-[#8c745c] mt-0.5" />
                      <p className="text-gray-700 text-sm">The "Big Four" precious stones are diamond, ruby, sapphire, and emerald</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Mountain className="w-5 h-5 text-[#8c745c] mt-0.5" />
                      <p className="text-gray-700 text-sm">Most gemstones form deep within the Earth's crust under extreme conditions</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Palette className="w-5 h-5 text-[#8c745c] mt-0.5" />
                      <p className="text-gray-700 text-sm">A gem's color is often caused by trace elements or structural defects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Ad */}
              <SidebarAd />

              {/* Related Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Learn More</h3>
                  <div className="space-y-2">
                    <a href="/diamond-education" className="block text-[#8c745c] hover:underline">Diamond Education →</a>
                    <a href="/verify" className="block text-[#8c745c] hover:underline">Verify Certificate →</a>
                    <a href="/analysis-grading" className="block text-[#8c745c] hover:underline">Grading Services →</a>
                    <a href="/gem-encyclopedia" className="block text-[#8c745c] hover:underline">Gem Encyclopedia →</a>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Disclosure */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-yellow-600" />
                    Treatment Disclosure
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Most gemstones undergo some form of treatment to enhance their appearance. 
                    Always ask for treatment disclosure when purchasing gems, as treatments 
                    can significantly affect value and care requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}