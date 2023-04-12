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
  mutation deleteStudent(
    $id: String!
  ) {
    deleteStudent(
      id: $id
    ) {
      _id
    }
  }
`;

const Deletestudent = ({ id }) => {
  const history = useHistory();
  const params = useParams();
  const [deleteStudent, { data, loading, error }] = useMutation(DELETE);
  deleteStudent({
    variables: {
      id: params.id
    }
    
  });
  let path = `/list`; 
  history.push(path);
  window.location.reload();
};

export default Deletestudent;