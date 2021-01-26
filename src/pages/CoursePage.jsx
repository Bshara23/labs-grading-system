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
import {FormControl} from 'react-bootstrap';
import EditableParagraph from '../components/EditableParagraph';

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
    });
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(false));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
    dispatch(setHideSubmissionDetails(true));
    dispatch(setIsAddCourseHidden(true));
  }, []);

  const onClickStudent = (MyHomeWork) => {
    let StudentDetails;
    getStudentDetails(MyHomeWork.studentId).then((res) => {
      StudentDetails = res.data;
      let studenthomework = {
        id: MyHomeWork.id,
        studentId: MyHomeWork.studentId,
        description: MyHomeWork.description,
        title: MyHomeWork.title,
        HomeWorkId: MyHomeWork.homeworkId,
        Name: StudentDetails[0].fName + ' ' + StudentDetails[0].lName,
        updatedAt: MyHomeWork.updatedAt,
        status: MyHomeWork.status,
        grade: MyHomeWork.grade,
        deadline: MyHomeWork.deadline,
        graderId: MyHomeWork.graderId,
        graderfullname: MyHomeWork.graderFullName,
      };
      history.push('/HomeworkStudentView');
      dispatch(setCurrentHomeworkStudent(studenthomework));
      dispatch(setCourseActive(false));
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
    let courseCopy = JSON.parse(JSON.stringify(course))
    courseCopy.forEach((c) => {
      c.title = title;
      c.description = description;
    });
    dispatch(setCurrentCourse(courseCopy));
    dispatch(setCurrentCourseTitle(courseCopy[0].title));
  };

  return (
    <>
      {user.type == 'teacher' ? (
        <EditableParagraph
          headingClass="h1"
          value={courseName}
          onEditSuccess={onEditTitleSuccess}
        />
      ) : (
        <h1 className=" p-2">{courseName}</h1>
      )}
      {user.type == 'teacher' ? (
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
        />
      )}
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        {user.type == 'teacher'
          ? CourseTeacherHomeWorks.map((HomeWork, i) => {
              return (
                <Row key={i}>
                  <CourseTeacherHomeWorkCell
                    id={HomeWork.id}
                    Title={HomeWork.title}
                    DeadLine={HomeWork.deadline}
                    onClick={() => onClickTeacher(HomeWork)}
                  />
                </Row>
              );
            })
          : CourseStudentHomeWorks.map((HomeWork, i) => {
              return (
                <Row key={i}>
                  <CourseStudentHomeWorkCell
                    id={HomeWork.id}
                    Title={HomeWork.title}
                    DeadLine={HomeWork.deadline}
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
