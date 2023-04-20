import { gql } from '@apollo/client';

export const GET_ALL_NURSES = gql`
  query GetAllNurses {
    nurses {
      _id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;

export const GET_NURSE_BY_ID = gql`
  query GetNurseById($id: String!) {
    nurse(id: $id) {
      _id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;