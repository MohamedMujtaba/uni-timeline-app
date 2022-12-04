import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  days: [],
};

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setDays: (state, { payload }) => {
      const { days } = payload;
      state.days = days;
    },
    setLoading: (state, { payload }) => {
      const { isLoading } = payload;
      state.isLoading = isLoading;
    },
    setError: (state, { payload }) => {
      const { isError } = payload;
      state.isError = isError;
    },
  },
});

export default daysSlice.reducer;
export const { setDays, setLoading, setError } = daysSlice.actions;
