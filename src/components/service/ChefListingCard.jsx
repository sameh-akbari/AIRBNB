function ChefListingCard({ service }) {
  return (
    <>
      <div className="swiper-slide !w-[253px]">
        <div className="relative group cursor-pointer">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[242px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button
              type="button"
              className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          <div className="mt-2">
            <h3 className="text-[15px] font-medium text-gray-900 group-hover:underline">
              {service.title}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChefListingCard;
