import { EDIT_FIELDS, queryKeys } from "@/data";
import { useProfile } from "@/hooks/profile";
import { saveProfileUser } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function formatJoinDate(dateStr) {
  if (!dateStr) return "—";

  const date = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "—";

  return `Joined ${date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })}`;
}

function getInitial(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "?";
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  return value;
}

function displayYesNo(value) {
  return value ? "Yes" : "No";
}

function displayRating(value) {
  if (value === null || value === undefined) return "—";
  return value;
}

function displayLanguages(languages) {
  if (!languages) return "—";
  if (Array.isArray(languages)) return languages.join(", ");
  return languages;
}

function displayResponseRate(value) {
  if (value === null || value === undefined || value === "") return "—";
  return `${value}%`;
}

function formatLanguage(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
}

function buildFormFromAPI(profile, user) {
  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    avatar_url: user?.avatar_url ?? "",
    phone: profile?.phone ?? "",
    bio: profile?.bio ?? "",
    languages: formatLanguage(profile?.languages),
  };
}

function About({ user }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useProfile(user?.id);

  const [isSave, setIsSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(
    buildFormFromAPI(data?.data?.profile, data?.data?.user),
  );
  const profileData = data?.data;
  const profileUser = profileData?.user;
  const profile = profileData?.profile;
  const stats = profileData?.statistics?.as_guest;

  const startEdit = () => {
    setForm(buildFormFromAPI(data?.data?.profile, data?.data?.user));
    setIsEditing(true);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSave(true);
    const languages = form.languages.split(",");

    const body = {
      name: form.name || undefined,
      email: form.email || undefined,
      avatar_url: form.avatar_url || undefined,
      phone: form.phone || undefined,
      bio: form.bio || undefined,
      languages: languages || undefined,
    };
    if (form.password.trim()) body.password = form.password.trim();
    await saveProfileUser(body);
    queryClient.invalidateQueries({ queryKey: queryKeys.profile(user?.id) });
    setIsEditing(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">About me</h2>
          <button
            onClick={startEdit}
            className="text-sm font-semibold text-gray-900 hover:underline">
            Edit
          </button>
        </div>
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-1 border-gray-500 py-4 flex justify-center items-center">
            Loading Profile...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                  {profileUser?.avatar_url ? (
                    <img
                      src={profileUser.avatar_url}
                      alt={profileUser.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#FF385C] flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-semibold text-white">
                        {getInitial(profileUser?.name)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {displayValue(profileUser?.name)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {displayValue(profileUser?.email)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatJoinDate(profileUser?.created_at)}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Profile
                  </h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-600">Phone</dt>
                      <dd className="font-medium text-gray-900">
                        {displayValue(profile?.phone)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Bio</dt>
                      <dd className="font-medium text-gray-900">
                        {displayValue(profile?.bio)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Response time</dt>
                      <dd className="font-medium text-gray-900">
                        {displayValue(profile?.response_time)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Response rate</dt>
                      <dd className="font-medium text-gray-900">
                        {displayResponseRate(profile?.response_rate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Superhost</dt>
                      <dd className="font-medium text-gray-900">
                        {displayYesNo(profile?.is_superhost)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Verified</dt>
                      <dd className="font-medium text-gray-900">
                        {displayYesNo(profile?.verified)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Languages</dt>
                      <dd className="font-medium text-gray-900">
                        {displayLanguages(profile?.languages)}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Statistics
                  </h3>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-600">Total bookings</dt>
                      <dd className="font-semibold text-gray-900">
                        {stats?.total_bookings ?? 0}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Bookings pending</dt>
                      <dd className="font-semibold text-gray-900">
                        {stats?.bookings_pending ?? 0}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Bookings confirmed</dt>
                      <dd className="font-semibold text-gray-900">
                        {stats?.bookings_confirmed ?? 0}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Bookings completed</dt>
                      <dd className="font-semibold text-gray-900">
                        {stats?.bookings_completed ?? 0}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Total reviews</dt>
                      <dd className="font-semibold text-gray-900">
                        {stats?.total_reviews ?? 0}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Average rating</dt>
                      <dd className="font-semibold text-gray-900">
                        {displayRating(stats?.average_rating)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {isEditing && (
        <div
          id="edit-profile-modal"
          class="modal-backdrop bg-white p-5 border border-1 border-gray-300 mt-4 rounded-xl shadow">
          <div class="modal-panel modal-lg">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-gray-900">Edit profile</h3>
              <a
                href="#"
                class="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                aria-label="Close">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </a>
            </div>
            <form onSubmit={handleSubmit} class="space-y-4" action="about.html">
              {EDIT_FIELDS.map(
                ({ name, label, type, placeholder, autoComplete, rows }) =>
                  type === "textarea" ? (
                    <>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <textarea
                          name={name}
                          rows={rows}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]">
                          Travel enthusiast from Finland
                        </textarea>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <input
                          name={name}
                          type={type}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          autoComplete={autoComplete}
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                        />
                      </div>
                    </>
                  ),
              )}
              <div class="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSave}
                  class="bg-[#FF385C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E61E4D] transition-colors">
                  {isSave ? "is save ...." : "save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-flex items-center">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
