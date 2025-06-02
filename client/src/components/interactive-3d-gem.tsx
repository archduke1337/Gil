import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  };
  opticalProperties: {
    brilliance: string;
    fire: string;
    scintillation: string;
  };
  inclusions: string[];
  recommendations: string[];
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
      crown: "15%",
      pavilion: "43%"
    },
    opticalProperties: {
      brilliance: "Exceptional",
      fire: "High",
      scintillation: "Excellent"
    },
    inclusions: ["Small crystal near girdle", "Minor feather in pavilion"],
    recommendations: ["Excellent cut quality", "Ideal for engagement ring", "High investment value"]
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
      crown: "13%",
      pavilion: "44%"
    },
    opticalProperties: {
      brilliance: "Good",
      fire: "Moderate",
      scintillation: "Good"
    },
    inclusions: ["Natural jardin pattern", "Minor surface reaching inclusion"],
    recommendations: ["Natural emerald characteristics", "Consider oil treatment", "Suitable for pendant"]
  }
};

export default function Interactive3DGem({ gemType, className = "" }: Interactive3DGemProps) {
  const [selectedView, setSelectedView] = useState<"side" | "top" | "pavilion">("side");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [zoom, setZoom] = useState(1);
  const constraintsRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

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
    const baseColor = gemType.toLowerCase() === 'diamond' ? '#e3f2fd' : '#c8e6c9';
    const accentColor = gemType.toLowerCase() === 'diamond' ? '#1976d2' : '#4caf50';
    
    switch (view) {
      case 'top':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id={`${gemType}TopGradient`} cx="50%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor={baseColor} />
                <stop offset="100%" stopColor={accentColor} />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill={`url(#${gemType}TopGradient)`} stroke={accentColor} strokeWidth="2"/>
            <polygon points="100,40 140,60 160,100 140,140 100,160 60,140 40,100 60,60" 
                     fill="none" stroke={accentColor} strokeWidth="1" opacity="0.7"/>
            <polygon points="100,60 120,80 120,120 100,140 80,120 80,80" 
                     fill={baseColor} stroke={accentColor} strokeWidth="1" opacity="0.8"/>
          </svg>
        );
      case 'pavilion':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id={`${gemType}PavilionGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accentColor} />
                <stop offset="100%" stopColor="#1a237e" />
              </linearGradient>
            </defs>
            <polygon points="100,40 160,80 140,120 100,180 60,120 40,80" 
                     fill={`url(#${gemType}PavilionGradient)`} stroke={accentColor} strokeWidth="2"/>
            <path d="M100 40 L100 180" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
            <path d="M40 80 L160 80 L100 180 Z" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id={`${gemType}SideGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor={baseColor} />
                <stop offset="100%" stopColor={accentColor} />
              </linearGradient>
            </defs>
            <polygon points="100,30 150,70 150,130 100,170 50,130 50,70" 
                     fill={`url(#${gemType}SideGradient)`} stroke={accentColor} strokeWidth="2"/>
            <polygon points="70,70 130,70 135,85 125,100 75,100 65,85" 
                     fill="#ffffff" stroke={accentColor} strokeWidth="1" opacity="0.8"/>
            <path d="M50 70 L100 85 L150 70" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
            <path d="M50 130 L100 115 L150 130" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
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
                <h4 className="text-lg font-semibold">3D Examination</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(Math.min(2, zoom + 0.1))}
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