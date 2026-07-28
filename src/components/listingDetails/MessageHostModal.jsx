export default function MessageHostModal({
  open,
  onClose,
  listing,
  messageHostText,
  onMessageHostTextChange,
  messageHostError,
  messageHostLoading,
  onSend,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-900">Message host</h3>
        <p className="text-sm text-gray-600">{listing?.title}</p>
        {messageHostError && (
          <p className="text-sm text-red-600">{messageHostError}</p>
        )}
        <textarea
          value={messageHostText}
          onChange={(e) => onMessageHostTextChange(e.target.value)}
          placeholder="Type your message…"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-y"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={messageHostLoading || !messageHostText.trim()}
            className="px-4 py-2 rounded-xl bg-[#FF385C] text-white font-medium hover:bg-[#E61E4D] disabled:opacity-50 disabled:cursor-not-allowed">
            {messageHostLoading ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
