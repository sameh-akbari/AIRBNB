import axiosInstance from "@/api/axiosInstance";

export async function getAminitiesApi(cat) {
  const params = cat ? { category: cat } : {};
  const response = await axiosInstance.get("/amenities", { params });
  return response?.data?.data;
}

export async function getAllAmenitiesApi() {
  const response = await axiosInstance.get("/amenities");
  const data = response?.data?.data ?? response?.data;
  return Array.isArray(data) ? data : [];
}

export async function createAmenityApi(payload) {
  const response = await axiosInstance.post("/amenities", payload);
  return response?.data ?? null;
}

export async function updateAmenityApi(amenityId, payload) {
  const response = await axiosInstance.put(`/amenities/${amenityId}`, payload);
  return response?.data ?? null;
}

export async function deleteAmenityApi(amenityId) {
  const response = await axiosInstance.delete(`/amenities/${amenityId}`);
  return response?.data ?? null;
}
