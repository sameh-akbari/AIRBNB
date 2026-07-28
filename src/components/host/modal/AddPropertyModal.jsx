import { useAminity, useCities, useCountries } from "@/hooks";
import { addPropertySchema } from "@/validations/property.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DEFAULT_PROPERTY_VALUES = {
  title: "",
  description: "",
  property_type_id: 1,
  address: "",
  country_id: "",
  city_id: "",
  city: "",
  country: "",
  latitude: "",
  longitude: "",
  max_guests: "",
  bedrooms: "",
  beds: "",
  bathrooms: "",
  price_per_night: "",
  cleaning_fee: "",
  service_fee: "",
  amenity_ids: [],
  imageUrls: [],
};

function AddPropertyModal({ close, usePropertyMutation }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addPropertySchema),
    defaultValues: DEFAULT_PROPERTY_VALUES,
  });

  const countryField = register("country_id");
  const cityField = register("city_id");
  const countryId = watch("country_id");
  const amenityIds = watch("amenity_ids") ?? [];
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImagePrimary, setNewImagePrimary] = useState(false);

  const imageUrls = watch("imageUrls");

  const { data: countriesList = [] } = useCountries();
  const { data: citiesList = [] } = useCities(countryId);
  const { data: amenityList = [], isLoading: amenityLoading } =
    useAminity("basic");

  const toggleAmenity = (id) => {
    const numericId = Number(id);
    const next = amenityIds.includes(numericId)
      ? amenityIds.filter((item) => item !== numericId)
      : [...amenityIds, numericId];
    setValue("amenity_ids", next, { shouldValidate: true });
  };

  function buildPayload(form, countriesList, citiesList) {
    const selectedCountry = countriesList.find(
      (c) => c.id == form.country_id || c.id === Number(form.country_id),
    );
    const selectedCity = citiesList.find(
      (c) => c.id == form.city_id || c.id === Number(form.city_id),
    );
    const amenityIds = Array.isArray(form.amenity_ids) ? form.amenity_ids : [];

    return {
      title: form.title,
      description: form.description,
      property_type_id: Number(form.property_type_id) || 1,
      address: form.address,
      city: selectedCity?.name ?? form.city ?? "",
      country: selectedCountry?.name ?? form.country ?? "",
      latitude:
        form.latitude != null && form.latitude !== ""
          ? Number(form.latitude)
          : undefined,
      longitude:
        form.longitude != null && form.longitude !== ""
          ? Number(form.longitude)
          : undefined,
      max_guests: Number(form.max_guests) || 1,
      bedrooms: Number(form.bedrooms) || 0,
      beds: Number(form.beds) || 0,
      bathrooms: Number(form.bathrooms) || 1,
      price_per_night: Number(form.price_per_night) || 0,
      cleaning_fee:
        form.cleaning_fee != null && form.cleaning_fee !== ""
          ? Number(form.cleaning_fee)
          : undefined,
      service_fee:
        form.service_fee != null && form.service_fee !== ""
          ? Number(form.service_fee)
          : undefined,
      amenities: amenityIds.length ? amenityIds : undefined,
    };
  }

  const addImageByUrl = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    const list = imageUrls;
    let next = [
      ...list,
      { image_url: url, is_primary: Boolean(newImagePrimary) },
    ];

    if (newImagePrimary) {
      next = next.map((img, i) =>
        i === next.length - 1
          ? { ...img, is_primary: true }
          : { ...img, is_primary: false },
      );
    }
    setValue("imageUrls", next, { shouldValidate: true });
    setNewImageUrl("");
    setNewImagePrimary(false);
  };
  const setPrimaryImage = (index) => {
    setValue(
      "imageUrls",
      imageUrls.map((img, i) => ({ ...img, is_primary: i === index })),
    );
  };
  const removeImage = (index) => {
    setValue(
      "imageUrls",
      imageUrls.filter((img, i) => i !== index),
    );
  };

  const onSubmit = (form) => {
    usePropertyMutation.mutate(
      {
        payload: buildPayload(form, countriesList, citiesList),
        imageUrls: form.imageUrls,
      },
      { onSuccess: () => close() },
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-60"></div>
      <div className="fixed inset-0 z-110 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Property
            </h3>
            <button
              type="button"
              onClick={close}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Close">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Cozy listing near Pyynikki"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="property_type_id"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Property type
                </label>
                <select
                  id="property_type_id"
                  {...register("property_type_id", { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]">
                  <option value={1}>Entire place</option>
                  <option value={2}>Private room</option>
                  <option value={3}>Shared room</option>
                </select>
                {errors.property_type_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.property_type_id.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                {...register("description")}
                placeholder="Describe your property…"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="country_id"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country_id"
                  name={countryField.name}
                  ref={countryField.ref}
                  onBlur={countryField.onBlur}
                  onChange={(e) => {
                    countryField.onChange(e);
                    setValue("city_id", "");
                    setValue("city", "");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]">
                  <option value="">Select country</option>
                  {countriesList.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.country_id.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city_id"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  id="city_id"
                  name={cityField.name}
                  ref={cityField.ref}
                  onBlur={cityField.onBlur}
                  onChange={(e) => {
                    cityField.onChange(e);
                    const city = citiesList.find((x) => x.id == e.target.value);
                    setValue("city", city?.name ?? "");
                  }}
                  disabled={!countryId}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]">
                  <option value="">Select city</option>
                  {citiesList.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city_id.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="number"
                  step="any"
                  {...register("latitude")}
                  placeholder="61.498"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.latitude && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.latitude.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="number"
                  step="any"
                  {...register("longitude")}
                  placeholder="23.761"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.longitude && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="max_guests"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Max guests
                </label>
                <input
                  id="max_guests"
                  type="number"
                  min="1"
                  {...register("max_guests")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.max_guests && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.max_guests.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  min="0"
                  {...register("bedrooms")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.bedrooms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="beds"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Beds
                </label>
                <input
                  id="beds"
                  type="number"
                  min="0"
                  {...register("beds")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.beds && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.beds.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  min="0"
                  {...register("bathrooms")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.bathrooms && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bathrooms.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="price_per_night"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Price per night (€)
                </label>
                <input
                  id="price_per_night"
                  type="number"
                  min="0"
                  {...register("price_per_night")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.price_per_night && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price_per_night.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cleaning_fee"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Cleaning fee (€)
                </label>
                <input
                  id="cleaning_fee"
                  type="number"
                  min="0"
                  {...register("cleaning_fee")}
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.cleaning_fee && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cleaning_fee.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="service_fee"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Service fee (€)
                </label>
                <input
                  id="service_fee"
                  type="number"
                  min="0"
                  {...register("service_fee")}
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                {errors.service_fee && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.service_fee.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              {amenityLoading ? (
                <p className="text-sm text-gray-500">Loading amenities…</p>
              ) : amenityList.length === 0 ? (
                <p className="text-sm text-gray-500">No amenities available.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {amenityList.map((amenity) => (
                    <label
                      key={amenity.id}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={amenityIds.includes(Number(amenity.id))}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="w-4 h-4 text-[#FF385C] border-gray-300 rounded focus:ring-[#FF385C]"
                      />
                      <span className="text-sm text-gray-700">
                        {amenity.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Add image URLs for your property.
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C]"
                />
                <label className="flex items-center gap-2 whitespace-nowrap">
                  <input
                    checked={newImagePrimary}
                    onChange={(e) => setNewImagePrimary(e.target.checked)}
                    type="checkbox"
                    className="w-4 h-4 text-[#FF385C] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Primary image</span>
                </label>
                <button
                  onClick={addImageByUrl}
                  type="button"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800">
                  Add image
                </button>
              </div>

              {errors.imageUrls && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.imageUrls.message ||
                    errors.imageUrls.root?.message ||
                    errors.imageUrls[0]?.image_url?.message ||
                    errors.imageUrls[0]?.is_primary?.message}
                </p>
              )}

              {imageUrls.length === 0 ? (
                <p className="text-gray-400 text-sm mt-4 text-center">
                  no exist image
                </p>
              ) : (
                <>
                  {imageUrls.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 border mt-3 border-gray-200 rounded-lg">
                      <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          alt=""
                          className="w-full h-full object-cover"
                          src={image.image_url}
                          style={{ display: "none" }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 truncate flex-1 min-w-0">
                        {image.image_url}
                      </span>
                      {image.is_primary ? (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800">
                          Primary
                        </span>
                      ) : (
                        <button
                          onClick={() => setPrimaryImage(index)}
                          className="px-2 cursor-pointer py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
                          set as primary
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(index)}
                        type="button"
                        className="p-1 text-red-600 cursor-pointer hover:bg-red-50 rounded"
                        title="Remove">
                        ×
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={close}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 text-center">
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D]">
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPropertyModal;
