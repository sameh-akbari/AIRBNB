import { AmenityIcon } from "@/components";

function AmenitiesModal({ open, onClose, categorizeAmenities }) {
  if (!open) return null;
  return (
    <>
      <div
        id="amenities-modal"
        className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center py-8 px-4 overflow-y-auto [&:target]:flex">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[calc(100vh-4rem)] overflow-y-auto mt-8">
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">
              What this place offers
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            {Object.entries(categorizeAmenities).map(
              ([category, items]) =>
                items.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {category}
                    </h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div className="flex items-start gap-3">
                          <AmenityIcon amenity={item} />
                          <span className="text-sm text-gray-900">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AmenitiesModal;
