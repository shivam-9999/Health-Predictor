import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//
// import ListStudents from "./components/ListStudents";
import ListCourses from "./components/ListCourses";
// import EditStudent from "./components/EditStudent";
import EditCourse from "./components/EditCourse";

import CreatePatient from "./components/CreatePatient";
import ShowStudent from "./components/ShowStudent";
import ShowCourse from "./components/ShowCourse";

import Home from "./components/Home";
import Login from "./components/Login";
import CreateCourse from "./components/CreateCourse";
// import Deletestudent from "./components/DeleteStudent";
import DeleteCourse from "./components/DeleteCourse";
//
function App() {
  return (
    <Router>
      <Navbar
        className="navbar navbar-dark  d-flex "
        style={{ backgroundColor: "LightSeaGreen", color: "white" }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav d-flex" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-between">
            <div style={{ display: "flex" }}>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/list" style={{ width: "150px" }}>
                List of Patients
              </Nav.Link>
              <Nav.Link href="/listCourses">List of Courses</Nav.Link>
            </div>
            <div style={{ display: "flex", marginLeft: "50rem" }}>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/create">Sign Up</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Login />} path="/login" />

        <Route render={() => <CreatePatient />} path="/create" />
        {/* <Route render={() => <ListStudents />} path="/list" /> */}
        {/* <Route render={() => <EditStudent />} path="/updateStudent/:id" /> */}
        <Route render={() => <ShowStudent />} path="/show/:id" />
        {/* <Route render={() => <Deletestudent />} path="/deletestudent/:id" /> */}

        <Route render={() => <CreateCourse />} path="/createcourse" />
        <Route render={() => <ListCourses />} path="/listCourses" />
        <Route render={() => <ShowCourse />} path="/showcourse/:id" />
        <Route render={() => <EditCourse />} path="/editCourse/:id" />
        <Route render={() => <DeleteCourse />} path="/deleteCourse/:id" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
