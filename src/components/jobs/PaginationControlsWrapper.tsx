"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PaginationControls from "./PaginationControls";

export function PaginationControlsWrapper({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "5";

const handlePageChange = (newPage: number) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(newPage));
  params.set("limit", limit);
  router.push(`?${params.toString()}`, { scroll: false });
};
  return (
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
