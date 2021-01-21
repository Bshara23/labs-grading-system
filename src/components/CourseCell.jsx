import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./CourseCell.css";


export default function CourseCell({title, teacherName, onClick }) {
  const [isHovering, setIsHovering] = useState(false);



  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };

  const onContainerClick = () => {
    
    
    onClick()
  };


  return (

    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onContainerClick}

      className={`Container ${
        isHovering ? " shadow-lg" : "shadow "
      } p-4 mb-5 bg-white rounded `}
    >
      <Row>{title}</Row>
      <Row>Teacher Name: {teacherName}</Row>
    </Container>
  );
}


