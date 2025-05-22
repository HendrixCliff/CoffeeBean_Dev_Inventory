import { combineReducers } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice"
import filterReducer from "./filteredItemSlice"
import authReducer from "./authSlice"
import categoryReducer from "./categorySlice"
import receiptReducer from "./receiptSlice"

export const rootReducer = combineReducers({
  items: itemReducer,
  filter: filterReducer,
  auth: authReducer,
  categories: categoryReducer,
  receipts: receiptReducer
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  