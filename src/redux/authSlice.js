import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    loading: false,
    scrollState: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setScrollState: (state, action) => {
      state.scrollState = action.payload;
    },
  },
});

export const { setLoading, setAuthUser, setScrollState } = authSlice.actions;
export default authSlice.reducer;
