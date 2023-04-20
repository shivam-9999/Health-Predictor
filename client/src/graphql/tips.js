import { gql } from '@apollo/client';

export const GET_ALL_TIPS = gql`
  query GetAllTips {
    tips {
      _id
      title
      content
    }
  }
`;

export const GET_TIP_BY_ID = gql`
  query GetTipById($id: String!) {
    tip(id: $id) {
      _id
      title
      content
    }
  }
`;

export const ADD_TIP = gql`
  mutation AddTip(
    $title: String!,
    $content: String!
  ) {
    createTip(
      title: $title,
      content: $content
    ) {
      _id
      title
      content
    }
  }
`;

export const UPDATE_TIP = gql`
  mutation UpdateTip(
    $id: String!,
    $title: String!,
    $content: String!
  ) {
    updateTip(
      id: $id,
      title: $title,
      content: $content
    ) {
      _id
      title
      content
    }
  }
`;

export const DELETE_TIP = gql`
  mutation DeleteTip($id: String!) {
    deleteTip(id: $id) {
      _id
      title
      content
    }
  }
`;