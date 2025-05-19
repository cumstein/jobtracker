import { gql } from "graphql-tag";
export const noteTypeDefs = gql`
  type Note {
    id: String!
    content: String!
    job: Job!
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    getNotesByJob(jobId: String!): [Note!]!
  }

  extend type Mutation {
    createNote(jobId: String!, content: String!): Note!
    deleteNote(id: String!): Boolean!
  }
`;
