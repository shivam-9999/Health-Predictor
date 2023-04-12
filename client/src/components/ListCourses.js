import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const GET_COURSES = gql`
  {
    courses {
      _id
      courseCode
      courseName
      courseSection
      courseSemester
    }
  }
`;

const ListCourses = () => {
  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_COURSES);

  const columns = [
    {
      title: "Course Code",
      dataIndex: "courseCode",
      key: "courseCode",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Course Section",
      dataIndex: "courseSection",
      key: "courseSection",
    },
    {
      title: "Course Semester",
      dataIndex: "courseSemester",
      key: "courseSemester",
    },
    {
      title: "Mutate",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/editCourse/${record._id}`}>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Link>
          <Link to={`/deleteCourse/${record._id}`}>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  if (error) {
    return <p>Error...</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(data);

  return (
    <div>
      <Link to={`/createcourse/`}>Create new Course</Link>

      <Table
        striped
        bordered
        hover
        style={{ background: "antiquewhite" }}
        columns={columns}
        dataSource={data.courses}
      />
    </div>
  );
};

export default ListCourses;
