import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

// Optimized QueryClient configuration for maximum speed
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 3
    },
  },
});



const root = createRoot(document.getElementById("root")!);

// Enable concurrent features for faster rendering
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
