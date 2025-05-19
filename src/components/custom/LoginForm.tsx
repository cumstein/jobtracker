"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(result.error || "Something went wrong");
      return;
    }

    console.log("Logged in:", result);
  };

  return (
    <Card className="max-w-sm mx-auto mt-10 p-4">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="mb-2" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <GoogleLoginButton />
      </CardContent>
    </Card>
  );
}
