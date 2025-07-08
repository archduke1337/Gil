import { useEffect, useRef } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "banner" | "square";
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseAd({ 
  adSlot, 
  adFormat = "auto", 
  style = {}, 
  className = "",
  responsive = true 
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Only push ad once per component instance
    if (!isAdPushed.current && adRef.current) {
      try {
        // Initialize adsbygoogle array if it doesn't exist
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }
        
        // Push the ad to be processed
        window.adsbygoogle.push({});
        isAdPushed.current = true;
      } catch (error) {
        console.error("Error loading AdSense ad:", error);
      }
    }
  }, []);

  const defaultStyle = {
    display: "block",
    width: "100%",
    ...style
  };

  return (
    <div className={`adsense-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-9411632521970777"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

// Predefined ad components for common placements
export function HeaderBannerAd() {
  return (
    <AdSenseAd
      adSlot="4098765432" // GIL Header Banner
      adFormat="banner"
      className="mb-6"
      style={{ height: "90px" }}
    />
  );
}

export function SidebarAd() {
  return (
    <AdSenseAd
      adSlot="1098765432" // GIL Sidebar Rectangle
      adFormat="rectangle"
      className="mb-4"
      style={{ height: "250px", maxWidth: "300px" }}
    />
  );
}

export function ContentAd() {
  return (
    <AdSenseAd
      adSlot="2098765432" // GIL Content Native
      adFormat="auto"
      className="my-8"
      responsive={true}
    />
  );
}

export function FooterAd() {
  return (
    <AdSenseAd
      adSlot="3098765432" // GIL Footer Banner
      adFormat="banner"
      className="mt-6"
      style={{ height: "90px" }}
    />
  );
}