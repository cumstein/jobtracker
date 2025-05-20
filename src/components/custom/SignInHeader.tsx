"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function SignInHeader() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Lock className="w-6 h-6 text-primary" />
      <h1 className="text-2xl font-semibold text-center">Welcome back!</h1>
      <p className="text-sm text-muted-foreground text-center">
        Enter your email and password to access your account.
      </p>
    </motion.div>
  );
}