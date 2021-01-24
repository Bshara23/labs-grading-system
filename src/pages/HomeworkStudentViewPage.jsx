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


export default function HomeworkStudentView() {
  const student_hw = useSelector(currentHomeworkStudent);
  const [hwDetails, setSubmittedHomeWork] = useState("");
  // var SubmittedHomeWork;
  const dispatch = useDispatch();
  useEffect(() => {
    // on init
    // let StudentComments;
    // let AllComments=[];
    // let textStudComments = "";
    // let textTeachComments = "";
    // let TeacherComments;
    // var i;
    // var j=0;
    // getStudentComments(student_hw.studentId, student_hw.id).then((res) => {
    //   StudentComments = res.data;
    //   getTeachSubComments(student_hw.id).then((res) => {
    //     TeacherComments = res.data;
    //     console.log("cccd",TeacherComments);
    //     for (i = 0; i < TeacherComments.length+StudentComments.length; i+=2){
    //       if(TeacherComments.length>j)
    //       AllComments[i]=TeacherComments[j];
    //       if(StudentComments.length>j)
    //       AllComments[i+1]=StudentComments[j];
    //       j++;
    //     }         
    //     AllComments.sort((a,b)=> -intifiy(a.createdAt) + intifiy(b.createdAt))             
    //     let finalResult = {
    //       id: student_hw.id,
    //       studentId: student_hw.studentId,
    //       description: student_hw.description,
    //       Name: student_hw.Name,
    //       deadline: student_hw.deadline,
    //       updatedAt: student_hw.updatedAt,
    //       status: student_hw.status,
    //       grade: student_hw.grade,
    //       title: student_hw.title,
    //       AllCommentsSorted: AllComments,
    //     };

    //     dispatch(setCurrentHomeworkStudentWithComments(finalResult));
    //     setSubmittedHomeWork(finalResult);
    //   });
    // });

  
  }, []);

  useEffect(() => {
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));
  }, []);
  return (
    <>
      <h1 className=" p-3 mb-3">{hwDetails.title}</h1>
      <h4 className=" p-3 mb-3">{hwDetails.description}</h4>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          {hwDetails && (
            <SpecificHomeWorkCell
              id={hwDetails.studentId}
              SubmissionId={hwDetails.id}
              name={hwDetails.Name}
              submitteddate={hwDetails.updatedAt}
              homeworkfile={hwDetails.homeworkfile}
              Status={hwDetails.status}
              Grade={hwDetails.grade}
              deadline={hwDetails.deadline}
              allcommentssorted={hwDetails.AllCommentsSorted}
            />
          )}
        </Row>
      </Container>
    </>
  );
}
