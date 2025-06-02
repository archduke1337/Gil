import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Upload, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface BulkUploadProps {
  onSuccess: () => void;
}

export default function BulkUpload({ onSuccess }: BulkUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select certificate files to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('certificateFile', file);
        formData.append('referenceNumber', `GIL-${Date.now()}-${i + 1}`);

        await fetch('/api/certificates/upload', {
          method: 'POST',
          body: formData,
        });

        setProgress(((i + 1) / files.length) * 100);
      }

      toast({
        title: "Bulk upload completed",
        description: `Successfully uploaded ${files.length} certificates`,
      });

      setFiles([]);
      onSuccess();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Some files could not be uploaded",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <FileUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bulk Certificate Upload</h3>
            <p className="text-muted-foreground mb-4">
              Upload multiple certificate files at once for efficient processing
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="bulk-files">Select Certificate Files</Label>
                <Input
                  id="bulk-files"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="mt-1"
                />
              </div>

              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <h4 className="font-medium text-sm">Selected Files ({files.length})</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                          disabled={uploading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {uploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    Uploading... {Math.round(progress)}%
                  </p>
                </motion.div>
              )}

              <Button
                onClick={handleBulkUpload}
                disabled={files.length === 0 || uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FileUp className="w-4 h-4 mr-2" />
                    Upload {files.length} Files
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}