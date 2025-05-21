"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Spinner from "../ui/spinner";
import Link from "next/link";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Error");
      return;
    }
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      
      <Input
        placeholder="Name"
        {...register("name", { required: true })}
      />
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, minLength: 5 })}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <Spinner /> : "Sign Up"}
      </Button>
      <p className="text-sm text-center mt-4">
      Already have an account?
        <Link href="/signin" className="text-blue-600 hover:underline"> Sign in here</Link>
      </p>
    </form>
  );
}