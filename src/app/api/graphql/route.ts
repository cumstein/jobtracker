import { createYoga } from "graphql-yoga";
import { schema } from "@graphql/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  context: async ({ request }: { request: Request }) => {
    const session = await getServerSession(authOptions);
    return {
      user: session?.user || null,
    };
  },
});

export async function GET(request: Request) {
  return yoga(request);
}

export async function POST(request: Request) {
  return yoga(request);
}