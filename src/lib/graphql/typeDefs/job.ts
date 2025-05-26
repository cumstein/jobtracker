import gql from "graphql-tag";

export const jobTypeDefs = gql`
  #graphql
  type Job {
    id: String!
    title: String!
    company: String
    description: String
    location: String
    user: User
    tags: [Tag!]!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type JobResult {
    jobs: [Job!]!
    count: Int!
  }

  input JobFilterInput {
    search: String
    status: String
    tags: [String!]
    page: Int
    limit: Int
  }

  extend type Query {
    filteredJobs(filters: JobFilterInput): JobResult!
    getAllJobs: [Job!]!
    getJobById(id: String!): Job
  }

  extend type Mutation {
    createJob(
      title: String!
      company: String
      description: String
      location: String
      tagIds: [String!]
    ): Job!
  }
`;