import { gql } from '@apollo/client';

// mutation for user login
export const LOGIN_PATIENT = gql`
  mutation LoginPatient(
    $email: String!,
    $password: String!
  ) {
    loginPatient(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

// mutation for user login
export const LOGIN_NURSE = gql`
  mutation LoginNurse(
    $email: String!,
    $password: String!
  ) {
    loginNurse(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

// query for checking logged in patient
export const LOGGED_IN_PATIENT = gql`
  mutation VerifyPatient(
    $token: String!
  ) {
    verifyPatient(token: $token) {
      _id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;

// query for checking logged in nurse
export const LOGGED_IN_NURSE = gql`
  mutation VerifyNurse(
    $token: String!
  ) {
    verifyNurse(token: $token) {
      _id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;

// mutation for patient signup
export const SIGNUP_PATIENT = gql`
  mutation SignupPatient(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $address: String!,
    $phoneNumber: String!
  ) {
    signUpPatient(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      address: $address,
      phoneNumber: $phoneNumber
    ) {
      _id
    }
  }
`;

// mutation for nurse signup
export const SIGNUP_NURSE = gql`
  mutation SignupNurse(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $address: String!,
    $phoneNumber: String!
  ) {
    signUpNurse(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      address: $address,
      phoneNumber: $phoneNumber
    ) {
      _id
    }
  }
`;