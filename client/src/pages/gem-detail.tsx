import { useParams, Link } from "wouter";
import { ArrowLeft, Globe, Microscope, MapPin, Calendar, Award, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";

// Comprehensive gem data with Wikipedia-sourced information
const gemDetailData: Record<string, any> = {
  "1": {
    name: "Diamond",
    formula: "C (Carbon)",
    crystalSystem: "Cubic",
    hardness: "10",
    specificGravity: "3.52",
    refractiveIndex: "2.417",
    category: "Precious Stone",
    colors: ["Colorless", "Yellow", "Brown", "Blue", "Pink", "Red", "Green", "Purple", "Black"],
    overview: "Diamond is a form of the element carbon with its atoms arranged in a crystal structure called diamond cubic. At room temperature and pressure, another solid form of carbon known as graphite is the chemically stable form of carbon, but diamond almost never converts to it.",
    formation: "Most natural diamonds have ages between 1 billion and 3.5 billion years. Most were formed at depths between 150 and 250 kilometres (93 and 155 mi) in the Earth's mantle, although a few have come from as deep as 800 kilometres (500 mi).",
    properties: [
      "Highest hardness of any natural material",
      "Highest thermal conductivity of any material at room temperature",
      "Extreme brilliance due to high refractive index",
      "Chemical inertness under normal conditions",
      "Electrical insulator (pure diamond)"
    ],
    locations: [
      "Botswana (largest producer by value)",
      "Russia (largest producer by volume)",
      "Democratic Republic of Congo",
      "Australia",
      "Canada",
      "South Africa"
    ],
    historicalSignificance: "Diamonds have been treasured as gemstones since their use as religious icons in ancient India. The popularity of diamonds has risen since the 19th century because of increased supply, improved cutting and polishing techniques, growth in the world economy, and innovative and successful advertising campaigns.",
    uses: [
      "Jewelry and gemstones",
      "Industrial cutting and drilling tools",
      "Heat sinks in electronics",
      "Optical applications",
      "Scientific instruments"
    ],
    mythology: "In ancient times, diamonds were believed to be fragments of stars or the teardrops of gods. Some cultures believed diamonds could cure ailments and provide protection in battle.",
    mineralogy: "Diamond belongs to the native element class of minerals and is the only gem composed of a single element. Its cubic crystal structure and covalent bonding give it exceptional hardness and brilliance."
  },
  "2": {
    name: "Ruby",
    formula: "Al₂O₃ (Aluminum oxide with chromium)",
    crystalSystem: "Trigonal",
    hardness: "9",
    specificGravity: "4.0",
    refractiveIndex: "1.762-1.770",
    category: "Precious Stone",
    colors: ["Red", "Pinkish red", "Purplish red", "Orangish red"],
    overview: "Ruby is the red variety of the mineral corundum, one of the hardest minerals on Earth. The red color comes mainly from the presence of the element chromium. All other colors of corundum are called sapphire.",
    formation: "Rubies form in metamorphic rocks such as gneiss or schist, or in igneous rocks such as basalt. They require specific conditions of temperature, pressure, and chemical environment, particularly the presence of chromium and absence of iron.",
    properties: [
      "Second hardest natural mineral after diamond",
      "Excellent durability for jewelry",
      "Strong fluorescence under UV light",
      "Pleochroism (different colors from different angles)",
      "High brilliance and fire"
    ],
    locations: [
      "Myanmar (Burma) - finest quality rubies",
      "Thailand",
      "Sri Lanka",
      "Madagascar",
      "Mozambique",
      "Tanzania"
    ],
    historicalSignificance: "Ruby has been prized for over 2,000 years. Ancient Hindus called ruby 'ratnaraj,' meaning 'king of gems.' Medieval Europeans wore rubies to guarantee health, wealth, wisdom, and success in love.",
    uses: [
      "Fine jewelry and engagement rings",
      "Laser technology (synthetic rubies)",
      "Watch bearings",
      "Scientific instruments",
      "Investment gemstones"
    ],
    mythology: "Ancient cultures believed rubies contained an inextinguishable flame. Burmese warriors implanted rubies under their skin believing it made them invincible in battle.",
    mineralogy: "Ruby is the red variety of corundum (Al₂O₃). The presence of chromium gives ruby its red color, while trace amounts of iron can shift the color toward orange or purple."
  },
  "3": {
    name: "Sapphire",
    formula: "Al₂O₃ (Aluminum oxide)",
    crystalSystem: "Trigonal",
    hardness: "9",
    specificGravity: "4.0",
    refractiveIndex: "1.762-1.770",
    category: "Precious Stone",
    colors: ["Blue", "Pink", "Yellow", "White", "Green", "Orange", "Purple", "Padparadscha"],
    overview: "Sapphire is any gem-quality corundum that is not red. Blue sapphire is the most well-known, but sapphires occur in many colors. The blue color comes from iron and titanium impurities.",
    formation: "Sapphires form in aluminum-rich, silica-poor environments under high temperature and pressure conditions. They can form in both igneous and metamorphic environments, often in association with other aluminum-rich minerals.",
    properties: [
      "Exceptional hardness (9 on Mohs scale)",
      "Excellent clarity in fine specimens",
      "Strong pleochroism in some varieties",
      "Chemical resistance",
      "High refractive index providing brilliance"
    ],
    locations: [
      "Kashmir, India (legendary blue sapphires)",
      "Myanmar (Burma)",
      "Sri Lanka (wide variety of colors)",
      "Madagascar",
      "Australia",
      "Montana, USA"
    ],
    historicalSignificance: "Sapphires have been prized by royalty and clergy for centuries. The British Crown Jewels contain several famous sapphires. Ancient Greeks and Romans believed sapphires attracted divine favor and symbolized wisdom.",
    uses: [
      "Fine jewelry and royal regalia",
      "Watch crystals and movements",
      "Electronic substrates",
      "Optical components",
      "Industrial applications"
    ],
    mythology: "Ancient Persians believed the Earth rested on a giant sapphire and its reflection colored the sky blue. Medieval clergy wore sapphires to symbolize Heaven.",
    mineralogy: "Sapphire is corundum (Al₂O₃) in all colors except red. Various trace elements create different colors: iron and titanium for blue, chromium for pink, iron for yellow and green."
  },
  "4": {
    name: "Emerald",
    formula: "Be₃Al₂Si₆O₁₈ (Beryl with chromium/vanadium)",
    crystalSystem: "Hexagonal",
    hardness: "7.5-8",
    specificGravity: "2.7-2.8",
    refractiveIndex: "1.577-1.583",
    category: "Precious Stone",
    colors: ["Green", "Bluish green", "Yellowish green"],
    overview: "Emerald is the green variety of beryl, colored by trace amounts of chromium and sometimes vanadium. It is considered one of the four traditional precious stones along with diamond, ruby, and sapphire.",
    formation: "Emeralds form in hydrothermal veins and pegmatites, or through metamorphic processes. The formation requires the rare combination of beryllium, aluminum, silicon, and chromium or vanadium in the same geological environment.",
    properties: [
      "Distinctive green color from chromium/vanadium",
      "Natural inclusions called 'jardin' (garden)",
      "Lower hardness than other precious stones",
      "Brittle nature requires careful handling",
      "Oil treatment commonly used to improve clarity"
    ],
    locations: [
      "Colombia (highest quality emeralds)",
      "Zambia",
      "Brazil",
      "Afghanistan",
      "Pakistan",
      "Russia (Ural Mountains)"
    ],
    historicalSignificance: "Emeralds were mined in Egypt as early as 330 BC. Cleopatra was known for her passion for emeralds. The Spanish conquistadors brought emeralds from South America to Europe in the 16th century.",
    uses: [
      "High-end jewelry",
      "Investment gemstones",
      "Museum specimens",
      "Royal and ceremonial objects",
      "Collector specimens"
    ],
    mythology: "Ancient Romans associated emeralds with Venus, the goddess of love and beauty. They believed emeralds could improve eyesight and reveal truth. Islamic tradition holds that emeralds represent paradise.",
    mineralogy: "Emerald is the green variety of beryl (Be₃Al₂Si₆O₁₈). The green color comes from chromium and/or vanadium substituting for aluminum in the crystal structure."
  },
  "13": {
    name: "Tourmaline",
    formula: "(Na,Ca)(Li,Mg,Fe²⁺,Fe³⁺,Mn²⁺,Al)₃Al₆(BO₃)₃Si₆O₁₈(OH)₄",
    crystalSystem: "Trigonal",
    hardness: "7-7.5",
    specificGravity: "3.06",
    refractiveIndex: "1.616-1.650",
    category: "Semi-Precious",
    colors: ["Pink", "Green", "Blue", "Yellow", "Black", "Watermelon", "Paraiba", "Colorless"],
    overview: "Tourmaline is a complex borosilicate mineral with a unique property of pyroelectricity. It occurs in more colors than any other gemstone and can display multiple colors in a single crystal.",
    formation: "Tourmaline forms in granite pegmatites and metamorphic rocks. It crystallizes from boron-rich fluids during the late stages of granite formation or during regional metamorphism.",
    properties: [
      "Strong pleochroism (different colors from different angles)",
      "Pyroelectric properties (generates electric charge when heated)",
      "Piezoelectric properties (generates charge under pressure)",
      "Can show multiple colors in single crystal",
      "Exceptional color range"
    ],
    locations: [
      "Brazil (major source of all varieties)",
      "Afghanistan",
      "Pakistan",
      "Nigeria",
      "Madagascar",
      "United States (Maine, California)"
    ],
    historicalSignificance: "Dutch traders brought tourmaline from Sri Lanka to Europe in the 1700s. The name comes from the Sinhalese word 'turmali' meaning 'mixed gems' due to its color variety.",
    uses: [
      "Jewelry in all varieties",
      "Electronic applications (pressure gauges)",
      "Scientific instruments",
      "Collector specimens",
      "Industrial applications"
    ],
    mythology: "Ancient Egyptian legend tells that tourmaline traveled along a rainbow from the earth's center, collecting all the rainbow's colors. Some believe it promotes healing and protection.",
    mineralogy: "Tourmaline is a complex borosilicate with highly variable composition. The different varieties are named based on color and chemical composition: elbaite (lithium-rich), schorl (iron-rich), dravite (magnesium-rich)."
  },
  "21": {
    name: "Spinel",
    formula: "MgAl₂O₄ (Magnesium aluminum oxide)",
    crystalSystem: "Cubic",
    hardness: "8",
    specificGravity: "3.6",
    refractiveIndex: "1.718",
    category: "Precious Stone",
    colors: ["Red", "Pink", "Blue", "Purple", "Black", "Colorless", "Orange"],
    overview: "Spinel is a magnesium aluminum oxide mineral that has been confused with ruby throughout history. Many famous 'rubies' in crown jewels are actually spinels, including the Black Prince's Ruby in the British Crown Jewels.",
    formation: "Spinel forms in metamorphic rocks, particularly in marble and other calcium-rich rocks that have been altered by contact metamorphism. It also occurs in igneous rocks and alluvial deposits.",
    properties: [
      "High hardness (8 on Mohs scale)",
      "Single refraction (not double like ruby)",
      "No cleavage (unlike ruby which has parting)",
      "Excellent brilliance and fire",
      "Fluorescence under UV light (red spinels)"
    ],
    locations: [
      "Myanmar (Burma) - finest red spinels",
      "Sri Lanka",
      "Afghanistan",
      "Tajikistan",
      "Tanzania",
      "Madagascar"
    ],
    historicalSignificance: "For centuries, red spinel was confused with ruby. The 'Black Prince's Ruby' (actually a spinel) has been in the British Crown since 1367. The Timur Ruby, another famous spinel, weighs 361 carats.",
    uses: [
      "Fine jewelry (especially red and pink varieties)",
      "Investment gemstones",
      "Collector specimens",
      "Museum displays",
      "Industrial applications (synthetic spinel)"
    ],
    mythology: "Like ruby, red spinel was believed to contain an inner fire that could never be extinguished. Warriors carried spinel for protection, believing it would make them invincible.",
    mineralogy: "Spinel belongs to the spinel group of minerals with the formula MgAl₂O₄. It has a cubic crystal structure and forms complete solid solution series with other spinel group minerals."
  },
  "22": {
    name: "Alexandrite",
    formula: "BeAl₂O₄ (Beryllium aluminum oxide with chromium)",
    crystalSystem: "Orthorhombic",
    hardness: "8.5",
    specificGravity: "3.73",
    refractiveIndex: "1.746-1.755",
    category: "Precious Stone",
    colors: ["Green to red", "Blue to purple", "Yellow to pink"],
    overview: "Alexandrite is an extremely rare variety of chrysoberyl that exhibits a dramatic color change. It appears green in daylight and red under incandescent light, a phenomenon caused by the way the mineral absorbs light.",
    formation: "Alexandrite forms under very specific conditions requiring the presence of both beryllium and chromium in the same geological environment, which is extremely rare. It typically forms in mica schist, dolomitic limestone, or emerald mines.",
    properties: [
      "Remarkable color change (pleochroism)",
      "Extreme rarity",
      "High hardness (8.5 on Mohs scale)",
      "Excellent durability",
      "Cat's eye effect in some specimens"
    ],
    locations: [
      "Russia (Ural Mountains - original source)",
      "Sri Lanka",
      "East Africa (Tanzania, Madagascar)",
      "Brazil",
      "Myanmar"
    ],
    historicalSignificance: "Discovered in Russia's Ural Mountains in 1830, alexandrite was named after Tsar Alexander II. It became Russia's national stone because its color change from green to red matched the Russian military colors.",
    uses: [
      "Ultra-high-end jewelry",
      "Investment and collector gemstones",
      "Museum specimens",
      "Royal and ceremonial jewelry",
      "Laser technology (synthetic alexandrite)"
    ],
    mythology: "Russians believed alexandrite brought good luck and fortune. It was considered a stone of very good omen, bringing balance between physical and spiritual, and helping one find their purpose in life.",
    mineralogy: "Alexandrite is a variety of chrysoberyl (BeAl₂O₄) containing chromium. The chromium causes both the green color and the color change. The phenomenon is due to the way chromium absorbs light in different parts of the spectrum."
  }
};

export default function GemDetail() {
  const params = useParams();
  const gemId = params.id;
  const gem = gemDetailData[gemId as string];

  if (!gem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Gem Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested gemstone information could not be found.</p>
          <Button asChild>
            <Link href="/gem-encyclopedia">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Encyclopedia
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/15 to-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6 button-3d">
            <Link href="/gem-encyclopedia">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Encyclopedia
            </Link>
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{gem.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{gem.formula}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {gem.colors.slice(0, 5).map((color: string, index: number) => (
                <Badge key={index} variant="secondary" className="card-3d">
                  {color}
                </Badge>
              ))}
              {gem.colors.length > 5 && (
                <Badge variant="outline">+{gem.colors.length - 5} more</Badge>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gem.overview}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Formation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Formation & Geology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gem.formation}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Properties */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Microscope className="h-5 w-5 text-primary" />
                    Key Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {gem.properties.map((property: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{property}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Historical Significance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Historical Significance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gem.historicalSignificance}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mythology */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Mythology & Beliefs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gem.mythology}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Physical Properties */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Physical Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-foreground">Crystal System:</span>
                    <p className="text-muted-foreground">{gem.crystalSystem}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Hardness:</span>
                    <p className="text-muted-foreground">{gem.hardness} (Mohs scale)</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Specific Gravity:</span>
                    <p className="text-muted-foreground">{gem.specificGravity}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-foreground">Refractive Index:</span>
                    <p className="text-muted-foreground">{gem.refractiveIndex}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Major Sources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Major Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {gem.locations.map((location: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{location}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Uses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Modern Uses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {gem.uses.map((use: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{use}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mineralogy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Mineralogy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{gem.mineralogy}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}