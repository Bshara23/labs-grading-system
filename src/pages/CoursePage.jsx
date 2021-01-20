import React, {useEffect, useState} from "react";
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

export default function Course() {
  const course = useSelector(currentCourse);
  const user = useSelector(currentUser);
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setCourseActive(false))
    dispatch(setHomeWorkActive(true))
    dispatch(setHomeWorksActive(true));
  }, [])


  const onClickStudent = (HomeWork) => {
    dispatch(setCurrentHomeworkStudent(HomeWork));
    dispatch(setCourseActive(false));
    history.push("/HomeworkStudentView");
    
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
                  Title={HomeWork.Title}
                  DeadLine={HomeWork.DeadLine}
                  Status={HomeWork.Status}
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
                  Title={HomeWork.Title}
                  DeadLine={HomeWork.DeadLine}
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

const CourseStudentHomeWorks = [
  {
    Title: "HomeWork1",
    DeadLine: "21/10/2020",
    Status: "Submitted",
    Description: "This is homework1 of Web",
    Grade: "90",
  },
  {
    Title: "HomeWork2",
    DeadLine: "21/10/2020",
    Status: "Not Submitted",
    Description: "This is homework2 of Web",
    Grade: "90",
  },
  {
    Title: "HomeWork3",
    DeadLine: "21/10/2020",
    Status: "Submitted",
    Description: "This is homework3 of Web",
    Grade: "",
  },
];

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
