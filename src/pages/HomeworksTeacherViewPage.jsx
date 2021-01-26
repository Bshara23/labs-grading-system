import React, {useEffect, useState} from 'react';
import {
  setHomeWorksActive,
  currentHomeworkTeacher,
  setHomeWorkActive,
  currentUser,
  setCurrentSubmission,
  setHideSubmissionDetails,
  setCurrentSubmissionStudentId,
  setCurrentHomeworkTeacher,
  setCurrentHomeworkTitle,
} from '../data/Global';
import {useSelector, useDispatch} from 'react-redux';

import {getStudentsHomeWorks, getStudentDetails, updateHomework} from '../API/API';
import Container from 'react-bootstrap/Container';
import {useHistory} from 'react-router-dom';
import UploadDisplayer from '../components/UploadDisplayer';
import {toDateTimeString} from '../Util/TimeUtil';
import SubmissionCell from '../components/SubmissionCell';
import EditableParagraph from '../components/EditableParagraph';
export default function HomeworkTeacherView() {
  const Homework = useSelector(currentHomeworkTeacher);
  const history = useHistory();
  const user = useSelector(currentUser);

  const dispatch = useDispatch();
  const [StudentsHomeWorks, setStudentHomeWorks] = useState([]);
  const [deadline, setDeadline] = useState();

  useEffect(() => {
    getStudentsHomeWorks(Homework.id).then((res) => {
      let x = res.data;
      setStudentHomeWorks(x);
    });
  }, []);

  useEffect(() => {
    dispatch(setHideSubmissionDetails(true));
    dispatch(setHomeWorkActive(false));
    dispatch(setHomeWorksActive(true));
  }, []);

  const onSubmissionClick = (stuSub) => {
    getStudentDetails(stuSub.studentid).then((res) => {
      // dispatch(setCurrStuTeachViewActive(res.data));
      const data = {
        homeworkTitle: Homework.title,
        student: res.data[0],
        submission: stuSub,
      };
      dispatch(setCurrentSubmission(data));
      dispatch(setHideSubmissionDetails(false));
      dispatch(setCurrentSubmissionStudentId(stuSub.studentid));
      history.push('/SubmissionTeacherView');
    });
  };

  const onEditTitleSuccess = (value) => {
    // update in server
    console.log("updating title", value);
    updateHomeworkLocal(value, Homework.description, Homework.deadline);
    updateHomework(Homework.id, value, Homework.description, Homework.deadline);
  };

  const onEditDescriptionSuccess = (value) => {
    // update in server
    updateHomeworkLocal(Homework.title, value, Homework.deadline);
    updateHomework(Homework.id, Homework.title, value, Homework.deadline);
  };

  // const onEditDeadlineSuccess = (value) => {
  //   setDeadline(value)
  //   const deadlineStr = deadline.toISOString();
  //   // update in server
  //   updateHomeworkLocal(Homework.title, Homework.description, deadlineStr);
  //   updateHomework(
  //     Homework.id,
  //     Homework.title,
  //     Homework.description,
  //     deadlineStr
  //   );
  // };

  const updateHomeworkLocal = (title, description, deadline) => {
    let homeworkCopy = JSON.parse(JSON.stringify(Homework));
    homeworkCopy.title = title;
    homeworkCopy.description = description;
    //homeworkCopy.deadline = deadline.toISOString();

    dispatch(setCurrentHomeworkTeacher(homeworkCopy));
    dispatch(setCurrentHomeworkTitle(homeworkCopy.title));
  };

  return (
    <>
      <EditableParagraph
        headingClass="h1 p-3 mb-3"
        value={Homework.title}
        onEditSuccess={onEditTitleSuccess}
      />
      {/* <EditableDateTime
        headingClass="h4 p-3 mb-3"
        value={`Deadline: ${toDateTimeString(Homework.deadline)}`}
        onEditSuccess={onEditDeadlineSuccess}
      /> */}
      <EditableParagraph
        headingClass="h4 p-3 mb-3"
        value={Homework.description}
        onEditSuccess={onEditDescriptionSuccess}
      />

      <UploadDisplayer
        fkValue={Homework.id}
        fk="homework_id"
        table="homework_file"
        allowUpload={user.type == 'teacher'}
      />
      <h3 className="p-3 mb-3">Students' Submissions</h3>

      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Container className="submissions-box-teacher-view mb-5">
          {StudentsHomeWorks.length == 0 && <h4>No submissions yet!</h4>}
          {StudentsHomeWorks.map((submission, i) => {
            return (
              <SubmissionCell
                key={i}
                className="item"
                submission={submission}
                onClick={() => onSubmissionClick(submission)}
              />
            );
          })}
        </Container>
      </Container>
    </>
  );
}
