import CreateCourse from './CreateCourse';
import ListCourses from './ListCourses';

//
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';

//
function View (props) {

  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listCourses = (studentNo) => {

    console.log('in listCourses: ',studentNo)
   setCourse('y')

  }
  //
  const createCourse = () => {
    console.log('in createCourse')
    //setCourse('y')
   
  }
  //
  return (
    <div className="App">
      {course !== 'y'
       ?
         <div class='viewPage'>
            <h3>Welcome,  {screen}!</h3>
            <p>{data}</p>
            <p><button class="btn btn-info" onClick={verifyCookie}>Verify Cookie</button></p>
            <p><button class="btn btn-info" onClick={createCourse}> Create course</button></p>
            <p><button class="btn btn-info" onClick={listCourses(data)}>List course</button></p>

            <p><button class="btn btn-danger" onClick={deleteCookie}>Log out</button></p>
          </div>            
        : <ListCourses screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

//
export default View;