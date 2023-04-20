import { gql } from '@apollo/client';

export const GET_ALL_SYMPTOMS = gql`
  query GetAllSymptoms {
    symptoms {
      _id
      patient {
        _id
      }
      fever
      cough
      breathing_difficulty
      headache
      sore_throat
      timestamp
    }
  }
`;

export const GET_SYMPTOMS_BY_PATIENT = gql`
  query GetSymptomsByPatient($patient: String!) {
    symptomsByPatient(patient: $patient) {
      _id
      patient {
        _id
      }
      fever
      cough
      breathing_difficulty
      headache
      sore_throat
      timestamp
    }
  }
`;

export const GET_SYMPTOMS_BY_ID = gql`
  query GetSymptomsById($id: String!) {
    symptom(id: $id) {
      _id
      patient {
        _id
      }
      fever
      cough
      breathing_difficulty
      headache
      sore_throat
      timestamp
    }
  }
`;

export const ADD_SYMPTOMS = gql`
  mutation AddSymptoms(
    $patient: String!,
    $fever: Boolean!,
    $cough: Boolean!,
    $breathing_difficulty: Boolean!,
    $headache: Boolean!,
    $sore_throat: Boolean!
  ) {
    createSymptom(
      patient: $patient,
      fever: $fever,
      cough: $cough,
      breathing_difficulty: $breathing_difficulty,
      headache: $headache,
      sore_throat: $sore_throat
    ) {
      _id
      patient
      fever
      cough
      breathing_difficulty
      headache
      sore_throat
      timestamp
    }
  }
`;

export const UPDATE_SYMPTOMS = gql`
  mutation UpdateSymptoms(
    $id: String!,
    $fever: Boolean!,
    $cough: Boolean!,
    $breathing_difficulty: Boolean!,
    $headache: Boolean!,
    $sore_throat: Boolean!
  ) {
    updateSymptom(
      id: $id,
      fever: $fever,
      cough: $cough,
      breathing_difficulty: $breathing_difficulty,
      headache: $headache,
      sore_throat: $sore_throat
    ) {
      _id
      patient
      fever
      cough
      breathing_difficulty
      headache
      sore_throat
      timestamp
    }
  }
`;

export const DELETE_SYMPTOMS = gql`
  mutation DeleteSymptoms($id: String!) {
    deleteSymptom(id: $id) {
      _id
      patient
      fever
      cough
      breathing_difficulty
      headache
      sore_throat
      timestamp
    }
  }
`;