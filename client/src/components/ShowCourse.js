import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCourse(props) {
  console.log('props.match.params',props.match.params.id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = (id) => {
    props.history.push({
      pathname: '/editcourse/' + id
    });
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    const course = { courseCode: data.courseCode, courseName: data.courseName, courseSection: data.courseSection,
       courseSemester: data.courseSemester};
    //
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listcourses')
      }).catch((error) => setShowLoading(false));
  };
  function omitKeys(obj, keys)
  {
      var dup = {};
      for (var key in obj) {
          if (keys.indexOf(key) == -1) {
              dup[key] = obj[key];
          }
      }
      return dup;
  }

 
  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h3> {data.courseCode}</h3>
        <p>Course Name: {data.courseName}</p>
        <p>Course Section: {data.courseSection}</p>
        <p>Course Semester: {data.courseSemester}</p>
        <pre>Enrolled Students: {JSON.stringify(omitKeys(data.enrolledStudents, ['_id', 'id', 'firstName', 'lastName']))
        }</pre>

     <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCourse);
