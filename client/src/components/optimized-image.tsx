import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=",
  sizes = "100vw",
  priority = false,
  quality = 80,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setCurrentSrc(src);
    onLoad?.();
  }, [src, onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const handleImageLoad = useCallback(() => {
    const img = new Image();
    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;
  }, [src, handleLoad, handleError]);

  // Start loading the image when component mounts
  useState(() => {
    if (priority) {
      handleImageLoad();
    } else {
      // Lazy load with intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleImageLoad();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      const element = document.createElement('div');
      observer.observe(element);
      
      return () => observer.disconnect();
    }
  });

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-70",
          hasError && "opacity-50"
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        onLoad={currentSrc === src ? handleLoad : undefined}
        onError={handleError}
      />
      
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
}