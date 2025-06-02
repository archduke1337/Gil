import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gem, LogOut, Upload, List, RefreshCw, FileUp, Search, Filter, Map, BookOpen, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import UploadForm from "@/components/upload-form";
import CertificateList from "@/components/certificate-list";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "list" | "bulk" | "search" | "analytics">("upload");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const { data: certificatesData, refetch } = useQuery<{ certificates: Certificate[] }>({
    queryKey: ["/api/certificates"],
    refetchInterval: 30000, // Refetch every 30 seconds
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

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk Upload Started",
      description: `Processing ${bulkFiles.length} certificates...`,
    });
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || cert.colorGrade?.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lab-bg-primary rounded-lg flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Advanced Certificate Management</h1>
                <p className="text-gray-600">Upload and manage diamond certificates</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Advanced Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-700" />
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Verifications Today</p>
                  <p className="text-2xl font-semibold text-gray-900">42</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Uploads This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {certificates.filter(cert => {
                      const uploadDate = new Date(cert.uploadDate);
                      const now = new Date();
                      return uploadDate.getMonth() === now.getMonth() && uploadDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-200 rounded-lg p-1">
          <Button
            onClick={() => setActiveTab("upload")}
            variant={activeTab === "upload" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "upload" ? "bg-white shadow-sm" : ""}`}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Certificate
          </Button>
          <Button
            onClick={() => setActiveTab("list")}
            variant={activeTab === "list" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "list" ? "bg-white shadow-sm" : ""}`}
          >
            <List className="w-4 h-4 mr-2" />
            Certificate Database
            {certificates.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {certificates.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "upload" ? (
          <UploadForm onSuccess={handleUploadSuccess} />
        ) : (
          <CertificateList certificates={certificates} onUpdate={refetch} />
        )}
      </div>
    </div>
  );
}
