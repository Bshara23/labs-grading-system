import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./CourseCell.css";

export default function CourseCell({ courseName, teacherName, onClick }) {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };

  return (

    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`Container ${
        isHovering ? " shadow-lg" : "shadow "
      } p-4 mb-5 bg-white rounded `}
    >
      <Row>{courseName}</Row>
      <Row>Teacher Name: {teacherName}</Row>
    </Container>
  );
}
