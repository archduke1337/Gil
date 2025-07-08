import { useState, useEffect } from "react";
import { X, Cookie, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    advertising: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(savedPreferences);
        applyCookieSettings(savedPreferences);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Apply analytics cookies
    if (prefs.analytics) {
      // Enable Google Analytics or other analytics
      console.log("Analytics cookies enabled");
    }

    // Apply advertising cookies
    if (prefs.advertising) {
      // Enable AdSense and advertising cookies
      console.log("Advertising cookies enabled");
      // Initialize AdSense if needed
      loadAdSenseScript();
    }

    // Apply functional cookies
    if (prefs.functional) {
      // Enable additional functional cookies
      console.log("Functional cookies enabled");
    }
  };

  const loadAdSenseScript = () => {
    // Only load if not already loaded
    if (!document.querySelector('script[src*="pagead/js/adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      advertising: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    applyCookieSettings(allAccepted);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    applyCookieSettings(preferences);
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      advertising: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    applyCookieSettings(onlyNecessary);
    setIsVisible(false);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return; // Cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <Cookie className="h-8 w-8 text-primary mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">Cookie Preferences</h2>
                <p className="text-sm text-muted-foreground">We respect your privacy</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-foreground leading-relaxed">
              We use cookies to enhance your experience on our website. Some cookies are essential for basic 
              functionality, while others help us provide personalized content and analyze site usage.
            </p>
          </div>

          {showDetails && (
            <div className="space-y-4 mb-6 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium text-foreground">Necessary Cookies</h3>
                    <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Essential for website functionality, security, and basic features.
                  </p>
                </div>
                <Switch checked={preferences.necessary} disabled />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors use our website to improve user experience.
                  </p>
                </div>
                <Switch 
                  checked={preferences.analytics} 
                  onCheckedChange={(checked) => updatePreference("analytics", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Advertising Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Used to display relevant advertisements and measure ad effectiveness.
                  </p>
                </div>
                <Switch 
                  checked={preferences.advertising} 
                  onCheckedChange={(checked) => updatePreference("advertising", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Functional Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable enhanced features like personalized content and preferences.
                  </p>
                </div>
                <Switch 
                  checked={preferences.functional} 
                  onCheckedChange={(checked) => updatePreference("functional", checked)}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAcceptAll} className="flex-1">
              <Check className="h-4 w-4 mr-2" />
              Accept All
            </Button>
            <Button variant="outline" onClick={handleRejectNonEssential} className="flex-1">
              Essential Only
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showDetails ? "Hide" : "Customize"}
            </Button>
            {showDetails && (
              <Button variant="default" onClick={handleAcceptSelected} className="flex-1">
                Save Preferences
              </Button>
            )}
          </div>

          <div className="mt-4 text-xs text-center text-muted-foreground">
            Learn more in our{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            {" "}and{" "}
            <a href="/terms-of-service" className="text-primary hover:underline">
              Terms of Service
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}