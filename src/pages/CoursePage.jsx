import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CourseStudentHomeWorkCell from '../components/CourseStudentHomeWorkCell';
import CourseTeacherHomeWorkCell from '../components/CourseTeacherHomeWorkCell';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentUser,
  currentUser,
  setCourseActive,
  setHomeWorkActive,
  currentCourse,
  setCurrentHomeworkStudent,
  setCurrentHomeworkTeacher,
  setHomeWorksActive,
} from '../data/Global';

import {useHistory} from 'react-router-dom';
import {getStudentHomeWorks, getCourseHomeWorks} from '../API/API';
import {
  getStudentsHomeWorks,
  getStudentComments,
  getStudentDetails,
  getTeachSubComments,
} from '../API/API';

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
    console.log('course:', course);
    console.log('user:', user);
    setCourseName(course[0].title);
    setCourseDescription(course[0].description);

    getCourseHomeWorks(course[0].cid).then((res) => {
      let sortedRes = res.data;

      sortedRes.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      setCoursesTeacherHomeWorks(sortedRes);
      console.log('setCoursesTeacherHomeWorks', sortedRes);
    });

    getStudentHomeWorks(user.id, course[0].cid).then((res) => {
      let sortedRes = res.data;
      sortedRes.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });

      setCoursesStudentHomeWorks(sortedRes);
      console.log('student', sortedRes);
    });
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(false));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
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
    history.push('/HomeworksTeacherView');
  };

  return (
    <>
      <h1 className=" p-2">{courseName}</h1>
      <h5 className=" p-4">{courseDescription}</h5>
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
