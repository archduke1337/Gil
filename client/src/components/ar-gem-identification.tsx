import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Scan, Upload, X, Check, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GemIdentificationResult {
  confidence: number;
  gemType: string;
  estimatedValue: string;
  characteristics: string[];
  recommendations: string[];
  technicalData: {
    colorAnalysis: string;
    clarityEstimate: string;
    cutQuality: string;
    estimatedCarat: string;
  };
}

export default function ARGemIdentification() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<GemIdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions or upload an image instead.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  const simulateGemAnalysis = useCallback((): GemIdentificationResult => {
    // Simulated analysis results - in a real app, this would use AI/ML services
    const gemTypes = [
      {
        gemType: "Diamond",
        confidence: 87,
        estimatedValue: "$8,500 - $12,000",
        characteristics: ["Excellent brilliance", "High refractive index", "Minimal inclusions"],
        recommendations: ["Professional certification recommended", "Suitable for engagement ring", "Consider insurance appraisal"],
        technicalData: {
          colorAnalysis: "Near Colorless (H-I)",
          clarityEstimate: "VS1-VS2",
          cutQuality: "Very Good",
          estimatedCarat: "1.15-1.25ct"
        }
      },
      {
        gemType: "Emerald",
        confidence: 82,
        estimatedValue: "$3,200 - $5,800",
        characteristics: ["Vivid green color", "Natural inclusions (jardin)", "Good transparency"],
        recommendations: ["Oil treatment verification needed", "Handle with care", "Avoid ultrasonic cleaning"],
        technicalData: {
          colorAnalysis: "Medium Green",
          clarityEstimate: "SI1-SI2",
          cutQuality: "Good",
          estimatedCarat: "1.8-2.2ct"
        }
      },
      {
        gemType: "Sapphire",
        confidence: 91,
        estimatedValue: "$2,800 - $4,200",
        characteristics: ["Rich blue color", "Excellent clarity", "Good cut proportions"],
        recommendations: ["Heat treatment likely", "Excellent investment piece", "Suitable for daily wear"],
        technicalData: {
          colorAnalysis: "Medium Blue",
          clarityEstimate: "VVS2-VS1",
          cutQuality: "Excellent",
          estimatedCarat: "1.5-1.7ct"
        }
      }
    ];
    
    return gemTypes[Math.floor(Math.random() * gemTypes.length)];
  }, []);

  const performAnalysis = useCallback(async () => {
    setIsScanning(true);
    setScanProgress(0);
    setResult(null);
    setError(null);

    // Simulate progressive scanning
    const progressSteps = [
      { progress: 20, message: "Detecting gemstone..." },
      { progress: 45, message: "Analyzing color properties..." },
      { progress: 65, message: "Evaluating clarity..." },
      { progress: 85, message: "Measuring proportions..." },
      { progress: 100, message: "Generating report..." }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanProgress(step.progress);
    }

    // Generate analysis result
    const analysisResult = simulateGemAnalysis();
    setResult(analysisResult);
    setIsScanning(false);
  }, [simulateGemAnalysis]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setError(null);
      performAnalysis();
    } else {
      setError("Please upload a valid image file.");
    }
  }, [performAnalysis]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setScanProgress(0);
    setIsScanning(false);
    stopCamera();
  }, [stopCamera]);

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AR Gem Identification
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Use your camera or upload an image to identify and analyze gemstones using advanced AI technology.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!result && !isScanning && (
          <div className="space-y-4">
            {/* Camera View */}
            {cameraActive ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg bg-muted"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 border-2 border-primary rounded-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={stopCamera}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Camera not active</p>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-3">
              {!cameraActive ? (
                <Button onClick={startCamera} className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <Button onClick={performAnalysis} className="flex-1">
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Gemstone
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Scan className="w-full h-full text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold">Analyzing Gemstone...</h3>
            </div>
            
            <div className="space-y-2">
              <Progress value={scanProgress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {scanProgress < 20 && "Detecting gemstone..."}
                {scanProgress >= 20 && scanProgress < 45 && "Analyzing color properties..."}
                {scanProgress >= 45 && scanProgress < 65 && "Evaluating clarity..."}
                {scanProgress >= 65 && scanProgress < 85 && "Measuring proportions..."}
                {scanProgress >= 85 && "Generating report..."}
              </p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Check className="w-12 h-12 text-green-500 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold">{result.gemType} Detected</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <Badge variant={result.confidence > 85 ? "default" : "secondary"}>
                    {result.confidence}%
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Estimated Value</h4>
                  <p className="text-lg font-bold text-primary">{result.estimatedValue}</p>
                  
                  <h4 className="font-semibold">Key Characteristics</h4>
                  <ul className="space-y-1">
                    {result.characteristics.map((char, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Technical Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Color:</span>
                      <span>{result.technicalData.colorAnalysis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clarity:</span>
                      <span>{result.technicalData.clarityEstimate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cut:</span>
                      <span>{result.technicalData.cutQuality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carat:</span>
                      <span>{result.technicalData.estimatedCarat}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-green-600 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={reset} variant="outline" className="flex-1">
                  Scan Another
                </Button>
                <Button className="flex-1">
                  Save Report
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}