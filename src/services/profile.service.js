import {
  getUserProfile,
  updateUserProfile,
  getMyBookings,
  getFavoritesList,
  getConversations,
  submitTripReviewAPI,
  removeFavorite,
  sendMessage,
  fetchConversationMessageAPI,
  updateConversationAPI,
} from "@/api";

export async function fetchProfileUser(userId) {
  return getUserProfile(userId);
}

export async function saveProfileUser(handler) {
  return updateUserProfile(handler);
}

export async function fetchMyTrips(params = {}) {
  return getMyBookings(params);
}

export async function fetchFavoritesPage(params = {}) {
  return getFavoritesList(params);
}

export async function fetchConversations(params = {}) {
  return getConversations(params);
}

export async function submitTripReview(payload) {
  return submitTripReviewAPI(payload);
}

export async function removeFavoriteProperty(propertyId) {
  return removeFavorite(propertyId);
}

export async function sendProfileMessage(payload) {
  return sendMessage(payload);
}

export async function fetchConversationMessage({
  conversationId,
  otherUserId,
  page,
  per_page,
}) {
  return fetchConversationMessageAPI({
    conversationId,
    otherUserId,
    page,
    per_page,
  });
}

export async function updateProfileMessage(conversationId, payload) {
  return updateConversationAPI(conversationId, payload);
}
