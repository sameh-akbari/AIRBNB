export function getApiErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  const data = err?.response?.data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors)) return data.errors.join(" ");
  if (err?.message) return err.message;
  return fallback;
}
