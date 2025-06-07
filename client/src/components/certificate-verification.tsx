import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, ShieldCheck, AlertTriangle, Clock, Eye, FileText, QrCode, Globe, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import GILCertificateTemplate from "./gil-certificate-template-new";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface VerificationResult {
  isValid: boolean;
  certificate: any;
  securityLevel: string;
  lastVerified: string;
  verificationCount: number;
  digitalSignatureValid: boolean;
  tamperDetected: boolean;
  certificateAge: number;
  verificationHistory: Array<{
    timestamp: string;
    ipAddress: string;
    location: string;
  }>;
}

export default function CertificateVerification() {
  const [reportNumber, setReportNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: verification, isLoading, refetch } = useQuery({
    queryKey: ['/api/certificates/verify', reportNumber],
    enabled: false,
  });

  const handleVerify = async () => {
    if (!reportNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a certificate report number",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/certificates/verify/${reportNumber}`);
      const result = await response.json();
      
      if (response.ok && result.isValid) {
        setVerificationResult(result.verificationResult);
        toast({
          title: "Certificate Verified",
          description: "Certificate is authentic and valid",
        });
      } else {
        // Handle certificate not found or invalid
        if (result.verificationResult) {
          setVerificationResult(result.verificationResult);
        }
        toast({
          title: "Verification Failed",
          description: result.message || "Certificate not found in our database",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Error",
        description: "Network error during verification",
        variant: "destructive",
      });
    }
  };

  const getSecurityBadge = (level: string) => {
    const badges = {
      'basic': <Badge variant="outline" className="text-gray-600"><Shield className="w-3 h-3 mr-1" />Basic</Badge>,
      'standard': <Badge variant="secondary" className="text-blue-600"><ShieldCheck className="w-3 h-3 mr-1" />Standard</Badge>,
      'premium': <Badge variant="default" className="text-emerald-600 bg-emerald-50"><ShieldCheck className="w-3 h-3 mr-1" />Premium</Badge>,
      'enterprise': <Badge className="text-purple-600 bg-purple-50"><ShieldCheck className="w-3 h-3 mr-1" />Enterprise</Badge>,
    };
    return badges[level as keyof typeof badges] || badges.standard;
  };

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current || !verificationResult?.certificate) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8f9fa'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`GIL-Certificate-${verificationResult.certificate.reportNumber}.pdf`);

      toast({
        title: "Certificate Downloaded",
        description: "Certificate PDF has been saved to your downloads",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatCertificateData = (certificate: any) => {
    return {
      reportNumber: certificate.reportNumber,
      reportDate: certificate.reportDate,
      shape: certificate.shape,
      measurements: certificate.measurements,
      caratWeight: certificate.caratWeight,
      colorGrade: certificate.colorGrade,
      clarityGrade: certificate.clarityGrade,
      cutGrade: certificate.cutGrade,
      polish: certificate.polish,
      symmetry: certificate.symmetry,
      fluorescence: certificate.fluorescence,
      inscription: certificate.inscription,
      comments: certificate.comments,
      gemologistName: certificate.gemologistName,
      signatureDate: certificate.reportDate,
      digitallySignedBy: true,
      colorGradeDiagram: false,
      clarityPlotDiagram: true,
      certificateNotes: certificate.certificateNotes,
      verifierUrl: `https://gilab.info/verify/${certificate.reportNumber}`,
      tablePercentage: certificate.tablePercentage || "57%",
      depthPercentage: certificate.depthPercentage || "62.3%",
      crownAngle: certificate.crownAngle || "34.5°",
      pavilionAngle: certificate.pavilionAngle || "40.8°",
      girdleThickness: certificate.girdleThickness || "Medium to Slightly Thick",
      culetSize: certificate.culetSize || "None",
      // Additional fields for complete certificate
      origin: certificate.origin || "Natural",
      treatment: certificate.treatment || "None detected",
      clarityDiagram1: certificate.clarityDiagram1,
      clarityDiagram2: certificate.clarityDiagram2,
      proportionsDiagram: certificate.proportionsDiagram
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verification</h1>
        <p className="text-gray-600">Verify the authenticity of GIL diamond certificates</p>
      </div>

      {/* Verification Input */}
      <Card className="bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5 text-emerald-600" />
            <span>Enter Certificate Details</span>
          </CardTitle>
          <CardDescription>
            Enter the report number or scan the QR code on your certificate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-3">
            <Input
              placeholder="G1234567890"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
            />
            <Button 
              onClick={handleVerify} 
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <div className="space-y-6">
          {/* Status Overview */}
          <Card className={`border-2 ${verificationResult.isValid ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {verificationResult.isValid ? (
                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  )}
                  <div>
                    <h3 className={`text-xl font-bold ${verificationResult.isValid ? 'text-emerald-800' : 'text-red-800'}`}>
                      {verificationResult.isValid ? 'Certificate Verified' : 'Verification Failed'}
                    </h3>
                    <p className={`${verificationResult.isValid ? 'text-emerald-600' : 'text-red-600'}`}>
                      {verificationResult.isValid 
                        ? 'This certificate is authentic and valid' 
                        : 'This certificate could not be verified'}
                    </p>
                  </div>
                </div>
                {getSecurityBadge(verificationResult.securityLevel)}
              </div>
            </CardContent>
          </Card>

          {verificationResult.isValid && verificationResult.certificate && (
            <>
              {/* Certificate Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Certificate Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Report Number</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.reportNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Shape</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.shape}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Carat Weight</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.caratWeight} ct</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Color Grade</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.colorGrade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Clarity Grade</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.clarityGrade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Cut Grade</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.cutGrade}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Measurements</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.measurements}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Gemologist</label>
                      <p className="text-lg font-semibold">{verificationResult.certificate.gemologistName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Verification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      {verificationResult.digitalSignatureValid ? (
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">Digital Signature</p>
                        <p className={`text-sm ${verificationResult.digitalSignatureValid ? 'text-emerald-600' : 'text-red-600'}`}>
                          {verificationResult.digitalSignatureValid ? 'Valid' : 'Invalid'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!verificationResult.tamperDetected ? (
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">Tamper Detection</p>
                        <p className={`text-sm ${!verificationResult.tamperDetected ? 'text-emerald-600' : 'text-red-600'}`}>
                          {!verificationResult.tamperDetected ? 'Clean' : 'Detected'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Certificate Age</p>
                        <p className="text-sm text-gray-600">{verificationResult.certificateAge} days</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Verifications</p>
                        <p className="text-sm text-gray-600">{verificationResult.verificationCount} times</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Last Verified</p>
                    <p className="font-medium">{new Date(verificationResult.lastVerified).toLocaleString()}</p>
                  </div>

                  <Separator />

                  {/* Certificate Actions */}
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => setShowCertificatePreview(!showCertificatePreview)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{showCertificatePreview ? 'Hide Certificate' : 'View Certificate'}</span>
                    </Button>
                    {showCertificatePreview && (
                      <Button 
                        onClick={handleDownloadCertificate}
                        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Certificate Preview */}
              {showCertificatePreview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Certificate Preview</span>
                    </CardTitle>
                    <CardDescription>
                      Complete GIL certificate as issued and verified through gilab.info
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div ref={certificateRef} className="w-full">
                      <GILCertificateTemplate 
                        data={formatCertificateData(verificationResult.certificate)}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Verification History */}
              {verificationResult.verificationHistory && verificationResult.verificationHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Recent Verification History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {verificationResult.verificationHistory.slice(0, 5).map((entry, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium">{new Date(entry.timestamp).toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{entry.location}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {entry.ipAddress.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\./, '***.')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* QR Code for Mobile Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="h-5 w-5" />
                    <span>Mobile Verification</span>
                  </CardTitle>
                  <CardDescription>
                    Scan this QR code to verify on mobile devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                    <QRCodeSVG 
                      value={`https://gilab.info/verify/${verificationResult.certificate.reportNumber}`}
                      size={128}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Scan to verify at gilab.info
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
}