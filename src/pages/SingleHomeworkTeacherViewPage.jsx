import React, {useEffect,useState} from 'react';
import { 
  setCurrentHomeworkStudent, currStuTeachView, setHomeWorksActive,CurrTeachStudHWC,
  setCurrentHomeworkTeachWithComments } from "../data/Global";
import { useSelector, useDispatch } from "react-redux";
import SingleHomeworkTeacherViewCell from "../components/SingleHomeworkTeacherViewCell";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  getStudentComments,
  getTeachSubComments,
} from "../API/API";
import { intifiy } from '../Util/TimeUtil';
export default function SingleHomeworkTeacherView() {
  const Homework = useSelector(currStuTeachView);
  const [hwDetails, setSubmittedHomeWork] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // on init
    let StudentComments;
    let AllComments=[];
    let TeacherComments;
    var i;
    var j=0;
    getStudentComments(Homework.studentId, Homework.id).then((res) => {
      StudentComments = res.data;
      getTeachSubComments(Homework.id).then((res) => {
        TeacherComments = res.data;
        console.log("cccd",TeacherComments);
        for (i = 0; i < TeacherComments.length+StudentComments.length; i+=2){
          if(TeacherComments.length>j)
          AllComments[i]=TeacherComments[j];
          if(StudentComments.length>j)
          AllComments[i+1]=StudentComments[j];
          j++;
        }
        AllComments.sort((a,b)=> -intifiy(a.createdAt) + intifiy(b.createdAt))             
        let finalResult = {
          id: Homework.id,
          studentId: Homework.studentId,
          Name: Homework.Name,
          updatedAt: Homework.updatedAt,
          status: Homework.status,
          grade: Homework.grade,
          AllCommentsSorted: AllComments,
        };
        console.log("ssssd",AllComments);

        dispatch(setCurrentHomeworkTeachWithComments(finalResult));
        setSubmittedHomeWork(finalResult);
      });
    });

    // on destroy
    return () => {
      console.log("Page allCourses closed");
    };
  }, []);
  

  useEffect(() => {
    //dispatch(setHomeWorksActive(false));
  }, []);
  return (
    <>
    <h1 className=" p-3 mb-3">{Homework.Title}</h1>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
            <Row>
              <SingleHomeworkTeacherViewCell
                id={hwDetails.studentId}
                SubmissionId={hwDetails.id}
                name={hwDetails.Name}
                submitteddate={hwDetails.updatedAt}
                homeworkfile={hwDetails.homeworkfile}
                Status={hwDetails.status}
                Grade={hwDetails.grade}
                allcommentssorted={hwDetails.AllCommentsSorted}
                //onClick={() => onClickSave(HomeWork,grade)}      
              />
            </Row>
      </Container>
    </>
  );
}
