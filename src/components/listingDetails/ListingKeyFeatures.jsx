function ListingKeyFeatures({ hostName }) {
  return (
    <div className="border-b border-gray-200 pb-8 mb-8 space-y-6">
      <div className="flex items-start gap-4">
        <svg
          className="w-6 h-6 text-gray-900 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <div className="font-semibold text-gray-900 mb-1">
            Great check-in experience
          </div>
          <div className="text-sm text-gray-600">
            Recent guests loved the smooth start to this stay.
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <svg
          className="w-6 h-6 text-gray-900 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div>
          <div className="font-semibold text-gray-900 mb-1">
            Peace and quiet
          </div>
          <div className="text-sm text-gray-600">
            Guests say this home is in a quiet area.
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <svg
          className="w-6 h-6 text-gray-900 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        <div>
          <div className="font-semibold text-gray-900 mb-1">
            {hostName} is a Superhost
          </div>
          <div className="text-sm text-gray-600">
            Superhosts are experienced, highly rated Hosts.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingKeyFeatures;
