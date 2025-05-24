"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignUpForm from "@/components/custom/SignupForm";
import Spinner from "@/components/ui/spinner";
import SignUpHeader from "@/components/custom/SignUpHeader";

export default function SignupPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return <Spinner />;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SignUpHeader />
      <SignUpForm />
    </div>
  );
}
