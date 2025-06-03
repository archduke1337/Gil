import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, X, Eye, Download, RotateCw, ZoomIn, ZoomOut,
  Image as ImageIcon, Video, FileImage, AlertCircle, Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoFile {
  id: string;
  file: File;
  preview: string;
  type: 'gem' | 'inclusion' | 'clarity' | 'video';
  uploadProgress: number;
  uploaded: boolean;
  error?: string;
}

interface PhotoUploadManagerProps {
  onPhotosChange: (photos: PhotoFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export default function PhotoUploadManager({ 
  onPhotosChange, 
  maxFiles = 10, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime']
}: PhotoUploadManagerProps) {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (photos.length + acceptedFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    const newPhotos: PhotoFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'gem',
      uploadProgress: 0,
      uploaded: false,
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
    
    // Simulate upload process
    simulateUpload(newPhotos);
  }, [photos, maxFiles, toast, onPhotosChange]);

  const simulateUpload = async (newPhotos: PhotoFile[]) => {
    setUploading(true);
    
    for (const photo of newPhotos) {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setPhotos(prev => prev.map(p => 
          p.id === photo.id 
            ? { ...p, uploadProgress: progress, uploaded: progress === 100 }
            : p
        ));
      }
    }
    
    setUploading(false);
    toast({
      title: "Upload Complete",
      description: `${newPhotos.length} file(s) uploaded successfully`,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: maxFiles - photos.length,
    disabled: uploading
  });

  const removePhoto = (id: string) => {
    const updatedPhotos = photos.filter(p => p.id !== id);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const changePhotoType = (id: string, type: PhotoFile['type']) => {
    const updatedPhotos = photos.map(p => 
      p.id === id ? { ...p, type } : p
    );
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const getTypeColor = (type: PhotoFile['type']) => {
    const colors = {
      gem: 'bg-emerald-100 text-emerald-800',
      inclusion: 'bg-red-100 text-red-800',
      clarity: 'bg-blue-100 text-blue-800',
      video: 'bg-purple-100 text-purple-800',
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Photo & Video Upload</span>
          </CardTitle>
          <CardDescription>
            Upload high-quality images and videos of the diamond
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-emerald-400 bg-emerald-50' 
                : 'border-gray-300 hover:border-gray-400'
            } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-gray-500 mb-4">
              or click to select files
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>JPEG, PNG, WebP</span>
              <span>•</span>
              <span>MP4, MOV videos</span>
              <span>•</span>
              <span>Max {maxFiles} files</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({photos.length}/{maxFiles})</CardTitle>
            <CardDescription>
              Manage your uploaded photos and videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                    {photo.file.type.startsWith('video/') ? (
                      <video 
                        src={photo.preview} 
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={photo.preview} 
                        alt="Diamond" 
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => removePhoto(photo.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {!photo.uploaded && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
                        <Progress value={photo.uploadProgress} className="h-1" />
                        <p className="text-white text-xs mt-1">
                          Uploading... {photo.uploadProgress}%
                        </p>
                      </div>
                    )}

                    {/* Upload Status */}
                    {photo.uploaded && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    {photo.error && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {photo.file.name}
                      </p>
                      <Badge className={getTypeColor(photo.type)}>
                        {photo.type}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    {/* Type Selection */}
                    <div className="flex space-x-1">
                      {(['gem', 'inclusion', 'clarity', 'video'] as const).map((type) => (
                        <Button
                          key={type}
                          size="sm"
                          variant={photo.type === type ? "default" : "outline"}
                          onClick={() => changePhotoType(photo.id, type)}
                          className="text-xs px-2 py-1 h-6"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileImage className="w-5 h-5" />
            <span>Photography Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Gem Photos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use macro lens for close-up details</li>
                <li>• Ensure even lighting without shadows</li>
                <li>• Capture multiple angles (top, side, profile)</li>
                <li>• Use neutral background (white/gray)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Inclusion Photos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use 10x magnification minimum</li>
                <li>• Focus on specific inclusion features</li>
                <li>• Document location and characteristics</li>
                <li>• Ensure sharp focus and clarity</li>
              </ul>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Recommended: 2048x2048px or higher</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Format: JPEG, PNG, WebP</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}