import React, {useEffect, useState} from "react";
import BasicButton from "../components/BasicButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CourseCell from "../components/CourseCell";
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentCourse,
  currentCourse,
  setCourseActive,
  setHomeWorkActive
} from '../data/Global';
import { useHistory } from "react-router-dom";
import {getUsersFromCourse,getUsersFromCourseBody} from '../API/API'

export default function MainPage() {
  const history = useHistory();
  const [teach, setTeacher] = useState("NA");
  const [teach2, setTeacher2] = useState("NA");

  const dispatch = useDispatch();
 
  useEffect(() => {
   // on init
   getUsersFromCourse(4, "teacher").then(res => {
     console.log("teachers:", res);
     if(res.data==[])
     console.log("empty:");
     else
     setTeacher(res.data[0].fName);
   })
   // on destroy
   return () => {
    console.log("Page allCourses closed");
   }

  }, [])

  useEffect(() => {
    // on init
    getUsersFromCourseBody(4, "teacher").then(res => {
      console.log("teachers:", res);
      if(res.data==[])
      console.log("empty:");
      else
      setTeacher(res.data[0].fName);
    })
    // on destroy
    return () => {
     console.log("Page allCourses closed");
    }
 
   }, [])
  useEffect(() => {
    dispatch(setCourseActive(true))
    dispatch(setHomeWorkActive(true))

  }, [])


  const onClick = (course) => {
    history.push("/Course");
    dispatch(setCurrentCourse(course))
  }
  return (
    <>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <p>{teach}</p>
        <p>{teach}</p>
        {coursesData.map((course, i) => {
          return (
            <Row key={i}>
              <CourseCell
                teacherName={course.teacherName}
                name={course.name}
                onClick={() => onClick(course)}
              />
            </Row>
          );
        })}
      </Container>
    </>
  );
}

const coursesData = [
  {
    name: "Web",
    teacherName: "Alex",
  },
  {
    name: "Final Project",
    teacherName: "Avi",
  },
  {
    name: "Cryptography",
    teacherName: "Ze'ev",
  },
];
