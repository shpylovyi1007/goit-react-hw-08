import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (_, thunkAPI) => {
    try {
      const res = await axios("contacts");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (
    { name, number, country, note = "", mail = "", linkedIn = "" },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("contacts", {
        name,
        number,
        country,
        note,
        mail,
        linkedIn,
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const delateContact = createAsyncThunk(
  "contacts/delateContact",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`contacts/${id}`);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ id, contactChange }, thunkAPI) => {
    try {
      const res = await axios.patch(`contacts/${id}`, contactChange);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);