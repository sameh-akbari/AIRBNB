import axiosInstance from "@/api/axiosInstance";

export async function getUserProfile(userId) {
  const { data } = await axiosInstance.get(`hosts/${userId}/profile`);
  return data;
}

export async function updateUserProfile(handler) {
  const { data } = await axiosInstance.put(`/hosts/profile`, handler);
  return data;
}

export async function getMyBookings(params = {}) {
  const { status, page = 1, per_page = 10 } = params;
  const requestParams = { page, per_page };
  if (status != null && status !== "") {
    requestParams.status = status;
  }
  const { data } = await axiosInstance.get("/bookings/my-bookings", {
    params: requestParams,
  });
  return data;
}
