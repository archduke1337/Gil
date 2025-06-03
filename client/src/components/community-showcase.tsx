import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Users, Star, Heart, MessageCircle, Share, Upload, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface GemShowcase {
  id: string;
  title: string;
  description: string;
  gemType: string;
  submittedBy: string;
  rating: number;
  likes: number;
  comments: number;
  tags: string[];
  featured: boolean;
  dateSubmitted: string;
  specifications: {
    carat: string;
    color: string;
    clarity: string;
    cut: string;
  };
}

export default function CommunityShowcase() {
  const [filter, setFilter] = useState("all");
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    gemType: '',
    carat: '',
    color: '',
    clarity: '',
    cut: '',
    description: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSubmissionForm({
      ...submissionForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitGem = () => {
    if (!submissionForm.title || !submissionForm.gemType) {
      toast({
        title: "Missing Information",
        description: "Please fill in the gem title and type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gem Submitted Successfully",
      description: "Your gemstone showcase will be reviewed and published shortly.",
    });
    
    setSubmissionForm({
      title: '',
      gemType: '',
      carat: '',
      color: '',
      clarity: '',
      cut: '',
      description: ''
    });
    setShowSubmissionForm(false);
  };

  const handleLike = (gemId: string) => {
    toast({
      title: "Liked!",
      description: "Added to your favorites",
    });
  };

  const handleComment = (gemId: string) => {
    toast({
      title: "Comment Feature",
      description: "Comment functionality coming soon",
    });
  };

  const handleShare = (gemId: string) => {
    toast({
      title: "Shared",
      description: "Link copied to clipboard",
    });
  };

  const showcaseItems: GemShowcase[] = [
    {
      id: "1",
      title: "Exceptional Kashmir Sapphire",
      description: "A stunning 3.2ct Kashmir sapphire with remarkable velvet blue color and excellent clarity. Family heirloom passed down through generations.",
      gemType: "Sapphire",
      submittedBy: "SapphireCollector",
      rating: 4.9,
      likes: 156,
      comments: 23,
      tags: ["Kashmir", "Blue", "Natural", "Unheated"],
      featured: true,
      dateSubmitted: "2024-01-15",
      specifications: {
        carat: "3.24",
        color: "Cornflower Blue",
        clarity: "VS1",
        cut: "Oval"
      }
    },
    {
      id: "2",
      title: "Rare Padparadscha Discovery",
      description: "Recently acquired Padparadscha sapphire from Sri Lanka with perfect pink-orange hue. Absolutely mesmerizing under different lighting conditions.",
      gemType: "Padparadscha",
      submittedBy: "GemHunter92",
      rating: 4.8,
      likes: 203,
      comments: 45,
      tags: ["Padparadscha", "Sri Lanka", "Natural", "Certified"],
      featured: true,
      dateSubmitted: "2024-01-10",
      specifications: {
        carat: "2.15",
        color: "Pink-Orange",
        clarity: "VVS2",
        cut: "Cushion"
      }
    },
    {
      id: "3",
      title: "Investment Grade Diamond",
      description: "D color, FL clarity, Excellent cut triple X diamond. Perfect example of investment-grade stone with exceptional light performance.",
      gemType: "Diamond",
      submittedBy: "DiamondPro",
      rating: 4.7,
      likes: 89,
      comments: 12,
      tags: ["Diamond", "D Color", "Flawless", "Investment"],
      featured: false,
      dateSubmitted: "2024-01-08",
      specifications: {
        carat: "1.52",
        color: "D",
        clarity: "FL",
        cut: "Excellent"
      }
    },
    {
      id: "4",
      title: "Vintage Emerald Collection",
      description: "Colombian emerald from the famous Muzo mines. Beautiful jardín inclusions that tell the story of its formation deep within the earth.",
      gemType: "Emerald",
      submittedBy: "EmeraldExpert",
      rating: 4.6,
      likes: 134,
      comments: 28,
      tags: ["Emerald", "Colombian", "Muzo", "Vintage"],
      featured: false,
      dateSubmitted: "2024-01-05",
      specifications: {
        carat: "2.85",
        color: "Vivid Green",
        clarity: "VS2",
        cut: "Emerald"
      }
    }
  ];

  const filteredItems = showcaseItems.filter(item => 
    filter === "all" || item.gemType.toLowerCase() === filter.toLowerCase()
  );

  const categories = ["all", "Diamond", "Sapphire", "Emerald", "Padparadscha", "Ruby"];

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl soft-shadow bg-white/80 backdrop-blur-sm border-none">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-heading font-heading text-ultra-smooth">Community Gem Showcase</h3>
              </div>
              
              <Button onClick={() => setShowSubmissionForm(!showSubmissionForm)} className="rounded-2xl text-body font-body text-ultra-smooth">
                <Upload className="w-5 h-5 mr-2" />
                Submit Gem
              </Button>
            </div>

            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className="whitespace-nowrap rounded-2xl text-body-sm font-body text-ultra-smooth"
                >
                  {category === "all" ? "All Gems" : category}
                </Button>
              ))}
            </div>

            {showSubmissionForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-muted/30 backdrop-blur-sm rounded-3xl p-6"
              >
                <h4 className="text-body-lg font-heading mb-6 text-ultra-smooth">Submit Your Gem</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Gem Title" 
                    name="title"
                    value={submissionForm.title}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="Gem Type" 
                    name="gemType"
                    value={submissionForm.gemType}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="Carat Weight" 
                    name="carat"
                    value={submissionForm.carat}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="Color Grade" 
                    name="color"
                    value={submissionForm.color}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="Clarity Grade" 
                    name="clarity"
                    value={submissionForm.clarity}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="Cut Grade" 
                    name="cut"
                    value={submissionForm.cut}
                    onChange={handleInputChange}
                  />
                </div>
                <Textarea 
                  placeholder="Description and story..." 
                  name="description"
                  value={submissionForm.description}
                  onChange={handleInputChange}
                  className="mt-4" 
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setShowSubmissionForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitGem}>Submit for Review</Button>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`hover:shadow-lg transition-shadow ${item.featured ? "ring-2 ring-primary" : ""}`}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold">{item.title}</h4>
                              {item.featured && (
                                <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="font-medium">Carat:</span> {item.specifications.carat}</div>
                          <div><span className="font-medium">Color:</span> {item.specifications.color}</div>
                          <div><span className="font-medium">Clarity:</span> {item.specifications.clarity}</div>
                          <div><span className="font-medium">Cut:</span> {item.specifications.cut}</div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {item.submittedBy.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{item.submittedBy}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{item.comments}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleLike(item.id)}
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            Like
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleComment(item.id)}
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Comment
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleShare(item.id)}
                          >
                            <Share className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline">Load More Showcases</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}