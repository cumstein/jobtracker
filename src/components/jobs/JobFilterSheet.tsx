"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useJobFilters } from "@/lib/store/useJobFilters";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "APPLIED", label: "Applied" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "OFFER", label: "Offer" },
  { value: "REJECTED", label: "Rejected" },
  { value: "ARCHIVED", label: "Archived" },
];

export default function JobFilterSheet() {
  const {
    search,
    status,
    setSearch,
    setStatus,
    clearFilters,
  } = useJobFilters();

  const [localSearch, setLocalSearch] = useState(search);
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    setSearch(localSearch);
    setOpen(false);
     toast.success("Filters applied!");
  };

  const handleClear = () => {
    clearFilters();
    setLocalSearch("");
    setOpen(false);
  };

  const currentStatusLabel =
    STATUS_OPTIONS.find((opt) => (status ? opt.value === status : opt.value === "all"))?.label || "All";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[320px] sm:w-[400px] p-6">
        <SheetTitle>Filter Jobs</SheetTitle>
        <SheetDescription>
          Use the fields below to filter your job list.
        </SheetDescription>

        <form
          className="space-y-8 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div>
            <Label htmlFor="job-search">Search</Label>
            <Input
              id="job-search"
              placeholder="e.g. frontend developer"
              className="mt-1 placeholder:text-muted-foreground"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              autoFocus={typeof window !== "undefined" && window.innerWidth > 640}
            />
          </div>

          <div>
            <Label htmlFor="job-status">Status</Label>
            <Select
              value={status || "all"}
              onValueChange={(v) => setStatus(v === "all" ? "" : v)}
            >
              <SelectTrigger id="job-status" className="mt-1">
                {currentStatusLabel}
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4">
            <Button variant="secondary" type="button" onClick={handleClear}>
              Clear
            </Button>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}