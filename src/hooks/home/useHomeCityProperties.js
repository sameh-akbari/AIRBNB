import { queryKeys } from "@/data";
import { fetchPropertiesCity } from "@/services/home.service";
import { useQueries } from "@tanstack/react-query";

export function useHomeCityProperties(homeCities = []) {
  return useQueries({
    queries: homeCities.map((city) => ({
      queryKey: queryKeys.properties(city.cityId),
      queryFn: () => fetchPropertiesCity(city.cityId),
      enabled: homeCities.length > 0,
    })),
  });
}
