import { useSearchProperties } from "@/hooks";
import { Link, useSearchParams } from "react-router-dom";
import {
  SearchListingCard,
  SearchResultsMap,
  SearchPagination,
} from "@/components/search";
import { Header, Search } from "@/components";
import { useState } from "react";
function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMap, setShowMap] = useState(true);
  const cityId = searchParams.get("city_id") || "";
  const countryId = searchParams.get("country_id") || "";
  const checkIn = searchParams.get("check_in") || "";
  const checkOut = searchParams.get("check_out") || "";
  const adults = searchParams.has("adults")
    ? parseInt(searchParams.get("adults"), 10)
    : "";
  const children = searchParams.has("children")
    ? parseInt(searchParams.get("children"), 10)
    : "";
  const infants = searchParams.has("infants")
    ? parseInt(searchParams.get("infants"), 10)
    : "";
  const pets = searchParams.has("pets")
    ? parseInt(searchParams.get("pets"), 10)
    : "";
  const page = searchParams.has("page") ? searchParams.get("page") : "";
  const perPage = searchParams.has("per_page")
    ? searchParams.get("per_page")
    : "";

  const apiParams = { page, per_page: perPage };
  if (cityId) apiParams.city_id = Number(cityId);
  if (countryId) apiParams.country_id = Number(countryId);
  if (checkIn) apiParams.check_in = checkIn;
  if (checkOut) apiParams.check_out = checkOut;
  if (adults > 0) apiParams.adults = adults;
  if (children > 0) apiParams.children = children;
  if (infants > 0) apiParams.infants = infants;
  if (pets > 0) apiParams.pets = pets;

  const { data, isLoading, isError } = useSearchProperties(apiParams);
  const listings = data?.data ?? [];
  const meta = data?.meta ?? { total: 0, page: 1, per_page: 1 };
  const currentPage = meta?.page ?? 1;
  const totalPage = meta?.total_page ?? 1;
  const hasDistinctions = Boolean(cityId && countryId);
  const hasPagination = totalPage > 1;
  const totalItems = meta.total;

  const setPage = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  const listingsWithTarget = listings.filter((p) => p.latitude && p.longitude);

  const mapCenter =
    listingsWithTarget.length > 0
      ? {
          lat:
            listingsWithTarget.reduce((s, p) => s + parseFloat(p.latitude), 0) /
            listingsWithTarget.length,
          lng:
            listingsWithTarget.reduce(
              (s, p) => s + parseFloat(p.longitude),
              0,
            ) / listingsWithTarget.length,
        }
      : { lat: 60.199, lng: 24.938 };

  return (
    <>
      <Header />
      <Search />
      <div className="flex h-[calc(100vh-80px)]">
        {!hasDistinctions ? (
          <>
            <div className="w-1/2 py-12 text-center text-gray-600">
              <p>Select a destination (Where) on the home page, then search.</p>
              <Link
                className="mt-4 inline-block text-[#FF385C] font-semibold hover:underline"
                to="/"
                data-discover="true">
                Go to home
              </Link>
            </div>
          </>
        ) : isLoading ? (
          <div className="w-1/2 mt-5 justify-center text-gray-400 font-semibold">
            is Loading....
          </div>
        ) : (
          <div className={`${showMap ? "w-1/2" : "w-full"} overflow-y-auto`}>
            <div className="max-w-4xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {totalItems ? totalItems : 0} homes
                </h1>
                <button
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-900"
                  onClick={() => setShowMap((prev) => !prev)}>
                  {showMap ? "Show list" : "Show Map"}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <SearchListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              {hasPagination && (
                <SearchPagination
                  currentPage={currentPage}
                  totalPages={totalPage}
                  setPage={setPage}
                />
              )}
            </div>
          </div>
        )}
        {showMap && (
          <SearchResultsMap
            listings={listingsWithTarget}
            mapCenter={mapCenter}
          />
        )}
      </div>
    </>
  );
}

export default SearchResult;
