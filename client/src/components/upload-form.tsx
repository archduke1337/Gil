import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const uploadSchema = z.object({
  file: z.any().refine((files) => files?.length > 0, "Please select a file"),
});

type UploadForm = z.infer<typeof uploadSchema>;

interface UploadFormProps {
  onSuccess: () => void;
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const form = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = useCallback(async (data: UploadForm) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('certificateFile', data.file[0]);

      const response = await fetch('/api/certificates/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast({
        title: "Upload Successful",
        description: "Certificate has been uploaded successfully",
      });
      
      form.reset();
      onSuccess();
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the certificate",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast, onSuccess, form]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      form.setValue('file', files);
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate File</FormLabel>
              <FormControl>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Drop your certificate file here</p>
                  <p className="text-gray-500 mb-4">or</p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => field.onChange(e.target.files)}
                    className="max-w-xs mx-auto"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Supports PDF, JPG, JPEG, PNG files
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Certificate
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}