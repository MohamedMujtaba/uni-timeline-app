import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  year: "",
  dep: "",
};

const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    saveParams: (state, { payload }) => {
      const { year, dep } = payload;
      state.year = year;
      state.dep = dep;
    },
    clearParams: (state) => {
      state.year = "";
      state.dep = "";
    },
  },
});

export default paramsSlice.reducer;
export const { saveParams, clearParams } = paramsSlice.actions;
