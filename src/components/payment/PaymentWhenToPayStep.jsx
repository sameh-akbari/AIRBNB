function PaymentWhenToPayStep({
  currentStep,
  onChangeStep,
  paymentOption,
  onPaymentOption,
  totalPrice,
  onNext,
}) {
  return (
    <div className="mb-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Choose when to pay</h2>

        <button
          onClick={onChangeStep}
          type="button"
          class="text-sm font-semibold text-gray-900 hover:underline">
          Change
        </button>
      </div>

      {currentStep === 1 ? (
        <div className="space-y-4">
          <label className="flex items-start gap-4 p-5 border-2 border-gray-900 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="payment-option"
              value="pay-now"
              checked={paymentOption === "pay-now"}
              onChange={(e) => onPaymentOption(e.target.value)}
              className="mt-1 w-5 h-5 text-[#FF385C] border-gray-300 focus:ring-[#FF385C]"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-base">
                Pay € {totalPrice?.toFixed(2)} now
              </div>
            </div>
          </label>

          <label className="flex items-start gap-4 p-5 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="payment-option"
              value="pay-over-time"
              checked={paymentOption === "pay-over-time"}
              onChange={(e) => onPaymentOption(e.target.value)}
              className="mt-1 w-5 h-5 text-[#FF385C] border-gray-300 focus:ring-[#FF385C]"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-base mb-1">
                Pay over time with Klarna
              </div>
              <div className="text-sm text-gray-600">
                Choose a flexible payment option.{" "}
                <a href="#" className="underline">
                  More info
                </a>
              </div>
            </div>
          </label>

          <button
            onClick={onNext}
            type="button"
            className="w-full bg-gray-900 text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors mt-6">
            Next
          </button>

          {currentStep === 1 && (
            <div className="mt-8">
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-400">
                  Add a payment method
                </h2>
              </div>
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-400">
                  Review your request
                </h2>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 border border-gray-300 rounded-xl bg-gray-50">
          <div className="font-semibold text-gray-900 text-base">
            {paymentOption === "pay-now"
              ? `Pay € ${totalPrice?.toFixed(2)} now`
              : `Pay over time with Klarna`}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentWhenToPayStep;
