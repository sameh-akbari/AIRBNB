import { useEffect } from "react";
import { AUTH_STORAGE_KEYS } from "@/data/constants/auth";
import { refreshUserToken } from "@/services/auth.service";
import { getStorageItem, getStorageJson } from "@/utils/storage";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  logOut,
  setAuthLoading,
  syncTokens,
} from "@/redux/slices/userSlice";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedRefresh = getStorageItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

    if (!storedRefresh) {
      dispatch(setAuthLoading(false));
    } else {
      refreshUserToken(storedRefresh)
        .then((res) => {
          if (res?.success && res?.data?.access_token) {
            const {
              access_token,
              refresh_token: newRefresh,
              user: userData,
            } = res.data;
            dispatch(
              loginSuccess({
                access_token,
                refresh_token: newRefresh ?? storedRefresh,
                user: userData ?? getStorageJson(AUTH_STORAGE_KEYS.USER),
              }),
            );
          }
        })
        .catch(() => dispatch(logOut()))
        .finally(() => dispatch(setAuthLoading(false)));
    }

    const onTokensRefreshed = (e) => dispatch(syncTokens(e.detail ?? {}));
    window.addEventListener("auth-tokens-refreshed", onTokensRefreshed);
    return () =>
      window.removeEventListener("auth-tokens-refreshed", onTokensRefreshed);
  }, [dispatch]);

  return children;
}
