import { jobResolvers } from "./job";
import { noteResolvers } from "./note";
import { reminderResolvers } from "./reminder";
import { tagResolvers } from "./tag";
import { userResolvers } from "./user";

export const resolvers = {
  Query: {
    ...jobResolvers.Query,
    ...noteResolvers.Query,
    ...reminderResolvers.Query,
    ...tagResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...jobResolvers.Mutation,
    ...noteResolvers.Mutation,
    ...reminderResolvers.Mutation,
    ...tagResolvers.Mutation,
  },
};
