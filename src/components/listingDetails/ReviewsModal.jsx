import { useMemo, useState } from "react";

const DETAILED_RATINGS = [
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
];

function ReviewsModal({ open, onClose, reviews, reviewStat }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("most-relevant");

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (review) =>
          review.text.toLowerCase().includes(query) ||
          review.user.name.toLowerCase().includes(query),
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "highest-rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest-rating":
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return result;
  }, [reviews, searchQuery, sortBy]);

  if (!open) return null;

  const { overall_rating: overallRating } = reviewStat;
  const isGuestFavorite = overallRating.average >= 4.8;

  return (
    <div
      id="reviews-modal"
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative mx-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close">
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
            <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-6">
              <div className="text-7xl font-semibold text-gray-900">
                {overallRating.average}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-10 h-10 text-[#FF385C]"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                {isGuestFavorite && (
                  <>
                    <div className="text-base font-semibold text-gray-900 mb-2">
                      Guest favorite
                    </div>
                    <div className="text-sm text-gray-600 max-w-md leading-relaxed">
                      This home is in the top 5% of eligible listings based on
                      ratings, reviews, and reliability.
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold text-gray-900 mb-1">
                {overallRating.total_count} reviews
              </div>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                How reviews work
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search all reviews"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent">
              <option value="most-relevant">Most relevant</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest-rating">Highest rating</option>
              <option value="lowest-rating">Lowest rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-5">
                  Overall rating
                </div>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = overallRating.by_star[stars];
                    const percentage =
                      (count / overallRating.total_count) * 100;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-4">
                          {stars}
                        </span>
                        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-900"
                            style={{ width: `${percentage}%` }}
                          />
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
                <div className="text-sm font-semibold text-gray-900 mb-5">
                  Detailed ratings
                </div>
                <div className="space-y-5">
                  {DETAILED_RATINGS.map(({ key, label, icon }) => {
                    const stat = reviewStat[key];
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
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

            <div className="lg:col-span-2">
              <div className="space-y-8">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-8 last:border-0">
                      <div className="flex items-start gap-4 mb-4">
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
                                  key={star}
                                  className={`w-4 h-4 ${star <= review.rating ? "text-[#FF385C]" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">·</span>
                            <span className="text-sm text-gray-600">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-900 leading-relaxed text-[15px]">
                        {review.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">
                    No reviews match your search.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsModal;
