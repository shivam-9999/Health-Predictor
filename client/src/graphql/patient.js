import { gql } from '@apollo/client';

export const GET_ALL_PATIENTS = gql`
  query GetAllPatients {
    patients {
      _id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;

export const GET_PATIENT_BY_ID = gql`
  query GetPatientById($id: String!) {
    patient(id: $id) {
      _id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;