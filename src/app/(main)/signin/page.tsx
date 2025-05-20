"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SigninForm from "@/components/custom/SigninForm";
import SignInHeader from "@/components/custom/SignInHeader";
import Spinner from "@/components/ui/spinner";

export default function SigninPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return <Spinner />;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SignInHeader />
      <SigninForm />
    </div>
  );
}
