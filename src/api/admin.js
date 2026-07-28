import axiosInstance from "./axiosInstance";

export async function getAdminBookings(params = {}) {
  const {
    page = 1,
    per_page = 20,
    property_id,
    order,
    sort_by,
    status,
  } = params;
  const requestParams = { page, per_page };
  if (property_id != null && property_id !== "") {
    requestParams.property_id = property_id;
  }
  if (order) requestParams.order = order;
  if (sort_by) requestParams.sort_by = sort_by;
  if (status) requestParams.status = status;
  const { data } = await axiosInstance.get("/bookings", {
    params: requestParams,
  });
  return data ?? null;
}
