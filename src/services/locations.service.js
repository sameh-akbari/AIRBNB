import {
  createCityApi,
  createCountryApi,
  getCitiesApi,
  getCountriesApi,
  getDestinations,
} from "@/api";

export async function fetchSearchDestinations() {
  return getDestinations();
}

export function mapDestinationsToHomeCities(response) {
  const items = response?.data ?? [];

  return items
    .filter((item) => item.properties_count > 0)
    .map((item) => ({
      cityId: item.city_id,
      cityName: item.city_name,
      title: item.label,
      countryId: item.country_id,
      propertiesCount: item.properties_count,
    }));
}

export async function getCountries() {
  return getCountriesApi();
}

export async function createCountry(params) {
  return createCountryApi(params);
}

export async function getCities(countryId) {
  return getCitiesApi(countryId);
}

export async function createCity(params) {
  return createCityApi(params);
}
