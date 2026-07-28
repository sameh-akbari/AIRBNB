function ListingImageGallery({ listings, onPhotoClick }) {
  const images = listings?.images;

  if (!listings.images) {
    return (
      <div className="grid grid-cols-4 gap-2 mb-8 h-[500px]">
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden cursor-pointer">
          <span>No Image</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-8 h-[500px]">
        <div
          onClick={() => onPhotoClick(0)}
          className="col-span-2 row-span-2 rounded-xl overflow-hidden cursor-pointer">
          <img
            src={images[0]}
            alt={listings.title}
            className="w-full h-full object-cover"
          />
        </div>
        {images.slice(1, 4).map((image, index) => (
          <div
            onClick={() => onPhotoClick(index + 1)}
            key={index}
            className="rounded-xl overflow-hidden cursor-pointer">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="rounded-xl overflow-hidden relative">
          {images[4] ? (
            <div onClick={() => onPhotoClick(4)}>
              <img
                src={images[4]}
                alt=""
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          ) : (
            <div className="w-full h-full object-cover bg-gray-200 flex items-center justify-center">
              <span>No More Image</span>
            </div>
          )}

          {images.length > 5 && (
            <div
              onClick={() => onPhotoClick(0)}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Show all photos
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListingImageGallery;
