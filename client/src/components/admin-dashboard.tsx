import { useState } from "react";
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
import CertificateGenerator from "@/components/certificate-generator";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";
import logoPath from "@assets/1000119055-removebg-preview.png";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchResults, setSearchResults] = useState<Certificate[]>([]);
  const { toast } = useToast();

  const { data: certificatesData, refetch } = useQuery<{ certificates: Certificate[] }>({
    queryKey: ["/api/certificates"],
    refetchInterval: 30000,
  });

  const certificates = certificatesData?.certificates || [];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    onLogout();
  };

  const handleUploadSuccess = () => {
    refetch();
  };

  const displayCertificates = searchResults.length > 0 ? searchResults : certificates;

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
                      {certificates.filter(cert => cert.isActive).length}
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
                      {certificates.filter(cert => {
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="certificates" className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <span>Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Generator</span>
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

          <TabsContent value="generator" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CertificateGenerator onSuccess={handleUploadSuccess} />
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