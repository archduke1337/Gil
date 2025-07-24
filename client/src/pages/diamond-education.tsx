import { useState } from "react";
import { Diamond, Info, ChevronDown, ChevronUp, Star, Eye, Palette, Scale } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOMeta } from "@/components/seo-meta";
import { ContentAd, SidebarAd } from "@/components/adsense-ad";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DiamondEducation() {
  const [activeSection, setActiveSection] = useState("4cs");

  const fourCs = [
    {
      name: "Cut",
      icon: <Star className="w-6 h-6" />,
      description: "The cut of a diamond determines its brilliance. A well-cut diamond reflects light from one facet to another and disperses it through the top of the stone.",
      details: [
        "Cut grades range from Excellent to Poor",
        "Affects how light travels through the diamond",
        "Includes proportions, symmetry, and polish",
        "Most important factor in determining sparkle"
      ],
      grades: ["Excellent", "Very Good", "Good", "Fair", "Poor"]
    },
    {
      name: "Color",
      icon: <Palette className="w-6 h-6" />,
      description: "Diamond color actually refers to the lack of color. The less color a diamond has, the higher its color grade.",
      details: [
        "Graded from D (colorless) to Z (light yellow)",
        "D-F are considered colorless",
        "G-J are near colorless",
        "K-M show faint yellow tint"
      ],
      grades: ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]
    },
    {
      name: "Clarity",
      icon: <Eye className="w-6 h-6" />,
      description: "Clarity refers to the absence of inclusions and blemishes. Natural diamonds form under extreme heat and pressure, resulting in internal and external characteristics.",
      details: [
        "FL - Flawless: No inclusions visible under 10x magnification",
        "IF - Internally Flawless: No internal inclusions",
        "VVS1-VVS2 - Very Very Slightly Included",
        "VS1-VS2 - Very Slightly Included",
        "SI1-SI2 - Slightly Included",
        "I1-I3 - Included"
      ],
      grades: ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
    },
    {
      name: "Carat",
      icon: <Scale className="w-6 h-6" />,
      description: "Carat is the standard unit of weight for diamonds. One carat equals 200 milligrams or 0.2 grams.",
      details: [
        "1 carat = 200 milligrams",
        "Carat weight alone doesn't determine value",
        "Price increases exponentially with carat weight",
        "Visual size depends on cut and shape"
      ],
      weights: ["0.25", "0.50", "0.75", "1.00", "1.50", "2.00", "3.00"]
    }
  ];

  const diamondShapes = [
    { name: "Round Brilliant", facets: 58, description: "The most popular diamond shape, known for maximum brilliance" },
    { name: "Princess", facets: 76, description: "Square or rectangular shape with pointed corners" },
    { name: "Cushion", facets: 58, description: "Square shape with rounded corners, resembling a pillow" },
    { name: "Emerald", facets: 57, description: "Rectangular shape with stepped facets" },
    { name: "Asscher", facets: 58, description: "Square emerald cut with larger step facets" },
    { name: "Marquise", facets: 58, description: "Elongated shape with pointed ends" },
    { name: "Oval", facets: 58, description: "Modified brilliant cut in an oval shape" },
    { name: "Pear", facets: 58, description: "Teardrop shape combining round and marquise" },
    { name: "Heart", facets: 59, description: "Modified brilliant cut in heart shape" },
    { name: "Radiant", facets: 70, description: "Rectangular or square with trimmed corners" }
  ];

  const certificationInfo = {
    importance: [
      "Provides unbiased assessment of diamond quality",
      "Documents the diamond's characteristics",
      "Protects buyers from misrepresentation",
      "Essential for insurance purposes",
      "Helps determine fair market value"
    ],
    whatIncluded: [
      "Unique certificate number",
      "Detailed 4Cs grading",
      "Measurements and proportions",
      "Fluorescence assessment",
      "Clarity plot diagram",
      "Security features",
      "Laser inscription details"
    ],
    howToVerify: [
      "Check certificate number online",
      "Verify security features",
      "Match laser inscription",
      "Confirm measurements",
      "Review grading details"
    ]
  };

  const buyingGuide = [
    {
      title: "Set Your Budget",
      content: "Determine how much you're comfortable spending. Remember that diamonds are available at various price points, and you can find beautiful stones within any budget."
    },
    {
      title: "Prioritize the 4Cs",
      content: "Decide which of the 4Cs matters most to you. Some prefer size (carat), while others prioritize sparkle (cut) or color grade."
    },
    {
      title: "Choose the Shape",
      content: "Select a diamond shape that appeals to you or the recipient. Round brilliants are classic, while fancy shapes offer unique character."
    },
    {
      title: "Verify Certification",
      content: "Always purchase certified diamonds from reputable laboratories like GIL, GIA, or other recognized institutions."
    },
    {
      title: "Consider the Setting",
      content: "The right setting can enhance a diamond's appearance and protect it. Consider how the setting style will complement the diamond."
    },
    {
      title: "Buy from Trusted Sources",
      content: "Purchase from reputable jewelers who provide certification, return policies, and stand behind their products."
    }
  ];

  const commonMisconceptions = [
    {
      myth: "Bigger is always better",
      reality: "A smaller, well-cut diamond can appear more brilliant than a larger, poorly cut stone"
    },
    {
      myth: "Diamonds are indestructible",
      reality: "While diamonds are the hardest natural substance, they can chip or break if struck at the right angle"
    },
    {
      myth: "All diamonds sparkle the same",
      reality: "Cut quality dramatically affects how much a diamond sparkles - a well-cut diamond can appear larger and more brilliant"
    },
    {
      myth: "Fluorescence is always bad",
      reality: "Slight fluorescence can actually make some diamonds appear whiter and can offer better value"
    },
    {
      myth: "VS or VVS clarity is necessary",
      reality: "Many SI1 and even some SI2 diamonds are 'eye-clean' and offer excellent value"
    }
  ];

  const careTips = [
    {
      category: "Daily Care",
      tips: [
        "Remove jewelry during physical activities",
        "Apply cosmetics and perfume before wearing diamonds",
        "Store diamonds separately to prevent scratching",
        "Avoid exposing to harsh chemicals"
      ]
    },
    {
      category: "Cleaning",
      tips: [
        "Soak in warm water with mild dish soap",
        "Use a soft-bristled toothbrush gently",
        "Rinse thoroughly with clean water",
        "Dry with a lint-free cloth",
        "Professional cleaning every 6-12 months"
      ]
    },
    {
      category: "Storage",
      tips: [
        "Store in individual soft pouches",
        "Keep in a fabric-lined jewelry box",
        "Separate diamonds from other jewelry",
        "Maintain consistent temperature"
      ]
    },
    {
      category: "Maintenance",
      tips: [
        "Check prongs and settings regularly",
        "Have professional inspection annually",
        "Re-tighten loose stones immediately",
        "Consider insurance for valuable pieces"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOMeta
        title="Diamond Education Guide - Learn About the 4Cs & Diamond Buying"
        description="Comprehensive diamond education guide covering the 4Cs (Cut, Color, Clarity, Carat), diamond shapes, certification, buying tips, and care instructions. Learn everything about diamonds from GIL experts."
        keywords="diamond education, 4Cs of diamonds, diamond cut, diamond color, diamond clarity, diamond carat, diamond shapes, diamond certification, diamond buying guide, diamond care"
        url="https://gilab.info/diamond-education"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#8c745c]/10 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-[#8c745c]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Diamond className="w-10 h-10 text-[#8c745c]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Diamond Education Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn everything you need to know about diamonds from certified gemologists. 
              Understand the 4Cs, diamond shapes, certification, and make informed purchasing decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                  <TabsTrigger value="4cs">The 4Cs</TabsTrigger>
                  <TabsTrigger value="shapes">Shapes</TabsTrigger>
                  <TabsTrigger value="certification">Certification</TabsTrigger>
                  <TabsTrigger value="buying">Buying Guide</TabsTrigger>
                </TabsList>

                <TabsContent value="4cs" className="space-y-8">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the 4Cs of Diamonds</h2>
                    <p className="text-gray-600 mb-8">
                      The 4Cs—Cut, Color, Clarity, and Carat Weight—are the globally accepted standards for assessing diamond quality. 
                      Developed by the Gemological Institute of America (GIA), these criteria provide a consistent way to evaluate and compare diamonds.
                    </p>
                  </div>

                  {fourCs.map((c, index) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-[#8c745c]/10 rounded-full">
                              {c.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-3">{c.name}</h3>
                              <p className="text-gray-600 mb-4">{c.description}</p>
                              <div className="space-y-2">
                                {c.details.map((detail, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-[#8c745c] rounded-full" />
                                    <span className="text-gray-700">{detail}</span>
                                  </div>
                                ))}
                              </div>
                              {c.grades && (
                                <div className="mt-4">
                                  <p className="font-semibold text-gray-900 mb-2">Grade Scale:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {c.grades.map((grade) => (
                                      <span key={grade} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {grade}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {c.weights && (
                                <div className="mt-4">
                                  <p className="font-semibold text-gray-900 mb-2">Common Weights (carats):</p>
                                  <div className="flex flex-wrap gap-2">
                                    {c.weights.map((weight) => (
                                      <span key={weight} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {weight}ct
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Insert Ad */}
                  <ContentAd />
                </TabsContent>

                <TabsContent value="shapes" className="space-y-8">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Diamond Shapes & Cuts</h2>
                    <p className="text-gray-600 mb-8">
                      While often used interchangeably, 'shape' refers to the diamond's outline when viewed from above, 
                      while 'cut' refers to the diamond's facets, proportions, symmetry, and polish. Each shape has unique 
                      characteristics that affect its brilliance, fire, and overall appearance.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {diamondShapes.map((shape, index) => (
                      <motion.div
                        key={shape.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{shape.name}</h3>
                            <p className="text-gray-600 mb-3">{shape.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Facets: {shape.facets}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <Info className="w-5 h-5 mr-2 text-blue-600" />
                        Choosing the Right Shape
                      </h3>
                      <p className="text-gray-700">
                        The best diamond shape is a matter of personal preference. Round brilliants offer maximum sparkle, 
                        while fancy shapes like oval or marquise can appear larger for the same carat weight. Consider the 
                        wearer's style, hand shape, and the setting when choosing a diamond shape.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="certification" className="space-y-8">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Diamond Certification Explained</h2>
                    <p className="text-gray-600 mb-8">
                      A diamond certificate (or grading report) is an unbiased assessment of a diamond's quality characteristics. 
                      Issued by independent gemological laboratories, these certificates provide crucial information for buyers 
                      and serve as a blueprint of your diamond's unique qualities.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Certification Matters</h3>
                        <div className="space-y-2">
                          {certificationInfo.importance.map((point, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-[#8c745c] rounded-full mt-1.5" />
                              <span className="text-gray-700">{point}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included in a Certificate</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {certificationInfo.whatIncluded.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-[#8c745c] rounded-full" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">How to Verify Your Certificate</h3>
                        <div className="space-y-2">
                          {certificationInfo.howToVerify.map((step, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <span className="flex-shrink-0 w-8 h-8 bg-[#8c745c]/10 text-[#8c745c] rounded-full flex items-center justify-center text-sm font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-gray-700">{step}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="buying" className="space-y-8">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Diamond Buying Guide</h2>
                    <p className="text-gray-600 mb-8">
                      Purchasing a diamond is a significant investment. Whether you're buying an engagement ring or adding to 
                      your collection, understanding these key principles will help you make an informed decision and get the 
                      best value for your budget.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {buyingGuide.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <span className="flex-shrink-0 w-10 h-10 bg-[#8c745c] text-white rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                              </span>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-700">{step.content}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Pro Tip</h3>
                      <p className="text-gray-700">
                        Consider diamonds just below popular carat weights (like 0.95ct instead of 1.00ct) for significant 
                        savings with minimal visual difference. Also, excellent cut quality can make a diamond appear larger 
                        and more brilliant than its actual carat weight suggests.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Common Misconceptions Section */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Diamond Misconceptions</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {commonMisconceptions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium">Myth: {item.myth}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">Reality: {item.reality}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Diamond Care Section */}
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Diamond Care & Maintenance</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {careTips.map((category) => (
                    <Card key={category.category}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                        <div className="space-y-2">
                          {category.tips.map((tip, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-[#8c745c] rounded-full mt-1.5" />
                              <span className="text-gray-700 text-sm">{tip}</span>
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
              {/* Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <a href="/verify" className="block text-[#8c745c] hover:underline">Verify Certificate →</a>
                    <a href="/gem-encyclopedia" className="block text-[#8c745c] hover:underline">Gem Encyclopedia →</a>
                    <a href="/analysis-grading" className="block text-[#8c745c] hover:underline">Grading Services →</a>
                    <a href="/faqs" className="block text-[#8c745c] hover:underline">FAQs →</a>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Ad */}
              <SidebarAd />

              {/* Need Help Card */}
              <Card className="bg-[#8c745c]/10 border-[#8c745c]/20">
                <CardContent className="p-6 text-center">
                  <Diamond className="w-12 h-12 text-[#8c745c] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Need Expert Advice?</h3>
                  <p className="text-gray-700 mb-4">
                    Our certified gemologists are here to help you make the right choice.
                  </p>
                  <a href="/about#contact" className="text-[#8c745c] font-semibold hover:underline">
                    Contact Us →
                  </a>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Diamond Market Updates</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get the latest trends and pricing information delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c745c]"
                    />
                    <button className="w-full bg-[#8c745c] text-white py-2 rounded-lg hover:bg-[#8c745c]/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}