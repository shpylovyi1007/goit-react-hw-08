import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const resetAuthorization = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.post("users/signup", userInfo);
      setAuthorization(res.data.token);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logIn = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post("users/login", user);
    setAuthorization(res.data.token);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const logOut = createAsyncThunk("/users/logout", async (_, thunkAPI) => {
  try {
    await axios.post("users/logout");
    resetAuthorization();
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    if (token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthorization(token);
      const res = await axios("users/current");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);