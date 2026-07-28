import { login, register, refreshToken, logOutUserAPI } from "@/api";

export async function loginUser(email, password) {
  const res = await login(email, password);
  if (res?.success && res?.data) {
    return { success: true, data: res.data };
  }
  return { success: false, message: res?.message || "Login failed" };
}

export async function registerUser(payload) {
  const response = await register(payload);

  if (response?.success && response?.data?.access_token) {
    return { success: true, data: response.data };
  }
  if (response?.success) {
    return { success: true, message: "Account Created" };
  }
  return { success: false, message: "Register Failed" };
}

export async function refreshUserToken(refreshTokenValue) {
  return refreshToken(refreshTokenValue);
}

export async function logOutUser() {
  return logOutUserAPI();
}
