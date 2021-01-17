import React, {useEffect} from "react";
import {
  setCurrentHomeworkStudent,
  setHomeWorksActive,
  currentHomeworkStudent,
  setHomeWorkActive,
} from "../data/Global";
import { useSelector, useDispatch } from "react-redux";

import StudentsHomeWorksCell from "../components/StudentsHomeWorksCell";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
export default function HomeworkTeacherView() {
  const Homework = useSelector(currentHomeworkStudent);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));

  }, []);

  const CourseStudentsHomeWorks = [
    {
      id: "316546092",
      name: "Ayman Odeh",
      Title: Homework.Title,
      DeadLine: "21/10/2020",
      Status: "Submitted",
      homeworkfile: "file",
      Description: "This is homework1 of Web",
      Grade: Homework.Grade,
      submitteddate: "20/10/2020",
      studentcomment: "MY COMMENT",
    },
    {
      id: "123456789",
      name: "Ahmad",
      Title: Homework.Title,
      DeadLine: "21/10/2020",
      homeworkfile: "file2",
      Status: "Not Submitted",
      Description: "This is homework1 of Web",
      Grade: Homework.Grade,
      submitteddate: "",
      studentcomment: "MY COMMENT2",
    },
    {
      id: "11111111",
      name: "Bshara Zahran",
      Title: Homework.Title,
      DeadLine: "21/10/2020",
      homeworkfile: "file3",
      Status: "Submitted",
      Description: "This is homework1 of Web",
      Grade: Homework.Grade,
      submitteddate: "18/10/2020",
      studentcomment: "MY COMMENT3",
    },
  ];
  const onClickTeacher = (HomeWork) => {
    history.push("/SingleHomeworkTeacherView");
    dispatch(setCurrentHomeworkStudent(HomeWork));
  };
  return (
    <>
      <h1 className=" p-3 mb-3">{Homework.Title}</h1>
      <h2 className=" p-3 mb-3">DeadLine: {Homework.DeadLine}</h2>
      <h4 className=" p-3 mb-3">{Homework.Description}</h4>

      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        {CourseStudentsHomeWorks.map((HomeWork, i) => {
          return (
            <Col key={i}>
              <StudentsHomeWorksCell
                id={HomeWork.id}
                SubmissionsDate={HomeWork.submitteddate}
                Status={HomeWork.Status}
                onClick={() => onClickTeacher(HomeWork)}
              />
            </Col>
          );
        })}
      </Container>
    </>
  );
}
