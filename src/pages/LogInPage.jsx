import React, {useState, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux';
import {
  setCurrentUser,
  setCourseActive,
  setHomeWorkActive,
  setHomeWorksActive,
  setIsAddCourseHidden,
  setHideSubmissionDetails,
  setIsAddHomeworkHidden,
} from '../data/Global';
import {useHistory} from 'react-router-dom';
import {setCoursesActive} from '../data/Global';
import {logIn} from '../API/API';
import TemporaryAlert from '../components/TemporaryAlert';
export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsAddHomeworkHidden(false));

    dispatch(setCoursesActive(true));
    dispatch(setCourseActive(true));
    dispatch(setHomeWorkActive(true));
    dispatch(setHomeWorksActive(true));
    dispatch(setIsAddCourseHidden(true));
    dispatch(setHideSubmissionDetails(true));
  }, []);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const alertRef = useRef();
  function validateForm() {
    return id.length > 0 && password.length > 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    logIn(id, password).then((res) => {
      if (res && res.data && res.data.length != 0) {
  
        if (res.data[0].fname == 'Admin' && res.data[0].lname == 'Admin') {
          history.push('/AdminPage');
          dispatch(setCurrentUser(res.data[0]));
        } else {
          history.push('/Courses');
          dispatch(setCurrentUser(res.data[0]));
          dispatch(setCoursesActive(false));
        }
      } else {
        alertRef.current.showAlert();
      }
    });
  }

  const alertHeading = 'Log in failed';
  const alertBody = 'Password or ID are not correct! try again.';

  return (
    <div className="Login">
      <TemporaryAlert
        body={alertBody}
        heading={alertHeading}
        type="warning"
        ref={alertRef}
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>ID</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
