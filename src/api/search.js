import axiosInstance from "@/api/axiosInstance";

export async function search(params = {}) {
  const { data } = await axiosInstance.get("/search", { params });
  return data;
}
