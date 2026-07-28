export default function ListingLocationSection({ listing }) {
  return (
    <div id="location" className="mb-16 scroll-mt-24">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Where you'll be
      </h3>
      <p className="text-lg text-gray-600 mb-6">{listing.location}</p>
      {listing.address && (
        <p className="text-sm text-gray-600 mb-6">{listing.address}</p>
      )}
      <div className="w-full h-[600px] bg-gray-200 rounded-xl overflow-hidden relative">
        {listing.latitude && listing.longitude ? (
          <iframe
            src={`https://maps.google.com/maps?q=${listing.latitude},${listing.longitude}&hl=en&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Map location not available
          </div>
        )}
      </div>
    </div>
  );
}
