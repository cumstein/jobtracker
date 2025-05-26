import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

const endpoint = "/api/graphql";

const query = `
  query {
    getAllJobs {
      id
      title
      company
      location
      status
    }
  }
`;

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const data = await request<{
        getAllJobs: {
          id: string;
          title: string;
          company: string;
          location: string;
          status: string;
        }[];
      }>(endpoint, query);
      return data.getAllJobs;
    },
  });
}
