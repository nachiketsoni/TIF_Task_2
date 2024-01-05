import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormHelperState } from "@src/interface/forms";



const initialState: FormHelperState = {
  requisitionTitle: "",
  noOfOpenings: "0",
  urgency: "",
  gender: "",
  jobTitle: "",
  jobDetails: "",
  jobLocation: "",
  interviewDuration: "",
  interviewLanguage: "",
  interviewMode: "",
  activeTab: 0,
};

const FormHelperSlice = createSlice({
  name: "FormHelperSlice",
  initialState,
  reducers: {
    updateValue: (
      state,
      action: PayloadAction<{ name: string, value: string }[]>
    ) => {
      action.payload.forEach((val) => {
        state[val.name] = val.value;
      });
    },
    ActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { updateValue, ActiveTab } = FormHelperSlice.actions;
export default FormHelperSlice.reducer;
