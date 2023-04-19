import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter, useParams, useHistory } from "react-router-dom";

const GET_STUDENTS = gql`
  query ($id: String!) {
    student(id: $id) {
      _id

      firstName
      lastName
      program
      address
      city
      phoneNumber
      email
      program
    }
  }
`;

export const UpdateStudent = gql`
  mutation updateStudent(
    $id: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $email: String!
    $program: String!
  ) {
    updateStudent(
      id: $id

      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      email: $email
      program: $program
    ) {
      _id
    }
  }
`;

const EditStudent = () => {
  const params = useParams();
  console.log("params", params);
  const studentInfo = useQuery(GET_STUDENTS, { variables: { id: params.id } });
  console.log(studentInfo?.data?.student);

  let firstName,
    lastName,
    address,
    city,
    phoneNumber,
    email,
    program,
    // studentNo,
    password;

  console.log(firstName);

  const [updateStudent, { data, loading, error }] = useMutation(UpdateStudent);
  const history = useHistory();

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Form
        onSubmit={(e) => {
          updateStudent({
            variables: {
              id: params.id,
              firstName: firstName.value,
              lastName: lastName.value,
              address: address.value,
              city: city.value,
              phoneNumber: phoneNumber.value,
              email: email.value,
              program: program.value,

              password: password.value,
            },
          })
            .then((response) => {
              console.log("Student updated:", response.data.updateStudent._id);
            })
            .catch((error) => {
              console.error("Error updating student:", error);
            });
          firstName.value = "";
          lastName.value = "";
          address.value = "";
          city.value = "";
          phoneNumber.value = "";
          email.value = "";
          program.value = "";
          // studentNo.value = "";
          password.value = "";

          let path = `/list`;
          history.push(path);
        }}
        className="form"
      >
        {/* <Form.Group>
          <Form.Label> Student Number</Form.Label>
          <Form.Control
            type="text"
            name="studentNo"
            id="studentNo"
            placeholder="Enter studentNo"
            required
            defaultValue={studentInfo?.data?.student?.studentNo}
            ref={(node) => {
              studentNo = node;
            }}
            // value={studentNo}
            // onChange={(e) => setstudentNo(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            defaultValue={studentInfo?.data?.student?.password}
            ref={(node) => {
              password = node;
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            defaultValue={studentInfo?.data?.student?.firstName}
            ref={(node) => {
              firstName = node;
            }}
            // onChange={(e) => setfirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            defaultValue={studentInfo?.data?.student?.lastName}
            ref={(node) => {
              lastName = node;
            }}
            // onChange={(e) => setlastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            id="address"
            placeholder="Enter address"
            defaultValue={studentInfo?.data?.student?.address}
            ref={(node) => {
              address = node;
            }}
            // onChange={(e) => setaddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            id="city"
            placeholder="Enter city"
            defaultValue={studentInfo?.data?.student?.city}
            ref={(node) => {
              city = node;
            }}
            // onChange={(e) => setcity(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Enter phoneNumber"
            required
            defaultValue={studentInfo?.data?.student?.phoneNumber}
            ref={(node) => {
              phoneNumber = node;
            }}
            // onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            required
            defaultValue={studentInfo?.data?.student?.email}
            ref={(node) => {
              email = node;
            }}
            // onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Program</Form.Label>
          <Form.Control
            type="text"
            name="program"
            id="program"
            placeholder="Enter program"
            defaultValue={studentInfo?.data?.student?.program}
            ref={(node) => {
              program = node;
            }}
            // onChange={(e) => setprogram(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(EditStudent);
