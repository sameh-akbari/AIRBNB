import { useState } from "react";
import { useAdminAmenities, useAdminAmenityMutations } from "@/hooks";
import { AMENITY_CATEGORIES } from "@/data";

const EMPTY_FORM = { name: "", category: "basic", icon: "" };
const MAIN_CATEGORIES = ["basic", "premium", "safety"];
const INPUT_CLASS =
  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent";

function getApiError(err, fallback) {
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error?.message ||
    err?.message ||
    fallback
  );
}

function AmenityRow({ amenity, onEdit, onDelete, deletingId }) {
  return (
    <li className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-900">{amenity.name}</span>
        <span className="text-xs text-gray-400">{amenity.icon}</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(amenity)}
          className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(amenity.id)}
          disabled={deletingId === amenity.id}
          className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
        >
          {deletingId === amenity.id ? "Deleting…" : "Delete"}
        </button>
      </div>
    </li>
  );
}

function AdminAmenities() {
  const { data: amenitiesList, isLoading } = useAdminAmenities();
  const amenities = Array.isArray(amenitiesList)
    ? amenitiesList
    : (amenitiesList?.data ?? []);

  const { createAmenityMutation, updateAmenityMutation, deleteAmenityMutation } =
    useAdminAmenityMutations();
  const addLoading = createAmenityMutation.isPending;
  const editLoading = updateAmenityMutation.isPending;
  const deletingId = deleteAmenityMutation.isPending
    ? deleteAmenityMutation.variables
    : null;

  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [addError, setAddError] = useState("");
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [editError, setEditError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setAddError("");
    if (!addForm.name?.trim() || !addForm.icon?.trim()) {
      setAddError("Name and icon are required.");
      return;
    }
    createAmenityMutation.mutate(
      {
        name: addForm.name.trim(),
        category: addForm.category || "basic",
        icon: addForm.icon.trim(),
      },
      {
        onSuccess: () => setAddForm(EMPTY_FORM),
        onError: (err) => setAddError(getApiError(err, "Failed to add amenity.")),
      },
    );
  };

  const openEdit = (amenity) => {
    setEditError("");
    setEditing(amenity);
    setEditForm({
      name: amenity.name ?? "",
      category: amenity.category ?? "basic",
      icon: amenity.icon ?? "",
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editing) return;
    setEditError("");
    if (!editForm.name?.trim() || !editForm.icon?.trim()) {
      setEditError("Name and icon are required.");
      return;
    }
    updateAmenityMutation.mutate(
      {
        amenityId: editing.id,
        payload: {
          name: editForm.name.trim(),
          category: editForm.category || "basic",
          icon: editForm.icon.trim(),
        },
      },
      {
        onSuccess: () => setEditing(null),
        onError: (err) =>
          setEditError(getApiError(err, "Failed to update amenity.")),
      },
    );
  };

  const handleDelete = (amenityId) => {
    if (!window.confirm("Delete this amenity?")) return;
    deleteAmenityMutation.mutate(amenityId, {
      onError: (err) => alert(getApiError(err, "Failed to delete.")),
    });
  };

  const otherAmenities = amenities.filter(
    (a) => !MAIN_CATEGORIES.includes((a.category || "").toLowerCase()),
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Amenities</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add amenity
            </h3>
            <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. WiFi"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm({ ...addForm, name: e.target.value })
                  }
                  className={INPUT_CLASS}
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Category
                </label>
                <select
                  value={addForm.category}
                  onChange={(e) =>
                    setAddForm({ ...addForm, category: e.target.value })
                  }
                  className={INPUT_CLASS}
                >
                  {AMENITY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-36">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Icon
                </label>
                <input
                  type="text"
                  placeholder="e.g. wifi"
                  value={addForm.icon}
                  onChange={(e) =>
                    setAddForm({ ...addForm, icon: e.target.value })
                  }
                  className={INPUT_CLASS}
                />
              </div>
              <button
                type="submit"
                disabled={addLoading}
                className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D] disabled:opacity-50"
              >
                {addLoading ? "Adding…" : "Add"}
              </button>
            </form>
            {addError && <p className="text-sm text-red-600 mt-2">{addError}</p>}
          </div>
          <div className="p-6">
            {isLoading ? (
              <p className="text-gray-500">Loading amenities…</p>
            ) : (
              <div className="space-y-6">
                {MAIN_CATEGORIES.map((cat) => {
                  const items = amenities.filter(
                    (a) => (a.category || "").toLowerCase() === cat,
                  );
                  if (items.length === 0) return null;
                  return (
                    <div key={cat}>
                      <h4 className="text-sm font-semibold text-gray-500 tracking-wider mb-3 capitalize">
                        {cat}
                      </h4>
                      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                        {items.map((a) => (
                          <AmenityRow
                            key={a.id}
                            amenity={a}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                            deletingId={deletingId}
                          />
                        ))}
                      </ul>
                    </div>
                  );
                })}
                {otherAmenities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Other
                    </h4>
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                      {otherAmenities.map((a) => (
                        <AmenityRow
                          key={a.id}
                          amenity={a}
                          onEdit={openEdit}
                          onDelete={handleDelete}
                          deletingId={deletingId}
                        />
                      ))}
                    </ul>
                  </div>
                )}
                {amenities.length === 0 && (
                  <p className="text-gray-500">
                    No amenities yet. Add one above.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden
            onClick={() => setEditing(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Edit amenity
              </h3>
              <form onSubmit={handleEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className={INPUT_CLASS}
                  >
                    {AMENITY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={editForm.icon}
                    onChange={(e) =>
                      setEditForm({ ...editForm, icon: e.target.value })
                    }
                    className={INPUT_CLASS}
                  />
                </div>
                {editError && <p className="text-sm text-red-600">{editError}</p>}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 px-4 py-2 bg-[#FF385C] text-white rounded-lg font-semibold hover:bg-[#E61E4D] disabled:opacity-70"
                  >
                    {editLoading ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminAmenities;
