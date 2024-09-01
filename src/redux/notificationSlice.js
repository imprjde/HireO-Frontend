import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    allNotifications: [],
    unseenNotificationCount: 0,
    isFetchingNotifications: false,
    notificationDetails: null,
    isRotated: false,
  },
  reducers: {
    setAllNotifications: (state, action) => {
      state.allNotifications = action.payload;
    },
    setUnseenNotificationCount: (state, action) => {
      state.unseenNotificationCount = action.payload;
    },
    setIsFetchingNotifications: (state, action) => {
      state.isFetchingNotifications = action.payload;
    },
    setNotificationDetails: (state, action) => {
      state.notificationDetails = action.payload;
    },
    setIsRotated: (state, action) => {
      state.isRotated = action.payload;
    },
  },
});
export const {
  setAllNotifications,
  setUnseenNotificationCount,
  setIsFetchingNotifications,
  setNotificationDetails,
  setIsRotated,
} = notificationSlice.actions;

export default notificationSlice.reducer;
