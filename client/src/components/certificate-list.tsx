import { useState } from "react";
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

  const filteredCertificates = certificates.filter(cert =>
    cert.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCertificate = (certificate: Certificate) => {
    window.open(`/api/certificates/file/${certificate.referenceNumber}`, '_blank');
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
    <Card className="bg-white rounded-xl shadow-lg border border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Certificate Database</h2>
              <p className="text-gray-600">Manage existing certificates</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {filteredCertificates.length} Total
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
            />
          </div>
          <Button
            onClick={onUpdate}
            variant="outline"
            size="sm"
            className="ml-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? "No matching certificates" : "No certificates found"}
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "Upload your first certificate to get started"
                }
              </p>
            </div>
          ) : (
            filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{certificate.referenceNumber}</h3>
                    <p className="text-sm text-gray-600">
                      Uploaded: {new Date(certificate.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
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
                      className="p-2 text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      title="View Certificate"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCertificate(certificate)}
                      disabled={isDeleting === certificate.id}
                      variant="ghost"
                      size="sm"
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
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
