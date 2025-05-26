"use client";

import PaginationControls from "./PaginationControls";
import { useJobFilters } from "@/lib/store/useJobFilters";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_JOBS } from "@graphql/queries";

export function PaginationControlsWrapper() {
  const { page, limit, setPage, search, status, tags } = useJobFilters();

  const { data } = useQuery(GET_FILTERED_JOBS, {
    variables: {
      filters: { search, status, tags, page, limit },
    },
  });

  const count = data?.filteredJobs?.count || 0;
  const totalPages = Math.max(1, Math.ceil(count / limit));

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <PaginationControls
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}