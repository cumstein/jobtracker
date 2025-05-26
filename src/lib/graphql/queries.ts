import gql from "graphql-tag";

export const GET_FILTERED_JOBS = gql`
  query GetFilteredJobs($filters: JobFilterInput) {
    filteredJobs(filters: $filters) {
      jobs {
        id
        title
        company
        location
        status
        tags {
          id
          name
        }
        createdAt
      }
      count
    }
  }
`;
