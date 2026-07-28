function PaymentReviewStep({
  currentStep,
  onChangeStep,
  cartProperty,
  specialRequest,
  onSpecialRequest,
  handleBooking,
}) {
  return (
    <div className={`mb-10 ${currentStep > 2 ? "block" : "hidden"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Review your request
        </h2>
      </div>

      <div className="space-y-4">
        <div className="p-6 border border-gray-300 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Booking summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in</span>
              <span className="text-gray-900 font-medium">
                {cartProperty?.check_in_date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out</span>
              <span className="text-gray-900 font-medium">
                {cartProperty?.check_out_date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Guests</span>
              <span className="text-gray-900 font-medium">
                {cartProperty?.adults} adult
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special requests (optional)
          </label>
          <textarea
            value={specialRequest}
            onChange={(e) => onSpecialRequest(e.target.value)}
            placeholder="e.g. Please provide extra towels and a baby cot"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C]"
          />
        </div>

        <button
          onClick={handleBooking}
          type="button"
          className="w-full bg-[#FF385C] text-white font-semibold py-4 rounded-lg hover:bg-[#E61E4D] transition-colors">
          Request to book
        </button>
      </div>
    </div>
  );
}

export default PaymentReviewStep;
