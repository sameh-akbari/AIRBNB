import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileFavorites } from "@/hooks/profile";
import { queryKeys } from "@/data";
import { removeFavoriteProperty } from "@/services";

function getPropertyCardInfo(property) {
  const img = property.primary_image || property.images?.[0]?.url;
  const price = property.price_per_night != null ? `€ ${Number(property.price_per_night)}` : "—";
  const location = [property.city, property.country].filter(Boolean).join(", ") || "—";
  const rating = property.average_rating != null ? Number(property.average_rating).toFixed(2) : null;
  const reviews = property.reviews_count ?? 0;

  return { img, price, location, rating, reviews };
}

function Favorite({ user }) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProfileFavorites(page, user);
  const favorites = data?.data ?? [];
  const meta = data?.meta;

  const handleRemove = async (propertyId) => {
    try {
      await removeFavoriteProperty(propertyId);
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
      queryClient.invalidateQueries({ queryKey: queryKeys.favoritesList });
    } catch (_) {}
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Favorites</h2>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 animate-pulse">
                <div className="aspect-[4/3] bg-gray-300" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">Save homes you like by clicking the heart on any listing.</p>
          <Link to="/" className="inline-block bg-[#FF385C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E61E4D] transition-colors">
            Explore stays
          </Link>
        </div>
      ) : (
        <>
          {meta && (
            <p className="text-sm text-gray-600">
              {meta.total} favorite{meta.total !== 1 ? "s" : ""}
              {meta.total_page > 1 && ` · Page ${meta.page} of ${meta.total_page}`}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => {
              const { img, price, location, rating, reviews } = getPropertyCardInfo(property);

              return (
                <div
                  key={property.id}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <Link to={`/rooms/${property.id}`} className="block">
                    <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                      {img ? (
                        <img
                          src={img}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/95 text-sm font-semibold text-gray-900 shadow-sm">
                          {price}
                          <span className="text-gray-500 font-normal">/ night</span>
                        </span>
                      </div>
                      {property.is_guest_favorite && (
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/95 text-xs font-semibold text-gray-900 shadow-sm">
                          Guest favorite
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/rooms/${property.id}`} className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#FF385C] transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">{location}</p>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(property.id);
                        }}
                        className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#FF385C] transition-colors"
                        title="Remove from favorites"
                      >
                        <svg className="w-5 h-5" fill="#FF385C" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {(rating != null || reviews > 0) && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-gray-700">
                        {rating != null && (
                          <>
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-medium">{rating}</span>
                          </>
                        )}
                        {reviews > 0 && <span className="text-gray-500">({reviews} reviews)</span>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {meta && meta.total_page > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={meta.page <= 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                {meta.page} / {meta.total_page}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={meta.page >= meta.total_page}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Favorite;
