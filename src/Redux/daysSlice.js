import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  isOnline: true,
  data: [],
};

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      const { data } = payload;
      state.data = data;
    },
    setLoading: (state, { payload }) => {
      const { isLoading } = payload;
      state.isLoading = isLoading;
    },
    setError: (state, { payload }) => {
      const { isError } = payload;
      state.isError = isError;
    },
    setIsOnline: (state, { payload }) => {
      const { isOnline } = payload;
      state.isOnline = isOnline;
    },
  },
});

export default daysSlice.reducer;
export const { setData, setLoading, setError, setIsOnline } = daysSlice.actions;
