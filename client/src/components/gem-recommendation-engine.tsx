import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Brain, Sparkles, Star, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

interface RecommendationParams {
  budget: number[];
  purpose: string;
  style: string;
  colorPreference: string;
  sizePreference: string;
  rarityLevel: string;
}

interface GemRecommendation {
  name: string;
  type: string;
  price: string;
  rarity: string;
  color: string;
  size: string;
  confidence: number;
  reasons: string[];
  characteristics: string[];
}

export default function GemRecommendationEngine() {
  const [params, setParams] = useState<RecommendationParams>({
    budget: [5000],
    purpose: "",
    style: "",
    colorPreference: "",
    sizePreference: "",
    rarityLevel: ""
  });

  const [recommendations, setRecommendations] = useState<GemRecommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing with sophisticated algorithm
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations: GemRecommendation[] = [
      {
        name: "Ceylon Blue Sapphire",
        type: "Sapphire",
        price: "$4,200",
        rarity: "Rare",
        color: "Cornflower Blue",
        size: "2.15 ct",
        confidence: 95,
        reasons: ["Matches budget perfectly", "Excellent investment potential", "Suits engagement purpose"],
        characteristics: ["Heat treated", "Eye clean", "Excellent cut"]
      },
      {
        name: "Padparadscha Sapphire",
        type: "Sapphire", 
        price: "$6,800",
        rarity: "Very Rare",
        color: "Pink-Orange",
        size: "1.85 ct",
        confidence: 88,
        reasons: ["Unique color combination", "High appreciation value", "Perfect for special occasions"],
        characteristics: ["Natural unheated", "Minor inclusions", "Excellent clarity"]
      },
      {
        name: "Emerald Colombian",
        type: "Emerald",
        price: "$3,900",
        rarity: "Rare",
        color: "Vivid Green",
        size: "1.95 ct",
        confidence: 82,
        reasons: ["Classic choice", "Strong color saturation", "Good size-to-price ratio"],
        characteristics: ["Oil treated", "Typical inclusions", "Good transparency"]
      }
    ];

    setRecommendations(mockRecommendations);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl soft-shadow bg-white/80 backdrop-blur-sm border-none">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-primary" />
              <h3 className="text-heading font-heading text-ultra-smooth">AI-Powered Gem Recommendation Engine</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Budget Range: ${params.budget[0].toLocaleString()}</Label>
                  <Slider
                    value={params.budget}
                    onValueChange={(value) => setParams(prev => ({ ...prev, budget: value }))}
                    max={50000}
                    min={1000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$1,000</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Select value={params.purpose} onValueChange={(value) => setParams(prev => ({ ...prev, purpose: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engagement">Engagement Ring</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="collection">Collection</SelectItem>
                      <SelectItem value="gift">Gift</SelectItem>
                      <SelectItem value="jewelry">Custom Jewelry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Style Preference</Label>
                  <Select value={params.style} onValueChange={(value) => setParams(prev => ({ ...prev, style: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="unique">Unique/Rare</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Preference</Label>
                  <Select value={params.colorPreference} onValueChange={(value) => setParams(prev => ({ ...prev, colorPreference: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                      <SelectItem value="colorless">Colorless</SelectItem>
                      <SelectItem value="multi">Multi-color</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size Preference</Label>
                  <Select value={params.sizePreference} onValueChange={(value) => setParams(prev => ({ ...prev, sizePreference: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (0.5-1.0 ct)</SelectItem>
                      <SelectItem value="medium">Medium (1.0-2.0 ct)</SelectItem>
                      <SelectItem value="large">Large (2.0-3.0 ct)</SelectItem>
                      <SelectItem value="extra-large">Extra Large (3.0+ ct)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rarity Level</Label>
                  <Select value={params.rarityLevel} onValueChange={(value) => setParams(prev => ({ ...prev, rarityLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="uncommon">Uncommon</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="very-rare">Very Rare</SelectItem>
                      <SelectItem value="extremely-rare">Extremely Rare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button 
              onClick={generateRecommendations}
              disabled={isGenerating || !params.purpose}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Recommendations
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>AI Recommendations</span>
          </h4>

          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-lg font-semibold">{rec.name}</h5>
                        <p className="text-muted-foreground">{rec.type} • {rec.color} • {rec.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{rec.price}</p>
                        <Badge variant={rec.rarity === "Very Rare" ? "default" : "secondary"}>
                          {rec.rarity}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">AI Confidence:</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{rec.confidence}%</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium mb-2">Why Recommended:</h6>
                        <ul className="text-sm space-y-1">
                          {rec.reasons.map((reason, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium mb-2">Key Characteristics:</h6>
                        <div className="flex flex-wrap gap-1">
                          {rec.characteristics.map((char, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}