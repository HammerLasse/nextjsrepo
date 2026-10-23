import { configureStore } from "@reduxjs/toolkit";
import profitReducer from "./profitSlice";
import cartReducer from "./cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profit: profitReducer,
      cart: cartReducer,
    },
  });
};
