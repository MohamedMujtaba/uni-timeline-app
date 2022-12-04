import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const today = new Date();
const d = moment(today).format("dddd");
const initialState = {
  day: d,
};

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    setDay: (state, { payload }) => {
      const { day } = payload;
      state.day = day;
    },
  },
});

export default daySlice.reducer;
export const { setDay } = daySlice.actions;
