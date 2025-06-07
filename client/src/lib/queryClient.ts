import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

// Custom fetch function for API requests
export async function apiRequest(method: string, url: string, body?: any) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }

  return response;
}

// Default fetcher for react-query
export const defaultQueryFn = async ({ queryKey }: { queryKey: readonly string[] }) => {
  const url = queryKey[0];
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Set the default query function
queryClient.setQueryDefaults([], {
  queryFn: defaultQueryFn,
});