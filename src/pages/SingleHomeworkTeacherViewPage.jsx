import React from 'react';
import { setCurrentHomeworkStudent, currentHomeworkStudent } from "../data/Global";
import { useSelector, useDispatch } from "react-redux";
import SingleHomeworkTeacherViewCell from "../components/SingleHomeworkTeacherViewCell";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
export default function SingleHomeworkTeacherView() {
  const Homework = useSelector(currentHomeworkStudent);

  return (
    <>
    <h1 className=" p-3 mb-3">{Homework.Title}</h1>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
            <Row>
              <SingleHomeworkTeacherViewCell
                id={Homework.id}
                name={Homework.name}
                submitteddate={Homework.submitteddate}
                homeworkfile={Homework.homeworkfile}
                Status={Homework.Status}
                Grade={Homework.Grade}
                studentcomment={Homework.studentcomment} 
                //onClick={() => onClickSave(HomeWork,grade)}      
              />
            </Row>
      </Container>
    </>
  );
}
