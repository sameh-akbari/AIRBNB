import axiosInstance from "@/api/axiosInstance";

export async function getMyPropertiesBookings(params = {}) {
  const { page = 1, per_page = 10 } = params;
  const { data } = await axiosInstance.get("/bookings/my-properties-bookings", {
    params: { page, per_page },
  });
  return data;
}

export async function confirmBookingApi(bookId) {
  const response = await axiosInstance.put(`/bookings/${bookId}/confirm`);
  return response?.data ?? null;
}

export async function rejectBookingApi(bookId) {
  const response = await axiosInstance.put(`/bookings/${bookId}/reject`);
  return response?.data ?? null;
}

export async function createBooking(payload) {
  const response = await axiosInstance.post("/bookings", payload);
  return response?.data ?? null;
}
