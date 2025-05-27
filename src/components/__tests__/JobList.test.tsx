import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import JobList, { JobListItem } from '../jobs/JobList';
import { GET_FILTERED_JOBS } from '@/lib/graphql/queries';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: () => null,
  }),
}));
jest.mock('../jobs/DeleteJobButton', () => () => <button>Delete</button>);

const dummyJobs: JobListItem[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Acme',
    status: 'APPLIED',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Beta',
    status: 'INTERVIEW',
  },
];


const mocks = [
  {
    request: {
      query: GET_FILTERED_JOBS,
      variables: {
        filters: {
          search: "",
          status: "",
          tags: [],
          page: 1,
          limit: 5,
        },
      },
    },
    result: {
      data: {
        filteredJobs: {
          jobs: dummyJobs,
          count: 2,
        },
      },
    },
  },
];

describe('JobList', () => {
  it('renders job titles', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobList />
      </MockedProvider>
    );


    expect(await screen.findByText('Frontend Developer')).toBeInTheDocument();
    expect(await screen.findByText('Backend Developer')).toBeInTheDocument();
  });
});