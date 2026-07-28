import axiosInstance from "@/api/axiosInstance";

export async function addToCart(payload) {
  const response = await axiosInstance.post("/cart", payload);
  return response?.data?.data;
}

export async function fetchPaymentCartAPi() {
  const response = await axiosInstance.get("/cart");
  return response?.data;
}
