import { configureStore } from "@reduxjs/toolkit";
import FormHelperReducer from "./slices/FormHelperSlice";

export const store = configureStore({
  reducer: {
    FormHelper: FormHelperReducer,
    // other reducers...
  },
});

// Use typeof to infer the RootState type
export type RootState = ReturnType<typeof store.getState>;
// Use typeof to infer the AppDispatch type
export type AppDispatch = typeof store.dispatch;
