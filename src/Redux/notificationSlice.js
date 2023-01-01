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
    removeNotification: (state, { payload }) => {
      const { id, time } = payload;
      let arr = state.notifications;
      arr = arr.filter(
        (item) => item.date !== time && item.request.identifier !== id
      );
      state.notifications = arr;
    },
  },
});

export default notificationSlice.reducer;
export const { addNotification, removeNotification } =
  notificationSlice.actions;
