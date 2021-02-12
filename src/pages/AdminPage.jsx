import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrentCourse,
  setCourseActive,
  setHomeWorkActive,
  currentUser,
  setCurrentCourseTitle,
  setHideSubmissionDetails,
  setIsAddCourseHidden,
  setIsAddHomeworkHidden,
} from '../data/Global';
import {useHistory} from 'react-router-dom';
import {
  deleteCourse,
  deleteUser,
  getAllCourses,
  getAllUsers,
  getUserCourses,
} from '../API/API';
import {Button} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Modal} from 'react-bootstrap';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
const axios = require('axios');

export default function AdminPage() {
  const history = useHistory();
  const user = useSelector(currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    getAllUsers().then((res) => {
      console.log('all users', res);
      setUsers(res.data);
    });

    getAllCourses().then((res) => {
      console.log('all courses', res);
      setCourses(res.data);
    });
  };
  useEffect(() => {
    if (user) {
      // get all courses
      // get all people

      fetchData();

      dispatch(setIsAddHomeworkHidden(false));
      dispatch(setCourseActive(true));
      dispatch(setHomeWorkActive(true));
      dispatch(setHideSubmissionDetails(true));
      dispatch(setIsAddCourseHidden(true));
    }
  }, [user]);

  const onAddCourseClicked = () => {
    dispatch(setIsAddCourseHidden(false));
    history.push('/CourseForm');
  };
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [className, setClassName] = React.useState('course');
  const [selectedUser, setSelectedUser] = useState(-1);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setClassName('course');
        break;
      case 1:
        setClassName('user');
        break;

      default:
        break;
    }
  };

  const onUserClick = (user) => {
    setSelectedUser(user);
    onDeleteClick();
  };
  const onCourseClick = (course) => {
    setSelectedCourse(course);
    onDeleteClick();
  };
  const onDeleteClick = () => {
    setShow(true);
  };
  const onDeleteConfirmed = () => {
    handleClose();
    switch (value) {
      // delete course
      case 0:
        deleteCourse(selectedCourse.id).then((res) => {
          //refresh
          fetchData();
        });
        break;
      // delete user
      case 1:
        deleteUser(selectedUser.id).then((res) => {
          //refresh
          fetchData();
        });
        break;

      default:
        break;
    }
  };
  const onHomeworkDeleteDeclined = () => {
    handleClose();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {className}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {className}: <br/> {value == 1 ? `${selectedUser.fname} ${selectedUser.lname} - ${selectedUser.id}` : selectedCourse.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {user && user.type == 'admin' && (
        <Container>
          <h1 className="centerTitle">Admin Page</h1>

          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Delete Courses" />
              <Tab label="Users" />
              <Tab label="Registeration" />
            </Tabs>
          </Paper>

          {value == 0 && (
            <h4 className="centerTitle mt-3">Click on course to delete it</h4>
          )}
          <div className="submissions-box-teacher-view mt-5">
            {value == 0 &&
              courses &&
              courses.length > 0 &&
              courses.map((course, i) => {
                return (
                  <div key={i}>
                    <CourseCell
                      course={course}
                      onClick={() => onCourseClick(course)}
                    />
                  </div>
                );
              })}
          </div>

          {value == 1 && (
            <h4 className="centerTitle mt-3">Click on user to delete it</h4>
          )}
          <div className="submissions-box-teacher-view mt-5">
            {value == 1 &&
              users &&
              users.length > 0 &&
              users.map((user, i) => {
                return (
                  <div key={i}>
                    <UserCell user={user} onClick={() => onUserClick(user)} />
                  </div>
                );
              })}
          </div>
        </Container>
      )}
    </>
  );
}

const CourseCell = ({course, onClick}) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onContainerClick = () => {
    onClick();
  };

  return (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onContainerClick}
      className={`submission-container ${
        isHovering ? ' shadow-lg' : 'shadow '
      }${'CourseSubmittedHomeWork border border-danger'} p-4 m-4 rounded `}
    >
      <Row>Course ID: {course.id}</Row>
      <Row>Course Title: {course.title}</Row>
    </Container>
  );
};

const UserCell = ({user, onClick}) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };
  const onContainerClick = () => {
    onClick();
  };

  return (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onContainerClick}
      className={`submission-container ${
        isHovering ? ' shadow-lg' : 'shadow '
      }${'CourseSubmittedHomeWork border border-danger'} p-4 m-4 rounded `}
    >
      <Row>User ID: {user.id}</Row>
      <Row>User Name: {`${user.fname} ${user.lname}`}</Row>
      <Row>User Type: {user.type}</Row>
    </Container>
  );
};
