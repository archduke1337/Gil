import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Camera, Smartphone, RotateCcw, ZoomIn, Sun, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface GemVisualization {
  shape: string;
  size: number[];
  lighting: string;
  environment: string;
  rotation: number[];
}

export default function ARVisualization() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedGem, setSelectedGem] = useState("diamond");
  const [visualization, setVisualization] = useState<GemVisualization>({
    shape: "round",
    size: [1.0],
    lighting: "daylight",
    environment: "studio",
    rotation: [0]
  });

  const gemTypes = [
    { value: "diamond", label: "Diamond", color: "bg-gray-100" },
    { value: "ruby", label: "Ruby", color: "bg-red-100" },
    { value: "sapphire", label: "Sapphire", color: "bg-blue-100" },
    { value: "emerald", label: "Emerald", color: "bg-green-100" }
  ];

  const shapes = [
    "Round", "Princess", "Emerald", "Oval", "Marquise", "Pear", "Cushion", "Heart"
  ];

  const lightingConditions = [
    "Daylight", "Fluorescent", "LED", "Incandescent", "Natural Sunlight"
  ];

  const environments = [
    "Studio", "Ring Setting", "Necklace", "Earrings", "Raw Stone"
  ];

  const activateAR = () => {
    setIsARActive(true);
    // In a real implementation, this would initialize the device camera
    // and AR frameworks like AR.js, Three.js, or WebXR
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Camera className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Augmented Reality Gem Visualization</h3>
            </div>

            {!isARActive ? (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl p-8">
                  <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Experience Gems in AR</h4>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Visualize gemstones in real-world environments using your device's camera. 
                    See how different cuts, sizes, and settings would look in person.
                  </p>
                  <Button onClick={activateAR} size="lg" className="w-full max-w-xs">
                    <Camera className="w-4 h-4 mr-2" />
                    Start AR Experience
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-semibold">Gem Selection</h5>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gemstone Type</label>
                      <Select value={selectedGem} onValueChange={setSelectedGem}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {gemTypes.map(gem => (
                            <SelectItem key={gem.value} value={gem.value}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${gem.color}`}></div>
                                <span>{gem.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Shape</label>
                      <Select value={visualization.shape} onValueChange={(value) => 
                        setVisualization(prev => ({ ...prev, shape: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {shapes.map(shape => (
                            <SelectItem key={shape.toLowerCase()} value={shape.toLowerCase()}>
                              {shape}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Size: {visualization.size[0]} carat
                      </label>
                      <Slider
                        value={visualization.size}
                        onValueChange={(value) => 
                          setVisualization(prev => ({ ...prev, size: value }))
                        }
                        max={5.0}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold">Environment Settings</h5>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lighting</label>
                      <Select value={visualization.lighting} onValueChange={(value) => 
                        setVisualization(prev => ({ ...prev, lighting: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {lightingConditions.map(light => (
                            <SelectItem key={light.toLowerCase()} value={light.toLowerCase()}>
                              {light}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Setting</label>
                      <Select value={visualization.environment} onValueChange={(value) => 
                        setVisualization(prev => ({ ...prev, environment: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {environments.map(env => (
                            <SelectItem key={env.toLowerCase()} value={env.toLowerCase()}>
                              {env}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Rotation: {visualization.rotation[0]}°
                      </label>
                      <Slider
                        value={visualization.rotation}
                        onValueChange={(value) => 
                          setVisualization(prev => ({ ...prev, rotation: value }))
                        }
                        max={360}
                        min={0}
                        step={15}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h6 className="font-semibold mb-2">AR Features</h6>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-primary" />
                      <span>Real-time rendering</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-primary" />
                      <span>Dynamic lighting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4 text-primary" />
                      <span>360° rotation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ZoomIn className="w-4 h-4 text-primary" />
                      <span>Scale adjustment</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold mb-2">AR Camera View</p>
                    <p className="text-sm opacity-75">Move your device to place the gem</p>
                  </div>
                  
                  {/* Simulated AR overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border-4 border-primary rounded-full opacity-30"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${
                          gemTypes.find(g => g.value === selectedGem)?.color || "bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                    <Button size="sm" variant="outline">
                      <ZoomIn className="w-4 h-4 mr-1" />
                      Zoom
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm">Capture</Button>
                    <Button size="sm" variant="outline" onClick={() => setIsARActive(false)}>
                      Exit AR
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span>Current: {selectedGem.charAt(0).toUpperCase() + selectedGem.slice(1)}</span>
                    <span>Size: {visualization.size[0]} ct</span>
                    <span>Shape: {visualization.shape.charAt(0).toUpperCase() + visualization.shape.slice(1)}</span>
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