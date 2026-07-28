function ListingCardSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="relative rounded-xl overflow-hidden bg-gray-200">
        <div className="w-full h-[242px] bg-gray-300"></div>
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}

export default ListingCardSkeleton;
