import { type FC } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const BulkUpload: FC = () => {
  const { toast } = useToast();
  
  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/certificates/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast({
        title: 'Upload Successful',
        description: `${acceptedFiles.length} files were uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your files',
        variant: 'destructive',
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-gray-600">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop certificate files here, or click to select files'}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Supports PDF, JPG, PNG (up to 50MB each)
          </p>
          <Button className="mt-4" type="button">
            Select Files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkUpload;