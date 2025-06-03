import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Eye, FileText, Gem, Settings, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/1000119055-removebg-preview.png";

const certificateSchema = z.object({
  referenceNumber: z.string().min(1, "Reference number is required"),
  gemType: z.string().min(1, "Gem type is required"),
  shape: z.string().min(1, "Shape is required"),
  dimensions: z.string().min(1, "Dimensions are required"),
  caratWeight: z.string().min(1, "Carat weight is required"),
  colorGrade: z.string().min(1, "Color grade is required"),
  clarityGrade: z.string().min(1, "Clarity grade is required"),
  cutGrade: z.string().min(1, "Cut grade is required"),
  treatment: z.string().optional(),
  origin: z.string().optional(),
  comments: z.string().optional(),
  certificationDate: z.date(),
  examinedBy: z.string().min(1, "Examiner name is required"),
  approvedBy: z.string().min(1, "Approver name is required"),
});

type CertificateForm = z.infer<typeof certificateSchema>;

interface CertificateGeneratorProps {
  onSuccess: () => void;
}

export default function CertificateGenerator({ onSuccess }: CertificateGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<CertificateForm | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<CertificateForm>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      referenceNumber: `GIL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      certificationDate: new Date(),
      treatment: "None",
      origin: "Natural",
    },
  });

  const onSubmit = async (data: CertificateForm) => {
    setIsGenerating(true);
    try {
      // Generate certificate data
      setGeneratedCertificate(data);
      setPreviewMode(true);
      
      toast({
        title: "Certificate Generated",
        description: "Certificate preview is ready for review",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate certificate",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCertificate = async () => {
    if (!generatedCertificate) return;
    
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceNumber: generatedCertificate.referenceNumber,
          gemType: generatedCertificate.gemType,
          shape: generatedCertificate.shape,
          dimensions: generatedCertificate.dimensions,
          caratWeight: parseFloat(generatedCertificate.caratWeight),
          colorGrade: generatedCertificate.colorGrade,
          clarityGrade: generatedCertificate.clarityGrade,
          cutGrade: generatedCertificate.cutGrade,
          treatment: generatedCertificate.treatment,
          origin: generatedCertificate.origin,
          comments: generatedCertificate.comments,
          certificationDate: generatedCertificate.certificationDate.toISOString(),
          examinedBy: generatedCertificate.examinedBy,
          approvedBy: generatedCertificate.approvedBy,
          isActive: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to save certificate");

      toast({
        title: "Certificate Saved",
        description: "Certificate has been saved to the database",
      });
      
      onSuccess();
      setPreviewMode(false);
      form.reset();
      setGeneratedCertificate(null);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save certificate to database",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = () => {
    if (typeof window !== 'undefined' && certificateRef.current) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>GIL Certificate - ${generatedCertificate?.referenceNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .certificate { max-width: 800px; margin: 0 auto; }
                .no-print { display: none; }
                @media print {
                  body { margin: 0; }
                  .certificate { max-width: none; }
                }
              </style>
            </head>
            <body>
              ${certificateRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (previewMode && generatedCertificate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">Certificate Preview</h3>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setPreviewMode(false)}>
              Edit Certificate
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleSaveCertificate} className="bg-primary">
              <FileText className="w-4 h-4 mr-2" />
              Save Certificate
            </Button>
          </div>
        </div>

        <div ref={certificateRef} className="bg-[#f5f2ed] w-full max-w-4xl mx-auto" style={{ aspectRatio: '1.4/1', minHeight: '800px' }}>
          {/* Certificate Layout */}
          <div className="grid grid-cols-12 h-full">
            {/* Left Column */}
            <div className="col-span-5 p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-[#8b6f47] flex items-center justify-center bg-white">
                  <img src={logoPath} alt="GIL" className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#8b6f47]">GIL</h1>
                </div>
              </div>

              {/* Report Header */}
              <div className="bg-[#8b6f47] text-white p-3 text-center">
                <h2 className="text-sm font-bold">GIL NATURAL DIAMOND GRADING REPORT</h2>
              </div>

              {/* Basic Information */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">{format(generatedCertificate.certificationDate, "MMMM dd, yyyy")}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">GIL Report Number</span>
                  <span className="font-semibold">{generatedCertificate.referenceNumber}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Shape and Cutting Style</span>
                  <span className="font-semibold">{generatedCertificate.shape}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Measurements</span>
                  <span className="font-semibold">{generatedCertificate.dimensions} mm</span>
                </div>
              </div>

              {/* Grading Result */}
              <div className="bg-[#8b6f47] text-white p-3">
                <h3 className="text-sm font-bold">GRADING RESULT</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Carat Weight</span>
                  <span className="font-bold text-lg">{generatedCertificate.caratWeight} carat</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Color Grade</span>
                  <span className="font-bold text-lg">{generatedCertificate.colorGrade}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Clarity Grade</span>
                  <span className="font-bold text-lg">{generatedCertificate.clarityGrade}</span>
                </div>
              </div>

              {/* Additional Grading Information */}
              <div className="bg-[#8b6f47] text-white p-3">
                <h3 className="text-sm font-bold">ADDITIONAL GRADING INFORMATION</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Polish</span>
                  <span className="font-semibold">Excellent</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Symmetry</span>
                  <span className="font-semibold">Excellent</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Fluorescence</span>
                  <span className="font-semibold">Faint</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span className="text-gray-600">Inscription(s)</span>
                  <span className="font-semibold">GIL {generatedCertificate.referenceNumber}</span>
                </div>
                
                {generatedCertificate.comments && (
                  <div className="text-xs text-gray-600 mt-2">
                    <p className="font-semibold">Comments:</p>
                    <p>{generatedCertificate.comments}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Column */}
            <div className="col-span-4 p-6">
              {/* Report Number */}
              <div className="text-right mb-4">
                <h2 className="text-sm font-bold text-gray-600">GIL REPORT</h2>
                <h1 className="text-2xl font-bold text-gray-800">{generatedCertificate.referenceNumber}</h1>
                <p className="text-xs text-gray-500">Verify this report at gilgem.com</p>
              </div>

              {/* Additional Information */}
              <div className="bg-[#8b6f47] text-white p-2 text-center mb-4">
                <h3 className="text-xs font-bold">ADDITIONAL INFORMATION</h3>
              </div>

              {/* Proportions Diagram */}
              <div className="bg-white border border-gray-300 p-4 mb-4">
                <div className="text-center">
                  <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                    {/* Crown */}
                    <polygon points="100,20 70,60 130,60" fill="none" stroke="#333" strokeWidth="1"/>
                    <polygon points="70,60 50,50 85,50" fill="none" stroke="#333" strokeWidth="1"/>
                    <polygon points="130,60 150,50 115,50" fill="none" stroke="#333" strokeWidth="1"/>
                    
                    {/* Girdle */}
                    <line x1="50" y1="60" x2="150" y2="60" stroke="#333" strokeWidth="2"/>
                    
                    {/* Pavilion */}
                    <polygon points="70,60 100,100 130,60" fill="none" stroke="#333" strokeWidth="1"/>
                    <polygon points="70,60 50,70 85,70" fill="none" stroke="#333" strokeWidth="1"/>
                    <polygon points="130,60 150,70 115,70" fill="none" stroke="#333" strokeWidth="1"/>
                    
                    {/* Measurements */}
                    <text x="30" y="35" fontSize="8" fill="#666">50%</text>
                    <text x="30" y="50" fontSize="8" fill="#666">16.0%</text>
                    <text x="30" y="85" fontSize="8" fill="#666">80%</text>
                    <text x="165" y="35" fontSize="8" fill="#666">57%</text>
                    <text x="165" y="50" fontSize="8" fill="#666">35.0°</text>
                    <text x="165" y="75" fontSize="8" fill="#666">41.0°</text>
                  </svg>
                  <p className="text-xs text-gray-600 mt-2">Profile to actual proportions</p>
                </div>
              </div>

              {/* Diamond Diagram */}
              <div className="bg-white border border-gray-300 p-4">
                <div className="text-center">
                  <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                    {/* Top view */}
                    <circle cx="30" cy="40" r="25" fill="none" stroke="#333" strokeWidth="1"/>
                    <polygon points="30,20 20,30 40,30" fill="none" stroke="#333" strokeWidth="0.5"/>
                    <polygon points="30,60 20,50 40,50" fill="none" stroke="#333" strokeWidth="0.5"/>
                    <line x1="15" y1="40" x2="45" y2="40" stroke="#333" strokeWidth="0.5"/>
                    <line x1="30" y1="15" x2="30" y2="65" stroke="#333" strokeWidth="0.5"/>
                    
                    {/* Side view */}
                    <polygon points="90,25 75,40 90,55 105,40" fill="none" stroke="#333" strokeWidth="1"/>
                    <polygon points="90,25 85,35 95,35" fill="none" stroke="#333" strokeWidth="0.5"/>
                    <polygon points="90,55 85,45 95,45" fill="none" stroke="#333" strokeWidth="0.5"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-3 p-6">
              {/* Facsimile */}
              <div className="text-right text-xs text-gray-500 mb-8">
                <p className="font-bold">FACSIMILE</p>
                <p className="text-[8px] leading-tight">This is a digital representation of the original GIL Report. This representation might not be accepted in lieu of the original GIL Report in certain circumstances. The original GIL Report includes security features which are not reproducible on this facsimile.</p>
              </div>

              {/* Grading Scales */}
              <div className="bg-[#8b6f47] text-white p-2 text-center mb-2">
                <h3 className="text-xs font-bold">GRADING SCALES</h3>
              </div>

              {/* Color and Clarity Scales */}
              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-bold mb-1">COLORLESS</p>
                  <div className="flex gap-1">
                    <span className="bg-gray-200 px-1">D</span>
                    <span className="bg-gray-200 px-1">E</span>
                    <span className="bg-gray-200 px-1">F</span>
                  </div>
                </div>
                
                <div>
                  <p className="font-bold mb-1">NEAR COLORLESS</p>
                  <div className="flex gap-1">
                    <span className="bg-gray-200 px-1">G</span>
                    <span className="bg-gray-200 px-1">H</span>
                    <span className="bg-gray-200 px-1">I</span>
                    <span className="bg-gray-200 px-1">J</span>
                  </div>
                </div>

                <div>
                  <p className="font-bold mb-1">FAINT YELLOW</p>
                  <div className="flex gap-1">
                    <span className="bg-gray-200 px-1">K</span>
                    <span className="bg-gray-200 px-1">L</span>
                    <span className="bg-gray-200 px-1">M</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-bold mb-1">CLARITY</p>
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <span className="bg-gray-200 px-1 text-[8px]">FL</span>
                      <span className="bg-gray-200 px-1 text-[8px]">IF</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="bg-gray-200 px-1 text-[8px]">VVS1</span>
                      <span className="bg-gray-200 px-1 text-[8px]">VVS2</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="bg-gray-200 px-1 text-[8px]">VS1</span>
                      <span className="bg-gray-200 px-1 text-[8px]">VS2</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="bg-gray-200 px-1 text-[8px]">SI1</span>
                      <span className="bg-gray-200 px-1 text-[8px]">SI2</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="bg-gray-200 px-1 text-[8px]">I1</span>
                      <span className="bg-gray-200 px-1 text-[8px]">I2</span>
                      <span className="bg-gray-200 px-1 text-[8px]">I3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom sections */}
              <div className="mt-8">
                <div className="bg-[#8b6f47] text-white p-2 text-center mb-2">
                  <h3 className="text-xs font-bold">CLARITY CHARACTERISTICS</h3>
                </div>
                
                <div className="flex justify-center gap-4 my-4">
                  <svg width="40" height="30" viewBox="0 0 40 30">
                    <polygon points="20,5 10,15 30,15 20,25" fill="none" stroke="#333" strokeWidth="1"/>
                  </svg>
                  <svg width="40" height="30" viewBox="0 0 40 30">
                    <circle cx="20" cy="15" r="10" fill="none" stroke="#333" strokeWidth="1"/>
                  </svg>
                </div>

                {/* GIL Logo */}
                <div className="text-center my-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#8b6f47] flex items-center justify-center mx-auto">
                    <img src={logoPath} alt="GIL" className="w-8 h-8" />
                  </div>
                </div>

                {/* Footer text */}
                <div className="text-[8px] text-gray-600 text-center space-y-1">
                  <p>@gilgem.com</p>
                  <div className="w-16 h-16 bg-gray-300 mx-auto mb-2"></div>
                  <p className="leading-tight">The results documented in this report refer only to the diamond described and were obtained using the techniques and equipment used by GIL at the time of examination.</p>
                  <p className="leading-tight">This certificate is void if altered and duplications are subject to applicable law. © 2025 Gemological Institute of America.</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-3 h-3 bg-gray-400"></div>
                    <span className="text-[6px]">SECURITY FEATURES: Electronic certificate is independently verified. Security screening against watch lists for known problem diamonds. Chain of custody protocol.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Certificate Generator</h3>
          <p className="text-muted-foreground">Create professional gemological certificates</p>
        </div>
      </div>

      <Card className="border-0 rounded-2xl soft-shadow bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-ultra-smooth">
            <FileText className="w-5 h-5 text-primary" />
            Certificate Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="referenceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ultra-smooth">Reference Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="GIL-2024-123456" className="rounded-xl border-0 bg-white/50 backdrop-blur-sm soft-shadow" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="certificationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ultra-smooth">Certification Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal rounded-xl border-0 bg-white/50 backdrop-blur-sm soft-shadow",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

              {/* Gem Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 text-ultra-smooth">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                    <Gem className="w-4 h-4 text-primary" />
                  </div>
                  Gemstone Details
                </h4>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="gemType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ultra-smooth">Gem Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-0 bg-white/50 backdrop-blur-sm soft-shadow">
                              <SelectValue placeholder="Select gem type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                            <SelectItem value="Diamond">Diamond</SelectItem>
                            <SelectItem value="Ruby">Ruby</SelectItem>
                            <SelectItem value="Sapphire">Sapphire</SelectItem>
                            <SelectItem value="Emerald">Emerald</SelectItem>
                            <SelectItem value="Tanzanite">Tanzanite</SelectItem>
                            <SelectItem value="Garnet">Garnet</SelectItem>
                            <SelectItem value="Amethyst">Amethyst</SelectItem>
                            <SelectItem value="Aquamarine">Aquamarine</SelectItem>
                            <SelectItem value="Topaz">Topaz</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shape"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ultra-smooth">Shape</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-0 bg-white/50 backdrop-blur-sm soft-shadow">
                              <SelectValue placeholder="Select shape" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-0 bg-white/95 backdrop-blur-sm soft-shadow">
                            <SelectItem value="Round">Round</SelectItem>
                            <SelectItem value="Oval">Oval</SelectItem>
                            <SelectItem value="Emerald">Emerald</SelectItem>
                            <SelectItem value="Princess">Princess</SelectItem>
                            <SelectItem value="Cushion">Cushion</SelectItem>
                            <SelectItem value="Pear">Pear</SelectItem>
                            <SelectItem value="Marquise">Marquise</SelectItem>
                            <SelectItem value="Heart">Heart</SelectItem>
                            <SelectItem value="Asscher">Asscher</SelectItem>
                            <SelectItem value="Radiant">Radiant</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="caratWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carat Weight</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1.25" type="number" step="0.01" />
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
                      <FormLabel>Dimensions (mm)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="6.52 x 6.48 x 4.05" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Grading Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Grading Details
                </h4>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="colorGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color Grade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select color grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="D">D (Colorless)</SelectItem>
                            <SelectItem value="E">E (Colorless)</SelectItem>
                            <SelectItem value="F">F (Colorless)</SelectItem>
                            <SelectItem value="G">G (Near Colorless)</SelectItem>
                            <SelectItem value="H">H (Near Colorless)</SelectItem>
                            <SelectItem value="I">I (Near Colorless)</SelectItem>
                            <SelectItem value="J">J (Near Colorless)</SelectItem>
                            <SelectItem value="K">K (Faint Yellow)</SelectItem>
                            <SelectItem value="L">L (Faint Yellow)</SelectItem>
                            <SelectItem value="M">M (Faint Yellow)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clarityGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clarity Grade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select clarity grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cutGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cut Grade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cut grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Very Good">Very Good</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="treatment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treatment</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="None, Heat Treatment, etc." />
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
                        <FormLabel>Origin</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Natural, Synthetic, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Additional observations or notes..." rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Certification Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Certification Details</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="examinedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Examined By</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Gemologist name" />
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
                        <FormLabel>Approved By</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Laboratory director name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPreviewMode(true);
                    setGeneratedCertificate(form.getValues());
                  }}
                  disabled={!form.formState.isValid}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Certificate
                </Button>
                <Button type="submit" disabled={isGenerating} className="bg-primary">
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Certificate
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}