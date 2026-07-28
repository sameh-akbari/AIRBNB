import { Link } from "react-router-dom";

function PaymentSummarySidebar({
  property,
  cartProperty,
  priceProperty,
  nights,
  changeDateUrl,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <img
            src={property?.primary_image}
            alt={property?.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            {property?.average_rating && (
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 text-[#FF385C]"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">
                  {property?.average_rating}
                </span>
                <span className="text-sm text-gray-600">
                  ({property?.reviews_count})
                </span>
                {property?.is_guest_favorite && (
                  <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                    Guest favorite
                  </span>
                )}
              </div>
            )}

            <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">
              {property?.address}
            </h3>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <div className="font-semibold text-gray-900 mb-1 text-[15px]">
                Free cancellation
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                Cancel before 4:00 PM for a full refund.{" "}
                <a href="#" className="underline">
                  Full policy
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between pb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Dates</div>
              <div className="font-semibold text-gray-900 text-[15px]">
                {cartProperty?.check_in_date} - {cartProperty?.check_out_date}
              </div>
            </div>
            <Link
              to={changeDateUrl}
              className="text-sm font-semibold text-gray-900 underline">
              Change
            </Link>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Guests</div>
                <div className="font-semibold text-gray-900 text-[15px]">
                  {cartProperty?.adults} adult
                </div>
              </div>
              <Link
                to={changeDateUrl}
                className="text-sm font-semibold text-gray-900 underline">
                Change
              </Link>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-900 mb-4">
            Price details
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                € {priceProperty?.price_per_night?.toFixed(2)} x {nights} nights
              </span>
              <span className="text-gray-900">
                € {priceProperty?.base_price?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cleaning fee</span>
              <span className="text-gray-900">
                € {priceProperty?.cleaning_fee?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service fee </span>
              <span className="text-gray-900">
                € {priceProperty?.service_fee?.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total (EUR)</span>
              <span className="font-semibold text-gray-900">
                € {priceProperty?.total?.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-gray-900 underline">
            Show price breakdown
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <div className="font-semibold text-green-900 text-[15px]">
                Price is below the 60-day average
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummarySidebar;
