'use client';

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { JobForm } from "./JobForm";

export default function AddJobSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full md:w-auto">Add Job</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="sm:side-right overflow-auto">
        <SheetHeader>
          <SheetTitle>Add a New Job</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <JobForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}