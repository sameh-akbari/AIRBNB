import ListingCardSkeleton from "@/components/skeletons/ListingCardSkeleton";

function ListingSliderSkeleton() {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6 px-[2%]">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full border border-gray-300 bg-gray-100 cursor-not-allowed">
            <svg
              className="w-5 h-5 text-gray-400"
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
          </div>
          <div className="p-2 rounded-full border border-gray-300 bg-gray-100 cursor-not-allowed">
            <svg
              className="w-5 h-5 text-gray-400"
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
          </div>
        </div>
      </div>
      <div className="px-[2%]">
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-[253px]">
              <ListingCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListingSliderSkeleton;
