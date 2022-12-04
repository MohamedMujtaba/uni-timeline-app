import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const expoTokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    saveToken: (state, { payload }) => {
      const { token } = payload;
      state.token = token;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});

export default expoTokenSlice.reducer;
export const { saveToken, removeToken } = expoTokenSlice.actions;
