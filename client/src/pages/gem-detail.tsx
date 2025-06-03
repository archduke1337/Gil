import { useParams } from "wouter";
import { ArrowLeft, Gem, MapPin, Calendar, Sparkles, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/navigation";
import { Link } from "wouter";
import { gemIcons } from "@/components/gem-svg-icons";
import GemDimensionDiagram from "@/components/gem-dimension-diagram";
import { usePageTitle } from "@/hooks/use-page-title";

interface GemDetail {
  name: string;
  formula: string;
  crystalSystem: string;
  hardness: string;
  specificGravity: string;
  refractiveIndex: string;
  category: string;
  colors: string[];
  overview: string;
  formation: string;
  properties: string[];
  locations: string[];
  historicalSignificance: string;
  uses: string[];
  mythology: string;
  mineralogy: string;
}

const gemDetailData: { [key: string]: GemDetail } = {
  "1": {
    name: "Diamond",
    formula: "C (Pure carbon)",
    crystalSystem: "Cubic",
    hardness: "10",
    specificGravity: "3.52",
    refractiveIndex: "2.418",
    category: "Precious Stone",
    colors: ["Colorless", "Yellow", "Brown", "Blue", "Pink", "Green", "Black"],
    overview: "Diamond is the crystalline form of carbon and the hardest known natural material. Formed deep within the Earth under extreme pressure and temperature, diamonds have been prized for over 2,000 years for their exceptional brilliance and fire.",
    formation: "Diamonds form approximately 150-200 kilometers below the Earth's surface in the mantle, where carbon is subjected to intense pressure (45-60 kilobars) and high temperatures (900-1300°C). They are brought to the surface through volcanic eruptions in kimberlite pipes.",
    properties: [
      "Highest hardness (10 on Mohs scale)",
      "Exceptional brilliance and fire",
      "High thermal conductivity",
      "Chemical inertness",
      "Fluorescence under UV light (many specimens)"
    ],
    locations: [
      "Botswana",
      "Russia (Siberia)",
      "Canada (Northwest Territories)",
      "Australia",
      "Democratic Republic of Congo",
      "South Africa"
    ],
    historicalSignificance: "Diamonds were first discovered in India around 4th century BC. The name derives from the Greek 'adamas' meaning 'unbreakable.' They became symbols of invincibility and courage in ancient cultures.",
    uses: [
      "Engagement rings and fine jewelry",
      "Industrial cutting and drilling",
      "Scientific instruments",
      "Investment and collection",
      "April birthstone"
    ],
    mythology: "Ancient Indians believed diamonds were created by bolts of lightning or were the tears of the gods. Greeks thought they were fragments of stars fallen to earth. Diamonds symbolize eternal love, strength, and invincibility.",
    mineralogy: "Diamond consists of carbon atoms arranged in a cubic crystal structure. Each carbon atom is covalently bonded to four others in a tetrahedral arrangement, creating the hardest known natural material."
  },
  "2": {
    name: "Ruby",
    formula: "Al₂O₃ (Aluminum oxide with chromium)",
    crystalSystem: "Hexagonal",
    hardness: "9",
    specificGravity: "4.00",
    refractiveIndex: "1.762-1.770",
    category: "Precious Stone",
    colors: ["Red", "Pinkish red", "Purplish red", "Orangish red"],
    overview: "Ruby is the red variety of corundum, colored by chromium impurities. Along with sapphire, ruby is one of the hardest gemstones after diamond. The finest rubies display a pure red color called 'pigeon's blood.'",
    formation: "Rubies form in metamorphic environments where aluminum-rich rocks are subjected to high pressure and temperature. The presence of chromium during formation creates the characteristic red color.",
    properties: [
      "Exceptional hardness (9 on Mohs scale)",
      "Pleochroism (different reds from different angles)",
      "Strong fluorescence under UV light",
      "Asterism in some specimens (star rubies)",
      "Heat resistance"
    ],
    locations: [
      "Myanmar (Burma) - finest quality",
      "Thailand",
      "Sri Lanka",
      "Madagascar",
      "Mozambique",
      "Afghanistan"
    ],
    historicalSignificance: "Rubies have been treasured for over 2,000 years. Ancient Sanskrit called ruby 'ratnaraj' meaning 'king of gems.' Burmese warriors believed rubies made them invincible in battle.",
    uses: [
      "High-end jewelry and engagement rings",
      "Laser technology",
      "Watch bearings",
      "Investment gemstones",
      "July birthstone"
    ],
    mythology: "Ancient cultures believed rubies contained an inner fire that could never be extinguished. Hindu tradition held that rubies would help their owners live in peace with enemies. They symbolize passion, protection, and prosperity.",
    mineralogy: "Ruby is aluminum oxide (Al₂O₃) with trace amounts of chromium substituting for aluminum. The chromium creates the red color and also causes fluorescence under ultraviolet light."
  },
  "3": {
    name: "Emerald",
    formula: "Be₃Al₂Si₆O₁₈ (Beryl with chromium or vanadium)",
    crystalSystem: "Hexagonal",
    hardness: "7.5-8",
    specificGravity: "2.70-2.78",
    refractiveIndex: "1.576-1.582",
    category: "Precious Stone",
    colors: ["Green", "Bluish green", "Yellowish green"],
    overview: "Emerald is the green variety of beryl, colored by trace amounts of chromium or vanadium. Prized since ancient times, emeralds often contain inclusions called 'jardin' (French for garden) which are accepted as part of their character.",
    formation: "Emeralds form in hydrothermal veins where beryllium-bearing solutions interact with chromium or vanadium-rich rocks. This rare geological combination makes emeralds much rarer than diamonds.",
    properties: [
      "Vivid green coloration",
      "Brittle nature due to inclusions",
      "Oil treatment commonly accepted",
      "Pleochroism (blue-green to yellow-green)",
      "Lower hardness than other precious stones"
    ],
    locations: [
      "Colombia (finest quality)",
      "Zambia",
      "Brazil",
      "Ethiopia",
      "Afghanistan",
      "Russia (Ural Mountains)"
    ],
    historicalSignificance: "Emeralds were mined in Egypt as early as 1500 BC. Cleopatra was famous for her passion for emeralds. The Spanish conquistadors brought Colombian emeralds to Europe in the 16th century.",
    uses: [
      "High-end jewelry",
      "Investment and collecting",
      "Religious and ceremonial objects",
      "May birthstone",
      "Museum specimens"
    ],
    mythology: "Ancient Egyptians associated emeralds with fertility and rebirth. Romans dedicated emeralds to Venus, goddess of love. They were believed to improve eyesight and reveal truth from falsehood.",
    mineralogy: "Emerald is beryl (Be₃Al₂Si₆O₁₈) colored by chromium or vanadium impurities. The green color results from electronic transitions in these trace elements when they substitute for aluminum in the crystal structure."
  },
  "4": {
    name: "Sapphire",
    formula: "Al₂O₃ (Aluminum oxide with trace elements)",
    crystalSystem: "Hexagonal",
    hardness: "9",
    specificGravity: "4.00",
    refractiveIndex: "1.762-1.770",
    category: "Precious Stone",
    colors: ["Blue", "Pink", "Yellow", "White", "Orange", "Green", "Purple"],
    overview: "Sapphire is any non-red variety of corundum. Blue sapphire is the most famous, but sapphires occur in virtually every color except red (which is ruby). The most prized blue sapphires show a velvety blue color.",
    formation: "Sapphires form in igneous and metamorphic rocks under high temperature and pressure conditions. Different trace elements create the various colors - iron and titanium for blue, chromium for pink.",
    properties: [
      "Exceptional hardness (9 on Mohs scale)",
      "Excellent brilliance and fire",
      "Pleochroism in many varieties",
      "Star effect in some specimens",
      "Heat treatment commonly used"
    ],
    locations: [
      "Kashmir (legendary cornflower blue)",
      "Myanmar (Burma)",
      "Sri Lanka (many colors)",
      "Madagascar",
      "Australia",
      "Thailand"
    ],
    historicalSignificance: "Sapphires have been prized since ancient times. The name comes from Greek 'sappheiros.' Medieval clergy wore blue sapphires to symbolize heaven. They've adorned royal crowns for centuries.",
    uses: [
      "Engagement rings and fine jewelry",
      "Watch crystals and industrial applications",
      "Laser components",
      "September birthstone",
      "Investment gemstones"
    ],
    mythology: "Ancient Persians believed the Earth rested on a giant sapphire, whose reflection colored the sky blue. They symbolize wisdom, virtue, and divine favor. Sapphires were thought to protect against envy and harm.",
    mineralogy: "Sapphire is aluminum oxide (Al₂O₃) with various trace elements. Iron and titanium create blue colors, while chromium produces pink. The crystal structure is the same as ruby, differing only in trace element content."
  },
  "5": {
    name: "Tanzanite",
    formula: "Ca₂Al₃(SiO₄)₃(OH) (Calcium aluminum silicate hydroxide)",
    crystalSystem: "Orthorhombic",
    hardness: "6.5-7",
    specificGravity: "3.35",
    refractiveIndex: "1.691-1.700",
    category: "Semi-Precious",
    colors: ["Blue", "Violet", "Purple", "Burgundy"],
    overview: "Tanzanite is the blue and violet variety of the mineral zoisite, discovered in 1967 near Mount Kilimanjaro in Tanzania. It's found only in a small area of Tanzania, making it rarer than diamond.",
    formation: "Tanzanite formed about 585 million years ago during the Mid-Ediacaran period through massive tectonic activity and intense heat in the area that would later become Mount Kilimanjaro.",
    properties: [
      "Strong trichroism (three different colors)",
      "Heat treatment enhances blue color",
      "Relatively soft for a gemstone",
      "Excellent clarity in fine specimens",
      "Single geographical source"
    ],
    locations: [
      "Merelani Hills, Tanzania (only known source)",
      "Near Mount Kilimanjaro",
      "Manyara Region, Tanzania"
    ],
    historicalSignificance: "Discovered in 1967 by Maasai tribesman Ali Juuyawatu, tanzanite was initially thought to be sapphire. Tiffany & Co. named it 'tanzanite' after Tanzania and became its main promoter.",
    uses: [
      "Fine jewelry and engagement rings",
      "Investment gemstones",
      "Collector specimens",
      "Ceremonial jewelry",
      "December birthstone"
    ],
    mythology: "The Maasai believe tanzanite brings insight and new perspectives. It's considered a stone of transformation, helping to overcome old patterns and embrace positive change.",
    mineralogy: "Tanzanite is the blue variety of zoisite, a calcium aluminum silicate. The blue color is caused by small amounts of vanadium. Most tanzanite is heat-treated to enhance the blue color and remove brown tints."
  },
  "6": {
    name: "Garnet",
    formula: "X₃Y₂(SiO₄)₃ (Complex silicate group)",
    crystalSystem: "Cubic",
    hardness: "6.5-7.5",
    specificGravity: "3.5-4.3",
    refractiveIndex: "1.714-1.888",
    category: "Semi-Precious",
    colors: ["Red", "Orange", "Yellow", "Green", "Purple", "Pink", "Brown"],
    overview: "Garnet is a group of silicate minerals that have been used as gemstones and abrasives since the Bronze Age. The name comes from the Latin 'granatum' meaning pomegranate, referring to the red crystals' resemblance to pomegranate seeds.",
    formation: "Garnets form in metamorphic rocks through regional or contact metamorphism. They also occur in igneous rocks and alluvial deposits. Different garnet species form under different pressure and temperature conditions.",
    properties: [
      "High refractive index and brilliance",
      "No cleavage (excellent durability)",
      "Wide range of colors and species",
      "Isotropic optical properties",
      "Chemical resistance"
    ],
    locations: [
      "India (traditional source)",
      "Sri Lanka",
      "Africa (Kenya, Tanzania, Madagascar)",
      "United States (Montana, Idaho)",
      "Czech Republic (pyrope garnets)"
    ],
    historicalSignificance: "Garnets have been used since the Bronze Age, with Egyptian pharaohs wearing garnet necklaces. Medieval and Renaissance jewelry prominently featured garnets, and they were popular in Victorian jewelry.",
    uses: [
      "Jewelry in all price ranges",
      "Industrial abrasives",
      "Water filtration",
      "Sandblasting media",
      "Gemstone collecting"
    ],
    mythology: "Ancient warriors believed garnets would protect them in battle. Christians associated red garnets with Christ's sacrifice. Garnets symbolize friendship, loyalty, and passionate devotion.",
    mineralogy: "Garnet represents a group of minerals with the same crystal structure but different chemical compositions. Main species include almandine, pyrope, spessartine, grossular, andradite, and uvarovite."
  },
  "7": {
    name: "Amethyst",
    formula: "SiO₂ (Silicon dioxide with iron impurities)",
    crystalSystem: "Hexagonal",
    hardness: "7",
    specificGravity: "2.65",
    refractiveIndex: "1.544-1.553",
    category: "Semi-Precious",
    colors: ["Light purple", "Deep purple", "Lavender", "Violet"],
    overview: "Amethyst is the purple variety of quartz and the most valued member of the quartz family. The purple color ranges from pale lavender to deep violet and is caused by iron impurities and aluminum in the crystal structure.",
    formation: "Amethyst forms in igneous, metamorphic, and sedimentary rocks. It typically crystallizes in geodes and cavities of volcanic rocks, where silica-rich solutions deposit quartz crystals over time.",
    properties: [
      "Distinctive purple coloration",
      "Excellent hardness for jewelry",
      "Piezoelectric properties",
      "Color can fade with heat or sunlight",
      "Often found in large, clear crystals"
    ],
    locations: [
      "Brazil (largest producer)",
      "Uruguay (finest quality)",
      "Zambia",
      "Russia (Siberian amethyst)",
      "South Korea",
      "United States (Arizona, North Carolina)"
    ],
    historicalSignificance: "Amethyst has been prized since ancient times. The Greeks believed it could prevent intoxication and named it 'amethystos' meaning 'not drunk.' It was considered as valuable as diamond until large deposits were found in Brazil.",
    uses: [
      "Jewelry from affordable to luxury",
      "Decorative objects and carvings",
      "Meditation and healing practices",
      "Collector specimens",
      "February birthstone"
    ],
    mythology: "Ancient Greeks and Romans believed amethyst could ward off drunkenness. Christian tradition associated amethyst with spiritual wisdom and sobriety. It symbolizes peace, protection, and inner strength.",
    mineralogy: "Amethyst is macrocrystalline quartz (SiO₂) colored by iron impurities. The iron can be in either Fe³⁺ or Fe⁴⁺ state, and aluminum substitution in the lattice helps stabilize the color centers that produce the purple hue."
  },
  "8": {
    name: "Aquamarine",
    formula: "Be₃Al₂Si₆O₁₈ (Beryl with iron impurities)",
    crystalSystem: "Hexagonal",
    hardness: "7.5-8",
    specificGravity: "2.68-2.74",
    refractiveIndex: "1.577-1.583",
    category: "Semi-Precious",
    colors: ["Light blue", "Blue-green", "Deep blue", "Sea blue"],
    overview: "Aquamarine is the blue to blue-green variety of beryl, colored by iron impurities. The name comes from Latin 'aqua marina' meaning 'water of the sea,' referring to its ocean-like blue color.",
    formation: "Aquamarine forms in granite pegmatites and metamorphic rocks. It crystallizes from beryllium-rich solutions in cavities and fractures of igneous rocks, often alongside other beryl varieties and rare minerals.",
    properties: [
      "Excellent clarity and transparency",
      "Pleochroism (different colors from different angles)",
      "Heat treatment enhances blue color",
      "Large crystals possible",
      "Excellent durability for jewelry"
    ],
    locations: [
      "Brazil (major producer)",
      "Madagascar",
      "Nigeria",
      "Pakistan",
      "Russia (Siberia)",
      "United States (Colorado, Maine)"
    ],
    historicalSignificance: "Ancient mariners believed aquamarine would protect them at sea and guarantee safe voyage. Roman fishermen called it 'water of the sea' and used it to protect against sea monsters.",
    uses: [
      "Fine jewelry and engagement rings",
      "Large decorative carvings",
      "Investment gemstones",
      "March birthstone",
      "Collector specimens"
    ],
    mythology: "Romans believed aquamarine would protect sailors and guarantee safe passage across stormy seas. It was thought to be the treasure of mermaids and would bring love and happiness to marriage.",
    mineralogy: "Aquamarine is iron-bearing beryl (Be₃Al₂Si₆O₁₈). The blue color comes from Fe²⁺ ions, while Fe³⁺ ions can cause yellow tints. Heat treatment can remove yellow components to enhance pure blue color."
  },
  "9": {
    name: "Topaz",
    formula: "Al₂SiO₄(F,OH)₂ (Aluminum silicate fluoride hydroxide)",
    crystalSystem: "Orthorhombic",
    hardness: "8",
    specificGravity: "3.53",
    refractiveIndex: "1.609-1.643",
    category: "Semi-Precious",
    colors: ["Blue", "Pink", "Yellow", "Orange", "Colorless", "Brown", "Red"],
    overview: "Topaz is a fluorine aluminum silicate mineral occurring in many colors. Imperial topaz (orange to pink) is the most valuable variety, while blue topaz is popular in jewelry and often enhanced through treatment.",
    formation: "Topaz forms in igneous rocks, particularly granite pegmatites and rhyolites. It crystallizes from fluorine-rich solutions at high temperatures and can also form in hydrothermal veins and cavities.",
    properties: [
      "Perfect cleavage in one direction",
      "High hardness (8 on Mohs scale)",
      "Excellent brilliance and fire",
      "Color enhancement through treatment",
      "Pleochroism in some varieties"
    ],
    locations: [
      "Brazil (major source of all varieties)",
      "Pakistan (pink topaz)",
      "Russia (imperial topaz)",
      "Nigeria",
      "Sri Lanka",
      "United States (Utah, Texas)"
    ],
    historicalSignificance: "The name 'topaz' may derive from the Sanskrit 'tapas' meaning fire, or from Topazios, an island in the Red Sea. Ancient Egyptians believed yellow topaz was colored by the sun god Ra.",
    uses: [
      "Jewelry in all varieties",
      "Investment gemstones (imperial topaz)",
      "Industrial applications",
      "November birthstone",
      "Collector specimens"
    ],
    mythology: "Ancient Greeks believed topaz could make the wearer invisible in emergencies. It was thought to dispel sadness, anger, and negative emotions, bringing joy and generosity to the wearer.",
    mineralogy: "Topaz is an aluminum silicate with fluorine and hydroxyl. The various colors result from defects in the crystal structure or trace element impurities. Irradiation can enhance blue colors in colorless topaz."
  },
  "10": {
    name: "Opal",
    formula: "SiO₂·nH₂O (Hydrated silicon dioxide)",
    crystalSystem: "Amorphous",
    hardness: "5.5-6.5",
    specificGravity: "1.9-2.3",
    refractiveIndex: "1.37-1.47",
    category: "Semi-Precious",
    colors: ["White", "Black", "Crystal", "Boulder", "Fire", "Water"],
    overview: "Opal is a hydrated amorphous form of silica known for its unique play-of-color caused by the diffraction of light through microscopic silica spheres. It contains 3-21% water content.",
    formation: "Opal forms from silica-rich solutions that seep through sedimentary rocks and volcanic deposits. Over time, the silica precipitates and hardens, trapping water molecules within the structure.",
    properties: [
      "Play-of-color (iridescence)",
      "Amorphous structure (no crystal form)",
      "Contains 3-21% water",
      "Relatively soft and fragile",
      "Sensitive to temperature changes"
    ],
    locations: [
      "Australia (90% of world's opal)",
      "Ethiopia (hydrophane opals)",
      "Mexico (fire opals)",
      "Brazil",
      "United States (Nevada, Idaho)",
      "Peru"
    ],
    historicalSignificance: "Romans prized opal above all gems, believing it contained the virtues of all gemstones due to its play-of-color. The name comes from Sanskrit 'upala' meaning precious stone.",
    uses: [
      "Jewelry (with careful setting)",
      "Decorative objects",
      "Collector specimens",
      "October birthstone",
      "Investment pieces (black opals)"
    ],
    mythology: "Aboriginal Australians believe opal was created when the rainbow touched the earth. Ancient Romans thought opals brought good luck and represented hope and purity.",
    mineralogy: "Opal is amorphous hydrated silica composed of submicroscopic spheres of cristobalite. The play-of-color results from light diffraction through regularly arranged spheres of uniform size."
  },
  "11": {
    name: "Citrine",
    formula: "SiO₂ (Silicon dioxide with iron impurities)",
    crystalSystem: "Hexagonal",
    hardness: "7",
    specificGravity: "2.65",
    refractiveIndex: "1.544-1.553",
    category: "Semi-Precious",
    colors: ["Pale yellow", "Golden yellow", "Orange", "Brownish yellow"],
    overview: "Citrine is the yellow to brownish orange variety of quartz, colored by iron impurities. Most commercial citrine is actually heat-treated amethyst or smoky quartz, as natural citrine is relatively rare.",
    formation: "Natural citrine forms in igneous and metamorphic rocks where aluminum in the quartz structure is replaced by iron, creating color centers. It can also form through natural heating of amethyst deposits.",
    properties: [
      "Yellow to orange coloration",
      "Excellent hardness for jewelry",
      "Heat treatment commonly used",
      "Piezoelectric properties",
      "Generally good clarity"
    ],
    locations: [
      "Brazil (major source)",
      "Madagascar",
      "Russia (Ural Mountains)",
      "Kazakhstan",
      "United States (Colorado, North Carolina)",
      "Spain"
    ],
    historicalSignificance: "Citrine has been used as a decorative gem for thousands of years. It was popular in ancient Greece and Rome, and experienced a resurgence during the Art Deco period in the early 20th century.",
    uses: [
      "Affordable jewelry",
      "Large decorative pieces",
      "November birthstone",
      "Collector specimens",
      "Metaphysical practices"
    ],
    mythology: "Ancient cultures believed citrine could ward off evil thoughts and snake venom. It's known as the 'merchant's stone' and is thought to bring prosperity and success in business.",
    mineralogy: "Citrine is macrocrystalline quartz (SiO₂) colored by iron impurities. The iron forms color centers in the crystal lattice, producing yellow to brown colors. Natural citrine is much rarer than heat-treated varieties."
  },
  "12": {
    name: "Kunzite",
    formula: "LiAlSi₂O₆ (Lithium aluminum silicate)",
    crystalSystem: "Monoclinic",
    hardness: "6.5-7",
    specificGravity: "3.18",
    refractiveIndex: "1.660-1.676",
    category: "Semi-Precious",
    colors: ["Pink", "Lilac", "Violet", "Green (hiddenite)", "Yellow"],
    overview: "Kunzite is the pink to lilac variety of spodumene, a lithium aluminum silicate. Named after gemologist George Frederick Kunz, it shows strong pleochroism and can fade with prolonged exposure to light.",
    formation: "Kunzite forms in lithium-rich granite pegmatites alongside other lithium minerals. The pink color comes from manganese impurities in the spodumene crystal structure.",
    properties: [
      "Strong pleochroism (different colors from different angles)",
      "Perfect cleavage in two directions",
      "Photosensitive (can fade in sunlight)",
      "Strong fluorescence under UV light",
      "Evening stone (best viewed in incandescent light)"
    ],
    locations: [
      "Afghanistan (finest quality)",
      "Brazil",
      "Madagascar",
      "Pakistan",
      "United States (California, Maine)",
      "Nigeria"
    ],
    historicalSignificance: "Discovered in 1902 in California and named after Tiffany's chief gemologist George Frederick Kunz. It gained popularity in the early 20th century but remains relatively unknown to the general public.",
    uses: [
      "Evening jewelry",
      "Collector specimens",
      "Meditation and healing practices",
      "Designer jewelry",
      "Museum displays"
    ],
    mythology: "Kunzite is considered a stone of divine love and emotional healing. It's believed to help heal heartbreak, reduce anxiety, and promote emotional balance and self-love.",
    mineralogy: "Kunzite is the pink variety of spodumene (LiAlSi₂O₆), colored by trace amounts of manganese. The perfect cleavage makes it challenging to cut, and the photosensitive nature requires careful handling."
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
  "14": {
    name: "Jade",
    formula: "NaAlSi₂O₆ (Jadeite) or Ca₂(Mg,Fe)₅Si₈O₂₂(OH)₂ (Nephrite)",
    crystalSystem: "Monoclinic",
    hardness: "6-7",
    specificGravity: "3.25-3.35",
    refractiveIndex: "1.654-1.688",
    category: "Semi-Precious",
    colors: ["Green", "White", "Lavender", "Yellow", "Black", "Red", "Orange"],
    overview: "Jade refers to two different minerals: jadeite and nephrite. Both are extremely tough stones prized for thousands of years, especially in Asian cultures, for their beauty and cultural significance.",
    formation: "Jadeite forms under high-pressure, low-temperature metamorphic conditions, while nephrite forms through contact or regional metamorphism of magnesium-rich rocks.",
    properties: [
      "Exceptional toughness (resistance to breaking)",
      "Waxy to vitreous luster",
      "Fine-grained aggregate structure",
      "Cultural and spiritual significance",
      "Carving suitability"
    ],
    locations: [
      "Myanmar (finest jadeite)",
      "Guatemala (jadeite)",
      "Russia (nephrite)",
      "New Zealand (nephrite)",
      "Canada (nephrite)",
      "China (both varieties)"
    ],
    historicalSignificance: "Jade has been prized in China for over 7,000 years, considered more valuable than gold. Mesoamerican cultures also revered jade, using it for ceremonial objects and jewelry.",
    uses: [
      "Fine jewelry and ornaments",
      "Ceremonial and religious objects",
      "Sculptures and carvings",
      "Investment pieces",
      "Cultural artifacts"
    ],
    mythology: "Chinese culture associates jade with virtue, wisdom, and immortality. Mayans and Aztecs believed jade connected the physical and spiritual worlds. It symbolizes purity and serenity.",
    mineralogy: "Jade comprises two distinct minerals: jadeite (sodium aluminum silicate) and nephrite (calcium magnesium iron silicate). Both form dense, interlocking crystals creating exceptional toughness."
  },
  "15": {
    name: "Labradorite",
    formula: "NaAlSi₃O₈ to CaAl₂Si₂O₈ (Plagioclase feldspar)",
    crystalSystem: "Triclinic",
    hardness: "6-6.5",
    specificGravity: "2.68-2.72",
    refractiveIndex: "1.559-1.568",
    category: "Semi-Precious",
    colors: ["Gray", "Blue", "Green", "Yellow", "Orange", "Spectrolite"],
    overview: "Labradorite is a plagioclase feldspar known for its remarkable play of color called labradorescence. This optical phenomenon displays brilliant flashes of blue, green, yellow, orange, and sometimes red.",
    formation: "Labradorite forms in mafic igneous rocks such as basalt, gabbro, and anorthosite. It crystallizes during the slow cooling of magma, allowing the distinctive layered structure to develop.",
    properties: [
      "Labradorescence (color play)",
      "Perfect cleavage in two directions",
      "Twinning common",
      "Temperature sensitive",
      "Optical phenomenon varies by specimen"
    ],
    locations: [
      "Labrador, Canada (original source)",
      "Finland (spectrolite variety)",
      "Madagascar",
      "Russia",
      "Australia",
      "United States (Oregon)"
    ],
    historicalSignificance: "Discovered in Labrador, Canada in 1770, labradorite was initially confused with other feldspars. Inuit legends say the Northern Lights were trapped in the rocks along the coast of Labrador.",
    uses: [
      "Jewelry and cabochons",
      "Decorative objects",
      "Collector specimens",
      "Architectural applications",
      "Metaphysical practices"
    ],
    mythology: "Inuit legend tells that labradorite fell from the frozen fire of the Aurora Borealis. It's believed to be a stone of transformation, enhancing intuition and protecting the aura.",
    mineralogy: "Labradorite is a plagioclase feldspar with composition between albite and anorthite. The labradorescence results from light interference between microscopic layers of different feldspar compositions."
  },
  "16": {
    name: "Peridot",
    formula: "(Mg,Fe)₂SiO₄ (Magnesium iron silicate)",
    crystalSystem: "Orthorhombic",
    hardness: "6.5-7",
    specificGravity: "3.34",
    refractiveIndex: "1.654-1.690",
    category: "Semi-Precious",
    colors: ["Yellowish green", "Olive green", "Brownish green"],
    overview: "Peridot is the gem variety of olivine, one of the few gemstones that occurs in only one color. It's found in meteorites, volcanic rocks, and the Earth's mantle, making it literally 'out of this world.'",
    formation: "Peridot forms deep in the Earth's mantle and is brought to the surface through volcanic activity. It also occurs in meteorites and has been found on the Moon and Mars.",
    properties: [
      "Single color variety (always green)",
      "High birefringence (double images)",
      "Oily to vitreous luster",
      "Sensitive to acids",
      "Extraterrestrial occurrence"
    ],
    locations: [
      "Arizona, USA (Apache reservation)",
      "Pakistan (Kashmir region)",
      "Myanmar",
      "China",
      "Norway",
      "Meteorites (pallasites)"
    ],
    historicalSignificance: "Ancient Egyptians called peridot 'the gem of the sun' and mined it on Zabargad Island in the Red Sea. Crusaders brought peridot to medieval Europe, often mistaking it for emerald.",
    uses: [
      "Jewelry (with careful setting)",
      "August birthstone",
      "Collector specimens",
      "Religious and ceremonial objects",
      "Scientific study of extraterrestrial samples"
    ],
    mythology: "Ancient Hawaiians believed peridot was the tears of Pele, the volcano goddess. It was thought to dispel fears and protect against evil spirits and nightmares.",
    mineralogy: "Peridot is gem-quality olivine, a magnesium iron silicate with the formula (Mg,Fe)₂SiO₄. The iron content determines the depth of green color, with more iron producing darker green stones."
  },
  "17": {
    name: "Moonstone",
    formula: "KAlSi₃O₈ or NaAlSi₃O₈ (Feldspar group)",
    crystalSystem: "Triclinic",
    hardness: "6-6.5",
    specificGravity: "2.57",
    refractiveIndex: "1.518-1.526",
    category: "Semi-Precious",
    colors: ["White", "Gray", "Peach", "Green", "Blue", "Rainbow"],
    overview: "Moonstone is a variety of feldspar showing adularescence - a billowy, moonlight-like sheen. The optical phenomenon is caused by light scattering between microscopic layers of different feldspar minerals.",
    formation: "Moonstone forms when two feldspar minerals (orthoclase and albite) grow together and then separate into stacked layers during cooling. This creates the internal structure that produces adularescence.",
    properties: [
      "Adularescence (moonlight effect)",
      "Perfect cleavage in two directions",
      "Chatoyancy in some specimens",
      "Temperature sensitive",
      "Relatively soft for a gemstone"
    ],
    locations: [
      "Sri Lanka (finest blue moonstone)",
      "India (rainbow moonstone)",
      "Myanmar",
      "Madagascar",
      "United States (Virginia, Pennsylvania)",
      "Australia"
    ],
    historicalSignificance: "Moonstone has been used in jewelry for over 2,000 years. Ancient Romans believed it was formed from moonbeams. It was popular during the Art Nouveau period and is India's national gemstone.",
    uses: [
      "Jewelry (especially cabochons)",
      "June birthstone",
      "Decorative objects",
      "Collector specimens",
      "Metaphysical practices"
    ],
    mythology: "Hindu mythology says moonstone is made from moonbeams. Romans and Greeks associated it with lunar deities. It's believed to bring love, enhance intuition, and provide protection during travel.",
    mineralogy: "Moonstone is composed of microscopic intergrowths of orthoclase and albite feldspars. Light entering the stone scatters off these layers, creating the adularescent effect characteristic of moonstone."
  },
  "18": {
    name: "Lapis Lazuli",
    formula: "(Na,Ca)₈(AlSiO₄)₆(S,SO₄,Cl)₁₋₂ (Lazurite with other minerals)",
    crystalSystem: "Cubic",
    hardness: "5-5.5",
    specificGravity: "2.7-2.9",
    refractiveIndex: "1.50",
    category: "Semi-Precious",
    colors: ["Deep blue", "Royal blue", "Blue with gold flecks"],
    overview: "Lapis lazuli is a metamorphic rock composed primarily of the mineral lazurite, along with calcite, pyrite, and other minerals. It has been prized since antiquity for its intense blue color and golden pyrite flecks.",
    formation: "Lapis lazuli forms through contact metamorphism of limestone containing sulfur compounds. The intense blue color comes from sulfur in the lazurite crystal structure.",
    properties: [
      "Intense blue color from lazurite",
      "Golden pyrite inclusions",
      "Relatively soft and porous",
      "Rock rather than single mineral",
      "Historical and cultural significance"
    ],
    locations: [
      "Afghanistan (Badakhshan - finest quality)",
      "Chile (Andes Mountains)",
      "Russia (Lake Baikal region)",
      "Pakistan",
      "United States (Colorado)",
      "Argentina"
    ],
    historicalSignificance: "Lapis lazuli has been mined in Afghanistan for over 6,000 years. Ancient Egyptians used it for jewelry, amulets, and ground it into ultramarine pigment. It adorned Tutankhamun's burial mask.",
    uses: [
      "Jewelry and ornamental objects",
      "Sculptures and carvings",
      "Pigment production (ultramarine)",
      "Decorative inlays",
      "Collector specimens"
    ],
    mythology: "Ancient Egyptians believed lapis lazuli was sacred and connected to the heavens. Mesopotamians associated it with royalty and the gods. It symbolizes truth, wisdom, and royal power.",
    mineralogy: "Lapis lazuli is primarily composed of lazurite ((Na,Ca)₈(AlSiO₄)₆(S,SO₄,Cl)₁₋₂), a sodium calcium aluminum silicate containing sulfur. Pyrite provides golden flecks, while calcite can create white streaks."
  },
  "19": {
    name: "Turquoise",
    formula: "CuAl₆(PO₄)₄(OH)₈·4H₂O (Hydrated copper aluminum phosphate)",
    crystalSystem: "Triclinic",
    hardness: "5-6",
    specificGravity: "2.6-2.8",
    refractiveIndex: "1.61-1.65",
    category: "Semi-Precious",
    colors: ["Sky blue", "Blue-green", "Green", "Blue with matrix"],
    overview: "Turquoise is a hydrated phosphate mineral known for its distinctive blue-green color. It's one of the oldest known gemstones, prized by ancient civilizations for its beautiful color and rarity.",
    formation: "Turquoise forms through the weathering and oxidation of copper-bearing rocks in arid climates. Groundwater carrying copper and phosphorus deposits the mineral in veins and nodules.",
    properties: [
      "Distinctive blue-green color from copper",
      "Waxy to sub-vitreous luster",
      "Often with host rock matrix",
      "Porous and often treated",
      "Sensitive to heat and oils"
    ],
    locations: [
      "Iran (Nishapur - finest quality)",
      "United States (Arizona, Nevada, New Mexico)",
      "China",
      "Egypt (Sinai Peninsula)",
      "Mexico",
      "Chile"
    ],
    historicalSignificance: "Turquoise has been mined for over 6,000 years. Ancient Egyptians used it in jewelry and amulets. Native Americans have long considered it sacred, and it was traded throughout pre-Columbian America.",
    uses: [
      "Jewelry and ornamental objects",
      "December birthstone",
      "Native American ceremonial items",
      "Collector specimens",
      "Decorative inlays"
    ],
    mythology: "Native Americans believe turquoise connects earth and sky, bringing protection and healing. Ancient Persians thought the earth was supported by a giant turquoise, which reflected its blue color into the sky.",
    mineralogy: "Turquoise is a hydrated copper aluminum phosphate with the formula CuAl₆(PO₄)₄(OH)₈·4H₂O. The blue-green color comes from copper, while iron can shift the color toward green."
  },
  "20": {
    name: "Morganite",
    formula: "Be₃Al₂Si₆O₁₈ (Beryl with manganese)",
    crystalSystem: "Hexagonal",
    hardness: "7.5-8",
    specificGravity: "2.80",
    refractiveIndex: "1.577-1.583",
    category: "Semi-Precious",
    colors: ["Pink", "Peach", "Rose", "Salmon"],
    overview: "Morganite is the pink to peach variety of beryl, colored by manganese impurities. Named after financier J.P. Morgan, it's prized for its delicate pastel colors and excellent clarity.",
    formation: "Morganite forms in granite pegmatites alongside other beryl varieties. The pink color develops from manganese substituting for aluminum in the beryl crystal structure.",
    properties: [
      "Delicate pink to peach colors",
      "Excellent clarity in fine specimens",
      "Good hardness for jewelry",
      "Often found in large crystals",
      "Heat treatment can enhance color"
    ],
    locations: [
      "Brazil (major producer)",
      "Madagascar",
      "Afghanistan",
      "Pakistan",
      "United States (California, Maine)",
      "Namibia"
    ],
    historicalSignificance: "Discovered in 1910 in Madagascar, morganite was named by gemologist George Kunz after his patron J.P. Morgan. It gained popularity during the early 20th century Art Deco period.",
    uses: [
      "Fine jewelry and engagement rings",
      "Large decorative gemstones",
      "Collector specimens",
      "Investment pieces",
      "Designer jewelry"
    ],
    mythology: "Morganite is associated with divine love and emotional healing. It's believed to attract love, maintain love, and encourage loving thoughts and actions.",
    mineralogy: "Morganite is beryl (Be₃Al₂Si₆O₁₈) colored by manganese impurities. The pink color can range from very pale to deep rose, depending on the manganese content. Some morganite may fade with prolonged sunlight exposure."
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
  },
  "23": {
    name: "Iolite",
    formula: "(Mg,Fe)₂Al₄Si₅O₁₈ (Magnesium iron aluminum silicate)",
    crystalSystem: "Orthorhombic",
    hardness: "7-7.5",
    specificGravity: "2.61",
    refractiveIndex: "1.542-1.551",
    category: "Semi-Precious",
    colors: ["Violet-blue", "Blue", "Yellow", "Colorless"],
    overview: "Iolite, also known as cordierite, shows strong pleochroism displaying violet-blue, yellow, and colorless depending on the viewing angle. Vikings may have used thin slices as polarizing filters to navigate in cloudy weather.",
    formation: "Iolite forms through regional metamorphism of aluminum-rich sedimentary rocks. It typically occurs in gneiss, schist, and hornfels, often associated with other metamorphic minerals.",
    properties: [
      "Strong pleochroism (trichroism)",
      "Natural polarizing properties",
      "Good hardness for jewelry",
      "Often included with hematite",
      "Sensitive to thermal shock"
    ],
    locations: [
      "India (major source)",
      "Sri Lanka",
      "Myanmar",
      "Brazil",
      "Madagascar",
      "Norway"
    ],
    historicalSignificance: "Legend suggests Vikings used iolite as a navigation aid, calling it 'water sapphire.' The name iolite comes from the Greek 'ios' meaning violet. It was relatively unknown until the 18th century.",
    uses: [
      "Jewelry (must be oriented properly)",
      "Collector specimens",
      "Navigation aid (historical)",
      "Industrial applications",
      "Metaphysical practices"
    ],
    mythology: "Vikings believed iolite could show the sun's position even on cloudy days. It's associated with inner vision, spiritual insight, and the ability to see beyond the obvious.",
    mineralogy: "Iolite is the gem variety of cordierite, a magnesium iron aluminum silicate. The pleochroism results from the crystal structure and the way light interacts with iron in different orientations."
  },
  "24": {
    name: "Andalusite",
    formula: "Al₂SiO₅ (Aluminum silicate)",
    crystalSystem: "Orthorhombic",
    hardness: "7.5",
    specificGravity: "3.18",
    refractiveIndex: "1.629-1.650",
    category: "Semi-Precious",
    colors: ["Brown", "Green", "Yellow", "Pink", "Red", "Gray"],
    overview: "Andalusite is an aluminum silicate mineral that shows strong pleochroism, displaying different colors from different viewing angles. The variety chiastolite shows distinctive cross-shaped inclusions.",
    formation: "Andalusite forms through regional or contact metamorphism of aluminum-rich rocks at moderate pressures and temperatures. It's an indicator mineral for specific metamorphic conditions.",
    properties: [
      "Strong pleochroism",
      "Good hardness for jewelry",
      "Vitreous luster",
      "Cross-shaped inclusions (chiastolite variety)",
      "Metamorphic indicator mineral"
    ],
    locations: [
      "Brazil",
      "Sri Lanka",
      "Spain",
      "Australia",
      "United States (California, Massachusetts)",
      "Canada"
    ],
    historicalSignificance: "Named after the Spanish province of Andalusia where it was first discovered. Chiastolite (cross stone) has been used as a talisman and was particularly valued in Christian traditions.",
    uses: [
      "Jewelry and collector specimens",
      "Industrial refractory materials",
      "High-temperature ceramics",
      "Metamorphic studies",
      "Religious and protective amulets"
    ],
    mythology: "Chiastolite (cross stone) was considered a protective stone by early Christians. It was believed to ward off evil and bring good fortune. The cross pattern was seen as a divine sign.",
    mineralogy: "Andalusite is an aluminum silicate polymorphic with sillimanite and kyanite. The chiastolite variety contains carbonaceous inclusions arranged in a cross pattern due to crystal growth patterns."
  }
};

export default function GemDetail() {
  const { id } = useParams();
  
  if (!id || !gemDetailData[id]) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Gemstone Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested gemstone information could not be found.</p>
            <Link href="/gem-encyclopedia">
              <Button>Return to Encyclopedia</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const gem = gemDetailData[id];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <Navigation />
      
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-b from-primary/15 to-primary/5 text-foreground py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/gem-encyclopedia">
            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Encyclopedia
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <motion.div 
              className="w-24 h-24 bg-primary/20 rounded-xl flex items-center justify-center p-3"
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
            >
              {gemIcons[id] ? (
                <div className="w-full h-full">
                  {gemIcons[id]({ className: "w-full h-full" })}
                </div>
              ) : (
                <Gem className="w-12 h-12 text-primary" />
              )}
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{gem.name}</h1>
              <Badge variant="secondary" className="text-sm">{gem.category}</Badge>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl">
            {gem.overview}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Formation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-primary" />
                    Key Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {gem.properties.map((property, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{property}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Global Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2">
                    {gem.locations.map((location, index) => (
                      <div key={index} className="flex items-center p-2 bg-muted/50 rounded-lg">
                        <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{location}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Historical Significance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    Mythology & Beliefs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gem.mythology}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3D Dimension Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gem className="w-5 h-5 mr-2 text-primary" />
                    Cut Dimensions & Proportions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <GemDimensionDiagram gemType={gem.name} className="w-full" />
                  </div>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Professional Grading Standards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Clarity Scale:</span>
                        <p>FL → IF → VVS1 → VVS2 → VS1 → VS2 → SI1 → SI2 → SI3 → I1 → I2 → I3</p>
                      </div>
                      <div>
                        <span className="font-medium">Cut Quality:</span>
                        <p>Excellent → Very Good → Good → Fair → Poor</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mineralogy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Scientific Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{gem.mineralogy}</p>
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
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Physical Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-foreground">Chemical Formula:</span>
                    <p className="text-sm text-muted-foreground font-mono">{gem.formula}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Crystal System:</span>
                    <p className="text-sm text-muted-foreground">{gem.crystalSystem}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Hardness:</span>
                    <p className="text-sm text-muted-foreground">{gem.hardness} (Mohs scale)</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Specific Gravity:</span>
                    <p className="text-sm text-muted-foreground">{gem.specificGravity}</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Refractive Index:</span>
                    <p className="text-sm text-muted-foreground">{gem.refractiveIndex}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gemological Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Gemological Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-foreground">Clarity Grades:</span>
                    <p className="text-sm text-muted-foreground">FL, IF, VVS1-VVS2, VS1-VS2, SI1-SI3, I1-I3</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Cut Proportions:</span>
                    <div className="text-sm text-muted-foreground">
                      <p>Table: 53-64% • Depth: 58-64%</p>
                      <p>Crown: 14-16% • Pavilion: 42-44%</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Optical Properties:</span>
                    <div className="text-sm text-muted-foreground">
                      <p>Brilliance: Exceptional</p>
                      <p>Fire: High • Scintillation: Excellent</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm font-medium text-foreground">Cut Quality Grades:</span>
                    <p className="text-sm text-muted-foreground">Excellent, Very Good, Good, Fair, Poor</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Colors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Color Varieties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {gem.colors.map((color, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Uses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle>Modern Uses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {gem.uses.map((use, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{use}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}