import React, {useEffect,useState} from "react";
import {
  setCurrentHomeworkTeacher,
  setHomeWorksActive,
  currentHomeworkTeacher,
  setHomeWorkActive,
  setCurrStuTeachViewActive,
} from "../data/Global";
import { useSelector, useDispatch } from "react-redux";

import StudentsHomeWorksCell from "../components/StudentsHomeWorksCell";
import { getStudentsHomeWorks,getStudentComments,getStudentDetails,getTeachSubComments } from "../API/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import UploadDisplayer from "../components/UploadDisplayer";
export default function HomeworkTeacherView() {
  const Homework = useSelector(currentHomeworkTeacher);
  const history = useHistory();
  const dispatch = useDispatch();
  const [StudentsHomeWorks, setStudentHomeWorks] = useState([]);

  useEffect(() => {
    // on init
    getStudentsHomeWorks(Homework.id).then((res) => {
      let x = res.data;
      setStudentHomeWorks(x);
    });
    
    // on destroy
    return () => {
      console.log("Page allCourses closed");
    };
  }, []);

  useEffect(() => {
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));

  }, []);

  const onClickTeacher = (MyHomeWork) => {
    let StudentDetails;
    getStudentDetails(MyHomeWork.studentId).then((res) => {
      StudentDetails= res.data;
      let finalResult={id:MyHomeWork.id,studentId:MyHomeWork.studentId,
      HomeWorkId:MyHomeWork.homeworkId,Name:StudentDetails[0].fName+" "+StudentDetails[0].lName,
      updatedAt:MyHomeWork.updatedAt,status:MyHomeWork.status,grade:MyHomeWork.grade,
      graderId:MyHomeWork.graderId,graderfullname:MyHomeWork.graderFullName}
      history.push("/SingleHomeworkTeacherView");
      dispatch(setCurrStuTeachViewActive(finalResult));
    });
  };
  return (
    <>
      <h1 className=" p-3 mb-3">{Homework.Title}</h1>
      <h2 className=" p-3 mb-3">DeadLine: {Homework.DeadLine}</h2>
      <h4 className=" p-3 mb-3">{Homework.Description}</h4>
      <p>Files... todo add list</p>
      <UploadDisplayer homework_id={1}/>


      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        {StudentsHomeWorks.map((MyHomeWork, i) => {
          return (
            <Col key={i}>
              <StudentsHomeWorksCell
                id={MyHomeWork.studentId}
                SubmissionsDate={MyHomeWork.updatedAt}
                Status={MyHomeWork.status}
                onClick={() => onClickTeacher(MyHomeWork)}
              />
            </Col>
          );
        })}
      </Container>
    </>
  );
}
