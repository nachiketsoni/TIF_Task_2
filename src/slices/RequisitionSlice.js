import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Urgency: null,
  Gender: null,
  JobTitle: null,
  JobDetails: null,
  JobLocation: null,
  InterviewDuration: null,
  InterviewLanguage: null,
  InterviewMode: null,
};
export const counterSlice = createSlice({
  name: "RequisitionDetails",
  initialState,
  reducers: {
    getImages: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { getImages } = counterSlice.actions;
