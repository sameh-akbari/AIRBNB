import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

export default function PhotoGalleryModal({
  open,
  close,
  listings,
  currentPhotoIndex,
  onPhotoIndexChange,
}) {
  const photoSwiperRef = useRef(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
      onClick={close}
      style={{ overflow: "hidden" }}>
      <button
        onClick={close}
        className="absolute top-4 left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
        {currentPhotoIndex + 1} / {listings.images.length}
      </div>

      <div className="w-full h-full relative">
        <style>{`
          .photo-gallery-swiper {
            width: 1920px !important;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .photo-gallery-swiper .swiper-slide {
            width: 1920px !important;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
        <Swiper
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          initialSlide={currentPhotoIndex}
          onSwiper={(swiper) => {
            photoSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            onPhotoIndexChange(swiper.activeIndex);
          }}
          className="photo-gallery-swiper"
          slidesPerView={1}
          spaceBetween={0}
          allowTouchMove={true}>
          {listings.images &&
            listings.images.length > 0 &&
            listings.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className="swiper-zoom-container w-full h-full flex items-center justify-center"
                  style={{ width: "100%", height: "100%" }}>
                  <img
                    src={img}
                    alt={`Photo ${index + 1}`}
                    className="max-w-full max-h-screen w-auto h-auto object-contain"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: "100vh",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        <button
          onClick={(e) => {
            e.stopPropagation();
            photoSwiperRef.current.slidePrev();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            photoSwiperRef.current.slideNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
