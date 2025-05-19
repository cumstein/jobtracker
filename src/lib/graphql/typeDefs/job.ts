import gql from "graphql-tag";

export const jobTypeDefs = gql `#graphql 
type Job {
    id: String!
    title: String!
    company: String
    description: String
    location: String
    user: User
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
}
extend type Query {
    getAllJobs: [Job!]!
    getJobById(id: String!): Job
}

extend type Mutation {
    createJob(
        title: String!
        company: String
        description: String
        tagIds: [String!]
    ): Job!
}
`;