import { addToCart, getMyBookings, getPropertyById, getPropertyReview } from "@/api";
import { sendMessage } from "@/api/messages";
import { MONTH_NAME } from "@/data";

export function fetchPropertyDetails(propertyId) {
  return getPropertyById(propertyId);
}

export function fetchPropertyReview(propertyId) {
  return getPropertyReview(propertyId);
}

export function DTOPropertyToListings(propertyData) {
  if (!propertyData) return null;

  const nearbyLocations = propertyData.nearby_locations ?? [];
  const otherThingsToNote = propertyData.other_things_to_note;
  const normalizedNotes = Array.isArray(otherThingsToNote)
    ? otherThingsToNote
    : otherThingsToNote
      ? [otherThingsToNote]
      : [];

  return {
    id: propertyData.id,
    title: propertyData.title,
    type: propertyData.property_type?.name || "Entire rental unit",
    location: `${propertyData.city}, ${propertyData.country}`,
    address: propertyData.address || "",
    latitude: propertyData.latitude ? parseFloat(propertyData.latitude) : null,
    longitude: propertyData.longitude
      ? parseFloat(propertyData.longitude)
      : null,
    guests: propertyData.max_guests,
    bedrooms: propertyData.bedrooms,
    beds: propertyData.beds,
    baths: Number(propertyData.bathrooms) || 1,
    rating: propertyData.average_rating || null,
    reviewsCount: propertyData.reviews_count || 0,
    price: Number(propertyData.price_per_night) || 0,
    cleaningFee: Number(propertyData.cleaning_fee) || 0,
    serviceFee: Number(propertyData.service_fee) || 0,
    host: {
      name: propertyData.host?.name || "Host",
      avatar:
        propertyData.host?.avatar_url || propertyData.host?.avatar || null,
      isSuperhost: propertyData.host?.is_superhost || false,
      yearsHosting: propertyData.host?.years_hosting || 0,
      responseRate: propertyData.host?.response_rate || null,
      responseTime: propertyData.host?.response_time || null,
      school: propertyData.host?.school || null,
      work: propertyData.host?.work || null,
      bio: propertyData.host?.bio || null,
      coHosts: propertyData.host?.co_hosts || [],
    },
    images: propertyData.images?.map((img) => img.url) || [
      propertyData.primary_image || "/images/airbnb.png",
    ],
    description: propertyData.description || "",
    nearby: nearbyLocations,
    allNearby: nearbyLocations,
    guestAccess: propertyData.guest_access ?? "",
    otherThingsToNote: normalizedNotes,
    amenities: propertyData.amenities?.map((a) => a.name) || [],
    allAmenities: propertyData.amenities?.map((a) => a.name) || [],
    sleepAreas: propertyData.sleep_areas ?? [],
    ratings: propertyData.rating_breakdown ?? {},
    reviewDistribution: propertyData.review_distribution ?? {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
    bookedDates: propertyData.booked_dates || null,
  };
}

export function formatReviewDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function DTOReviewsForDisplay(reviewsList) {
  return (reviewsList || []).map((r) => ({
    id: r.id,
    rating: r.rating,
    text: r.text ?? r.comment ?? "",
    date: r.date ?? (r.created_at ? formatReviewDate(r.created_at) : ""),
    user: {
      name: r.user?.name ?? "Guest",
      avatar: r.user?.avatar_url || r.user?.avatar || null,
    },
  }));
}

export function calculateCurrentMonth() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return;
  const [dayIn, monthIn, yearIn] = checkIn.split("/");
  const [dayOut, monthOut, yearOut] = checkOut.split("/");
  const checkInDate = new Date(
    parseInt(yearIn),
    parseInt(monthIn) - 1,
    parseInt(dayIn),
  );
  const checkOutDate = new Date(
    parseInt(yearOut),
    parseInt(monthOut) - 1,
    parseInt(dayOut),
  );
  const diffTime = Math.abs(checkOutDate - checkInDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateTotalPrice(listing, nights) {
  if (!listing || nights === 0) return listing.price;
  const pricePerNight = listing.price || 0;
  const cleaningFee = listing.cleaningFee || 0;
  const serviceFee = listing.serviceFee || 0;
  return pricePerNight * nights + cleaningFee + serviceFee;
}

export function formatDate(dateStr) {
  if (!dateStr) return;
  const months = MONTH_NAME;
  const [day, month, year] = dateStr.split("/");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDateForAPI(dateStr) {
  if (!dateStr) return;
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export async function reservePropertyToCart({
  propertyId,
  checkIn,
  checkOut,
  guest,
}) {
  await addToCart({
    property_id: Number(propertyId),
    check_in: formatDateForAPI(checkIn),
    check_out: formatDateForAPI(checkOut),
    guests: { adults: guest, children: 0, infants: 0, pets: 0 },
  });

  return {
    checkIn: formatDateForAPI(checkIn),
    checkOut: formatDateForAPI(checkOut),
  };
}

export function parseCheckInFormatSearchParams(searchParams) {
  const dateStr = searchParams.get("check_in");
  if (!dateStr) return;
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day)}/${parseInt(month)}/${year}`;
}
export function parseCheckOutFormatSearchParams(searchParams) {
  const dateStr = searchParams.get("check_out");
  if (!dateStr) return;
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day)}/${parseInt(month)}/${year}`;
}

export async function fetchMyBookings(params = {}) {
  return getMyBookings(params);
}

export function findUpcomingBookingForProperty(bookings, propertyId) {
  return (bookings || []).find((b) => {
    const status = (b.status || "").toLowerCase();
    const isConfirmedOrCompleted =
      status === "confirmed" || status === "completed";
    return (
      String(b.property_id) === String(propertyId) &&
      b.is_upcoming === true &&
      isConfirmedOrCompleted
    );
  });
}

export function hasUpcomingBookingForProperty(bookings, propertyId) {
  return Boolean(findUpcomingBookingForProperty(bookings, propertyId));
}

export async function sendMessageToHost({ bookingId, content }) {
  return sendMessage({ booking_id: bookingId, content });
}

export function getMessageHostErrorMessage(err) {
  return (
    err?.response?.data?.error?.message ||
    err?.message ||
    "Failed to send message."
  );
}
