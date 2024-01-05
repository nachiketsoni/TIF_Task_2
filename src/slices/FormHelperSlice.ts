import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { FormHelperState } from "@src/interface/forms";



const initialState: FormHelperState = {
  requisitionTitle: "",
  noOfOpenings: 0,
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


type FormHelperStat = {
  requisitionTitle: string;
  noOfOpenings: number;
  urgency: string;
  gender: string;
  jobTitle: string;
  jobDetails: string;
  jobLocation: string;
  interviewDuration: string;
  interviewLanguage: string;
  interviewMode: string;
  activeTab: number;
}


type UpdateValuePayload = {
  name: keyof FormHelperStat;
  value: any; // Adjust the type as needed
};

const FormHelperSlice = createSlice({
  name: "FormHelperSlice",
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<UpdateValuePayload[]>) => {
      action.payload.forEach((val) => {
        // Use cast to any to avoid TypeScript error
           (state as Draft<FormHelperState>)[val.name] = val.value as never;
      });
    },
    ActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { updateValue, ActiveTab } = FormHelperSlice.actions;
export default FormHelperSlice.reducer;
