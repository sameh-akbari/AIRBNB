import { Link } from "react-router-dom";

function PropertyListingCard({
  list,
  showGuestFavorite = true,
  savedItems,
  favoriteLoadingId,
  onToggleSave,
}) {
  return (
    <>
      <Link
        to={`/rooms/${list.id}`}
        className="relative group cursor-pointer block">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={list.image}
            alt={list.title}
            className="w-full h-[242px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showGuestFavorite && (list.isGuestFavorite ?? true) && (
            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
              Guest favorite
            </div>
          )}
          <button
            type="button"
            onClick={(e) => onToggleSave?.(e, list.id)}
            disabled={favoriteLoadingId === list.id}
            className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110 bg-white hover:bg-gray-100 z-10"
            aria-label={
              savedItems?.has(list.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill={savedItems?.has(list.id) ? "#FF385C" : "none"}
              stroke={savedItems?.has(list.id) ? "#FF385C" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <h3 className="text-[15px] font-medium text-gray-900 truncate group-hover:underline leading-tight">
            {list.title}
          </h3>
          <p className="text-[15px] text-gray-600 mt-1 leading-tight">
            {list.dates}
          </p>
          <p className="text-[15px] text-gray-600 leading-tight">
            {list.hostType}
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-[15px] font-semibold text-gray-900">
                {list.price}
              </span>
              <span className="text-[15px] text-gray-600">
                {" "}
                for {list.nights} nights
              </span>
            </div>
            {list.rating && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 fill-current text-black"
                  viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-[15px] text-gray-900 font-medium">
                  {list.rating}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

export default PropertyListingCard;
