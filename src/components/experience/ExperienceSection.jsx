import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ExperienceCard from "./ExperienceCard";

function ExperienceSection({ title, subTitle, experiences }) {
  return (
    <>
      <section className="w-full bg-white py-12 px-6">
        <div className="max-w-[1760px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          {subTitle && <p className="text-gray-600 text-lg mb-4">{subTitle}</p>}
          <div className="relative">
            <Swiper spaceBetween={10} slidesPerView="auto">
              {experiences.map((experience) => (
                <SwiperSlide key={experience.id} className="!w-[253px]">
                  <ExperienceCard experience={experience} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* <div
            className="swiper swiper-popular-exp !pb-4"
            data-swiper=""
            data-space-between="10">
            <div className="swiper-wrapper">
              {experiences.map((experience) => (
                <ExperienceCard experience={experience} />
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default ExperienceSection;
