import { gql } from '@apollo/client';

export const GET_ALL_EMERGENCIES = gql`
  query GetAllEmergencies {
    emergencies {
      _id
      patient {
        _id
        firstName
        lastName
      }
      concern
      timestamp
    }
  }
`;

export const GET_EMERGENCIES_BY_PATIENT = gql`
  query GetEmergenciesByPatient($patient: String!) {
    emergenciesByPatient(patient: $patient) {
      _id
      patient {
        _id
        firstName
        lastName
      }
      concern
      timestamp
    }
  }
`;

export const GET_EMERGENCY_BY_ID = gql`
  query GetEmergencyById($id: String!) {
    emergency(id: $id) {
      _id
      patient {
        _id
      }
      concern
      timestamp
    }
  }
`;

export const ADD_EMERGENCY = gql`
  mutation AddEmergency(
    $patient: String!,
    $concern: String!
  ) {
    createEmergency(
      patient: $patient,
      concern: $concern
    ) {
      _id
      patient
      concern
      timestamp
    }
  }
`;

export const UPDATE_EMERGENCY = gql`
  mutation UpdateEmergency(
    $id: String!,
    $concern: String!
  ) {
    updateEmergency(
      id: $id,
      concern: $concern
    ) {
      _id
      patient
      concern
      timestamp
    }
  }
`;

export const DELETE_EMERGENCY = gql`
  mutation DeleteEmergency($id: String!) {
    deleteEmergency(id: $id) {
      _id
      patient
      concern
      timestamp
    }
  }
`;
