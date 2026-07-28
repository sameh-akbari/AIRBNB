import { useAdminLocationMutation, useCities, useCountries } from "@/hooks";
import { useState } from "react";

function AdminLocations() {
  const [countryForm, setCountryForm] = useState({ name: "", code: "" });
  const [cityForm, setCityForm] = useState({ name: "" });

  const { createCountryMutation, createCityMutation } =
    useAdminLocationMutation();

  const countryPending = createCountryMutation.isPending;
  const cityPending = createCityMutation.isPending;

  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const { data: countriesData, isLoading: countriesLoading } = useCountries();
  const { data: cityData, isLoading: cityLoading } =
    useCities(selectedCountryId);
  const selectedCountry = (country) => {
    setSelectedCountryId(country.id);
    setSelectedCountryCode(country.code);
  };

  const selectedCountryName = countriesData?.find(
    (c) => c.id === selectedCountryId,
  );

  const handleAddCountry = (e) => {
    e.preventDefault();
    if (!countryForm.name.trim() || !countryForm.code.trim()) {
      setCountryError("Name Or Code Are Required");
      return;
    }
    createCountryMutation.mutate(
      {
        name: countryForm.name.trim(),
        code: countryForm.code.trim().toUpperCase(),
      },
      {
        onSuccess: () => setCountryForm({ name: "", code: "" }),
      },
    );
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!cityForm.name.trim()) {
      setCityError("Name Are Required");
      return;
    }
    createCityMutation.mutate(
      {
        name: cityForm.name.trim(),
        country_id: selectedCountryId,
      },
      {
        onSuccess: () => setCityForm({ name: "" }),
      },
    );
  };
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">City / Country</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Countries</h3>
          </div>
          <div className="p-6 space-y-4">
            <form onSubmit={handleAddCountry} className="flex flex-wrap gap-3">
              <input
                value={countryForm.name}
                onChange={(e) =>
                  setCountryForm({ ...countryForm, name: e.target.value })
                }
                type="text"
                placeholder="Country name"
                className="px-3 py-2 border border-gray-300 rounded-lg flex-1 min-w-[120px]"
              />
              <input
                value={countryForm.code}
                onChange={(e) =>
                  setCountryForm({ ...countryForm, code: e.target.value })
                }
                type="text"
                placeholder="Code (e.g. FI)"
                className="px-3 py-2 border border-gray-300 rounded-lg w-24"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D]">
                {countryPending ? "waiting....." : "Add Country"}
              </button>
            </form>
            <ul className="divide-y divide-gray-200 max-h-[320px] overflow-y-auto">
              {countriesLoading ? (
                <div className="p-3 text-center flex items-center justify-center font-semibold rounded border border-1 border-gray-200 text-gray-400">
                  countriesLoading....
                </div>
              ) : (
                <>
                  {countriesData.map((c) => (
                    <li
                      onClick={() => selectedCountry(c)}
                      key={c.id}
                      className={`flex items-center justify-between py-3 px-2 rounded-lg
                      ${selectedCountryId === c.id ? "bg-[#FF385C]/10" : "hover:bg-gray-100"}
                      `}>
                      <span className="font-medium text-gray-900">
                        {c.name}
                      </span>
                      <span className="text-xs text-gray-500 uppercase">
                        {c.code}
                      </span>
                      <span className="text-xs text-gray-500">
                        {c.properties_count} properties
                      </span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Cities ({selectedCountryName?.name})
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <form onSubmit={handleAddCity} className="flex gap-3">
              <input
                value={cityForm.name}
                onChange={(e) =>
                  setCityForm({ ...cityForm, name: e.target.value })
                }
                type="text"
                placeholder="City name"
                className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D]">
                {cityPending ? "waiting..." : "Add City"}
              </button>
            </form>
            <ul className="divide-y divide-gray-200 max-h-[320px] overflow-y-auto">
              {cityLoading ? (
                <div className="p-3 text-center flex items-center justify-center font-semibold rounded border border-1 border-gray-200 text-gray-400">
                  citiesLoading....
                </div>
              ) : (
                <>
                  {cityData.map((city) => (
                    <li
                      key={city.id}
                      className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">
                        {city.city_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {city.properties_count} properties
                      </span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLocations;
