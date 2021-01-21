import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CourseStudentHomeWorkCell from "../components/CourseStudentHomeWorkCell";
import CourseTeacherHomeWorkCell from "../components/CourseTeacherHomeWorkCell";
import "../components/Course.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentUser,
  currentUser,
  setCourseActive,
  setHomeWorkActive,
  currentCourse,
  setCurrentHomeworkStudent,
  setCurrentHomeworkTeacher,
  setHomeWorksActive,
} from "../data/Global";

import { useHistory } from "react-router-dom";
import { getStudentHomeWorks,getCourseHomeWorks } from "../API/API";
import { getStudentsHomeWorks,getStudentComments,getStudentDetails,getTeachSubComments } from "../API/API";

export default function Course() {
  const course = useSelector(currentCourse);
  const [CourseStudentHomeWorks, setCoursesStudentHomeWorks] = useState([]);
  const [CourseTeacherHomeWorks, setCoursesTeacherHomeWorks] = useState([]);
  const user = useSelector(currentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("course title:",course.title);

    if (user.type == "student") {
      // on init
      getStudentHomeWorks(user.id, course.id).then((res) => {
        let sortedRes = res.data;
        sortedRes.sort(function (a, b) {
          return ('' + a.title).localeCompare(b.title);
      })
       
        setCoursesStudentHomeWorks(sortedRes);
        //  setcoursedata(res.data)
      });
      // on destroy
      return () => {
        console.log("Page allCourses closed");
      };
    }
    else{
      // on init
      getCourseHomeWorks(course.id).then((res) => {
        let sortedRes = res.data;
      
        sortedRes.sort(function (a, b) {
          return ('' + a.title).localeCompare(b.title);
      })

      setCoursesTeacherHomeWorks(sortedRes);
        //  setcoursedata(res.data)
      });
      // on destroy
      return () => {
        console.log("Page allCourses closed");
      };
    }
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(false));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));

  }, []);

  const onClickStudent = (MyHomeWork) => {
    let StudentDetails;
    getStudentDetails(MyHomeWork.studentId).then((res) => {
      StudentDetails= res.data;
      let studenthomework={id:MyHomeWork.id,studentId:MyHomeWork.studentId,description:MyHomeWork.description,
        title:MyHomeWork.title,HomeWorkId:MyHomeWork.homeworkId,Name:StudentDetails[0].fName+" "+StudentDetails[0].lName,
        updatedAt:MyHomeWork.updatedAt,status:MyHomeWork.status,grade:MyHomeWork.grade,deadline:MyHomeWork.deadline,
      graderId:MyHomeWork.graderId,graderfullname:MyHomeWork.graderFullName}
      history.push("/HomeworkStudentView");
      dispatch(setCurrentHomeworkStudent(studenthomework));
      dispatch(setCourseActive(false));
    });
  };
  const onClickTeacher = (HomeWork) => {
    dispatch(setCurrentHomeworkTeacher(HomeWork));
    dispatch(setCourseActive(false));
    history.push("/HomeworksTeacherView");
  };

  if (user.type === "student") {
    return (
      <>
        <h1 className=" p-3 mb-3">{course.name}</h1>
             <h4 className=" p-3 mb-3">

          An algorithm (pronounced AL-go-rith-um) is a procedure or formula for
          solving a problem, based on conducting a sequence of specified
          actions. A computer program can be viewed as an elaborate algorithm.
          In mathematics and computer science, an algorithm usually means a
          small procedure that solves a recurrent problem.
        </h4>
        <Container>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}

          {CourseStudentHomeWorks.map((HomeWork, i) => {
            return (
              <Row key={i}>
                <CourseStudentHomeWorkCell
                  id={HomeWork.id}
                  Title={HomeWork.title}
                  DeadLine={HomeWork.deadline}
                  Status={HomeWork.status}
                  onClick={() => onClickStudent(HomeWork)}
                />
              </Row>
            );
          })}
        </Container>{" "}
      </>
    );
  } else if (user.type === "teacher") {
    return (
      <>
        <h1 className=" p-3 mb-3">{course.name}</h1>
        <h4 className=" p-3 mb-3">
          An algorithm (pronounced AL-go-rith-um) is a procedure or formula for
          solving a problem, based on conducting a sequence of specified
          actions. A computer program can be viewed as an elaborate algorithm.
          In mathematics and computer science, an algorithm usually means a
          small procedure that solves a recurrent problem.
        </h4>
        <Container>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}

          {CourseTeacherHomeWorks.map((HomeWork, i) => {
            return (
              <Row key={i}>
                <CourseTeacherHomeWorkCell
                  id={HomeWork.id}
                  Title={HomeWork.title}
                  DeadLine={HomeWork.deadline}
                  onClick={() => onClickTeacher(HomeWork)}
                />
              </Row>
            );
          })}
        </Container>{" "}
      </>
    );
  }
}

// const CourseStudentHomeWorks = [
//   {
//     Title: "HomeWork1",
//     DeadLine: "21/10/2020",
//     Status: "Submitted",
//     Description: "This is homework1 of Web",
//     Grade: "90",
//   },
//   {
//     Title: "HomeWork2",
//     DeadLine: "21/10/2020",
//     Status: "Not Submitted",
//     Description: "This is homework2 of Web",
//     Grade: "90",
//   },
//   {
//     Title: "HomeWork3",
//     DeadLine: "21/10/2020",
//     Status: "Submitted",
//     Description: "This is homework3 of Web",
//     Grade: "",
//   },
// ];

const CourseTeacherHomeWorks = [
  {
    Title: "HomeWork1",
    DeadLine: "21/10/2020",
    Description: "This is homework1 of Web",
  },
  {
    Title: "HomeWork2",
    DeadLine: "22/10/2020",
    Description: "This is homework2 of Web",
  },
  {
    Title: "HomeWork3",
    DeadLine: "23/10/2020",
    Description: "This is homework3 of Web",
  },
];
