import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

// Optimized QueryClient configuration for maximum speed
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes - more aggressive caching
      gcTime: 1000 * 60 * 30, // 30 minutes - keep data longer
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false, // Disable automatic refetching
      retry: 1, // Reduce retry attempts for faster failures
      networkMode: 'online'
    },
    mutations: {
      retry: 1
    }
  },
});

// Pre-warm critical API endpoints for faster loading
const prefetchCriticalData = async () => {
  try {
    await queryClient.prefetchQuery({
      queryKey: ["/api/certificates"],
      queryFn: () => fetch("/api/certificates").then(res => res.json()),
      staleTime: 1000 * 60 * 15 // Extended cache time
    });
  } catch (error) {
    console.log('Prefetch failed, will load on demand');
  }
};

// Start prefetching immediately
prefetchCriticalData();

// Advanced resource preloading for maximum speed
const preloadResources = () => {
  // Preload critical font with font-display: swap for instant text rendering
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  fontLink.onload = () => { fontLink.rel = 'stylesheet'; };
  document.head.appendChild(fontLink);

  // Preconnect to external domains
  const preconnectLinks = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
  preconnectLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Resource hints for faster loading
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = '//fonts.googleapis.com';
  document.head.appendChild(link);
};

preloadResources();

const root = createRoot(document.getElementById("root")!);

// Enable concurrent features for faster rendering
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
