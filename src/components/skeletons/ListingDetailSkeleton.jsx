export default function ListingDetailSkeleton() {
  return (
          <div className="min-h-screen bg-white">
            <main className="max-w-[1140px] mx-auto px-6">
              <div className="mt-6 mb-4">
                <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-4"></div>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-8 h-[500px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`rounded-xl bg-gray-200 animate-pulse ${i === 0 ? 'col-span-2 row-span-2' : ''}`}></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="lg:col-span-1">
                  <div className="border border-gray-300 rounded-xl p-6">
                    <div className="h-8 bg-gray-200 rounded w-24 animate-pulse mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
  );
}
