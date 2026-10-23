import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const profitSlice = createSlice({
  name: "profit",
  initialState,
  reducers: {
    sellLemonade: (state) => {
      state.value += 5;
    },

    buyLemons: (state) => {
      state.value -= 2;
    },
  },
});

export const { sellLemonade, buyLemons } = profitSlice.actions;

export default profitSlice.reducer;
