import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gilCertificateSchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Gem, FileCheck, ShieldCheck, QrCode, Eye, Download, Sparkles, Diamond, FileText, Clipboard, Award } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import GILCertificateTemplate from "./gil-certificate-template";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type GILCertificateForm = z.infer<typeof gilCertificateSchema>;

interface EnhancedGILCertificateGeneratorProps {
  onSuccess: () => void;
}

export default function EnhancedGILCertificateGenerator({ onSuccess }: EnhancedGILCertificateGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<GILCertificateForm | null>(null);
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
      isActive: true,
      digitallySignedBy: false,
      colorGradeDiagram: false,
      clarityPlotDiagram: false,
      certificateNotes: "",
      verifierUrl: "https://gilab.info/verify",
    },
  });

  const generateReportNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    form.setValue("reportNumber", `G${randomNumber}`);
  };

  const handlePreview = () => {
    const data = form.getValues();
    const formattedData = {
      ...data,
      reportDate: data.reportDate instanceof Date ? data.reportDate.toISOString().split('T')[0] : data.reportDate,
      signatureDate: data.signatureDate instanceof Date ? data.signatureDate.toISOString().split('T')[0] : data.signatureDate,
    };
    setPreviewData(formattedData);
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('certificate-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`GIL-Certificate-${previewData?.reportNumber}.pdf`);
      
      toast({
        title: "Certificate Downloaded",
        description: "PDF certificate has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: GILCertificateForm) => {
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate certificate");
      }

      const result = await response.json();
      
      toast({
        title: "Certificate Generated Successfully",
        description: `Certificate ${data.reportNumber} has been created and saved.`,
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Certificate generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate certificate",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const fluorescenceOptions = ["None", "Faint", "Medium", "Strong", "Very Strong"];

  if (showPreview && previewData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-amber-600" />
            <h2 className="text-2xl font-semibold text-body">Certificate Preview</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleDownloadPDF}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(false)}
            >
              Back to Editor
            </Button>
          </div>
        </div>
        
        <div id="certificate-preview">
          <GILCertificateTemplate data={previewData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg mb-6">
            <Diamond className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-3">
            GIL Diamond Certificate Generator
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Professional diamond grading report with digital verification
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Report Information Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-2xl text-slate-800">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="reportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Report Number</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input 
                            placeholder="G1234567890" 
                            {...field}
                            className="rounded-xl"
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateReportNumber}
                          className="rounded-xl"
                        >
                          <Sparkles className="h-4 w-4" />
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
                      <FormLabel className="text-body font-semibold">Report Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full rounded-xl pl-3 text-left font-normal",
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

                <FormField
                  control={form.control}
                  name="verifierUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Verifier URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://gilab.info/verify" 
                          {...field}
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Diamond Specifications Section */}
          <Card className="border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2">
                <Gem className="h-5 w-5 text-blue-600" />
                <span>Diamond Specifications</span>
              </CardTitle>
              <CardDescription>Physical characteristics and measurements</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="shape"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Shape</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
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
                          <SelectItem value="Heart">Heart</SelectItem>
                          <SelectItem value="Pear">Pear</SelectItem>
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
                      <FormLabel className="text-body font-semibold">Measurements (mm)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="7.49 x 7.49 x 5.18" 
                          {...field}
                          className="rounded-xl"
                        />
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
                      <FormLabel className="text-body font-semibold">Carat Weight</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="2.01" 
                          {...field}
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Grading Results Section */}
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span>Grading Results</span>
              </CardTitle>
              <CardDescription>4Cs grading assessment and quality factors</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="colorGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Color Grade</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"].map((grade) => (
                            <Button
                              key={grade}
                              type="button"
                              variant={field.value === grade ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(grade)}
                              className={field.value === grade 
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                                : "border-blue-200 text-blue-700 hover:bg-blue-50"
                              }
                            >
                              {grade}
                            </Button>
                          ))}
                        </div>
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
                      <FormLabel className="text-slate-700 font-medium">Clarity Grade</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"].map((grade) => (
                            <Button
                              key={grade}
                              type="button"
                              variant={field.value === grade ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(grade)}
                              className={field.value === grade 
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white" 
                                : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              }
                            >
                              {grade}
                            </Button>
                          ))}
                        </div>
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
                      <FormLabel className="text-slate-700 font-medium">Cut Grade</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((grade) => (
                            <Button
                              key={grade}
                              type="button"
                              variant={field.value === grade ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(grade)}
                              className={field.value === grade 
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white" 
                                : "border-amber-200 text-amber-700 hover:bg-amber-50"
                              }
                            >
                              {grade}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="polish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Polish</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((grade) => (
                            <Button
                              key={grade}
                              type="button"
                              variant={field.value === grade ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(grade)}
                              className={field.value === grade 
                                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
                                : "border-purple-200 text-purple-700 hover:bg-purple-50"
                              }
                            >
                              {grade}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="symmetry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Symmetry</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((grade) => (
                            <Button
                              key={grade}
                              type="button"
                              variant={field.value === grade ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(grade)}
                              className={field.value === grade 
                                ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white" 
                                : "border-rose-200 text-rose-700 hover:bg-rose-50"
                              }
                            >
                              {grade}
                            </Button>
                          ))}
                        </div>
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
                      <FormLabel className="text-body font-semibold">Fluorescence</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {fluorescenceOptions.map((option) => (
                            <Button
                              key={option}
                              type="button"
                              variant={field.value === option ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(option)}
                              className="rounded-full"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Section */}
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-purple-600" />
                <span>Additional Information</span>
              </CardTitle>
              <CardDescription>Optional details and verification settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="inscription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Inscription(s)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="GIL G2141436895" 
                          {...field}
                          value={field.value || ""}
                          className="rounded-xl"
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
                      <FormLabel className="text-body font-semibold">Gemologist Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Dr. Sarah Johnson" 
                          {...field}
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="signatureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Signature Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full rounded-xl pl-3 text-left font-normal",
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

                <FormField
                  control={form.control}
                  name="digitallySignedBy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-body font-semibold">
                          Digitally Signed
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Add "Digitally Signed by [Gemologist Name]" to the certificate
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="colorGradeDiagram"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-body font-semibold">
                          Color Grade Diagram
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Include color grading reference diagram
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clarityPlotDiagram"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-body font-semibold">
                          Clarity Plot Diagram
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Include clarity plotting diagram
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Clouds are not shown. Pinpoints are not shown." 
                          {...field}
                          value={field.value || ""}
                          className="rounded-xl"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="certificateNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-body font-semibold">Certificate Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional conditions or footer notes for the certificate" 
                          {...field}
                          value={field.value || ""}
                          className="rounded-xl"
                          rows={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreview}
              className="rounded-xl"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Certificate
            </Button>
            
            <Button 
              type="submit" 
              disabled={isGenerating}
              className="bg-amber-600 hover:bg-amber-700 rounded-xl"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Generate Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
      </div>
    </div>
  );
}