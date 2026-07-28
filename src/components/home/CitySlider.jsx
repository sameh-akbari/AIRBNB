import SeeAllCard from "@/components/common/SeeAllCard";
import PropertyListingCard from "@/components/home/PropertyListingCard";
import { ListingSliderSkeleton } from "@/components/skeletons";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function CitySlider({
  listing,
  isLoading,
  isError,
  title,
  savedItems,
  favoriteLoadingId,
  onToggleSave,
}) {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading) {
    return <ListingSliderSkeleton />;
  }

  if (isError || listing.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 pt-6">
      <div className="flex items-center justify-between mb-6 px-[2%]">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current.slidePrev()}
            disabled={isBeginning}
            className={`p-2 rounded-full border border-gray-300 ${isBeginning ? "bg-gray-100 cursor-not-allowed" : "bg-white"}   transition-all duration-200`}
            aria-label="Previous">
            <svg
              className={`w-5 h-5 ${isBeginning ? "text-gray-400 " : "text-gray-900"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current.slideNext()}
            className={`p-2 rounded-full border border-gray-300 ${isEnd ? "bg-gray-100 cursor-not-allowed" : "bg-white"}   transition-all duration-200`}
            aria-label="Next">
            <svg
              className={`w-5 h-5 ${isEnd ? "text-gray-400 " : "text-gray-900"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-[2%]">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onTouchEnd={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachEnd={()=>{
            setIsEnd(true);
            setIsBeginning(false);
          }}
          onReachBeginning={()=>{
            setIsEnd(false);
            setIsBeginning(true);
          }}
          spaceBetween={8}
          slidesPerView="auto">
          {listing.slice(0, 13).map((list) => (
            <SwiperSlide key={list.id} className="!w-[253px]">
              <PropertyListingCard
                list={list}
                savedItems={savedItems}
                favoriteLoadingId={favoriteLoadingId}
                onToggleSave={onToggleSave}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide className="!w-[253px]">
            <SeeAllCard listings={listing} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default CitySlider;
