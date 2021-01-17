import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./CourseCell.css";
import "./Course.css";
import "./SpecificHomeWork.css"
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import { setCurrentHomeworkStudent, currentHomeworkStudent } from "../data/Global";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SingleHomeworkTeacherViewCell({ id, name, submitteddate, homeworkfile, Status,Grade, studentcomment}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [value, setValue] = React.useState({Grade});
  const history = useHistory();
  const dispatch = useDispatch();
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onClickSave = () => {
    history.push("/HomeworksTeacherView");
    //dispatch(setCurrentHomeworkStudent(HomeWork)) 
  };
  const onClickcCancel= () => {
    history.push("/HomeworksTeacherView");
    //dispatch(setCurrentHomeworkStudent(HomeWork)) 
  };
  return (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    //  onClick={onContainerClick}
      className={`Container ${
        isHovering ? " shadow-lg" : "shadow "
      } ${
        Status=="Submitted" ? "CourseSubmittedHomeWork" : "CourseNotSubmittedHomeWork"
      }p-4 mb-5 rounded `}
      
    >
         <Row >
        <Col className="HomeWorkContent">ID:</Col>
        <Col className="HomeWorkContent" >{id}</Col> 
        </Row>
        <Row >
      <Col className="HomeWorkContent2">Name:</Col>
        <Col className="HomeWorkContent2">{name}</Col>  </Row>
        <Row >
        <Col className="HomeWorkContent">Submitted-Date:</Col>
        <Col className="HomeWorkContent" >{submitteddate}</Col> 
        </Row>
        <Row >
      <Col className="HomeWorkContent2">HomeWork-File:</Col>
        <Col className="HomeWorkContent2">{homeworkfile}</Col>  </Row>
        <Row >
        <Col className="HomeWorkContent">Status:</Col>
        <Col className="HomeWorkContent" >{Status}</Col> 
        </Row>
        <Row >
      <Col className="HomeWorkContent2">Grade:</Col>
        <Col className="HomeWorkContent2"><input className="Grade-Style"></input></Col>  </Row>
        <Row >
        <Col className="HomeWorkContent">Student-Comment:</Col>
        <Col className="HomeWorkContent" >{studentcomment}</Col> 
        </Row>
        <Row >
      <Col className="HomeWorkContent2">Teacher-Comment:</Col>
        <Col className="HomeWorkContent2"><textarea className="Comment-style"></textarea></Col>  </Row>
        <Row >
        <Col className="HomeWorkContent2"><Button onClick={() => onClickcCancel()}>Cancel</Button></Col>
        <Col className="HomeWorkContent2"><Button onClick={() => onClickSave()}>Save</Button></Col>  
        </Row>
    </Container>
   
  );
}
