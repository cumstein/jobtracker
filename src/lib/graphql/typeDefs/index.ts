import gql from "graphql-tag";
import { jobTypeDefs } from "./job";
import { noteTypeDefs } from "./note";
import { reminderTypeDefs } from "./reminder";
import { tagTypeDefs } from "./tag";
import { userTypeDefs } from "./user";

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export default [
  baseTypeDefs,
  jobTypeDefs,
  tagTypeDefs,
  noteTypeDefs,
  reminderTypeDefs,
  userTypeDefs,
];
