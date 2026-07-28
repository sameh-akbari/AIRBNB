import { queryKeys } from "@/data";
import { getAminities } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useAminity(category, options = {}) {
  return useQuery({
    queryKey: queryKeys.amenities(category),
    queryFn: () => getAminities(category),
    ...options,
  });
}
