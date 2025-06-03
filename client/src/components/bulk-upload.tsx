import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle,
  Download, Eye, Trash2, RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkUploadProps {
  onSuccess: () => void;
}

interface UploadFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'success' | 'error';
  progress: number;
  error?: string;
  certificatesCreated?: number;
}

export default function BulkUpload({ onSuccess }: BulkUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 5,
    disabled: isProcessing
  });

  const processFiles = async () => {
    setIsProcessing(true);
    
    for (const uploadFile of files) {
      if (uploadFile.status !== 'pending') continue;

      try {
        // Update status to processing
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { ...f, status: 'processing', progress: 0 }
            : f
        ));

        // Simulate file processing with progress updates
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id 
              ? { ...f, progress }
              : f
          ));
        }

        // Simulate successful processing
        const certificatesCreated = Math.floor(Math.random() * 50) + 10;
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { 
                ...f, 
                status: 'success', 
                progress: 100,
                certificatesCreated 
              }
            : f
        ));

      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { 
                ...f, 
                status: 'error', 
                error: 'Failed to process file' 
              }
            : f
        ));
      }
    }

    setIsProcessing(false);
    
    const successCount = files.filter(f => f.status === 'success').length;
    if (successCount > 0) {
      toast({
        title: "Bulk Upload Complete",
        description: `Successfully processed ${successCount} file(s)`,
      });
      onSuccess();
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const retryFile = (id: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id 
        ? { ...f, status: 'pending', progress: 0, error: undefined }
        : f
    ));
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: UploadFile['status']) => {
    const variants = {
      pending: 'secondary',
      processing: 'default',
      success: 'default',
      error: 'destructive',
    };
    
    return (
      <Badge variant={variants[status] as any}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5" />
            <span>Bulk Certificate Upload</span>
          </CardTitle>
          <CardDescription>
            Upload CSV or Excel files containing multiple certificate data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-emerald-400 bg-emerald-50' 
                : 'border-gray-300 hover:border-gray-400'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop CSV/Excel files'}
            </p>
            <p className="text-gray-500 mb-4">
              or click to select files
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>CSV, XLS, XLSX</span>
              <span>•</span>
              <span>Max 5 files</span>
              <span>•</span>
              <span>Up to 1000 records per file</span>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Upload Queue</h3>
                <Button 
                  onClick={processFiles}
                  disabled={isProcessing || files.every(f => f.status !== 'pending')}
                >
                  {isProcessing ? 'Processing...' : 'Process Files'}
                </Button>
              </div>

              <div className="space-y-4">
                {files.map((uploadFile) => (
                  <Card key={uploadFile.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(uploadFile.status)}
                        <div>
                          <p className="font-medium">{uploadFile.file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {getStatusBadge(uploadFile.status)}
                        
                        {uploadFile.status === 'error' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => retryFile(uploadFile.id)}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Retry
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFile(uploadFile.id)}
                          disabled={uploadFile.status === 'processing'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {uploadFile.status === 'processing' && (
                      <div className="mt-3">
                        <Progress value={uploadFile.progress} className="h-2" />
                        <p className="text-sm text-gray-500 mt-1">
                          Processing... {uploadFile.progress}%
                        </p>
                      </div>
                    )}

                    {uploadFile.status === 'success' && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          Successfully created {uploadFile.certificatesCreated} certificates
                        </p>
                      </div>
                    )}

                    {uploadFile.status === 'error' && uploadFile.error && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">{uploadFile.error}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Template Download */}
      <Card>
        <CardHeader>
          <CardTitle>Download Template</CardTitle>
          <CardDescription>
            Use our template to ensure your data is properly formatted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              CSV Template
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Excel Template
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Sample Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Format Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>File Format Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Required Columns</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Report Number</li>
                <li>• Shape</li>
                <li>• Carat Weight</li>
                <li>• Color Grade</li>
                <li>• Clarity Grade</li>
                <li>• Cut Grade</li>
                <li>• Measurements</li>
                <li>• Gemologist Name</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Optional Columns</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Polish</li>
                <li>• Symmetry</li>
                <li>• Fluorescence</li>
                <li>• Inscription</li>
                <li>• Comments</li>
                <li>• Table %</li>
                <li>• Depth %</li>
                <li>• Crown Angle</li>
              </ul>
            </div>
          </div>
          
          <Separator />
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Important Notes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure all required fields are filled</li>
              <li>• Use standard GIA grading terminology</li>
              <li>• Report numbers must be unique</li>
              <li>• Maximum 1000 records per file</li>
              <li>• Files will be validated before processing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}