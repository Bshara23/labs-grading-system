import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CourseCell from '../components/CourseCell';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentCourse,
  setCourseActive,
  setHomeWorkActive,
  currentUser,
  setCurrentCourseTitle,
  setHideSubmissionDetails,
} from '../data/Global';
import {useHistory} from 'react-router-dom';
import {getUserCourses} from '../API/API';
const axios = require('axios');

export default function MainPage() {
  const history = useHistory();
  const [coursesData, setCoursesData] = useState([]);
  const user = useSelector(currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCourses(user.id).then((res1) => {
      const rawData = res1.data;

      let d = new Map();
      rawData.forEach((r) => {
        if (!d.has(r.cid)) {
          d.set(r.cid, []);
        }
        d.get(r.cid).push(r);
      });

      const crses = [];
      d.forEach((v, k) => {
        crses.push(v);
      });

      setCoursesData(crses);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(true));
    dispatch(setHomeWorkActive(true));
    dispatch(setHideSubmissionDetails(true));
  }, []);

  const onCourseClick = (course) => {
    dispatch(setCurrentCourse(course));
    dispatch(setCurrentCourseTitle(course[0].title));

    history.push('/Course');
  };
  return (
    <>
      <Container>
        {!isLoading ? (
          coursesData &&
          coursesData.length > 0 &&
          coursesData.map((course, i) => {
            return (
              <Row key={i}>
                <CourseCell
                  course={course}
                  onClick={() => onCourseClick(course)}
                />
              </Row>
            );
          })
        ) : (
          <p>Loading courses...</p>
        )}
      </Container>
    </>
  );
}
