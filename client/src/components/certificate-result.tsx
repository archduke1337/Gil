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
      // If certificate has a file, open it
      if (certificate.filename) {
        window.open(`/api/certificates/file/${certificate.referenceNumber}`, '_blank');
      } else {
        // For generated certificates, show certificate details in a new window
        showCertificateDetails(certificate);
      }
    }
  };

  const showCertificateDetails = (certificate: Certificate) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate ${certificate.referenceNumber}</title>
          <style>
            body { 
              font-family: 'Inter', sans-serif; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px; 
              background: #f8f9fa;
              line-height: 1.6;
            }
            .certificate { 
              background: white; 
              padding: 40px; 
              border-radius: 12px; 
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              margin: 20px 0;
            }
            .header { 
              text-align: center; 
              border-bottom: 3px solid hsl(24 95% 53%); 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .logo { 
              color: hsl(24 95% 53%); 
              font-size: 32px; 
              font-weight: bold; 
              margin: 0 0 10px 0;
              letter-spacing: 2px;
            }
            .title { 
              color: #333; 
              font-size: 24px; 
              font-weight: bold; 
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .subtitle { 
              color: #666; 
              font-size: 16px; 
              margin: 5px 0 0 0;
            }
            .content { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 25px; 
              margin: 30px 0;
            }
            .field { 
              margin-bottom: 20px;
              padding: 12px;
              background: hsl(210 40% 96%);
              border-radius: 6px;
              border-left: 4px solid hsl(24 95% 53%);
            }
            .label { 
              font-weight: 600; 
              color: #333; 
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              margin-bottom: 6px;
            }
            .value { 
              color: #444; 
              font-size: 16px; 
              font-weight: 500;
            }
            .full-width { 
              grid-column: 1 / -1;
            }
            .reference { 
              background: linear-gradient(135deg, hsl(24 95% 53%), hsl(24 95% 45%)); 
              color: white; 
              padding: 15px 25px; 
              border-radius: 8px; 
              font-weight: bold; 
              text-align: center; 
              margin: 20px 0;
              font-size: 18px;
              letter-spacing: 1px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid hsl(24 95% 53%);
              text-align: center;
              color: hsl(210 3.7% 48%);
              font-size: 14px;
            }
            .print-btn {
              background: hsl(24 95% 53%);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              margin: 20px auto;
              display: block;
              font-weight: 600;
            }
            .print-btn:hover {
              background: hsl(24 95% 45%);
            }
            @media print {
              body { background: white; margin: 0; padding: 0; }
              .certificate { box-shadow: none; margin: 0; }
              .print-btn { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="logo">GIL</div>
              <h1 class="title">Gemological Certificate</h1>
              <p class="subtitle">Gemological Institute Laboratories</p>
            </div>
            
            <div class="reference">
              Certificate No: ${certificate.referenceNumber}
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Gem Type</div>
                <div class="value">${certificate.gemType}</div>
              </div>
              <div class="field">
                <div class="label">Shape</div>
                <div class="value">${certificate.shape}</div>
              </div>
              <div class="field">
                <div class="label">Dimensions</div>
                <div class="value">${certificate.dimensions}</div>
              </div>
              <div class="field">
                <div class="label">Carat Weight</div>
                <div class="value">${certificate.caratWeight}</div>
              </div>
              <div class="field">
                <div class="label">Color Grade</div>
                <div class="value">${certificate.colorGrade}</div>
              </div>
              <div class="field">
                <div class="label">Clarity Grade</div>
                <div class="value">${certificate.clarityGrade}</div>
              </div>
              <div class="field">
                <div class="label">Cut Grade</div>
                <div class="value">${certificate.cutGrade}</div>
              </div>
              <div class="field">
                <div class="label">Polish</div>
                <div class="value">${certificate.polish || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Symmetry</div>
                <div class="value">${certificate.symmetry || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Fluorescence</div>
                <div class="value">${certificate.fluorescence || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Treatment</div>
                <div class="value">${certificate.treatment || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Origin</div>
                <div class="value">${certificate.origin || 'Not specified'}</div>
              </div>
              ${certificate.tablePercentage ? `
              <div class="field">
                <div class="label">Table Percentage</div>
                <div class="value">${certificate.tablePercentage}</div>
              </div>
              ` : ''}
              ${certificate.depthPercentage ? `
              <div class="field">
                <div class="label">Depth Percentage</div>
                <div class="value">${certificate.depthPercentage}</div>
              </div>
              ` : ''}
              ${certificate.crownAngle ? `
              <div class="field">
                <div class="label">Crown Angle</div>
                <div class="value">${certificate.crownAngle}</div>
              </div>
              ` : ''}
              ${certificate.pavilionAngle ? `
              <div class="field">
                <div class="label">Pavilion Angle</div>
                <div class="value">${certificate.pavilionAngle}</div>
              </div>
              ` : ''}
              ${certificate.inscription ? `
              <div class="field full-width">
                <div class="label">Inscription</div>
                <div class="value">${certificate.inscription}</div>
              </div>
              ` : ''}
              ${certificate.comments ? `
              <div class="field full-width">
                <div class="label">Comments</div>
                <div class="value">${certificate.comments}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Certification Date</div>
                <div class="value">${new Date(certificate.certificationDate).toLocaleDateString()}</div>
              </div>
              <div class="field">
                <div class="label">Examined By</div>
                <div class="value">${certificate.examinedBy}</div>
              </div>
              <div class="field">
                <div class="label">Approved By</div>
                <div class="value">${certificate.approvedBy}</div>
              </div>
              <div class="field">
                <div class="label">Lab Location</div>
                <div class="value">${certificate.labLocation || 'GIL Headquarters'}</div>
              </div>
            </div>
            
            <button class="print-btn" onclick="window.print()">Print Certificate</button>
            
            <div class="footer">
              <p>This certificate is digitally verified and authenticated by GIL.</p>
              <p>Certificate generated on ${new Date(certificate.issueDate || certificate.certificationDate).toLocaleDateString()}</p>
            </div>
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleDownloadCertificate = () => {
    if (certificate) {
      if (certificate.filename) {
        const link = document.createElement('a');
        link.href = `/api/certificates/file/${certificate.referenceNumber}`;
        link.download = `${certificate.referenceNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For generated certificates, open the printable view
        showCertificateDetails(certificate);
      }
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {found && certificate ? (
          <Card className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Certificate Verified</h3>
                  <p className="text-muted-foreground">Valid certificate found in our database</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">Authentic</Badge>
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
                        {certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Not specified'}
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
