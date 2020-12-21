import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./CourseCell.css";
import "./Course.css";
export default function CourseHomeWorkCell({ Title, Deadline, Status }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    //   onClick={()=>onClick(teacherName,courseName)}
      className={`Container ${
        isHovering ? " shadow-lg" : "shadow "
      }${
        Status=="Submitted" ? "CourseSubmittedHomeWork" : "CourseNotSubmittedHomeWork"
      } p-4 mb-5 rounded `}
      
    >
      <Row>{Title}</Row>
      <Row>Deadline: {Deadline}</Row>
      <Row>Status: {Status}</Row>
    </Container>
  );
}
