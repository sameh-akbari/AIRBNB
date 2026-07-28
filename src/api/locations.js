import { axiosInstance } from "@/api";

export async function getDestinations() {
  const { data } = await axiosInstance.get("/locations/destinations");
  return data;
}

export async function getCountriesApi() {
  const response = await axiosInstance.get("/locations/countries");
  return response?.data?.data;
}

export async function getCitiesApi(countryId) {
  console.log(countryId);
  if (!countryId) return [];
  const params = { country_id: countryId };
  const response = await axiosInstance.get("/locations/cities", { params });
  return response?.data?.data;
}

export async function createCountryApi(payload) {
  const response = await axiosInstance.post("/locations/countries", payload);
  return response?.data?.data;
}

export async function createCityApi(payload) {
  console.log(payload);
  const response = await axiosInstance.post("/locations/cities", payload);
  return response?.data?.data;
}
