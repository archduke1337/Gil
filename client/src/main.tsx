import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

// Optimized QueryClient configuration for faster loading
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false;
        return failureCount < 2;
      }
    },
  },
});

// Pre-warm critical API endpoints for faster loading
queryClient.prefetchQuery({
  queryKey: ["/api/certificates"],
  queryFn: () => fetch("/api/certificates").then(res => res.json()),
  staleTime: 1000 * 60 * 5
});

// Preload critical resources
const link = document.createElement('link');
link.rel = 'preload';
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
link.as = 'style';
link.onload = () => { link.rel = 'stylesheet'; };
document.head.appendChild(link);

const root = createRoot(document.getElementById("root")!);

// Enable concurrent features for faster rendering
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
