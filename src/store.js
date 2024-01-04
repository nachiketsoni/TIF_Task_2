import { configureStore } from "@reduxjs/toolkit";
import RequisitionSlice from "./slices/RequisitionSlice";

export const store = configureStore({
  reducer: {
    Requisition: RequisitionSlice,
  },
});
