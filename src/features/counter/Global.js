import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    ShowLogIn: false,
    ShowCourses:true,
    ShowCourse:true,
    ShowHomeWorks:true,
    ShowHomeWork:true,
    currentUser: {
      id: "316546092",
      type: "teacher",
    },currentCourse: {
      name: "Algorithms222",
      teacherName: "Alex",
    },currentHomeworkStudent: {
      Title: "HomeWork....",
      DeadLine: "21/10/20200000",
      Status: "Not Submitted",
      Description: "This is homework2 of Web",
      Grade: "90"

    },currentHomeworkTeacher: {
      Title: "HomeWork....",
      DeadLine: "21/10/20200000",
      Description: "This is homework2 of Web",
    }
  },
  reducers: {
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    }, setCurrentHomeworkStudent: (state, action) => {
    state.currentHomeworkStudent = action.payload;
  },setCurrentUser: (state, action) => {
    state.currentUser = action.payload;
  },setCurrentHomeworkTeacher: (state, action) => {
    state.currentHomeworkTeacher = action.payload;
  },setLogIn: (state, action) => {
    state.ShowLogIn = action.payload;
  },setCourses: (state, action) => {
    state.ShowCourses = action.payload;
  },setCourse: (state, action) => {
    state.ShowCourse = action.payload;
  },setHomeWorks: (state, action) => {
    state.ShowHomeWorks = action.payload;
  },setHomeWork: (state, action) => {
    state.ShowHomeWork = action.payload;
  }
},
});

export const { setCurrentCourse } = global.actions;
export const { setCurrentHomeworkStudent } = global.actions;
export const { setCurrentUser } = global.actions;
export const { setCurrentHomeworkTeacher } = global.actions;
export const { setLogIn } = global.actions;
export const { setCourses } = global.actions;
export const { setCourse } = global.actions;
export const { setHomeWorks } = global.actions;
export const { setHomeWork } = global.actions;


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
export const currentHomeworkStudent = (state) => state.currentHomeworkStudent;
export const currentUser = (state) => state.currentUser;
export const currentHomeworkTeacher = (state) => state.currentHomeworkTeacher;
export const ShowLogIn = (state) => state.ShowLogIn;
export const ShowCourses = (state) => state.ShowCourses;
export const ShowCourse = (state) => state.ShowCourse;
export const ShowHomeWorks = (state) => state.ShowHomeWorks;
export const ShowHomeWork = (state) => state.ShowHomeWork;

export default global.reducer;
