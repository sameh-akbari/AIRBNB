import axiosInstance from "@/api/axiosInstance";

export async function login(email, password) {
  const { data } = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function refreshToken(refresh_token) {
  const { data } = await axiosInstance.post(
    "/auth/refresh",
    { refresh_token },
    { skipAuth: true },
  );
  return data;
}

export async function register(payload) {
  const { data } = await axiosInstance.post("/auth/register", payload, {
    skipAuth: true,
  });
  return data;
}

export async function logOutUserAPI() {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
}
