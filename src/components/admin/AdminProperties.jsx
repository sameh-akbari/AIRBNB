import { useState } from "react";
import { useAdminProperties } from "@/hooks";

const DEFAULT_META = { page: 1, per_page: 10, total: 0, total_page: 0 };

function AdminProperties() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminProperties(page, 10);
  const properties = data?.data ?? [];
  const meta = data?.meta ?? DEFAULT_META;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Properties</h2>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading properties…
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/10] bg-gray-100">
                  <img
                    src={p.primary_image || p.images?.[0]?.url}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {p.title}
                    </h3>
                    <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {p.property_type?.name ?? "—"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {p.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {p.address}, {p.city}, {p.country}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
                    <span>{p.bedrooms} bed</span>
                    <span>·</span>
                    <span>{p.beds} beds</span>
                    <span>·</span>
                    <span>{p.bathrooms} bath</span>
                    <span>·</span>
                    <span>{p.max_guests} guests</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {p.average_rating != null ? (
                        <span className="text-sm font-medium text-gray-900">
                          ★ {p.average_rating}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">No reviews</span>
                      )}
                      {p.reviews_count != null && p.reviews_count > 0 && (
                        <span className="text-sm text-gray-500">
                          ({p.reviews_count})
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      €{p.price_per_night}/night
                    </span>
                  </div>
                  {p.host && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                      <img
                        src={p.host.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover bg-gray-200"
                      />
                      <span className="text-sm text-gray-600">{p.host.name}</span>
                      {p.host.is_superhost && (
                        <span className="text-xs font-medium text-[#FF385C]">
                          Superhost
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(p.amenities ?? []).slice(0, 5).map((a) => (
                      <span
                        key={a.id}
                        className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600"
                      >
                        {a.name}
                      </span>
                    ))}
                    {(p.amenities?.length ?? 0) > 5 && (
                      <span className="text-xs text-gray-400">
                        +{p.amenities.length - 5}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Status: {p.status ?? "—"} · Created {p.created_at}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {meta.total_page > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page {meta.page} of {meta.total_page} ({meta.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((x) => Math.max(1, x - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((x) => Math.min(meta.total_page, x + 1))}
                  disabled={page >= meta.total_page}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminProperties;
