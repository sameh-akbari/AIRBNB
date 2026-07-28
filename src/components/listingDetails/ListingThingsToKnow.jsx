function ListingThingsToKnow() {
  return (
    <>
      <div className="border-t border-gray-200 pt-12 mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Things to know
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold text-gray-900">
                  Cancellation policy
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Free cancellation for 24 hours. After that, the reservation
                is non-refundable.
              </p>
              <a href="#" className="text-sm text-gray-600 underline">
                Review this host's full policy for details. Learn more
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-semibold text-gray-900">
                  House rules
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Check-in: 3:00 PM - 11:00 PM
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Checkout before 12:00 PM
              </p>
              <p className="text-sm text-gray-600 mb-2">2 guests maximum</p>
              <a href="#" className="text-sm text-gray-600 underline">
                Learn more
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-semibold text-gray-900">
                  Safety &amp; property
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Carbon monoxide detector not required
              </p>
              <p className="text-sm text-gray-600 mb-2">Smoke alarm</p>
              <p className="text-sm text-gray-600 mb-2">
                Must climb stairs
              </p>
              <a href="#" className="text-sm text-gray-600 underline">
                Learn more
              </a>
            </div>
          </div>
        </div>
    </>
  );
}

export default ListingThingsToKnow;
