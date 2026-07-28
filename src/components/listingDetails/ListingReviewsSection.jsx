function ListingReviewsSection({ reviews, reviewStat, onShowReviewsModal }) {
  return (
    <>
      <div id="reviews" className="mb-16 scroll-mt-24">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[#FF385C] fill-current"
                viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-4xl font-semibold text-gray-900">
                {reviewStat?.overall_rating.average}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg text-gray-600">
                · {reviewStat?.overall_rating.total_count} reviews
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-4">
                Overall rating
              </div>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviewStat?.overall_rating.by_star[stars];
                  const percentage =
                    (count / reviewStat?.overall_rating.total_count) * 100;
                  return (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-6">{stars}</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-900"
                          style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="space-y-4">
                {[
                  {
                    key: "cleanliness",
                    label: "Cleanliness",
                    icon: "M19.5 10.5v-1a3 3 0 00-3-3h-3m-6 0H6a3 3 0 00-3 3v1m0 0v6a3 3 0 003 3h12a3 3 0 003-3v-6m-3 0h-3m-3 0H9m0 0H6m3 0v6m0-6h3m-3 6h3m6-6v6m0-6h-3m3 6h-3",
                  },
                  {
                    key: "accuracy",
                    label: "Accuracy",
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                  {
                    key: "checkin",
                    label: "Check-in",
                    icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
                  },
                  {
                    key: "communication",
                    label: "Communication",
                    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                  },
                  {
                    key: "location",
                    label: "Location",
                    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  },
                  {
                    key: "value",
                    label: "Value",
                    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
                  },
                ].map(({ key, label, icon }) => {
                  const stat = reviewStat[key];
                  if (!stat) return;
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d={icon}
                          />
                        </svg>
                        <span className="text-sm text-gray-900">{label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {stat.average}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-8">
              <div className="flex items-start gap-3 mb-4">
                {review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex-shrink-0 bg-gray-200" />
                )}

                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    {review.user.name}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          className={`w-4 h-4 ${star <= review.rating ? "text-[#FF385C]" : "text-gray-300"} `}
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">·</span>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-900 leading-relaxed text-[15px]">
                {review.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onShowReviewsModal}
            className="text-sm font-semibold text-gray-900 underline">
            Show all {reviewStat?.overall_rating.total_count} reviews
          </button>
          <a href="#" className="text-sm text-gray-600 hover:underline">
            How reviews work
          </a>
        </div>
      </div>
    </>
  );
}

export default ListingReviewsSection;
