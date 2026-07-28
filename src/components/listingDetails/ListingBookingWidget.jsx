function ListingBookingWidget({
  listing,
  nights,
  totalPrice,
  checkIn,
  checkOut,
  guest,
  reserveLoading,
  onReserve,
}) {
  return (
    <div className="lg:col-span-1 self-start h-full">
      <div className="sticky top-[5.5rem] w-[380px]">
        <div className="bg-white bg-opacity-10 border border-[#FF385C] rounded-xl p-4 mb-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-[#FF385C] mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path d="M10 2L3 10l7 8 7-8-7-8z" />
          </svg>
          <div className="flex-1">
            <div className="font-semibold text-gray-900 mb-0.5">Rare find!</div>
            <div className="text-sm text-gray-600">
              This place is usually booked
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl p-6 shadow-lg">
          <div className="mb-4">
            <div className="text-2xl font-semibold text-gray-900">
              {nights > 0
                ? `€ ${totalPrice.toFixed(2)}`
                : `€ ${listing.price.toFixed(2)}`}
            </div>
            <div className="text-sm text-gray-600">
              for {nights > 0 ? nights : "per"} nights
            </div>
            {nights > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      € {listing.price} × {nights} nights
                    </span>
                    <span className="text-gray-900">
                      € {(listing.price * nights).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">
                      € {listing.cleaningFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">
                      € {listing.serviceFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      € {totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-3">
              <div>
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  CHECK-IN
                </div>
                <div className="text-sm text-gray-600">
                  {checkIn || "Add Date"}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  CHECKOUT
                </div>
                <div className="text-sm text-gray-600">
                  {checkOut || "Add Date"}
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-900 mb-1">
                GUESTS
              </div>
              <div className="text-sm text-gray-600">{guest} guest</div>
            </div>
          </div>
          <button
            onClick={() => onReserve()}
            disabled={reserveLoading}
            className="block w-full bg-[#FF385C] text-white font-semibold py-3 rounded-lg text-center hover:bg-[#E61E4D] transition-colors mb-3">
            {reserveLoading ? "Reserving...." : "Reserve"}
          </button>
          <p className="text-sm text-center text-gray-600 mb-4">
            You won't be charged yet
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            <a href="#" className="underline">
              Report this listing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingBookingWidget;
