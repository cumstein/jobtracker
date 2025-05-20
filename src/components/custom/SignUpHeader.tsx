"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

export default function SignUpHeader() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <UserPlus className="w-6 h-6 text-primary" />
      <h1 className="text-2xl font-semibold text-center">Create an account</h1>
      <p className="text-sm text-muted-foreground text-center">
        Fill in your details to get started with JobTracker.
      </p>
    </motion.div>
  );
}