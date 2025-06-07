import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

// Optimized QueryClient for maximum performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
      refetchOnWindowFocus: false,
      retry: 2
    },
  },
});

// Pre-cache critical data for instant loading
queryClient.prefetchQuery({
  queryKey: ["/api/certificates"],
  queryFn: () => fetch("/api/certificates").then(res => res.json()),
  staleTime: 1000 * 60 * 5
}).catch(() => {
  // Ignore prefetch errors - data will load on demand
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
