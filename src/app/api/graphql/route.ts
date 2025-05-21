import { createYoga } from "graphql-yoga";
import { schema } from "@graphql/schema";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
});

export async function GET(request: Request) {
  return yoga(request);
}

export async function POST(request: Request) {
  return yoga(request);
}
