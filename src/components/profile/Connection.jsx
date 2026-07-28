import { useState } from "react";
import { useProfileConversations } from "@/hooks";
import { ConnectionDetails } from "@/components";

const DEFAULT_META = { page: 1, per_page: 20, total: 0, total_page: 1 };

function Connection({ user }) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProfileConversations(page, user);
  const [selected, setSelected] = useState(null);
  const conversations = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta ?? DEFAULT_META;

  const openConversation = (conversationId, otherUserId) => {
    setSelected({ conversationId, otherUserId });
  };

  const closeConversation = () => {
    setSelected(null);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Connections</h2>
      {selected ? (
        <ConnectionDetails
          conversationId={selected.conversationId}
          otherUserId={selected.otherUserId}
          onClose={setSelected}
        />
      ) : (
        <>
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600">Loading conversations…</p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No conversations yet
              </h3>
              <p className="text-gray-600">
                Your conversations will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <div
                  key={conv.conversation_id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">
                        {conv.other_user?.name ||
                          conv.other_user?.email ||
                          "User"}
                      </span>
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                        {conv.status || "—"}
                      </span>
                      {conv.unread_count > 0 && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          {conv.unread_count} unread
                        </span>
                      )}
                    </div>
                    {conv.other_user?.email && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        {conv.other_user.email}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2 line-clamp-1">
                      {conv.last_message || "—"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {conv.last_message_time || ""}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      openConversation(conv.conversation_id, conv.other_user.id)
                    }
                    type="button"
                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 font-medium text-gray-900 transition-colors">
                    Details
                  </button>
                </div>
              ))}

              {meta.total_page > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600">
                    {meta.page} of {meta.total_page}
                  </span>
                  <button
                    type="button"
                    disabled={page >= meta.total_page}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Connection;
