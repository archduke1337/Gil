import Navigation from "@/components/navigation";
import { usePageTitle } from "@/hooks/use-page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Gem, Sparkles, Award } from "lucide-react";

export default function GemEncyclopedia() {
  usePageTitle("Gem Encyclopedia - Diamond & Gemstone Guide");

  const gems = [
    {
      name: "Diamond",
      hardness: "10",
      color: "Colorless to Yellow",
      description: "The hardest natural substance, prized for its brilliance and fire.",
      rarity: "Common to Rare"
    },
    {
      name: "Ruby",
      hardness: "9",
      color: "Red",
      description: "Precious corundum variety, valued for its vibrant red color.",
      rarity: "Rare"
    },
    {
      name: "Sapphire",
      hardness: "9",
      color: "Blue, Various",
      description: "Non-red corundum varieties, most prized in blue.",
      rarity: "Uncommon to Rare"
    },
    {
      name: "Emerald",
      hardness: "7.5-8",
      color: "Green",
      description: "Beryl variety known for its vivid green color.",
      rarity: "Rare"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Gem className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-6">Gem Encyclopedia</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the fascinating world of precious stones with our comprehensive gemstone database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gems.map((gem, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{gem.name}</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hardness:</span>
                    <span className="font-medium">{gem.hardness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{gem.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rarity:</span>
                    <span className="font-medium">{gem.rarity}</span>
                  </div>
                </div>
                
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  {gem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card rounded-lg p-8">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Professional Certification</h2>
            <p className="text-muted-foreground text-lg">
              All gemstones in our database are certified according to international grading standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}