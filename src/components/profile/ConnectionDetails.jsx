import { queryKeys } from "@/data";
import { useProfileMessage } from "@/hooks";
import { sendProfileMessage, updateProfileMessage } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function ConnectionDetails({ conversationId, otherUserId, onClose }) {
  const queryClient = useQueryClient();
  const [messagePage, setMessagePage] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(false);
  const [closeTicket, setCloseTicket] = useState(false);
  const { data: messageData, isLoading: messageLoading } = useProfileMessage({
    conversationId,
    otherUserId,
    page: messagePage,
  });
  console.log(messageData);

  const conversationInfo = messageData?.data?.conversation;
  const messages = messageData?.data?.messages;
  const meta = messageData?.meta;
  const isTicketClosed = conversationInfo?.status === "closed";
  const booking_id = conversationInfo.booking_id;

  const invalidateConversation = () => {
    queryClient.invalidateQueries({
      queryKey: ["message", conversationId, otherUserId],
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.conversations,
    });
  };

  const handleCloseTicket = async () => {
    if (conversationId == null) return;
    setCloseTicket(true);
    try {
      await updateProfileMessage(conversationId, { status: "closed" });
      invalidateConversation();
    } catch (error) {
      console.log(error);
    } finally {
      setCloseTicket(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage || !booking_id) return;

    await setSendMessage(true);
    setNewMessage("");
    invalidateConversation();
    try {
      await sendProfileMessage({ newMessage, booking_id });
    } catch (error) {
      console.log(error);
    } finally {
      setSendMessage(false);
    }
  };

  return (
    <>
      {messageLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600">Loading conversations…</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <button
              onClick={() => onClose()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
                  <p className="text-sm text-gray-600 mt-1">
                    Status:{" "}
                    <span className="capitalize font-medium">
                      {conversationInfo?.status}
                    </span>
                    <span className="ml-3">
                      Booking # {conversationInfo?.booking_id}
                    </span>
                  </p>
                </div>
                {isTicketClosed ? (
                  <p></p>
                ) : (
                  <>
                    <button
                      disabled={closeTicket}
                      onClick={handleCloseTicket}
                      className="px-4 py-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-900 hover:bg-gray-50">
                      {closeTicket ? "please wait..." : "Close Ticket"}
                    </button>
                  </>
                )}
              </div>
              <div className="p-6 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-semibold text-gray-900">
                        {msg.sender_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {msg.created_at}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm">{msg.message}</p>
                    <p className="text-xs text-gray-500">
                      To: {msg.receiver_name} ({msg.receiver_email})
                    </p>
                  </div>
                ))}

                {meta.total_page > 1 && (
                  <div className="flex justify-center gap-2 pt-4">
                    <button
                      type="button"
                      disabled={messagePage <= 1}
                      onClick={() => setMessagePage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                      Previous
                    </button>
                    <span className="px-4 py-2 text-gray-600">
                      {meta.page} of {meta.total_page}
                    </span>
                    <button
                      type="button"
                      disabled={messagePage >= meta.total_page}
                      onClick={() => setMessagePage((p) => p + 1)}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                )}

                {isTicketClosed ? (
                  <div class="pt-4 border-t border-gray-200">
                    <div class="rounded-xl bg-red-100 border border-red-200 px-4 py-4 text-center">
                      <p class="text-red-800 font-medium">
                        This ticket is closed.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message…"
                        rows="3"
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-y min-h-[80px]"></textarea>
                      <button
                        onClick={handleSendMessage}
                        disabled={sendMessage}
                        className="self-end px-5 py-3 rounded-xl bg-[#FF385C] text-white font-semibold hover:bg-[#E61E4D]">
                        {sendMessage ? "Sendind...." : "Send"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConnectionDetails;
