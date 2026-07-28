import { queryKeys } from "@/data";
import { fetchSearchDestinations } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useDestinations(options = {}) {
  return useQuery({
    queryKey: queryKeys.destinations,
    queryFn: fetchSearchDestinations,
    ...options,
  });
}
