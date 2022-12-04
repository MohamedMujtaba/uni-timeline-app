import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  year: "Pet",
  dep: "019",
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
  },
});

export default paramsSlice.reducer;
export const { saveParams } = paramsSlice.actions;
