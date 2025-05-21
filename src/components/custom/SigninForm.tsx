"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Spinner from "../ui/spinner";
import Link from "next/link";

export default function Signin() {
  const router = useRouter();
  const [error, setError] = useState("");
  type SigninFormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SigninFormData>();

  const onSubmit = async (data: SigninFormData) => {
    setError("");
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      setError("Email or Password is Wrong!");
      toast.error("Wrong Credentials");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Spinner /> : "Sign In"}
      </Button>
      <p className="text-sm text-center mt-4">
        Don&#39;t have an account?
        <Link href="/signup" className="text-blue-600 hover:underline"> Sign up here
        </Link>
      </p>
    </form>
  );
}
