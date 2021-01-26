import React, {useEffect, useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CourseStudentHomeWorkCell from '../components/CourseStudentHomeWorkCell';
import CourseTeacherHomeWorkCell from '../components/CourseTeacherHomeWorkCell';
import {useSelector, useDispatch} from 'react-redux';
import {
  currentUser,
  setCourseActive,
  setHomeWorkActive,
  currentCourse,
  setCurrentHomeworkStudent,
  setCurrentHomeworkTeacher,
  setHomeWorksActive,
  setCurrentHomeworkTitle,
  setHideSubmissionDetails,
  setIsAddCourseHidden,
  setCurrentCourseTitle,
  setCurrentCourse,
  setCurrentSubmission,
  setCurrentSubmissionStudentId,
} from '../data/Global';

import {useHistory} from 'react-router-dom';
import {
  getStudentHomeWorks,
  getCourseHomeWorks,
  updateCourse,
} from '../API/API';
import {getStudentDetails} from '../API/API';
import UploadDisplayer from '../components/UploadDisplayer';
import {MdEdit, MdCheck} from 'react-icons/md';
import {Button, FormControl} from 'react-bootstrap';
import EditableParagraph from '../components/EditableParagraph';
import { toDateTimeString } from '../Util/TimeUtil';

export default function Course() {
  const course = useSelector(currentCourse);
  const [CourseStudentHomeWorks, setCoursesStudentHomeWorks] = useState([]);
  const [CourseTeacherHomeWorks, setCoursesTeacherHomeWorks] = useState([]);
  const user = useSelector(currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  useEffect(() => {
    setCourseName(course[0].title);
    setCourseDescription(course[0].description);

    getCourseHomeWorks(course[0].cid).then((res) => {
      let sortedRes = res.data;

      sortedRes.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      setCoursesTeacherHomeWorks(sortedRes);
    });

    getStudentHomeWorks(user.id, course[0].cid).then((res) => {
      let sortedRes = res.data;
      sortedRes.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });

      setCoursesStudentHomeWorks(sortedRes);
      console.log("submissions", sortedRes);
    });
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(false));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
    dispatch(setHideSubmissionDetails(true));
    dispatch(setIsAddCourseHidden(true));
  }, []);

  const onClickStudent = (stuSub) => {
    getStudentDetails(stuSub.studentid).then((res) => {
      // dispatch(setCurrStuTeachViewActive(res.data));
      const data = {
        homeworkTitle: stuSub.title,
        student: res.data[0],
        submission: stuSub,
      };
      dispatch(setCurrentSubmission(data));
      dispatch(setHideSubmissionDetails(false));
      dispatch(setCurrentSubmissionStudentId(stuSub.title));
      dispatch(setCourseActive(false));

      history.push('/SubmissionTeacherView');
    });
  };
 
  const onClickTeacher = (HomeWork) => {
    dispatch(setCurrentHomeworkTeacher(HomeWork));
    dispatch(setCourseActive(false));
    dispatch(setCurrentHomeworkTitle(HomeWork.title));
    history.push('/HomeworksTeacherView');
  };

  const onEditDescriptionSuccess = (value) => {
    setCourseDescription(value);
    // update in server
    updateCourse(course[0].cid, courseName, value);
    updateCourseLocal(courseName, value);
  };
  const onEditTitleSuccess = (value) => {
    setCourseName(value);
    // update in server
    updateCourse(course[0].cid, value, courseDescription);
    updateCourseLocal(value, courseDescription);
  };

  const updateCourseLocal = (title, description) => {
    let courseCopy = JSON.parse(JSON.stringify(course));
    courseCopy.forEach((c) => {
      c.title = title;
      c.description = description;
    });
    dispatch(setCurrentCourse(courseCopy));
    dispatch(setCurrentCourseTitle(courseCopy[0].title));
  };

  const onClickAddHomework = () => {
    history.push('/HomeworkForm');
  };

  return (
    <>
      {user && user.type == 'teacher' ? (
        <EditableParagraph
          headingClass="h1 text-center"
          value={courseName}
          onEditSuccess={onEditTitleSuccess}
        />
      ) : (
        <h1 className=" p-2">{courseName}</h1>
      )}
      {user && user.type == 'teacher' ? (
        <EditableParagraph
          headingClass="h5"
          value={courseDescription}
          onEditSuccess={onEditDescriptionSuccess}
        />
      ) : (
        <h5 className=" p-4">{courseDescription}</h5>
      )}
      {course && course.length > 0 && (
        <UploadDisplayer
          fkValue={course[0].cid}
          fk="course_id"
          table="course_file"
          allowUpload={user.type == 'teacher'}
          allowDelete={user.type == 'teacher'}
        />
      )}
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        <h3 className="text-center">Homeworks</h3>
        {user.type == 'teacher' && (
          <div className="d-flex flex-row-reverse mt-3 mb-3">
            <Button
              variant="primary"
              type="submit"
              onClick={onClickAddHomework}
            >
              Add Homework
            </Button>
          </div>
        )}

        {user.type == 'teacher' && CourseTeacherHomeWorks.length == 0 && (
          <h5>No homeworks yet!, add homework</h5>
        )}
        {user.type == 'teacher' &&
          CourseTeacherHomeWorks.map((HomeWork, i) => {
            return (
              <Row key={i}>
                <CourseTeacherHomeWorkCell
                  id={HomeWork.id}
                  Title={HomeWork.title}
                  DeadLine={toDateTimeString(HomeWork.deadline)}
                  onClick={() => onClickTeacher(HomeWork)}
                />
              </Row>
            );
          })}

        {user.type == 'student' && CourseStudentHomeWorks.length == 0 && (
          <h5>No homeworks yet!</h5>
        )}
        {user.type == 'student' &&
          CourseStudentHomeWorks.map((HomeWork, i) => {
            return (
              <Row key={i}>
                <CourseStudentHomeWorkCell
                  id={HomeWork.id}
                  Title={HomeWork.title}
                  DeadLine={toDateTimeString(HomeWork.deadline)}
                  Status={HomeWork.status}
                  onClick={() => onClickStudent(HomeWork)}
                />
              </Row>
            );
          })}
      </Container>{' '}
    </>
  );
}
