import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentUser,
  currentUser,
  setCourseActive,
  setHomeWorkActive,
  setHomeWorksActive,
} from "../data/Global";
import { useHistory } from "react-router-dom";
import { setCoursesActive } from "../data/Global";

export default function Login() {
  const history = useHistory();

  useEffect(() => {
    dispatch(setCoursesActive(true));
    dispatch(setCourseActive(true));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    history.push("/Courses");
    dispatch(setCurrentUser(User));
    dispatch(setCoursesActive(false));
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
const User = {
  id: "315798504",
  type: "student",
};
