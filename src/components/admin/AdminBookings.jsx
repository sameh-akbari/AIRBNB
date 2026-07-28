import { useState } from "react";
import { useAdminBookings } from "@/hooks";

const DEFAULT_META = { page: 1, per_page: 20, total: 0, total_page: 0 };
const FILTER_CLASS =
  "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent";

function getBookingStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "bg-green-100 text-green-800";
  if (s === "cancelled") return "bg-red-100 text-red-800";
  return "bg-amber-100 text-amber-800";
}

function getPaymentStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "paid") return "bg-green-100 text-green-800";
  if (s === "pending") return "bg-amber-100 text-amber-800";
  return "bg-gray-100 text-gray-800";
}

function AdminBookings() {
  const [page, setPage] = useState(1);
  const [propertyId, setPropertyId] = useState("");
  const [order, setOrder] = useState("created_at");
  const [sortBy, setSortBy] = useState("desc");
  const [status, setStatus] = useState("");

  const { data, isLoading } = useAdminBookings({
    page,
    perPage: 20,
    propertyId,
    order,
    sortBy,
    status,
  });

  const bookings = data?.data ?? [];
  const meta = data?.meta ?? DEFAULT_META;

  const resetPage = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Booking</h2>
        <div className="flex flex-wrap gap-3">
          <input
            value={propertyId}
            onChange={(e) => resetPage(setPropertyId)(e.target.value)}
            type="number"
            placeholder="Property ID"
            className={`${FILTER_CLASS} w-28`}
            readOnly
          />
          <select
            value={order}
            onChange={(e) => resetPage(setOrder)(e.target.value)}
            className={FILTER_CLASS}
            defaultValue="created_at">
            <option value="created_at">Created at</option>
            <option value="check_in_date">Check-in date</option>
            <option value="total_price">Total price</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => resetPage(setSortBy)(e.target.value)}
            className={FILTER_CLASS}
            defaultValue="desc">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <select
            value={status}
            onChange={(e) => resetPage(setStatus)(e.target.value)}
            className={FILTER_CLASS}
            defaultValue="">
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            Loading bookings...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in / Check-out
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nights
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-8 text-center text-gray-500">
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {b.booking_number ?? `#${b.id}`}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {b.property?.title ?? "—"}
                          {b.property?.city && (
                            <span className="text-gray-500">
                              , {b.property.city}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {b.user?.name ?? b.user?.email ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {b.check_in ?? "—"} / {b.check_out ?? "—"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {b.nights ?? "—"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {b.total_price != null
                            ? `${b.currency ?? "EUR"} ${b.total_price}`
                            : "—"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getBookingStatusClass(b.status)}`}>
                            {b.status ?? "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getPaymentStatusClass(b.payment_status)}`}>
                            {b.payment_status ?? "—"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {meta.total_page > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Page {meta.page} of {meta.total_page} ({meta.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= meta.total_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
