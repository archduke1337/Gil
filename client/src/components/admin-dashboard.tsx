import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gem, LogOut, Upload, List, RefreshCw, FileUp, Search, Filter, Map, BookOpen, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import UploadForm from "@/components/upload-form";
import CertificateList from "@/components/certificate-list";
import BulkUpload from "@/components/bulk-upload";
import AdvancedSearch from "@/components/advanced-search";
import GemRecommendationEngine from "@/components/gem-recommendation-engine";
import GemRarityHeatmap from "@/components/gem-rarity-heatmap";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
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
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileUp className="w-6 h-6 text-blue-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                    <p className="text-2xl font-semibold text-gray-900">{certificates.length}</p>
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
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-700" />
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-purple-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Verifications Today</p>
                    <p className="text-2xl font-semibold text-gray-900">42</p>
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
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uploads This Month</p>
                    <p className="text-2xl font-semibold text-gray-900">
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
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
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Gem className="w-4 h-4" />
              <span>AI Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex items-center space-x-2">
              <Map className="w-4 h-4" />
              <span>Rarity Map</span>
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

          <TabsContent value="ai" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GemRecommendationEngine />
            </motion.div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GemRarityHeatmap />
            </motion.div>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
}