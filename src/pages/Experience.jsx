import { Footer, Header, Search, ExperienceSection } from "@/components";
import { fetchOriginalsExperiences, fetchPopularExperiences } from "@/services";

function Experience() {
  const popularExperience = fetchPopularExperiences();
  const originalExperience = fetchOriginalsExperiences();

  return (
    <>
      <Header />
      <Search />
      <main className="w-full">
        <ExperienceSection
          title="Popular experiences in Helsinki"
          experiences={popularExperience}
        />
        <ExperienceSection
          title="Airbnb Originals"
          subTitle="Hosted by the world's most interesting people"
          experiences={originalExperience}
        />
      </main>
      <Footer />
    </>
  );
}

export default Experience;
