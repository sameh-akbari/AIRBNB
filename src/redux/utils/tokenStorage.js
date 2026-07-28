import { AUTH_STORAGE_KEYS } from "@/data/constants/auth";
import { getStorageItem, setStorageItem } from "@/utils/storage";

export function getStoredAccessToken() {
  return getStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
}

export function setStoredAccessToken(token) {
  setStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
}
