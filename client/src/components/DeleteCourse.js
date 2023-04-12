import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import { resolveReadonlyArrayThunk } from 'graphql';


const GET_users = gql`
{
    allUsers {
        id
        name
    }
}
`;

const DELETE = gql`
  mutation deleteCourse(
    $id: String!
  ) {
    deleteCourse(
      id: $id
    ) {
      _id
    }
  }
`;

const DeleteCourse = ({ id }) => {
  const history = useHistory();
  const params = useParams();
  const [deleteCourse, { data, loading, error }] = useMutation(DELETE);
  deleteCourse({
    variables: {
      id: params.id
    }
    
  });
  let path = `/listcourses`; 
  history.push(path);
  window.location.reload();
};

export default DeleteCourse;