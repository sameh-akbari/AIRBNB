export default function AboutSpaceModal({ open, onClose, listing }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={() => onClose()}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            About this space
          </h2>
          <button
            onClick={() => onClose()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-900 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Nearby Locations */}
          <div>
            <div className="space-y-2">
              {listing.allNearby?.map((item, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Guest access */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Guest access</h3>
            <p className="text-sm text-gray-600">{listing.guestAccess}</p>
          </div>

          {/* Other things to note */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Other things to note
            </h3>
            <ul className="space-y-2">
              {listing.otherThingsToNote?.map((note, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
