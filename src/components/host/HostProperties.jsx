import { useState } from "react";
import { useHostProperties, useHostPropertyMutations } from "@/hooks";
import { Link } from "react-router-dom";
import AddPropertyModal from "@/components/host/modal/AddPropertyModal";

const DEFAULT_META = { page: 1, per_page: 10, total: 0, total_page: 1 };

function HostProperties({ user }) {
  const [page, setPage] = useState(1);
  const [showProperty, setShowProperty] = useState(false);
  const { data, isLoading } = useHostProperties(page, user);
  const properties = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta ?? DEFAULT_META;

  const { deletePropertyMutation, addPropertyMutation } =
    useHostPropertyMutations();

  const isPending = deletePropertyMutation.isPending;
  const handleDelete = (propId) => {
    if (!propId || !window.confirm("Are You Sure Delete This Item?")) return;
    deletePropertyMutation.mutate(propId);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            My Properties
          </h2>
          <button
            onClick={() => setShowProperty(true)}
            type="button"
            className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D] transition-colors">
            Add Property
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            Loading properties…
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">You have no properties yet.</p>
            <button
              type="button"
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D] transition-colors">
              Add Property
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3] bg-gray-200">
                    <img
                      src={
                        property.primary_image ||
                        property.images?.[0]?.url ||
                        ""
                      }
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/95 text-sm font-semibold text-gray-900 shadow-sm">
                      € {Number(property.price_per_night) || 0} / night
                    </span>
                    <span
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        (property.status || "").toLowerCase() === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {property.status || "—"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {[property.city, property.country]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to={`/rooms/${property.id}`}
                        type="button"
                        className="flex-1 text-center py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        type="button"
                        disabled={isPending}
                        className="flex-1 py-2 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50">
                        {isPending ? "Deleting...." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {meta.total_page > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={meta.page <= 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {meta.page} of {meta.total_page} · {meta.total} total
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPage((p) => Math.min(meta.total_page, p + 1))
                  }
                  disabled={meta.page >= meta.total_page}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {showProperty && (
        <AddPropertyModal
          close={() => setShowProperty(false)}
          usePropertyMutation={addPropertyMutation}
        />
      )}
    </>
  );
}

export default HostProperties;
