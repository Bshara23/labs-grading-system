import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import MainGallery from './components/MainGallery'
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";

//import d1 from './imgs/R4by5S1mb/d1.jpg'
//import ImagesSlider from './components/ImagesSlider'
//import SlideShow from './components/SlideShow'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import { setLogIn, ShowLogIn } from "./data/Global";
import { setCourses, ShowCourses } from "./data/Global";
import { setCourse, ShowCourse } from "./data/Global";
import { setHomeWorks, ShowHomeWorks } from "./data/Global";
import { setHomeWork, ShowHomeWork } from "./data/Global";
import { useSelector, useDispatch } from "react-redux";

import MainPage from "./pages/AllCoursesPage";
import LogIn from "./pages/LogInPage";
import Course from "./pages/CoursePage";
import HomeworksTeacherView from "./pages/HomeworksTeacherViewPage";
import HomeworkStudentView from "./pages/HomeworkStudentViewPage";
import SingleHomeworkTeacherView from "./pages/SingleHomeworkTeacherViewPage";

function App() {  
  const Login = useSelector(ShowLogIn);
  const courses = useSelector(ShowCourses);
  const course = useSelector(ShowCourse);
  const homeworks = useSelector(ShowHomeWorks);
  const homework = useSelector(ShowHomeWork);
  const dispatch = useDispatch();

  const btnClick = () => {
    console.log(Login);
  };
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Breadcrumb>
            <Breadcrumb.Item  href="/" hidden={Login}>LogIn</Breadcrumb.Item>
            <Breadcrumb.Item  href="/Courses" hidden={courses}>Home</Breadcrumb.Item>
            <Breadcrumb.Item onclick={btnClick()} href="/Course" hidden={course}>Course</Breadcrumb.Item>
            <Breadcrumb.Item href="/HomeworksTeacherView" active={false} hidden={homeworks}>
              Homeworks
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/SingleHomeworkTeacherView" hidden={homework} active={false}>
              Homework
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
                path="/SingleHomeworkTeacherView"
                exact
                component={SingleHomeworkTeacherView}
              />
              <Route
                path="/HomeworkStudentView"
                exact
                component={HomeworkStudentView}
              />

              {/* <Route path="/Shop" exact component={ShopSelection} />
            {/* <Route path="/Sales" exact component={Sales}/> */}
              {/* <Route path="/ContactPage" exact component={MainPage} />  */}

              {/* <Route path="/ProductCartPage" exact component={ProductCartPage}/> */}
            </Switch>
          </div>
         
        </div>
      </Router>
  );
}

export default App;
