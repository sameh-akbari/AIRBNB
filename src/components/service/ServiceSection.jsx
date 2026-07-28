import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ServiceSection({ title, subTitle, items, renderItem }) {
  return (
    <>
      <section className="w-full bg-white py-12 px-6">
        <div className="max-w-[1760px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
          {subTitle && <p className="text-gray-600 mb-3">{subTitle}</p>}

          <div className="relative">
            <Swiper spaceBetween={10} slidesPerView="auto">
              {items.map((item) => (
                <SwiperSlide key={item.id} className="!w-[253px]">
                  {renderItem(item)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceSection;
