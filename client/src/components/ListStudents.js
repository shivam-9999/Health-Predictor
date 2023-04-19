import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const GET_STUDENTS = gql`
  {
    students {
      _id

      firstName
      lastName

      address

      phoneNumber
      email
    }
  }
`;

const ListStudents = () => {
  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    // {
    //   title: "City",
    //   dataIndex: "city",
    //   key: "city",
    // },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Mutate",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={{
              pathname: `/updateStudent/${record._id}`,
              query: {
                record: record,
              },
            }}
          >
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Link>
          <Link to={`/deleteStudent/${record._id}`}>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Link>
          <Link to={`/listCourses/${record._id}`}>
            <Button variant="info" type="submit">
              show courses
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <div>
      <Table
        key={data.students._id}
        columns={columns}
        dataSource={data.students}
        style={{ backgroundColor: "antiquewhite" }}
      />
    </div>
  );
};

export default ListStudents;
