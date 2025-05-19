import { gql } from 'graphql-tag'

export const userTypeDefs = gql `
  type User {
    id: String!
    email: String!
    name: String
    jobs: [Job!]!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getAllUsers: [User!]!
    getUserById(id: String!): User
  }

  extend type Mutation {
    createUser(email: String!, name: String): User!
  }
  `