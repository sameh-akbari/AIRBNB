import axiosInstance from "@/api/axiosInstance";

export async function getConversations(params = {}) {
  const { page = 1, per_page = 20 } = params;
  const { data } = await axiosInstance.get("/messages/conversations", {
    params: { page, per_page },
  });
  return data;
}

export async function sendMessage(body) {
  const { data } = await axiosInstance.post("/messages", body);
  return data;
}

export async function submitTripReviewAPI(payload) {
  const { data } = await axiosInstance.post("/reviews", payload);
  if (!data?.success) {
    const error = new Error(data?.error?.message || "Request failed");
    error.response = { data };
    throw error;
  }
  return data;
}

export async function fetchConversationMessageAPI({
  conversationId,
  otherUserId,
  page,
  per_page,
}) {
  const payload = { page, per_page };
  if (conversationId !== null) payload.conversation_id = conversationId;
  if (otherUserId !== null) payload.user_id = otherUserId;

  const { data } = await axiosInstance.get("/messages", { params: payload });
  console.log(data);
  return data;
}

export async function updateConversationAPI(conversationId, body) {
  const { data } = await axiosInstance.patch(
    `conversations/${conversationId}`,
    body,
  );

  return data;
}
