import { Link } from "wouter";
import { Calendar, Clock, User, ChevronRight, Tag, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/navigation";
import { HeaderBannerAd, ContentAd, FooterAd, SidebarAd } from "@/components/adsense-ad";
import { SEOMeta } from "@/components/seo-meta";
import { motion } from "framer-motion";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "famous-diamonds-history",
    title: "The Most Famous Diamonds in History: Stories Behind the Stones",
    excerpt: "Explore the fascinating histories of the world's most legendary diamonds, from the Hope Diamond to the Koh-i-Noor, and discover the tales of power, curse, and beauty.",
    category: "Diamond History",
    author: "Dr. Sarah Mitchell",
    date: "January 12, 2025",
    readTime: "12 min read",
    image: "/api/placeholder/800/400",
    tags: ["Famous Diamonds", "History", "Luxury"]
  },
  {
    id: "synthetic-vs-natural-gems",
    title: "Synthetic vs Natural Gems: A Comprehensive Comparison Guide",
    excerpt: "Learn the key differences between synthetic and natural gemstones, how to identify them, and understand their value in today's market.",
    category: "Gem Education",
    author: "Prof. Michael Chen",
    date: "January 11, 2025",
    readTime: "10 min read",
    image: "/api/placeholder/800/400",
    tags: ["Synthetic Gems", "Natural Gems", "Identification"]
  },
  {
    id: "colored-diamond-rarity",
    title: "The Rarity of Colored Diamonds: Understanding Nature's Masterpieces",
    excerpt: "Discover why colored diamonds are among the rarest gems on Earth, how they form, and what makes certain colors more valuable than others.",
    category: "Diamond Education",
    author: "Emma Rodriguez",
    date: "January 10, 2025",
    readTime: "8 min read",
    image: "/api/placeholder/800/400",
    tags: ["Colored Diamonds", "Rarity", "Investment"]
  },
  {
    id: "gemstone-mining-ethics",
    title: "Ethical Gemstone Mining: Ensuring Responsible Sourcing",
    excerpt: "An in-depth look at ethical mining practices, certification systems, and how to ensure your gemstones are responsibly sourced.",
    category: "Industry Insights",
    author: "Dr. James Wilson",
    date: "January 9, 2025",
    readTime: "15 min read",
    image: "/api/placeholder/800/400",
    tags: ["Ethics", "Mining", "Sustainability"]
  },
  {
    id: "birthstone-meanings",
    title: "Birthstones Through the Ages: Meanings, Myths, and Modern Choices",
    excerpt: "Explore the rich history and symbolism of birthstones, from ancient beliefs to modern interpretations and alternative options.",
    category: "Gem Culture",
    author: "Lisa Thompson",
    date: "January 8, 2025",
    readTime: "9 min read",
    image: "/api/placeholder/800/400",
    tags: ["Birthstones", "Culture", "Symbolism"]
  },
  {
    id: "gem-investment-guide",
    title: "Investing in Gemstones: A Beginner's Guide to Building a Collection",
    excerpt: "Learn the fundamentals of gemstone investment, including which gems hold value, market trends, and how to start your collection wisely.",
    category: "Investment",
    author: "David Park",
    date: "January 7, 2025",
    readTime: "14 min read",
    image: "/api/placeholder/800/400",
    tags: ["Investment", "Collection", "Market Trends"]
  }
];

const categories = [
  "All Articles",
  "Diamond History",
  "Gem Education",
  "Diamond Education",
  "Industry Insights",
  "Gem Culture",
  "Investment"
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Articles" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <SEOMeta 
        title="Gemology Blog - Expert Insights on Diamonds & Gemstones | GIL"
        description="Read expert articles on diamonds, gemstones, industry insights, and investment guides. Stay updated with the latest in gemology from GIL's certified experts."
        keywords="gemology blog, diamond articles, gemstone education, gem investment, ethical mining, famous diamonds, birthstones, synthetic gems"
        image="/images/blog-og.jpg"
      />
      
      <HeaderBannerAd />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              GIL Gemology Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Expert insights, educational articles, and the latest news from the world of diamonds and gemstones
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[#8c745c] hover:bg-[#725d47]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No articles found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <div className="h-48 md:h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">Article Image</span>
                            </div>
                          </div>
                          <CardContent className="md:w-2/3 p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center">
                                <Tag className="w-4 h-4 mr-1" />
                                {post.category}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {post.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#8c745c] transition-colors">
                              <Link href={`/blog/${post.id}`}>
                                {post.title}
                              </Link>
                            </h2>
                            
                            <p className="text-gray-600 mb-4">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-600">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                              </div>
                              
                              <Link href={`/blog/${post.id}`}>
                                <Button variant="link" className="text-[#8c745c] hover:text-[#725d47] p-0">
                                  Read More
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Content Ad */}
              <div className="mt-8">
                <ContentAd />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Sidebar Ad */}
              <SidebarAd />
              
              {/* Popular Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Articles</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map(post => (
                      <div key={post.id} className="pb-4 border-b last:border-0">
                        <Link href={`/blog/${post.id}`}>
                          <h4 className="font-semibold text-gray-900 hover:text-[#8c745c] transition-colors mb-1">
                            {post.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-600">{post.readTime}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-[#8c745c]/10 to-[#8c745c]/5 border-[#8c745c]/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Stay Updated</h3>
                  <p className="text-gray-600 mb-4">
                    Get the latest gemology insights delivered to your inbox
                  </p>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="mb-3"
                  />
                  <Button className="w-full bg-[#8c745c] hover:bg-[#725d47] text-white">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <FooterAd />
    </div>
  );
}