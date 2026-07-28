import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function FitBounds({ listings }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length < 2) return;
    map.fitBounds(
      L.latLngBounds(
        listings.map((p) => [parseFloat(p.latitude), parseFloat(p.longitude)]),
      ),
      { padding: [40, 40] },
    );
    map.invalidateSize();
  }, [map, listings]);
  return null;
}

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const fix = () => map.invalidateSize();
    fix();
    const timer = setTimeout(fix, 100);
    window.addEventListener("resize", fix);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", fix);
    };
  }, [map]);
  return null;
}

function MapListingPopup({ listing }) {
  return (
    <div className="listing-popup-card rounded-xl overflow-hidden bg-white shadow-lg">
      <div className="relative aspect-[4/3] bg-gray-200">
        <img
          src={listing.primary_image}
          alt={listing.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <Link
          to={`/rooms/${listing.id}`}
          className="text-base font-semibold hover:underline line-clamp-1">
          {listing.title}
        </Link>
        <p className="text-sm">
          ★ {listing.average_rating} ({listing.reviews_count})
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          Listing description
        </p>
        <p className="text-sm font-semibold">
          Total {listing.price_per_night} €
        </p>
      </div>
    </div>
  );
}

function SearchResultsMap({ listings, mapCenter }) {
  return (
    <div className="w-1/2 h-full min-h-0 relative z-0 border-l border-gray-200 search-results-map">
      <div className="absolute inset-0">
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={listings.length > 1 ? 11 : 12}
          style={{ height: "calc(100vh - 80px)", width: "100%" }}
          scrollWheelZoom>
          {/* MapResizeFix */}
          <MapResizeFix />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* FitBounds */}
          <FitBounds listings={listings} />

          {/* listings.map */}
          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={[
                parseFloat(listing.latitude),
                parseFloat(listing.longitude),
              ]}>
              <Popup
                className="listing-map-popup"
                minWidth={280}
                maxWidth={320}>
                <MapListingPopup listing={listing} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default SearchResultsMap;
