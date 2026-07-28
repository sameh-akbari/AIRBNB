function ExperienceCard({ experience }) {
  return (
    <>
      <div className="relative group cursor-pointer">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-[242px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {experience.badge && (
            <>
              <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                {experience.badge}
              </div>
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
            </>
          )}
        </div>
        <div className="mt-2">
          <h3 className="text-[15px] font-medium text-gray-900 group-hover:underline">
            {experience.title}
          </h3>

          {experience.hostType && (
            <p className="text-sm text-gray-600 mt-1">{experience.hostType}</p>
          )}
          {experience.price && (
            <p className="text-sm text-gray-600 mt-1">{experience.price}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ExperienceCard;
