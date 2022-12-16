import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      const { notification } = payload;
      state.notifications = [notification, ...state.notifications];
    },
  },
});

export default notificationSlice.reducer;
export const { addNotification } = notificationSlice.actions;
