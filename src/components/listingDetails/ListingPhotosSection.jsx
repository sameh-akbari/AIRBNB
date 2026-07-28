function ListingPhotosSection({ listing, onPhotoClick }) {
  return (
    <div id="photos" className="mb-16 scroll-mt-24">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {listing.images.map((img, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden cursor-pointer"
            onClick={() => {
              onPhotoClick(index);
            }}>
            <img
              src={img}
              alt={`Photo ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingPhotosSection;
