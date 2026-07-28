import {
  Footer,
  Search,
  Header,
  ChefListingCard,
  ServiceCategoryCard,
  ServiceSection,
} from "@/components";
import { fetchChefListings, fetchServiceCategories } from "@/services";

function Service() {
  const serviceCategories = fetchServiceCategories();
  const chefListings = fetchChefListings();
  return (
    <>
      <Header />
      <Search />
      <main className="w-full">
        <ServiceSection
          title="Services in Helsinki"
          items={serviceCategories}
          renderItem={(service) => <ServiceCategoryCard service={service} />}
        />
        <ServiceSection
          title="Discover services on Airbnb"
          subTitle="chefs"
          items={chefListings}
          renderItem={(service) => <ChefListingCard service={service} />}
        />
      </main>
      <Footer />
    </>
  );
}

export default Service;
