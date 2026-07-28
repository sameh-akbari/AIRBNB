import * as yup from "yup";

const optionalNumber = (label, min = 0) =>
  yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError(`${label} must be a number`)
    .min(min, `${label} cannot be negative`)
    .optional();

const requiredNumber = (label, min = 0) =>
  yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError(`${label} must be a number`)
    .required(`${label} is required`)
    .min(min, `${label} must be at least ${min}`);

export const addPropertySchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  property_type_id: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .required("Property type is required")
    .oneOf([1, 2, 3], "Invalid property type"),
  address: yup.string().trim().required("Address is required"),
  country_id: yup.string().required("Country is required"),
  city_id: yup.string().required("City is required"),
  city: yup.string().default(""),
  country: yup.string().default(""),
  latitude: optionalNumber("Latitude"),
  longitude: optionalNumber("Longitude"),
  max_guests: requiredNumber("Max guests", 1),
  bedrooms: requiredNumber("Bedrooms", 0),
  beds: requiredNumber("Beds", 0),
  bathrooms: requiredNumber("Bathrooms", 0),
  price_per_night: requiredNumber("Price per night", 0),
  cleaning_fee: optionalNumber("Cleaning fee"),
  service_fee: optionalNumber("Service fee"),
  amenity_ids: yup.array().of(yup.number()).default([]),
  imageUrls: yup
    .array()
    .of(
      yup.object({
        image_url: yup
          .string()
          .trim()
          .required("Image URL is required")
          .test("valid-url", "Image URL must be valid", (value) => {
            if (!value) return false;
            try {
              new URL(value.includes("://") ? value : `https://${value}`);
              return true;
            } catch {
              return false;
            }
          }),
        is_primary: yup
          .boolean()
          .transform((value, originalValue) => {
            if (originalValue === "on" || value === true) return true;
            if (originalValue === false || originalValue === "" || value == null) {
              return false;
            }
            return Boolean(value);
          })
          .default(false),
      }),
    )
    .default([]),
});
