import { gql } from '@apollo/client';

export const GET_ALL_VITALS = gql`
  query GetAllVitals {
    healthPatients {
      _id
      patient {
        _id
      }
      heart_rate
      systolic_pressure
      diastolic_pressure
      body_temperature
      respiratory_rate
      weight
      timestamp
    }
  }
`;

export const GET_VITALS_BY_PATIENT = gql`
  query GetVitalsByPatient($patient: String!) {
    healthPatientsByPatient(patient: $patient) {
      _id
      patient {
        _id
      }
      heart_rate
      systolic_pressure
      diastolic_pressure
      body_temperature
      respiratory_rate
      weight
      timestamp
    }
  }
`;

export const GET_VITALS_BY_ID = gql`
  query GetVitalsById($id: String!) {
    healthPatient(id: $id) {
      _id
      patient {
        _id
      }
      heart_rate
      systolic_pressure
      diastolic_pressure
      body_temperature
      respiratory_rate
      weight
      timestamp
    }
  }
`;

export const ADD_VITALS = gql`
  mutation AddVitals(
    $patient: String!,
    $heart_rate: Float!,
    $systolic_pressure: Float!,
    $diastolic_pressure: Float!,
    $body_temperature: Float!,
    $respiratory_rate: Float!,
    $weight: Float!,
  ) {
    createHealth(
      patient: $patient,
      heart_rate: $heart_rate,
      systolic_pressure: $systolic_pressure,
      diastolic_pressure: $diastolic_pressure,
      body_temperature: $body_temperature,
      respiratory_rate: $respiratory_rate,
      weight: $weight,
    ) {
      _id
      patient
      heart_rate
      systolic_pressure
      diastolic_pressure
      body_temperature
      respiratory_rate
      weight
      timestamp
    }
  }
`;

export const UPDATE_VITALS = gql`
  mutation UpdateVitals(
    $id: String!,
    $heart_rate: Float!,
    $systolic_pressure: Float!,
    $diastolic_pressure: Float!,
    $body_temperature: Float!,
    $respiratory_rate: Float!,
    $weight: Float!,
  ) {
    updateHealth(
      id: $id,
      heart_rate: $heart_rate,
      systolic_pressure: $systolic_pressure,
      diastolic_pressure: $diastolic_pressure,
      body_temperature: $body_temperature,
      respiratory_rate: $respiratory_rate,
      weight: $weight,
    ) {
      _id
      patient
      heart_rate
      systolic_pressure
      diastolic_pressure
      body_temperature
      respiratory_rate
      weight
      timestamp
    }
  }
`;

export const DELETE_VITALS = gql`
  mutation DeleteVitals($id: String!) {
    deleteHealth(id: $id) {
      _id
      patient
      heart_rate
      systolic_pressure
      diastolic_pressure
      body_temperature
      respiratory_rate
      weight
      timestamp
    }
  }
`;

export const PREDICT_HEALTH_CONDITION = gql`
  query PredictHealthCondition(
    $body_temperature: Float!,
    $heart_rate: Float!,
    $respiratory_rate: Float!,
    $systolic_pressure: Float!,
    $diastolic_pressure: Float!,
  ) {
    predictHealthCondition(
      body_temperature: $body_temperature,
      heart_rate: $heart_rate,
      respiratory_rate: $respiratory_rate,
      systolic_pressure: $systolic_pressure,
      diastolic_pressure: $diastolic_pressure
    ) {
      status
    }
  }
`;