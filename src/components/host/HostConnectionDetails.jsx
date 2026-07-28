import { queryKeys } from "@/data";
import { useHostMessages } from "@/hooks";
import { sendHostMessage, updateHostConversation } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const DEFAULT_META = { page: 1, per_page: 20, total: 0, total_page: 1 };

function getApiError(err, fallback) {
  return (
    err?.response?.data?.error?.message ||
    err?.response?.data?.message ||
    err?.message ||
    fallback
  );
}

function HostConnectionDetails({ conversationId, otherUserId, onClose }) {
  const queryClient = useQueryClient();
  const [messagesPage, setMessagesPage] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState("");
  const [closeLoading, setCloseLoading] = useState(false);
  const [closeError, setCloseError] = useState("");

  const { data: messagesData, isLoading: messagesLoading } = useHostMessages({
    conversationId,
    otherUserId,
    page: messagesPage,
  });

  const rawMessages = messagesData?.data;
  const messages = Array.isArray(rawMessages?.messages)
    ? rawMessages.messages
    : Array.isArray(rawMessages)
      ? rawMessages
      : [];
  const messagesMeta = messagesData?.meta ?? DEFAULT_META;
  const conversationInfo = rawMessages?.conversation ?? null;
  const isTicketClosed =
    (conversationInfo?.status || "").toLowerCase() === "closed";
  const bookingId =
    conversationInfo?.booking_id ?? messages[0]?.booking_id;

  const invalidateConversation = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.message(conversationId, otherUserId),
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
  };

  const handleCloseTicket = async () => {
    if (conversationId == null) return;
    setCloseError("");
    setCloseLoading(true);
    try {
      await updateHostConversation(conversationId, { status: "closed" });
      invalidateConversation();
    } catch (err) {
      setCloseError(getApiError(err, "Failed to close ticket."));
    } finally {
      setCloseLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const content = newMessage.trim();
    if (!content || bookingId == null) return;
    setSendError("");
    setSendLoading(true);
    try {
      await sendHostMessage({ booking_id: bookingId, content });
      setNewMessage("");
      invalidateConversation();
    } catch (err) {
      setSendError(getApiError(err, "Failed to send message."));
    } finally {
      setSendLoading(false);
    }
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );

  if (messagesLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-600">Loading messages…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to list
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Conversation details
            </h3>
            {conversationInfo && (
              <p className="text-sm text-gray-600 mt-1">
                Status:{" "}
                <span className="capitalize font-medium">
                  {conversationInfo.status}
                </span>
                {conversationInfo.booking_id != null && (
                  <span className="ml-3">
                    Booking # {conversationInfo.booking_id}
                  </span>
                )}
              </p>
            )}
          </div>
          {!isTicketClosed && (
            <div>
              {closeError && (
                <p className="text-sm text-red-600 mb-2">{closeError}</p>
              )}
              <button
                type="button"
                onClick={handleCloseTicket}
                disabled={closeLoading}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {closeLoading ? "Closing…" : "Close Ticket"}
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No messages in this conversation.
            </p>
          ) : (
            sortedMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 border border-gray-200"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-semibold text-gray-900">
                    {msg.sender_name || "Sender"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {msg.created_at}
                  </span>
                </div>
                <p className="text-gray-800 text-sm whitespace-pre-wrap">
                  {msg.message}
                </p>
                <p className="text-xs text-gray-500">
                  To: {msg.receiver_name} ({msg.receiver_email})
                </p>
              </div>
            ))
          )}

          {messagesMeta.total_page > 1 && (
            <div className="flex justify-center gap-2 pt-4 border-t border-gray-200">
              <button
                type="button"
                disabled={messagesPage <= 1}
                onClick={() => setMessagesPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                {messagesMeta.page} of {messagesMeta.total_page}
              </span>
              <button
                type="button"
                disabled={messagesPage >= messagesMeta.total_page}
                onClick={() => setMessagesPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            {isTicketClosed ? (
              <div className="rounded-xl bg-red-100 border border-red-200 px-4 py-4 text-center">
                <p className="text-red-800 font-medium">
                  This ticket is closed.
                </p>
              </div>
            ) : (
              <>
                {sendError && (
                  <p className="text-sm text-red-600 mb-2">{sendError}</p>
                )}
                <div className="flex gap-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message…"
                    rows={3}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-y min-h-[80px]"
                    disabled={sendLoading || bookingId == null}
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={
                      sendLoading || !newMessage.trim() || bookingId == null
                    }
                    className="self-end px-5 py-3 rounded-xl bg-[#FF385C] text-white font-semibold hover:bg-[#E61E4D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {sendLoading ? "Sending…" : "Send"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostConnectionDetails;
