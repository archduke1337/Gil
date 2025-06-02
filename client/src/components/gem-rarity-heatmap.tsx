import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, TrendingUp, BarChart3, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface GemRarityData {
  name: string;
  type: string;
  rarity: number; // 1-10 scale
  availability: string;
  priceRange: string;
  origins: string[];
  marketTrend: "up" | "down" | "stable";
}

export default function GemRarityHeatmap() {
  const [selectedGem, setSelectedGem] = useState<GemRarityData | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const gemData: GemRarityData[] = [
    {
      name: "Diamond",
      type: "Precious",
      rarity: 6,
      availability: "Common",
      priceRange: "$1,000 - $50,000",
      origins: ["Botswana", "Russia", "Canada", "Australia"],
      marketTrend: "stable"
    },
    {
      name: "Ruby",
      type: "Precious",
      rarity: 8,
      availability: "Rare",
      priceRange: "$500 - $100,000",
      origins: ["Myanmar", "Thailand", "Sri Lanka", "Madagascar"],
      marketTrend: "up"
    },
    {
      name: "Emerald",
      type: "Precious",
      rarity: 7,
      availability: "Rare",
      priceRange: "$300 - $80,000",
      origins: ["Colombia", "Zambia", "Brazil", "Afghanistan"],
      marketTrend: "up"
    },
    {
      name: "Sapphire",
      type: "Precious",
      rarity: 7,
      availability: "Uncommon",
      priceRange: "$200 - $50,000",
      origins: ["Sri Lanka", "Myanmar", "Kashmir", "Madagascar"],
      marketTrend: "stable"
    },
    {
      name: "Padparadscha",
      type: "Precious",
      rarity: 10,
      availability: "Extremely Rare",
      priceRange: "$5,000 - $200,000",
      origins: ["Sri Lanka", "Madagascar"],
      marketTrend: "up"
    },
    {
      name: "Tanzanite",
      type: "Semi-Precious",
      rarity: 9,
      availability: "Very Rare",
      priceRange: "$300 - $15,000",
      origins: ["Tanzania"],
      marketTrend: "up"
    },
    {
      name: "Paraiba Tourmaline",
      type: "Semi-Precious",
      rarity: 10,
      availability: "Extremely Rare",
      priceRange: "$2,000 - $60,000",
      origins: ["Brazil", "Mozambique", "Nigeria"],
      marketTrend: "up"
    },
    {
      name: "Jadeite",
      type: "Semi-Precious",
      rarity: 9,
      availability: "Very Rare",
      priceRange: "$1,000 - $3,000,000",
      origins: ["Myanmar", "Guatemala", "Japan"],
      marketTrend: "up"
    },
    {
      name: "Amethyst",
      type: "Semi-Precious",
      rarity: 3,
      availability: "Common",
      priceRange: "$10 - $500",
      origins: ["Brazil", "Uruguay", "Zambia", "Russia"],
      marketTrend: "stable"
    },
    {
      name: "Aquamarine",
      type: "Semi-Precious",
      rarity: 4,
      availability: "Uncommon",
      priceRange: "$50 - $5,000",
      origins: ["Brazil", "Madagascar", "Nigeria", "Pakistan"],
      marketTrend: "stable"
    },
    {
      name: "Topaz",
      type: "Semi-Precious",
      rarity: 4,
      availability: "Common",
      priceRange: "$20 - $3,000",
      origins: ["Brazil", "Pakistan", "Russia", "Nigeria"],
      marketTrend: "stable"
    },
    {
      name: "Peridot",
      type: "Semi-Precious",
      rarity: 5,
      availability: "Uncommon",
      priceRange: "$50 - $2,000",
      origins: ["Pakistan", "Myanmar", "China", "Arizona"],
      marketTrend: "stable"
    }
  ];

  const getRarityColor = (rarity: number) => {
    if (rarity >= 9) return "bg-red-500";
    if (rarity >= 7) return "bg-orange-500";
    if (rarity >= 5) return "bg-yellow-500";
    if (rarity >= 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Map className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Interactive Gem Rarity Heat Map</h3>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Map View
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <span className="font-medium">Rarity Scale:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Common (1-2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Uncommon (3-4)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Rare (5-6)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Very Rare (7-8)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Extremely Rare (9-10)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gemData.map((gem, index) => (
                  <motion.div
                    key={gem.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedGem?.name === gem.name 
                        ? "ring-2 ring-primary shadow-lg" 
                        : "hover:shadow-md"
                    }`}
                    style={{
                      backgroundColor: `${getRarityColor(gem.rarity).replace('bg-', '')}20`,
                      border: `2px solid ${getRarityColor(gem.rarity).replace('bg-', '')}`
                    }}
                    onClick={() => setSelectedGem(gem)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{gem.name}</h4>
                        {getTrendIcon(gem.marketTrend)}
                      </div>
                      
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {gem.type}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getRarityColor(gem.rarity)}`}></div>
                          <span className="text-xs font-medium">{gem.rarity}/10</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{gem.availability}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {selectedGem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted/50 rounded-lg p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{selectedGem.name}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Type:</span>
                          <Badge>{selectedGem.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Rarity:</span>
                          <div className="flex items-center space-x-1">
                            <div className={`w-4 h-4 rounded ${getRarityColor(selectedGem.rarity)}`}></div>
                            <span className="text-sm font-bold">{selectedGem.rarity}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Market Trend:</span>
                          {getTrendIcon(selectedGem.marketTrend)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Price Range</h5>
                      <p className="text-lg font-bold text-primary">{selectedGem.priceRange}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Primary Origins</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedGem.origins.map((origin, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {origin}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Availability</h5>
                      <Badge 
                        variant={selectedGem.availability === "Extremely Rare" ? "destructive" : 
                               selectedGem.availability === "Very Rare" ? "default" : "secondary"}
                      >
                        {selectedGem.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}