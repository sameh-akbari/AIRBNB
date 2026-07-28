import { AUTH_STORAGE_KEYS } from "@/data";
import {
  getStorageItem,
  getStorageJson,
  removeStorageItem,
  setStorageItem,
  setStorageJson,
} from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: getStorageJson(AUTH_STORAGE_KEYS.USER),
  access_token: getStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN),
  refresh_token: getStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN),
  isLoading: true,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { access_token, refresh_token, user } = action.payload;
      state.user = user ?? null;
      state.access_token = access_token ?? null;
      state.refresh_token = refresh_token ?? null;
      state.message = null;
      state.isLoading = false;

      setStorageJson(AUTH_STORAGE_KEYS.USER, user ?? null);
      setStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, access_token ?? null);
      setStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refresh_token ?? null);
    },
    loginFailed: (state, action) => {
      state.message = action.payload ?? null;
      state.isLoading = false;
    },

    logOut: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.message = null;
      state.isLoading = false;

      removeStorageItem(AUTH_STORAGE_KEYS.USER);
      removeStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      removeStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    syncTokens: (state, action) => {
      const { access_token, refresh_token, user } = action.payload ?? {};
      if (access_token) {
        state.access_token = access_token;
        setStorageItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, access_token);
      }
      if (refresh_token) {
        state.refresh_token = refresh_token;
        setStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
      }
      if (user) {
        state.user = user;
        setStorageJson(AUTH_STORAGE_KEYS.USER, user);
      }
    },
  },
});

export const { loginSuccess, loginFailed, logOut, setAuthLoading, syncTokens } =
  userSlice.actions;

export default userSlice.reducer;
