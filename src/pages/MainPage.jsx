import React from "react";
import BasicButton from "../components/BasicButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CourseCell from "../components/CourseCell";

export default function MainPage() {

 

  return (
    <>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        {coursesData.map((course, i) => {
          return (
            <Row key={i}>
              <CourseCell
                teacherName={course.TeacherName}
                courseName={course.CourseName}
               
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
    CourseName: "Web",
    TeacherName: "Alex",
  },
  {
    CourseName: "Final Project",
    TeacherName: "Avi",
  },
  {
    CourseName: "Zeev",
    TeacherName: "Cryptography",
  },
];
