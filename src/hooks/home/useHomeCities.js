import { useDestinations } from "@/hooks";
import { mapDestinationsToHomeCities } from "@/services";

export function useHomeCities() {
  const query = useDestinations();
  const homeCities = mapDestinationsToHomeCities(query.data);
  return { ...query, homeCities };
}
