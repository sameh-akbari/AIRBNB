import {
  Footer,
  Header,
  Search,
  InspirationSection,
  CitySliderSection,
} from "@/components";
import { useHomeFavorites } from "@/hooks";

function Home() {
  const { savedItems, favoriteLoadingId, toggleSave } = useHomeFavorites();

  return (
    <>
      <Header />
      <Search />
      <main className="w-full bg-white">
        <CitySliderSection
          savedItems={savedItems}
          favoriteLoadingId={favoriteLoadingId}
          onToggleSave={toggleSave}
        />
        <InspirationSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;
