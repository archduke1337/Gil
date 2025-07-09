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
      adSlot="7150312766" // GIL Header Banner - Real AdSense Slot
      adFormat="auto"
      className="mb-6"
      style={{ minHeight: "90px" }}
      responsive={true}
    />
  );
}

export function SidebarAd() {
  return (
    <AdSenseAd
      adSlot="7150312766" // GIL Sidebar Rectangle - Using same slot for now
      adFormat="auto"
      className="mb-4"
      style={{ minHeight: "250px", maxWidth: "300px" }}
      responsive={true}
    />
  );
}

export function ContentAd() {
  return (
    <AdSenseAd
      adSlot="7150312766" // GIL Content Native - Using same slot for now
      adFormat="auto"
      className="my-8"
      responsive={true}
    />
  );
}

export function FooterAd() {
  return (
    <AdSenseAd
      adSlot="7150312766" // GIL Footer Banner - Using same slot for now
      adFormat="auto"
      className="mt-6"
      style={{ minHeight: "90px" }}
      responsive={true}
    />
  );
}