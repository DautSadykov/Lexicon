import { configureStore } from "@reduxjs/toolkit";
import definitionReducer from "../features/definition/definitionSlice";
import requestWordReducer from "../features/reqWordKeeper/requestWord";

export default configureStore({
  reducer: {
    definition: definitionReducer,
    reqWord: requestWordReducer,
  },
});
