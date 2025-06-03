import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Diamond, 
  FileText, 
  Clipboard, 
  Award, 
  Eye, 
  Download,
  QrCode,
  Shield,
  Sparkles
} from "lucide-react";
import { gilCertificateSchema, type Certificate } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import GILCertificateTemplate from "./gil-certificate-template";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type GILCertificateForm = z.infer<typeof gilCertificateSchema>;

interface LuxuryGILCertificateGeneratorProps {
  onSuccess: () => void;
}

export default function LuxuryGILCertificateGenerator({ onSuccess }: LuxuryGILCertificateGeneratorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const queryClient = useQueryClient();

  const form = useForm<GILCertificateForm>({
    resolver: zodResolver(gilCertificateSchema),
    defaultValues: {
      reportDate: new Date(),
      signatureDate: new Date(),
      reportNumber: "",
      shape: "",
      measurements: "",
      caratWeight: "",
      colorGrade: "",
      clarityGrade: "",
      cutGrade: "",
      polish: "",
      symmetry: "",
      fluorescence: "None",
      inscription: "",
      comments: "",
      gemologistName: "",
      digitallySignedBy: false,
      colorGradeDiagram: false,
      clarityPlotDiagram: false,
      certificateNotes: "",
      verifierUrl: "https://gilab.info/verify",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: GILCertificateForm) => 
      apiRequest("/api/certificates", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      toast({
        title: "Success",
        description: "Certificate generated successfully",
      });
      onSuccess();
      form.reset();
      setIsPreview(false);
      setPreviewData(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate certificate",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: GILCertificateForm) => {
    createMutation.mutate(data);
  };

  const handlePreview = () => {
    const data = form.getValues();
    setPreviewData(data);
    setIsPreview(true);
  };

  const handleDownloadPDF = async () => {
    if (!previewData) return;

    const element = document.getElementById('certificate-template');
    if (element) {
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

      pdf.save(`GIL-Certificate-${previewData.reportNumber}.pdf`);
    }
  };

  const fluorescenceOptions = ["None", "Faint", "Medium", "Strong", "Very Strong"];

  if (isPreview && previewData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Certificate Preview
            </h1>
            <div className="flex gap-4">
              <Button
                onClick={() => setIsPreview(false)}
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
          
          <div id="certificate-template" className="bg-white rounded-2xl shadow-2xl p-8">
            <GILCertificateTemplate data={previewData} />
          </div>
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

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Report Information Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-2xl text-slate-800">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reportNumber" className="text-slate-700 font-medium">Report Number</Label>
                  <Input
                    {...form.register("reportNumber")}
                    placeholder="GIL-2024-001"
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                  {form.formState.errors.reportNumber && (
                    <p className="text-red-500 text-sm">{form.formState.errors.reportNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportDate" className="text-slate-700 font-medium">Report Date</Label>
                  <Input
                    type="date"
                    {...form.register("reportDate", { valueAsDate: true })}
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gemologistName" className="text-slate-700 font-medium">Gemologist Name</Label>
                  <Input
                    {...form.register("gemologistName")}
                    placeholder="Dr. Sarah Johnson"
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diamond Specifications Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-amber-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-2xl text-slate-800">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mr-4">
                  <Diamond className="w-6 h-6 text-white" />
                </div>
                Diamond Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shape" className="text-slate-700 font-medium">Shape</Label>
                  <Input
                    {...form.register("shape")}
                    placeholder="Round Brilliant"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="measurements" className="text-slate-700 font-medium">Measurements (mm)</Label>
                  <Input
                    {...form.register("measurements")}
                    placeholder="6.50 x 6.47 x 4.03"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caratWeight" className="text-slate-700 font-medium">Carat Weight</Label>
                  <Input
                    {...form.register("caratWeight")}
                    placeholder="1.00"
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grading Results Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-2xl text-slate-800">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                Grading Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="colorGrade" className="text-slate-700 font-medium">Color Grade</Label>
                  <Input
                    {...form.register("colorGrade")}
                    placeholder="D"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clarityGrade" className="text-slate-700 font-medium">Clarity Grade</Label>
                  <Input
                    {...form.register("clarityGrade")}
                    placeholder="VVS1"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cutGrade" className="text-slate-700 font-medium">Cut Grade</Label>
                  <Input
                    {...form.register("cutGrade")}
                    placeholder="Excellent"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="polish" className="text-slate-700 font-medium">Polish</Label>
                  <Input
                    {...form.register("polish")}
                    placeholder="Excellent"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symmetry" className="text-slate-700 font-medium">Symmetry</Label>
                  <Input
                    {...form.register("symmetry")}
                    placeholder="Excellent"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Fluorescence</Label>
                  <div className="flex flex-wrap gap-2">
                    {fluorescenceOptions.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant={form.watch("fluorescence") === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => form.setValue("fluorescence", option)}
                        className={form.watch("fluorescence") === option 
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                          : "border-blue-200 text-blue-700 hover:bg-blue-50"
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-2xl text-slate-800">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <Clipboard className="w-6 h-6 text-white" />
                </div>
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="inscription" className="text-slate-700 font-medium">Inscription</Label>
                    <Input
                      {...form.register("inscription")}
                      placeholder="GIA 12345678"
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signatureDate" className="text-slate-700 font-medium">Signature Date</Label>
                    <Input
                      type="date"
                      {...form.register("signatureDate", { valueAsDate: true })}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-slate-700 font-medium">Comments</Label>
                  <Textarea
                    {...form.register("comments")}
                    placeholder="Additional comments about the diamond..."
                    rows={3}
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateNotes" className="text-slate-700 font-medium">Certificate Notes</Label>
                  <Textarea
                    {...form.register("certificateNotes")}
                    placeholder="Additional certificate notes..."
                    rows={3}
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>

                {/* Digital Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={form.watch("digitallySignedBy")}
                      onCheckedChange={(checked) => form.setValue("digitallySignedBy", !!checked)}
                      className="border-emerald-300 data-[state=checked]:bg-emerald-500"
                    />
                    <Label className="text-slate-700 font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-emerald-600" />
                      Digital Signature
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={form.watch("colorGradeDiagram")}
                      onCheckedChange={(checked) => form.setValue("colorGradeDiagram", !!checked)}
                      className="border-amber-300 data-[state=checked]:bg-amber-500"
                    />
                    <Label className="text-slate-700 font-medium flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                      Color Grade Diagram
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={form.watch("clarityPlotDiagram")}
                      onCheckedChange={(checked) => form.setValue("clarityPlotDiagram", !!checked)}
                      className="border-blue-300 data-[state=checked]:bg-blue-500"
                    />
                    <Label className="text-slate-700 font-medium flex items-center">
                      <QrCode className="w-4 h-4 mr-2 text-blue-600" />
                      Clarity Plot Diagram
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 pt-8">
            <Button
              type="button"
              onClick={handlePreview}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 shadow-lg"
            >
              <Eye className="w-5 h-5 mr-3" />
              Preview Certificate
            </Button>

            <Button
              type="submit"
              disabled={createMutation.isPending}
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Diamond className="w-5 h-5 mr-3" />
              {createMutation.isPending ? "Generating..." : "Generate Certificate"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}