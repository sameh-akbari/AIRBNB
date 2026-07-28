import { useState } from "react";
import { Link } from "react-router-dom";
import { useProfileTrips } from "@/hooks/profile";
import { sendProfileMessage, submitTripReview } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/data";

function getApiError(err, fallback) {
  return err?.response?.data?.error?.message || err?.response?.data?.message || err?.message || fallback;
}

function getStatusStyle(status) {
  const s = (status || "").toLowerCase();
  if (s === "confirmed" || s === "completed")
    return "bg-green-100 text-green-800";
  if (s === "cancelled" || s === "rejected") return "bg-red-100 text-red-800";
  if (s === "pending") return "bg-orange-100 text-orange-800";
  return "bg-gray-100 text-gray-800";
}

function canShowBookingActions(status) {
  const s = (status || "").toLowerCase();
  return s === "confirmed" || s === "completed";
}

function Trips({ user }) {
  const DEFAULT_REVIEW_FORM = {
    rating: 5,
    comment: "",
    cleanliness_rating: 5,
    communication_rating: 5,
    checkin_rating: 5,
    accuracy_rating: 5,
    location_rating: 5,
    value_rating: 5,
  };
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProfileTrips(page, user);
  const [messageBooking, setMessageBooking] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewForm, setReviewForm] = useState(DEFAULT_REVIEW_FORM);
  const [reviewLoading, setReviewLoading] = useState(false);
  const bookings = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, per_page: 10, total: 0, total_page: 1 };

  function openModalReview(book) {
    setReviewBooking(book);
    setReviewForm({ ...DEFAULT_REVIEW_FORM });
  }

  const openMessageModal = (booking) => {
    setMessageBooking(booking);
    setMessageText("");
    setMessageError("");
  };

  const handleMessageSend = async () => {
    const content = messageText.trim();
    if (!messageBooking?.id || !content) return;

    setMessageError("");
    setMessageLoading(true);
    try {
      await sendProfileMessage({ booking_id: messageBooking.id, content });
      setMessageBooking(null);
      setMessageText("");
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    } catch (err) {
      setMessageError(getApiError(err, "Failed to send message."));
    } finally {
      setMessageLoading(false);
    }
  };

  const updateReviewField = (name, value) => {
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const REVIEW_RATING_FILEDS = [
    "cleanliness_rating",
    "communication_rating",
    "checkin_rating",
    "accuracy_rating",
    "location_rating",
    "value_rating",
  ];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewBooking.id) return;

    setReviewLoading(true);

    try {
      const payload = {
        booking_id: Number(reviewBooking.id),
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment || "No Comment",
        cleanliness_rating: Number(reviewForm.cleanliness_rating),
        communication_rating: Number(reviewForm.communication_rating),
        checkin_rating: Number(reviewForm.checkin_rating),
        accuracy_rating: Number(reviewForm.accuracy_rating),
        location_rating: Number(reviewForm.location_rating),
        value_rating: Number(reviewForm.value_rating),
      };
      await submitTripReview(payload);
      queryClient.invalidateQueries({
        queryKey: queryKeys.myBookingsPage(page),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <>
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Past trips</h2>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading trips…
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No trips yet
          </h3>
          <p className="text-gray-600 mb-6">
            When you book a trip, it will show up here.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#FF385C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E61E4D] transition-colors">
            Start exploring
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Page {meta.page} of {meta.total_page} · {meta.total} trip
            {meta.total !== 1 ? "s" : ""} total
          </p>

          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 w-full sm:w-48 h-36 rounded-xl bg-gray-200 overflow-hidden">
                  {b.property?.primary_image ? (
                    <img
                      src={b.property.primary_image}
                      alt={b.property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">
                    {b.property?.title ?? "Property"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {b.property?.city}, {b.property?.country}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {b.check_in} → {b.check_out} · {b.nights} night
                    {b.nights !== 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-gray-600">
                    Booking #{b.booking_number} ·{" "}
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle(b.status)}`}>
                      {b.status}
                    </span>
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-2">
                    {b.total_price} {b.currency}
                  </p>
                  {b.special_requests && (
                    <p className="text-sm text-gray-600 mt-1">
                      Note: {b.special_requests}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {canShowBookingActions(b.status) &&
                    b.is_upcoming === true && (
                      <button
                        type="button"
                        onClick={() => openMessageModal(b)}
                        className="px-4 py-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-900 hover:bg-gray-50">
                        Message Host
                      </button>
                    )}
                  {canShowBookingActions(b.status) &&
                    (b.has_reviewed === true ? (
                      <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-md">
                        You already commented on this!
                      </span>
                    ) : (
                      <button
                        onClick={() => openModalReview(b)}
                        type="button"
                        className="px-4 py-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-900 hover:bg-gray-50">
                        Review
                      </button>
                    ))}
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
                {meta.page} / {meta.total_page}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(meta.total_page, p + 1))}
                disabled={meta.page >= meta.total_page}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          )}

          {/* <!-- Review Modal --> */}
          {reviewBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
              <div
                id="review-modal"
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full my-8 p-6 space-y-4">
                <div className="modal-panel modal-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Write a review
                    </h3>
                    <button
                      onClick={() => setReviewBooking(null)}
                      href="#"
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                      aria-label="Close">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {reviewBooking?.property?.title}
                  </p>
                  <form
                    onSubmit={handleReviewSubmit}
                    className="space-y-4"
                    action="trips.html">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Overall rating (1–5)
                      </label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) =>
                          updateReviewField("rating", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C]">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={`${num}`} selected>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comment
                      </label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) =>
                          updateReviewField("comment", e.target.value)
                        }
                        placeholder="Share your experience…"
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] resize-y"></textarea>
                    </div>
                    {REVIEW_RATING_FILEDS.map((field) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field} (1–5)
                        </label>
                        <select
                          value={reviewForm[field]}
                          onChange={(e) =>
                            updateReviewField(field, e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C]">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={`${num}`} selected>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        onClick={() => setReviewBooking(null)}
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#FF385C] text-white font-medium hover:bg-[#E61E4D]">
                        {reviewLoading ? "submited..." : "Submit review"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {messageBooking && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setMessageBooking(null)}>
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-semibold text-gray-900">Message Host</h3>
          <p className="text-sm text-gray-600">{messageBooking.property?.title}</p>
          {messageError && <p className="text-sm text-red-600">{messageError}</p>}
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message…"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent resize-y"
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setMessageBooking(null)} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleMessageSend}
              disabled={messageLoading || !messageText.trim()}
              className="px-4 py-2 rounded-xl bg-[#FF385C] text-white font-medium hover:bg-[#E61E4D] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {messageLoading ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Trips;
