import {gql} from "graphql-tag"

export const reminderTypeDefs = gql `

  type Reminder {
    id: String!
    jobId: String!
    title: String!
    dueDate: String!
    job: Job!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getRemindersByJob(jobId: String!): [Reminder!]!
  }

  extend type Mutation {
    createReminder(jobId: String!, title: String!, dueDate: String!): Reminder!
    deleteReminder(id: String!): Boolean!
  }


`