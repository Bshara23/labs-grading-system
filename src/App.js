import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import MainGallery from './components/MainGallery'
import Navbar from "./components/Navbar";

//import d1 from './imgs/R4by5S1mb/d1.jpg'
//import ImagesSlider from './components/ImagesSlider'
//import SlideShow from './components/SlideShow'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LogIn from "./pages/LogIn";
import Course from "./pages/Course";
import HomeworksTeacherView from "./pages/HomeworksTeacherView";
import HomeworkStudentView from "./pages/HomeworkStudentView";
import SingleHomeworkTeacherView from "./pages/SingleHomeworkTeacherView";
import Breadcrumb from "react-bootstrap/Breadcrumb";
function App() {
  const btnClick = () => {
    console.log("button clicked");
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/Course">Course</Breadcrumb.Item>
          <Breadcrumb.Item href="/HomeworksTeacherView" active={false}>
            Homeworks
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/SingleHomeworkTeacherView" active={false}>
            Homework
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="body">
          <Switch>
            <Route path="/" exact component={MainPage} />
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
