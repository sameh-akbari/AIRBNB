import { addFavorite, getFavorites, getProperties, removeFavorite } from "@/api";

export function convertPropertyToListings(property) {
  const p = property;
  const priceNumber = Number(p?.price_per_night);
  const ratingNumber =
    p?.average_rating == null ? null : Number(p.average_rating);

  return {
    id: p.id,
    title: p.title,
    dates: `${p.city}, ${p.country}`,
    hostType:
      p?.host?.type === "business" ? "Business host" : "Individual host",
    price: Number.isFinite(priceNumber)
      ? `€ ${priceNumber}`
      : `€ ${p?.price_per_night ?? ""}`.trim(),
    nights: 1,
    rating: Number.isFinite(ratingNumber) ? ratingNumber : null,
    image: p?.primary_image || "/images/airbnb.png",
    isGuestFavorite: Boolean(p?.is_guest_favorite),
  };
}

export async function fetchPropertiesCity(cityId) {
  const properties = await getProperties(cityId);
  return (properties || []).map(convertPropertyToListings);
}

export async function fetchFavoritePropertyIds() {
  return getFavorites();
}

export async function toggleFavoriteProperty(propertyId, isCurrentlySaved) {
  if (isCurrentlySaved) {
    try {
      await removeFavorite(propertyId);
    } catch (_) {
      // Backend may not support DELETE; still update UI
    }
    return { saved: false, alreadyFavorite: false };
  }

  try {
    await addFavorite(propertyId);
    return { saved: true, alreadyFavorite: false };
  } catch (err) {
    const alreadyFavorite =
      err?.response?.status === 422 ||
      err?.response?.data?.error?.message?.toLowerCase?.().includes("already");
    if (alreadyFavorite) {
      return { saved: true, alreadyFavorite: true };
    }
    throw err;
  }
}

export function getDestinationsList(response) {
  return (response?.data || []).filter((item) => item.properties_count > 0);
}

// {
//     adults: 4,
//     children: 1,
//     infants: 2,
//     pets: 1,
//   }

//!4adults,1child,2infants,1pet

export function formatWhoLabel(guests) {
  const total = guests.adults + guests.children + guests.infants + guests.pets;
  if (total === 0) return "Add Guests";

  const parts = [];
  if (guests.adults)
    parts.push(` ${guests.adults} adult${guests.adults !== 1 ? "s" : ""}`);
  if (guests.children)
    parts.push(
      ` ${guests.children} child${guests.children !== 1 ? "ren" : ""}`,
    );
  if (guests.infants)
    parts.push(` ${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
  if (guests.pets)
    parts.push(` ${guests.pets} pet${guests.pets !== 1 ? "s" : ""}`);

  return parts.join(",");
}
