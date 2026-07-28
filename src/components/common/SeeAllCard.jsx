function SeeAllCard({ listings = [] }) {
  const previewImages = listings
    .slice(0, 4)
    .map((listing) => listing.image)
    .filter(Boolean);
  const defaultImage = "/images/airbnb.png";

  return (
    <div className="relative group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
        <div className="w-full h-[242px] relative">
          {previewImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-1 w-full h-full p-1">
              {previewImages.map((image, index) => (
                <div key={index} className="relative rounded overflow-hidden">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {previewImages.length < 4 &&
                Array.from({ length: 4 - previewImages.length }).map(
                  (_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="relative rounded overflow-hidden bg-gray-100">
                      <img
                        src={
                          previewImages[previewImages.length - 1] ||
                          defaultImage
                        }
                        alt="Preview"
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                  ),
                )}
            </div>
          ) : (
            <img
              src={defaultImage}
              alt="See all"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h3 className="text-[15px] font-medium text-gray-900 group-hover:underline leading-tight">
              See all
            </h3>
            <svg
              className="w-4 h-4 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeAllCard;
