import download from "downloadjs";

const axios = require("axios");


export const API_URL = "http://localhost:5000";
export const UpdateGrade=async (SubmissionId,Grade)=>{
  try {
    return await axios
    .put(API_URL + `/Grade/${SubmissionId}/${Grade}`);
} catch (error) {
  console.error(error);
}
};
export const getTeachSubComments=async (SubmissionId)=>{
  try {
    return await axios
    .get(API_URL + `/getTeachSubComments/${SubmissionId}`)
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
    .get(API_URL + `/getStudentDetails/${StudentId}`)
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
    .get(API_URL + `/getStuSubComments/${StudentId}/${SubmissionId}`)
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
    .get(API_URL + `/getAllStudentHomeWorks/${HomeWorkId}`)
    .then((res) => {
      console.log("my is: ",res.data);
      return res;
    });
} catch (error) {
  console.error(error);
}
};

export const getStudentHomeWork = async (SubmittedId) => {
  try {
    return await axios
      .get(API_URL + `/getStudentHomeWork/${SubmittedId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getCourseHomeWorks = async (courseId) => {
  try {
    return await axios
      .get(API_URL + `/getCourseHomeWorks/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getStudentHomeWorks = async (studentId, courseId) => {
  try {
    return await axios
      .get(API_URL + `/getStudentCourseHomeWorks/${studentId}/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getUsersFromCourse = async (id, type) => {
  try {
    return await axios
      .get(API_URL + `/getteachersfromcourse/${id}/${type}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getUserCourses = async (id) => {
  try {
    return await axios.get(API_URL + `/getUserCourses/${id}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};



export const getUsersFromCourseBody = async (id, type) => {
  try {
    return await axios
      .post(API_URL + `/getteachersfromcourse/${id}`, {
        type: type,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getFiles = async (homework_id) => {
  try {
    return await axios.get(API_URL + `/files/${homework_id}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (file, homeworkId) => {
  try {
    const url = API_URL + "/uploadFile/" + homeworkId;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return await axios.post(url, formData, config).then((res) => {
      return res;
    });
  } catch (error) {}
};

export const downloadFile = async (id, path, mimetype) => {
  try {
    const result = await axios.get(`${API_URL}/download/${id}`, {
      responseType: "blob",
    });
    const split = path.split("_e_e_e_");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // todo
    }
  }
};
