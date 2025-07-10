import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {},
  reducers: {
    updateVariable: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { updateVariable } = globalSlice.actions;
export default globalSlice.reducer;
