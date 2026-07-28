import axiosInstance from "./axiosInstance";

export async function getUsers(params = {}) {
  const { data } = await axiosInstance.get("/users", { params });
  return data;
}

export async function createUser(payload) {
  const { data } = await axiosInstance.post("/users", payload);
  return data;
}

export async function updateUser(userId, payload) {
  const { data } = await axiosInstance.put(`/users/${userId}`, payload);
  return data;
}
