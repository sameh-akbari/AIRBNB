function ListingHostProfile({
  listing,
  user,
  hasUpcomingBookingForThisProperty,
  onMessageHost,
}) {
  return (
    <div className="border-t border-gray-200 pt-16 mb-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Meet your host
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Host Info */}
        <div>
          <div className="flex items-start gap-6 mb-8">
            <div className="relative">
              {listing.host.avatar ? (
                <img
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#FF385C] flex items-center justify-center">
                  <span className="text-4xl font-semibold text-white">
                    {(listing.host.name || "H").charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#FF385C] rounded-full flex items-center justify-center border-2 border-white">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="font-semibold text-2xl text-gray-900 mb-2">
                {listing.host.name}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Superhost</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">
                  {listing.reviewsCount} Reviews
                </div>
                <div className="text-sm text-gray-600">
                  {listing.rating} ★ Rating
                </div>
                {listing.host.yearsHosting > 0 && (
                  <div className="text-sm text-gray-600">
                    {listing.host.yearsHosting} Years hosting
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {listing.host.school && (
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-sm text-gray-900">
                  Where I went to school: {listing.host.school}
                </span>
              </div>
            )}
            {listing.host.work && (
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-900">
                  My work: {listing.host.work}
                </span>
              </div>
            )}
          </div>

          {listing.host.bio && (
            <p className="text-sm text-gray-900 leading-relaxed">
              {listing.host.bio}
            </p>
          )}
        </div>

        {/* Right Column - Host Details */}
        <div>
          <div className="mb-6">
            <div className="font-semibold text-lg text-gray-900 mb-2">
              {listing.host.name} is a Superhost
            </div>
            <p className="text-sm text-gray-600">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </p>
          </div>

          {listing.host.coHosts.length > 0 && (
            <div className="mb-8">
              <div className="text-sm font-semibold text-gray-900 mb-3">
                Co-hosts
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={listing.host.coHosts[0].avatar}
                  alt={listing.host.coHosts[0].name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-sm text-gray-900">
                  {listing.host.coHosts[0].name}
                </span>
              </div>
            </div>
          )}

          {(listing.host.responseRate !== null ||
            listing.host.responseTime !== null) && (
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-900 mb-3">
                Host details
              </div>
              {listing.host.responseRate !== null && (
                <div className="text-sm text-gray-600 mb-1">
                  Response rate: {listing.host.responseRate}%
                </div>
              )}
              {listing.host.responseTime !== null && (
                <div className="text-sm text-gray-600">
                  Responds {listing.host.responseTime}
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-gray-600 mb-4">
            This listing is offered by an individual.{" "}
            <a href="#" className="underline">
              Learn more
            </a>
          </p>

          {user && hasUpcomingBookingForThisProperty && (
            <button
              type="button"
              onClick={onMessageHost}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors mb-6">
              Message host
            </button>
          )}

          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-[#FF385C] mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-gray-600">
              To help protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingHostProfile;
