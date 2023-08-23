import { configureStore } from "@reduxjs/toolkit";
import definitionReducer from "../features/definition/definitionSlice";
import requestWordReducer from "../features/reqWordKeeper/requestWord";

export default configureStore({
  reducer: {
    reqWord: requestWordReducer,
    definition: definitionReducer,
  },
});
