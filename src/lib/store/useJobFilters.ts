import { create } from "zustand";

interface JobFiltersState {
  search: string;
  status: string;
  tags: string[];
  page: number;
  limit: number;
}

interface JobFiltersActions {
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setTags: (tags: string[]) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  clearFilters: () => void;
}

type JobFiltersStore = JobFiltersState & JobFiltersActions;

export const useJobFilters = create<JobFiltersStore>((set) => ({
  search: "",
  status: "",
  tags: [],
  page: 1,
  limit: 5,
  setSearch: (search) => set(() => ({ search, page: 1 })),
  setStatus: (status) => set(() => ({ status, page: 1 })),
  setTags: (tags) => set(() => ({ tags, page: 1 })),
  setPage: (page) => set(() => ({ page })),
  setLimit: (limit) => set(() => ({ limit })),
  clearFilters: () =>
    set(() => ({
      search: "",
      status: "",
      tags: [],
      page: 1,
      limit: 5,
    })),
}));