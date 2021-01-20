import React, { useEffect, useState } from "react";
import {
  setHomeWorksActive,
  currentHomeworkStudent,
  setHomeWorkActive,
} from "../data/Global";
import { useSelector, useDispatch } from "react-redux";
import SpecificHomeWorkCell from "../components/SpecificHomeWorkCell";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getStudentHomeWork } from "../API/API";

export default function HomeworkStudentView() {
  const student_hw = useSelector(currentHomeworkStudent);
  const [hwDetails, setSubmittedHomeWork] = useState("");
  // var SubmittedHomeWork;
  const dispatch = useDispatch();
  useEffect(() => {
    // on init
    getStudentHomeWork(student_hw.id).then((res) => {
      let x = res.data[0];
      setSubmittedHomeWork(x);


      //  setcoursedata(res.data)
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
  return (
    <>
      <h1 className=" p-3 mb-3">{student_hw.Title}</h1>
      <h4 className=" p-3 mb-3">{student_hw.Description}</h4>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          {hwDetails && (
            <SpecificHomeWorkCell
              Status={hwDetails.status}
              Grade={hwDetails.grade}
              DeadLine={student_hw.deadline}

            />
          )}
        </Row>
      </Container>
    </>
  );
}
