import { createSlice } from "@reduxjs/toolkit";

export const HomeSlice = createSlice({
  name: "role",
  initialState: {
    value: "student",
  },
  reducers: {
    changeToMentor: (state) => {
      state.value = "mentor";
    },
    changeToStudent: (state) => {
      state.value = "student";
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeToMentor, changeToStudent } = HomeSlice.actions;

export default HomeSlice.reducer;
