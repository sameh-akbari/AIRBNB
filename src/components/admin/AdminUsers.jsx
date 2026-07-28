import { useState } from "react";
import { useAdminUsers, useAdminUserMutations } from "@/hooks";
import { isSuperAdminUser } from "./utils";

const DEFAULT_META = { page: 1, per_page: 10, total: 0, total_page: 0 };
const DEFAULT_USER_FORM = {
  name: "",
  email: "",
  password: "",
  repassword: "",
  role_id: 4,
};
const INPUT_CLASS =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent";

const ROLE_OPTIONS = [
  { value: 1, label: "Admin (role_id=1)" },
  { value: 4, label: "User (role_id=4)" },
  { value: 5, label: "Host (role_id=5)" },
];

function getUserApiError(err, fallback) {
  const data = err?.response?.data;
  const errorObj = data?.error;
  const mainMsg = errorObj?.message || data?.message || fallback;
  const details = errorObj?.details;
  if (!details || typeof details !== "object") return mainMsg;

  const parts = Object.entries(details).flatMap(([field, list]) =>
    Array.isArray(list)
      ? list.map((text) => `${field}: ${text}`)
      : [`${field}: ${String(list)}`],
  );
  return parts.length ? [mainMsg, ...parts].join("\n") : mainMsg;
}

function UserFormModal({
  title,
  form,
  setForm,
  error,
  loading,
  isEdit,
  onClose,
  onSubmit,
  submitLabel,
  loadingLabel,
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm whitespace-pre-line">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={INPUT_CLASS}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={INPUT_CLASS}
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEdit
                  ? "New password (leave blank to keep current)"
                  : "Password"}
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className={INPUT_CLASS}
                placeholder="••••••••"
                required={!isEdit}
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEdit ? "Confirm new password" : "Confirm Password"}
              </label>
              <input
                type="password"
                value={form.repassword}
                onChange={(e) =>
                  setForm({ ...form, repassword: e.target.value })
                }
                className={INPUT_CLASS}
                placeholder="••••••••"
                required={!isEdit}
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={form.role_id}
                onChange={(e) =>
                  setForm({ ...form, role_id: Number(e.target.value) })
                }
                className={INPUT_CLASS}
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function AdminUsers() {
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState(DEFAULT_USER_FORM);
  const [addError, setAddError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState(DEFAULT_USER_FORM);
  const [editError, setEditError] = useState("");

  const { createUserMutation, updateUserMutation } = useAdminUserMutations();
  const addLoading = createUserMutation.isPending;
  const editLoading = updateUserMutation.isPending;

  const { data, isLoading } = useAdminUsers({
    page,
    perPage: 10,
    sortBy: "id",
    sortDir: "ASC",
  });

  const users = data?.data ?? [];
  const meta = data?.meta ?? DEFAULT_META;

  const openAddModal = () => {
    setAddError("");
    setAddForm(DEFAULT_USER_FORM);
    setShowAddModal(true);
  };

  const openEditModal = (user) => {
    if (isSuperAdminUser(user)) return;
    setEditError("");
    setEditingUser(user);
    setEditForm({
      name: user.full_name ?? "",
      email: user.email ?? "",
      password: "",
      repassword: "",
      role_id: user.role_id ?? 4,
    });
  };

  const validatePassword = (form, requirePassword) => {
    if (requirePassword && !form.password) {
      return "Name, email and password are required.";
    }
    if (!form.name.trim() || !form.email.trim()) {
      return "Name and email are required.";
    }
    if (form.password) {
      if (form.password !== form.repassword) {
        return "Password and confirm password do not match.";
      }
      if (form.password.length < 6) {
        return "Password must be at least 6 characters.";
      }
    }
    return "";
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setAddError("");
    const validationError = validatePassword(addForm, true);
    if (validationError) {
      setAddError(validationError);
      return;
    }
    createUserMutation.mutate(
      {
        name: addForm.name.trim(),
        email: addForm.email.trim(),
        password: addForm.password,
        role_id: Number(addForm.role_id),
      },
      {
        onSuccess: () => setShowAddModal(false),
        onError: (err) =>
          setAddError(getUserApiError(err, "Failed to create user.")),
      },
    );
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    if (isSuperAdminUser(editingUser)) {
      setEditError("Super Admin accounts cannot be edited.");
      return;
    }
    setEditError("");
    const validationError = validatePassword(editForm, false);
    if (validationError) {
      setEditError(validationError);
      return;
    }
    const payload = {
      name: editForm.name.trim(),
      email: editForm.email.trim(),
      role_id: Number(editForm.role_id),
    };
    if (editForm.password) payload.password = editForm.password;
    updateUserMutation.mutate(
      { userId: editingUser.id, payload },
      {
        onSuccess: () => setEditingUser(null),
        onError: (err) =>
          setEditError(getUserApiError(err, "Failed to update user.")),
      },
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Users Management
          </h2>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D] transition-colors"
          >
            Add New User
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            Loading users…
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {u.full_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {u.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {u.role ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {u.create_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {isSuperAdminUser(u) ? (
                            <span
                              className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-semibold"
                              title="Super Admin accounts are protected"
                            >
                              Protected
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openEditModal(u)}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold hover:bg-blue-200"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {meta.total_page > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {meta.page} of {meta.total_page} ({meta.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((p) => Math.min(meta.total_page, p + 1))
                    }
                    disabled={page >= meta.total_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showAddModal && (
        <UserFormModal
          title="Add New User"
          form={addForm}
          setForm={setAddForm}
          error={addError}
          loading={addLoading}
          isEdit={false}
          onClose={() => {
            setShowAddModal(false);
            setAddError("");
          }}
          onSubmit={handleAddSubmit}
          submitLabel="Create User"
          loadingLabel="Creating…"
        />
      )}

      {editingUser && (
        <UserFormModal
          title="Edit User"
          form={editForm}
          setForm={setEditForm}
          error={editError}
          loading={editLoading}
          isEdit
          onClose={() => {
            setEditingUser(null);
            setEditError("");
          }}
          onSubmit={handleEditSubmit}
          submitLabel="Save"
          loadingLabel="Saving…"
        />
      )}
    </>
  );
}

export default AdminUsers;
