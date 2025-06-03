import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { gilCertificateSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  FileText, 
  Calendar as CalendarIcon, 
  Diamond, 
  Award,
  Download,
  Eye,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import GILCertificateTemplate from "./gil-certificate-template";



type GILCertificateForm = z.infer<typeof gilCertificateSchema>;

interface GILCertificateGeneratorProps {
  onSuccess: () => void;
}

export default function GILCertificateGenerator({ onSuccess }: GILCertificateGeneratorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateData, setCertificateData] = useState<GILCertificateForm | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<GILCertificateForm>({
    resolver: zodResolver(gilCertificateSchema),
    defaultValues: {
      reportNumber: "",
      reportDate: new Date(),
      shape: "",
      measurements: "",
      caratWeight: "",
      colorGrade: "",
      clarityGrade: "",
      cutGrade: "",
      polish: "",
      symmetry: "",
      fluorescence: "",
      inscription: "",
      comments: "",
      gemologistName: "",
      signatureDate: new Date(),
    },
  });

  const generateReportNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    form.setValue("reportNumber", `G${randomNumber}`);
  };

  const onSubmit = async (data: GILCertificateForm) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportNumber: data.reportNumber,
          reportDate: data.reportDate,
          shape: data.shape,
          measurements: data.measurements,
          caratWeight: data.caratWeight,
          colorGrade: data.colorGrade,
          clarityGrade: data.clarityGrade,
          cutGrade: data.cutGrade,
          polish: data.polish,
          symmetry: data.symmetry,
          fluorescence: data.fluorescence,
          inscription: data.inscription || "",
          comments: data.comments || "",
          gemologistName: data.gemologistName,
          signatureDate: data.signatureDate,
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate certificate");
      }

      setCertificateData(data);
      setShowPreview(true);
      
      toast({
        title: "Success",
        description: "GIL Diamond Certificate generated successfully!",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToPDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      const html2canvas = await import('html2canvas');
      const jsPDF = await import('jspdf');
      
      const canvas = await html2canvas.default(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF.default('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`GIL-Certificate-${certificateData?.reportNumber}.pdf`);
      
      toast({
        title: "Success",
        description: "Certificate exported as PDF successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showPreview && certificateData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-display font-heading text-ultra-smooth">GIL Diamond Certificate Preview</h2>
          <div className="flex space-x-3">
            <Button 
              onClick={exportToPDF}
              className="rounded-2xl text-body font-body text-ultra-smooth"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button 
              onClick={() => setShowPreview(false)}
              variant="outline"
              className="rounded-2xl text-body font-body text-ultra-smooth"
            >
              <Eye className="w-4 h-4 mr-2" />
              Edit Certificate
            </Button>
          </div>
        </div>
        
        <div ref={certificateRef} className="bg-white rounded-3xl overflow-hidden soft-shadow">
          <GILCertificateTemplate 
            data={{
              reportNumber: certificateData.reportNumber,
              reportDate: format(certificateData.reportDate, "MMMM dd, yyyy"),
              shape: certificateData.shape,
              measurements: certificateData.measurements,
              caratWeight: certificateData.caratWeight,
              colorGrade: certificateData.colorGrade,
              clarityGrade: certificateData.clarityGrade,
              cutGrade: certificateData.cutGrade,
              polish: certificateData.polish,
              symmetry: certificateData.symmetry,
              fluorescence: certificateData.fluorescence,
              inscription: certificateData.inscription || `GIL ${certificateData.reportNumber}`,
              comments: certificateData.comments || "Clouds are not shown. Pinpoints are not shown.",
              gemologistName: certificateData.gemologistName,
              signatureDate: format(certificateData.signatureDate, "MMMM dd, yyyy"),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <Card className="rounded-3xl soft-shadow bg-white/80 backdrop-blur-sm border-none">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center space-x-3 text-heading font-heading text-ultra-smooth">
          <Diamond className="w-8 h-8 text-primary" />
          GIL Diamond Grading Certificate Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Header Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-body-lg font-heading text-ultra-smooth">Report Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="reportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">GIL Report Number</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input 
                            placeholder="G2141436895" 
                            {...field} 
                            className="rounded-2xl text-body font-body text-ultra-smooth"
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          onClick={generateReportNumber}
                          variant="outline"
                          className="rounded-2xl text-body-sm font-body text-ultra-smooth"
                        >
                          Generate
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reportDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Report Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal rounded-2xl text-body font-body text-ultra-smooth",
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
            </div>

            {/* Diamond Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Diamond className="w-5 h-5 text-primary" />
                <h3 className="text-body-lg font-heading text-ultra-smooth">Diamond Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="shape"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Shape and Cutting Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select shape" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Round">Round</SelectItem>
                          <SelectItem value="Princess">Princess</SelectItem>
                          <SelectItem value="Emerald">Emerald</SelectItem>
                          <SelectItem value="Asscher">Asscher</SelectItem>
                          <SelectItem value="Oval">Oval</SelectItem>
                          <SelectItem value="Radiant">Radiant</SelectItem>
                          <SelectItem value="Cushion">Cushion</SelectItem>
                          <SelectItem value="Pear">Pear</SelectItem>
                          <SelectItem value="Heart">Heart</SelectItem>
                          <SelectItem value="Marquise">Marquise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="measurements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Measurements (mm)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="7.49 x 7.49 x 5.18" 
                          {...field} 
                          className="rounded-2xl text-body font-body text-ultra-smooth"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Grading Results */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-body-lg font-heading text-ultra-smooth">Grading Results</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="caratWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Carat Weight</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="2.01" 
                          {...field} 
                          className="rounded-2xl text-body font-body text-ultra-smooth"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="colorGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Color Grade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select color" />
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
                          <SelectItem value="K">K (Faint)</SelectItem>
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
                      <FormLabel className="text-body font-body text-ultra-smooth">Clarity Grade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select clarity" />
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
              </div>
            </div>

            {/* Additional Grading Information */}
            <div className="space-y-6">
              <h3 className="text-body-lg font-heading text-ultra-smooth">Additional Grading Information</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="cutGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Cut Grade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select cut" />
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

                <FormField
                  control={form.control}
                  name="polish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Polish</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select polish" />
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

                <FormField
                  control={form.control}
                  name="symmetry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Symmetry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select symmetry" />
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

                <FormField
                  control={form.control}
                  name="fluorescence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Fluorescence</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-2xl text-body font-body text-ultra-smooth">
                            <SelectValue placeholder="Select fluorescence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Faint">Faint</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Strong">Strong</SelectItem>
                          <SelectItem value="Very Strong">Very Strong</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-body-lg font-heading text-ultra-smooth">Additional Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="inscription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Inscription(s)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="GIL G2141436895" 
                          {...field}
                          value={field.value || ""}
                          className="rounded-2xl text-body font-body text-ultra-smooth"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gemologistName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-body text-ultra-smooth">Gemologist Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Dr. Sarah Johnson" 
                          {...field} 
                          className="rounded-2xl text-body font-body text-ultra-smooth"
                        />
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
                    <FormLabel className="text-body font-body text-ultra-smooth">Comments</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Clouds are not shown. Pinpoints are not shown." 
                        {...field}
                        value={field.value || ""}
                        className="rounded-2xl text-body font-body text-ultra-smooth"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signatureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-body font-body text-ultra-smooth">Signature Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal rounded-2xl text-body font-body text-ultra-smooth",
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

            <Button 
              type="submit" 
              disabled={isGenerating}
              className="w-full rounded-2xl text-body font-body text-ultra-smooth"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Upload className="w-5 h-5 mr-2 animate-spin" />
                  Generating Certificate...
                </>
              ) : (
                <>
                  <Diamond className="w-5 h-5 mr-2" />
                  Generate GIL Certificate
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}