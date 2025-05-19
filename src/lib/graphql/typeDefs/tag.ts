import { gql } from "graphql-tag";

export const tagTypeDefs = gql`
  type Tag {
    id: ID!
    name: String!
    jobs: [Job!]!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getAllTags: [Tag!]!
  }

  extend type Mutation {
    createTag(name: String!): Tag!
    deleteTag(id: ID!): Boolean!
  }
`;
