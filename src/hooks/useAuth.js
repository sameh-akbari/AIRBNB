import { loginFailed, loginSuccess, logOut } from "@/redux/slices/userSlice";
import { loginUser, logOutUser, registerUser } from "@/services";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isAuthenticated = useSelector((state) => Boolean(state.user.access_token));

  //!Login
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      const { access_token, refresh_token, user: userData } = result.data;
      dispatch(loginSuccess({ access_token, refresh_token, user: userData }));
      return { success: true };
    }
    dispatch(loginFailed(result.message));
    return { success: false, message: result.message };
  };

  //!Register
  const register = async (payload) => {
    const result = await registerUser(payload);
    if (result.success && result.data) {
      const { access_token, refresh_token, user: userData } = result.data;
      dispatch(loginSuccess({ access_token, refresh_token, user: userData }));
      return { success: true };
    }
    if (result.success) {
      return { success: true, requireLogin: true, message: result.message };
    }
    dispatch(loginFailed(result.message));
    return { success: false, message: result.message };
  };

  //!Logout
  const logOutPanel = async () => {
    try {
      await logOutUser();
    } catch {
      return null;
    }
    dispatch(logOut());
  };

  return { register, login, user, isLoading, isAuthenticated, logOutPanel };
}
