function ListingDescription({ listings, onShowAboutModal }) {
  return (
    <>
      <div className="border-b border-gray-200 pb-8 mb-8">
        <p className="text-sm text-gray-500 mb-6">
          Some info has been automatically translated.
          <a href="#" className="underline">
            Show original
          </a>
        </p>
        <p className="text-gray-900 leading-relaxed mb-6">
          {listings.description}
        </p>
        <div className="space-y-2 mb-6">
          <div className="text-sm text-gray-600">{listings.address}</div>
        </div>
        <button
          onClick={() => onShowAboutModal()}
          className="text-sm font-semibold text-gray-900 underline hover:text-gray-700">
          Show more
        </button>
      </div>
    </>
  );
}

export default ListingDescription;
