import { createSlice } from "@reduxjs/toolkit";
import {
  getContacts,
  delateContact,
  addContact,
  editContact,
} from "./operations";
import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const creatorContact = {
  name: "Yevhenii Shpylovyi (Owner)",
  number: "+380635282766",
  id: 76200,
};

const initValues = {
  items: [creatorContact],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: initValues,
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = [creatorContact, ...action.payload];
      })
      .addCase(getContacts.rejected, handleRejected)
      .addCase(delateContact.pending, handlePending)
      .addCase(delateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(delateContact.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, () => initValues);
  },
});

export const contactsReducer = contactsSlice.reducer;