import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";

export const SIGN_UP = gql`
  mutation (
    $studentNo: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $email: String!
    $program: String!
  ) {
    signUp(
      studentNo: $studentNo
      firstName: $firstName
      lastName: $lastName
      password: $password
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

const CreateStudent = () => {
  let studentNo,
    password,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    email,
    program;
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  const history = useHistory();
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Jumbotron className="form" style={{ background: "antiquewhite" }}>
        <Form
          onSubmit={(e) => {
            signUp({
              variables: {
                studentNo: studentNo.value,
                password: password.value,
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                phoneNumber: phoneNumber.value,
                email: email.value,
                program: program.value,
              },
            });
            studentNo.value = "";
            password.value = "";
            firstName.value = "";
            lastName.value = "";
            address.value = "";
            city.value = "";
            phoneNumber.value = "";
            email.value = "";
            program.value = "";

            let path = `/list`;
            history.push(path);
          }}
        >
          <Form.Group>
            <Form.Label> Student Number</Form.Label>
            <Form.Control
              type="text"
              name="studentNo"
              id="studentNo"
              placeholder="Enter studentNo"
              ref={(node) => {
                studentNo = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
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
              ref={(node) => {
                firstName = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              ref={(node) => {
                lastName = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              ref={(node) => {
                address = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              id="city"
              placeholder="Enter city"
              ref={(node) => {
                city = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter phoneNumber"
              ref={(node) => {
                phoneNumber = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              ref={(node) => {
                email = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control
              type="text"
              name="program"
              id="program"
              placeholder="Enter program "
              ref={(node) => {
                program = node;
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
};

export default withRouter(CreateStudent);
