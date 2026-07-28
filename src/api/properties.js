import { axiosInstance } from "@/api";

export async function getProperties(cityId) {
  const params = {};
  if (typeof cityId === "string" || typeof cityId === "number") {
    params.city_id = cityId;
  }

  const response = await axiosInstance.get("/properties", { params });
  return response?.data?.data;
}

export async function getPropertyById(propertyId) {
  const response = await axiosInstance.get(`/properties/${propertyId}`);
  return response?.data?.data;
}

export async function getPropertyReview(propertyId) {
  const response = await axiosInstance.get(`/properties/${propertyId}/reviews`);
  return response?.data?.data;
}

export async function getPropertiesList(params = {}) {
  const { data } = await axiosInstance.get("/properties", { params });
  return data ?? null;
}

export async function getMyPropertiesList(params = {}) {
  const { page = 1, per_page = 10 } = params;
  const { data } = await axiosInstance.get("/properties/my/list", {
    params: { page, per_page },
  });
  return data;
}

export async function deletePropertyApi(propId) {
  const response = await axiosInstance.delete(`/properties/${propId}`);
  return response?.data ?? null;
}

export async function createProperty(payload) {
  const response = await axiosInstance.post("/properties", payload);
  return response?.data?.data;
}

export async function addPropertyImage(propertyId, payload) {
  const response = await axiosInstance.post(
    `/properties/${propertyId}/images`,
    payload,
  );
  console.log(response);
  return response?.data;
}

export async function addPropertyImages(propertyId, images) {
  if (!propertyId || !images.length) return;
  for (let i = 0; i < images.length; i++) {
    await addPropertyImage(propertyId, {
      image_url: images[i].image_url,
      is_primary: !!images[i].is_primary,
      order: i,
    });
  }
}
