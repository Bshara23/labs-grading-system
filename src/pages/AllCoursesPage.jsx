import React, { useEffect, useState } from "react";
import BasicButton from "../components/BasicButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CourseCell from "../components/CourseCell";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentCourse,
  currentCourse,
  setCourseActive,
  setHomeWorkActive,
  currentUser,
} from "../data/Global";
import { useHistory } from "react-router-dom";
import {
  getUsersFromCourse,
  getUsersFromCourseBody,
  getUserCourses,
} from "../API/API";
const axios = require("axios");

export default function MainPage() {
  const history = useHistory();
  const [coursesData, setCoursesData] = useState([]);
  const user = useSelector(currentUser);
  var Mycourses = [];

  const dispatch = useDispatch();
  var i;

  const adad = async () => {
    const getStudentDetails = "Adawd";
    const mimetype = "adad";
    const path = "pth";
    const homeworkId = 1;
    const title = "dd";
    await axios
      .post(
        `http://localhost:5000/file/${path}/${homeworkId}/${mimetype}/${title}`
      )
      .then((x) => {
        console.log("xxxx",x);
        //res.send("file uploaded successfully.");
      });
  };

  useEffect(() => {
    // on init
    adad();

    ////////////////// Test

    ///////////////////

    getUserCourses(user.id).then((res) => {
      console.log("courses:", res);
      const Mycourses = res.data;

      for (i = 0; i < Mycourses.length; i++) {
        getUsersFromCourse(Mycourses[i].id, "teacher").then((res) => {
          const vars = {
            id: res.data[0].id,
            title: res.data[0].title,
            teacherName: res.data[0].fName + " " + res.data[0].lName,
          };
          console.log("getting2: ", vars);
          setCoursesData([...coursesData, vars]);
        }, []);
      }
      console.log("coursesData:", coursesData.length);
      //  setcoursedata(res.data)
    });
    // on destroy
    return () => {
      console.log("Page allCourses closed");
    };
  }, []);

  useEffect(() => {
    dispatch(setCourseActive(true));
    dispatch(setHomeWorkActive(true));
  }, []);

  const onClick = (course) => {
    history.push("/Course");
    dispatch(setCurrentCourse(course));
  };
  return (
    <>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        {/* <p>{teach}</p>
        <p>{teach}</p> */}
        {coursesData.map((course, i) => {
          return (
            <Row key={i}>
              <CourseCell
                teacherName={course.teacherName}
                title={course.title}
                onClick={() => onClick(course)}
              />
            </Row>
          );
        })}
      </Container>
    </>
  );
}

// const coursesData = [
//   {
//     name: "Web",
//     teacherName: "Alex",
//   },
//   {
//     name: "Final Project",
//     teacherName: "Avi",
//   },
//   {
//     name: "Cryptography",
//     teacherName: "Ze'ev",
//   },
// ];
