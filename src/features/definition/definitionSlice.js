import { createSlice } from "@reduxjs/toolkit";

export const definitionReducer = createSlice({
  name: "definitions",
  initialState: {
    items: [],
  },
  reducers: {
    setDefinitions: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { setDefinitions } = definitionReducer.actions;
export default definitionReducer.reducer;
