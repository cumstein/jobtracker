"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import getPaginationRange from "@/lib/utils/getPaginationRage";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    
  };

  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-nowrap overflow-x-auto scrollbar-hide px-2">
      <PageButton
        disabled={isFirst}
        onClick={() => goToPage(1)}
        icon={<ChevronsLeft size={18} />}
        label="First"
      />
      <PageButton
        disabled={isFirst}
        onClick={() => goToPage(currentPage - 1)}
        icon={<ArrowLeft size={18} />}
        label="Prev"
      />

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={page}
            onClick={() => goToPage(page)}
            className={`
    px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm rounded-md font-medium transition-all
    ${
      page === currentPage
        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
    }
  `}
          >
            {page}
          </motion.button>
        ) : (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-zinc-400 select-none"
          >
            ...
          </span>
        )
      )}

      <PageButton
        disabled={isLast}
        onClick={() => goToPage(currentPage + 1)}
        icon={<ArrowRight size={18} />}
        label="Next"
      />
      <PageButton
        disabled={isLast}
        onClick={() => goToPage(totalPages)}
        icon={<ChevronsRight size={18} />}
        label="Last"
      />
    </div>
  );
}

function PageButton({
  disabled,
  onClick,
  icon,
  label,
}: {
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-all 
        ${
          disabled
            ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
        }
      `}
      title={label}
    >
      {icon}
    </motion.button>
  );
}
