import { Link } from "react-router-dom";
import { useHostReviews } from "@/hooks";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= (rating || 0) ? "text-[#FF385C]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function HostReviews({ user }) {
  const { data, isLoading } = useHostReviews(user);
  const propertiesReviews = data?.data?.properties_reviews ?? [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
          Loading reviews…
        </div>
      ) : propertiesReviews.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Reviews for your listings
          </h3>
          <p className="text-gray-600">
            Guest reviews for your properties will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {propertiesReviews.map((item) => (
            <div
              key={item.property?.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <Link
                  to={`/rooms/${item.property?.id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-[#FF385C] transition-colors"
                >
                  {item.property?.title ?? "Property"}
                </Link>
                {item.statistics?.overall_rating && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <span className="font-medium">
                      {item.statistics.overall_rating.average}
                    </span>
                    <span>·</span>
                    <span>
                      {item.statistics.overall_rating.total_count} reviews
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Comments
                </h3>
                {!item.reviews?.length ? (
                  <p className="text-sm text-gray-500">
                    No reviews yet for this property.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {item.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <StarRating rating={review.rating} />
                          <span className="text-sm text-gray-500">
                            {review.created_at}
                          </span>
                        </div>
                        <p className="text-gray-900 text-sm leading-relaxed">
                          {review.comment || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HostReviews;
