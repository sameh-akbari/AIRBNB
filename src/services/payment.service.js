/* eslint-disable no-constant-binary-expression */
import { createBooking, fetchPaymentCartAPi } from "@/api";

export function fetchPaymentCart() {
  return fetchPaymentCartAPi();
}

export function submitBookingRequest(payload) {
  return createBooking(payload);
}
