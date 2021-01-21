import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    ShowLogIn: false,
    ShowCourses: true,
    ShowCourse: true,
    ShowHomeWorks: true,
    ShowHomeWork: true,
    currentUser: {
      id: "316546092",
      type: "teacher",
    },
    currentCourse: {
      title: "Algorithms222",
      teacherName: "Alex",
      id:1,
    },
    currentHomeworkStudent: {
      id:"1",
      title: "s",
      description:"",
      studentId:"123456789",
      HomeWorkId:"123",
      Name:"Ayman Odeh",
      updatedAt: "21/10/2020",
      status: "Submitted",
      grade: "90",
      deadline: "21/10/2020",
      graderId:"111",
      graderfullname:"aaa",
    },
    currentHomeworkStudentWithComments: {
      id:"1",
      title: "s",
      description:"",
      studentId:"123456789",
      Name:"Ayman Odeh",
      updatedAt: "21/10/2020",
      status: "Submitted",
      grade: "90",
      deadline: "21/10/2020",
      AllCommentsSorted: "This is homework2 of Web",
    },
    currentHomeworkTeacher: {
      id:"123",
      Title: "HomeWork....",
      DeadLine: "21/10/20200000",
      Description: "This is homework2 of Web",
    },
    currentStudentTeacherView: {
      id:"1",
      studentId:"123456789",
      HomeWorkId:"123",
      Name:"Ayman Odeh",
      updatedAt: "21/10/2020",
      status: "Submitted",
      grade: "90",
      graderId:"111",
      graderfullname:"aaa",
    },
    currentStudentTeacherViewWithComments: {
      id:"1",
      title: "s",
      description:"",
      studentId:"123456789",
      Name:"Ayman Odeh",
      updatedAt: "21/10/2020",
      status: "Submitted",
      grade: "90",
      deadline: "21/10/2020",
      AllCommentsSorted: "This is homework2 of Web",
    },
  },
  reducers: {
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setCurrentHomeworkStudent: (state, action) => {
      state.currentHomeworkStudent = action.payload;
    },setCurrentHomeworkStudentWithComments: (state, action) => {
      state.currentHomeworkStudentWithComments = action.payload;
    },setCurrentHomeworkTeachWithComments: (state, action) => {
      state.currentStudentTeacherViewWithComments = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentHomeworkTeacher: (state, action) => {
      state.currentHomeworkTeacher = action.payload;
    },
    setCurrStuTeachViewActive: (state, action) => {
      state.currentStudentTeacherView = action.payload;
    },
    setLogInActive: (state, action) => {
      state.ShowLogIn = action.payload;
    },
    setCoursesActive: (state, action) => {
      state.ShowCourses = action.payload;
    },
    setCourseActive: (state, action) => {
      state.ShowCourse = action.payload;
    },
    setHomeWorksActive: (state, action) => {
      state.ShowHomeWorks = action.payload;
    },
    setHomeWorkActive: (state, action) => {
      state.ShowHomeWork = action.payload;
    },
  },
});

export const {
  setCurrentCourse,
  setCourseActive,
  setCoursesActive,
  setCurrentHomeworkStudent,
  setCurrentHomeworkTeacher,
  setCurrentUser,
  setHomeWorkActive,
  setHomeWorksActive,
  setLogInActive,
  setCurrStuTeachViewActive,
  setCurrentHomeworkStudentWithComments,
  setCurrentHomeworkTeachWithComments,
} = global.actions;

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
export const currStuTeachView = (state) => state.currentStudentTeacherView;
export const ShowLogIn = (state) => state.ShowLogIn;
export const ShowCourses = (state) => state.ShowCourses;
export const ShowCourse = (state) => state.ShowCourse;
export const ShowHomeWorks = (state) => state.ShowHomeWorks;
export const ShowHomeWork = (state) => state.ShowHomeWork;
export const CurrStudHWC = (state) => state.currentHomeworkStudentWithComments;
export const CurrTeachStudHWC = (state) => state.currentStudentTeacherViewWithComments;

export default global.reducer;
