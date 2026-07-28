import {
  PaymentHeader,
  PaymentWhenToPayStep,
  PaymentMethodStep,
  PaymentReviewStep,
  PaymentSummarySidebar,
} from "@/components/payment";
import { useAuth, usePaymentBookingMutation, usePaymentCart } from "@/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const { user, logOutPanel, isLoading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentOption, setPaymentOption] = useState("pay-now");

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [specialRequest, setSpecialRequest] = useState("");

  const { data: cartData } = usePaymentCart(user);
  const cartProperty = cartData?.data?.cart;
  const priceProperty = cartData?.data?.price_summary;
  const property = cartData?.data?.property;
  const nights = cartData?.data?.nights;

  const changeDateUrl = `/rooms/${cartProperty?.property_id}?check_in=${cartProperty?.check_in_date}&check_out=${cartProperty?.check_out_date}`;

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const bookingMutation = usePaymentBookingMutation();

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
    }
    const paymentTransactionId =
      paymentMethod === "paypal"
        ? `paypal_txn_${Date.now()}`
        : `credit_txn_${Date.now()}`;

    bookingMutation.mutate(
      {
        property_id: Number(cartProperty?.property_id),
        check_in: cartProperty?.check_in_date,
        check_out: cartProperty?.check_out_date,
        guests: {
          adults: cartProperty?.adults,
          children: 0,
          infants: 0,
          pets: 0,
        },
        check_in_time: "15:00",
        check_out_time: "12:00",
        special_requests: specialRequest || undefined,
        payment_method: paymentMethod,
        payment_transaction_id: paymentTransactionId,
        cancellation_policy: "moderate",
      },
      {
        onSuccess: () =>
          navigate("/profile", { state: { message: "booking successfully" } }),
      },
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <PaymentHeader />

      <div className="max-w-[1760px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <PaymentWhenToPayStep
              currentStep={currentStep}
              onChangeStep={() => setCurrentStep(1)}
              paymentOption={paymentOption}
              onPaymentOption={setPaymentOption}
              totalPrice={priceProperty?.total}
              onNext={handleNext}
            />
            <PaymentMethodStep
              currentStep={currentStep}
              onChangeStep={() => setCurrentStep(2)}
              paymentMethod={paymentMethod}
              onPaymentMethod={setPaymentMethod}
              onNext={handleNext}
            />
            <PaymentReviewStep
              currentStep={currentStep}
              onChangeStep={() => setCurrentStep(3)}
              cartProperty={cartProperty}
              specialRequest={specialRequest}
              onSpecialRequest={setSpecialRequest}
              handleBooking={handleBooking}
            />
          </div>

          <PaymentSummarySidebar
            property={property}
            cartProperty={cartProperty}
            priceProperty={priceProperty}
            nights={nights}
            changeDateUrl={changeDateUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
