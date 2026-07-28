import { ListingSliderSkeleton, CitySlider } from "@/components";
import { useHomeCityProperties } from "@/hooks";
import { useHomeCities } from "@/hooks";

function CitySliderSection({ savedItems, favoriteLoadingId, onToggleSave }) {
  const { homeCities, isLoading: citiesLoading } = useHomeCities();
  const cityQueries = useHomeCityProperties(homeCities);

  if (citiesLoading) {
    return (
      <>
        <ListingSliderSkeleton />
        <ListingSliderSkeleton />
      </>
    );
  }

  return (
    <>
      {homeCities.map((city, index) => {
        const query = cityQueries[index];
        return (
          <CitySlider
            key={city.cityId}
            listing={query.data}
            isLoading={query.isLoading}
            isError={query.isError}
            title={city.title}
            savedItems={savedItems}
            favoriteLoadingId={favoriteLoadingId}
            onToggleSave={onToggleSave}
          />
        );
      })}
    </>
  );
}

export default CitySliderSection;
