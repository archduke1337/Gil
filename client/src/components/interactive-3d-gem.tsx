import { useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut, Eye, Info, Lightbulb, Search, Settings, Microscope, Ruler, Award, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOptimizedAnimationConfig, isTouchDevice } from "@/utils/performance";

interface Interactive3DGemProps {
  gemType: string;
  className?: string;
}

interface GemAnalysisData {
  name: string;
  clarity: string;
  color: string;
  cut: string;
  carat: string;
  proportions: {
    table: string;
    depth: string;
    crown: string;
    pavilion: string;
    girdle: string;
    culet: string;
  };
  opticalProperties: {
    brilliance: string;
    fire: string;
    scintillation: string;
    refractiveIndex: string;
    birefringence: string;
    pleochroism: string;
  };
  inclusions: {
    type: string;
    location: string;
    severity: 'minor' | 'moderate' | 'significant';
    impact: string;
  }[];
  measurements: {
    length: string;
    width: string;
    depth: string;
    weight: string;
    angles: {
      crownAngle: string;
      pavilionAngle: string;
    };
  };
  certification: {
    institute: string;
    reportNumber: string;
    date: string;
    authenticity: string;
  };
  recommendations: string[];
  marketValue: {
    retail: string;
    wholesale: string;
    insurance: string;
  };
}

const gemAnalysisData: { [key: string]: GemAnalysisData } = {
  diamond: {
    name: "Diamond",
    clarity: "VS1",
    color: "H",
    cut: "Excellent",
    carat: "1.25",
    proportions: {
      table: "58%",
      depth: "61.5%",
      crown: "15.2%",
      pavilion: "43.1%",
      girdle: "Medium, faceted",
      culet: "None"
    },
    opticalProperties: {
      brilliance: "Exceptional",
      fire: "High",
      scintillation: "Excellent",
      refractiveIndex: "2.418",
      birefringence: "None (isotropic)",
      pleochroism: "None"
    },
    inclusions: [
      {
        type: "Crystal inclusion",
        location: "Near girdle at 3 o'clock",
        severity: "minor",
        impact: "Minimal effect on brilliance"
      },
      {
        type: "Feather",
        location: "Pavilion center",
        severity: "minor",
        impact: "Not visible to naked eye"
      }
    ],
    measurements: {
      length: "6.98mm",
      width: "7.02mm",
      depth: "4.31mm",
      weight: "1.25ct",
      angles: {
        crownAngle: "34.5°",
        pavilionAngle: "40.8°"
      }
    },
    certification: {
      institute: "GIA",
      reportNumber: "2185749631",
      date: "2024-03-15",
      authenticity: "Natural diamond"
    },
    recommendations: [
      "Excellent cut quality maximizes brilliance",
      "Ideal for engagement ring setting",
      "High investment grade stone",
      "Recommend professional setting"
    ],
    marketValue: {
      retail: "$8,500 - $12,000",
      wholesale: "$6,200 - $8,800",
      insurance: "$15,000"
    }
  },
  emerald: {
    name: "Emerald",
    clarity: "SI1",
    color: "Vivid Green",
    cut: "Emerald Cut",
    carat: "2.15",
    proportions: {
      table: "65%",
      depth: "63%",
      crown: "13.5%",
      pavilion: "44.2%",
      girdle: "Medium",
      culet: "Small"
    },
    opticalProperties: {
      brilliance: "Good",
      fire: "Moderate",
      scintillation: "Good",
      refractiveIndex: "1.576-1.582",
      birefringence: "0.006",
      pleochroism: "Weak dichroism"
    },
    inclusions: [
      {
        type: "Jardin (garden)",
        location: "Throughout stone",
        severity: "moderate",
        impact: "Characteristic emerald feature"
      },
      {
        type: "Surface-reaching inclusion",
        location: "Table edge",
        severity: "minor",
        impact: "May affect durability"
      }
    ],
    measurements: {
      length: "8.45mm",
      width: "6.82mm",
      depth: "4.29mm",
      weight: "2.15ct",
      angles: {
        crownAngle: "28°",
        pavilionAngle: "42°"
      }
    },
    certification: {
      institute: "SSEF",
      reportNumber: "105847",
      date: "2024-02-28",
      authenticity: "Natural emerald, minor oil"
    },
    recommendations: [
      "Natural emerald with typical inclusions",
      "Minor oil treatment enhances clarity",
      "Suitable for pendant or earrings",
      "Avoid ultrasonic cleaning"
    ],
    marketValue: {
      retail: "$3,200 - $5,800",
      wholesale: "$2,400 - $4,200",
      insurance: "$7,500"
    }
  },
  ruby: {
    name: "Ruby",
    clarity: "Eye Clean",
    color: "Pigeon Blood Red",
    cut: "Oval Brilliant",
    carat: "1.85",
    proportions: {
      table: "62%",
      depth: "64%",
      crown: "14.8%",
      pavilion: "43.5%",
      girdle: "Medium to thick",
      culet: "Small"
    },
    opticalProperties: {
      brilliance: "Very Good",
      fire: "Good",
      scintillation: "Very Good",
      refractiveIndex: "1.762-1.770",
      birefringence: "0.008",
      pleochroism: "Strong dichroism"
    },
    inclusions: [
      {
        type: "Silk inclusions",
        location: "Center of stone",
        severity: "minor",
        impact: "Creates asterism potential"
      }
    ],
    measurements: {
      length: "8.12mm",
      width: "6.95mm",
      depth: "4.45mm",
      weight: "1.85ct",
      angles: {
        crownAngle: "32°",
        pavilionAngle: "41.5°"
      }
    },
    certification: {
      institute: "Gübelin",
      reportNumber: "21034567",
      date: "2024-01-20",
      authenticity: "Natural ruby, heat treated"
    },
    recommendations: [
      "Exceptional color quality",
      "Heat treatment is standard",
      "Ideal for ring setting",
      "High collector value"
    ],
    marketValue: {
      retail: "$12,000 - $18,000",
      wholesale: "$8,500 - $13,000",
      insurance: "$25,000"
    }
  }
};

export default function Interactive3DGem({ gemType, className = "" }: Interactive3DGemProps) {
  const [selectedView, setSelectedView] = useState<"side" | "top" | "pavilion">("side");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [lightingIntensity, setLightingIntensity] = useState([75]);
  const [lightingAngle, setLightingAngle] = useState([45]);
  const [microscopyLevel, setMicroscopyLevel] = useState("10x");
  const [showInclusions, setShowInclusions] = useState(false);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"basic" | "proportions" | "optical" | "inclusions" | "certification" | "valuation">("basic");
  const constraintsRef = useRef(null);
  
  const animationConfig = useMemo(() => getOptimizedAnimationConfig(), []);
  const isTouch = useMemo(() => isTouchDevice(), []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [30, -30]);
  const rotateY = useTransform(x, [-200, 200], [-30, 30]);

  const data = gemAnalysisData[gemType.toLowerCase()] || gemAnalysisData.diamond;

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    x.set(x.get() + info.delta.x);
    y.set(y.get() + info.delta.y);
  };

  const resetRotation = () => {
    x.set(0);
    y.set(0);
  };

  const get3DGemSVG = (view: string) => {
    const gemColors = {
      diamond: { base: '#e3f2fd', accent: '#1976d2', highlight: '#ffffff' },
      emerald: { base: '#c8e6c9', accent: '#4caf50', highlight: '#e8f5e8' },
      ruby: { base: '#ffcdd2', accent: '#f44336', highlight: '#ffebee' },
      sapphire: { base: '#e3f2fd', accent: '#2196f3', highlight: '#f3e5f5' }
    };
    
    const colors = gemColors[gemType.toLowerCase() as keyof typeof gemColors] || gemColors.diamond;
    const lightIntensity = lightingIntensity[0] / 100;
    const angle = lightingAngle[0];
    
    switch (view) {
      case 'top':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id={`${gemType}TopGradient`} cx="50%" cy="30%">
                <stop offset="0%" stopColor={colors.highlight} stopOpacity={lightIntensity} />
                <stop offset="50%" stopColor={colors.base} />
                <stop offset="100%" stopColor={colors.accent} />
              </radialGradient>
              <filter id="brillianceEffect">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main gem outline */}
            <circle cx="100" cy="100" r="75" fill={`url(#${gemType}TopGradient)`} stroke={colors.accent} strokeWidth="2" filter="url(#brillianceEffect)"/>
            
            {/* Table facet */}
            <polygon points="100,50 130,70 130,130 100,150 70,130 70,70" 
                     fill={colors.highlight} stroke={colors.accent} strokeWidth="1" opacity={0.9}/>
            
            {/* Crown facets */}
            <g stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.7">
              <path d="M100 25 L100 50"/>
              <path d="M130 70 L155 70"/>
              <path d="M130 130 L155 130"/>
              <path d="M100 150 L100 175"/>
              <path d="M70 130 L45 130"/>
              <path d="M70 70 L45 70"/>
              <path d="M85 40 L115 40"/>
              <path d="M140 85 L140 115"/>
            </g>
            
            {/* Inclusions (if enabled) */}
            {showInclusions && (
              <g>
                <circle cx="90" cy="90" r="2" fill={colors.accent} opacity="0.4"/>
                <circle cx="110" cy="120" r="1.5" fill={colors.accent} opacity="0.3"/>
                <path d="M105 95 L115 105" stroke={colors.accent} strokeWidth="1" opacity="0.3"/>
              </g>
            )}
            
            {/* Measurement points (if enabled) */}
            {measurementMode && (
              <g>
                <circle cx="70" cy="100" r="2" fill="red" stroke="white" strokeWidth="1"/>
                <circle cx="130" cy="100" r="2" fill="red" stroke="white" strokeWidth="1"/>
                <line x1="70" y1="100" x2="130" y2="100" stroke="red" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="100" y="95" textAnchor="middle" fontSize="8" fill="red">6.5mm</text>
              </g>
            )}
          </svg>
        );
        
      case 'pavilion':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id={`${gemType}PavilionGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.accent} />
                <stop offset="50%" stopColor={colors.base} />
                <stop offset="100%" stopColor="#1a237e" />
              </linearGradient>
            </defs>
            
            {/* Pavilion outline */}
            <polygon points="100,40 160,80 140,120 100,180 60,120 40,80" 
                     fill={`url(#${gemType}PavilionGradient)`} stroke={colors.accent} strokeWidth="2"/>
            
            {/* Pavilion facets */}
            <g stroke={colors.highlight} strokeWidth="1" opacity="0.6">
              <path d="M100 40 L100 180"/>
              <path d="M40 80 L160 80"/>
              <path d="M60 120 L140 120"/>
              <path d="M80 100 L120 100"/>
            </g>
            
            {/* Light reflection */}
            <polygon points="100,60 120,80 100,100 80,80" 
                     fill={colors.highlight} opacity={lightIntensity * 0.8}/>
                     
            {/* Culet point */}
            <circle cx="100" cy="180" r="2" fill={colors.accent}/>
          </svg>
        );
        
      default: // side view
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id={`${gemType}SideGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.highlight} stopOpacity={lightIntensity} />
                <stop offset="30%" stopColor={colors.base} />
                <stop offset="100%" stopColor={colors.accent} />
              </linearGradient>
              <radialGradient id={`${gemType}Brilliance`} cx="50%" cy="30%">
                <stop offset="0%" stopColor={colors.highlight} stopOpacity="0.9" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            
            {/* Main gem body */}
            <polygon points="100,30 150,70 150,130 100,170 50,130 50,70" 
                     fill={`url(#${gemType}SideGradient)`} stroke={colors.accent} strokeWidth="2"/>
            
            {/* Table facet */}
            <polygon points="70,70 130,70 135,80 125,90 75,90 65,80" 
                     fill={colors.highlight} stroke={colors.accent} strokeWidth="1" opacity="0.9"/>
            
            {/* Crown and pavilion divisions */}
            <path d="M50 70 L150 70" stroke={colors.accent} strokeWidth="1.5" opacity="0.8"/>
            <path d="M50 130 L150 130" stroke={colors.accent} strokeWidth="1" opacity="0.6"/>
            
            {/* Facet lines */}
            <g stroke={colors.highlight} strokeWidth="0.8" opacity="0.6">
              <path d="M65 55 L100 70 L135 55"/>
              <path d="M50 70 L100 85 L150 70"/>
              <path d="M50 130 L100 115 L150 130"/>
              <path d="M65 145 L100 130 L135 145"/>
            </g>
            
            {/* Brilliance effect */}
            <ellipse cx="100" cy="70" rx="25" ry="15" fill={`url(#${gemType}Brilliance)`} opacity={lightIntensity}/>
            
            {/* Measurement annotations */}
            {measurementMode && (
              <g>
                <line x1="30" y1="30" x2="30" y2="170" stroke="red" strokeWidth="1"/>
                <line x1="25" y1="30" x2="35" y2="30" stroke="red" strokeWidth="1"/>
                <line x1="25" y1="170" x2="35" y2="170" stroke="red" strokeWidth="1"/>
                <text x="20" y="100" textAnchor="middle" fontSize="8" fill="red" transform="rotate(-90, 20, 100)">7.2mm</text>
                
                <line x1="50" y1="185" x2="150" y2="185" stroke="red" strokeWidth="1"/>
                <line x1="50" y1="180" x2="50" y2="190" stroke="red" strokeWidth="1"/>
                <line x1="150" y1="180" x2="150" y2="190" stroke="red" strokeWidth="1"/>
                <text x="100" y="195" textAnchor="middle" fontSize="8" fill="red">6.5mm</text>
              </g>
            )}
          </svg>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Interactive 3D Gem Analysis
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              <Info className="h-4 w-4 mr-2" />
              {showAnalysis ? 'Hide' : 'Show'} Analysis
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 3D Gem Viewer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Professional Gem Examination</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(Math.min(5, zoom + 0.2))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetRotation}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Light Intensity: {lightingIntensity[0]}%
                  </label>
                  <Slider
                    value={lightingIntensity}
                    onValueChange={setLightingIntensity}
                    max={100}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Light Angle: {lightingAngle[0]}°
                  </label>
                  <Slider
                    value={lightingAngle}
                    onValueChange={setLightingAngle}
                    max={90}
                    min={0}
                    step={15}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Microscopy Level</label>
                  <Select value={microscopyLevel} onValueChange={setMicroscopyLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10x">10x Magnification</SelectItem>
                      <SelectItem value="20x">20x Magnification</SelectItem>
                      <SelectItem value="40x">40x Magnification</SelectItem>
                      <SelectItem value="100x">100x Magnification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Examination Tools</label>
                  <div className="flex gap-2">
                    <Button
                      variant={showInclusions ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowInclusions(!showInclusions)}
                    >
                      <Search className="h-4 w-4 mr-1" />
                      Inclusions
                    </Button>
                    <Button
                      variant={measurementMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMeasurementMode(!measurementMode)}
                    >
                      Measure
                    </Button>
                  </div>
                </div>
              </div>
              
              <div 
                ref={constraintsRef}
                className="relative bg-gradient-to-br from-muted/50 to-muted/80 rounded-lg p-8 h-80 flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  className="cursor-grab active:cursor-grabbing"
                  style={{
                    rotateX,
                    rotateY,
                    scale: zoom,
                  }}
                  drag
                  dragConstraints={constraintsRef}
                  onDrag={handleDrag}
                  whileHover={{ scale: zoom * 1.05 }}
                  whileTap={{ scale: zoom * 0.95 }}
                >
                  <div className="w-48 h-48 relative">
                    {get3DGemSVG(selectedView)}
                    
                    {/* Reflection overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* Instructions */}
                <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                  Drag to rotate • Scroll to zoom
                </div>
              </div>

              {/* View Controls */}
              <div className="flex gap-2">
                {['side', 'top', 'pavilion'].map((view) => (
                  <Button
                    key={view}
                    variant={selectedView === view ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedView(view as any)}
                    className="capitalize"
                  >
                    {view} View
                  </Button>
                ))}
              </div>
            </div>

            {/* Analysis Panel */}
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold">Gemological Analysis</h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Clarity:</span>
                      <Badge variant="secondary" className="ml-2">{data.clarity}</Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Color:</span>
                      <Badge variant="secondary" className="ml-2">{data.color}</Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Cut:</span>
                      <Badge variant="secondary" className="ml-2">{data.cut}</Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Carat:</span>
                      <Badge variant="secondary" className="ml-2">{data.carat}ct</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="text-sm font-semibold mb-2">Cut Proportions</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Table: {data.proportions.table}</div>
                      <div>Depth: {data.proportions.depth}</div>
                      <div>Crown: {data.proportions.crown}</div>
                      <div>Pavilion: {data.proportions.pavilion}</div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="text-sm font-semibold mb-2">Optical Properties</h5>
                    <div className="space-y-1 text-sm">
                      <div>Brilliance: <span className="text-primary">{data.opticalProperties.brilliance}</span></div>
                      <div>Fire: <span className="text-primary">{data.opticalProperties.fire}</span></div>
                      <div>Scintillation: <span className="text-primary">{data.opticalProperties.scintillation}</span></div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="text-sm font-semibold mb-2">Inclusions</h5>
                    <ul className="text-sm space-y-1">
                      {data.inclusions.map((inclusion, index) => (
                        <li key={index}>• {inclusion}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="text-sm font-semibold mb-2">Recommendations</h5>
                    <ul className="text-sm space-y-1">
                      {data.recommendations.map((rec, index) => (
                        <li key={index} className="text-green-600">• {rec}</li>
                      ))}
                    </ul>
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