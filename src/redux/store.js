import userSlice from "@/redux/slices/userSlice";
import cartSlice from "@/redux/slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
