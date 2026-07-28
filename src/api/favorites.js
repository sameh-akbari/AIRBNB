import axiosInstance from "@/api/axiosInstance";

export async function addFavorite(propertyId) {
  const { data } = await axiosInstance.post("/favorites", {
    property_id: propertyId,
  });
  return data;
}

export async function getFavorites() {
  const response = await axiosInstance.get("/favorites");
  const raw = response?.data?.data;
  const list = Array.isArray(raw) ? raw : raw?.properties ?? raw?.data ?? [];
  return list.map((item) =>
    typeof item === "object" && item != null ? item.property_id ?? item.id : item,
  );
}

export async function getFavoritesList({ page = 1, per_page = 10 } = {}) {
  const response = await axiosInstance.get("/favorites", {
    params: { page, per_page },
  });
  const data = response?.data?.data ?? [];
  const meta = response?.data?.meta ?? { page: 1, per_page: 10, total: 0, total_page: 0 };
  return { data, meta };
}

export async function removeFavorite(propertyId) {
  const { data } = await axiosInstance.delete(`/favorites/${propertyId}`);
  return data;
}
