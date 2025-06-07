import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gem, LogOut, Upload, List, RefreshCw, FileUp, Search, Filter, Map, BookOpen, Users, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import UploadForm from "@/components/upload-form";
import CertificateList from "@/components/certificate-list";
import BulkUpload from "@/components/bulk-upload";
import AdvancedSearch from "@/components/advanced-search";

import { DashboardSkeleton, CertificateListSkeleton } from "@/components/skeleton-loader";
import GemLoadingSpinner from "@/components/gem-loading-spinner";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";
import logoPath from "@assets/1000119055-removebg-preview.png";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchResults, setSearchResults] = useState<Certificate[]>([]);
  const { toast } = useToast();

  const { data: certificatesData, refetch, isLoading, error } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/certificates", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch certificates: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Certificate fetch error:', err);
        throw err;
      }
    },
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const certificates: Certificate[] = certificatesData?.certificates || [];

  const handleLogout = useCallback(() => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    onLogout();
  }, [toast, onLogout]);

  const handleUploadSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const displayCertificates = useMemo(() => 
    searchResults.length > 0 ? searchResults : certificates,
    [searchResults, certificates]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="flex items-center justify-center py-20">
          <GemLoadingSpinner size="lg" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Dashboard error details:", error);
    // Continue with empty certificates array to show dashboard with empty state
    const certificates: Certificate[] = [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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
                  <p className="text-sm text-gray-600">Comprehensive gemological management system</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-500 mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Connection Issue</h3>
                <p className="text-red-700 text-sm">Unable to load certificates. Click retry to attempt reconnection.</p>
                <Button 
                  onClick={() => refetch()} 
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Connection
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="certificates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="certificates" className="flex items-center space-x-2">
                <List className="w-4 h-4" />
                <span>Certificates</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </TabsTrigger>
              <TabsTrigger value="bulk" className="flex items-center space-x-2">
                <FileUp className="w-4 h-4" />
                <span>Bulk Upload</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Advanced Search</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates available</h3>
                <p className="text-gray-500">Unable to connect to database. Please retry the connection.</p>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <UploadForm onSuccess={() => refetch()} />
            </TabsContent>

            <TabsContent value="bulk" className="space-y-6">
              <BulkUpload onSuccess={() => refetch()} />
            </TabsContent>

            <TabsContent value="search" className="space-y-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Search unavailable</h3>
                <p className="text-gray-500">Please establish database connection first.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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
                <p className="text-sm text-gray-600">Comprehensive gemological management system</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <FileUp className="w-8 h-8 text-blue-700" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-gray-600 text-ultra-smooth">Total Certificates</p>
                    <p className="text-3xl font-semibold text-gray-900 text-ultra-smooth">{certificates.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <Eye className="w-8 h-8 text-green-700" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-gray-600 text-ultra-smooth">Active Certificates</p>
                    <p className="text-3xl font-semibold text-gray-900 text-ultra-smooth">
                      {certificates.filter((cert: Certificate) => cert.isActive).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <Search className="w-8 h-8 text-purple-700" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-gray-600 text-ultra-smooth">Verifications Today</p>
                    <p className="text-3xl font-semibold text-gray-900 text-ultra-smooth">42</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 rounded-3xl soft-shadow hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center soft-shadow">
                    <RefreshCw className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-gray-600 text-ultra-smooth">Uploads This Month</p>
                    <p className="text-3xl font-semibold text-gray-900 text-ultra-smooth">
                      {certificates.filter((cert: Certificate) => {
                        if (!cert.uploadDate) return false;
                        const uploadDate = new Date(cert.uploadDate);
                        const now = new Date();
                        return uploadDate.getMonth() === now.getMonth() && uploadDate.getFullYear() === now.getFullYear();
                      }).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="certificates" className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <span>Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center space-x-2">
              <FileUp className="w-4 h-4" />
              <span>Bulk Upload</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Advanced Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CertificateList certificates={displayCertificates} onUpdate={handleUploadSuccess} />
            </motion.div>
          </TabsContent>



          <TabsContent value="upload" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UploadForm onSuccess={handleUploadSuccess} />
            </motion.div>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BulkUpload onSuccess={handleUploadSuccess} />
            </motion.div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdvancedSearch certificates={certificates} onSearchResults={setSearchResults} />
            </motion.div>
          </TabsContent>




        </Tabs>
      </div>
    </div>
  );
}