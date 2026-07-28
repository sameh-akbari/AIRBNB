import { Header, Search } from "@/components/common";
import {
  ListingDetailHeader,
  ListingImageGallery,
  ListingOverview,
  ListingKeyFeatures,
  ListingDescription,
  ListingSectionNav,
  ListingPhotosSection,
  ListingAmenitiesSection,
  ListingReviewsSection,
  ListingLocationSection,
  ListingHostProfile,
  ListingThingsToKnow,
  ListingBookingWidget,
  AboutSpaceModal,
  AmenitiesModal,
  PhotoGalleryModal,
  ReviewsModal,
  MessageHostModal,
  ListingToast,
  ListingDetailSkeleton,
  buildCategorizedAmenities,
} from "@/components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useAuth,
  useProperty,
  usePropertyReview,
  useReserveToCartMutation,
  useMyBookingsForListing,
  useMessageHostMutation,
} from "@/hooks";
import {
  calculateCurrentMonth,
  calculateNights,
  calculateTotalPrice,
  DTOPropertyToListings,
  DTOReviewsForDisplay,
  findUpcomingBookingForProperty,
  getMessageHostErrorMessage,
  hasUpcomingBookingForProperty,
  parseCheckInFormatSearchParams,
  parseCheckOutFormatSearchParams,
} from "@/services";
import { useEffect, useState } from "react";

function ListingDetails() {
  const reserveMutation = useReserveToCartMutation();
  const messageHostMutation = useMessageHostMutation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showMessageHostModal, setShowMessageHostModal] = useState(false);
  const [messageHostText, setMessageHostText] = useState("");
  const [messageHostError, setMessageHostError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(calculateCurrentMonth);
  const [guest, setGuest] = useState(1);
  const [checkIn, setCheckIn] = useState(
    parseCheckInFormatSearchParams(searchParams),
  );
  const [checkOut, setCheckOut] = useState(
    parseCheckOutFormatSearchParams(searchParams),
  );
  const openPhotoGallery = (index) => {
    setCurrentPhotoIndex(index);
    setShowPhotoGallery(true);
  };
  const nights = calculateNights(checkIn, checkOut);

  const {
    data: propertyData,
    isLoading: propertyLoading,
    isError: propertyError,
  } = useProperty(id);

  const { data: reviewResponse } = usePropertyReview(id);

  const { data: myBookingsResponse } = useMyBookingsForListing(user?.id, id);

  const myBookings = myBookingsResponse?.data ?? [];
  const upcomingBookingForThisProperty = findUpcomingBookingForProperty(
    myBookings,
    id,
  );
  const hasUpcomingBooking = hasUpcomingBookingForProperty(myBookings, id);
  const messageHostLoading = messageHostMutation.isPending;

  const handleSendMessageToHost = () => {
    const content = (messageHostText || "").trim();
    if (!content || !upcomingBookingForThisProperty?.id) return;
    setMessageHostError(null);
    messageHostMutation.mutate(
      { bookingId: upcomingBookingForThisProperty.id, content },
      {
        onSuccess: () => {
          setShowMessageHostModal(false);
          setMessageHostText("");
          setToastMessage("Message sent successfully.");
        },
        onError: (err) => setMessageHostError(getMessageHostErrorMessage(err)),
      },
    );
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  if (propertyLoading) {
    return <ListingDetailSkeleton />;
  }

  if (propertyError || !propertyData) {
    return null;
  }

  const listings = DTOPropertyToListings(propertyData);
  const categorizedAmenities = buildCategorizedAmenities(listings.allAmenities);

  //!Review
  const reviewList = reviewResponse?.reviews;
  const reviewStat = reviewResponse?.statistics;

  //!Review DTO
  const reviewsDTO = DTOReviewsForDisplay(reviewList);

  //!CalculateTotalPrice
  const totalPrice = calculateTotalPrice(listings, nights);

  //!Cart

  const handleReserve = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/rooms/${id}`,
          message: "please First Login To Reserve",
        },
      });
    }
    if (!checkIn || !checkOut) return;

    reserveMutation.mutate(
      {
        propertyId: id,
        checkIn,
        checkOut,
        guest,
      },
      {
        onSuccess: ({
          checkIn: checkInFormatted,
          checkOut: checkOutFormatted,
        }) => {
          navigate(
            `/payment?listingId=${id}8&checkin=${checkInFormatted}&checkout=${checkOutFormatted}&adults=${guest}&children=0`,
          );
        },
      },
    );
  };

  return (
    <>
      <Header />
      <Search />
      <div className="min-h-screen bg-white">
        <main className="max-w-[1140px] mx-auto px-6">
          <ListingDetailHeader listings={listings} />
          <ListingImageGallery
            listings={listings}
            onPhotoClick={openPhotoGallery}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
            <div className="lg:col-span-2 min-w-0">
              <ListingOverview listings={listings} />
              <ListingKeyFeatures hostName={listings.host.name} />
              <ListingDescription
                listings={listings}
                onShowAboutModal={() => setShowAboutModal(true)}
              />
              <ListingSectionNav />
              <ListingPhotosSection
                listing={listings}
                onPhotoClick={openPhotoGallery}
              />
              <ListingAmenitiesSection
                listing={listings}
                onShowAmenitiesModal={() => setShowAmenitiesModal(true)}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                checkIn={checkIn}
                checkOut={checkOut}
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                nights={nights}
              />
              <ListingReviewsSection
                reviews={reviewsDTO}
                reviewStat={reviewStat}
                onShowReviewsModal={() => setShowReviewsModal(true)}
              />
              <ListingLocationSection listing={listings} />
              <ListingHostProfile
                listing={listings}
                user={user}
                hasUpcomingBookingForThisProperty={hasUpcomingBooking}
                onMessageHost={() => {
                  setShowMessageHostModal(true);
                  setMessageHostError(null);
                  setMessageHostText("");
                }}
              />
              <ListingThingsToKnow />
            </div>
            <ListingBookingWidget
              listing={listings}
              nights={nights}
              totalPrice={totalPrice}
              checkIn={checkIn}
              checkOut={checkOut}
              guest={guest}
              onReserve={handleReserve}
            />
          </div>
        </main>
      </div>

      <AboutSpaceModal
        open={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        listing={listings}
      />
      <AmenitiesModal
        open={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
        categorizeAmenities={categorizedAmenities}
      />
      <PhotoGalleryModal
        open={showPhotoGallery}
        close={() => setShowPhotoGallery(false)}
        listings={listings}
        currentPhotoIndex={currentPhotoIndex}
        onPhotoIndexChange={setCurrentPhotoIndex}
      />
      <ReviewsModal
        open={showReviewsModal}
        onClose={() => setShowReviewsModal(false)}
        reviews={reviewsDTO}
        reviewStat={reviewStat}
      />
      <MessageHostModal
        open={showMessageHostModal}
        onClose={() => setShowMessageHostModal(false)}
        listing={listings}
        messageHostText={messageHostText}
        onMessageHostTextChange={setMessageHostText}
        messageHostError={messageHostError}
        messageHostLoading={messageHostLoading}
        onSend={handleSendMessageToHost}
      />
      <ListingToast message={toastMessage} />
    </>
  );
}

export default ListingDetails;
