import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./CourseCell.css";
import "./Course.css";
import "./SpecificHomeWork.css";
import Col from 'react-bootstrap/Col';


export default function SpecificHomeWorkCell({ Status,Grade, DeadLine}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = acceptedFiles =>
    setFileNames(acceptedFiles.map(file => file.name));
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onContainerClick = () => {
    
    
   // onClick()
  };

  return (

    <Container 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    //  onClick={onContainerClick}
      className=" shadow-lg"
    >

      <Row >
        <Col className="HomeWorkContent">Status:</Col>
        <Col className="HomeWorkContent" >{Status}</Col> 
        </Row>
      <Row >
      <Col className="HomeWorkContent2">Grade:</Col>
        <Col className="HomeWorkContent2">{Grade}</Col>  </Row>
        <Row >
      <Col className="HomeWorkContent">DeadLine:</Col>
        <Col className="HomeWorkContent">{DeadLine}</Col>  </Row>
        <Row >
      <Col className="HomeWorkContent2">TimeLeft:</Col>
        <Col className="HomeWorkContent2">11 Days</Col>  </Row>
        <Row >
      <Col className="HomeWorkContent">Comment:</Col>
        <Col className="HomeWorkContent"><textarea className="Comment-style"></textarea></Col>  </Row>
    </Container>
  );
}
