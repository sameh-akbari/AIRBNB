function ServiceCategoryCard({ service }) {
  return (
    <>
      <div className="swiper-slide !w-[200px]">
        <div>
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[200px] object-cover"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-[15px] font-medium text-gray-900">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{service.status}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCategoryCard;
