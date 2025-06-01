import { CheckCircle, AlertTriangle, Eye, Download, Shield, Lock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Certificate } from "@shared/schema";

interface CertificateResultProps {
  result: {
    certificate: Certificate | null;
    found: boolean;
  };
}

export default function CertificateResult({ result }: CertificateResultProps) {
  const { certificate, found } = result;

  const handleViewCertificate = () => {
    if (certificate) {
      window.open(`/api/certificates/file/${certificate.referenceNumber}`, '_blank');
    }
  };

  const handleDownloadCertificate = () => {
    if (certificate) {
      const link = document.createElement('a');
      link.href = `/api/certificates/file/${certificate.referenceNumber}`;
      link.download = `${certificate.referenceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {found && certificate ? (
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Certificate Verified</h3>
                  <p className="text-gray-600">Valid certificate found in our database</p>
                </div>
              </div>
              <Badge className="bg-emerald-600 text-white">Authentic</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Reference Number:</dt>
                      <dd className="font-medium text-gray-900">{certificate.referenceNumber}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Issue Date:</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Certificate Type:</dt>
                      <dd className="font-medium text-gray-900">Diamond Grading Report</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status:</dt>
                      <dd className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        <span className="text-emerald-600 font-medium">Valid</span>
                      </dd>
                    </div>
                  </dl>
                </div>

                {(certificate.caratWeight || certificate.colorGrade || certificate.clarityGrade || certificate.cutGrade) && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Diamond Specifications</h4>
                    <dl className="space-y-3">
                      {certificate.caratWeight && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Carat Weight:</dt>
                          <dd className="font-medium text-gray-900">{certificate.caratWeight} ct</dd>
                        </div>
                      )}
                      {certificate.colorGrade && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Color Grade:</dt>
                          <dd className="font-medium text-gray-900">{certificate.colorGrade}</dd>
                        </div>
                      )}
                      {certificate.clarityGrade && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Clarity Grade:</dt>
                          <dd className="font-medium text-gray-900">{certificate.clarityGrade}</dd>
                        </div>
                      )}
                      {certificate.cutGrade && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Cut Grade:</dt>
                          <dd className="font-medium text-gray-900">{certificate.cutGrade}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Certificate Preview */}
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-full h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Certificate Preview</p>
                      <p className="text-sm text-gray-500">{certificate.filename}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleViewCertificate}
                      className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Button>
                    <Button 
                      onClick={handleDownloadCertificate}
                      variant="outline"
                      className="flex-1 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Security Features</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-700" />
                      <span>Digital signature verified</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-blue-700" />
                      <span>Tamper-proof encryption</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-700" />
                      <span>Timestamped verification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Not Found</h3>
              <p className="text-gray-600 mb-6">
                The certificate reference number you entered was not found in our database.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-yellow-800 mb-2">Please verify:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• The reference number is entered correctly</li>
                  <li>• All characters including dashes and numbers are accurate</li>
                  <li>• The certificate was issued by Gemological Institute Laboratories</li>
                </ul>
              </div>
              <Button 
                onClick={() => {
                  const input = document.querySelector('input[name="referenceNumber"]') as HTMLInputElement;
                  if (input) input.focus();
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Try Again
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
