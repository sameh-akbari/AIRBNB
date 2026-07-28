import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { EDIT_FIELDS, queryKeys } from "@/data";
import { useHostProfile } from "@/hooks";
import { saveHostProfile } from "@/services";

const INPUT_CLASS =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]";

function formatLanguages(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return "";
}

function buildFormFromApi(apiUser, profile, user) {
  return {
    name: apiUser?.name ?? user?.name ?? "",
    email: apiUser?.email ?? user?.email ?? "",
    password: "",
    avatar_url: apiUser?.avatar_url ?? profile?.avatar_url ?? "",
    phone: profile?.phone ?? "",
    bio: profile?.bio ?? "",
    languages: formatLanguages(profile?.languages ?? apiUser?.languages),
  };
}

const HOST_STAT_KEYS = [
  { label: "Total properties", key: "total_properties" },
  { label: "Total bookings", key: "total_bookings" },
  { label: "Bookings pending", key: "bookings_pending" },
  { label: "Bookings confirmed", key: "bookings_confirmed" },
  { label: "Bookings completed", key: "bookings_completed" },
  { label: "Bookings cancelled", key: "bookings_cancelled" },
  { label: "Total reviews", key: "total_reviews" },
  { label: "Average rating", key: "average_rating", fallback: "—" },
];

function HostAbout({ user }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(buildFormFromApi(null, null, user));
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const { data, isLoading } = useHostProfile(user?.id);

  const apiUser = data?.data?.user;
  const profile = data?.data?.profile;
  const hostStats = data?.data?.statistics?.as_host;

  const avatarUrl = form.avatar_url || apiUser?.avatar_url || profile?.avatar_url;
  const displayName = apiUser?.name ?? user?.name ?? form.name ?? "?";

  const startEdit = () => {
    setForm(buildFormFromApi(apiUser, profile, user));
    setSaveError("");
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaveError("");
    setSaving(true);
    try {
      const languages = (form.languages || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const body = {
        name: form.name || undefined,
        email: form.email || undefined,
        avatar_url: form.avatar_url || undefined,
        phone: form.phone || undefined,
        bio: form.bio || undefined,
        languages: languages.length ? languages : undefined,
      };
      if (form.password.trim()) body.password = form.password.trim();

      await saveHostProfile(body);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(user?.id) });
      setIsEditing(false);
    } catch (err) {
      setSaveError(
        err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to save profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  const profileRows = [
    { label: "Phone", value: profile?.phone },
    { label: "Bio", value: profile?.bio },
    { label: "Response time", value: profile?.response_time },
    { label: "Response rate", value: profile?.response_rate },
    { label: "Superhost", value: profile?.is_superhost ? "Yes" : "No" },
    { label: "Verified", value: profile?.verified ? "Yes" : "No" },
    { label: "Languages", value: formatLanguages(profile?.languages) || "—" },
    { label: "Updated", value: profile?.updated_at },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">About me</h2>
        {!isEditing && (
          <button
            type="button"
            onClick={startEdit}
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading profile…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center text-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt=""
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#FF385C] flex items-center justify-center mb-4">
                      <span className="text-4xl font-semibold text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {displayName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {apiUser?.email ?? user?.email ?? form.email}
                  </p>
                  {apiUser?.created_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      Joined {apiUser.created_at}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Profile
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {profileRows.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-gray-600">{label}</dt>
                      <dd className="font-medium text-gray-900">
                        {value ?? "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Statistics
                </h3>
                {hostStats ? (
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    {HOST_STAT_KEYS.map(({ label, key, fallback = 0 }) => (
                      <div key={key}>
                        <dt className="text-gray-600">{label}</dt>
                        <dd className="font-semibold text-gray-900">
                          {hostStats[key] ?? fallback}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-gray-500">
                    No statistics available.
                  </p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              {saveError && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                  {saveError}
                </p>
              )}
              {EDIT_FIELDS.map(
                ({ name, label, type, placeholder, rows, autoComplete }) =>
                  type === "textarea" ? (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <textarea
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        rows={rows}
                        className={INPUT_CLASS}
                      />
                    </div>
                  ) : (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className={INPUT_CLASS}
                      />
                    </div>
                  ),
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#FF385C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E61E4D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSaveError("");
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Reviews I've written
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              You haven't written any reviews yet. Reviews you write will appear
              here.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default HostAbout;
