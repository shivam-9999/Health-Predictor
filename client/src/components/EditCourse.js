import React, { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory, useParams } from "react-router-dom";

export const GET_COURSE = gql`
  query ($id: String!) {
    course(id: $id) {
      _id
      courseCode
      courseName
      courseSection
      courseSemester
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(
    $id: String!
    $courseCode: String!
    $courseName: String!
    $courseSection: String!
    $courseSemester: String!
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      courseSection: $courseSection
      courseSemester: $courseSemester
    ) {
      _id
    }
  }
`;

const EditCourses = () => {
  const params = useParams();
  const courseInfo = useQuery(GET_COURSE, { variables: { id: params.id } });
  console.log(courseInfo.data);

  let courseCode, courseName, courseSection, courseSemester;
  const [updateCourse, { data, loading, error }] = useMutation(UPDATE_COURSE);
  const history = useHistory();
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Jumbotron className="form">
        <Form
          onSubmit={(e) => {
            updateCourse({
              variables: {
                id: params.id,
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
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type="text"
              name="courseCode"
              id="courseCode"
              defaultValue={courseInfo?.data?.course?.courseCode}
              ref={(node) => {
                courseCode = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              id="courseName"
              defaultValue={courseInfo?.data?.course?.courseName}
              ref={(node) => {
                courseName = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Course Section</Form.Label>
            <Form.Control
              type="text"
              name="courseSection"
              id="courseSection"
              defaultValue={courseInfo?.data?.course?.courseSection}
              ref={(node) => {
                courseSection = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Course Semester</Form.Label>
            <Form.Control
              type="text"
              name="courseSemester"
              id="courseSemester"
              defaultValue={courseInfo?.data?.course?.courseSemester}
              ref={(node) => {
                courseSemester = node;
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

export default withRouter(EditCourses);
