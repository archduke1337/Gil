import { useState, useMemo, useCallback } from "react";
import { Eye, Trash2, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";

interface CertificateListProps {
  certificates: Certificate[];
  onUpdate: () => void;
}

export default function CertificateList({ certificates, onUpdate }: CertificateListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  const filteredCertificates = useMemo(() => 
    certificates.filter(cert =>
      cert.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    ), [certificates, searchQuery]
  );

  const handleViewCertificate = (certificate: Certificate) => {
    // If certificate has a file, open it
    if (certificate.filename) {
      window.open(`/api/certificates/file/${certificate.referenceNumber}`, '_blank');
    } else {
      // For generated certificates, show certificate details in a modal or new page
      showCertificateDetails(certificate);
    }
  };

  const showCertificateDetails = (certificate: Certificate) => {
    // Create a new window with certificate details
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
              border-bottom: 2px solid hsl(24 95% 53%); 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .title { 
              color: hsl(24 95% 53%); 
              font-size: 28px; 
              font-weight: bold; 
              margin: 0;
            }
            .subtitle { 
              color: #666; 
              font-size: 16px; 
              margin: 5px 0 0 0;
            }
            .content { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 20px; 
              margin: 20px 0;
            }
            .field { 
              margin-bottom: 15px;
            }
            .label { 
              font-weight: 600; 
              color: #333; 
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value { 
              color: #666; 
              font-size: 16px; 
              margin-top: 4px;
            }
            .full-width { 
              grid-column: 1 / -1;
            }
            .reference { 
              background: hsl(24 95% 53%); 
              color: white; 
              padding: 10px 20px; 
              border-radius: 6px; 
              font-weight: bold; 
              text-align: center; 
              margin: 20px 0;
            }
            @media print {
              body { background: white; margin: 0; padding: 0; }
              .certificate { box-shadow: none; margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <h1 class="title">GEMOLOGICAL CERTIFICATE</h1>
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
                <div class="label">Table %</div>
                <div class="value">${certificate.tablePercentage}</div>
              </div>
              ` : ''}
              ${certificate.depthPercentage ? `
              <div class="field">
                <div class="label">Depth %</div>
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
                <div class="label">Report Date</div>
                <div class="value">${certificate.reportDate && certificate.reportDate !== null ? new Date(certificate.reportDate).toLocaleDateString() : 'N/A'}</div>
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
          </div>
          <script>
            // Auto print on load if desired
            // window.print();
          </script>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleDeleteCertificate = async (certificate: Certificate) => {
    setIsDeleting(certificate.id);
    try {
      await apiRequest("DELETE", `/api/certificates/${certificate.id}`);
      toast({
        title: "Certificate Deleted",
        description: `Certificate ${certificate.referenceNumber} has been deleted`,
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "An error occurred while deleting the certificate",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card className="bg-card rounded-xl shadow-lg border border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Certificate Database</h2>
              <p className="text-muted-foreground">Manage existing certificates</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {filteredCertificates.length} Total
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>
          <Button
            onClick={onUpdate}
            variant="outline"
            size="sm"
            className="ml-4 px-4 py-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? "No matching certificates" : "No certificates found"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "Upload your first certificate to get started"
                }
              </p>
            </div>
          ) : (
            filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="border border-border rounded-lg p-4 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{certificate.referenceNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      Uploaded: {certificate.uploadDate ? new Date(certificate.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'Date not available'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      {certificate.caratWeight && <span>{certificate.caratWeight} ct</span>}
                      {certificate.colorGrade && <span>Color: {certificate.colorGrade}</span>}
                      {certificate.clarityGrade && <span>Clarity: {certificate.clarityGrade}</span>}
                      {certificate.cutGrade && <span>Cut: {certificate.cutGrade}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleViewCertificate(certificate)}
                      variant="ghost"
                      size="sm"
                      className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                      title="View Certificate"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCertificate(certificate)}
                      disabled={isDeleting === certificate.id}
                      variant="ghost"
                      size="sm"
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      title="Delete Certificate"
                    >
                      <Trash2 className={`w-4 h-4 ${isDeleting === certificate.id ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
