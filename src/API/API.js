const axios = require("axios");

const root = "http://localhost:5000";

  export const getUsersFromCourse = async (id,type) => {
    try {
      return await axios
      .get(root + `/getteachersfromcourse/${id}/${type}`)
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