import { gql } from '@apollo/client';

export const GET_ALL_MOTIVATIONAL_VIDEOS = gql`
  query GetAllMotivationalVideos {
    motivationalVideos {
      _id
      title
      description
      videoUrl
    }
  }
`;

export const GET_MOTIVATIONAL_VIDEO_BY_ID = gql`
  query GetMotivationalVideoById($id: String!) {
    motivationalVideo(id: $id) {
      _id
      title
      description
      videoUrl
    }
  }
`;

export const ADD_MOTIVATIONAL_VIDEO = gql`
  mutation AddMotivationalVideo(
    $title: String!,
    $description: String!,
    $videoUrl: String!
  ) {
    addMotivationalVideo(
      title: $title,
      description: $description,
      videoUrl: $videoUrl
    ) {
      _id
      title
      description
      videoUrl
    }
  }
`;

export const UPDATE_MOTIVATIONAL_VIDEO = gql`
  mutation UpdateMotivationalVideo(
    $id: String!,
    $title: String!,
    $description: String!,
    $videoUrl: String!
  ) {
    updateMotivationalVideo(
      id: $id,
      title: $title,
      description: $description,
      videoUrl: $videoUrl
    ) {
      _id
      title
      description
      videoUrl
    }
  }
`;

export const DELETE_MOTIVATIONAL_VIDEO = gql`
  mutation DeleteMotivationalVideo($id: String!) {
    deleteMotivationalVideo(id: $id) {
      _id
      title
      description
      videoUrl
    }
  }
`;