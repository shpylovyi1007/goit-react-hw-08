import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const initValues = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = () => {};

const handleRejected = () => {
};

const handleLoginIn = (state, action) => {
  state.isLoggedIn = true;
  state.user = action.payload.user;
  state.token = action.payload.token;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initValues,
  extraReducers: (bilder) => {
    bilder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleLoginIn)
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, handleLoginIn)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => (state.isRefreshing = false));
  },
});

export const authReducer = authSlice.reducer;