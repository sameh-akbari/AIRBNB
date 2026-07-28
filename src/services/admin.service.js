import {
  getUsers,
  createUser,
  updateUser,
  getPropertiesList,
  getAdminBookings,
  getAllAmenitiesApi,
  createAmenityApi,
  updateAmenityApi,
  deleteAmenityApi,
} from "@/api";

export {
  getUsers,
  createUser,
  updateUser,
  getPropertiesList,
  getAdminBookings,
  getAllAmenitiesApi,
  createAmenityApi,
  updateAmenityApi,
  deleteAmenityApi,
};

export async function createAdminUser(payload) {
  return createUser(payload);
}

export async function updateAdminUser({ userId, payload }) {
  return updateUser(userId, payload);
}

export async function createAdminAmenity(payload) {
  return createAmenityApi(payload);
}

export async function updateAdminAmenity({ amenityId, payload }) {
  return updateAmenityApi(amenityId, payload);
}

export async function deleteAdminAmenity(amenityId) {
  return deleteAmenityApi(amenityId);
}
