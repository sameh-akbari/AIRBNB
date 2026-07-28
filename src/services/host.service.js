import {
  getUserProfile,
  updateUserProfile,
  getMyPropertiesList,
  getMyPropertiesBookings,
  getMyPropertiesReviews,
  getConversations,
  sendMessage,
  fetchConversationMessageAPI,
  updateConversationAPI,
  confirmBookingApi,
  rejectBookingApi,
  deletePropertyApi,
  createProperty,
  addPropertyImages,
} from "@/api";

export async function fetchHostProfile(userId) {
  return getUserProfile(userId);
}

export async function saveHostProfile(body) {
  return updateUserProfile(body);
}

export async function fetchHostPropertiesList(params = {}) {
  return getMyPropertiesList(params);
}

export async function fetchHostBookings(params = {}) {
  return getMyPropertiesBookings(params);
}

export async function fetchHostReviews(params = {}) {
  return getMyPropertiesReviews(params);
}

export async function fetchHostConversations(params = {}) {
  return getConversations(params);
}

export async function sendHostMessage(payload) {
  return sendMessage(payload);
}

export async function fetchHostConversationMessages(params) {
  return fetchConversationMessageAPI(params);
}

export async function updateHostConversation(conversationId, payload) {
  return updateConversationAPI(conversationId, payload);
}

export async function confirmBooking(bookId) {
  return confirmBookingApi(bookId);
}

export async function rejectBooking(bookId) {
  return rejectBookingApi(bookId);
}

export async function propertyDelete(propId) {
  return deletePropertyApi(propId);
}

export async function addHostProperty({ payload, imageUrls }) {
  const created = await createProperty(payload);
  const propertyId = created?.id ?? null;
  if (propertyId && imageUrls.length > 0) {
    await addPropertyImages(propertyId, imageUrls);
  }
  return created;
}
