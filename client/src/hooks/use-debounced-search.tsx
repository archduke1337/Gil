import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface UseDebounedSearchOptions {
  delay?: number;
  minLength?: number;
  enabled?: boolean;
}

export function useDebouncedSearch<T>(
  searchTerm: string,
  searchFunction: (term: string) => Promise<T[]>,
  options: UseDebounedSearchOptions = {}
) {
  const { delay = 300, minLength = 2, enabled = true } = options;
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  const shouldSearch = enabled && 
    debouncedTerm.length >= minLength && 
    debouncedTerm.trim() !== '';

  const query = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: () => searchFunction(debouncedTerm),
    enabled: shouldSearch,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    results: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    isSearching: shouldSearch && query.isFetching,
    debouncedTerm
  };
}

// Advanced search hook with caching and filtering
export function useAdvancedSearch<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
  options: UseDebounedSearchOptions = {}
) {
  const { delay = 150 } = options;
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  const filteredResults = useMemo(() => {
    if (!debouncedTerm.trim()) return items;

    const term = debouncedTerm.toLowerCase();
    return items.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term);
        }
        if (typeof value === 'number') {
          return value.toString().includes(term);
        }
        return false;
      })
    );
  }, [items, debouncedTerm, searchFields]);

  return {
    results: filteredResults,
    isSearching: searchTerm !== debouncedTerm,
    debouncedTerm,
    resultCount: filteredResults.length,
    totalCount: items.length
  };
}

// Certificate-specific search hook
export function useCertificateSearch(certificates: any[], searchTerm: string) {
  return useAdvancedSearch(
    certificates,
    searchTerm,
    ['reportNumber', 'referenceNumber', 'gemType', 'colorGrade', 'clarityGrade', 'shape'],
    { delay: 200 }
  );
}