import { queryKeys } from "@/data";
import { getCities, getCountries } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useCountries(options = {}) {
  return useQuery({
    queryKey: queryKeys.countries,
    queryFn: getCountries,
    ...options,
  });
}

export function useCities(countryId, options = {}) {
  return useQuery({
    queryKey: queryKeys.cities(countryId),
    queryFn: () => getCities(countryId),
    ...options,
  });
}
