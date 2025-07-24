import { useParams, Link } from "wouter";
import { Calendar, Clock, User, ChevronLeft, Tag, Share2, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import { HeaderBannerAd, ContentAd, FooterAd, SidebarAd } from "@/components/adsense-ad";
import { SEOMeta } from "@/components/seo-meta";
import { motion } from "framer-motion";

// Import blog content
import FamousDiamondsContent from "./blog/famous-diamonds-history";
import SyntheticVsNaturalContent from "./blog/synthetic-vs-natural-gems";
import ColoredDiamondRarityContent from "./blog/colored-diamond-rarity";
import GemstoneEthicsContent from "./blog/gemstone-mining-ethics";
import BirthstoneMeaningsContent from "./blog/birthstone-meanings";
import GemInvestmentContent from "./blog/gem-investment-guide";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ComponentType;
}

const blogPosts: Record<string, BlogPost> = {
  "famous-diamonds-history": {
    id: "famous-diamonds-history",
    title: "The Most Famous Diamonds in History: Stories Behind the Stones",
    category: "Diamond History",
    author: "Dr. Sarah Mitchell",
    date: "January 12, 2025",
    readTime: "12 min read",
    tags: ["Famous Diamonds", "History", "Luxury"],
    content: FamousDiamondsContent
  },
  "synthetic-vs-natural-gems": {
    id: "synthetic-vs-natural-gems",
    title: "Synthetic vs Natural Gems: A Comprehensive Comparison Guide",
    category: "Gem Education",
    author: "Prof. Michael Chen",
    date: "January 11, 2025",
    readTime: "10 min read",
    tags: ["Synthetic Gems", "Natural Gems", "Identification"],
    content: SyntheticVsNaturalContent
  },
  "colored-diamond-rarity": {
    id: "colored-diamond-rarity",
    title: "The Rarity of Colored Diamonds: Understanding Nature's Masterpieces",
    category: "Diamond Education",
    author: "Emma Rodriguez",
    date: "January 10, 2025",
    readTime: "8 min read",
    tags: ["Colored Diamonds", "Rarity", "Investment"],
    content: ColoredDiamondRarityContent
  },
  "gemstone-mining-ethics": {
    id: "gemstone-mining-ethics",
    title: "Ethical Gemstone Mining: Ensuring Responsible Sourcing",
    category: "Industry Insights",
    author: "Dr. James Wilson",
    date: "January 9, 2025",
    readTime: "15 min read",
    tags: ["Ethics", "Mining", "Sustainability"],
    content: GemstoneEthicsContent
  },
  "birthstone-meanings": {
    id: "birthstone-meanings",
    title: "Birthstones Through the Ages: Meanings, Myths, and Modern Choices",
    category: "Gem Culture",
    author: "Lisa Thompson",
    date: "January 8, 2025",
    readTime: "9 min read",
    tags: ["Birthstones", "Culture", "Symbolism"],
    content: BirthstoneMeaningsContent
  },
  "gem-investment-guide": {
    id: "gem-investment-guide",
    title: "Investing in Gemstones: A Beginner's Guide to Building a Collection",
    category: "Investment",
    author: "David Park",
    date: "January 7, 2025",
    readTime: "14 min read",
    tags: ["Investment", "Collection", "Market Trends"],
    content: GemInvestmentContent
  }
};

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-[#8c745c] hover:bg-[#725d47] text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Content = post.content;

  return (
    <div className="min-h-screen bg-white">
      <SEOMeta 
        title={`${post.title} | GIL Blog`}
        description={`Read our expert article on ${post.title.toLowerCase()}. Written by ${post.author}, this comprehensive guide covers everything you need to know.`}
        keywords={post.tags.join(", ")}
        image="/images/blog-og.jpg"
      />
      
      <HeaderBannerAd />
      <Navigation />
      
      {/* Article Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>By {post.author}</span>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <article className="prose prose-lg max-w-none">
                <Content />
              </article>
              
              {/* Content Ad */}
              <div className="my-8">
                <ContentAd />
              </div>
              
              {/* Author Bio */}
              <Card className="mt-12">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About the Author</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <p className="text-gray-600 mt-1">
                        A certified gemologist with over 15 years of experience in the industry. 
                        Specializes in diamond grading and gemstone identification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Sidebar Ad */}
              <SidebarAd />
              
              {/* Related Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {Object.values(blogPosts)
                      .filter(p => p.id !== postId && p.category === post.category)
                      .slice(0, 3)
                      .map(relatedPost => (
                        <div key={relatedPost.id} className="pb-4 border-b last:border-0">
                          <Link href={`/blog/${relatedPost.id}`}>
                            <h4 className="font-semibold text-gray-900 hover:text-[#8c745c] transition-colors mb-1">
                              {relatedPost.title}
                            </h4>
                          </Link>
                          <p className="text-sm text-gray-600">{relatedPost.readTime}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Guide */}
              <Card className="bg-gradient-to-br from-[#8c745c]/10 to-[#8c745c]/5 border-[#8c745c]/20">
                <CardContent className="p-6">
                  <BookOpen className="w-8 h-8 text-[#8c745c] mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Learn More</h3>
                  <p className="text-gray-600 mb-4">
                    Explore our comprehensive guides on diamonds and gemstones
                  </p>
                  <div className="space-y-2">
                    <Link href="/diamond-education">
                      <Button variant="outline" className="w-full justify-start">
                        Diamond Education Guide
                      </Button>
                    </Link>
                    <Link href="/gemstone-guide">
                      <Button variant="outline" className="w-full justify-start">
                        Complete Gemstone Guide
                      </Button>
                    </Link>
                  </div>
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