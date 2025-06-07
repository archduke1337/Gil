import { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Certificate } from "@shared/schema";
import GemLoadingSpinner from "@/components/gem-loading-spinner";

const verificationSchema = z.object({
  referenceNumber: z.string().min(1, "Reference number is required"),
});

type VerificationForm = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
  onResult: (result: { certificate: Certificate | null; found: boolean }) => void;
}

function VerificationForm({ onResult }: VerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      referenceNumber: "",
    },
  });

  const onSubmit = useCallback(async (data: VerificationForm) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", `/api/certificates/verify/${encodeURIComponent(data.referenceNumber)}`);
      const result = await response.json();
      
      // Check if verification was successful
      if (result.isValid && result.certificate) {
        onResult({ certificate: result.certificate, found: true });
        toast({
          title: "Certificate Found",
          description: "Certificate verification successful",
        });
      } else {
        onResult({ certificate: null, found: false });
        toast({
          title: "Certificate Not Found",
          description: result.message || "The reference number was not found in our database",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error.message.includes("404")) {
        onResult({ certificate: null, found: false });
        toast({
          title: "Certificate Not Found",
          description: "The reference number was not found in our database",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Verification Error",
          description: "An error occurred while verifying the certificate",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [onResult, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="referenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Certificate Reference Number
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="e.g., GIL-2024-001234"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-700 focus:outline-none transition-colors text-lg pr-12"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <GemLoadingSpinner size="sm" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Verify Certificate</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default VerificationForm;
