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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddJobSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  function handleSuccess() {
    setIsOpen(false);
    router.refresh()
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="w-full md:w-auto">Add Job</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="sm:side-right overflow-auto">
        <SheetHeader>
          <SheetTitle>Add a New Job</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <JobForm onSuccess={handleSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}