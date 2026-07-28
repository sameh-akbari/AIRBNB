import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function getImages(property) {
  if (property.images?.length) return property.images.map((img) => img.url);
  if (property.primary_image) return [property.primary_image];
  return [];
}

function ListingSwiper({ listing, images }) {
  const swiperRef = useRef(null);

  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} style={{ width: "100%", height: "100%" }}>
            <img
              src={img}
              alt={listing.title}
              className="w-full h-full object-cover"
              style={{ display: "block" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination {
          bottom: 12px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }
        .swiper-pagination-bullet-custom {
          width: 6px !important;
          height: 6px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          margin: 0 3px !important;
          transition: all 0.3s !important;
        }
        .swiper-pagination-bullet-active-custom {
          background: white !important;
          width: 8px !important;
          height: 8px !important;
        }
        .swiper-slide {
          width: 100% !important;
          height: 100% !important;
          flex-shrink: 0 !important;
        }
        .swiper-wrapper {
          display: flex !important;
        }
      `}</style>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          swiperRef.current?.slidePrev();
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity shadow-md"
      >
        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          swiperRef.current?.slideNext();
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity shadow-md"
      >
        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
}

export default function SearchListingCard({ listing }) {
  const images = getImages(listing);

  return (
    <Link to={`/rooms/${listing.id}`} className="group cursor-pointer">
      <div className="flex flex-col">
        <div className="relative w-full h-64 rounded-xl overflow-hidden group/image">
          {images.length > 0 ? (
            <ListingSwiper listing={listing} images={images} />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}

          {listing.is_guest_favorite && (
            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-md text-xs font-semibold text-gray-900">
              Guest favorite
            </div>
          )}
        </div>

        <div className="mt-2">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-[15px] font-medium text-gray-900 group-hover:underline truncate flex-1">
              {listing.title}
            </h3>
            {(listing.average_rating != null || listing.reviews_count > 0) && (
              <span className="text-[15px] font-semibold ml-2">
                ★ {listing.average_rating ?? "—"} ({listing.reviews_count ?? 0})
              </span>
            )}
          </div>
          <p className="text-[15px] text-gray-600 line-clamp-1">{listing.description}</p>
          <p className="text-[15px] text-gray-600">
            {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? "s" : ""} · {listing.beds} bed
            {listing.beds !== 1 ? "s" : ""}
          </p>
          <p className="text-[15px] text-gray-600">
            {listing.host?.type === "business" ? "Business host" : "Individual host"}
          </p>
          <p className="text-[15px] font-semibold mt-1">€ {listing.price_per_night} / night</p>
        </div>
      </div>
    </Link>
  );
}
