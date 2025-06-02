import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import logoPath from "@assets/1000119055-removebg-preview.png";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#ece5dc] to-white">
      <Card className="w-full max-w-md mx-4 border-[#8c745c]/20">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={logoPath} 
              alt="GIL - Gemological Institute Laboratories" 
              className="h-16 w-auto"
            />
          </div>
          
          <div className="flex justify-center items-center mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#8c745c]" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-[#8c745c] text-white rounded-lg hover:bg-[#8c745c]/90 transition-colors"
          >
            Return to Home
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
