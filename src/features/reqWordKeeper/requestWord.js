import { createSlice } from "@reduxjs/toolkit";

export const requestWordReducer = createSlice({
  name: "requestWord",
  initialState: {
    value: null,
  },
  reducers: {
    setRequestWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRequestWord } = requestWordReducer.actions;
export default requestWordReducer.reducer;