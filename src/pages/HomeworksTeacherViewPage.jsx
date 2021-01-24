import React, {useEffect, useState} from 'react';
import {
  setHomeWorksActive,
  currentHomeworkTeacher,
  setHomeWorkActive,
  currentUser,
  setCurrentSubmission,
  setHideSubmissionDetails,
  setCurrentSubmissionStudentId,
} from '../data/Global';
import {useSelector, useDispatch} from 'react-redux';

import {getStudentsHomeWorks, getStudentDetails} from '../API/API';
import Container from 'react-bootstrap/Container';
import {useHistory} from 'react-router-dom';
import UploadDisplayer from '../components/UploadDisplayer';
import {toDateTimeString} from '../Util/TimeUtil';
import SubmissionCell from '../components/SubmissionCell';
export default function HomeworkTeacherView() {
  const Homework = useSelector(currentHomeworkTeacher);
  const history = useHistory();
  const user = useSelector(currentUser);

  const dispatch = useDispatch();
  const [StudentsHomeWorks, setStudentHomeWorks] = useState([]);

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
      dispatch(setCurrentSubmissionStudentId(stuSub.studentid))
      history.push('/SubmissionTeacherView');
    });
  };
  return (
    <>
      <h1 className=" p-3 mb-3">{Homework.title}</h1>
      <h4 className=" p-3 mb-3">
        DeadLine: {toDateTimeString(Homework.deadline)}
      </h4>
      <h4 className=" p-3 mb-3">{Homework.description}</h4>
      <UploadDisplayer
        fkValue={Homework.id}
        fk="homework_id"
        table="homework_file"
        allowUpload={user.type == 'teacher'}
      />
      <h3 className="p-3 mb-3">Students' Submissions</h3>

      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Container className="submissions-box-teacher-view">
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
