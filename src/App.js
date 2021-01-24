import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {
  ShowLogIn,
  ShowCourse,
  ShowCourses,
  ShowHomeWork,
  hideSubmissionDetails,
  currentHomeworkTitle,
  currentCourseTitle,
  currentSubmissionStudentId,
} from './data/Global';

import {useSelector, useDispatch} from 'react-redux';

import MainPage from './pages/AllCoursesPage';
import LogIn from './pages/LogInPage';
import Course from './pages/CoursePage';
import HomeworksTeacherView from './pages/HomeworksTeacherViewPage';
import HomeworkStudentView from './pages/HomeworkStudentViewPage';
import SubmissionTeacherView from './pages/SubmissionTeacherView';

function App() {
  const Login = useSelector(ShowLogIn);
  const isCoursesHidden = useSelector(ShowCourses);
  const isCourseHidden = useSelector(ShowCourse);
  const isSubmissionDetailsHidden = useSelector(hideSubmissionDetails);
  const isHomeworkHidden = useSelector(ShowHomeWork);
  const currHwTitle = useSelector(currentHomeworkTitle);
  const currCourseTitle = useSelector(currentCourseTitle);
  const currSubmissionStudentId = useSelector(currentSubmissionStudentId);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Breadcrumb>
          {/* <Breadcrumb.Item  href="/" hidden={Login}>LogIn</Breadcrumb.Item> */}
          <Breadcrumb.Item href="/Courses" hidden={isCoursesHidden}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/Course" hidden={isCourseHidden}>
            {currCourseTitle}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="/HomeworksTeacherView"
            active={false}
            hidden={isHomeworkHidden}
          >
            {currHwTitle}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            href="/SubmissionTeacherView"
            active={false}
            hidden={isSubmissionDetailsHidden}
          >
            {currSubmissionStudentId}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="body">
          <Switch>
            <Route path="/" exact component={LogIn} />
            <Route path="/Courses" exact component={MainPage} />
            <Route path="/Course" exact component={Course} />
            <Route
              path="/HomeworksTeacherView"
              exact
              component={HomeworksTeacherView}
            />
            <Route
              path="/SubmissionTeacherView"
              exact
              component={SubmissionTeacherView}
            />
            <Route
              path="/HomeworkStudentView"
              exact
              component={HomeworkStudentView}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
