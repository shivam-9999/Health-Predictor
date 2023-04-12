import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//
export const AddCourse = gql`
  mutation (
    $courseCode: String!
    $courseName: String!
    $courseSection: String!
    $courseSemester: String!
  ) {
    createCourse(
      courseCode: $courseCode
      courseName: $courseName
      courseSection: $courseSection
      courseSemester: $courseSemester
    ) {
      _id
    }
  }
`;

const CreateCourse = () => {
  let studentNo, courseCode, courseName, courseSection, courseSemester;
  const [createCourse, { data, loading, error }] = useMutation(AddCourse);
  const history = useHistory();
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Jumbotron className="form" style={{ background: "antiquewhite" }}>
        <Form
          onSubmit={(e) => {
            createCourse({
              variables: {
                courseCode: courseCode.value,
                courseName: courseName.value,
                courseSection: courseSection.value,
                courseSemester: courseSemester.value,
              },
            });
            courseCode.value = "";
            courseName.value = "";
            courseSection.value = "";
            courseSemester.value = "";

            let path = `/listCourses`;
            history.push(path);
          }}
        >
          <Form.Group>
            <Form.Label> Course Code</Form.Label>
            <Form.Control
              type="text"
              name="courseCode"
              id="courseCode"
              placeholder="Enter Course Code"
              ref={(node) => {
                courseCode = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              id="courseName"
              placeholder="Enter Course Name"
              ref={(node) => {
                courseName = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Course Section</Form.Label>
            <Form.Control
              type="text"
              name="courseSection"
              id="courseSection"
              placeholder="Enter Course Section"
              ref={(node) => {
                courseSection = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Course Semester</Form.Label>
            <Form.Control
              type="text"
              name="courseSemester"
              id="courseSemester"
              placeholder="Enter Course Semester"
              ref={(node) => {
                courseSemester = node;
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save course
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
};

export default withRouter(CreateCourse);
