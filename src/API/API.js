const axios = require("axios");

const root = "http://localhost:5000";
export const UpdateGrade=async (SubmissionId,Grade)=>{
  try {
    return await axios
    .put(root + `/Grade/${SubmissionId}/${Grade}`);
} catch (error) {
  console.error(error);
}
};
export const getTeachSubComments=async (SubmissionId)=>{
  try {
    return await axios
    .get(root + `/getTeachSubComments/${SubmissionId}`)
    .then((res) => {
      return res;
    });
} catch (error) {
  console.error(error);
}
};
export const getStudentDetails=async (StudentId) =>{
  try {
    return await axios
    .get(root + `/getStudentDetails/${StudentId}`)
    .then((res) => {
      return res;
    });
} catch (error) {
  console.error(error);
}
};
export const getStudentComments=async (StudentId,SubmissionId) =>{
  try {
    return await axios
    .get(root + `/getStuSubComments/${StudentId}/${SubmissionId}`)
    .then((res) => {
      return res;
    });
} catch (error) {
  console.error(error);
}
};
export const getStudentsHomeWorks=async (HomeWorkId) =>{
  try {
    return await axios
    .get(root + `/getAllStudentHomeWorks/${HomeWorkId}`)
    .then((res) => {
      console.log("my is: ",res.data);
      return res;
    });
} catch (error) {
  console.error(error);
}
};

export const getStudentHomeWork=async (SubmittedId) =>{
    try {
      return await axios
      .get(root + `/getStudentHomeWork/${SubmittedId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getCourseHomeWorks=async (courseId) =>{
    try {
      return await axios
      .get(root + `/getCourseHomeWorks/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getStudentHomeWorks=async (studentId,courseId) =>{
    try {
      return await axios
      .get(root + `/getStudentCourseHomeWorks/${studentId}/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
  export const getUsersFromCourse = async (id,type) => {
    try {
        console.log("getting teacher");

      return await axios
      .get(root + `/getteachersfromcourse/${id}/${type}`)
      .then((res) => {
          console.log("gettingvvv teacher");
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getUserCourses = async (id) => {
    try {
      return await axios
      .get(root + `/getUserCourses/${id}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

  export const getUsersFromCourseBody = async (id, type) => {
    try {
      return await axios
        .post(root + `/getteachersfromcourse/${id}`, {
          type: type,
        })
        .then((res) => {
          return res;
        });
    } catch (error) {
      console.error(error);
    }
  };