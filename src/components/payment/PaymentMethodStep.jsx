function PaymentMethodStep({
  currentStep,
  onChangeStep,
  paymentMethod,
  onPaymentMethod,
  onNext,
}) {
  return (
    <div className={`mb-10 ${currentStep > 1 ? "block" : "hidden"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Add a payment method
        </h2>
        <button
          onClick={onChangeStep}
          type="button"
          class="text-sm font-semibold text-gray-900 hover:underline">
          Change
        </button>
      </div>

      {currentStep === 2 ? (
        <>
          <div className="space-y-4">
            <label className="flex items-start gap-4 p-5 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                onChange={(e) => onPaymentMethod(e.target.value)}
                checked={paymentMethod === "credit_card"}
                type="radio"
                name="payment-method"
                value="credit_card"
                className="mt-1 w-5 h-5 text-[#FF385C] border-gray-300 focus:ring-[#FF385C]"
              />
              <div className="flex-1 flex items-center gap-3">
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-gray-900 text-base">
                    Credit or debit card
                  </div>
                  <div className="text-sm text-gray-600">
                    Visa, Mastercard, Amex
                  </div>
                </div>
              </div>
            </label>

            <label className="flex items-start gap-4 p-5 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                onChange={(e) => onPaymentMethod(e.target.value)}
                checked={paymentMethod === "paypal"}
                type="radio"
                name="payment-method"
                value="paypal"
                className="mt-1 w-5 h-5 text-[#FF385C] border-gray-300 focus:ring-[#FF385C]"
              />
              <div className="flex-1 flex items-center gap-3">
                <span className="text-[#003087] font-bold text-xl">PayPal</span>
                <div className="text-sm text-gray-600">
                  Pay with your PayPal account
                </div>
              </div>
            </label>

            <button
              onClick={onNext}
              type="button"
              className="w-full bg-gray-900 text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors mt-6">
              Next
            </button>

            {currentStep === 2 && (
              <div className="mt-8">
                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-400">
                    Review your request
                  </h2>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-5 border border-gray-300 rounded-xl bg-gray-50">
          <div className="font-semibold text-gray-900 text-base">
            {paymentMethod === "credit_card"
              ? `credit or debit cart`
              : `PayPal`}
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethodStep;
