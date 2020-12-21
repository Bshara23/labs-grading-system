import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CourseHomeWorkCell from "../components/CourseHomeWorkCell";
import "../components/Course.css";

export default function Course() {
  return (
    <>
      <h1 className=" p-3 mb-3">Algorithum</h1>
      <h4 className=" p-3 mb-3">
        An algorithm (pronounced AL-go-rith-um) is a procedure or formula for
        solving a problem, based on conducting a sequence of specified actions.
        A computer program can be viewed as an elaborate algorithm. In
        mathematics and computer science, an algorithm usually means a small
        procedure that solves a recurrent problem.
      </h4>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}

        {CourseHomeWorks.map((HomeWork, i) => {
          return (
            <Row key={i}>
              <CourseHomeWorkCell
                Title={HomeWork.Title}
                Deadline={HomeWork.Deadline}
                Status={HomeWork.Status}
              />
            </Row>
          );
        })}
      </Container>{" "}
    </>
  );
}

const CourseHomeWorks = [
  {
    Title: "HomeWork1",
    Deadline: "21/10/2020",
    Status: "Submitted",

  },
  {
    Title: "HomeWork2",
    Deadline: "15/11/2020",
    Status: "Not Submitted",
  },
  {
    Title: "HomeWork3",
    Deadline: "30/12/2020",
    Status: "Not Submitted",
  },
];
