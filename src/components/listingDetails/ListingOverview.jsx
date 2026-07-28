function ListingOverview({ listings }) {
  return (
    <>
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {listings.type} in {listings.location}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <span>{listings.guests} guests</span>
          <span>·</span>
          <span>{listings.bedrooms} bedroom</span>
          <span>·</span>
          <span>{listings.beds} bed</span>
          <span>·</span>
          <span>{listings.baths} bath</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-900 fill-current"
            viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-sm font-medium text-gray-900">
            {listings.rating}
          </span>
          <span className="text-sm text-gray-600">·</span>
          <a href="#reviews" className="text-sm text-gray-600 underline">
            {listings.reviewsCount} reviews
          </a>
        </div>
        <div className="flex items-center gap-4 pt-8 border-t border-gray-200 mt-8">
          <img
            src={listings.host.avatar}
            alt="Oskar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">
              Hosted by {listings.host.name}
            </div>
            {listings.host.isSuperhost && (
              <div className="text-sm text-gray-600">
                Superhost · {listings.host.yearsHosting} years hosting
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingOverview;
