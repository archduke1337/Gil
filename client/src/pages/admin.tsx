import { useState } from "react";
import { Link } from "wouter";
import { Gem, ArrowLeft } from "lucide-react";
import AdminLogin from "@/components/admin-login";
import AdminDashboard from "@/components/admin-dashboard";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/1000119055-removebg-preview.png";
import { usePageTitle } from "@/hooks/use-page-title";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <>
          {/* Navigation for non-logged in state */}
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <img 
                    src={logoPath} 
                    alt="GIL - Gemological Institute Laboratories" 
                    className="h-10 w-auto"
                  />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">GILab.info</h1>
                    <p className="text-xs text-gray-500">Gemological Institute Laboratories</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/">
                    <Button variant="ghost" className="text-gray-500 hover:text-blue-700">
                      Certificate Verification
                    </Button>
                  </Link>
                  <Button variant="ghost" className="text-blue-700 border-b-2 border-blue-700">
                    Admin Panel
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          <AdminLogin onLogin={() => setIsLoggedIn(true)} />
        </>
      ) : (
        <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}
