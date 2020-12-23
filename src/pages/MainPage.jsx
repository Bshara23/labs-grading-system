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


export default function MainPage() {

  const dispatch = useDispatch();
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
                onClick={()=>dispatch(setCurrentCourse(course))}
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
    name: "Zeev",
    teacherName: "Cryptography",
  },
];
