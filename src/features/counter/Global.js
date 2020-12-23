import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    currentCourse: {
      name: "Algorithms222",
      teacherName: "Alex",
    },
  },
  reducers: {
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
  },
});

export const { setCurrentCourse } = global.actions;

// TODO
export const setCurrentCourseAsync = (course) => (dispatch) => {
  setTimeout(() => {
    dispatch(setCurrentCourse(course));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const currentCourse = (state) => state.currentCourse;

export default global.reducer;
