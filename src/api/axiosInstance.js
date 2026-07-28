import { AUTH_STORAGE_KEYS } from "@/data";
import axios from "axios";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  setStorageJson,
} from "@/utils/storage";

//!1-axios create
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_ACCESS = AUTH_STORAGE_KEYS.ACCESS_TOKEN;
const AUTH_REFRESH = AUTH_STORAGE_KEYS.REFRESH_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//!2-interceptors Request
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config;
    const token = getStorageItem(AUTH_ACCESS);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//!3-interceptors Response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refresh = getStorageItem(AUTH_REFRESH);
    if (!refresh) return Promise.reject(error);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/refresh`,
        { refresh_token: refresh },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 15000,
        },
      );

      if (data?.success && data?.data?.access_token) {
        setStorageItem(AUTH_ACCESS, data.data.access_token);
        if (data.data.refresh_token) {
          setStorageItem(AUTH_REFRESH, data.data.refresh_token);
        }
        if (data.data.user) {
          setStorageJson(AUTH_STORAGE_KEYS.USER, data.data.user);
        }
        window.dispatchEvent(
          new CustomEvent("auth-tokens-refreshed", { detail: data.data }),
        );
        originalRequest.headers.Authorization = `Bearer ${data.data.access_token}`;
        return axiosInstance(originalRequest);
      }
    } catch {
      removeStorageItem(AUTH_ACCESS);
      removeStorageItem(AUTH_REFRESH);
      removeStorageItem(AUTH_STORAGE_KEYS.USER);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
