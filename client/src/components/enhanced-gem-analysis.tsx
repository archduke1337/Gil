import { useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut, Eye, Info, Lightbulb, Search, Settings, Microscope, Ruler, Award, DollarSign, Camera, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOptimizedAnimationConfig, isTouchDevice } from "@/utils/performance";

interface EnhancedGemAnalysisProps {
  gemType: string;
  className?: string;
}

interface ComprehensiveGemData {
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
    dispersion: string;
    luster: string;
  };
  inclusions: {
    type: string;
    location: string;
    severity: 'minor' | 'moderate' | 'significant';
    impact: string;
    visibility: string;
  }[];
  measurements: {
    length: string;
    width: string;
    depth: string;
    weight: string;
    angles: {
      crownAngle: string;
      pavilionAngle: string;
      starLength: string;
      lowerGirdle: string;
    };
  };
  certification: {
    institute: string;
    reportNumber: string;
    date: string;
    authenticity: string;
    treatment: string;
    origin: string;
  };
  recommendations: string[];
  marketValue: {
    retail: string;
    wholesale: string;
    insurance: string;
    trend: 'rising' | 'stable' | 'declining';
  };
  rarity: {
    level: string;
    score: number;
    factors: string[];
  };
  qualityFactors: {
    clarity: number;
    color: number;
    cut: number;
    overall: number;
  };
}

const comprehensiveGemData: { [key: string]: ComprehensiveGemData } = {
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
      pleochroism: "None",
      dispersion: "0.044",
      luster: "Adamantine"
    },
    inclusions: [
      {
        type: "Crystal inclusion",
        location: "Near girdle at 3 o'clock",
        severity: "minor",
        impact: "Minimal effect on brilliance",
        visibility: "10x magnification only"
      },
      {
        type: "Feather",
        location: "Pavilion center",
        severity: "minor",
        impact: "Not visible to naked eye",
        visibility: "Under microscope"
      }
    ],
    measurements: {
      length: "6.98mm",
      width: "7.02mm",
      depth: "4.31mm",
      weight: "1.25ct",
      angles: {
        crownAngle: "34.5°",
        pavilionAngle: "40.8°",
        starLength: "55%",
        lowerGirdle: "75%"
      }
    },
    certification: {
      institute: "GIL",
      reportNumber: "2185749631",
      date: "2024-03-15",
      authenticity: "Natural diamond",
      treatment: "None",
      origin: "Botswana"
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
      insurance: "$15,000",
      trend: "stable"
    },
    rarity: {
      level: "Rare",
      score: 8.5,
      factors: ["Excellent cut grade", "VS1 clarity", "Natural origin"]
    },
    qualityFactors: {
      clarity: 85,
      color: 78,
      cut: 95,
      overall: 86
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
      pleochroism: "Weak dichroism",
      dispersion: "0.014",
      luster: "Vitreous"
    },
    inclusions: [
      {
        type: "Jardin (garden)",
        location: "Throughout stone",
        severity: "moderate",
        impact: "Characteristic emerald feature",
        visibility: "Visible to naked eye"
      },
      {
        type: "Surface-reaching inclusion",
        location: "Table edge",
        severity: "minor",
        impact: "May affect durability",
        visibility: "Under magnification"
      }
    ],
    measurements: {
      length: "8.45mm",
      width: "6.82mm",
      depth: "4.29mm",
      weight: "2.15ct",
      angles: {
        crownAngle: "28°",
        pavilionAngle: "42°",
        starLength: "N/A",
        lowerGirdle: "N/A"
      }
    },
    certification: {
      institute: "SSEF",
      reportNumber: "105847",
      date: "2024-02-28",
      authenticity: "Natural emerald",
      treatment: "Minor oil",
      origin: "Colombia"
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
      insurance: "$7,500",
      trend: "rising"
    },
    rarity: {
      level: "Very Rare",
      score: 9.2,
      factors: ["Colombian origin", "Vivid green color", "Over 2 carats"]
    },
    qualityFactors: {
      clarity: 65,
      color: 92,
      cut: 75,
      overall: 77
    }
  }
};

export default function EnhancedGemAnalysis({ gemType, className = "" }: EnhancedGemAnalysisProps) {
  const [selectedView, setSelectedView] = useState<"side" | "top" | "pavilion">("side");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [lightingIntensity, setLightingIntensity] = useState([75]);
  const [lightingAngle, setLightingAngle] = useState([45]);
  const [microscopyLevel, setMicroscopyLevel] = useState("10x");
  const [showInclusions, setShowInclusions] = useState(false);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"overview" | "proportions" | "optical" | "inclusions" | "certification" | "valuation" | "quality">("overview");
  const [analysisMode, setAnalysisMode] = useState<"basic" | "advanced" | "expert">("basic");
  const constraintsRef = useRef(null);
  
  const animationConfig = useMemo(() => getOptimizedAnimationConfig(), []);
  const isTouch = useMemo(() => isTouchDevice(), []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [30, -30]);
  const rotateY = useTransform(x, [-200, 200], [-30, 30]);

  const data = comprehensiveGemData[gemType.toLowerCase()] || comprehensiveGemData.diamond;

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!animationConfig.enabled) return;
    
    const { offset } = info;
    x.set(offset.x);
    y.set(offset.y);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
    setZoom(1);
  };

  const get3DGemSVG = (view: string) => {
    const baseColor = gemType.toLowerCase() === 'diamond' ? '#E8F4FD' : 
                     gemType.toLowerCase() === 'emerald' ? '#10B981' :
                     gemType.toLowerCase() === 'ruby' ? '#DC2626' : '#3B82F6';
    
    const lightIntensity = lightingIntensity[0] / 100;
    const lightAngle = lightingAngle[0];
    
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id={`gemGradient-${view}`} cx="50%" cy="30%">
            <stop offset="0%" stopColor={`rgba(255,255,255,${lightIntensity * 0.8})`} />
            <stop offset="30%" stopColor={baseColor} stopOpacity={0.9} />
            <stop offset="70%" stopColor={baseColor} stopOpacity={0.7} />
            <stop offset="100%" stopColor={`rgba(0,0,0,${0.3 - lightIntensity * 0.2})`} />
          </radialGradient>
          <filter id="gemShadow">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {view === 'side' && (
          <g transform="translate(100,100)">
            <polygon
              points="-60,-40 60,-40 80,-20 80,20 60,40 -60,40 -80,20 -80,-20"
              fill={`url(#gemGradient-${view})`}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              filter="url(#gemShadow)"
            />
            {showInclusions && (
              <>
                <circle cx="-20" cy="10" r="2" fill="rgba(0,0,0,0.3)" />
                <circle cx="15" cy="-5" r="1.5" fill="rgba(0,0,0,0.2)" />
              </>
            )}
          </g>
        )}
        
        {view === 'top' && (
          <g transform="translate(100,100)">
            <polygon
              points="0,-50 35,-35 50,0 35,35 0,50 -35,35 -50,0 -35,-35"
              fill={`url(#gemGradient-${view})`}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              filter="url(#gemShadow)"
            />
            {showInclusions && (
              <>
                <circle cx="-10" cy="15" r="2" fill="rgba(0,0,0,0.3)" />
                <circle cx="20" cy="-10" r="1.5" fill="rgba(0,0,0,0.2)" />
              </>
            )}
          </g>
        )}
        
        {view === 'pavilion' && (
          <g transform="translate(100,100)">
            <polygon
              points="0,-30 20,-20 30,0 20,20 0,30 -20,20 -30,0 -20,-20"
              fill={`url(#gemGradient-${view})`}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              filter="url(#gemShadow)"
            />
            {showInclusions && (
              <circle cx="5" cy="8" r="1.5" fill="rgba(0,0,0,0.2)" />
            )}
          </g>
        )}
      </svg>
    );
  };

  const renderQualityMeter = (value: number, label: string) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            value >= 90 ? 'bg-green-500' :
            value >= 75 ? 'bg-blue-500' :
            value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="w-6 h-6" />
            Enhanced 3D Gem Analysis - {data.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={analysisMode} onValueChange={(value) => setAnalysisMode(value as any)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic Analysis</SelectItem>
                <SelectItem value="advanced">Advanced Analysis</SelectItem>
                <SelectItem value="expert">Expert Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showAnalysis ? "default" : "outline"}
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="ml-auto"
            >
              <Info className="w-4 h-4 mr-2" />
              {showAnalysis ? "Hide Analysis" : "Show Analysis"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Viewing Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {["side", "top", "pavilion"].map((view) => (
                  <Button
                    key={view}
                    variant={selectedView === view ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedView(view as any)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetPosition}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Advanced Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
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
                    <Ruler className="h-4 w-4 mr-1" />
                    Measure
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 3D Gem Display */}
            <div 
              ref={constraintsRef}
              className="relative bg-gradient-to-br from-muted/50 to-muted/80 rounded-lg p-8 h-80 flex items-center justify-center overflow-hidden"
            >
              <motion.div
                className="cursor-grab active:cursor-grabbing"
                style={{
                  rotateX: animationConfig.enabled ? rotateX : 0,
                  rotateY: animationConfig.enabled ? rotateY : 0,
                  scale: zoom,
                }}
                drag={animationConfig.enabled}
                dragConstraints={constraintsRef}
                onDrag={handleDrag}
                whileHover={animationConfig.enabled ? { scale: zoom * 1.05 } : {}}
                whileTap={animationConfig.enabled ? { scale: zoom * 0.95 } : {}}
              >
                <div className="w-48 h-48 relative">
                  {get3DGemSVG(selectedView)}
                  
                  {/* Measurement overlay */}
                  {measurementMode && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
                        <span className="text-xs bg-black text-white px-2 py-1 rounded">
                          {data.measurements.length}
                        </span>
                      </div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 -rotate-90">
                        <span className="text-xs bg-black text-white px-2 py-1 rounded">
                          {data.measurements.width}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Info overlay */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 rounded-lg p-3 space-y-1">
                <div className="text-sm font-medium">{microscopyLevel} Magnification</div>
                <div className="text-xs text-muted-foreground">
                  View: {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
                </div>
                {showInclusions && (
                  <div className="text-xs text-yellow-600">Inclusions visible</div>
                )}
              </div>
            </div>
          </div>

          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card>
                <CardContent className="p-6">
                  <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-7">
                      <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                      <TabsTrigger value="proportions" className="text-xs">Proportions</TabsTrigger>
                      <TabsTrigger value="optical" className="text-xs">Optical</TabsTrigger>
                      <TabsTrigger value="inclusions" className="text-xs">Inclusions</TabsTrigger>
                      <TabsTrigger value="certification" className="text-xs">Certificate</TabsTrigger>
                      <TabsTrigger value="valuation" className="text-xs">Valuation</TabsTrigger>
                      <TabsTrigger value="quality" className="text-xs">Quality</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border">
                          <p className="text-sm text-muted-foreground">Clarity Grade</p>
                          <p className="text-xl font-bold text-blue-600">{data.clarity}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border">
                          <p className="text-sm text-muted-foreground">Color Grade</p>
                          <p className="text-xl font-bold text-green-600">{data.color}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border">
                          <p className="text-sm text-muted-foreground">Cut Quality</p>
                          <p className="text-xl font-bold text-purple-600">{data.cut}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border">
                          <p className="text-sm text-muted-foreground">Carat Weight</p>
                          <p className="text-xl font-bold text-orange-600">{data.carat}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h5 className="font-medium flex items-center gap-2">
                            <Ruler className="w-4 h-4" />
                            Physical Measurements
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                              <span>Length:</span>
                              <span className="font-medium">{data.measurements.length}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                              <span>Width:</span>
                              <span className="font-medium">{data.measurements.width}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                              <span>Depth:</span>
                              <span className="font-medium">{data.measurements.depth}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                              <span>Weight:</span>
                              <span className="font-medium">{data.measurements.weight}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="font-medium">Rarity Assessment</h5>
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-medium">Rarity Level</span>
                              <Badge variant="secondary">{data.rarity.level}</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Rarity Score</span>
                                <span className="font-medium">{data.rarity.score}/10</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                  style={{ width: `${data.rarity.score * 10}%` }}
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-muted-foreground mb-2">Key Factors:</p>
                              <ul className="text-sm space-y-1">
                                {data.rarity.factors.map((factor, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                    {factor}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="proportions" className="mt-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-1">Table %</p>
                            <p className="text-3xl font-bold text-primary">{data.proportions.table}</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-1">Depth %</p>
                            <p className="text-3xl font-bold text-primary">{data.proportions.depth}</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-1">Crown %</p>
                            <p className="text-3xl font-bold text-primary">{data.proportions.crown}</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-1">Pavilion %</p>
                            <p className="text-3xl font-bold text-primary">{data.proportions.pavilion}</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-1">Girdle</p>
                            <p className="text-lg font-semibold">{data.proportions.girdle}</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-1">Culet</p>
                            <p className="text-lg font-semibold">{data.proportions.culet}</p>
                          </div>
                        </div>
                        
                        {analysisMode === 'expert' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                              <h6 className="font-medium mb-3">Advanced Angles</h6>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Crown Angle:</span>
                                  <span className="font-medium">{data.measurements.angles.crownAngle}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Pavilion Angle:</span>
                                  <span className="font-medium">{data.measurements.angles.pavilionAngle}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Star Length:</span>
                                  <span className="font-medium">{data.measurements.angles.starLength}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Lower Girdle:</span>
                                  <span className="font-medium">{data.measurements.angles.lowerGirdle}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 border rounded-lg">
                              <h6 className="font-medium mb-3">Proportion Analysis</h6>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Table Proportion</span>
                                  <Badge variant={
                                    parseInt(data.proportions.table) >= 53 && parseInt(data.proportions.table) <= 64 
                                      ? "default" : "secondary"
                                  }>
                                    {parseInt(data.proportions.table) >= 53 && parseInt(data.proportions.table) <= 64 
                                      ? "Excellent" : "Good"}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Depth Proportion</span>
                                  <Badge variant={
                                    parseFloat(data.proportions.depth) >= 58 && parseFloat(data.proportions.depth) <= 64 
                                      ? "default" : "secondary"
                                  }>
                                    {parseFloat(data.proportions.depth) >= 58 && parseFloat(data.proportions.depth) <= 64 
                                      ? "Excellent" : "Good"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="optical" className="mt-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-medium">Light Performance</h5>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                                <span>Brilliance</span>
                                <Badge variant="secondary">{data.opticalProperties.brilliance}</Badge>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                                <span>Fire</span>
                                <Badge variant="secondary">{data.opticalProperties.fire}</Badge>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                                <span>Scintillation</span>
                                <Badge variant="secondary">{data.opticalProperties.scintillation}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h5 className="font-medium">Optical Constants</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between p-2 border rounded">
                                <span>Refractive Index:</span>
                                <span className="font-medium">{data.opticalProperties.refractiveIndex}</span>
                              </div>
                              <div className="flex justify-between p-2 border rounded">
                                <span>Birefringence:</span>
                                <span className="font-medium">{data.opticalProperties.birefringence}</span>
                              </div>
                              <div className="flex justify-between p-2 border rounded">
                                <span>Pleochroism:</span>
                                <span className="font-medium">{data.opticalProperties.pleochroism}</span>
                              </div>
                              {analysisMode === 'expert' && (
                                <>
                                  <div className="flex justify-between p-2 border rounded">
                                    <span>Dispersion:</span>
                                    <span className="font-medium">{data.opticalProperties.dispersion}</span>
                                  </div>
                                  <div className="flex justify-between p-2 border rounded">
                                    <span>Luster:</span>
                                    <span className="font-medium">{data.opticalProperties.luster}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="inclusions" className="mt-6">
                      <div className="space-y-4">
                        <h5 className="font-medium flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Detailed Inclusion Analysis
                        </h5>
                        <div className="space-y-4">
                          {data.inclusions.map((inclusion, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-3">
                                <h6 className="font-medium">{inclusion.type}</h6>
                                <Badge 
                                  variant={
                                    inclusion.severity === 'minor' ? 'default' : 
                                    inclusion.severity === 'moderate' ? 'secondary' : 
                                    'destructive'
                                  }
                                >
                                  {inclusion.severity}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground mb-1">
                                    <strong>Location:</strong> {inclusion.location}
                                  </p>
                                  <p className="text-muted-foreground">
                                    <strong>Visibility:</strong> {inclusion.visibility}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">
                                    <strong>Impact:</strong> {inclusion.impact}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="certification" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Award className="w-5 h-5 text-primary" />
                          <h5 className="font-medium">Official Certification</h5>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Certifying Institute</p>
                            <p className="font-semibold text-lg">{data.certification.institute}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Report Number</p>
                            <p className="font-semibold text-lg">{data.certification.reportNumber}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                            <p className="font-semibold">{data.certification.date}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Origin</p>
                            <p className="font-semibold">{data.certification.origin}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Authenticity</p>
                            <p className="font-semibold">{data.certification.authenticity}</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Treatment</p>
                            <p className="font-semibold">{data.certification.treatment}</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800 dark:text-green-200">Verified Authentic</span>
                          </div>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            This gemstone has been professionally examined and certified by {data.certification.institute}, 
                            confirming its authenticity and providing detailed analysis results.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="valuation" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <h5 className="font-medium">Professional Market Valuation</h5>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-2">Retail Value</p>
                            <p className="text-2xl font-bold text-green-600">{data.marketValue.retail}</p>
                            <p className="text-xs text-muted-foreground mt-1">Current market price</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-2">Wholesale Value</p>
                            <p className="text-2xl font-bold text-blue-600">{data.marketValue.wholesale}</p>
                            <p className="text-xs text-muted-foreground mt-1">Trade price range</p>
                          </div>
                          <div className="p-4 border rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-2">Insurance Value</p>
                            <p className="text-2xl font-bold text-purple-600">{data.marketValue.insurance}</p>
                            <p className="text-xs text-muted-foreground mt-1">Replacement value</p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">Market Trend</span>
                            <Badge variant={
                              data.marketValue.trend === 'rising' ? 'default' :
                              data.marketValue.trend === 'stable' ? 'secondary' : 'destructive'
                            }>
                              {data.marketValue.trend.charAt(0).toUpperCase() + data.marketValue.trend.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {data.marketValue.trend === 'rising' && "Market value is trending upward due to increased demand and rarity."}
                            {data.marketValue.trend === 'stable' && "Market value remains stable with consistent demand."}
                            {data.marketValue.trend === 'declining' && "Market value is experiencing a slight decline."}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <h6 className="font-medium mb-2">Investment Recommendations</h6>
                          <div className="space-y-2">
                            {data.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <p className="text-sm text-blue-700 dark:text-blue-300">{rec}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="quality" className="mt-6">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Layers className="w-5 h-5 text-primary" />
                          <h5 className="font-medium">Quality Assessment</h5>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h6 className="font-medium">Individual Factors</h6>
                            <div className="space-y-3">
                              {renderQualityMeter(data.qualityFactors.clarity, "Clarity")}
                              {renderQualityMeter(data.qualityFactors.color, "Color")}
                              {renderQualityMeter(data.qualityFactors.cut, "Cut")}
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h6 className="font-medium">Overall Quality</h6>
                            <div className="p-6 border rounded-lg text-center">
                              <div className="text-4xl font-bold text-primary mb-2">
                                {data.qualityFactors.overall}%
                              </div>
                              <div className="text-lg font-medium mb-2">
                                {data.qualityFactors.overall >= 90 ? 'Exceptional' :
                                 data.qualityFactors.overall >= 80 ? 'Excellent' :
                                 data.qualityFactors.overall >= 70 ? 'Very Good' :
                                 data.qualityFactors.overall >= 60 ? 'Good' : 'Fair'}
                              </div>
                              <div className="w-full bg-muted rounded-full h-3">
                                <div 
                                  className={`h-3 rounded-full transition-all duration-500 ${
                                    data.qualityFactors.overall >= 90 ? 'bg-green-500' :
                                    data.qualityFactors.overall >= 80 ? 'bg-blue-500' :
                                    data.qualityFactors.overall >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                                  }`}
                                  style={{ width: `${data.qualityFactors.overall}%` }}
                                />
                              </div>
                            </div>
                            
                            <div className="p-4 bg-muted/20 rounded-lg">
                              <h6 className="font-medium mb-2">Quality Summary</h6>
                              <p className="text-sm text-muted-foreground">
                                This {data.name.toLowerCase()} demonstrates {
                                  data.qualityFactors.overall >= 85 ? 'exceptional quality across all factors' :
                                  data.qualityFactors.overall >= 75 ? 'excellent overall quality with strong performance' :
                                  'good quality characteristics suitable for most applications'
                                }. The analysis considers cut precision, color saturation, clarity grade, and overall appearance.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}