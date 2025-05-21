"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton({
  label = "Back",
  to,
}: {
  label?: string;
  to?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <ArrowLeft size={16} />
      {label}
    </Button>
  );
}