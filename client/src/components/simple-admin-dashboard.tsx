import { useState, useEffect, useCallback, memo } from "react";
import { LogOut, RefreshCw, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificateList from "@/components/certificate-list";
import CertificateGenerator from "@/components/certificate-generator";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";
import logoPath from "@assets/1000119055-removebg-preview.png";

interface AdminDashboardProps {
  onLogout: () => void;
}

const SimpleAdminDashboard = memo(function SimpleAdminDashboard({ onLogout }: AdminDashboardProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/certificates');
      
      if (!response.ok) {
        throw new Error(`Failed to load certificates: ${response.status}`);
      }
      
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load certificates';
      setError(errorMsg);
      console.error('Certificate loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const handleLogout = useCallback(() => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    onLogout();
  }, [toast, onLogout]);

  const handleCertificateUpdate = useCallback(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Dashboard Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchCertificates} className="bg-primary hover:bg-primary/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-0 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="GIL - Gemological Institute Laboratories" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GIL Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Certificate Management System</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="text-gray-600 hover:text-red-600 border-gray-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 rounded-3xl soft-shadow bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                  <p className="text-2xl font-semibold text-gray-900">{certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-3xl soft-shadow bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Certificates</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {certificates.filter(cert => cert.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-3xl soft-shadow bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent Uploads</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {certificates.filter(cert => {
                      if (!cert.uploadDate) return false;
                      const uploadDate = new Date(cert.uploadDate);
                      const now = new Date();
                      const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 7;
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
            <TabsTrigger value="certificates" className="rounded-xl">Certificate Management</TabsTrigger>
            <TabsTrigger value="generate" className="rounded-xl">Generate Certificate</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="border-0 rounded-3xl soft-shadow bg-white/90">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Certificate Database</h2>
                  <Button onClick={fetchCertificates} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <CertificateList certificates={certificates} onUpdate={handleCertificateUpdate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            <Card className="border-0 rounded-3xl soft-shadow bg-white/90">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">Generate New Certificate</h2>
                <CertificateGenerator onSuccess={handleCertificateUpdate} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});

export default SimpleAdminDashboard;