import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function ShowStudent(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log("results from students", result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
    props.history.push({
      pathname: "/edit/" + id,
    });
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const student = {
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      phoneNumber: data.phoneNumber,
      email: data.email,
    };

    axios
      .delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/list");
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron className="showStudent">
        <h3>
          Hello, {data.firstName} {data.lastName}
        </h3>
        {/* <p>Student Number: {data.studentNo}</p> */}
        <p>Address: {data.address}</p>
        <p>City: {data.city}</p>
        <p>Phone Number: {data.phoneNumber}</p>
        <p>Email: {data.email}</p>

        <p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              editStudent(data._id);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteStudent(data._id);
            }}
          >
            Delete
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);
