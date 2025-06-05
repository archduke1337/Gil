import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  FileText, 
  Calendar as CalendarIcon, 
  Settings, 
  Sparkles, 
  Diamond, 
  Award,
  Microscope,
  Shield,
  Download,
  Eye,
  Palette,
  Gem,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/1000119055-removebg-preview.png";
import ProfessionalCertificateTemplate from "./professional-certificate-template";
import GILCertificateTemplate from "./gil-certificate-template";

const certificateSchema = z.object({
  reportNumber: z.string().min(1, "Report number is required").regex(/^G\d{10}$/, "Report number must follow format: G followed by 10 digits (e.g., G2141436895)"),
  reportDate: z.date({ required_error: "Report date is required" }),
  shape: z.string().min(1, "Shape and cutting style is required"),
  measurements: z.string().min(1, "Measurements are required").regex(/^\d+\.?\d*\s*x\s*\d+\.?\d*\s*x\s*\d+\.?\d*$/, "Measurements must be in format: L x W x H (e.g., 7.49 x 7.49 x 5.18)"),
  caratWeight: z.string().min(1, "Carat weight is required").refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Carat weight must be a positive number"),
  colorGrade: z.string().min(1, "Color grade is required"),
  clarityGrade: z.string().min(1, "Clarity grade is required"),
  cutGrade: z.string().min(1, "Cut grade is required"),
  polish: z.string().min(1, "Polish is required"),
  symmetry: z.string().min(1, "Symmetry is required"),
  fluorescence: z.string().min(1, "Fluorescence is required"),
  inscription: z.string().optional(),
  comments: z.string().optional(),
  gemologistName: z.string().min(1, "Gemologist name is required"),
  signatureDate: z.date({ required_error: "Signature date is required" }),
  labLocation: z.string().optional(),
  equipmentUsed: z.string().optional(),
  tablePercentage: z.string().optional(),
  depthPercentage: z.string().optional(),
  crownAngle: z.string().optional(),
  pavilionAngle: z.string().optional(),
  gemImage: z.any().optional(),
});

type CertificateForm = z.infer<typeof certificateSchema>;

interface CertificateGeneratorProps {
  onSuccess: () => void;
}

export default function CertificateGenerator({ onSuccess }: CertificateGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<CertificateForm | null>(null);
  const [gemImageFile, setGemImageFile] = useState<File | null>(null);
  const [gemImagePreview, setGemImagePreview] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<CertificateForm>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      reportNumber: `G${String(Date.now()).slice(-10)}`,
      reportDate: new Date(),
      signatureDate: new Date(),
      polish: "Excellent",
      symmetry: "Excellent", 
      fluorescence: "None",
      inscription: "",
      tablePercentage: "57%",
      depthPercentage: "62.3%",
      crownAngle: "34.5°",
      pavilionAngle: "40.8°",
      gemologistName: "Dr. Sarah Johnson",
      labLocation: "GIL Headquarters",
      equipmentUsed: "Gemological microscope, spectroscopy, precision scale",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGemImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setGemImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CertificateForm) => {
    setIsGenerating(true);
    try {
      // Transform form data to match database schema
      const certificateData = {
        reportNumber: data.reportNumber,
        reportDate: data.reportDate.toISOString(),
        shape: data.shape,
        measurements: data.measurements,
        caratWeight: data.caratWeight,
        colorGrade: data.colorGrade,
        clarityGrade: data.clarityGrade,
        cutGrade: data.cutGrade,
        polish: data.polish || "Excellent",
        symmetry: data.symmetry || "Excellent",
        fluorescence: data.fluorescence || "None",
        inscription: data.inscription || "",
        comments: data.comments || "",
        gemologistName: data.gemologistName,
        signatureDate: data.signatureDate.toISOString(),
        labLocation: data.labLocation || "GIL Headquarters",
        equipmentUsed: data.equipmentUsed || "Gemological microscope, spectroscopy, precision scale",
        tablePercentage: data.tablePercentage || "57%",
        depthPercentage: data.depthPercentage || "62.3%",
        crownAngle: data.crownAngle || "34.5°",
        pavilionAngle: data.pavilionAngle || "40.8°",
        gemType: "Diamond",
        isActive: true,
      };

      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create certificate");
      }

      const certificate = await response.json();
      setGeneratedCertificate(data);
      
      toast({
        title: "Certificate Generated Successfully", 
        description: `Certificate ${data.reportNumber} has been created and saved to the database.`,
      });

      onSuccess();
    } catch (error) {
      console.error("Certificate generation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCertificate = () => {
    if (!certificateRef.current) return;
    
    const element = certificateRef.current;
    window.print();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Enhanced Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-3xl flex items-center justify-center soft-shadow">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-display font-heading text-foreground text-ultra-smooth mb-2">Professional Certificate Generator</h1>
              <p className="text-body-lg font-body text-muted-foreground text-ultra-smooth">Create industry-standard gemological certification reports</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-sm soft-shadow"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-body-sm font-body text-foreground text-ultra-smooth">GIA Standards</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-sm soft-shadow"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <span className="text-body-sm font-body text-foreground text-ultra-smooth">Professional Format</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-sm soft-shadow"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <span className="text-body-sm font-body text-foreground text-ultra-smooth">Digital Verification</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-sm soft-shadow"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <span className="text-body-sm font-body text-foreground text-ultra-smooth">Instant Download</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Certificate Generator Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border border-border rounded-3xl soft-shadow bg-card backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-ultra-smooth text-foreground">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                Certificate Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Basic Information Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Diamond className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-heading-md font-heading text-foreground text-ultra-smooth">Basic Gem Information</h3>
                        <p className="text-body-sm font-body text-muted-foreground text-ultra-smooth">Essential gemstone identification details</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="reportNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-body text-foreground">Report Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="G2141436895" className="rounded-xl border border-input bg-background/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="reportDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Report Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 rounded-xl border-0 bg-white/90 backdrop-blur-sm soft-shadow">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="shape"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Shape</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="Round Brilliant">Round Brilliant</SelectItem>
                                  <SelectItem value="Princess">Princess</SelectItem>
                                  <SelectItem value="Emerald">Emerald</SelectItem>
                                  <SelectItem value="Asscher">Asscher</SelectItem>
                                  <SelectItem value="Cushion">Cushion</SelectItem>
                                  <SelectItem value="Oval">Oval</SelectItem>
                                  <SelectItem value="Radiant">Radiant</SelectItem>
                                  <SelectItem value="Pear">Pear</SelectItem>
                                  <SelectItem value="Heart">Heart</SelectItem>
                                  <SelectItem value="Marquise">Marquise</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="caratWeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Carat Weight</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="1.25" type="number" step="0.001" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="dimensions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ultra-smooth font-medium">Dimensions (mm)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="6.52 x 6.48 x 4.05" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Gem Photo Upload Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="col-span-full"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-indigo-600/30 rounded-xl flex items-center justify-center">
                          <Diamond className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground text-ultra-smooth">Gem Photography</h4>
                          <p className="text-sm text-muted-foreground">Upload a high-quality image of the gemstone</p>
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                        <div className="text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="gem-image-upload"
                          />
                          <label
                            htmlFor="gem-image-upload"
                            className="cursor-pointer flex flex-col items-center gap-4"
                          >
                            {gemImagePreview ? (
                              <div className="relative">
                                <img
                                  src={gemImagePreview}
                                  alt="Gem preview"
                                  className="w-32 h-32 object-cover rounded-2xl border-2 border-primary/30"
                                />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="w-32 h-32 border-2 border-dashed border-primary/40 rounded-2xl flex items-center justify-center bg-white/50">
                                <Diamond className="w-12 h-12 text-primary/60" />
                              </div>
                            )}
                            <div className="text-center">
                              <p className="text-sm font-medium text-foreground">
                                {gemImagePreview ? "Click to change image" : "Click to upload gem image"}
                              </p>
                              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <Separator className="my-8" />

                  {/* Professional Grading Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl flex items-center justify-center">
                        <Settings className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground text-ultra-smooth">Professional Grading Assessment</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive gemological evaluation</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="colorGrade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium flex items-center gap-2">
                              <Palette className="w-4 h-4" />
                              Color Grade
                            </FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select color grade" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="D">D (Colorless)</SelectItem>
                                  <SelectItem value="E">E (Colorless)</SelectItem>
                                  <SelectItem value="F">F (Colorless)</SelectItem>
                                  <SelectItem value="G">G (Near Colorless)</SelectItem>
                                  <SelectItem value="H">H (Near Colorless)</SelectItem>
                                  <SelectItem value="I">I (Near Colorless)</SelectItem>
                                  <SelectItem value="J">J (Near Colorless)</SelectItem>
                                  <SelectItem value="K">K (Faint)</SelectItem>
                                  <SelectItem value="L">L (Faint)</SelectItem>
                                  <SelectItem value="M">M (Faint)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clarityGrade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Clarity Grade
                            </FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select clarity grade" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="FL">FL (Flawless)</SelectItem>
                                  <SelectItem value="IF">IF (Internally Flawless)</SelectItem>
                                  <SelectItem value="VVS1">VVS1 (Very Very Slightly Included)</SelectItem>
                                  <SelectItem value="VVS2">VVS2 (Very Very Slightly Included)</SelectItem>
                                  <SelectItem value="VS1">VS1 (Very Slightly Included)</SelectItem>
                                  <SelectItem value="VS2">VS2 (Very Slightly Included)</SelectItem>
                                  <SelectItem value="SI1">SI1 (Slightly Included)</SelectItem>
                                  <SelectItem value="SI2">SI2 (Slightly Included)</SelectItem>
                                  <SelectItem value="I1">I1 (Included)</SelectItem>
                                  <SelectItem value="I2">I2 (Included)</SelectItem>
                                  <SelectItem value="I3">I3 (Included)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cutGrade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium flex items-center gap-2">
                              <Gem className="w-4 h-4" />
                              Cut Grade
                            </FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select cut grade" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="Excellent">Excellent</SelectItem>
                                  <SelectItem value="Very Good">Very Good</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="polish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Polish</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select polish grade" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="Excellent">Excellent</SelectItem>
                                  <SelectItem value="Very Good">Very Good</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="symmetry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Symmetry</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select symmetry grade" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="Excellent">Excellent</SelectItem>
                                  <SelectItem value="Very Good">Very Good</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fluorescence"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Fluorescence</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12">
                                  <SelectValue placeholder="Select fluorescence" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                                  <SelectItem value="None">None</SelectItem>
                                  <SelectItem value="Faint">Faint</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="Strong">Strong</SelectItem>
                                  <SelectItem value="Very Strong">Very Strong</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Technical Measurements Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Microscope className="w-5 h-5 text-blue-600" />
                        <h5 className="text-lg font-semibold text-foreground">Technical Measurements</h5>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="tablePercentage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-ultra-smooth font-medium">Table %</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="57%" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="depthPercentage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-ultra-smooth font-medium">Depth %</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="62.3%" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="crownAngle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-ultra-smooth font-medium">Crown Angle</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="34.5°" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pavilionAngle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-ultra-smooth font-medium">Pavilion Angle</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="40.8°" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="treatment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Treatment</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="None detected, Heat treatment, etc." className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="origin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Origin</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Natural, Synthetic, etc." className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="inscription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ultra-smooth font-medium">Laser Inscription</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Girdle inscription or reference number" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ultra-smooth font-medium">Professional Comments</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Additional observations, notes, or remarks about the gemstone..." rows={4} className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <Separator className="my-8" />

                  {/* Certification Details Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl flex items-center justify-center">
                        <Layers className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground text-ultra-smooth">Certification Details</h3>
                        <p className="text-sm text-muted-foreground">Laboratory and examiner information</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="examinedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Examined By</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Certified Gemologist Name" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="approvedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Approved By</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Senior Gemologist Name" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="labLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Laboratory Location</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="GIL Headquarters" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="equipmentUsed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ultra-smooth font-medium">Equipment Used</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Microscope, spectroscopy, precision scale" className="rounded-xl border-0 bg-white/60 backdrop-blur-sm soft-shadow h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mt-8 border border-primary/20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-foreground mb-2">Ready to Generate Certificate</h4>
                        <p className="text-muted-foreground">Click below to create your professional gemological certificate</p>
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isGenerating}
                        size="lg"
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-6 px-16 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 min-w-[320px] h-20 text-xl border-2 border-amber-700"
                      >
                        {isGenerating ? (
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Generating Certificate...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <Sparkles className="w-7 h-7" />
                            <span>Generate Professional Certificate</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Certificate Preview (when generated) */}
        {generatedCertificate && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <Card className="border-0 rounded-3xl soft-shadow bg-white">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-ultra-smooth flex items-center justify-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  Generated Certificate Preview
                </CardTitle>
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={downloadCertificate} className="rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ProfessionalCertificateTemplate
                  ref={certificateRef}
                  data={{
                    ...generatedCertificate,
                    polish: generatedCertificate.polish || "Excellent",
                    symmetry: generatedCertificate.symmetry || "Excellent",
                    fluorescence: generatedCertificate.fluorescence || "None",
                    treatment: generatedCertificate.treatment || "None detected",
                    origin: generatedCertificate.origin || "Natural",
                    inscription: generatedCertificate.inscription || "",
                    comments: generatedCertificate.comments || "",
                    labLocation: generatedCertificate.labLocation || "GIL Headquarters",
                    equipmentUsed: generatedCertificate.equipmentUsed || "Gemological microscope, spectroscopy, precision scale",
                    tablePercentage: generatedCertificate.tablePercentage || "57%",
                    depthPercentage: generatedCertificate.depthPercentage || "62.3%",
                    crownAngle: generatedCertificate.crownAngle || "34.5°",
                    pavilionAngle: generatedCertificate.pavilionAngle || "40.8°"
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}