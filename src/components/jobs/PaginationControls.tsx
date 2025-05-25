"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

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
    router.push(`?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
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

      {pages.map((page) => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all
            ${
              page === currentPage
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }
          `}
        >
          {page}
        </motion.button>
      ))}

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