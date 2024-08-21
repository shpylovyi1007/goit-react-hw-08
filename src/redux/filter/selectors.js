import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectFilter = (state) => state.filters.text;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.includes(filter)
    );
  }
);