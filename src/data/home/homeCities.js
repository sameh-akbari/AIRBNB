export const HOME_CITIES = ["Tampere", "Helsinki", "Turku", "Espoo", "Oulu", "Vantaa", "Jyväskylä", "Tallinn"];

const CITY_SLIDER_TITLES = {
  Tampere: "Popular homes in Tampere",
  Tallinn: "Available in Tallinn this weekend",
};

export function getCitySliderTitle(city) {
  return CITY_SLIDER_TITLES[city] ?? `Homes in ${city}`;
}
