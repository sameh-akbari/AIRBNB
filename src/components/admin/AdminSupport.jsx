import { useState } from "react";
import { INITIAL_SUPPORT_MESSAGES } from "@/data";

function AdminSupport() {
  const [messages, setMessages] = useState(INITIAL_SUPPORT_MESSAGES);
  const [statusFilter, setStatusFilter] = useState("");

  const toggleStatus = (messageId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, status: m.status === "open" ? "resolved" : "open" }
          : m,
      ),
    );
  };

  const filteredMessages = statusFilter
    ? messages.filter((m) => m.status === statusFilter)
    : messages;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Support Messages
        </h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            No support messages found.
          </div>
        ) : (
          filteredMessages.map((message) => {
            const isOpen = message.status === "open";
            return (
              <div
                key={message.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {message.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      From: {message.user}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      isOpen
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {isOpen ? "Open" : "Resolved"}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{message.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{message.date}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleStatus(message.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        isOpen
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      {isOpen ? "Mark as Resolved" : "Reopen"}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold hover:bg-blue-200"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminSupport;
