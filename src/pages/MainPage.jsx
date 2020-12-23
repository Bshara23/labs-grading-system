import React from "react";
import BasicButton from "../components/BasicButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CourseCell from "../components/CourseCell";
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentCourse,
  currentCourse
} from '../features/counter/Global';
import { useHistory } from "react-router-dom";


export default function MainPage() {
  const history = useHistory();

  const dispatch = useDispatch();


  const onClick = (course) => {
    history.push("/Course");
    dispatch(setCurrentCourse(course))
  }
  return (
    <>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        {coursesData.map((course, i) => {
          return (
            <Row key={i}>
              <CourseCell
                teacherName={course.teacherName}
                name={course.name}
                onClick={() => onClick(course)}
              />
            </Row>
          );
        })}
      </Container>
    </>
  );
}

const coursesData = [
  {
    name: "Web",
    teacherName: "Alex",
  },
  {
    name: "Final Project",
    teacherName: "Avi",
  },
  {
    name: "Cryptography",
    teacherName: "Ze'ev",
  },
];
