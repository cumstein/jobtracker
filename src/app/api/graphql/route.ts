import { createYoga } from 'graphql-yoga';
import { schema } from '@graphql/schema';
import { NextRequest } from 'next/server';

const yoga = createYoga<{
  req: NextRequest
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: {Request, Response },
});

export { yoga as GET, yoga as POST }





// import { createYoga } from "graphql-yoga";
// import { schema } from "@/lib/graphql/schema";




// // import { createSchema } from "graphql-yoga";

// const yoga = createYoga({
//   graphqlEndpoint: "/api/graphql",
//   schema,
//   fetchAPI: { Request, Response },
// });

// export {yoga as GET, yoga as POST}

// const jobs = [
//   {
//     id: "1",
//     title: "Frontend Developer",
//     company: "OpenAI",
//     location: "Remote",
//     createdAt: new Date().toISOString(),
//   },
// ];

// const typeDefs = `
//   type Job {
//     id: ID!
//     title: String!
//     company: String!
//     location: String
//     createdAt: String!
//   }

//   type Query {
//     getAllJobs: [Job!]!
//     getJob(id: ID!): Job
//   }

//   type Mutation {
//     createJob(title: String!, company: String!, location: String): Job!
//   }
// `;

// const resolvers = {
//   Query: {
//     getAllJobs: () => jobs,
//     getJob: (_: any, { id }: { id: string }) =>
//       jobs.find((job) => job.id === id),
//   },
//   Mutation: {
//     createJob: (_: any, { title, company, location }: any) => {
//       const newJob = {
//         id: String(jobs.length + 1),
//         title,
//         company,
//         location,
//         createdAt: new Date().toISOString(),
//       };
//       jobs.push(newJob);
//       return newJob;
//     },
//   },
// };

// const schema = createSchema({ typeDefs, resolvers });

// // const yoga = createYoga({
// //   schema,
// //   graphqlEndpoint: "/api/graphql",
// //   fetchAPI: { Request, Response },
// // });

// export const { handleRequest } = createYoga({
//   graphqlEndpoint: "/api/graphql",
//   schema,
//   fetchAPI: { Request, Response },
// });
// export { handleRequest as GET, handleRequest as POST };
