import React, {useEffect} from 'react';
import { setHomeWorksActive, currentHomeworkStudent, setHomeWorkActive } from "../data/Global";
import { useSelector, useDispatch } from "react-redux";
import SpecificHomeWorkCell from "../components/SpecificHomeWorkCell";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
export default function HomeworkStudentView() {
  const Homework = useSelector(currentHomeworkStudent);
  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));

  }, []);


  return (
    <>
    <h1 className=" p-3 mb-3">{Homework.Title}</h1>
    <h4 className=" p-3 mb-3">
        {Homework.Description}
      </h4>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
            <Row>
              <SpecificHomeWorkCell
                Status={Homework.Status}
                Grade={Homework.Grade}
                DeadLine={Homework.DeadLine}
               
              />
            </Row>
      </Container>
    </>
  );
}
