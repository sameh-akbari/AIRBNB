import axiosInstance from "@/api/axiosInstance";

export async function getMyPropertiesReviews(params = {}) {
  const { per_property = 50 } = params;
  const { data } = await axiosInstance.get("/reviews/my-properties-reviews", {
    params: { per_property },
  });
  return data;
}
