import { getStorageJson, setStorageJson } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: getStorageJson("cart-item"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload ?? null;
      if (action.payload) {
        setStorageJson("cart-item", action.payload);
      }
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
