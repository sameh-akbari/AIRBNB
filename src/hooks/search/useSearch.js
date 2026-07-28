import { search } from "@/api";
import { queryKeys } from "@/data";
import { useQuery } from "@tanstack/react-query";

export function useSearchProperties(searchParams, options = {}) {
  return useQuery({
    queryKey: queryKeys.search(searchParams),
    queryFn: () => search(searchParams),
    ...options,
  });
}
